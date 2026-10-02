# ⭐ Testimonial SaaS

Collect, moderate, and showcase customer testimonials — inspired by Testimonial.to, kept minimal on purpose.

Create a branded **space**, share its public link (`/s/your-slug`), collect testimonials without asking customers to sign up, moderate them from an **inbox**, and show the best ones on any website with a copy-paste **widget**. Upgrade to **Pro** via Stripe when you outgrow the free plan.

## How it works

```text
Sign up → Dashboard → Create space → Share /s/{slug} link
  → Customer submits (no account needed) → Pending in inbox
  → Publish / Favorite → Build embed → Paste snippet on your site
```

## Features

- **Auth** — sign up, login, logout, password reset (Odoo session + JSON API)
- **Spaces** — branded collection pages with custom slug, subtitle, 8 themes, optional 1–5 star ratings, per-space field config (company, job title, photo, website, LinkedIn, X, location)
- **Public collection** — themed submission page, consent checkbox, server-side validation, rate limiting + honeypot anti-spam, friendly thank-you page
- **Inbox** — filter by All / Pending / Published / Hidden / Favorites and by space; publish, hide, favorite (favorites sort first), delete
- **Dashboard** — spaces / testimonials / customers / in-period counters, per-day chart (7d · 30d · 90d · custom range), per-space usage bars with upgrade nudges
- **Embeds** — widget builder with instant live preview (grid/masonry or carousel; light/dark/auto; fade/slide; transparent or custom background; 3/6/9/All), copyable snippet, dependency-free `embed.js` that runs on any external site and only ever sees *published* testimonials
- **Billing** — Free ($0: 3 spaces, 100 testimonials/space) vs Pro ($19.99/mo: 25 spaces, 1,000/space); Stripe Checkout + customer portal; signature-verified webhooks are the sole writer of plan state; limits enforced server-side

## Tech stack

| Layer | Choice |
|---|---|
| Backend | **Odoo 18** custom addon (`testimonial_saas`) exposing a JSON API — no Odoo web UI needed |
| Frontend | **Astro 4** (SSR, Node adapter) + Tailwind — server proxies Odoo, browser never touches it |
| DB | PostgreSQL 16 |
| Billing | Stripe (Checkout, portal, webhooks; stdlib-only client, no extra deps) |
| Deploy | Docker Compose (db + odoo + frontend) behind your Caddy/Nginx for TLS |

Full details: [`testimonial-saas-prd.md`](testimonial-saas-prd.md) (product spec) · [`backend/DATA_MODEL.md`](backend/DATA_MODEL.md) (tables) · [`shared/contracts/api.yaml`](shared/contracts/api.yaml) (API contract).

## Project structure

```text
backend/addons/testimonial_saas/  Odoo addon (models, controllers, security)
frontend/src/pages/              Astro routes (dashboard, spaces, s/[slug], inbox, embeds, billing, checkout)
frontend/public/embed.js         Standalone widget for third-party sites
shared/contracts/api.yaml        API contract both sides code against
docker-compose.yml               db + odoo + frontend, env-driven
```

## Run it locally

```bash
cp .env.example .env   # for local dev set ODOO_URL=http://localhost:8069
docker compose up --build -d
docker compose exec odoo odoo -d postgres -i testimonial_saas --without-demo=all --stop-after-init
```

- App: http://localhost:4321 · Odoo (internal): http://localhost:8069
- Prefer native frontend? `cd frontend && npm install && ODOO_URL=http://localhost:8069 npm run dev`
- After model changes: `docker compose exec odoo odoo -d postgres -u testimonial_saas --stop-after-init`

## Deploy to a VPS

Accessed by IP (no domain, no TLS):

```bash
git clone <repo> && cd <repo>
cp .env.example .env   # set POSTGRES_PASSWORD, PUBLIC_APP_URL=http://<server-ip>:4321, STRIPE_*
docker compose up --build -d
# install the addon (once), then restart odoo so it registers its routes:
set -a; . ./.env; set +a
docker compose exec -e PGPASSWORD="$POSTGRES_PASSWORD" odoo \
  odoo -r /etc/odoo/odoo.conf -d postgres --db_host=db --db_user="$POSTGRES_USER" \
  -i testimonial_saas --without-demo=all --stop-after-init
docker compose restart odoo
```

App: `http://<server-ip>:4321`. Only `:4321` is published; Odoo (`:8069`) stays on the internal Docker network — browsers only ever talk to the Astro app. `backend/odoo.conf` pins `db_name` so Odoo does not try to pick a database from the `Host` header, and deliberately omits `db_host`/`db_user`/`db_password` so the image entrypoint injects them from `POSTGRES_*`.

Note: `docker compose exec odoo ...` bypasses the image entrypoint, which is why the DB flags above must be passed explicitly.

With a domain + TLS, put Caddy/Nginx in front of `:4321` and set `PUBLIC_APP_URL=https://app.example.com`. Stripe keys (`STRIPE_SECRET_KEY`, `STRIPE_PRICE_PRO`, `STRIPE_WEBHOOK_SECRET`) go in `.env` and reach only the Odoo container. Webhook URL in Stripe Dashboard: `https://<your-host>/api/stripe/webhook`; local test: `stripe listen --forward-to localhost:8069/api/stripe/webhook`.

## Configuration

| Variable | Used by | Example |
|---|---|---|
| `ODOO_URL` | frontend → odoo | `http://odoo:8069` (compose) / `http://localhost:8069` (local) |
| `PUBLIC_APP_URL` | snippets, Stripe redirects | `https://app.example.com` |
| `POSTGRES_*` | db + odoo | see `.env.example` |
| `STRIPE_SECRET_KEY` / `STRIPE_PRICE_PRO` / `STRIPE_WEBHOOK_SECRET` | odoo only | from [Stripe Dashboard](https://dashboard.stripe.com) |

## Security notes

Ownership is checked on every protected resource (`space.user_id == request user`); plan limits live server-side; public APIs expose published data only; Stripe webhooks verify HMAC signatures with timestamp tolerance; the success-page redirect never upgrades a plan by itself.

## Status

Phases 1–6 implemented (foundation → spaces → testimonials → dashboard → embeds → billing). Remaining: Phase 7 QA & production hardening (tests, E2E, security review, responsive/performance pass).
