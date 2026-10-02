import re
from datetime import datetime, timedelta
from odoo import api, fields, models
from odoo.exceptions import ValidationError

EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
MAX_CONTENT_LEN = 2000


class Testimonial(models.Model):
    _name = 'testimonial.testimonial'
    _description = 'Collected Testimonial'
    _order = 'is_favorite desc, create_date desc'

    space_id = fields.Many2one('testimonial.space', required=True,
                               ondelete='cascade', index=True)
    user_id = fields.Many2one('res.users', related='space_id.user_id',
                              store=True, index=True, readonly=True)

    name = fields.Char(required=True)
    email = fields.Char(required=True, index=True)
    company_name = fields.Char()
    job_title = fields.Char()
    profile_photo = fields.Char(help='URL to profile photo (MVP: URL string, no binary upload).')
    website = fields.Char()
    linkedin = fields.Char()
    twitter = fields.Char()
    location = fields.Char()

    rating = fields.Integer(help='1-5, only if space rating is enabled.')
    content = fields.Text(required=True)

    consent = fields.Boolean(default=False)
    consent_at = fields.Datetime()
    status = fields.Selection([('pending', 'Pending'), ('published', 'Published'),
                               ('hidden', 'Hidden')],
                              default='pending', required=True, index=True)
    is_favorite = fields.Boolean(default=False, index=True)
    submitted_at = fields.Datetime(default=fields.Datetime.now, required=True)

    @api.model
    def _validate_submit(self, space, vals):
        name = (vals.get('name') or '').strip()
        email = (vals.get('email') or '').strip().lower()
        content = (vals.get('content') or '').strip()
        if not name:
            raise ValidationError('Name is required.')
        if not EMAIL_RE.match(email):
            raise ValidationError('Valid email is required.')
        if not content:
            raise ValidationError('Testimonial text is required.')
        if len(content) > MAX_CONTENT_LEN:
            raise ValidationError(f'Testimonial must be under {MAX_CONTENT_LEN} characters.')
        if not vals.get('consent'):
            raise ValidationError('Consent is required.')
        rating = vals.get('rating')
        if rating not in (None, '', False):
            if not space.rating_enabled:
                raise ValidationError('Ratings are disabled for this space.')
            try:
                rating = int(rating)
            except (TypeError, ValueError):
                raise ValidationError('Rating must be 1-5.')
            if rating < 1 or rating > 5:
                raise ValidationError('Rating must be 1-5.')
        # field-level required enforcement from space config
        for f in space.field_ids.filtered(lambda r: r.enabled and r.required):
            if not (vals.get(f.field_type) or '').strip():
                raise ValidationError(f'{f.label} is required.')
        # per-space testimonial limit (PRD §3) — server-side
        limits = space.user_id.get_plan_limits()
        count = self.search_count([('space_id', '=', space.id)])
        if count >= limits['testimonials_per_space']:
            raise ValidationError(
                'This space has reached its testimonial limit. Please contact the owner.')
        # basic anti-spam: max 3 submissions per email+space per hour
        hour_ago = fields.Datetime.to_string(datetime.utcnow() - timedelta(hours=1))
        recent = self.search_count([
            ('space_id', '=', space.id),
            ('email', '=', email),
            ('submitted_at', '>=', hour_ago),
        ])
        if recent >= 3:
            raise ValidationError('Too many submissions. Please try again later.')

    @api.model
    def public_submit(self, space, vals):
        # honeypot: silently accept but drop (don't reveal to bots)
        if (vals.get('website_url') or '').strip():
            return None
        self._validate_submit(space, vals)
        rating = vals.get('rating')
        data = {
            'space_id': space.id,
            'name': (vals.get('name') or '').strip()[:120],
            'email': (vals.get('email') or '').strip().lower()[:160],
            'content': (vals.get('content') or '').strip()[:MAX_CONTENT_LEN],
            'consent': True,
            'consent_at': fields.Datetime.now(),
            'status': 'pending',
            'submitted_at': fields.Datetime.now(),
        }
        for k in ('company_name', 'job_title', 'profile_photo', 'website',
                  'linkedin', 'twitter', 'location'):
            if vals.get(k):
                data[k] = str(vals[k]).strip()[:255]
        if rating not in (None, '', False):
            data['rating'] = int(rating)
        return self.create(data)

    def _check_owner(self):
        if any(t.space_id.user_id.id != self.env.user.id for t in self):
            raise ValidationError('Access denied.')

    def to_dict(self):
        self.ensure_one()
        return {
            'id': self.id,
            'space_id': self.space_id.id,
            'space_name': self.space_id.name,
            'name': self.name,
            'email': self.email,
            'company_name': self.company_name or '',
            'job_title': self.job_title or '',
            'profile_photo': self.profile_photo or '',
            'website': self.website or '',
            'linkedin': self.linkedin or '',
            'twitter': self.twitter or '',
            'location': self.location or '',
            'rating': self.rating or None,
            'content': self.content,
            'consent': self.consent,
            'status': self.status,
            'is_favorite': self.is_favorite,
            'submitted_at': fields.Datetime.to_string(self.submitted_at) if self.submitted_at else None,
        }
