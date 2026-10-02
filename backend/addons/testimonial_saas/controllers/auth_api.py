import json
import re
from odoo import http
from odoo.http import request, Response

EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')


def _json_body():
    try:
        return json.loads(request.httprequest.data.decode() or '{}')
    except Exception:
        return {}


def _ok(data=None):
    return Response(
        json.dumps({'data': data or {}}),
        status=200, content_type='application/json',
        headers=[('Access-Control-Allow-Origin', '*')],
    )


def _err(message, status=400):
    return Response(
        json.dumps({'error': message}),
        status=status, content_type='application/json',
        headers=[('Access-Control-Allow-Origin', '*')],
    )


def _authenticate(login, password):
    """Log the current session in.

    The db comes from ``request.db`` (resolved by Odoo), not
    ``request.session.db``: for an anonymous visitor the session has no db
    yet, and ``Registry(None)`` fails with "Access Denied".

    Odoo 18 changed ``Session.authenticate`` to take a single ``credential``
    dict; <=17 took ``(db, login, password)``. Support both so the addon is
    not pinned to one image version.
    """
    db = request.db or request.session.db
    # res.users._login() validates credentials on a *separate* cursor, so
    # anything created earlier in this request (e.g. the signup user) must be
    # committed first or the login cannot see it.
    request.env.cr.commit()
    credential = {'login': login, 'password': password, 'type': 'password'}
    try:
        return request.session.authenticate(db, credential)
    except TypeError:
        return request.session.authenticate(db, login, password)


class AuthApiController(http.Controller):
    # ---------- SIGNUP ----------
    @http.route('/api/auth/signup', type='http', auth='public',
                methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def signup(self):
        if request.httprequest.method == 'OPTIONS':
            return _ok({})
        vals = _json_body()
        name = (vals.get('name') or '').strip()
        email = (vals.get('email') or '').strip().lower()
        password = vals.get('password') or ''

        if not name:
            return _err('Name is required.')
        if not EMAIL_RE.match(email):
            return _err('Valid email is required.')
        if len(password) < 8:
            return _err('Password must be at least 8 characters.')

        if request.env['res.users'].sudo().search([('login', '=', email)], limit=1):
            return _err('An account with this email already exists.', 409)

        try:
            user = request.env['res.users'].sudo().create({
                'name': name,
                'login': email,
                'email': email,
                'password': password,
                'saas_plan': 'free',
            })
        except Exception as e:
            return _err(f'Could not create account: {e}', 400)

        # auto-login: establish session
        _authenticate(email, password)
        return _ok({'user': user.to_public_dict()})

    # ---------- LOGIN ----------
    @http.route('/api/auth/login', type='http', auth='public',
                methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def login(self):
        if request.httprequest.method == 'OPTIONS':
            return _ok({})
        vals = _json_body()
        email = (vals.get('email') or vals.get('login') or '').strip().lower()
        password = vals.get('password') or ''
        if not email or not password:
            return _err('Email and password are required.')
        try:
            _authenticate(email, password)
        except Exception:
            return _err('Invalid email or password.', 401)
        user = request.env.user
        return _ok({'user': user.to_public_dict()})

    # ---------- LOGOUT ----------
    @http.route('/api/auth/logout', type='http', auth='user',
                methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def logout(self):
        if request.httprequest.method == 'OPTIONS':
            return _ok({})
        request.session.logout()
        return _ok({'ok': True})

    # ---------- ME ----------
    @http.route('/api/auth/me', type='http', auth='user',
                methods=['GET', 'OPTIONS'], csrf=False, cors='*')
    def me(self):
        user = request.env.user
        if user._is_public():
            return _err('Not authenticated.', 401)
        limits = user.get_plan_limits()
        d = user.to_public_dict()
        d['limits'] = limits
        return _ok({'user': d})

    # ---------- PASSWORD RESET (MVP: delegates to Odoo mail template) ----------
    @http.route('/api/auth/request-reset', type='http', auth='public',
                methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def request_reset(self):
        if request.httprequest.method == 'OPTIONS':
            return _ok({})
        vals = _json_body()
        email = (vals.get('email') or '').strip().lower()
        if not EMAIL_RE.match(email):
            return _err('Valid email is required.')
        user = request.env['res.users'].sudo().search([('login', '=', email)], limit=1)
        if user:
            try:
                user.action_reset_password()
            except Exception:
                pass  # never leak whether account exists
        # Always return ok to avoid email enumeration
        return _ok({'ok': True, 'message': 'If an account exists, a reset email was sent.'})
