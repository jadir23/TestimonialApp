import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';
export const GET: APIRoute = async ({ params }) => {
  const key = params.key ?? '';
  if (!key) {
    return new Response(JSON.stringify({ error: 'Widget not found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const r = await fetch(`${ODOO}/api/public/embeds/${encodeURIComponent(key)}`);
    const j = await r.json().catch(() => ({}));
    return new Response(JSON.stringify(j), {
      status: r.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Widget not found.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};