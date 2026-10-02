import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, F as Fragment, a as addAttribute } from '../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, $ as $$AppLayout } from '../chunks/server_DuKSHUD0.mjs';
import { $ as $$PageHeader } from '../chunks/PageHeader_BWTgY8GU.mjs';
import { $ as $$Alert } from '../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$EmptyState } from '../chunks/EmptyState_DT4xYX8g.mjs';
import { $ as $$Icon } from '../chunks/Icon_D3cJPChc.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  if (!user) return Astro2.redirect("/login");
  const range = Astro2.url.searchParams.get("range") || "30d";
  const from = Astro2.url.searchParams.get("from") || "";
  const to = Astro2.url.searchParams.get("to") || "";
  const q = new URLSearchParams({ range });
  if (range === "custom" && from && to) {
    q.set("from", from);
    q.set("to", to);
  }
  const { ok, data: stats, error } = await apiGet("/api/dashboard/stats", cookie, q);
  const RANGES = [
    { key: "7d", label: "7 days" },
    { key: "30d", label: "30 days" },
    { key: "90d", label: "90 days" }
  ];
  const isCustom = range === "custom";
  const activeRange = isCustom && from && to ? `${from} \u2192 ${to}` : RANGES.find((r) => r.key === range)?.label ?? "30 days";
  const series = stats?.series ?? [];
  const max = Math.max(1, ...series.map((p) => Number(p.count) || 0));
  const totals = stats?.totals ?? { spaces: 0, testimonials: 0, customers: 0, in_window: 0 };
  const usage = stats?.usage ?? [];
  const plan = stats?.plan ?? user.plan ?? "free";
  const firstName = (user.name ?? "").split(" ")[0];
  const CARDS = [
    { key: "spaces", label: "Spaces", value: totals.spaces, sub: stats ? `of ${stats.space_limit}` : "", icon: "spaces" },
    { key: "testimonials", label: "Testimonials", value: totals.testimonials, sub: "all time", icon: "quote" },
    { key: "customers", label: "Customers", value: totals.customers, sub: "unique submitters", icon: "users" },
    { key: "window", label: "This period", value: totals.in_window, sub: activeRange, icon: "chart" }
  ];
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Dashboard", "user": user, "path": Astro2.url.pathname }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": `Welcome back, ${firstName || "there"}`, "description": "Here's how your testimonial collection is tracking." }, { "actions": async ($$result3) => renderTemplate`${maybeRenderHead()}<a href="/spaces/new" class="btn btn-primary btn-sm"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "plus", "class": "size-4" })}
New space
</a>` })} ${error && renderTemplate`<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${error}` })}</div>`}${ok && stats && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`<div class="grid grid-cols-2 gap-3 lg:grid-cols-4"> ${CARDS.map((c) => renderTemplate`<div class="card card-pad"> <div class="flex items-center justify-between gap-2"> <span class="text-[13px] font-medium text-fg-muted">${c.label}</span> ${renderComponent($$result3, "Icon", $$Icon, { "name": c.icon, "class": "size-4 shrink-0 text-fg-subtle" })} </div> <p class="nums mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"> ${c.value} ${c.key === "spaces" && renderTemplate`<span class="text-base font-normal text-fg-subtle">${c.sub}</span>`} </p> <p class="mt-0.5 truncate text-xs text-fg-subtle">${c.sub}</p> </div>`)} </div> <div class="card mt-4 flex flex-wrap items-center gap-2 p-3"> <div class="flex items-center gap-1 rounded-lg bg-surface-muted p-1" role="group" aria-label="Date range"> ${RANGES.map((r) => renderTemplate`<a${addAttribute(`/dashboard?range=${r.key}`, "href")}${addAttribute(range === r.key ? "true" : void 0, "aria-current")}${addAttribute([
    "rounded-md px-3 py-1.5 text-[13px] font-medium transition",
    range === r.key ? "bg-surface text-fg shadow-card" : "text-fg-muted hover:text-fg"
  ], "class:list")}> ${r.label} </a>`)} </div> <form method="GET" action="/dashboard" class="flex items-center gap-2"> <input type="hidden" name="range" value="custom"> <label class="sr-only" for="from">From date</label> <input id="from" type="date" name="from"${addAttribute(from, "value")} class="input h-8 w-auto py-1 text-[13px]"> <span class="text-fg-subtle" aria-hidden="true">→</span> <label class="sr-only" for="to">To date</label> <input id="to" type="date" name="to"${addAttribute(to, "value")} class="input h-8 w-auto py-1 text-[13px]"> <button type="submit" class="btn btn-secondary btn-sm">Apply</button> </form> </div> <section class="card card-pad mt-4"> <div class="flex flex-wrap items-baseline justify-between gap-2"> <h2 class="font-semibold">Collected per day</h2> <span class="nums text-xs text-fg-subtle">
