import { c as createComponent, f as renderHead, a as addAttribute, r as renderTemplate, b as createAstro } from '../../../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                         */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Thanks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Thanks;
  const { slug } = Astro2.params;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>Thank you</title>${renderHead()}</head> <body class="min-h-screen bg-gray-50"> <main class="mx-auto max-w-md px-4 py-16 text-center"> <div class="rounded-xl bg-white p-8 shadow"> <div class="text-4xl">🎉</div> <h1 class="mt-2 text-2xl font-bold">Thank you!</h1> <p class="mt-1 text-gray-600">Your testimonial has been received. You just made someone's day!</p> <a${addAttribute(`/s/${slug}`, "href")} class="mt-4 inline-block text-sm underline">Back to ${slug}</a> </div> </main> </body></html>`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/s/[slug]/thanks.astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/s/[slug]/thanks.astro";
const $$url = "/s/[slug]/thanks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thanks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
