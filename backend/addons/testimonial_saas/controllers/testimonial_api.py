import json
from odoo import http
from odoo.exceptions import ValidationError
from odoo.http import request, Response


def _ok(data=None):
    return Response(json.dumps({'data': data or {}}), status=200,
                    content_type='application/json')


def _err(msg, status=400):
    return Response(json.dumps({'error': msg}), status=status,
                    content_type='application/json')


def _mine(record_id):
    t = request.env['testimonial.testimonial'].browse(int(record_id))
    if not t.exists() or t.space_id.user_id.id != request.env.user.id:
        return None
    return t


class TestimonialApiController(http.Controller):

    @http.route('/api/testimonials', type='http', auth='user', methods=['GET'], csrf=False, cors='*')
    def list_testimonials(self):
        domain = [('space_id.user_id', '=', request.env.user.id)]
        args = request.httprequest.args
        status = args.get('status')
        if status in ('pending', 'published', 'hidden'):
            domain.append(('status', '=', status))
        elif status == 'favorites':
            domain.append(('is_favorite', '=', True))
        space_id = args.get('space_id')
        if space_id and str(space_id).isdigit():
            domain.append(('space_id', '=', int(space_id)))
        recs = request.env['testimonial.testimonial'].search(domain, order='is_favorite desc, create_date desc', limit=200)
        spaces = request.env['testimonial.space'].search(
            [('user_id', '=', request.env.user.id), ('status', '=', 'active')])
        return _ok({
            'testimonials': [t.to_dict() for t in recs],
            'spaces': [{'id': s.id, 'name': s.name} for s in spaces],
        })

    def _act(self, record_id, action):
        t = _mine(record_id)
        if not t:
            return _err('Testimonial not found.', 404)
        try:
            if action == 'publish':
                t.write({'status': 'published'})
            elif action == 'hide':
                t.write({'status': 'hidden'})
            elif action == 'favorite':
                t.write({'is_favorite': not t.is_favorite})
            else:
                return _err('Unknown action.', 400)
        except ValidationError as e:
            return _err(str(e), 400)
        return _ok({'testimonial': t.to_dict()})

    @http.route('/api/testimonials/<int:record_id>/publish', type='http', auth='user', methods=['POST'], csrf=False, cors='*')
    def publish(self, record_id):
        return self._act(record_id, 'publish')

    @http.route('/api/testimonials/<int:record_id>/hide', type='http', auth='user', methods=['POST'], csrf=False, cors='*')
    def hide(self, record_id):
        return self._act(record_id, 'hide')

    @http.route('/api/testimonials/<int:record_id>/favorite', type='http', auth='user', methods=['POST'], csrf=False, cors='*')
    def favorite(self, record_id):
        return self._act(record_id, 'favorite')

    @http.route('/api/testimonials/<int:record_id>', type='http', auth='user', methods=['DELETE'], csrf=False, cors='*')
    def delete(self, record_id):
        t = _mine(record_id)
        if not t:
            return _err('Testimonial not found.', 404)
        t.unlink()
        return _ok({'ok': True})
