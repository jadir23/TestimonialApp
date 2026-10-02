import json
from odoo import http
from odoo.exceptions import ValidationError
from odoo.http import request, Response


def _parse_body():
    ctype = request.httprequest.content_type or ''
    if 'application/json' in ctype:
        try:
            return json.loads(request.httprequest.data.decode() or '{}')
        except Exception:
            return {}
    # form posts (Astro SSR proxy sends JSON; direct HTML posts send form)
    form = request.httprequest.form
    return {k: form.get(k) for k in form.keys()}


def _resp(payload, status=200):
    return Response(json.dumps(payload), status=status, content_type='application/json')


class PublicSubmitController(http.Controller):

    @http.route('/api/public/s/<string:slug>/submit', type='http', auth='public',
                methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def submit(self, slug):
        if request.httprequest.method == 'OPTIONS':
            return _resp({'data': {}})
        space = request.env['testimonial.space'].sudo().search(
            [('slug', '=', slug), ('status', '=', 'active')], limit=1)
        if not space:
            return _resp({'error': 'Space not found.'}, 404)
        vals = _parse_body()
        # normalize checkbox/empty values
        if isinstance(vals.get('consent'), str):
            vals['consent'] = vals['consent'] in ('1', 'true', 'on', 'True')
        try:
            t = request.env['testimonial.testimonial'].sudo().public_submit(space, vals)
        except ValidationError as e:
            return _resp({'error': str(e)}, 400)
        except Exception as e:
            return _resp({'error': f'Could not submit: {e}'}, 400)
        # honeypot drop returns success without id
        if not t:
            return _resp({'data': {'ok': True}})
        return _resp({'data': {'ok': True, 'id': t.id}})
