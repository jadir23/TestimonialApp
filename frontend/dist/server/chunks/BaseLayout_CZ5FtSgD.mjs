import { c as createComponent, f as renderHead, d as renderComponent, r as renderTemplate, g as renderSlot, b as createAstro, F as Fragment } from './astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
/* empty css                           */

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "Testimonial SaaS", user = null } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="min-h-screen bg-gray-50 text-gray-900"> <header class="border-b bg-white"> <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"> <a href="/dashboard" class="font-bold">⭐ Testimonial SaaS</a> <nav class="flex items-center gap-3 text-sm"> ${user ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a href="/spaces" class="underline">Spaces</a> <a href="/inbox" class="underline">Inbox</a> <a href="/embeds" class="underline">Embeds</a> <span class="rounded bg-gray-100 px-2 py-1">${user.plan}</span> <span>${user.name}</span> <form method="POST" action="/api/logout"><button class="underline">Logout</button></form> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a href="/login" class="underline">Login</a> <a href="/register" class="rounded bg-black px-3 py-1.5 text-white">Sign up</a> ` })}`} </nav> </div> </header> <main class="mx-auto max-w-5xl px-4 py-8">${renderSlot($$result, $$slots["default"])}</main> </body></html>`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
