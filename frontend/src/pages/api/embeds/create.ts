import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const payload = {
    name: String(form.get('name') || ''),
    space_id: String(form.get('space_id') || ''),
    layout: String(form.get('layout') || 'grid'),
    appearance: String(form.get('appearance') || 'light'),
    animation: String(form.get('animation') || 'none'),
    background: String(form.get('background') || 'transparent'),
    bg_color: String(form.get('bg_color') || '#ffffff'),
    testimonial_limit: Number(form.get('testimonial_limit') ?? 6),
  };
  const cookie = request.headers.get('cookie') ?? '';
  const r = await fetch(`${ODOO}/api/embeds`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify(payload),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return redirect('/embeds/new?error=' + encodeURIComponent(j.error || 'Create failed'), 302);
  return redirect(`/embeds/${j.data.embed.id}`, 302);
};
