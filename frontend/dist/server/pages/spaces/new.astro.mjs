import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  let user = null;
  let themes = {};
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const t = await fetch(`${ODOO}/api/themes`);
    const tj = await t.json();
    if (t.ok) themes = tj.data.themes;
  } catch {
  }
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "New space", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form method="POST" action="/api/spaces/create" class="mx-auto max-w-lg space-y-3 rounded border bg-white p-6"> <h1 class="text-xl font-bold">New space</h1> ${error && renderTemplate`<p class="rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`} <label class="block text-sm">Name*<input name="name" required class="mt-1 w-full rounded border px-3 py-2" placeholder="What our customers say"></label> <label class="block text-sm">Subtitle<textarea name="subtitle" class="mt-1 w-full rounded border px-3 py-2" placeholder="Tell us about your experience working with Acme."></textarea></label> <label class="block text-sm">URL slug (optional)<input name="slug" class="mt-1 w-full rounded border px-3 py-2" placeholder="acme-reviews"></label> <label class="block text-sm">Theme
<select name="theme" class="mt-1 w-full rounded border px-3 py-2"> ${Object.entries(themes).map(([k, v]) => renderTemplate`<option${addAttribute(k, "value")}>${v.label}</option>`)} </select> </label> <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="rating_enabled" checked value="1"> Enable 1–5 star rating</label> <button class="w-full rounded bg-black py-2 text-white">Create space</button> </form> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/spaces/new.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/spaces/new.astro";
const $$url = "/spaces/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
