import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
export const POST: APIRoute = async ({ request, redirect, url }) => {
  const id = url.searchParams.get('id');
  const cookie = request.headers.get('cookie') ?? '';
  await fetch(`${ODOO}/api/spaces/${id}`, { method: 'DELETE', headers: { Cookie: cookie } });
  return redirect('/spaces', 302);
};
