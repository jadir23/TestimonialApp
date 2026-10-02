import { c as createComponent, d as renderComponent, r as renderTemplate, b as createAstro, e as defineScriptVars, a as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_DGbUKG4V.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_CZ5FtSgD.mjs';
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
  const cookie = Astro2.request.headers.get("cookie") ?? "";
  const ODOO = process.env.ODOO_URL ?? "http://localhost:8069";
  const APP = process.env.PUBLIC_APP_URL ?? Astro2.url.origin;
  let user = null;
  let embed = null;
  try {
    const me = await fetch(`${ODOO}/api/auth/me`, { headers: { Cookie: cookie } });
    const mj = await me.json();
    if (!me.ok) return Astro2.redirect("/login");
    user = mj.data.user;
    const r = await fetch(`${ODOO}/api/embeds/${id}`, { headers: { Cookie: cookie } });
    const j = await r.json();
    if (r.ok) embed = j.data.embed;
    else return Astro2.redirect("/embeds");
  } catch {
    return Astro2.redirect("/embeds");
  }
  const saved = Astro2.url.searchParams.get("saved");
  const snippet = embed.snippet.replace('async"><\/script>', `async"><\/script>`).replace("/embed.js", `${APP}/embed.js`);
  const previewJson = JSON.stringify({ embed, testimonials: embed.preview ?? [] });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Embed \u2014 ${embed.name}`, "user": user }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<h1 class="text-2xl font-bold">', ' <span class="text-sm font-normal text-gray-500">\xB7 ', "</span></h1> ", '<div class="mt-3 grid gap-4 md:grid-cols-2"> <form method="POST"', ' id="cfg" class="space-y-2 rounded border bg-white p-4 text-sm"> <label class="block">Name<input name="name"', ' class="mt-1 w-full rounded border px-2 py-1"></label> <div class="grid grid-cols-2 gap-2"> <label>Layout<select name="layout" class="mt-1 w-full rounded border px-2 py-1"> <option value="grid"', '>Grid/Masonry</option> <option value="carousel"', '>Carousel</option></select></label> <label>Appearance<select name="appearance" class="mt-1 w-full rounded border px-2 py-1"> ', '</select></label> <label>Animation<select name="animation" class="mt-1 w-full rounded border px-2 py-1"> ', '</select></label> <label>Background<select name="background" class="mt-1 w-full rounded border px-2 py-1"> <option value="transparent"', '>Transparent</option> <option value="custom"', '>Custom color</option></select></label> <label>Count<select name="testimonial_limit" class="mt-1 w-full rounded border px-2 py-1"> ', '</select></label> <label>BG color<input type="color" name="bg_color"', ' class="mt-1 h-8 w-full rounded border"></label> </div> <div class="flex gap-2"><button class="rounded bg-black px-4 py-1.5 text-white">Save</button><a href="/embeds" class="rounded border px-4 py-1.5">Back</a></div> </form> <div class="rounded border bg-gray-50 p-2"> <p class="px-2 py-1 text-xs uppercase tracking-wide text-gray-500">Live preview (', ' published)</p> <div id="preview"></div> </div> </div> <div class="mt-4 rounded border bg-white p-4"> <h2 class="font-bold text-sm">Embed code</h2> <pre class="mt-1 overflow-x-auto rounded bg-gray-900 p-3 text-xs text-green-200">', '</pre> <button id="copy" class="mt-2 rounded border px-3 py-1 text-sm">Copy snippet</button> <form method="POST"', ` onsubmit="return confirm('Delete widget?')" class="mt-2"><button class="text-sm text-red-600 underline">Delete widget</button></form> </div> <script src="/embed.js"><\/script> <script>(function(){`, "\n    const data = JSON.parse(previewJson);\n    const form = document.getElementById('cfg');\n    const prev = document.getElementById('preview');\n    function current() {\n      const fd = new FormData(form);\n      const limit = Number(fd.get('testimonial_limit'));\n      const all = data.testimonials;\n      return { embed: {\n        layout: fd.get('layout'), appearance: fd.get('appearance'),\n        animation: fd.get('animation'), background: fd.get('background'),\n        bg_color: fd.get('bg_color'),\n      }, testimonials: limit === 0 ? all.slice(0, 50) : all.slice(0, limit) };\n    }\n    function draw() { window.TSWidget.render(prev, current()); }\n    form.addEventListener('input', draw); draw();\n    document.getElementById('copy').addEventListener('click', async (e) => {\n      const txt = e.target.closest('div').querySelector('pre').innerText;\n      await navigator.clipboard.writeText(txt); e.target.innerText = 'Copied!';\n    });\n  })();<\/script> "])), maybeRenderHead(), embed.name, embed.space_name, saved && renderTemplate`<p class="mt-2 rounded bg-green-50 p-2 text-sm">Saved.</p>`, addAttribute(`/api/embeds/update?id=${embed.id}`, "action"), addAttribute(embed.name, "value"), addAttribute(embed.layout === "grid", "selected"), addAttribute(embed.layout === "carousel", "selected"), ["light", "dark", "auto"].map((a) => renderTemplate`<option${addAttribute(a, "value")}${addAttribute(embed.appearance === a, "selected")}>${a}</option>`), ["none", "fade", "slide"].map((a) => renderTemplate`<option${addAttribute(a, "value")}${addAttribute(embed.animation === a, "selected")}>${a}</option>`), addAttribute(embed.background === "transparent", "selected"), addAttribute(embed.background === "custom", "selected"), [3, 6, 9, 0].map((n) => renderTemplate`<option${addAttribute(n, "value")}${addAttribute(embed.testimonial_limit === n, "selected")}>${n === 0 ? "All" : n}</option>`), addAttribute(embed.bg_color, "value"), (embed.preview ?? []).length, snippet, addAttribute(`/api/embeds/delete?id=${embed.id}`, "action"), defineScriptVars({ previewJson })) })}`;
}, "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/embeds/[id].astro", void 0);

const $$file = "/home/bs01754/Workspace/Projects/AE_Project/frontend/src/pages/embeds/[id].astro";
const $$url = "/embeds/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
