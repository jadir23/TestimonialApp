import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, F as Fragment, a as addAttribute } from '../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, $ as $$AppLayout } from '../chunks/server_DuKSHUD0.mjs';
import { $ as $$PageHeader } from '../chunks/PageHeader_BWTgY8GU.mjs';
import { $ as $$Alert } from '../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$Icon } from '../chunks/Icon_D3cJPChc.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Billing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Billing;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  if (!user) return Astro2.redirect("/login");
  const { ok, data: bill, error } = await apiGet("/api/billing/status", cookie);
  const notice = Astro2.url.searchParams.get("notice");
  const errParam = Astro2.url.searchParams.get("error");
  const sub = bill?.subscription ?? {};
  const isPro = bill?.plan === "pro";
  const limits = bill?.limits ?? { spaces: 3, testimonials_per_space: 100 };
  const usage = bill?.usage ?? [];
  const usedSpaces = usage.length;
  const usedTestimonials = usage.reduce((a, u) => a + Number(u.count || 0), 0);
  const usedLimit = usedTestimonials / Math.max(1, usedSpaces * limits.testimonials_per_space) * 100;
  const FEATURES_FREE = ["3 collection spaces", "100 testimonials per space", "All embed widgets", "Collection analytics"];
  const FEATURES_PRO = ["25 collection spaces", "1,000 testimonials per space", "All themes and layouts", "Priority support"];
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Billing", "user": user, "path": Astro2.url.pathname }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Billing", "description": "Manage your plan and payment details." })} ${maybeRenderHead()}<div class="mb-5 space-y-3"> ${notice === "success" && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "success", "title": "Payment received" }, { "default": async ($$result3) => renderTemplate`
Pro activates as soon as Stripe confirms it — usually within seconds.${" "}<a href="/billing" class="font-medium underline">Refresh to check</a>.
` })}`} ${notice === "cancelled" && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "info" }, { "default": async ($$result3) => renderTemplate`Checkout was cancelled. No charge was made.` })}`} ${sub.status === "past_due" && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "danger", "title": "Payment failed" }, { "default": async ($$result3) => renderTemplate`
Your last payment didn't go through. Update your card to keep Pro active.
` })}`} ${error && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${error}` })}`} ${errParam && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${errParam}` })}`} ${bill && !bill.stripe_configured && renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "warning", "title": "Stripe isn't configured on this environment" }, { "default": async ($$result3) => renderTemplate`
Set <code class="font-mono">STRIPE_SECRET_KEY</code> and${" "}<code class="font-mono">STRIPE_PRICE_PRO</code> to enable payments. Upgrading
        will fail until then.
