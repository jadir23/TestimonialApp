export { renderers } from '../../renderers.mjs';

const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
const POST = async ({ request, redirect }) => {
  const form = await request.formData();
  const payload = {
    email: String(form.get("email") || ""),
    password: String(form.get("password") || "")
  };
  const r = await fetch(`${ODOO}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) return redirect("/login?error=" + encodeURIComponent("Invalid email or password"), 302);
  const headers = new Headers({ Location: "/dashboard" });
  const sc = r.headers.get("set-cookie");
  if (sc) headers.set("set-cookie", sc);
  return new Response(null, { status: 302, headers });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
