import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  let user = null;
  let embeds = [];
  let error = "";
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const r = await fetch(`${ODOO}/api/embeds`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) embeds = j.data.embeds;
  } catch {
    error = "Backend unreachable.";
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Embeds", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between"> <h1 class="text-2xl font-bold">Embeds</h1> <a href="/embeds/new" class="rounded bg-black px-3 py-1.5 text-white text-sm">+ New embed</a> </div> ${error && renderTemplate`<p class="mt-3 rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`}${embeds.length === 0 && !error ? renderTemplate`<div class="mt-6 rounded border bg-white p-8 text-center text-sm text-gray-600">No widgets yet. Publish some testimonials first, then create a widget to show them on your site.</div>` : renderTemplate`<div class="mt-4 grid gap-3 md:grid-cols-2"> ${embeds.map((e) => renderTemplate`<div class="rounded border bg-white p-4 text-sm"> <div class="font-bold">${e.name} <span class="font-normal text-gray-500">· ${e.space_name}</span></div> <div class="text-gray-600">${e.layout} · ${e.appearance} · ${e.animation} · ${e.testimonial_limit === 0 ? "all" : e.testimonial_limit}</div> <a${addAttribute(`/embeds/${e.id}`, "href")} class="mt-1 inline-block underline">Open builder</a> </div>`)} </div>`}<div class="mt-6 rounded border bg-white p-4 text-sm"> <h2 class="font-bold">External-site test</h2> <p class="text-gray-600">Paste any widget snippet into a plain <code>.html</code> file and open it — only published testimonials render, no login needed.</p> </div> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/embeds/index.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/embeds/index.astro";
const $$url = "/embeds";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
