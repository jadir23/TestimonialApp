from odoo import fields, models

class TestimonialSpaceField(models.Model):
    _name = 'testimonial.space.field'
    _description = 'Space Submission Field'
    _order = 'sort_order, id'

    space_id = fields.Many2one('testimonial.space', required=True,
                               ondelete='cascade', index=True)
    field_type = fields.Selection([
        ('company_name', 'Company Name'),
        ('job_title', 'Job Title'),
        ('profile_photo', 'Profile Photo'),
        ('website', 'Website'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'Twitter/X'),
        ('location', 'Location'),
    ], required=True, index=True)
    label = fields.Char(required=True)
    enabled = fields.Boolean(default=True)
    required = fields.Boolean(default=False)
    sort_order = fields.Integer(default=10)

    def to_dict(self):
        self.ensure_one()
        return {
            'id': self.id,
            'field_type': self.field_type,
            'label': self.label,
            'enabled': self.enabled,
            'required': self.required,
            'sort_order': self.sort_order,
        }
