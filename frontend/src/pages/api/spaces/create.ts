import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const payload = {
    name: String(form.get('name') || ''),
    subtitle: String(form.get('subtitle') || ''),
    slug: String(form.get('slug') || ''),
    theme: String(form.get('theme') || 'minimal'),
    rating_enabled: form.get('rating_enabled') === '1',
  };
  const cookie = request.headers.get('cookie') ?? '';
  const r = await fetch(`${ODOO}/api/spaces`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify(payload),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return redirect('/spaces/new?error=' + encodeURIComponent(j.error || 'Create failed'), 302);
  return redirect(`/spaces/${j.data.space.id}`, 302);
};
