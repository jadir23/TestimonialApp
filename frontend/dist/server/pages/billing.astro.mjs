import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Billing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Billing;
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  let user = null;
  let bill = null;
  let error = "";
  const notice = Astro2.url.searchParams.get("notice");
  const errParam = Astro2.url.searchParams.get("error");
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const r = await fetch(`${ODOO}/api/billing/status`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) bill = j.data;
    else error = j.error || "Could not load billing.";
  } catch {
    error = "Backend unreachable.";
  }
  const sub = bill?.subscription ?? {};
  const usedSpaces = bill?.usage?.length ?? 0;
  const usedTestimonials = (bill?.usage ?? []).reduce((a, u) => a + u.count, 0);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Billing", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-bold">Billing</h1> ${notice === "success" && renderTemplate`<p class="mt-2 rounded bg-green-50 p-2 text-sm">Payment received — Pro activates once Stripe confirms (usually seconds). Refresh this page shortly.</p>`}${notice === "cancelled" && renderTemplate`<p class="mt-2 rounded bg-gray-100 p-2 text-sm">Checkout cancelled. No charge was made.</p>`}${sub.status === "past_due" && renderTemplate`<p class="mt-2 rounded bg-red-50 p-2 text-sm text-red-700">Latest payment failed. Please update your payment method to keep Pro.</p>`}${error && renderTemplate`<p class="mt-2 rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`}${errParam && renderTemplate`<p class="mt-2 rounded bg-red-50 p-2 text-sm text-red-700">${errParam}</p>`}${bill && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="mt-3 rounded border bg-white p-4 text-sm"> <p>Current plan: <strong>${bill.plan === "pro" ? "Pro \u2014 You're subscribed to Pro." : "Free"}</strong></p> <p class="text-gray-600">Subscription status: ${sub.status ?? "none"}${sub.current_period_end ? ` \xB7 renews ${sub.current_period_end.slice(0, 10)}` : ""}</p> <p class="text-gray-600">Usage: ${usedSpaces}/${bill.limits.spaces} spaces · ${usedTestimonials} testimonials total</p> <div class="mt-3 flex gap-2"> ${bill.plan === "free" ? renderTemplate`<form method="POST" action="/api/billing/checkout"><button class="rounded bg-black px-4 py-2 text-white">Upgrade to Pro — $19.99/mo</button></form>` : renderTemplate`<form method="POST" action="/api/billing/portal"><button class="rounded border px-4 py-2">Manage subscription (Stripe portal)</button></form>`} </div> ${!bill.stripe_configured && renderTemplate`<p class="mt-2 text-xs text-gray-500">Stripe is not configured on this environment (set STRIPE_SECRET_KEY + STRIPE_PRICE_PRO). Upgrade will show an error until then.</p>`} </div> <div class="mt-3 grid gap-3 md:grid-cols-2 text-sm"> <div class="rounded border bg-white p-4"> <h2 class="font-bold">Free — $0/month</h2> <ul class="mt-1 list-disc pl-5 text-gray-600"><li>3 spaces</li><li>100 testimonials per space</li><li>Embeds + analytics</li><li>Limited themes</li></ul> </div> <div class="rounded border bg-white p-4"> <h2 class="font-bold">Pro — $19.99/month</h2> <ul class="mt-1 list-disc pl-5 text-gray-600"><li>25 spaces</li><li>1,000 testimonials per space</li><li>Embeds + analytics</li><li>All themes</li></ul> </div> </div> ${bill.usage.length > 0 && renderTemplate`<div class="mt-3 rounded border bg-white p-4 text-sm"> <h2 class="font-bold">Current usage</h2> <ul class="mt-1 space-y-1">${bill.usage.map((u) => renderTemplate`<li>${u.name}: ${u.count} testimonials</li>`)}</ul> </div>`}` })}`}` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/billing.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/billing.astro";
const $$url = "/billing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Billing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
