import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, b as publicGet, $ as $$AppLayout } from '../../../chunks/server_DuKSHUD0.mjs';
import { $ as $$PageHeader } from '../../../chunks/PageHeader_BWTgY8GU.mjs';
import { $ as $$Alert } from '../../../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$Field } from '../../../chunks/Field_IaQWiDD3.mjs';
import { $ as $$Icon } from '../../../chunks/Icon_D3cJPChc.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Settings;
  const { id } = Astro2.params;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  if (!user) return Astro2.redirect("/login");
  const { ok, data } = await apiGet(`/api/spaces/${id}`, cookie);
  if (!ok || !data?.space) return Astro2.redirect("/spaces");
  const space = data.space;
  const fields = space.fields ?? [];
  const { data: themeData } = await publicGet("/api/themes");
  const themes = themeData?.themes ?? {};
  const error = Astro2.url.searchParams.get("error");
  const okMsg = Astro2.url.searchParams.get("saved");
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": `Settings \u2014 ${space.name}`, "user": user, "path": "/spaces" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<nav class="mb-4 text-sm text-fg-muted" aria-label="Breadcrumb"> <a href="/spaces" class="link-muted hover:text-fg">Spaces</a> <span class="mx-1.5 text-fg-subtle" aria-hidden="true">/</span> <a${addAttribute(`/spaces/${space.id}`, "href")} class="link-muted hover:text-fg">${space.name}</a> <span class="mx-1.5 text-fg-subtle" aria-hidden="true">/</span> <span class="text-fg">Settings</span> </nav> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Space settings", "description": "Customise the page and the form your customers see." }, { "actions": async ($$result3) => renderTemplate`<a${addAttribute(`/spaces/${space.id}`, "href")} class="btn btn-ghost btn-sm">Cancel</a>` })} ${error && renderTemplate`<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${error}` })}</div>`}${okMsg && renderTemplate`<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "success" }, { "default": async ($$result3) => renderTemplate`Settings saved.` })}</div>`}<form method="POST"${addAttribute(`/api/spaces/update?id=${space.id}`, "action")} class="card card-pad space-y-5"> ${renderComponent($$result2, "Field", $$Field, { "label": "Space name", "name": "name", "required": true }, { "default": async ($$result3) => renderTemplate` <input id="name" class="input" name="name"${addAttribute(space.name, "value")} required maxlength="120"> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Subtitle", "name": "subtitle", "hint": "Shown under the heading on the public page." }, { "default": async ($$result3) => renderTemplate` <textarea id="subtitle" class="input" name="subtitle" rows="2" maxlength="300">${space.subtitle}</textarea> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "URL slug", "name": "slug", "required": true, "hint": "Changing this breaks links you've already shared." }, { "default": async ($$result3) => renderTemplate` <div class="flex items-center gap-2"> <span class="shrink-0 rounded-lg bg-surface-muted px-2.5 py-2 text-sm text-fg-subtle">/s/</span> <input id="slug" class="input font-mono" name="slug"${addAttribute(space.slug, "value")} required maxlength="40" pattern="[a-z0-9\-]*" aria-describedby="slug-hint"> </div> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Theme", "name": "theme", "required": true }, { "default": async ($$result3) => renderTemplate` <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Theme"> ${Object.entries(themes).map(([key, t]) => renderTemplate`<label class="cursor-pointer"> <input type="radio" name="theme"${addAttribute(key, "value")} class="peer sr-only"${addAttribute(key === space.theme, "checked")}> <span class="block overflow-hidden rounded-lg border-2 border-line transition peer-checked:border-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40"> <span class="flex h-14 flex-col justify-center gap-1 p-2.5"${addAttribute(`background:${t.bg}`, "style")}> <span class="h-1.5 w-3/4 rounded-full"${addAttribute(`background:${t.accent}`, "style")}></span> <span class="h-1 w-1/2 rounded-full opacity-40"${addAttribute(`background:${t.accent}`, "style")}></span> </span> <span class="block border-t-line bg-surface px-2 py-1.5 text-[11px] font-medium"> ${t.label} </span> </span> </label>`)} </div> ` })} <label class="flex cursor-pointer items-start gap-3 rounded-lg border-line p-3"> <input type="checkbox" name="rating_enabled" value="1"${addAttribute(space.rating_enabled, "checked")} class="checkbox mt-0.5"> <span> <span class="block text-sm font-medium">Enable star ratings</span> <span class="mt-0.5 block text-xs text-fg-muted">
Customers can rate their experience 1–5 stars.
</span> </span> </label> <div class="border-t-line pt-5"> <h2 class="font-semibold">Optional fields</h2> <p class="mt-1 text-sm text-fg-muted">
Toggle the extra details you want to collect. Name and email are always
        required.
</p> <div class="mt-4 divide-y divide-line rounded-lg border-line"> ${fields.map((f) => renderTemplate`<div class="flex flex-wrap items-center gap-x-4 gap-y-2 px-3.5 py-3"> <label class="flex min-w-0 flex-1 cursor-pointer items-center gap-3"> <input type="checkbox"${addAttribute(`field_${f.field_type}_enabled`, "name")} value="1"${addAttribute(f.enabled, "checked")} class="checkbox"> <span class="min-w-0"> <span class="block text-sm font-medium">${f.label}</span> <span class="block font-mono text-[11px] text-fg-subtle">${f.field_type}</span> </span> </label> <label class="flex shrink-0 cursor-pointer items-center gap-2 text-[13px] text-fg-muted"> <input type="checkbox"${addAttribute(`field_${f.field_type}_required`, "name")} value="1"${addAttribute(f.required, "checked")}${addAttribute(!f.enabled, "disabled")} class="checkbox disabled:opacity-40">
Required
</label> </div>`)} </div> </div> <div class="flex gap-2 border-t-line pt-5"> <button type="submit" class="btn btn-primary"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "class": "size-4" })}
Save changes
</button> <a${addAttribute(`/spaces/${space.id}`, "href")} class="btn btn-ghost">Cancel</a> </div> </form>  <section class="card card-pad mt-4 border-danger/30"> <h2 class="font-semibold text-danger">Archive space</h2> <p class="mt-1 text-sm text-fg-muted">
Stops accepting new submissions. Existing testimonials and widgets stay, but
      the public page is hidden.
</p> <form method="POST"${addAttribute(`/api/spaces/archive?id=${space.id}`, "action")} onsubmit="return confirm('Archive this space? New submissions will stop.')" class="mt-4"> <button type="submit" class="btn btn-danger btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "trash", "class": "size-4" })}
Archive space
</button> </form> </section> ` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/spaces/[id]/settings.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/spaces/[id]/settings.astro";
const $$url = "/spaces/[id]/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
