import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form method="POST" action="/api/login" class="mx-auto max-w-sm space-y-3 rounded border bg-white p-6"> <h1 class="text-xl font-bold">Login</h1> ${error && renderTemplate`<p class="rounded bg-red-50 p-2 text-sm text-red-700">${error}</p>`} <input name="email" type="email" required placeholder="Email" class="w-full rounded border px-3 py-2"> <input name="password" type="password" required placeholder="Password" class="w-full rounded border px-3 py-2"> <button class="w-full rounded bg-black py-2 text-white">Login</button> <p class="text-sm"><a href="/forgot-password" class="underline">Forgot password?</a> · <a href="/register" class="underline">Sign up</a></p> </form> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/login.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
