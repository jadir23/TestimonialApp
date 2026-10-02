import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_V1AjbgP9.mjs';
import { $ as $$AuthCard } from '../chunks/AuthCard_Dubq-XCH.mjs';
import { $ as $$Alert } from '../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$Field } from '../chunks/Field_IaQWiDD3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ForgotPassword;
  const sent = Astro2.url.searchParams.get("sent") === "1";
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Reset your password" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthCard", $$AuthCard, { "title": "Reset your password", "subtitle": "We'll email you a link to choose a new one." }, { "default": ($$result3) => renderTemplate`${sent ? renderTemplate`${maybeRenderHead()}<div class="card card-pad"> ${renderComponent($$result3, "Alert", $$Alert, { "type": "success", "title": "Check your inbox" }, { "default": ($$result4) => renderTemplate`
If an account exists for that address, a reset link is on its way. The
            link expires in a few hours.
` })} <a href="/login" class="btn btn-secondary mt-5 w-full">
Back to sign in
</a> </div>` : renderTemplate`<form method="POST" action="/api/request-reset" class="card card-pad space-y-4"> ${renderComponent($$result3, "Field", $$Field, { "label": "Email", "name": "email", "required": true }, { "default": ($$result4) => renderTemplate` <input id="email" class="input" type="email" name="email" required autocomplete="email" autofocus placeholder="you@company.com"> ` })} <button type="submit" class="btn btn-primary btn-lg w-full">
Send reset link
</button> </form>`}${!sent && renderTemplate`<p class="mt-6 text-center text-sm text-fg-muted"> <a href="/login" class="link">Back to sign in</a> </p>`}` })} ` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/forgot-password.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/forgot-password.astro";
const $$url = "/forgot-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ForgotPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
