"""Stripe REST helpers using only the Python standard library.

No extra pip dependency so the stock odoo:18 image works unchanged.
"""
import base64
import json
import urllib.parse
import urllib.request

API_BASE = 'https://api.stripe.com/v1'


def _auth_header(secret_key):
    token = base64.b64encode(f'{secret_key}:'.encode()).decode()
    return f'Basic {token}'


def api_post(secret_key, path, params, timeout=20):
    """POST form-encoded to Stripe. Returns parsed JSON or raises."""
    data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(
        API_BASE + path, data=data, method='POST',
        headers={'Authorization': _auth_header(secret_key),
                 'Content-Type': 'application/x-www-form-urlencoded'})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        try:
            detail = json.loads(e.read().decode())
            msg = detail.get('error', {}).get('message', str(detail))
        except Exception:
            msg = f'HTTP {e.code}'
        raise RuntimeError(f'Stripe error: {msg}') from e


def create_checkout_session(secret_key, *, price_id, customer_id=None,
                            customer_email=None, user_id=None,
                            success_url, cancel_url):
    params = {
        'mode': 'subscription',
        'line_items[0][price]': price_id,
        'line_items[0][quantity]': '1',
        'success_url': success_url,
        'cancel_url': cancel_url,
        'metadata[odoo_user_id]': str(user_id or ''),
        'subscription_data[metadata][odoo_user_id]': str(user_id or ''),
    }
    if customer_id:
        params['customer'] = customer_id
    elif customer_email:
        params['customer_email'] = customer_email
    return api_post(secret_key, '/checkout/sessions', params)


def create_customer(secret_key, *, email, name=None, timeout=20):
    params = {'email': email}
    if name:
        params['name'] = name
    return api_post(secret_key, '/customers', params, timeout=timeout)


def create_portal_session(secret_key, *, customer_id, return_url):
    return api_post(secret_key, '/billing_portal/sessions',
                    {'customer': customer_id, 'return_url': return_url})
