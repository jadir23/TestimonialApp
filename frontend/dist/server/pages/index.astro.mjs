import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CZ5FtSgD.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Testimonial SaaS \u2014 collect testimonials" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-16 text-center"> <h1 class="text-4xl font-bold">Collect testimonials in minutes</h1> <p class="mt-3 text-gray-600">Create a space, share a link, publish to your site.</p> <div class="mt-6 flex justify-center gap-3"> <a href="/register" class="rounded bg-black px-4 py-2 text-white">Get started free</a> <a href="/login" class="rounded border px-4 py-2">Login</a> </div> </div> ` })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/index.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
