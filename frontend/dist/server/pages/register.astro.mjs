import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_V1AjbgP9.mjs';
import { $ as $$AuthCard } from '../chunks/AuthCard_Dubq-XCH.mjs';
import { $ as $$Alert } from '../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$Field } from '../chunks/Field_IaQWiDD3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Register = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Create your account" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthCard", $$AuthCard, { "title": "Create your account", "subtitle": "Free forever \u2014 no credit card required." }, { "default": ($$result3) => renderTemplate`${error && renderTemplate`${maybeRenderHead()}<div class="mb-5">${renderComponent($$result3, "Alert", $$Alert, { "type": "danger" }, { "default": ($$result4) => renderTemplate`${error}` })}</div>`}<form method="POST" action="/api/register" class="card card-pad space-y-4"> ${renderComponent($$result3, "Field", $$Field, { "label": "Your name", "name": "name", "required": true }, { "default": ($$result4) => renderTemplate` <input id="name" class="input" name="name" required autocomplete="name" autofocus placeholder="Jane Doe"> ` })} ${renderComponent($$result3, "Field", $$Field, { "label": "Email", "name": "email", "required": true }, { "default": ($$result4) => renderTemplate` <input id="email" class="input" type="email" name="email" required autocomplete="email" placeholder="you@company.com"> ` })} ${renderComponent($$result3, "Field", $$Field, { "label": "Password", "name": "password", "required": true, "hint": "At least 8 characters." }, { "default": ($$result4) => renderTemplate` <input id="password" class="input" type="password" name="password" required minlength="8" autocomplete="new-password" placeholder="At least 8 characters" aria-describedby="password-hint"> ` })} <button type="submit" class="btn btn-primary btn-lg w-full">
Create account
</button> </form> <p class="mt-6 text-center text-sm text-fg-muted">
Already have an account?
<a href="/login" class="link">Sign in</a> </p> ` })} ` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/register.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
