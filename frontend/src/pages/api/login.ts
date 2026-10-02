import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const payload = {
    email: String(form.get('email') || ''),
    password: String(form.get('password') || ''),
  };
  const r = await fetch(`${ODOO}/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) return redirect('/login?error=' + encodeURIComponent('Invalid email or password'), 302);
  const headers = new Headers({ Location: '/dashboard' });
  const sc = r.headers.get('set-cookie');
  if (sc) headers.set('set-cookie', sc);
  return new Response(null, { status: 302, headers });
};
