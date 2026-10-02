import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, $ as $$AppLayout } from '../chunks/server_DuKSHUD0.mjs';
import { $ as $$PageHeader } from '../chunks/PageHeader_BWTgY8GU.mjs';
import { $ as $$Alert } from '../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$EmptyState } from '../chunks/EmptyState_DT4xYX8g.mjs';
import { $ as $$Icon } from '../chunks/Icon_D3cJPChc.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  if (!user) return Astro2.redirect("/login");
  const { data, error } = await apiGet("/api/embeds", cookie);
  const embeds = data?.embeds ?? [];
  const LIMIT_LABEL = { "3": "3 items", "6": "6 items", "9": "9 items", "0": "All" };
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Embeds", "user": user, "path": Astro2.url.pathname }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Embeds", "description": "Widgets you can paste into any website to show your published testimonials." }, { "actions": async ($$result3) => renderTemplate`${maybeRenderHead()}<a href="/embeds/new" class="btn btn-primary btn-sm"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "plus", "class": "size-4" })}
New embed
</a>` })} ${error && renderTemplate`<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${error}` })}</div>`}${embeds.length === 0 && !error ? renderTemplate`${renderComponent($$result2, "EmptyState", $$EmptyState, { "icon": "embed", "title": "No widgets yet", "description": "Publish a few testimonials, then create a widget to display them on your site." }, { "default": async ($$result3) => renderTemplate` <a href="/embeds/new" class="btn btn-primary btn-sm"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "plus", "class": "size-4" })}
Create your first widget
</a> ` })}` : renderTemplate`<ul class="grid gap-3 sm:grid-cols-2"> ${embeds.map((e) => renderTemplate`<li class="card card-pad flex flex-col"> <div class="flex items-start justify-between gap-3"> <div class="min-w-0"> <a${addAttribute(`/embeds/${e.id}`, "href")} class="font-semibold hover:underline"> ${e.name} </a> <p class="mt-0.5 truncate text-[13px] text-fg-muted">${e.space_name}</p> </div> <span class="badge badge-neutral shrink-0 capitalize">${e.layout}</span> </div> <dl class="mt-4 flex flex-wrap gap-1.5"> <span class="badge badge-neutral">${e.appearance}</span> ${e.animation !== "none" && renderTemplate`<span class="badge badge-neutral capitalize">${e.animation}</span>`} <span class="badge badge-neutral"> ${LIMIT_LABEL[String(e.testimonial_limit)] ?? e.testimonial_limit} </span> </dl> <div class="mt-4 flex items-center gap-2 border-t-line pt-4"> <a${addAttribute(`/embeds/${e.id}`, "href")} class="btn btn-secondary btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "settings", "class": "size-4" })}
Open builder
</a> <a${addAttribute(`/embeds/${e.id}#snippet`, "href")} class="btn btn-ghost btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "copy", "class": "size-4" })}
Get code
</a> </div> </li>`)} </ul>`}<div class="mt-6"> ${renderComponent($$result2, "Alert", $$Alert, { "type": "info", "title": "Only published testimonials appear" }, { "default": async ($$result3) => renderTemplate`
Widgets read from your public embed endpoint, so pending and hidden
      testimonials are never exposed — even if someone has the URL.
` })} </div> ` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/embeds/index.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/embeds/index.astro";
const $$url = "/embeds";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
