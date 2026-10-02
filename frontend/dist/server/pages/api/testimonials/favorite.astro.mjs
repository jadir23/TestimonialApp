export { renderers } from '../../../renderers.mjs';

const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
const POST = async ({ request, redirect, url }) => {
  const id = url.searchParams.get("id");
  const back = url.searchParams.get("back") || "/inbox";
  const cookie = request.headers.get("cookie") ?? "";
  await fetch(`${ODOO}/api/testimonials/${id}/favorite`, { method: "POST", headers: { Cookie: cookie } });
  return redirect(back, 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