` })}`} </div> ${ok && bill && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`<section class="card card-pad"> <div class="flex flex-wrap items-start justify-between gap-4"> <div> <p class="text-[13px] font-medium text-fg-muted">Current plan</p> <p class="mt-1 flex items-center gap-2.5 text-2xl font-semibold tracking-tight"> ${isPro ? "Pro" : "Free"} <span${addAttribute(["badge", isPro ? "badge-brand" : "badge-neutral"], "class:list")}> ${sub.status && sub.status !== "none" ? sub.status : isPro ? "active" : "current"} </span> </p> ${sub.current_period_end && renderTemplate`<p class="mt-1.5 text-[13px] text-fg-muted">
Renews ${String(sub.current_period_end).slice(0, 10)} </p>`} </div> <div class="flex flex-wrap gap-2"> ${isPro ? renderTemplate`<form method="POST" action="/api/billing/portal"> <button type="submit" class="btn btn-secondary"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "billing", "class": "size-4" })}
Manage subscription
</button> </form>` : renderTemplate`<form method="POST" action="/api/billing/checkout"> <button type="submit" class="btn btn-primary">
Upgrade to Pro — $19.99/mo
${renderComponent($$result3, "Icon", $$Icon, { "name": "arrowRight", "class": "size-4" })} </button> </form>`} </div> </div> <div class="mt-6 grid gap-4 border-t-line pt-5 sm:grid-cols-2"> <div> <div class="flex items-baseline justify-between text-sm"> <span class="text-fg-muted">Spaces</span> <span class="nums font-medium">${usedSpaces} / ${limits.spaces}</span> </div> <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-muted" role="progressbar"${addAttribute(Math.min(100, usedSpaces / Math.max(1, limits.spaces) * 100), "aria-valuenow")}${addAttribute(0, "aria-valuemin")}${addAttribute(100, "aria-valuemax")} aria-label="Spaces used"> <div class="h-full rounded-full bg-brand"${addAttribute(`width:${Math.min(100, usedSpaces / Math.max(1, limits.spaces) * 100)}%`, "style")}></div> </div> </div> <div> <div class="flex items-baseline justify-between text-sm"> <span class="text-fg-muted">Testimonials per space (avg)</span> <span class="nums font-medium">${usedTestimonials}</span> </div> <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-muted" role="progressbar"${addAttribute(Math.min(100, usedLimit), "aria-valuenow")}${addAttribute(0, "aria-valuemin")}${addAttribute(100, "aria-valuemax")} aria-label="Average testimonial usage"> <div class="h-full rounded-full bg-brand"${addAttribute(`width:${Math.min(100, usedLimit)}%`, "style")}></div> </div> </div> </div> </section> <section class="mt-4 grid gap-4 sm:grid-cols-2"> <div${addAttribute(["card card-pad", !isPro && "border-brand-border ring-1 ring-brand/20"], "class:list")}> <div class="flex items-center justify-between"> <h2 class="font-semibold">Free</h2> ${!isPro && renderTemplate`<span class="badge badge-brand">Current</span>`} </div> <p class="nums mt-2 text-2xl font-semibold">
$0<span class="text-sm font-normal text-fg-muted">/month</span> </p> <ul class="mt-4 space-y-2 text-sm text-fg-muted"> ${FEATURES_FREE.map((f) => renderTemplate`<li class="flex items-start gap-2.5"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "check", "class": "mt-0.5 size-4 shrink-0 text-success" })} ${f} </li>`)} </ul> </div> <div${addAttribute(["card card-pad", isPro && "border-brand-border ring-1 ring-brand/20"], "class:list")}> <div class="flex items-center justify-between"> <h2 class="font-semibold">Pro</h2> ${isPro && renderTemplate`<span class="badge badge-brand">Current</span>`} </div> <p class="nums mt-2 text-2xl font-semibold">
$19.99<span class="text-sm font-normal text-fg-muted">/month</span> </p> <ul class="mt-4 space-y-2 text-sm text-fg-muted"> ${FEATURES_PRO.map((f) => renderTemplate`<li class="flex items-start gap-2.5"> ${renderComponent($$result3, "Icon", $$Icon, { "name": "check", "class": "mt-0.5 size-4 shrink-0 text-success" })} ${f} </li>`)} </ul> </div> </section> ${usage.length > 0 && renderTemplate`<section class="card mt-4"> <div class="card-pad border-b-line pb-4"> <h2 class="font-semibold">Usage by space</h2> </div> <div class="table-wrap"> <table class="table"> <thead> <tr> <th scope="col">Space</th> <th scope="col" class="text-right">Testimonials</th> <th scope="col" class="text-right">Limit</th> </tr> </thead> <tbody> ${usage.map((u) => {
    const pct = Number(u.count) / Math.max(1, limits.testimonials_per_space) * 100;
    return renderTemplate`<tr> <td> <a${addAttribute(`/spaces/${u.space_id ?? ""}`, "href")} class="font-medium hover:underline"> ${u.name} </a> </td> <td class="nums text-right">${u.count}</td> <td class="text-right"> <span${addAttribute([
      "badge",
      pct >= 90 ? "badge-danger" : pct >= 70 ? "badge-warning" : "badge-neutral"
    ], "class:list")}> ${Math.round(pct)}%
</span> </td> </tr>`;
  })} </tbody> </table> </div> </section>`}` })}`}` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/billing.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/billing.astro";
const $$url = "/billing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Billing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
