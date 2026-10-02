import hashlib
import hmac
import json
import time
from datetime import datetime
from odoo import http
from odoo.http import request, Response

from ..models.stripe_client import (
    create_checkout_session, create_customer, create_portal_session,
)


def _cfg(key, default=''):
    return request.env['ir.config_parameter'].sudo().get_param(
        f'testimonial_saas.{key}', default) or default


def _stripe_keys():
    import os
    get = lambda k, d='': os.environ.get(k) or _cfg(k.lower(), d)
    return {
        'secret': get('STRIPE_SECRET_KEY'),
        'price_pro': get('STRIPE_PRICE_PRO'),
        'webhook_secret': get('STRIPE_WEBHOOK_SECRET'),
        'app_url': get('PUBLIC_APP_URL', 'http://localhost:4321'),
    }


def _ok(data=None):
    return Response(json.dumps({'data': data or {}}), status=200,
                    content_type='application/json')


def _err(msg, status=400):
    return Response(json.dumps({'error': msg}), status=status,
                    content_type='application/json')


def _verify_stripe_signature(raw: bytes, header: str, secret: str, tolerance=300):
    """Verify Stripe webhook signature (https://docs.stripe.com/webhooks#verify)."""
    parts = dict(p.split('=', 1) for p in header.split(',') if '=' in p)
    ts, v1 = parts.get('t'), parts.get('v1')
    if not ts or not v1 or not secret:
        return False
    try:
        if abs(time.time() - int(ts)) > tolerance:
            return False
    except ValueError:
        return False
    expected = hmac.new(secret.encode(), f'{ts}.'.encode() + raw,
                        hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, v1)


ACTIVE = {'active', 'trialing'}


class BillingController(http.Controller):

    @http.route('/api/billing/status', type='http', auth='user',
                methods=['GET'], csrf=False, cors='*')
    def status(self):
        user = request.env.user
        sub = request.env['testimonial.subscription'].search(
            [('user_id', '=', user.id)], limit=1, order='create_date desc')
        T = request.env['testimonial.testimonial']
        S = request.env['testimonial.space']
        spaces = S.search([('user_id', '=', user.id), ('status', '=', 'active')])
        usage = [{'id': s.id, 'name': s.name,
                  'count': T.search_count([('space_id', '=', s.id)])} for s in spaces]
        keys = _stripe_keys()
        return _ok({
            'plan': user.saas_plan,
            'limits': user.get_plan_limits(),
            'subscription': sub.to_dict() if sub else {'plan': user.saas_plan, 'status': 'none'},
            'usage': usage,
            'stripe_configured': bool(keys['secret'] and keys['price_pro']),
        })

    @http.route('/api/billing/checkout', type='http', auth='user',
                methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def checkout(self):
        if request.httprequest.method == 'OPTIONS':
            return _ok({})
        user = request.env.user.sudo()
        keys = _stripe_keys()
        if not keys['secret'] or not keys['price_pro']:
            return _err('Billing is not configured yet. Set STRIPE_SECRET_KEY and STRIPE_PRICE_PRO.', 503)
        if user.saas_plan == 'pro':
            return _err('You are already subscribed to Pro.', 400)
        try:
            customer_id = user.stripe_customer_id
            if not customer_id:
                cust = create_customer(keys['secret'], email=user.email, name=user.name)
                customer_id = cust['id']
                user.write({'stripe_customer_id': customer_id})
            session = create_checkout_session(
                keys['secret'], price_id=keys['price_pro'], customer_id=customer_id,
                user_id=user.id,
                success_url=keys['app_url'].rstrip('/') + '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=keys['app_url'].rstrip('/') + '/checkout/cancel')
        except RuntimeError as e:
            return _err(str(e), 502)
        except Exception as e:
            return _err(f'Could not start checkout: {e}', 502)
        return _ok({'checkout_url': session.get('url')})

    @http.route('/api/billing/portal', type='http', auth='user',
                methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def portal(self):
        if request.httprequest.method == 'OPTIONS':
            return _ok({})
        user = request.env.user.sudo()
        keys = _stripe_keys()
        if not keys['secret']:
            return _err('Billing is not configured yet.', 503)
        if not user.stripe_customer_id:
            return _err('No subscription to manage.', 400)
        try:
            sess = create_portal_session(
                keys['secret'], customer_id=user.stripe_customer_id,
                return_url=keys['app_url'].rstrip('/') + '/billing')
        except RuntimeError as e:
            return _err(str(e), 502)
        return _ok({'portal_url': sess.get('url')})

    # ---------- Stripe webhook — the ONLY thing that changes plan (PRD §17) ----------
    @http.route('/api/stripe/webhook', type='http', auth='public',
                methods=['POST'], csrf=False, cors='*')
    def webhook(self):
        raw = request.httprequest.data or b''
        sig = request.httprequest.headers.get('Stripe-Signature', '')
        keys = _stripe_keys()
        if not _verify_stripe_signature(raw, sig, keys['webhook_secret']):
            return Response(json.dumps({'error': 'Bad signature.'}), status=400,
                            content_type='application/json')
        try:
            event = json.loads(raw.decode())
        except Exception:
            return Response(json.dumps({'error': 'Bad payload.'}), status=400,
                            content_type='application/json')
        try:
            request.env['testimonial.subscription'].sudo()._handle_stripe_event(event)
            request.env.cr.commit()
        except Exception as e:
            request.env.cr.rollback()
            return Response(json.dumps({'error': f'Handler failed: {e}'}),
                            status=500, content_type='application/json')
        return Response(json.dumps({'received': True}), status=200,
                        content_type='application/json')
