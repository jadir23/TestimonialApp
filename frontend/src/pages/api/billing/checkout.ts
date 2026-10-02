import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
export const POST: APIRoute = async ({ request, redirect }) => {
  const cookie = request.headers.get('cookie') ?? '';
  const r = await fetch(`${ODOO}/api/billing/checkout`, { method: 'POST', headers: { Cookie: cookie } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.data?.checkout_url) {
    return redirect('/billing?error=' + encodeURIComponent(j.error || 'Checkout failed'), 302);
  }
  return redirect(j.data.checkout_url, 302);
};
