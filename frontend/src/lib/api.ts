// Server-side Odoo client. Browser never talks to Odoo directly (Phase 1).
const ODOO_URL = import.meta.env.ODOO_URL ?? process.env.ODOO_URL ?? 'http://localhost:8069';

export async function odooPost(path: string, body: unknown, cookie?: string) {
  const res = await fetch(`${ODOO_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json, sessionCookie: res.headers.get('set-cookie') };
}

export async function odooGet(path: string, cookie?: string) {
  const res = await fetch(`${ODOO_URL}${path}`, {
    headers: cookie ? { Cookie: cookie } : {},
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}
