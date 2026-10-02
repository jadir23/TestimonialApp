export { renderers } from '../../renderers.mjs';

const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
const POST = async ({ request }) => {
  const cookie = request.headers.get("cookie") ?? "";
  await fetch(`${ODOO}/api/auth/logout`, { method: "POST", headers: { Cookie: cookie } });
  return new Response(null, {
    status: 302,
    headers: { Location: "/login", "set-cookie": "session_id=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
