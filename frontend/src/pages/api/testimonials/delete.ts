import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
export const POST: APIRoute = async ({ request, redirect, url }) => {
  const id = url.searchParams.get('id');
  const back = url.searchParams.get('back') || '/inbox';
  const cookie = request.headers.get('cookie') ?? '';
  await fetch(`${ODOO}/api/testimonials/${id}`, { method: 'DELETE', headers: { Cookie: cookie } });
  return redirect(back, 302);
};
