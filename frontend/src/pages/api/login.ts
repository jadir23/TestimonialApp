import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';

/**
 * Only allow same-site *relative* redirects. Rejects absolute URLs,
 * protocol-relative "//evil.com", and backslash variants that some
 * browsers normalise into "//evil.com".
 */
function safeNext(raw: FormDataEntryValue | null): string {
  const v = String(raw ?? '');
  if (!v.startsWith('/') || v.startsWith('//') || v.startsWith('/\\')) return '/dashboard';
  return v;
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const payload = {
    email: String(form.get('email') || ''),
    password: String(form.get('password') || ''),
  };
  const next = safeNext(form.get('next'));

  const r = await fetch(`${ODOO}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    return redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`, 302);
  }
  const headers = new Headers({ Location: next });
  const sc = r.headers.get('set-cookie');
  if (sc) headers.set('set-cookie', sc);
  return new Response(null, { status: 302, headers });
};