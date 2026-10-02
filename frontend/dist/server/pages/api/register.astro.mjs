export { renderers } from '../../renderers.mjs';

const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
const POST = async ({ request, redirect }) => {
  const form = await request.formData().catch(() => null);
  const payload = form ? {
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    password: String(form.get("password") || "")
  } : await request.json();
  const r = await fetch(`${ODOO}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = j.error || "Signup failed";
    if (form) return redirect("/register?error=" + encodeURIComponent(msg), 302);
    return new Response(JSON.stringify(j), { status: r.status });
  }
  const headers = new Headers({ Location: "/dashboard" });
  const sc = r.headers.get("set-cookie");
  if (sc) headers.set("set-cookie", sc);
  if (form) return new Response(null, { status: 302, headers });
  return new Response(JSON.stringify(j), { status: 200, headers });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
