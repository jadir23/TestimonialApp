import { c as createComponent, m as maybeRenderHead, a as addAttribute, d as renderComponent, r as renderTemplate, b as createAstro } from '../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, $ as $$AppLayout, t as timeAgo } from '../chunks/server_DuKSHUD0.mjs';
import { $ as $$PageHeader } from '../chunks/PageHeader_BWTgY8GU.mjs';
import { $ as $$Alert } from '../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$EmptyState } from '../chunks/EmptyState_DT4xYX8g.mjs';
import { $ as $$Icon } from '../chunks/Icon_D3cJPChc.mjs';
import { $ as $$Stars } from '../chunks/Stars_G4zs57cb.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$StatusBadge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StatusBadge;
  const { status, class: className = "" } = Astro2.props;
  const MAP = {
    pending: { label: "Pending", cls: "badge-warning", icon: "inbox" },
    published: { label: "Published", cls: "badge-success", icon: "check" },
    hidden: { label: "Hidden", cls: "badge-neutral", icon: "eyeOff" }
  };
  const s = MAP[status] ?? { label: status, cls: "badge-neutral", icon: "info" };
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["badge", s.cls, className], "class:list")}> ${renderComponent($$result, "Icon", $$Icon, { "name": s.icon, "class": "size-3" })} ${s.label} </span>`;
}, "/home/AEapp/TestimonialApp/frontend/src/components/StatusBadge.astro", void 0);

const $$Astro = createAstro();
const $$Inbox = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Inbox;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  if (!user) return Astro2.redirect("/login");
  const status = Astro2.url.searchParams.get("status") || "all";
  const spaceId = Astro2.url.searchParams.get("space_id") || "";
  const q = new URLSearchParams();
  if (status !== "all") q.set("status", status);
  if (spaceId) q.set("space_id", spaceId);
  const { ok, data, error } = await apiGet("/api/testimonials", cookie, q);
  const testimonials = data?.testimonials ?? [];
  const spaces = data?.spaces ?? [];
  const TABS = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "published", label: "Published" },
    { key: "hidden", label: "Hidden" },
    { key: "favorites", label: "Favorites" }
  ];
  function tabHref(key) {
    const p = new URLSearchParams();
    if (key !== "all") p.set("status", key);
    if (spaceId) p.set("space_id", spaceId);
    const s = p.toString();
    return s ? `/inbox?${s}` : "/inbox";
  }
  const back = encodeURIComponent(Astro2.url.pathname + Astro2.url.search);
  const initials = (name) => (name ?? "?").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Inbox", "user": user, "path": Astro2.url.pathname }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Inbox", "description": "Review and publish what your customers send you." })} ${error && renderTemplate`${maybeRenderHead()}<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${error}` })}</div>`} <div class="mb-5 flex flex-wrap items-center justify-between gap-3"> <div class="flex flex-wrap items-center gap-1 rounded-lg bg-surface-muted p-1" role="tablist" aria-label="Filter by status"> ${TABS.map((t) => renderTemplate`<a${addAttribute(tabHref(t.key), "href")} role="tab"${addAttribute(status === t.key ? "true" : "false", "aria-selected")}${addAttribute([
    "rounded-md px-3 py-1.5 text-[13px] font-medium transition",
    status === t.key ? "bg-surface text-fg shadow-card" : "text-fg-muted hover:text-fg"
  ], "class:list")}> ${t.label} </a>`)} </div> <form method="GET" action="/inbox" class="flex items-center gap-2"> <input type="hidden" name="status"${addAttribute(status, "value")}> <label class="sr-only" for="space_id">Filter by space</label> <div class="relative"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "filter", "class": "pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-fg-subtle" })} <select id="space_id" name="space_id" class="input h-9 w-auto py-1 pl-8 text-[13px]"> <option value="">All spaces</option> ${spaces.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(String(s.id) === spaceId, "selected")}> ${s.name} </option>`)} </select> </div> <noscript> <button type="submit" class="btn btn-secondary btn-sm">Filter</button> </noscript> </form> </div>  ${testimonials.length === 0 && !error ? renderTemplate`${renderComponent($$result2, "EmptyState", $$EmptyState, { "icon": "inbox", "title": status === "all" ? "No testimonials yet" : "Nothing here", "description": status === "all" ? "Share a space link and submissions will land right here for review." : "No testimonials match this filter. Try another tab." }, { "default": async ($$result3) => renderTemplate`${status === "all" ? renderTemplate`<a href="/spaces" class="btn btn-primary btn-sm"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "globe", "class": "size-4" })}
