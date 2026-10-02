import { c as createComponent, r as renderTemplate, e as defineScriptVars, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, p as publicUrl, $ as $$AppLayout } from '../../chunks/server_DuKSHUD0.mjs';
import { $ as $$Alert } from '../../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$Field } from '../../chunks/Field_IaQWiDD3.mjs';
import { $ as $$Icon } from '../../chunks/Icon_D3cJPChc.mjs';
import { $ as $$CopyButton } from '../../chunks/CopyButton_BWlgf8ZQ.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  if (!user) return Astro2.redirect("/login");
  const { ok, data } = await apiGet(`/api/embeds/${id}`, cookie);
  if (!ok || !data?.embed) return Astro2.redirect("/embeds");
  const embed = data.embed;
  const appUrl = publicUrl("") || Astro2.url.origin;
  const saved = Astro2.url.searchParams.get("saved") === "1";
  const error = Astro2.url.searchParams.get("error");
  const publishedCount = (embed.preview ?? []).length;
  const snippet = String(embed.snippet ?? "").replace(
    /src="[^"]*\/embed\.js"/,
    `src="${appUrl}/embed.js"`
  );
  return renderTemplate(_a || (_a = __template(["", ' <script src="/embed.js"><\/script> <script>(function(){', "\n  const testimonials = JSON.parse(preview);\n  const form = document.getElementById('cfg');\n  const target = document.getElementById('preview');\n\n  function current() {\n    const fd = new FormData(form);\n    const limit = Number(fd.get('testimonial_limit'));\n    const list = limit === 0 ? testimonials.slice(0, 50) : testimonials.slice(0, limit);\n    return {\n      embed: {\n        layout: fd.get('layout'),\n        appearance: fd.get('appearance'),\n        animation: fd.get('animation'),\n        background: fd.get('background'),\n        bg_color: fd.get('bg_color'),\n      },\n      testimonials: list,\n    };\n  }\n\n  function draw() {\n    if (window.TSWidget?.render) window.TSWidget.render(target, current());\n  }\n\n  form?.addEventListener('input', draw);\n  form?.addEventListener('change', draw);\n  if (window.TSWidget?.render) draw();\n})();<\/script>"])), renderComponent($$result, "AppLayout", $$AppLayout, { "title": `Embed \u2014 ${embed.name}`, "user": user, "path": "/embeds", "wide": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<nav class="mb-4 text-sm text-fg-muted" aria-label="Breadcrumb"> <a href="/embeds" class="link-muted hover:text-fg">Embeds</a> <span class="mx-1.5 text-fg-subtle" aria-hidden="true">/</span> <span class="truncate text-fg">${embed.name}</span> </nav> <div class="mb-6 flex flex-wrap items-start justify-between gap-4"> <div class="min-w-0"> <h1 class="text-2xl font-semibold tracking-tight">${embed.name}</h1> <p class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fg-muted"> <span>${embed.space_name}</span> <span aria-hidden="true">·</span> <span class="nums">${publishedCount} published</span> </p> </div> <a href="/embeds" class="btn btn-ghost btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "arrowRight", "class": "size-4 rotate-180" })}
