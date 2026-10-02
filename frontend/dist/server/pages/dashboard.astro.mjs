import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute, F as Fragment } from '../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  const range = Astro2.url.searchParams.get("range") || "30d";
  const from = Astro2.url.searchParams.get("from") || "";
  const to = Astro2.url.searchParams.get("to") || "";
  let user = null;
  let stats = null;
  let error = "";
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const q = new URLSearchParams({ range });
    if (range === "custom" && from && to) {
      q.set("from", from);
      q.set("to", to);
    }
    const r = await fetch(`${ODOO}/api/dashboard/stats?${q}`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) stats = j.data;
    else error = j.error || "Could not load stats.";
  } catch {
    error = "Backend unreachable.";
  }
  const max = Math.max(1, ...(stats?.series ?? []).map((p) => p.count));
  function rangeHref(r) {
    return `/dashboard?range=${r}`;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dashboard", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-wrap items-center justify-between gap-2"> <h1 class="text-2xl font-bold">Dashboard</h1> <div class="flex items-center gap-2 text-sm"> <a${addAttribute(rangeHref("7d"), "href")}${addAttribute(`rounded px-2 py-1 ${range === "7d" ? "bg-black text-white" : "border bg-white"}`, "class")}>7d</a> <a${addAttribute(rangeHref("30d"), "href")}${addAttribute(`rounded px-2 py-1 ${range === "30d" ? "bg-black text-white" : "border bg-white"}`, "class")}>30d</a> <a${addAttribute(rangeHref("90d"), "href")}${addAttribute(`rounded px-2 py-1 ${range === "90d" ? "bg-black text-white" : "border bg-white"}`, "class")}>90d</a> <form method="GET" action="/dashboard" class="flex items-center gap-1"> <input type="hidden" name="range" value="custom"> <input type="date" name="from"${addAttribute(from, "value")} class="rounded border px-1 py-1 text-xs"> <input type="date" name="to"${addAttribute(to, "value")} class="rounded border px-1 py-1 text-xs"> <button class="rounded border bg-white px-2 py-1 text-xs">Go</button> </form> </div> </div> ${error && renderTemplate`<p class="mt-3 rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`}${stats && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"> <div class="rounded border bg-white p-4"><div class="text-sm text-gray-500">Spaces</div><div class="text-2xl font-bold">${stats.totals.spaces}<span class="text-sm font-normal text-gray-500">/${stats.space_limit}</span></div></div> <div class="rounded border bg-white p-4"><div class="text-sm text-gray-500">Testimonials</div><div class="text-2xl font-bold">${stats.totals.testimonials}</div></div> <div class="rounded border bg-white p-4"><div class="text-sm text-gray-500">Customers</div><div class="text-2xl font-bold">${stats.totals.customers}</div></div> <div class="rounded border bg-white p-4"><div class="text-sm text-gray-500">In period</div><div class="text-2xl font-bold">${stats.totals.in_window}</div><div class="text-xs text-gray-500">${stats.from} → ${stats.to}</div></div> </div> <div class="mt-4 rounded border bg-white p-4"> <h2 class="font-bold">Collected per day</h2> ${stats.totals.in_window === 0 ? renderTemplate`<p class="mt-2 text-sm text-gray-500">No testimonials in this period yet. <a href="/spaces" class="underline">Share a space link</a> to collect some.</p>` : renderTemplate`<div class="mt-2 flex h-28 items-end gap-[2px]"> ${stats.series.map((p) => renderTemplate`<div${addAttribute(`${p.date}: ${p.count}`, "title")} class="flex-1 rounded-t bg-black"${addAttribute(`height:${Math.max(3, Math.round(100 * p.count / max))}%`, "style")}></div>`)} </div>`} </div> <div class="mt-4 rounded border bg-white p-4"> <h2 class="font-bold">Space usage</h2> ${stats.usage.length === 0 ? renderTemplate`<p class="mt-2 text-sm text-gray-500">No spaces yet. <a href="/spaces/new" class="underline">Create your first space</a>.</p>` : renderTemplate`<ul class="mt-2 space-y-2 text-sm"> ${stats.usage.map((u) => renderTemplate`<li> <div class="flex justify-between"><a${addAttribute(`/spaces/${u.id}`, "href")} class="underline">${u.name}</a><span${addAttribute(u.pct >= 90 ? "text-red-600 font-bold" : "", "class")}>${u.count}/${u.limit}${u.pct >= 90 ? " \u2014 almost full, upgrade to Pro" : ""}</span></div> <div class="h-2 rounded bg-gray-100"><div${addAttribute(`h-2 rounded ${u.pct >= 90 ? "bg-red-500" : "bg-green-500"}`, "class")}${addAttribute(`width:${Math.min(100, u.pct)}%`, "style")}></div></div> </li>`)} </ul>`} </div> ${stats.plan === "free" && renderTemplate`<div class="mt-4 rounded border bg-yellow-50 p-3 text-sm">Upgrade to Pro to collect more testimonials and create more spaces. <a href="/billing" class="underline">View billing</a></div>`}` })}`}` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/dashboard.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
