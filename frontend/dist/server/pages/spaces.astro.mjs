import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, p as publicUrl, $ as $$AppLayout } from '../chunks/server_DuKSHUD0.mjs';
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
  const { ok, data, error } = await apiGet("/api/spaces", cookie);
  const spaces = data?.spaces ?? [];
  const limit = data?.limit ?? user.limits?.spaces ?? 3;
  const atLimit = spaces.length >= limit;
  publicUrl("");
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Spaces", "user": user, "path": Astro2.url.pathname }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Spaces", "description": "Each space is a branded page you share to collect testimonials." }, { "actions": async ($$result3) => renderTemplate`${maybeRenderHead()}<a href="/spaces/new"${addAttribute(["btn btn-sm", atLimit ? "btn-secondary" : "btn-primary"], "class:list")}${addAttribute(atLimit ? "true" : void 0, "aria-disabled")}> ${renderComponent($$result3, "Icon", $$Icon, { "name": "plus", "class": "size-4" })}
New space
</a>` })} ${error && renderTemplate`<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${error}` })}</div>`}${atLimit && renderTemplate`<div class="mb-5"> ${renderComponent($$result2, "Alert", $$Alert, { "type": "warning", "title": "You've reached your plan limit" }, { "default": async ($$result3) => renderTemplate`
You're using ${spaces.length} of ${limit} spaces.${" "}<a href="/billing" class="font-medium underline">Upgrade to Pro</a> for 25
          spaces.
` })} </div>`}${spaces.length === 0 && !error ? renderTemplate`${renderComponent($$result2, "EmptyState", $$EmptyState, { "icon": "spaces", "title": "Create your first space", "description": "A space is a branded page with its own link. Share it and submissions arrive in your inbox for review." }, { "default": async ($$result3) => renderTemplate` <a href="/spaces/new" class="btn btn-primary btn-sm"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "plus", "class": "size-4" })}
Create a space
</a> ` })}` : renderTemplate`<ul class="grid gap-3 sm:grid-cols-2"> ${spaces.map((s) => renderTemplate`<li class="card card-pad flex flex-col"> <div class="flex items-start justify-between gap-3"> <div class="min-w-0"> <a${addAttribute(`/spaces/${s.id}`, "href")} class="font-semibold hover:underline"> ${s.name} </a> <p class="mt-0.5 truncate font-mono text-xs text-fg-subtle">
/s/${s.slug} </p> </div> <span class="badge badge-neutral shrink-0 capitalize">${s.theme}</span> </div> ${s.subtitle && renderTemplate`<p class="mt-3 line-clamp-2 text-sm text-fg-muted">${s.subtitle}</p>`} <div class="mt-4 flex flex-wrap gap-2 border-t-line pt-4"> <a${addAttribute(`/spaces/${s.id}`, "href")} class="btn btn-secondary btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "settings", "class": "size-4" })}
Settings
</a> <a${addAttribute(`/s/${s.slug}`, "href")} class="btn btn-ghost btn-sm" target="_blank" rel="noopener"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "external", "class": "size-4" })}
Public page
</a> </div> </li>`)} </ul>`}` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/spaces/index.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/spaces/index.astro";
const $$url = "/spaces";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
