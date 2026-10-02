from datetime import datetime

from odoo import api, fields, models


class Subscription(models.Model):
    _name = 'testimonial.subscription'
    _description = 'Stripe Subscription (webhook is authoritative, PRD §17)'
    _order = 'create_date desc'

    user_id = fields.Many2one('res.users', required=True, index=True, ondelete='cascade')
    stripe_customer_id = fields.Char(index=True)
    stripe_subscription_id = fields.Char(index=True)
    plan = fields.Selection([('free', 'Free'), ('pro', 'Pro')], default='free', required=True)
    status = fields.Selection([
        ('none', 'None'), ('active', 'Active'), ('trialing', 'Trialing'),
        ('past_due', 'Past due'), ('unpaid', 'Unpaid'),
        ('canceled', 'Canceled'), ('incomplete', 'Incomplete'),
    ], default='none', required=True)
    current_period_start = fields.Datetime()
    current_period_end = fields.Datetime()

    _sql_constraints = [
        ('stripe_sub_unique', 'UNIQUE(stripe_subscription_id)',
         'Stripe subscription must be unique.'),
    ]

    def to_dict(self):
        self.ensure_one()
        return {
            'plan': self.plan,
            'status': self.status,
            'stripe_subscription_id': self.stripe_subscription_id or None,
            'current_period_start': fields.Datetime.to_string(self.current_period_start) if self.current_period_start else None,
            'current_period_end': fields.Datetime.to_string(self.current_period_end) if self.current_period_end else None,
        }

    @api.model
    def _find_user(self, obj):
        meta = (obj.get('metadata') or {})
        uid = meta.get('odoo_user_id')
        if uid and str(uid).isdigit():
            user = self.env['res.users'].browse(int(uid))
            if user.exists():
                return user
        cust = obj.get('customer')
        if cust:
            user = self.env['res.users'].search([('stripe_customer_id', '=', cust)], limit=1)
            if user:
                return user
        email = (obj.get('customer_email') or obj.get('customer_details', {}).get('email') or '')
        if email:
            return self.env['res.users'].search([('login', '=', email.lower())], limit=1)
        return None

    @staticmethod
    def _ts(value):
        if not value:
            return False
        return fields.Datetime.to_string(datetime.fromtimestamp(int(value)))

    @api.model
    def _upsert_from_subscription(self, sub):
        """Create/update from a Stripe subscription object. Returns record."""
        user = self._find_user(sub)
        if not user:
            return None
        status = sub.get('status', 'incomplete')
        plan = 'pro' if status in ('active', 'trialing') else (
            'free' if status in ('canceled', 'incomplete_expired') else user.saas_plan)
        vals = {
            'user_id': user.id,
            'stripe_customer_id': sub.get('customer'),
            'stripe_subscription_id': sub.get('id'),
            'plan': plan,
            'status': status if status in dict(self._fields['status'].selection) else 'incomplete',
            'current_period_start': self._ts(sub.get('current_period_start') or sub.get('trial_start')),
            'current_period_end': self._ts(sub.get('current_period_end') or sub.get('trial_end')),
        }
        rec = self.search([('stripe_subscription_id', '=', sub.get('id'))], limit=1)
        if rec:
            rec.write(vals)
        else:
            # one active row per user: reuse user's row if it has no stripe id yet
            mine = self.search([('user_id', '=', user.id)], limit=1, order='create_date desc')
            if mine and not mine.stripe_subscription_id:
                mine.write(vals)
                rec = mine
            else:
                rec = self.create(vals)
        # plan change is authoritative here — never from the frontend redirect
        if user.saas_plan != plan and plan in ('free', 'pro'):
            user.sudo().write({
                'saas_plan': plan,
                'stripe_customer_id': sub.get('customer') or user.stripe_customer_id,
                'stripe_subscription_id': sub.get('id'),
            })
        return rec

    @api.model
    def _handle_stripe_event(self, event):
        etype = event.get('type', '')
        obj = (event.get('data') or {}).get('object') or {}
        if etype == 'checkout.session.completed':
            sub_id = obj.get('subscription')
            if sub_id:
                # subscription created/updated events carry the status; record
                # the link now so a missing sub-event still leaves a trace.
                user = self._find_user(obj)
                if user:
                    if not self.search([('stripe_subscription_id', '=', sub_id)], limit=1):
                        self.create({
                            'user_id': user.id,
                            'stripe_customer_id': obj.get('customer'),
                            'stripe_subscription_id': sub_id,
                            'plan': user.saas_plan,
                            'status': 'incomplete',
                        })
                    user.sudo().write({
                        'stripe_customer_id': obj.get('customer') or user.stripe_customer_id,
                    })
        elif etype in ('customer.subscription.created', 'customer.subscription.updated'):
            self._upsert_from_subscription(obj)
        elif etype == 'customer.subscription.deleted':
            rec = self._upsert_from_subscription(dict(obj, status='canceled'))
            if rec:
                rec.user_id.sudo().write({'saas_plan': 'free'})
        elif etype == 'invoice.payment_failed':
            sid = obj.get('subscription')
            if sid:
                rec = self.search([('stripe_subscription_id', '=', sid)], limit=1)
                if rec:
                    rec.write({'status': 'past_due'})
            # keep plan until canceled — billing page shows a warning instead
        return True
