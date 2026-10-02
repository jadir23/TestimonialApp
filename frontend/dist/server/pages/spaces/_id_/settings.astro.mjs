import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Settings;
  const { id } = Astro2.params;
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  let user = null;
  let space = null;
  let themes = {};
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const r = await fetch(`${ODOO}/api/spaces/${id}`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) space = j.data.space;
    else return Astro2.redirect("/spaces");
    const t = await fetch(`${ODOO}/api/themes`);
    const tj = await t.json();
    if (t.ok) themes = tj.data.themes;
  } catch {
    return Astro2.redirect("/spaces");
  }
  const error = Astro2.url.searchParams.get("error");
  const ok = Astro2.url.searchParams.get("saved");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Settings \u2014 ${space.name}`, "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-bold">Settings</h1> ${error && renderTemplate`<p class="mt-2 rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`}${ok && renderTemplate`<p class="mt-2 rounded bg-green-50 p-2 text-sm">Saved.</p>`}<form method="POST"${addAttribute(`/api/spaces/update?id=${space.id}`, "action")} class="mt-3 space-y-3 rounded border bg-white p-6"> <label class="block text-sm">Name<input name="name"${addAttribute(space.name, "value")} required class="mt-1 w-full rounded border px-3 py-2"></label> <label class="block text-sm">Subtitle<textarea name="subtitle" class="mt-1 w-full rounded border px-3 py-2">${space.subtitle}</textarea></label> <label class="block text-sm">Slug<input name="slug"${addAttribute(space.slug, "value")} class="mt-1 w-full rounded border px-3 py-2"></label> <label class="block text-sm">Theme
<select name="theme" class="mt-1 w-full rounded border px-3 py-2"> ${Object.entries(themes).map(([k, v]) => renderTemplate`<option${addAttribute(k, "value")}${addAttribute(k === space.theme, "selected")}>${v.label}</option>`)} </select> </label> <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="rating_enabled" value="1"${addAttribute(space.rating_enabled, "checked")}> Enable rating</label> <h2 class="font-bold">Fields (check = enabled, * = required)</h2> ${space.fields.map((f) => renderTemplate`<div class="flex items-center gap-2 text-sm"> <input type="checkbox"${addAttribute(`field_${f.field_type}_enabled`, "name")} value="1"${addAttribute(f.enabled, "checked")}> <span class="w-40">${f.label}</span> <label class="flex items-center gap-1 text-xs"><input type="checkbox"${addAttribute(`field_${f.field_type}_required`, "name")} value="1"${addAttribute(f.required, "checked")}> required</label> </div>`)} <div class="flex gap-2"> <button class="rounded bg-black px-4 py-2 text-white">Save</button> <a${addAttribute(`/spaces/${space.id}`, "href")} class="rounded border px-4 py-2">Back</a> </div> </form> <form method="POST"${addAttribute(`/api/spaces/archive?id=${space.id}`, "action")} onsubmit="return confirm('Archive this space?')" class="mt-3"> <button class="text-sm text-red-600 underline">Archive space</button> </form> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/spaces/[id]/settings.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/spaces/[id]/settings.astro";
const $$url = "/spaces/[id]/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
