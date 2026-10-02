import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Cancel = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cancel;
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  let user = null;
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (me.ok) user = mj.data.user;
  } catch {
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Checkout cancelled", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-md rounded border bg-white p-8 text-center"> <h1 class="mt-2 text-2xl font-bold">Checkout cancelled</h1> <p class="mt-1 text-sm text-gray-600">No charge was made.</p> <a href="/billing?notice=cancelled" class="mt-3 inline-block rounded bg-black px-4 py-2 text-white text-sm">Back to billing</a> </div> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/checkout/cancel.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/checkout/cancel.astro";
const $$url = "/checkout/cancel";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cancel,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
