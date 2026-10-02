import re
import secrets
from odoo import api, fields, models
from odoo.exceptions import ValidationError

# PRD §8 — 8 polished predefined themes for MVP
THEMES = {
    'minimal': {'label': 'Minimal', 'bg': '#ffffff', 'card': '#f8fafc', 'accent': '#111827', 'font': 'Inter, system-ui'},
    'bold': {'label': 'Bold', 'bg': '#111827', 'card': '#1f2937', 'accent': '#f59e0b', 'font': 'Inter, system-ui'},
    'warm': {'label': 'Warm', 'bg': '#fffbeb', 'card': '#ffffff', 'accent': '#d97706', 'font': 'Georgia, serif'},
    'ocean': {'label': 'Ocean', 'bg': '#eff6ff', 'card': '#ffffff', 'accent': '#2563eb', 'font': 'Inter, system-ui'},
    'forest': {'label': 'Forest', 'bg': '#f0fdf4', 'card': '#ffffff', 'accent': '#16a34a', 'font': 'Inter, system-ui'},
    'elegant': {'label': 'Elegant', 'bg': '#fafaf9', 'card': '#ffffff', 'accent': '#7c3aed', 'font': 'Georgia, serif'},
    'playful': {'label': 'Playful', 'bg': '#fdf4ff', 'card': '#ffffff', 'accent': '#db2777', 'font': 'Nunito, system-ui'},
    'dark': {'label': 'Dark Mono', 'bg': '#09090b', 'card': '#18181b', 'accent': '#22d3ee', 'font': 'monospace'},
}

# PRD §7 — optional predefined fields
DEFAULT_OPTIONAL_FIELDS = [
    ('company_name', 'Company Name'),
    ('job_title', 'Job Title'),
    ('profile_photo', 'Profile Photo'),
    ('website', 'Website'),
    ('linkedin', 'LinkedIn'),
    ('twitter', 'Twitter/X'),
    ('location', 'Location'),
]


def slugify(value, max_len=40):
    value = (value or 'space').lower()
    value = re.sub(r'[^a-z0-9]+', '-', value).strip('-')
    return (value or 'space')[:max_len].strip('-') or 'space'


class TestimonialSpace(models.Model):
    _name = 'testimonial.space'
    _description = 'Testimonial Collection Space'
    _order = 'create_date desc'

    user_id = fields.Many2one('res.users', required=True, index=True,
                              default=lambda self: self.env.user)
    name = fields.Char(required=True)
    subtitle = fields.Text()
    slug = fields.Char(required=True, index=True, copy=False)
    theme = fields.Selection([(k, v['label']) for k, v in THEMES.items()],
                             default='minimal', required=True)
    rating_enabled = fields.Boolean(default=True)
    status = fields.Selection([('active', 'Active'), ('archived', 'Archived')],
                              default='active', required=True, index=True)

    field_ids = fields.One2many('testimonial.space.field', 'space_id')

    _sql_constraints = [
        ('slug_unique', 'UNIQUE(slug)', 'Space URL slug must be unique.'),
    ]

    @api.model
    def _generate_unique_slug(self, name, wanted=None):
        base = slugify(wanted or name)
        slug = base
        for _ in range(5):
            if not self.search([('slug', '=', slug)], limit=1):
                return slug
            slug = f"{base}-{secrets.token_hex(2)}"
        return f"{base}-{secrets.token_hex(3)}"

    @api.model
    def create(self, vals):
        # Enforce plan limits server-side (PRD §3)
        user = vals.get('user_id') and self.env['res.users'].browse(vals['user_id']) or self.env.user
        if not vals.get('slug'):
            vals['slug'] = self._generate_unique_slug(vals.get('name', 'space'))
        else:
            vals['slug'] = slugify(vals['slug'])
            if self.search([('slug', '=', vals['slug'])], limit=1):
                raise ValidationError('This URL slug is already taken.')
        limits = user.get_plan_limits()
        count = self.search_count([('user_id', '=', user.id), ('status', '=', 'active')])
        if count >= limits['spaces']:
            raise ValidationError(
                f"Plan limit reached ({limits['spaces']} spaces). Upgrade to Pro to create more.")
        space = super().create(vals)
        # auto-create optional fields disabled by default except company/job
        existing = set()
        for i, (ftype, label) in enumerate(DEFAULT_OPTIONAL_FIELDS):
            space.env['testimonial.space.field'].create({
                'space_id': space.id,
                'field_type': ftype,
                'label': label,
                'enabled': ftype in ('company_name', 'job_title'),
                'required': False,
                'sort_order': (i + 1) * 10,
            })
        return space

    def write(self, vals):
        if 'slug' in vals and vals['slug']:
            vals['slug'] = slugify(vals['slug'])
            other = self.search([('slug', '=', vals['slug']), ('id', 'not in', self.ids)], limit=1)
            if other:
                raise ValidationError('This URL slug is already taken.')
        if 'theme' in vals and vals['theme'] not in THEMES:
            raise ValidationError('Unknown theme.')
        return super().write(vals)

    def _check_owner(self):
        if any(s.user_id.id != self.env.user.id for s in self):
            raise ValidationError('Access denied.')

    def to_dict(self, include_fields=True):
        self.ensure_one()
        d = {
            'id': self.id,
            'name': self.name,
            'subtitle': self.subtitle or '',
            'slug': self.slug,
            'public_url': f"/s/{self.slug}",
            'theme': self.theme,
            'theme_config': THEMES.get(self.theme, THEMES['minimal']),
            'rating_enabled': self.rating_enabled,
            'status': self.status,
        }
        if include_fields:
            d['fields'] = [
                f.to_dict() for f in self.field_ids.sorted('sort_order')
            ]
        return d

    def to_public_dict(self):
        self.ensure_one()
        return {
            'name': self.name,
            'subtitle': self.subtitle or '',
            'slug': self.slug,
            'theme': self.theme,
            'theme_config': THEMES.get(self.theme, THEMES['minimal']),
            'rating_enabled': self.rating_enabled,
            'fields': [f.to_dict() for f in self.field_ids.sorted('sort_order') if f.enabled],
        }
