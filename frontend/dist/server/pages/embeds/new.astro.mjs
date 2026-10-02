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
  let spaces = [];
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const r = await fetch(`${ODOO}/api/spaces`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) spaces = j.data.spaces;
  } catch {
  }
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "New embed", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form method="POST" action="/api/embeds/create" class="mx-auto max-w-lg space-y-3 rounded border bg-white p-6"> <h1 class="text-xl font-bold">New embed</h1> ${error && renderTemplate`<p class="rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`} <label class="block text-sm">Name*<input name="name" required class="mt-1 w-full rounded border px-3 py-2" placeholder="Homepage wall"></label> <label class="block text-sm">Space*
<select name="space_id" required class="mt-1 w-full rounded border px-3 py-2"> ${spaces.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}>${s.name}</option>`)} </select> </label> <div class="grid grid-cols-2 gap-2 text-sm"> <label>Layout<select name="layout" class="mt-1 w-full rounded border px-2 py-1"><option value="grid">Grid/Masonry</option><option value="carousel">Carousel</option></select></label> <label>Appearance<select name="appearance" class="mt-1 w-full rounded border px-2 py-1"><option value="light">Light</option><option value="dark">Dark</option><option value="auto">Auto</option></select></label> <label>Animation<select name="animation" class="mt-1 w-full rounded border px-2 py-1"><option value="none">None</option><option value="fade">Fade</option><option value="slide">Slide</option></select></label> <label>Background<select name="background" class="mt-1 w-full rounded border px-2 py-1"><option value="transparent">Transparent</option><option value="custom">Custom color</option></select></label> <label>Count<select name="testimonial_limit" class="mt-1 w-full rounded border px-2 py-1"><option value="3">3</option><option value="6" selected>6</option><option value="9">9</option><option value="0">All</option></select></label> <label>BG color<input type="color" name="bg_color" value="#ffffff" class="mt-1 h-8 w-full rounded border"></label> </div> <button class="w-full rounded bg-black py-2 text-white">Create + open builder</button> </form> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/embeds/new.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/embeds/new.astro";
const $$url = "/embeds/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
