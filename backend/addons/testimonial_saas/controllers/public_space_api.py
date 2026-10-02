import json
from odoo import http
from odoo.http import request, Response


class PublicSpaceController(http.Controller):

    @http.route('/api/public/s/<string:slug>', type='http', auth='public',
                methods=['GET'], csrf=False, cors='*')
    def public_space(self, slug):
        space = request.env['testimonial.space'].sudo().search(
            [('slug', '=', slug), ('status', '=', 'active')], limit=1)
        if not space:
            return Response(json.dumps({'error': 'Space not found.'}), status=404,
                            content_type='application/json')
        return Response(json.dumps({'data': {'space': space.to_public_dict()}}),
                        status=200, content_type='application/json')

    @http.route('/api/themes', type='http', auth='public',
                methods=['GET'], csrf=False, cors='*')
    def themes(self):
        from ..models.space import THEMES
        return Response(json.dumps({'data': {'themes': THEMES}}),
                        status=200, content_type='application/json')
