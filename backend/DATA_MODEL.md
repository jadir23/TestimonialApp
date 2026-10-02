# Backend Data Model — Testimonial SaaS (Odoo 18)

Custom addon: `backend/addons/testimonial_saas`. Source of truth: PRD §18 + model code in `models/`.
Odoo maps `testimonial.space` → PG table `testimonial_space` (dots become underscores).
Every custom table also carries Odoo's automatic columns: `id`, `create_date`, `write_date`, `create_uid`, `write_uid`.

## Entity-relationship overview

```text
res.users (extended: saas_plan, stripe_customer_id, stripe_subscription_id)
  │ 1 ── * testimonial.space            (user_id, FK → res.users)
  │ 1 ── * testimonial.subscription     (user_id, FK → res.users, ondelete cascade)
  │
testimonial.space
  │ 1 ── * testimonial.space.field      (space_id, FK, ondelete CASCADE)
  │ 1 ── * testimonial.testimonial      (space_id, FK, ondelete CASCADE)
  │ 1 ── * testimonial.embed            (space_id, FK, ondelete CASCADE)
  │
testimonial.testimonial ──► res.users   (user_id, related=space_id.user_id, stored, read-only)
testimonial.embed       ──► res.users   (user_id, related=space_id.user_id, stored, read-only)
```