All embeds
</a> </div> ${saved && renderTemplate`<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "success" }, { "default": async ($$result3) => renderTemplate`Widget saved.` })}</div>`}${error && renderTemplate`<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${error}` })}</div>`}${publishedCount === 0 && renderTemplate`<div class="mb-5"> ${renderComponent($$result2, "Alert", $$Alert, { "type": "warning", "title": "No published testimonials yet" }, { "default": async ($$result3) => renderTemplate`
This widget will show an empty state. Publish some testimonials in your${" "}<a href="/inbox" class="font-medium underline">inbox</a> first.
` })} </div>`}<div class="grid gap-4 xl:grid-cols-[22rem_1fr] xl:items-start"> <!-- ---------- Config ---------- --> <form method="POST"${addAttribute(`/api/embeds/update?id=${embed.id}`, "action")} id="cfg" class="card card-pad space-y-5"> ${renderComponent($$result2, "Field", $$Field, { "label": "Widget name", "name": "name", "required": true }, { "default": async ($$result3) => renderTemplate` <input id="name" class="input" name="name"${addAttribute(embed.name, "value")} required maxlength="80"> ` })} <fieldset class="border-t-line pt-5"> <legend class="text-sm font-semibold">Appearance</legend> <div class="mt-4 space-y-4"> ${renderComponent($$result2, "Field", $$Field, { "label": "Layout", "name": "layout" }, { "default": async ($$result3) => renderTemplate` <select id="layout" class="input" name="layout" data-cfg> <option value="grid"${addAttribute(embed.layout === "grid", "selected")}>Grid / masonry</option> <option value="carousel"${addAttribute(embed.layout === "carousel", "selected")}>Carousel</option> </select> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Theme", "name": "appearance" }, { "default": async ($$result3) => renderTemplate` <select id="appearance" class="input" name="appearance" data-cfg> <option value="light"${addAttribute(embed.appearance === "light", "selected")}>Light</option> <option value="dark"${addAttribute(embed.appearance === "dark", "selected")}>Dark</option> <option value="auto"${addAttribute(embed.appearance === "auto", "selected")}>Match site</option> </select> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Animation", "name": "animation" }, { "default": async ($$result3) => renderTemplate` <select id="animation" class="input" name="animation" data-cfg> <option value="none"${addAttribute(embed.animation === "none", "selected")}>None</option> <option value="fade"${addAttribute(embed.animation === "fade", "selected")}>Fade in</option> <option value="slide"${addAttribute(embed.animation === "slide", "selected")}>Slide in</option> </select> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "How many", "name": "testimonial_limit" }, { "default": async ($$result3) => renderTemplate` <select id="testimonial_limit" class="input" name="testimonial_limit" data-cfg> <option value="3"${addAttribute(embed.testimonial_limit === 3, "selected")}>3</option> <option value="6"${addAttribute(embed.testimonial_limit === 6, "selected")}>6</option> <option value="9"${addAttribute(embed.testimonial_limit === 9, "selected")}>9</option> <option value="0"${addAttribute(embed.testimonial_limit === 0, "selected")}>All published</option> </select> ` })} </div> </fieldset> <fieldset class="border-t-line pt-5"> <legend class="text-sm font-semibold">Background</legend> <div class="mt-4 space-y-4"> ${renderComponent($$result2, "Field", $$Field, { "label": "Style", "name": "background" }, { "default": async ($$result3) => renderTemplate` <select id="background" class="input" name="background" data-cfg> <option value="transparent"${addAttribute(embed.background === "transparent", "selected")}>Transparent</option> <option value="custom"${addAttribute(embed.background === "custom", "selected")}>Custom colour</option> </select> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Colour", "name": "bg_color" }, { "default": async ($$result3) => renderTemplate` <input type="color" id="bg_color" name="bg_color"${addAttribute(embed.bg_color, "value")} class="h-9 w-full cursor-pointer rounded-lg border-line-strong bg-surface p-1" data-cfg> ` })} </div> </fieldset> <div class="flex gap-2 border-t-line pt-5"> <button type="submit" class="btn btn-primary btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "class": "size-4" })}
Save
</button> </div> </form> <div class="space-y-4"> <!-- ---------- Live preview ---------- --> <section class="card overflow-hidden"> <div class="flex items-center justify-between gap-2 border-b-line px-4 py-2.5"> <p class="text-xs font-semibold tracking-wide text-fg-subtle uppercase">
Live preview
</p> <p class="text-xs text-fg-subtle">Updates as you change settings</p> </div> <div class="bg-canvas p-4 sm:p-6"> <div id="preview"></div> </div> </section> <!-- ---------- Snippet ---------- --> <section id="snippet" class="card card-pad scroll-mt-6"> <h2 class="font-semibold">Embed code</h2> <p class="mt-1 text-sm text-fg-muted">
Paste this anywhere in your site's HTML. It loads one small script and
          pulls published testimonials.
</p> <pre id="embed-snippet" class="mt-4 overflow-x-auto rounded-lg bg-fg p-4 font-mono text-[13px] leading-relaxed text-canvas"><code>${snippet}</code></pre> <div class="mt-3"> ${renderComponent($$result2, "CopyButton", $$CopyButton, { "target": "#embed-snippet", "label": "Copy embed code" })} </div> </section> <!-- ---------- Danger zone ---------- --> <section class="card card-pad border-danger/30"> <h2 class="font-semibold text-danger">Delete widget</h2> <p class="mt-1 text-sm text-fg-muted">
The widget stops working immediately. Your testimonials are not affected.
</p> <form method="POST"${addAttribute(`/api/embeds/delete?id=${embed.id}`, "action")} onsubmit="return confirm('Delete this widget?')" class="mt-4"> <button type="submit" class="btn btn-danger btn-sm"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "trash", "class": "size-4" })}
Delete widget
</button> </form> </section> </div> </div> ` }), defineScriptVars({ preview: embed.preview ?? [] }));
}, "/home/AEapp/TestimonialApp/frontend/src/pages/embeds/[id].astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/embeds/[id].astro";
const $$url = "/embeds/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
