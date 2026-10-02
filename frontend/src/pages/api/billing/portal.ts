import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
export const POST: APIRoute = async ({ request, redirect }) => {
  const cookie = request.headers.get('cookie') ?? '';
  const r = await fetch(`${ODOO}/api/billing/portal`, { method: 'POST', headers: { Cookie: cookie } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.data?.portal_url) {
    return redirect('/billing?error=' + encodeURIComponent(j.error || 'Portal failed'), 302);
  }
  return redirect(j.data.portal_url, 302);
};
