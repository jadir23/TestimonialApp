export { renderers } from '../../../renderers.mjs';

const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
const POST = async ({ request, redirect, url }) => {
  const id = url.searchParams.get("id");
  const form = await request.formData();
  const payload = {
    name: String(form.get("name") || ""),
    layout: String(form.get("layout") || "grid"),
    appearance: String(form.get("appearance") || "light"),
    animation: String(form.get("animation") || "none"),
    background: String(form.get("background") || "transparent"),
    bg_color: String(form.get("bg_color") || "#ffffff"),
    testimonial_limit: Number(form.get("testimonial_limit") ?? 6)
  };
  const cookie = request.headers.get("cookie") ?? "";
  await fetch(`${ODOO}/api/embeds/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify(payload)
  });
  return redirect(`/embeds/${id}?saved=1`, 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
