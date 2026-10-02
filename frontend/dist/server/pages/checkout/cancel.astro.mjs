import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, $ as $$AppLayout } from '../../chunks/server_DuKSHUD0.mjs';
import { $ as $$Icon } from '../../chunks/Icon_D3cJPChc.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Cancel = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cancel;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "Checkout cancelled", "user": user }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto max-w-md py-10 text-center"> <span class="mx-auto flex size-14 items-center justify-center rounded-full bg-surface-muted text-fg-muted" aria-hidden="true"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "x", "class": "size-7" })} </span> <h1 class="mt-5 text-2xl font-semibold tracking-tight">Checkout cancelled</h1> <p class="mt-2 text-sm text-fg-muted">
No charge was made. You can upgrade whenever you're ready.
</p> <div class="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center"> <a href="/billing?notice=cancelled" class="btn btn-primary">Back to billing</a> <a href="/dashboard" class="btn btn-ghost">Back to dashboard</a> </div> </div> ` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/checkout/cancel.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/checkout/cancel.astro";
const $$url = "/checkout/cancel";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cancel,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
