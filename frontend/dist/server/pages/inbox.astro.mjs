import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Inbox = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Inbox;
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  const status = Astro2.url.searchParams.get("status") || "all";
  const space_id = Astro2.url.searchParams.get("space_id") || "";
  let user = null;
  let testimonials = [];
  let spaces = [];
  let error = "";
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const q = new URLSearchParams();
    if (status !== "all") q.set("status", status);
    if (space_id) q.set("space_id", space_id);
    const r = await fetch(`${ODOO}/api/testimonials?${q}`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) {
      testimonials = j.data.testimonials;
      spaces = j.data.spaces;
    } else error = j.error || "Could not load inbox.";
  } catch {
    error = "Backend unreachable.";
  }
  const tabs = ["all", "pending", "published", "hidden", "favorites"];
  function tabHref(t) {
    const q = new URLSearchParams();
    if (t !== "all") q.set("status", t);
    if (space_id) q.set("space_id", space_id);
    return "/inbox?" + q.toString();
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Inbox", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-wrap items-center justify-between gap-2"> <h1 class="text-2xl font-bold">Inbox</h1> <form method="GET" action="/inbox"> <input type="hidden" name="status"${addAttribute(status, "value")}> <select name="space_id" onchange="this.form.submit()" class="rounded border px-2 py-1 text-sm"> <option value="">All spaces</option> ${spaces.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(String(s.id) === space_id, "selected")}>${s.name}</option>`)} </select> </form> </div> <div class="mt-3 flex gap-2 text-sm"> ${tabs.map((t) => renderTemplate`<a${addAttribute(tabHref(t), "href")}${addAttribute(`rounded px-3 py-1 ${status === t ? "bg-black text-white" : "border bg-white"}`, "class")}>${t[0].toUpperCase() + t.slice(1)}</a>`)} </div> ${error && renderTemplate`<p class="mt-3 rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`}${testimonials.length === 0 && !error ? renderTemplate`<div class="mt-6 rounded border bg-white p-8 text-center text-sm text-gray-600">No testimonials here yet. Share your space link to collect some.</div>` : renderTemplate`<div class="mt-4 space-y-3"> ${testimonials.map((t) => renderTemplate`<div class="rounded border bg-white p-4"> <div class="flex items-start justify-between gap-2"> <div class="flex items-center gap-2"> ${t.profile_photo ? renderTemplate`<img${addAttribute(t.profile_photo, "src")} class="h-8 w-8 rounded-full object-cover">` : renderTemplate`<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-bold">${t.name[0]}</div>`} <div> <div class="font-medium">${t.name} <span class="text-xs text-gray-500">${t.company_name && `\xB7 ${t.company_name}`} ${t.job_title && `(${t.job_title})`}</span></div> <div class="text-xs text-gray-500">${t.space_name} · ${t.submitted_at?.slice(0, 10)} · ${t.status}${t.rating ? ` \xB7 \u2B50${t.rating}` : ""}</div> </div> </div> <form method="POST"${addAttribute(`/api/testimonials/favorite?id=${t.id}&back=${encodeURIComponent(Astro2.url.pathname + Astro2.url.search)}`, "action")}> <button title="Favorite"${addAttribute(`text-xl ${t.is_favorite ? "" : "opacity-30"}`, "class")}>❤️</button> </form> </div> <p class="mt-2 text-sm">${t.content}</p> <div class="mt-2 flex items-center gap-2 text-sm"> ${t.status !== "published" && renderTemplate`<form method="POST"${addAttribute(`/api/testimonials/publish?id=${t.id}&back=${encodeURIComponent(Astro2.url.pathname + Astro2.url.search)}`, "action")}><button class="rounded bg-green-600 px-2 py-1 text-white text-xs">Publish</button></form>`} ${t.status === "published" && renderTemplate`<form method="POST"${addAttribute(`/api/testimonials/hide?id=${t.id}&back=${encodeURIComponent(Astro2.url.pathname + Astro2.url.search)}`, "action")}><button class="rounded border px-2 py-1 text-xs">Hide</button></form>`} <details class="relative text-xs"> <summary class="cursor-pointer rounded border px-2 py-1">•••</summary> <div class="absolute right-0 z-10 mt-1 w-28 rounded border bg-white p-1 shadow"> ${t.status !== "published" ? renderTemplate`<form method="POST"${addAttribute(`/api/testimonials/publish?id=${t.id}&back=${encodeURIComponent(Astro2.url.pathname + Astro2.url.search)}`, "action")}><button class="block w-full px-2 py-1 text-left hover:bg-gray-100">Publish</button></form>` : renderTemplate`<form method="POST"${addAttribute(`/api/testimonials/hide?id=${t.id}&back=${encodeURIComponent(Astro2.url.pathname + Astro2.url.search)}`, "action")}><button class="block w-full px-2 py-1 text-left hover:bg-gray-100">Hide</button></form>`} <form method="POST"${addAttribute(`/api/testimonials/delete?id=${t.id}&back=${encodeURIComponent(Astro2.url.pathname + Astro2.url.search)}`, "action")} onsubmit="return confirm('Delete permanently?')"><button class="block w-full px-2 py-1 text-left text-red-600 hover:bg-gray-100">Delete</button></form> </div> </details> </div> </div>`)} </div>`}` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/inbox.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/inbox.astro";
const $$url = "/inbox";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Inbox,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
