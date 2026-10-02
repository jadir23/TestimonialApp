import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, $ as $$AppLayout } from '../../chunks/server_DuKSHUD0.mjs';
import { $ as $$Icon } from '../../chunks/Icon_D3cJPChc.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Success = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Success;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Payment successful", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-md py-10 text-center"> <span class="mx-auto flex size-14 items-center justify-center rounded-full bg-success-soft text-success" aria-hidden="true"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "class": "size-7" })} </span> <h1 class="mt-5 text-2xl font-semibold tracking-tight">Payment successful</h1> <p class="mt-2 text-sm text-fg-muted">
Your Pro subscription activates as soon as Stripe confirms the payment —
      usually within seconds.
</p> <div class="mt-6 rounded-lg bg-surface-muted p-3 text-left text-xs text-fg-muted">
For security, this redirect alone never upgrades your plan. Only a verified
      Stripe webhook does.
</div> <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center"> <a href="/billing?notice=success" class="btn btn-primary">Check billing status</a> <a href="/dashboard" class="btn btn-ghost">Back to dashboard</a> </div> </div> ` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/checkout/success.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/checkout/success.astro";
const $$url = "/checkout/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
