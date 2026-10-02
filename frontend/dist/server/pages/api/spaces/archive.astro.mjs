export { renderers } from '../../../renderers.mjs';

const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
const POST = async ({ request, redirect, url }) => {
  const id = url.searchParams.get("id");
  const cookie = request.headers.get("cookie") ?? "";
  await fetch(`${ODOO}/api/spaces/${id}`, { method: "DELETE", headers: { Cookie: cookie } });
  return redirect("/spaces", 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
