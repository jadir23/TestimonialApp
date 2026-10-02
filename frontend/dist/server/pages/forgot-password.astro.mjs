import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ForgotPassword = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ForgotPassword;
  const sent = Astro2.url.searchParams.get("sent");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Forgot password" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form method="POST" action="/api/request-reset" class="mx-auto max-w-sm space-y-3 rounded border bg-white p-6"> <h1 class="text-xl font-bold">Reset password</h1> ${sent && renderTemplate`<p class="rounded bg-green-50 p-2 text-sm">If an account exists, a reset email was sent.</p>`} <input name="email" type="email" required placeholder="Email" class="w-full rounded border px-3 py-2"> <button class="w-full rounded bg-black py-2 text-white">Send reset link</button> </form> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/forgot-password.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/forgot-password.astro";
const $$url = "/forgot-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ForgotPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
