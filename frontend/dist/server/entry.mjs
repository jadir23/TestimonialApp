import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CldjWSSS.mjs';
import { manifest } from './manifest_idp4su8b.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/billing/checkout.astro.mjs');
const _page2 = () => import('./pages/api/billing/portal.astro.mjs');
const _page3 = () => import('./pages/api/embeds/create.astro.mjs');
const _page4 = () => import('./pages/api/embeds/delete.astro.mjs');
const _page5 = () => import('./pages/api/embeds/update.astro.mjs');
const _page6 = () => import('./pages/api/login.astro.mjs');
const _page7 = () => import('./pages/api/logout.astro.mjs');
const _page8 = () => import('./pages/api/public/embeds/_key_.astro.mjs');
const _page9 = () => import('./pages/api/public/submit.astro.mjs');
const _page10 = () => import('./pages/api/register.astro.mjs');
const _page11 = () => import('./pages/api/request-reset.astro.mjs');
const _page12 = () => import('./pages/api/spaces/archive.astro.mjs');
const _page13 = () => import('./pages/api/spaces/create.astro.mjs');
const _page14 = () => import('./pages/api/spaces/update.astro.mjs');
const _page15 = () => import('./pages/api/stripe/webhook.astro.mjs');
const _page16 = () => import('./pages/api/testimonials/delete.astro.mjs');
const _page17 = () => import('./pages/api/testimonials/favorite.astro.mjs');
const _page18 = () => import('./pages/api/testimonials/hide.astro.mjs');
const _page19 = () => import('./pages/api/testimonials/publish.astro.mjs');
const _page20 = () => import('./pages/billing.astro.mjs');
const _page21 = () => import('./pages/checkout/cancel.astro.mjs');
const _page22 = () => import('./pages/checkout/success.astro.mjs');
const _page23 = () => import('./pages/dashboard.astro.mjs');
const _page24 = () => import('./pages/embeds/new.astro.mjs');
const _page25 = () => import('./pages/embeds/_id_.astro.mjs');
const _page26 = () => import('./pages/embeds.astro.mjs');
const _page27 = () => import('./pages/forgot-password.astro.mjs');
const _page28 = () => import('./pages/inbox.astro.mjs');
const _page29 = () => import('./pages/login.astro.mjs');
const _page30 = () => import('./pages/register.astro.mjs');
const _page31 = () => import('./pages/s/_slug_/thanks.astro.mjs');
const _page32 = () => import('./pages/s/_slug_.astro.mjs');
const _page33 = () => import('./pages/spaces/new.astro.mjs');
const _page34 = () => import('./pages/spaces/_id_/settings.astro.mjs');
const _page35 = () => import('./pages/spaces/_id_.astro.mjs');
const _page36 = () => import('./pages/spaces.astro.mjs');
const _page37 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/api/billing/checkout.ts", _page1],
    ["src/pages/api/billing/portal.ts", _page2],
    ["src/pages/api/embeds/create.ts", _page3],
    ["src/pages/api/embeds/delete.ts", _page4],
    ["src/pages/api/embeds/update.ts", _page5],
    ["src/pages/api/login.ts", _page6],
    ["src/pages/api/logout.ts", _page7],
    ["src/pages/api/public/embeds/[key].ts", _page8],
    ["src/pages/api/public/submit.ts", _page9],
    ["src/pages/api/register.ts", _page10],
    ["src/pages/api/request-reset.ts", _page11],
    ["src/pages/api/spaces/archive.ts", _page12],
    ["src/pages/api/spaces/create.ts", _page13],
    ["src/pages/api/spaces/update.ts", _page14],
    ["src/pages/api/stripe/webhook.ts", _page15],
    ["src/pages/api/testimonials/delete.ts", _page16],
    ["src/pages/api/testimonials/favorite.ts", _page17],
    ["src/pages/api/testimonials/hide.ts", _page18],
    ["src/pages/api/testimonials/publish.ts", _page19],
    ["src/pages/billing.astro", _page20],
    ["src/pages/checkout/cancel.astro", _page21],
    ["src/pages/checkout/success.astro", _page22],
    ["src/pages/dashboard.astro", _page23],
    ["src/pages/embeds/new.astro", _page24],
    ["src/pages/embeds/[id].astro", _page25],
    ["src/pages/embeds/index.astro", _page26],
    ["src/pages/forgot-password.astro", _page27],
    ["src/pages/inbox.astro", _page28],
    ["src/pages/login.astro", _page29],
    ["src/pages/register.astro", _page30],
    ["src/pages/s/[slug]/thanks.astro", _page31],
    ["src/pages/s/[slug].astro", _page32],
    ["src/pages/spaces/new.astro", _page33],
    ["src/pages/spaces/[id]/settings.astro", _page34],
    ["src/pages/spaces/[id].astro", _page35],
    ["src/pages/spaces/index.astro", _page36],
    ["src/pages/index.astro", _page37]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/AEapp/TestimonialApp/frontend/dist/client/",
    "server": "file:///home/AEapp/TestimonialApp/frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
{
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
