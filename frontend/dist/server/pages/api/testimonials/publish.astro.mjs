export { renderers } from '../../../renderers.mjs';

const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
async function act(action, id, cookie, method = "POST") {
  const url = `${ODOO}/api/testimonials/${id}/${action}`;
  return fetch(url, { method: method, headers: { Cookie: cookie } });
}
function route(action) {
  return async ({ request, redirect, url }) => {
    const id = url.searchParams.get("id");
    const back = url.searchParams.get("back") || "/inbox";
    const cookie = request.headers.get("cookie") ?? "";
    await act(action, id, cookie);
    return redirect(back, 302);
  };
}
const POST = route("publish");

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
