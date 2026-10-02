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


def _space_or_404(space_id):
    space = request.env['testimonial.space'].browse(int(space_id))
    if not space.exists() or space.user_id.id != request.env.user.id:
        return None
    return space


class SpaceApiController(http.Controller):

    @http.route('/api/spaces', type='http', auth='user', methods=['GET'], csrf=False, cors='*')
    def list_spaces(self):
        spaces = request.env['testimonial.space'].search(
            [('user_id', '=', request.env.user.id), ('status', '=', 'active')])
        return _ok({'spaces': [s.to_dict(include_fields=False) for s in spaces]})

    @http.route('/api/spaces', type='http', auth='user', methods=['POST', 'OPTIONS'], csrf=False, cors='*')
    def create_space(self):
        if request.httprequest.method == 'OPTIONS':
            return _ok({})
        v = _body()
        if not (v.get('name') or '').strip():
            return _err('Space name is required.')
        try:
            space = request.env['testimonial.space'].create({
                'name': v['name'].strip(),
                'subtitle': (v.get('subtitle') or '').strip(),
                'slug': (v.get('slug') or '').strip() or False,
                'theme': v.get('theme') or 'minimal',
                'rating_enabled': bool(v.get('rating_enabled', True)),
            })
            # apply field config if provided: [{field_type, enabled, required}]
            for f in v.get('fields') or []:
                rec = space.field_ids.filtered(lambda r: r.field_type == f.get('field_type'))
                if rec:
                    rec.write({
                        'enabled': bool(f.get('enabled', True)),
                        'required': bool(f.get('required', False)),
                    })
        except ValidationError as e:
            return _err(str(e).replace('None', '').strip() or 'Could not create space.', 400)
        except Exception as e:
            return _err(f'Could not create space: {e}', 400)
        return _ok({'space': space.to_dict()})

    @http.route('/api/spaces/<int:space_id>', type='http', auth='user', methods=['GET'], csrf=False, cors='*')
    def get_space(self, space_id):
        space = _space_or_404(space_id)
        if not space:
            return _err('Space not found.', 404)
        return _ok({'space': space.to_dict()})

    @http.route('/api/spaces/<int:space_id>', type='http', auth='user', methods=['PUT'], csrf=False, cors='*')
    def update_space(self, space_id):
        space = _space_or_404(space_id)
        if not space:
            return _err('Space not found.', 404)
        v = _body()
        vals = {}
        for k in ('name', 'subtitle', 'slug', 'theme', 'status'):
            if k in v and v[k] is not None:
                vals[k] = v[k]
        if 'rating_enabled' in v:
            vals['rating_enabled'] = bool(v['rating_enabled'])
        try:
            space.write(vals)
            for f in v.get('fields') or []:
                rec = space.field_ids.filtered(lambda r: r.field_type == f.get('field_type'))
                if rec:
                    rec.write({
                        'enabled': bool(f.get('enabled', True)),
                        'required': bool(f.get('required', False)),
                    })
        except ValidationError as e:
            return _err(str(e), 400)
        except Exception as e:
            return _err(f'Could not update space: {e}', 400)
        return _ok({'space': space.to_dict()})

    @http.route('/api/spaces/<int:space_id>', type='http', auth='user', methods=['DELETE'], csrf=False, cors='*')
    def delete_space(self, space_id):
        space = _space_or_404(space_id)
        if not space:
            return _err('Space not found.', 404)
        space.write({'status': 'archived'})
        return _ok({'ok': True})
