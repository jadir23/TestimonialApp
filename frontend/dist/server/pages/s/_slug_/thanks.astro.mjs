import { c as createComponent, r as renderTemplate, a as addAttribute, g as renderHead, b as createAstro } from '../../../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                         */
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Thanks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Thanks;
  const { slug } = Astro2.params;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>Thank you!</title><meta name="robots" content="noindex"><script src="/theme.js"><\/script>', `</head> <body class="flex min-h-screen items-center justify-center bg-canvas px-4 font-sans"> <main class="w-full max-w-md py-12 text-center"> <span class="mx-auto flex size-14 items-center justify-center rounded-full bg-success-soft text-success" aria-hidden="true"> <svg class="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"></path></svg> </span> <h1 class="mt-5 text-2xl font-semibold tracking-tight">Thank you!</h1> <p class="mt-2 text-sm text-fg-muted">
Your testimonial has been received. It will appear once it's reviewed.
</p> <div class="mt-7 card card-pad text-left"> <p class="text-[13px] font-medium">What happens next</p> <ol class="mt-3 space-y-2.5 text-[13px] text-fg-muted"> <li class="flex gap-2.5"> <span class="nums flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-muted text-[11px] font-semibold text-fg-muted">1</span>
We review your submission.
</li> <li class="flex gap-2.5"> <span class="nums flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-muted text-[11px] font-semibold text-fg-muted">2</span>
If approved, it's published on the site.
</li> </ol> </div> <a`, ' class="btn btn-secondary mt-6 w-full">Submit another</a> </main> </body></html>'])), renderHead(), addAttribute(`/s/${slug}`, "href"));
}, "/home/AEapp/TestimonialApp/frontend/src/pages/s/[slug]/thanks.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/s/[slug]/thanks.astro";
const $$url = "/s/[slug]/thanks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thanks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
