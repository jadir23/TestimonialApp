import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  await fetch(`${ODOO}/api/auth/request-reset`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: String(form.get('email') || '') }),
  });
  return redirect('/forgot-password?sent=1', 302);
};
