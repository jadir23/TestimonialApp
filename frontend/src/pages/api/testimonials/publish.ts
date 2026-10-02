import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
async function act(action: string, id: string | null, cookie: string, method = 'POST') {
  const url = action === 'delete'
    ? `${ODOO}/api/testimonials/${id}`
    : `${ODOO}/api/testimonials/${id}/${action}`;
  return fetch(url, { method: action === 'delete' ? 'DELETE' : method, headers: { Cookie: cookie } });
}
function route(action: string): APIRoute {
  return async ({ request, redirect, url }) => {
    const id = url.searchParams.get('id');
    const back = url.searchParams.get('back') || '/inbox';
    const cookie = request.headers.get('cookie') ?? '';
    await act(action, id, cookie);
    return redirect(back, 302);
  };
}
export const POST: APIRoute = route('publish');
