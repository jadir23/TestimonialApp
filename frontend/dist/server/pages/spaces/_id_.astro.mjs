import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, p as publicUrl, $ as $$AppLayout } from '../../chunks/server_DuKSHUD0.mjs';
import { $ as $$PageHeader } from '../../chunks/PageHeader_BWTgY8GU.mjs';
import { $ as $$Icon } from '../../chunks/Icon_D3cJPChc.mjs';
import { $ as $$Stars } from '../../chunks/Stars_G4zs57cb.mjs';
import { $ as $$CopyButton } from '../../chunks/CopyButton_BWlgf8ZQ.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  if (!user) return Astro2.redirect("/login");
  const { ok, data } = await apiGet(`/api/spaces/${id}`, cookie);
  if (!ok || !data?.space) return Astro2.redirect("/spaces");
  const space = data.space;
  const fields = space.fields ?? [];
  const shareUrl = publicUrl(`/s/${space.slug}`);
  const themeLabel = String(space.theme ?? "");
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": space.name, "user": user, "path": Astro2.url.pathname }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<nav class="mb-4 text-sm text-fg-muted" aria-label="Breadcrumb"> <a href="/spaces" class="link-muted hover:text-fg">Spaces</a> <span class="mx-1.5 text-fg-subtle" aria-hidden="true">/</span> <span class="text-fg">${space.name}</span> </nav> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": space.name, "description": space.subtitle || void 0 }, { "actions": async ($$result3) => renderTemplate`<a${addAttribute(`/spaces/${space.id}/settings`, "href")} class="btn btn-secondary btn-sm"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "settings", "class": "size-4" })}
Settings
</a><a${addAttribute(`/s/${space.slug}`, "href")} target="_blank" rel="noopener" class="btn btn-primary btn-sm"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "external", "class": "size-4" })}
Open public page
</a>` })} <div class="grid gap-4 lg:grid-cols-[1fr_20rem] lg:items-start"> <div class="space-y-4"> <!-- ---------- Share link ---------- --> <section class="card card-pad"> <h2 class="font-semibold">Share this link</h2> <p class="mt-1 text-sm text-fg-muted">
Send this to customers. Anyone with the link can submit — no account
          needed.
</p> <div class="mt-4 flex flex-col gap-2 sm:flex-row"> <input id="share-link" class="input font-mono text-[13px]" readonly${addAttribute(shareUrl, "value")} aria-label="Public page URL" onclick="this.select()"> <div class="flex gap-2"> ${renderComponent($$result2, "CopyButton", $$CopyButton, { "target": "#share-link", "label": "Copy link" })} <a${addAttribute(`/s/${space.slug}`, "href")} target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
Preview
</a> </div> </div> </section> <!-- ---------- Submission form config ---------- --> <section class="card"> <div class="card-pad border-b-line pb-4"> <h2 class="font-semibold">Submission form</h2> <p class="mt-1 text-sm text-fg-muted">
Fields customers see when they open your link.
</p> </div> <ul class="divide-y divide-line"> <!-- Name and email are always collected --> <li class="flex items-center gap-3 px-5 py-3 sm:px-6"> <span class="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-muted text-fg-subtle"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lock", "class": "size-3.5" })} </span> <span class="min-w-0 flex-1"> <span class="block text-sm font-medium">Name</span> <span class="block text-xs text-fg-subtle">Always collected</span> </span> <span class="badge badge-neutral shrink-0">Required</span> </li> <li class="flex items-center gap-3 px-5 py-3 sm:px-6"> <span class="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-muted text-fg-subtle"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "lock", "class": "size-3.5" })} </span> <span class="min-w-0 flex-1"> <span class="block text-sm font-medium">Email</span> <span class="block text-xs text-fg-subtle">Always collected</span> </span> <span class="badge badge-neutral shrink-0">Required</span> </li> ${fields.map((f) => renderTemplate`<li class="flex items-center gap-3 px-5 py-3 sm:px-6"> <span class="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-muted text-fg-subtle"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "class": "size-3.5" })} </span> <span class="min-w-0 flex-1"> <span class="block text-sm font-medium">${f.label}</span> <span class="block font-mono text-[11px] text-fg-subtle"> ${f.field_type} </span> </span> <span${addAttribute([
    "badge shrink-0",
    f.enabled ? "badge-success" : "badge-neutral"
  ], "class:list")}> ${f.enabled ? "On" : "Off"} ${f.enabled && f.required ? " \xB7 Required" : ""} </span> </li>`)} </ul> <div class="flex flex-wrap items-center justify-between gap-3 border-t-line px-5 py-4 sm:px-6"> <div class="flex items-center gap-2"> <span class="text-sm text-fg-muted">Star ratings</span> ${space.rating_enabled ? renderTemplate`<span class="inline-flex items-center gap-1.5"> ${renderComponent($$result2, "Stars", $$Stars, { "value": 5, "size": "sm" })} <span class="text-xs text-fg-subtle">enabled</span> </span>` : renderTemplate`<span class="badge badge-neutral">Disabled</span>`} </div> <span class="badge badge-neutral capitalize">${themeLabel}</span> </div> </section> </div> <!-- ---------- Side rail ---------- --> <aside class="space-y-4"> <section class="card card-pad"> <h2 class="text-sm font-semibold">Quick actions</h2> <div class="mt-3 space-y-2"> <a${addAttribute(`/inbox?space_id=${space.id}`, "href")} class="btn btn-secondary btn-sm w-full justify-start"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "inbox", "class": "size-4" })}
View submissions
</a> <a href="/embeds/new" class="btn btn-secondary btn-sm w-full justify-start"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "embed", "class": "size-4" })}
Create a widget
</a> <a${addAttribute(`/spaces/${space.id}/settings`, "href")} class="btn btn-ghost btn-sm w-full justify-start"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "settings", "class": "size-4" })}
Edit settings
</a> </div> </section> </aside> </div> ` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/spaces/[id].astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/spaces/[id].astro";
const $$url = "/spaces/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
