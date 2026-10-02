import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../../chunks/astro/server_D6TAomcX.mjs';
import 'kleur/colors';
import { s as sessionCookie, g as getUser, a as apiGet, $ as $$AppLayout } from '../../chunks/server_DuKSHUD0.mjs';
import { $ as $$PageHeader } from '../../chunks/PageHeader_BWTgY8GU.mjs';
import { $ as $$Alert } from '../../chunks/Alert_D0X2E_vS.mjs';
import { $ as $$Field } from '../../chunks/Field_IaQWiDD3.mjs';
import { $ as $$Icon } from '../../chunks/Icon_D3cJPChc.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const cookie = sessionCookie(Astro2.request);
  const user = await getUser(cookie);
  if (!user) return Astro2.redirect("/login");
  const { data } = await apiGet("/api/spaces", cookie);
  const spaces = data?.spaces ?? [];
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "AppLayout", $$AppLayout, { "title": "New embed", "user": user, "path": "/embeds" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "New embed", "description": "Pick a space and a look \u2014 you can change everything later." }, { "actions": async ($$result3) => renderTemplate`${maybeRenderHead()}<a href="/embeds" class="btn btn-ghost btn-sm">Cancel</a>` })} ${error && renderTemplate`<div class="mb-5">${renderComponent($$result2, "Alert", $$Alert, { "type": "danger" }, { "default": async ($$result3) => renderTemplate`${error}` })}</div>`}${spaces.length === 0 ? renderTemplate`${renderComponent($$result2, "Alert", $$Alert, { "type": "warning", "title": "You need a space first" }, { "default": async ($$result3) => renderTemplate`
Widgets pull testimonials from a space.${" "}<a href="/spaces/new" class="font-medium underline">Create a space</a> to get
        started.
` })}` : renderTemplate`<form method="POST" action="/api/embeds/create" class="card card-pad space-y-5"> <div class="grid gap-5 sm:grid-cols-2"> ${renderComponent($$result2, "Field", $$Field, { "label": "Widget name", "name": "name", "required": true }, { "default": async ($$result3) => renderTemplate` <input id="name" class="input" name="name" required autofocus maxlength="80" placeholder="Homepage wall"> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Space", "name": "space_id", "required": true }, { "default": async ($$result3) => renderTemplate` <select id="space_id" class="input" name="space_id" required> ${spaces.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}>${s.name}</option>`)} </select> ` })} </div> <fieldset class="border-t-line pt-5"> <legend class="text-sm font-semibold">Appearance</legend> <div class="mt-4 grid gap-4 sm:grid-cols-2"> ${renderComponent($$result2, "Field", $$Field, { "label": "Layout", "name": "layout" }, { "default": async ($$result3) => renderTemplate` <select id="layout" class="input" name="layout" data-preview-input> <option value="grid">Grid / masonry</option> <option value="carousel">Carousel</option> </select> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Theme", "name": "appearance" }, { "default": async ($$result3) => renderTemplate` <select id="appearance" class="input" name="appearance" data-preview-input> <option value="light">Light</option> <option value="dark">Dark</option> <option value="auto">Match site</option> </select> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Animation", "name": "animation" }, { "default": async ($$result3) => renderTemplate` <select id="animation" class="input" name="animation" data-preview-input> <option value="none">None</option> <option value="fade">Fade in</option> <option value="slide">Slide in</option> </select> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "How many", "name": "testimonial_limit", "hint": "Maximum testimonials shown." }, { "default": async ($$result3) => renderTemplate` <select id="testimonial_limit" class="input" name="testimonial_limit" data-preview-input> <option value="3">3</option> <option value="6" selected>6</option> <option value="9">9</option> <option value="0">All published</option> </select> ` })} </div> </fieldset> <fieldset class="border-t-line pt-5"> <legend class="text-sm font-semibold">Background</legend> <div class="mt-4 flex flex-wrap items-end gap-5"> ${renderComponent($$result2, "Field", $$Field, { "label": "Style", "name": "background" }, { "default": async ($$result3) => renderTemplate` <select id="background" class="input" name="background" data-preview-input> <option value="transparent">Transparent</option> <option value="custom">Custom colour</option> </select> ` })} ${renderComponent($$result2, "Field", $$Field, { "label": "Colour", "name": "bg_color" }, { "default": async ($$result3) => renderTemplate` <div class="flex items-center gap-2"> <input type="color" id="bg_color" name="bg_color" value="#ffffff" class="h-9 w-14 cursor-pointer rounded-lg border-line-strong bg-surface p-1" data-preview-input> <span class="text-xs text-fg-subtle">Used on light pages</span> </div> ` })} </div> </fieldset> <div class="flex gap-2 border-t-line pt-5"> <button type="submit" class="btn btn-primary"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "plus", "class": "size-4" })}
Create &amp; open builder
</button> <a href="/embeds" class="btn btn-ghost">Cancel</a> </div> </form>`}` })}`;
}, "/home/AEapp/TestimonialApp/frontend/src/pages/embeds/new.astro", void 0);

const $$file = "/home/AEapp/TestimonialApp/frontend/src/pages/embeds/new.astro";
const $$url = "/embeds/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
