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
  let spaces = [];
  let error = "";
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const r = await fetch(`${ODOO}/api/spaces`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) spaces = j.data.spaces;
    else error = j.error || "Could not load spaces.";
  } catch (e) {
    error = "Backend unreachable. Is Odoo running?";
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Spaces", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex items-center justify-between"> <h1 class="text-2xl font-bold">Spaces (${spaces.length}/${user?.limits?.spaces})</h1> <a href="/spaces/new" class="rounded bg-black px-3 py-1.5 text-white text-sm">+ New space</a> </div> ${error && renderTemplate`<p class="mt-3 rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`}${spaces.length === 0 && !error ? renderTemplate`<div class="mt-6 rounded border bg-white p-8 text-center"> <p class="font-medium">No spaces yet</p> <p class="text-sm text-gray-600">Create your first collection space and share the link.</p> <a href="/spaces/new" class="mt-3 inline-block rounded bg-black px-4 py-2 text-white text-sm">Create space</a> </div>` : renderTemplate`<div class="mt-4 grid gap-3 md:grid-cols-2"> ${spaces.map((s) => renderTemplate`<div class="rounded border bg-white p-4"> <div class="font-bold">${s.name}</div> <div class="text-sm text-gray-600">/s/${s.slug} · ${s.theme}</div> <div class="mt-2 flex gap-2 text-sm"> <a${addAttribute(`/spaces/${s.id}`, "href")} class="underline">Open</a> <a${addAttribute(`/spaces/${s.id}/settings`, "href")} class="underline">Settings</a> <a${addAttribute(`/s/${s.slug}`, "href")} class="underline">Public page</a> </div> </div>`)} </div>`}` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/spaces/index.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/spaces/index.astro";
const $$url = "/spaces";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
