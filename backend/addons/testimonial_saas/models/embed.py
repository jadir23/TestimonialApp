import secrets
from odoo import api, fields, models
from odoo.exceptions import ValidationError

LAYOUTS = [('grid', 'Grid/Masonry'), ('carousel', 'Carousel')]
APPEARANCES = [('light', 'Light'), ('dark', 'Dark'), ('auto', 'Auto')]
ANIMATIONS = [('none', 'None'), ('fade', 'Fade'), ('slide', 'Slide')]
BACKGROUNDS = [('transparent', 'Transparent'), ('custom', 'Custom color')]
LIMITS = [3, 6, 9, 0]  # 0 = All (capped at 50 in widget)


class TestimonialEmbed(models.Model):
    _name = 'testimonial.embed'
    _description = 'Embeddable Testimonial Widget'
    _order = 'create_date desc'

    space_id = fields.Many2one('testimonial.space', required=True,
                               ondelete='cascade', index=True)
    user_id = fields.Many2one('res.users', related='space_id.user_id',
                              store=True, index=True, readonly=True)
    name = fields.Char(required=True)
    layout = fields.Selection(LAYOUTS, default='grid', required=True)
    appearance = fields.Selection(APPEARANCES, default='light', required=True)
    animation = fields.Selection(ANIMATIONS, default='none', required=True)
    background = fields.Selection(BACKGROUNDS, default='transparent', required=True)
    bg_color = fields.Char(default='#ffffff')
    testimonial_limit = fields.Integer(default=6,
        help='3, 6, 9 or 0 for All (widget caps at 50).')
    public_key = fields.Char(required=True, index=True, copy=False,
                             default=lambda self: secrets.token_urlsafe(16))

    _sql_constraints = [
        ('public_key_unique', 'UNIQUE(public_key)', 'Embed key must be unique.'),
    ]

    @api.model
    def create(self, vals):
        if vals.get('layout') and vals['layout'] not in dict(LAYOUTS):
            raise ValidationError('Unknown layout.')
        if vals.get('appearance') and vals['appearance'] not in dict(APPEARANCES):
            raise ValidationError('Unknown appearance.')
        if vals.get('animation') and vals['animation'] not in dict(ANIMATIONS):
            raise ValidationError('Unknown animation.')
        if vals.get('background') and vals['background'] not in dict(BACKGROUNDS):
            raise ValidationError('Unknown background.')
        if 'testimonial_limit' in vals and vals['testimonial_limit'] not in LIMITS:
            raise ValidationError('Testimonial count must be 3, 6, 9 or All.')
        space = self.env['testimonial.space'].browse(vals.get('space_id'))
        if not space.exists() or space.user_id.id != self.env.user.id:
            raise ValidationError('Invalid space.')
        return super().create(vals)

    def write(self, vals):
        if any(e.space_id.user_id.id != self.env.user.id for e in self):
            raise ValidationError('Access denied.')
        if 'testimonial_limit' in vals and vals['testimonial_limit'] not in LIMITS:
            raise ValidationError('Testimonial count must be 3, 6, 9 or All.')
        return super().write(vals)

    def _published(self, limit=None):
        self.ensure_one()
        lim = self.testimonial_limit if limit is None else limit
        domain = [('space_id', '=', self.space_id.id), ('status', '=', 'published')]
        recs = self.env['testimonial.testimonial'].search(
            domain, order='is_favorite desc, create_date desc',
            limit=50 if not lim else lim)
        return recs

    def to_dict(self, app_url=''):
        self.ensure_one()
        key = self.public_key
        snippet = (f'<script src="{app_url}/embed.js" async></script>\n'
                   f'<div data-testimonial-widget="{key}"></div>')
        return {
            'id': self.id, 'space_id': self.space_id.id,
            'space_name': self.space_id.name, 'name': self.name,
            'layout': self.layout, 'appearance': self.appearance,
            'animation': self.animation, 'background': self.background,
            'bg_color': self.bg_color, 'testimonial_limit': self.testimonial_limit,
            'public_key': key, 'snippet': snippet,
        }

    def to_public_dict(self):
        self.ensure_one()
        testimonials = [{
            'name': t.name, 'company_name': t.company_name or '',
            'job_title': t.job_title or '', 'rating': t.rating or None,
            'content': t.content, 'profile_photo': t.profile_photo or '',
        } for t in self._published()]
        return {
            'layout': self.layout, 'appearance': self.appearance,
            'animation': self.animation, 'background': self.background,
            'bg_color': self.bg_color, 'space_name': self.space_id.name,
            'testimonials': testimonials,
        }
