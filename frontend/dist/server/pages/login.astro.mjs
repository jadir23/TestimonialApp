import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_V1AjbgP9.mjs';
import { $ as $$AuthCard } from '../chunks/AuthCard_Dubq-XCH.mjs';
import { $ as $$Alert } from '../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$Field } from '../chunks/Field_IaQWiDD3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const error = Astro2.url.searchParams.get("error");
  const next = Astro2.url.searchParams.get("next") ?? "/dashboard";
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Sign in" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthCard", $$AuthCard, { "title": "Welcome back", "subtitle": "Sign in to manage your testimonials." }, { "default": ($$result3) => renderTemplate`${error && renderTemplate`${maybeRenderHead()}<div class="mb-5">${renderComponent($$result3, "Alert", $$Alert, { "type": "danger" }, { "default": ($$result4) => renderTemplate`${error}` })}</div>`}<form method="POST" action="/api/login" class="card card-pad space-y-4"> <input type="hidden" name="next"${addAttribute(next, "value")}> ${renderComponent($$result3, "Field", $$Field, { "label": "Email", "name": "email", "required": true }, { "default": ($$result4) => renderTemplate` <input id="email" class="input" type="email" name="email" required autocomplete="email" autofocus placeholder="you@company.com"> ` })} ${renderComponent($$result3, "Field", $$Field, { "label": "Password", "name": "password", "required": true }, { "default": ($$result4) => renderTemplate` <input id="password" class="input" type="password" name="password" required autocomplete="current-password" placeholder="••••••••"> ` })} <button type="submit" class="btn btn-primary btn-lg w-full">Sign in</button> <p class="text-center text-sm text-fg-muted"> <a href="/forgot-password" class="link">Forgot your password?</a> </p> </form> <p class="mt-6 text-center text-sm text-fg-muted">
New here?
<a href="/register" class="link">Create an account</a> </p> ` })} ` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/login.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
