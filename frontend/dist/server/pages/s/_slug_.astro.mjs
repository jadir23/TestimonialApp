import { c as createComponent, f as renderHead, a as addAttribute, r as renderTemplate, b as createAstro } from '../../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  let space = null;
  try {
    const r = await fetch(`${ODOO}/api/public/s/${slug}`);
    const j = await r.json();
    if (r.ok) space = j.data.space;
  } catch {
  }
  if (!space) return new Response("Space not found", { status: 404 });
  const cfg = space.theme_config ?? {};
  const submitError = Astro2.url.searchParams.get("error");
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${space.name}</title>${renderHead()}</head> <body${addAttribute(`background:${cfg.bg ?? "#fff"};font-family:${cfg.font ?? "system-ui"}`, "style")}> <main class="mx-auto max-w-xl px-4 py-12"> <div class="rounded-xl p-8 shadow"${addAttribute(`background:${cfg.card ?? "#fff"}`, "style")}> <h1 class="text-2xl font-bold"${addAttribute(`color:${cfg.accent}`, "style")}>${space.name}</h1> <p class="mt-1 opacity-70">${space.subtitle}</p> <form method="POST"${addAttribute(`/api/public/submit?slug=${space.slug}`, "action")} class="mt-6 space-y-3" id="tform"> ${submitError && renderTemplate`<p class="rounded bg-red-50 p-2 text-sm text-red-700">${submitError}</p>`} <div class="grid gap-3"> <input name="name" required placeholder="Your name*" class="rounded border px-3 py-2"> <input name="email" type="email" required placeholder="Email*" class="rounded border px-3 py-2"> ${space.fields.filter((f) => f.field_type === "company_name").map((f) => renderTemplate`<input name="company_name"${addAttribute(f.label + (f.required ? "*" : ""), "placeholder")}${addAttribute(f.required, "required")} class="rounded border px-3 py-2">`)} ${space.fields.filter((f) => f.field_type === "job_title").map((f) => renderTemplate`<input name="job_title"${addAttribute(f.label + (f.required ? "*" : ""), "placeholder")}${addAttribute(f.required, "required")} class="rounded border px-3 py-2">`)} ${space.fields.filter((f) => !["company_name", "job_title"].includes(f.field_type)).map((f) => renderTemplate`<input${addAttribute(f.field_type, "name")}${addAttribute(f.label + (f.required ? "*" : ""), "placeholder")}${addAttribute(f.required, "required")} class="rounded border px-3 py-2">`)} </div> ${space.rating_enabled && renderTemplate`<div class="flex gap-1 text-2xl" aria-label="Rating"> ${[1, 2, 3, 4, 5].map((n) => renderTemplate`<label><input type="radio" name="rating"${addAttribute(n, "value")} class="peer hidden"><span class="cursor-pointer peer-checked:opacity-100 opacity-40">⭐</span></label>`)} </div>`} <textarea name="content" required maxlength="2000" placeholder="Tell us about your experience..." class="w-full rounded border px-3 py-2" rows="4"></textarea> <label class="flex items-start gap-2 text-xs"><input type="checkbox" name="consent" value="1" required class="mt-1"><span>I give permission for this testimonial to be displayed publicly and shared on social media.</span></label> <input type="text" name="website_url" style="display:none" tabindex="-1" autocomplete="off"><!-- honeypot --> <button class="w-full rounded py-2 text-white"${addAttribute(`background:${cfg.accent ?? "#111"}`, "style")}>Submit testimonial</button> </form> </div> </main> </body></html>`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/s/[slug].astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/s/[slug].astro";
const $$url = "/s/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
