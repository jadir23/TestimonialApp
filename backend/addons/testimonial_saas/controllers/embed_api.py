import json
from odoo import http
from odoo.exceptions import ValidationError
from odoo.http import request, Response


def _body():
    try:
        return json.loads(request.httprequest.data.decode() or '{}')
    except Exception:
        return {}


def _ok(data=None):
    return Response(json.dumps({'data': data or {}}), status=200,
                    content_type='application/json')


def _err(msg, status=400):
    return Response(json.dumps({'error': msg}), status=status,
                    content_type='application/json')


def _mine(embed_id):
    e = request.env['testimonial.embed'].browse(int(embed_id))
    if not e.exists() or e.space_id.user_id.id != request.env.user.id:
        return None
    return e


class EmbedApiController(http.Controller):

    @http.route('/api/embeds', type='http', auth='user', methods=['GET'], csrf=False, cors='*')
    def list_embeds(self):
        recs = request.env['testimonial.embed'].search(
            [('space_id.user_id', '=', request.env.user.id)])
        app_url = request.httprequest.headers.get('Origin') or ''
        return _ok({'embeds': [e.to_dict(app_url=app_url) for e in recs]})

    @http.route('/api/embeds', type='http', auth='user', methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def create_embed(self):
        if request.httprequest.method == 'OPTIONS':
            return _ok({})
        v = _body()
        if not (v.get('name') or '').strip():
            return _err('Embed name is required.')
        if not v.get('space_id'):
            return _err('Space is required.')
        try:
            e = request.env['testimonial.embed'].create({
                'name': v['name'].strip(),
                'space_id': int(v['space_id']),
                'layout': v.get('layout') or 'grid',
                'appearance': v.get('appearance') or 'light',
                'animation': v.get('animation') or 'none',
                'background': v.get('background') or 'transparent',
                'bg_color': v.get('bg_color') or '#ffffff',
                'testimonial_limit': int(v.get('testimonial_limit', 6)),
            })
        except ValidationError as e_:
            return _err(str(e_), 400)
        except Exception as e_:
            return _err(f'Could not create embed: {e_}', 400)
        return _ok({'embed': e.to_dict()})

    @http.route('/api/embeds/<int:embed_id>', type='http', auth='user', methods=['GET'], csrf=False, cors='*')
    def get_embed(self, embed_id):
        e = _mine(embed_id)
        if not e:
            return _err('Embed not found.', 404)
        # include published testimonials for live builder preview
        d = e.to_dict()
        d['preview'] = e.to_public_dict()['testimonials']
        return _ok({'embed': d})

    @http.route('/api/embeds/<int:embed_id>', type='http', auth='user', methods=['PUT'], csrf=False, cors='*')
    def update_embed(self, embed_id):
        e = _mine(embed_id)
        if not e:
            return _err('Embed not found.', 404)
        v = _body()
        vals = {}
        for k in ('name', 'layout', 'appearance', 'animation', 'background', 'bg_color'):
            if k in v and v[k] is not None:
                vals[k] = v[k]
        if 'testimonial_limit' in v:
            vals['testimonial_limit'] = int(v['testimonial_limit'])
        if 'space_id' in v and v['space_id']:
            vals['space_id'] = int(v['space_id'])
        try:
            e.write(vals)
        except ValidationError as e_:
            return _err(str(e_), 400)
        return _ok({'embed': e.to_dict()})

    @http.route('/api/embeds/<int:embed_id>', type='http', auth='user', methods=['DELETE'], csrf=False, cors='*')
    def delete_embed(self, embed_id):
        e = _mine(embed_id)
        if not e:
            return _err('Embed not found.', 404)
        e.unlink()
        return _ok({'ok': True})


class PublicEmbedController(http.Controller):
    # Published-only, no auth, no private data (PRD §15)

    @http.route('/api/public/embeds/<string:key>', type='http', auth='public',
                methods=['GET'], csrf=False, cors='*')
    def public_embed(self, key):
        e = request.env['testimonial.embed'].sudo().search(
            [('public_key', '=', key)], limit=1)
        if not e or e.space_id.status != 'active':
            return Response(json.dumps({'error': 'Widget not found.'}), status=404,
                            content_type='application/json')
        return Response(json.dumps({'data': {'embed': e.to_public_dict()}}),
                        status=200, content_type='application/json')
