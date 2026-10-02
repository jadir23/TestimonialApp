import json
from collections import Counter
from datetime import datetime, timedelta
from odoo import http
from odoo.http import request, Response


def _ok(data=None):
    return Response(json.dumps({'data': data or {}}), status=200,
                    content_type='application/json')


class DashboardController(http.Controller):

    @http.route('/api/dashboard/stats', type='http', auth='user',
                methods=['GET'], csrf=False, cors='*')
    def stats(self):
        user = request.env.user
        args = request.httprequest.args
        rng = args.get('range', '30d')
        today = datetime.utcnow().date()

        if rng == '7d':
            days, date_from, date_to = 7, today - timedelta(days=6), today
        elif rng == '90d':
            days, date_from, date_to = 90, today - timedelta(days=89), today
        elif rng == 'custom':
            try:
                date_from = datetime.strptime(args.get('from', ''), '%Y-%m-%d').date()
                date_to = datetime.strptime(args.get('to', ''), '%Y-%m-%d').date()
            except ValueError:
                return Response(json.dumps({'error': 'Use from/to as YYYY-MM-DD.'}),
                                status=400, content_type='application/json')
            if date_from > date_to:
                date_from, date_to = date_to, date_from
            days = min((date_to - date_from).days + 1, 365)
            date_from = date_to - timedelta(days=days - 1)
        else:
            rng, days = '30d', 30
            date_from, date_to = today - timedelta(days=29), today

        T = request.env['testimonial.testimonial']
        S = request.env['testimonial.space']
        mine = [('space_id.user_id', '=', user.id)]

        total_spaces = S.search_count([('user_id', '=', user.id), ('status', '=', 'active')])
        total_testimonials = T.search_count(mine)

        # distinct submitters (customers) — SQL distinct for efficiency
        request.env.cr.execute(
            """SELECT COUNT(DISTINCT lower(email)) FROM testimonial_testimonial t
               JOIN testimonial_space s ON s.id = t.space_id WHERE s.user_id = %s""",
            (user.id,))
        total_customers = request.env.cr.fetchone()[0] or 0

        # per-day series in window (bucket in Python, cap scan at 10k rows)
        dt_from = datetime.combine(date_from, datetime.min.time())
        dt_to = datetime.combine(date_to, datetime.max.time())
        recs = T.search(mine + [('submitted_at', '>=', dt_from.strftime('%Y-%m-%d %H:%M:%S')),
                                ('submitted_at', '<=', dt_to.strftime('%Y-%m-%d %H:%M:%S'))],
                        order='submitted_at asc', limit=10000)
        per_day = Counter()
        for t in recs:
            d = (t.submitted_at.date().isoformat()
                 if hasattr(t.submitted_at, 'date') else str(t.submitted_at)[:10])
            per_day[d] += 1
        series = []
        for i in range(days):
            d = (date_from + timedelta(days=i)).isoformat()
            series.append({'date': d, 'count': per_day.get(d, 0)})
        in_window = sum(per_day.values())

        limits = user.get_plan_limits()
        spaces = S.search([('user_id', '=', user.id), ('status', '=', 'active')])
        usage = []
        for s in spaces:
            c = T.search_count([('space_id', '=', s.id)])
            lim = limits['testimonials_per_space']
            usage.append({'id': s.id, 'name': s.name, 'slug': s.slug,
                          'count': c, 'limit': lim,
                          'pct': round(100 * c / lim) if lim else 0})

        return _ok({
            'range': rng, 'from': date_from.isoformat(), 'to': date_to.isoformat(),
            'totals': {'spaces': total_spaces, 'testimonials': total_testimonials,
                       'customers': total_customers, 'in_window': in_window},
            'plan': user.saas_plan, 'limits': limits,
            'space_limit': limits['spaces'],
            'series': series, 'usage': usage,
        })
