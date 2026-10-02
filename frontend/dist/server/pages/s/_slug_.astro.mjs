import { c as createComponent, r as renderTemplate, a as addAttribute, g as renderHead, u as unescapeHTML, b as createAstro } from '../../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
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
  const fields = space.fields ?? [];
  const enabled = fields.filter((f) => f.enabled);
  const error = Astro2.url.searchParams.get("error");
  const INPUT_TYPE = {
    website: "url",
    linkedin: "url",
    twitter: "text",
    profile_photo: "url"
  };
  const inputType = (t) => INPUT_TYPE[t] ?? "text";
  function isDark(hex) {
    const s = String(hex ?? "").replace("#", "");
    const full = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
    if (full.length !== 6) return false;
    const [r, g, b] = [0, 2, 4].map((i) => {
      const c = parseInt(full.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.35;
  }
  const bg = cfg.bg ?? "#ffffff";
  const card = cfg.card ?? "#ffffff";
  const accent = cfg.accent ?? "#111827";
  const darkCard = isDark(card);
  const darkPage = isDark(bg);
  const onCard = darkCard ? "#f8fafc" : "#111827";
  const onPage = darkPage ? "#f8fafc" : "#111827";
  const onAccent = isDark(accent) ? "#ffffff" : "#111827";
  const inputBg = darkCard ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.7)";
  const inputBorder = darkCard ? "rgba(248,250,252,.22)" : "rgba(17,24,39,.2)";
  const themeVars = [
    `--ts-bg:${bg}`,
    `--ts-card:${card}`,
    `--ts-accent:${accent}`,
    `--ts-on-card:${onCard}`,
    `--ts-on-accent:${onAccent}`,
    `--ts-input-bg:${inputBg}`,
    `--ts-input-border:${inputBorder}`,
    `--ts-font:${cfg.font ?? "Inter, system-ui"}`
  ].join(";");
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>', '</title><meta name="description"', '><meta name="robots" content="noindex"><script src="/theme.js"><\/script><style>', "</style>", '</head> <body class="min-h-screen"', '> <main class="mx-auto w-full max-w-lg px-4 py-10 sm:py-16"> <!-- ---------- Header ---------- --> <header class="text-center"> <h1 class="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"', "> ", " </h1> ", ' </header> <!-- ---------- Form ---------- --> <div class="mt-8 rounded-2xl p-6 shadow-lg sm:p-8"', '> <form method="POST"', ' class="space-y-4"> ', ' <div class="grid gap-4 sm:grid-cols-2"> <label class="block"> <span class="mb-1.5 block text-[13px] font-medium">\nYour name <span class="text-red-500">*</span> </span> <input name="name" required autocomplete="name" placeholder="Jane Doe" class="ts-input"> </label> <label class="block"> <span class="mb-1.5 block text-[13px] font-medium">\nEmail <span class="text-red-500">*</span> </span> <input name="email" type="email" required autocomplete="email" placeholder="jane@company.com" class="ts-input"> </label> </div> ', " ", ' <label class="block"> <span class="mb-1.5 block text-[13px] font-medium">\nYour testimonial <span class="text-red-500">*</span> </span> <textarea name="content" required maxlength="2000" rows="5" placeholder="Tell us about your experience\u2026" class="ts-input resize-y" data-counter-wrap></textarea> <span class="mt-1 block text-right text-[11px] text-fg-subtle" data-counter>\n0 / 2000\n</span> </label> <label class="flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed"> <input type="checkbox" name="consent" value="1" required class="ts-check mt-0.5"> <span class="text-fg-muted">\nI give permission for this testimonial to be displayed publicly and shared\n              on social media.\n</span> </label>  <div class="absolute h-0 w-0 overflow-hidden" aria-hidden="true"> <label>\nWebsite\n<input type="text" name="website_url" tabindex="-1" autocomplete="off"> </label> </div> <button type="submit" class="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"', `>
Submit testimonial
</button> <p class="text-center text-[11px] text-fg-subtle">
Reviewed before publishing \u2014 typically within a day.
</p> </form> </div> </main> <style>
      /* Inputs inherit the space theme rather than the app's tokens. */
      .ts-input {
        width: 100%;
        border-radius: 0.5rem;
        border: 1px solid var(--ts-input-border);
        background: var(--ts-input-bg);
        padding: 0.55rem 0.75rem;
        font-size: 0.875rem;
        color: inherit;
      }
      .ts-input::placeholder {
        color: color-mix(in oklab, currentColor 45%, transparent);
      }
      .ts-input:focus {
        outline: 2px solid var(--ts-accent);
        outline-offset: 1px;
        border-color: transparent;
      }
      .ts-check {
        width: 1rem;
        height: 1rem;
        margin-top: 0.1rem;
        accent-color: var(--ts-accent);
      }
      /* Star track: inactive by default, filled up to the checked value. */
      [data-stars] svg {
        color: color-mix(in oklab, currentColor 24%, transparent);
      }
      [data-stars]:has(input[value='1']:checked) label:nth-child(-n + 1) svg,
      [data-stars]:has(input[value='2']:checked) label:nth-child(-n + 2) svg,
      [data-stars]:has(input[value='3']:checked) label:nth-child(-n + 3) svg,
      [data-stars]:has(input[value='4']:checked) label:nth-child(-n + 4) svg,
      [data-stars]:has(input[value='5']:checked) label:nth-child(-n + 5) svg,
      [data-stars] label:hover svg,
      [data-stars] label:hover ~ label svg {
        color: #f59e0b;
      }
    </style> <script>
      // Star highlighting is pure CSS; only the counter needs JS.
      (function () {
        var ta = document.querySelector('[data-counter-wrap]');
        var out = document.querySelector('[data-counter]');
        if (!ta || !out) return;
        var max = Number(ta.getAttribute('maxlength')) || 2000;
        function update() {
          out.textContent = ta.value.length + ' / ' + max;
        }
        ta.addEventListener('input', update);
        update();
      })();
    <\/script> </body> </html>`])), space.name, addAttribute(space.subtitle || `Share your experience with ${space.name}.`, "content"), unescapeHTML(themeVars), renderHead(), addAttribute(`background:${bg};color:${onPage};font-family:var(--ts-font)`, "style"), addAttribute(`color:${accent}`, "style"), space.name, space.subtitle && renderTemplate`<p class="mx-auto mt-2.5 max-w-sm text-pretty"${addAttribute(`color:${onPage};opacity:.72`, "style")}>${space.subtitle}</p>`, addAttribute(`background:${card};color:${onCard}`, "style"), addAttribute(`/api/public/submit?slug=${space.slug}`, "action"), error && renderTemplate`<div class="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300" role="alert"> ${error} </div>`, enabled.length > 0 && renderTemplate`<div class="grid gap-4 sm:grid-cols-2"> ${enabled.map((f) => renderTemplate`<label class="block"> <span class="mb-1.5 block text-[13px] font-medium"> ${f.label} ${f.required && renderTemplate`<span class="text-red-500"> *</span>`} </span> <input${addAttribute(f.field_type, "name")}${addAttribute(inputType(f.field_type), "type")}${addAttribute(f.required, "required")} autocomplete="off"${addAttribute(f.label, "placeholder")} class="ts-input"> </label>`)} </div>`, space.rating_enabled && renderTemplate`<fieldset> <legend class="mb-1.5 text-[13px] font-medium">Your rating</legend> <div class="flex items-center gap-1" data-stars> ${[1, 2, 3, 4, 5].map((n) => renderTemplate`<label class="cursor-pointer"> <input type="radio" name="rating"${addAttribute(n, "value")} class="peer sr-only"${addAttribute(n, "data-star")}> <svg class="size-7 transition peer-focus-visible:ring-2 peer-focus-visible:ring-current" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6L3.2 9.4l6.1-.9L12 3Z"></path> </svg> <span class="sr-only">${n} star${n > 1 ? "s" : ""}</span> </label>`)} </div> </fieldset>`, addAttribute(`background:${accent};color:${onAccent}`, "style"));
}, "/home/AEapp/TestimonialApp/frontend/src/pages/s/[slug].astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/s/[slug].astro";
const $$url = "/s/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
