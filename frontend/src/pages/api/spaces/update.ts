import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
const FIELD_TYPES = ['company_name','job_title','profile_photo','website','linkedin','twitter','location'];
export const POST: APIRoute = async ({ request, redirect, url }) => {
  const id = url.searchParams.get('id');
  const form = await request.formData();
  const fields = FIELD_TYPES.map((t) => ({
    field_type: t,
    enabled: form.get(`field_${t}_enabled`) === '1',
    required: form.get(`field_${t}_required`) === '1',
  }));
  const payload = {
    name: String(form.get('name') || ''),
    subtitle: String(form.get('subtitle') || ''),
    slug: String(form.get('slug') || ''),
    theme: String(form.get('theme') || 'minimal'),
    rating_enabled: form.get('rating_enabled') === '1',
    fields,
  };
  const cookie = request.headers.get('cookie') ?? '';
  const r = await fetch(`${ODOO}/api/spaces/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify(payload),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return redirect(`/spaces/${id}/settings?error=` + encodeURIComponent(j.error || 'Save failed'), 302);
  return redirect(`/spaces/${id}/settings?saved=1`, 302);
};
