import type { APIRoute } from 'astro';
const ODOO = process.env.ODOO_URL ?? 'http://localhost:8069';

/**
 * Stripe webhook proxy.
 *
 * Odoo owns the endpoint and its signature verification, but Odoo's port is
 * not published — only the Astro app is. Stripe can therefore only reach the
 * webhook through this route.
 *
 * The exact bytes and the `Stripe-Signature` header MUST be forwarded
 * untouched: HMAC verification fails on any re-serialisation of the body.
 */
export const POST: APIRoute = async ({ request }) => {
  // ArrayBuffer keeps the body byte-identical, including any trailing newline.
  const body = await request.arrayBuffer();
  const signature = request.headers.get('stripe-signature') ?? '';

  try {
    const r = await fetch(`${ODOO}/api/stripe/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': signature,
      },
      body,
    });

    const text = await r.text();
    return new Response(text, {
      status: r.status,
      headers: { 'Content-Type': r.headers.get('content-type') ?? 'application/json' },
    });
  } catch {
    // 502 so Stripe retries rather than treating it as a delivered event.
    return new Response(JSON.stringify({ error: 'Backend unreachable.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};