Go to spaces
</a>` : renderTemplate`<a href="/inbox" class="btn btn-secondary btn-sm">Clear filter</a>`}` })}` : renderTemplate`<ul class="space-y-3"> ${testimonials.map((t) => renderTemplate`<li class="card card-pad"> <div class="flex items-start justify-between gap-3"> <div class="flex min-w-0 items-start gap-3"> ${t.profile_photo ? renderTemplate`<img${addAttribute(t.profile_photo, "src")} alt="" class="size-10 shrink-0 rounded-full object-cover" loading="lazy">` : renderTemplate`<span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[13px] font-semibold text-brand" aria-hidden="true"> ${initials(t.name)} </span>`} <div class="min-w-0"> <div class="flex flex-wrap items-center gap-x-2 gap-y-1"> <span class="truncate font-medium">${t.name}</span> ${(t.company_name || t.job_title) && renderTemplate`<span class="truncate text-[13px] text-fg-muted"> ${[t.job_title, t.company_name].filter(Boolean).join(" \xB7 ")} </span>`} </div> <div class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg-subtle"> ${renderComponent($$result2, "StatusBadge", $$StatusBadge, { "status": t.status })} ${t.space_name && renderTemplate`<span>${t.space_name}</span>`} <span aria-hidden="true">·</span> <time${addAttribute(t.submitted_at, "datetime")}>${timeAgo(t.submitted_at)}</time> ${t.rating ? renderTemplate`${renderComponent($$result2, "Stars", $$Stars, { "value": t.rating, "size": "sm" })}` : null} </div> </div> </div>  <form method="POST"${addAttribute(`/api/testimonials/favorite?id=${t.id}&back=${back}`, "action")}> <button type="submit"${addAttribute([
    "btn btn-ghost btn-icon",
    t.is_favorite ? "text-danger" : "opacity-40 hover:opacity-100"
  ], "class:list")}${addAttribute(t.is_favorite ? "true" : "false", "aria-pressed")}${addAttribute(t.is_favorite ? `Remove ${t.name} from favorites` : `Add ${t.name} to favorites`, "aria-label")}${addAttribute(t.is_favorite ? "Remove favorite" : "Add to favorites", "title")}> ${renderComponent($$result2, "Icon", $$Icon, { "name": "heart", "class": "size-4" })} </button> </form> </div> <blockquote class="mt-3.5 border-l-2 border-line pl-3.5 text-sm leading-relaxed text-fg"> ${t.content} </blockquote> <div class="mt-4 flex flex-wrap items-center gap-2"> ${t.status !== "published" ? renderTemplate`<form method="POST"${addAttribute(`/api/testimonials/publish?id=${t.id}&back=${back}`, "action")}> <button type="submit" class="btn btn-primary btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "class": "size-4" })}
Publish
</button> </form>` : renderTemplate`<form method="POST"${addAttribute(`/api/testimonials/hide?id=${t.id}&back=${back}`, "action")}> <button type="submit" class="btn btn-secondary btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "eyeOff", "class": "size-4" })}
Hide
</button> </form>`} <details class="relative ml-auto"> <summary class="btn btn-ghost btn-sm cursor-pointer list-none [&::-webkit-details-marker]:hidden" aria-label="More actions"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "more", "class": "size-4" })}
More
</summary> <div class="absolute right-0 z-20 mt-1.5 w-44 overflow-hidden rounded-lg border-line bg-surface p-1 shadow-pop"> ${t.status !== "published" ? renderTemplate`<form method="POST"${addAttribute(`/api/testimonials/publish?id=${t.id}&back=${back}`, "action")}> <button class="block w-full rounded px-2.5 py-2 text-left text-[13px] hover:bg-surface-hover">
Publish
</button> </form>` : renderTemplate`<form method="POST"${addAttribute(`/api/testimonials/hide?id=${t.id}&back=${back}`, "action")}> <button class="block w-full rounded px-2.5 py-2 text-left text-[13px] hover:bg-surface-hover">
Hide
</button> </form>`} <form method="POST"${addAttribute(`/api/testimonials/favorite?id=${t.id}&back=${back}`, "action")}> <button class="block w-full rounded px-2.5 py-2 text-left text-[13px] hover:bg-surface-hover"> ${t.is_favorite ? "Remove favorite" : "Add to favorites"} </button> </form> <form method="POST"${addAttribute(`/api/testimonials/delete?id=${t.id}&back=${back}`, "action")} onsubmit="return confirm('Delete this testimonial permanently?')"> <button class="block w-full rounded px-2.5 py-2 text-left text-[13px] text-danger hover:bg-danger-soft">
Delete permanently
</button> </form> </div> </details> </div> </li>`)} </ul>`}` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/inbox.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/inbox.astro";
const $$url = "/inbox";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Inbox,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
