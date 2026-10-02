export { renderers } from '../../../renderers.mjs';

const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
const POST = async ({ request, redirect, url }) => {
  const slug = url.searchParams.get("slug") || "";
  const ctype = request.headers.get("content-type") || "";
  let payload;
  if (ctype.includes("application/json")) {
    payload = await request.json();
  } else {
    const form = await request.formData();
    payload = Object.fromEntries(form.entries());
    if (payload.rating) payload.rating = Number(payload.rating);
    payload.consent = form.get("consent") === "1" || form.get("consent") === "on";
  }
  const r = await fetch(`${ODOO}/api/public/s/${slug}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const j = await r.json().catch(() => ({}));
  const wantsJson = ctype.includes("application/json");
  if (!r.ok) {
    if (wantsJson) return new Response(JSON.stringify(j), { status: r.status });
    return redirect(`/s/${slug}?error=` + encodeURIComponent(j.error || "Submit failed"), 302);
  }
  if (wantsJson) return new Response(JSON.stringify(j), { status: 200 });
  return redirect(`/s/${slug}/thanks`, 302);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