Delete behavior: deleting a **space** cascades to its fields, testimonials and embeds.
Deleting a **user** cascades to their subscriptions (spaces follow Odoo's standard user-deactivation rules).

## 0. `res.users` — extension (PG table `res_users`)

Existing Odoo table; the addon only adds columns:

| Column | Odoo type | Constraints | Notes |
|---|---|---|---|
| `saas_plan` | Selection `free`/`pro` | required, default `free`, indexed | **Only written by the Stripe webhook** (`_handle_stripe_event`). Frontend values are never trusted (PRD §17, §28.9) |
| `stripe_customer_id` | Char | indexed, `copy=False` | Set at checkout start; also refreshed by webhook |
| `stripe_subscription_id` | Char | indexed, `copy=False` | Set by webhook |

Plan limits (centralized in `PLAN_LIMITS`, PRD §28.8): Free = 3 spaces / 100 testimonials per space; Pro = 25 / 1,000. Enforced server-side in `testimonial.space.create()` and `testimonial.testimonial._validate_submit()`.

## 1. `testimonial.space` — collection space (PG table `testimonial_space`)

One branded testimonial collection page. Public URL: `/s/{slug}`.

| Column | Odoo type | Constraints | Notes |
|---|---|---|---|
| `user_id` | Many2one `res.users` | required, indexed, default = current user | Owner; every API checks `space.user_id == env.user` |
| `name` | Char | required | e.g. "What our customers say" |
| `subtitle` | Text | optional | Instructions shown on the public page |
| `slug` | Char | required, indexed, `copy=False`, SQL `UNIQUE(slug)` | URL-safe (auto-slugified, editable); collision → random hex suffix |
| `theme` | Selection (8 values) | required, default `minimal` | `minimal, bold, warm, ocean, forest, elegant, playful, dark` — colors/fonts live in code (`THEMES`), not in DB |
| `rating_enabled` | Boolean | default `True` | Controls 1–5 star field on the submission form |
| `status` | Selection `active`/`archived` | required, default `active`, indexed | DELETE API archives instead of unlinking |
| `field_ids` | One2many → `testimonial.space.field` | — | Auto-populated with the 7 optional field rows on create (`company_name` + `job_title` enabled, rest disabled) |

Default order: newest first. Public API (`to_public_dict`) exposes only name/subtitle/slug/theme/rating + **enabled** fields.

## 2. `testimonial.space.field` — per-space field config (PG table `testimonial_space_field`)

Configures the optional submission fields of one space. `name` + `email` are always required and are **not** stored here.

| Column | Odoo type | Constraints | Notes |
|---|---|---|---|
| `space_id` | Many2one `testimonial.space` | required, indexed, `ondelete=cascade` | — |
| `field_type` | Selection (7 values) | required, indexed | `company_name, job_title, profile_photo, website, linkedin, twitter, location` |
| `label` | Char | required | Display label, e.g. "Twitter/X" |
| `enabled` | Boolean | default `True` | Shown on the public form only if true |
| `required` | Boolean | default `False` | Enforced server-side at submit time |
| `sort_order` | Integer | default `10` | Steps of 10 (`10, 20, …`), ordered display |

Default order: `sort_order, id`.

## 3. `testimonial.testimonial` — collected testimonial (PG table `testimonial_testimonial`)

One submission from a public (unauthenticated) user. Default status is `pending`; only `published` rows ever leave the account (embeds, widget).

| Column | Odoo type | Constraints | Notes |
|---|---|---|---|
| `space_id` | Many2one `testimonial.space` | required, indexed, `ondelete=cascade` | — |
| `user_id` | Many2one `res.users` | related to `space_id.user_id`, stored, indexed, read-only | Denormalized owner for fast `mine` domains |
| `name` | Char | required (trimmed, max 120 at submit) | Submitter name |
| `email` | Char | required, indexed (lowercased, max 160) | Used for distinct-customer counts + 3/hour anti-spam |
| `company_name`, `job_title`, `profile_photo`, `website`, `linkedin`, `twitter`, `location` | Char | optional (max 255) | `profile_photo` is a URL string in MVP (no binary upload) |
| `rating` | Integer | optional | 1–5; rejected if the space has ratings disabled |
| `content` | Text | required, max 2,000 chars | The testimonial itself |
| `consent` | Boolean | default `False`, required `True` at submit | "Display publicly" permission |
| `consent_at` | Datetime | set on submit | Timestamp paired with `consent` (PRD §9) |
| `status` | Selection `pending`/`published`/`hidden` | required, default `pending`, indexed | Moderation state; inbox filters + publish/hide actions |
| `is_favorite` | Boolean | default `False`, indexed | ❤️ toggle; favorites sort first everywhere |
| `submitted_at` | Datetime | required, default now | Basis for dashboard time-series + rate limiting |

Default order: favorites first, then newest. Submit-time guards (`_validate_submit`): email format, consent present, space field-required rules, per-space plan limit, max 3 submissions per email+space/hour, honeypot `website_url` silently dropped.

## 4. `testimonial.embed` — widget config (PG table `testimonial_embed`)

Widget configuration for one space. The public snippet references `public_key`, never the numeric id.

| Column | Odoo type | Constraints | Notes |
|---|---|---|---|
| `space_id` | Many2one `testimonial.space` | required, indexed, `ondelete=cascade` | Must belong to the requesting user |
| `user_id` | Many2one `res.users` | related to `space_id.user_id`, stored, indexed, read-only | Owner shortcut |
| `name` | Char | required | e.g. "Homepage wall" |
| `layout` | Selection `grid`/`carousel` | required, default `grid` | Grid renders as masonry via CSS |
| `appearance` | Selection `light`/`dark`/`auto` | required, default `light` | `auto` follows OS `prefers-color-scheme` |
| `animation` | Selection `none`/`fade`/`slide` | required, default `none` | — |
| `background` | Selection `transparent`/`custom` | required, default `transparent` | `custom` uses `bg_color` |
| `bg_color` | Char | default `#ffffff` | Hex color |
| `testimonial_limit` | Integer | default `6`; allowed `3, 6, 9, 0` | `0` = All, capped at 50 rows in the widget query |
| `public_key` | Char | required, indexed, `copy=False`, SQL `UNIQUE`, default random token | Public identifier used in the embed snippet + public API |

Public API (`to_public_dict`) returns only config + published testimonials (`name, company_name, job_title, rating, content, profile_photo`) — no emails, ids, or account data.

## 5. `testimonial.subscription` — Stripe state (PG table `testimonial_subscription`)

Mirrors Stripe; **written only by the webhook** (`_handle_stripe_event`, signature-verified). One active row per user (reused/updated, not duplicated).

| Column | Odoo type | Constraints | Notes |
|---|---|---|---|
| `user_id` | Many2one `res.users` | required, indexed, `ondelete=cascade` | Resolved via `metadata.odoo_user_id` → customer id → email |
| `stripe_customer_id` | Char | indexed | `cus_…` |
| `stripe_subscription_id` | Char | indexed, SQL `UNIQUE` | `sub_…` |
| `plan` | Selection `free`/`pro` | required, default `free` | `active`/`trialing` → `pro`; `canceled`/`incomplete_expired` → `free`; otherwise unchanged |
| `status` | Selection `none`/`active`/`trialing`/`past_due`/`unpaid`/`canceled`/`incomplete` | required, default `none` | `invoice.payment_failed` → `past_due` (plan kept, billing page warns) |
| `current_period_start` / `current_period_end` | Datetime | optional | From Stripe unix timestamps (renewal date on billing page) |

## Access rights (`security/ir.model.access.csv`)

All custom models grant full CRUD to `base.group_user` (any internal user) and rely on **code-level ownership checks** (`space.user_id == env.user`) instead of record rules — except `testimonial.subscription`, which is read-only for users (webhook runs as sudo). Public endpoints (`/api/public/…`, `/api/stripe/webhook`) run as sudo and expose only whitelisted fields.

## Regenerating / inspecting the live schema

```bash
docker compose exec odoo odoo -d postgres -u testimonial_saas --stop-after-init
# then in psql: \d testimonial_space, \d testimonial_testimonial, …
```
