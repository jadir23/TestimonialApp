from odoo import fields, models

class ResUsers(models.Model):
    _inherit = 'res.users'

    saas_plan = fields.Selection(
        [('free', 'Free'), ('pro', 'Pro')],
        default='free', required=True, index=True,
        help='SaaS subscription plan. Source of truth is Stripe webhook (PRD §17).',
    )
    stripe_customer_id = fields.Char(index=True, copy=False)
    stripe_subscription_id = fields.Char(index=True, copy=False)

    PLAN_LIMITS = {
        'free': {'spaces': 3, 'testimonials_per_space': 100},
        'pro': {'spaces': 25, 'testimonials_per_space': 1000},
    }

    def get_plan_limits(self):
        self.ensure_one()
        return self.PLAN_LIMITS.get(self.saas_plan, self.PLAN_LIMITS['free'])

    def to_public_dict(self):
        self.ensure_one()
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'plan': self.saas_plan,
        }
