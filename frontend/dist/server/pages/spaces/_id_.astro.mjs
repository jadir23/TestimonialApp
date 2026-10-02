import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  process.env.PUBLIC_APP_URL ?? "";
  let user = null;
  let space = null;
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const r = await fetch(`${ODOO}/api/spaces/${id}`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) space = j.data.space;
    else return Astro2.redirect("/spaces");
  } catch {
    return Astro2.redirect("/spaces");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": space.name, "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-bold">${space.name}</h1> <p class="text-gray-600">${space.subtitle}</p> <div class="mt-3 flex items-center gap-2 rounded border bg-white p-3 text-sm"> <code class="flex-1">/s/${space.slug}</code> <a${addAttribute(`/s/${space.slug}`, "href")} class="rounded bg-black px-3 py-1 text-white">Open public page</a> <a${addAttribute(`/spaces/${space.id}/settings`, "href")} class="underline">Settings</a> </div> <h2 class="mt-6 font-bold">Submission fields</h2> <ul class="mt-2 space-y-1 text-sm"> <li class="rounded border bg-white p-2">Name — required (default) · Email — required (default)</li> ${space.fields.map((f) => renderTemplate`<li class="rounded border bg-white p-2">${f.label} (${f.field_type}) — ${f.enabled ? "enabled" : "disabled"}${f.required ? ", required" : ""}</li>`)} </ul> <p class="mt-4 text-sm text-gray-500">Rating: ${space.rating_enabled ? "enabled" : "disabled"} · Theme: ${space.theme}</p> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/spaces/[id].astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/spaces/[id].astro";
const $$url = "/spaces/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