Peak ${max} in a day
</span> </div> ${totals.in_window === 0 ? renderTemplate`<p class="mt-3 text-sm text-fg-muted">
No testimonials collected in this period yet.${" "} <a href="/spaces" class="link">Share a space link</a> to start
              collecting.
</p>` : renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": async ($$result4) => renderTemplate` <div class="mt-5 flex h-36 items-end gap-[3px]" role="img"${addAttribute(`Bar chart of testimonials collected per day for ${activeRange}. Peak ${max} in a day.`, "aria-label")}> ${series.map((p) => renderTemplate`<div class="group relative flex-1 rounded-t-sm bg-brand/85 transition hover:bg-brand"${addAttribute(`height:${Math.max(4, Math.round(100 * ((Number(p.count) || 0) / max)))}%`, "style")}> <span class="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-fg px-1.5 py-0.5 text-[11px] whitespace-nowrap text-canvas group-hover:block"> ${p.count} · ${p.date} </span> </div>`)} </div> <div class="mt-2 flex justify-between text-[11px] text-fg-subtle"> <span>${series[0]?.date ?? ""}</span> <span>${series[series.length - 1]?.date ?? ""}</span> </div> ` })}`} </section> <section class="card card-pad mt-4"> <h2 class="font-semibold">Space usage</h2> ${usage.length === 0 ? renderTemplate`<p class="mt-3 text-sm text-fg-muted">
No spaces yet.${" "} <a href="/spaces/new" class="link">Create your first space</a> to
              start collecting.
</p>` : renderTemplate`<ul class="mt-4 space-y-4"> ${usage.map((u) => {
    const pct = Math.min(100, Number(u.pct) || 0);
    const near = pct >= 90;
    return renderTemplate`<li> <div class="flex items-baseline justify-between gap-3 text-sm"> <a${addAttribute(`/spaces/${u.id}`, "href")} class="font-medium hover:underline"> ${u.name} </a> <span${addAttribute([
      "nums shrink-0 text-[13px]",
      near ? "font-semibold text-danger" : "text-fg-muted"
    ], "class:list")}> ${u.count}/${u.limit} </span> </div> <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-muted" role="progressbar"${addAttribute(pct, "aria-valuenow")}${addAttribute(0, "aria-valuemin")}${addAttribute(100, "aria-valuemax")}${addAttribute(`${u.name} usage`, "aria-label")}> <div${addAttribute([
      "h-full rounded-full transition-[width]",
      near ? "bg-danger" : "bg-brand"
    ], "class:list")}${addAttribute(`width:${pct}%`, "style")}></div> </div> ${near && renderTemplate`<p class="mt-1.5 text-xs text-danger">
Almost full —${" "} <a href="/billing" class="underline">upgrade to Pro</a> for
                        more room.
</p>`} </li>`;
  })} </ul>`} </section> ${plan === "free" && renderTemplate`<div class="mt-4"> ${renderComponent($$result3, "Alert", $$Alert, { "type": "info", "title": "You're on the Free plan" }, { "default": async ($$result4) => renderTemplate`
Free includes 3 spaces and 100 testimonials per space.${" "}<a href="/billing" class="font-medium underline">See Pro options</a>.
` })} </div>`}` })}`}${!ok && !error && renderTemplate`${renderComponent($$result2, "EmptyState", $$EmptyState, { "icon": "chart", "title": "No data yet", "description": "Create a space and share its link to start collecting testimonials." }, { "default": async ($$result3) => renderTemplate` <a href="/spaces/new" class="btn btn-primary btn-sm"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "plus", "class": "size-4" })}
Create a space
</a> ` })}`}` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/dashboard.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
