# Testimonial SaaS — Product Requirements Document

**Version:** 1.0  
**Status:** Ready for Development  
**Product Type:** SaaS Web Application  
**Inspiration:** Testimonial.to — minimal MVP

---

## 1. Product Overview

Build a minimal SaaS platform that allows businesses/creators to:

1. Create an account.
2. Create branded **testimonial collection spaces**.
3. Share a public link with customers to collect testimonials.
4. Manage collected testimonials from an inbox.
5. Display approved testimonials through embeddable widgets.
6. View collection statistics.
7. Upgrade from a free plan to a paid plan through Stripe.

The product should prioritize **simplicity, clean UX, and fast testimonial collection**.

---

# 2. User Roles

### 2.1 Account Owner

The only authenticated application role in MVP.

Can:

- Manage account.
- Create/manage spaces.
- Configure testimonial fields.
- Configure space appearance.
- View testimonials.
- Moderate testimonials.
- Create embeds.
- View analytics.
- Manage subscription.

### 2.2 Testimonial Submitter

Unauthenticated public user.

Can:

- Open a public space URL.
- View space branding/instructions.
- Submit a testimonial.
- Provide configured fields.
- Provide rating if enabled.
- Provide consent.
- Receive submission confirmation.

No account is required.

---

# 3. Plans & Limits

| Feature | Free | Pro |
|---|---:|---:|
| Price | $0 | $19.99/month |
| Spaces | 3 | 25 |
| Testimonials / Space | 100 | 1,000 |
| Embeds | Yes | Yes |
| Analytics | Yes | Yes |
| Custom themes | Limited | All |
| Testimonial moderation | Yes | Yes |

### Limit Behavior

- Prevent creation of a 4th space on Free.
- Prevent testimonial collection after reaching the per-space limit.
- Display an upgrade CTA when a limit is reached.
- Existing testimonials remain accessible after reaching the limit.
- Paid-plan limits must be enforced server-side.

---

# 4. Authentication

Implement:

- Sign up
- Login
- Logout
- Password reset
- Session management
- Basic account/profile settings

Email verification may be implemented if supported by the chosen authentication stack.

---

# 5. Dashboard

After authentication, users land on the Dashboard.

### Dashboard Statistics

Display:

- Total spaces
- Total testimonials
- Total customers/submitters
- Testimonials collected over time
- Current plan
- Space usage

### Testimonial Chart

Provide a time-series chart showing testimonials collected by day.

Filters:

- Last 7 days
- Last 30 days
- Last 90 days
- Custom range

### Free Plan Banner

Free users should see a non-intrusive upgrade banner:

> Upgrade to Pro to collect more testimonials and create more spaces.

Paid users should not see this banner.

---

# 6. Spaces

A **Space** represents a testimonial collection page.

Users can:

- Create space
- View spaces
- Edit space
- Delete/archive space
- Copy public URL
- Open public page

### Space Creation

Required:

- Space name/title
- Subtitle/instruction

Example:

> **What our customers say**  
> Tell us about your experience working with Acme.

### Public URL

Generate a unique URL such as:

`/s/{unique-slug}`

The slug must be unique and safe for URLs.

Allow the owner to edit the slug if practical.

---

# 7. Testimonial Field Configuration

Each Space has configurable submission fields.

### Required Default Fields

- Name — required
- Email — required

### Optional Predefined Fields

Include at least:

- Company Name
- Job Title
- Profile Photo
- Website
- LinkedIn
- Twitter/X
- Location

For each field, the owner can:

- Enable/disable field
- Mark required/optional

Do not build arbitrary/custom field creation in MVP unless it is trivial to support.

### Rating

During Space creation/configuration:

**Enable ratings:** Yes/No

If enabled:

- Display 1–5 star rating on submission form.
- Store rating with testimonial.
- Allow filtering/displaying rating in the dashboard.

---

# 8. Space Themes

Provide approximately **5–10 polished predefined themes** for MVP rather than implementing 25 themes initially.

Each theme controls:

- Typography
- Background
- Card appearance
- Buttons
- Accent color
- Form appearance

Themes should be reusable across:

- Public submission page
- Testimonial display/embed where applicable

Theme selection should include a visual preview.

---

# 9. Public Testimonial Submission

Public URL:

`/s/{space-slug}`

No authentication required.

### Page Contents

Display:

- Space title
- Space subtitle
- Space branding/theme
- Configured testimonial fields
- Rating field if enabled
- Testimonial textarea
- Consent checkbox
- Submit button

### Testimonial Text

Required.

Recommended placeholder:

> Tell us about your experience...

### Consent

Display:

> I give permission for this testimonial to be displayed publicly and shared on social media.

Store consent as a boolean with timestamp.

The user must be able to submit without creating an account.

### Submission Protection

Implement basic abuse prevention:

- Rate limiting
- CAPTCHA/honeypot mechanism
- Input validation
- Maximum text length
- Server-side validation

---

# 10. Submission Confirmation

After successful submission, show a friendly confirmation page.

Example:

> 🎉 Thank you!  
> Your testimonial has been received. You just made someone's day!

Optionally include a small fun animation/GIF.

Do not automatically publish the testimonial unless the Space configuration explicitly allows it.

Default behavior: **new testimonials are pending moderation.**

---

# 11. Testimonial Inbox

Create an Inbox page containing all testimonials for the user's spaces.

### Testimonial Card

Display:

- Submitter name
- Profile photo
- Company
- Job title
- Rating
- Testimonial text
- Submission date
- Consent status
- Public/private status
- Favorite status

### Actions

#### Favorite

Heart icon.

Favorited testimonials appear first in the inbox.

#### Publish

Make testimonial visible in public embeds.

#### Hide

Remove testimonial from public display while retaining it internally.

#### Delete

Permanently delete testimonial after confirmation.

#### More Actions

Use an overflow/ellipsis menu containing:

- Publish
- Hide
- Delete

### Filtering

Support:

- All
- Published
- Pending
- Hidden
- Favorites

Also allow filtering by Space.

---

# 12. Testimonial Status Model

Use clear statuses:

```text
pending
published
hidden
```

Default:

```text
pending
```

Only `published` testimonials can appear in public embeds.

---

# 13. Embed Builder

Create an **Embeds** section.

Users can create an embeddable testimonial widget for a Space.

### Embed Configuration

#### Layout

At least:

- Grid/Masonry
- Carousel

#### Appearance

- Light
- Dark
- Auto

#### Animation

- None
- Fade
- Slide

#### Background

- Transparent
- Custom color

#### Number of Testimonials

Allow configuration such as:

- 3
- 6
- 9
- All

### Live Preview

The right side of the builder should show a live preview.

Changing any configuration must immediately update the preview.

---

# 14. Embed Code

After configuration, generate a copyable JavaScript embed snippet.

Example architecture:

```html
<script src="https://app.example.com/embed.js"></script>
<div data-testimonial-widget="EMBED_ID"></div>
```

The embed script should:

1. Load configuration.
2. Fetch published testimonials.
3. Render the selected widget.
4. Apply selected theme/options.
5. Work on external websites.

The embed must not expose private account data.

---

# 15. Public Embed API

Create a lightweight public endpoint for published testimonials.

Example:

```text
GET /api/public/embeds/{embed_id}
```

Return only information required by the widget.

Never expose:

- Account credentials
- Private testimonials
- Internal database IDs unnecessarily
- Billing information
- Private customer data not intended for display

---

# 16. Billing

Implement Stripe subscriptions.

### Free

```text
$0/month
3 spaces
100 testimonials per space
```

### Pro

```text
$19.99/month
25 spaces
1,000 testimonials per space
```

### Billing Page

Display:

- Current plan
- Plan comparison
- Current usage
- Upgrade button
- Subscription status

For Free users:

**Upgrade to Pro**

For Pro users:

> You're subscribed to Pro.

Also provide a Stripe customer portal link for subscription management if appropriate.

---

# 17. Stripe Integration

Use Stripe Checkout for upgrading.

Flow:

```text
Billing Page
    ↓
Stripe Checkout
    ↓
Payment
    ↓
Stripe Webhook
    ↓
Update Subscription
    ↓
User returns to application
    ↓
Success page
```

### Webhooks

Implement webhook handling for at least:

- Checkout completion
- Subscription created
- Subscription updated
- Subscription canceled
- Payment failure

The webhook must be the authoritative source for subscription state.

Do not activate Pro solely based on the frontend redirect.

---

# 18. Data Model

Minimum entities:

### User

```text
id
email
name
password/auth provider
plan
stripe_customer_id
stripe_subscription_id
created_at
updated_at
```

### Space

```text
id
user_id
name
subtitle
slug
theme
rating_enabled
status
created_at
updated_at
```

### SpaceField

```text
id
space_id
field_type
label
enabled
required
sort_order
```

### Testimonial

```text
id
space_id
name
email
company_name
job_title
profile_photo
website
linkedin
twitter
location
rating
content
consent
status
is_favorite
submitted_at
created_at
updated_at
```

### Embed

```text
id
space_id
name
layout
theme
mode
animation
background
testimonial_limit
created_at
updated_at
```

### Subscription

```text
id
user_id
stripe_customer_id
stripe_subscription_id
plan
status
current_period_start
current_period_end
created_at
updated_at
```

---

# 19. Core Pages

Authenticated:

```text
/login
/register
/forgot-password

/dashboard
/spaces
/spaces/new
/spaces/{id}
/spaces/{id}/settings

/inbox
/embeds
/embeds/new
/embeds/{id}

/billing
/settings
```

Public:

```text
/s/{space-slug}
```

System:

```text
/checkout/success
/checkout/cancel
```

---

# 20. UX Requirements

The application should feel:

- Minimal
- Modern
- Fast
- Friendly
- SaaS-oriented
- Mobile responsive

Prioritize:

1. Simple onboarding
2. Minimal clicks
3. Clear empty states
4. Strong CTA hierarchy
5. Excellent public testimonial form
6. Easy copy/share workflow

Use reusable UI components rather than page-specific implementations.

---

# 21. Security Requirements

Implement:

- Secure authentication
- Authorization checks on every protected resource
- Server-side ownership validation
- Input validation
- XSS protection
- CSRF protection where applicable
- Rate limiting on public submission endpoints
- CAPTCHA/honeypot protection
- Secure Stripe webhook signature verification
- No sensitive data in public APIs

A user must never be able to access another user's spaces/testimonials by manipulating IDs.

---

# 22. Analytics Requirements

Track at minimum:

- Space created
- Public space viewed
- Testimonial submitted
- Testimonial published
- Testimonial hidden
- Embed created
- Embed viewed
- Upgrade initiated
- Upgrade completed

MVP analytics can remain internal and do not need a separate analytics product.

---

# 23. Notifications

MVP should provide in-app feedback for:

- Space created
- Testimonial submitted
- Testimonial deleted
- Testimonial published
- Subscription upgraded
- Payment failure

Toast notifications are sufficient.

Email notifications can be added later.

---

# 24. Non-Goals for MVP

Do **not** implement initially:

- Team/multi-user accounts
- Custom fields
- Advanced CRM integrations
- AI-generated testimonials
- AI testimonial summarization
- Social media publishing automation
- Native mobile applications
- Advanced analytics
- Multiple paid tiers
- White-labeling
- Custom domains
- Complex workflow automation

Keep the first version focused on the testimonial collection → moderation → display workflow.

---

# 25. Recommended MVP User Flow

```text
Register
   ↓
Dashboard
   ↓
Create Space
   ↓
Configure title/subtitle
   ↓
Configure fields
   ↓
Enable/disable rating
   ↓
Select theme
   ↓
Create Space
   ↓
Success Page
   ↓
Copy Public Link
   ↓
Customer submits testimonial
   ↓
Testimonial appears as Pending
   ↓
Owner opens Inbox
   ↓
Publish / Hide / Favorite / Delete
   ↓
Create Embed
   ↓
Configure widget
   ↓
Preview
   ↓
Copy Embed Code
   ↓
Add to external website
```

---

# 26. Acceptance Criteria

The MVP is considered complete when:

- A user can register and log in.
- A Free user can create up to 3 Spaces.
- A Space can be configured with title, subtitle, fields, rating and theme.
- A public Space URL works without authentication.
- Customers can submit testimonials without an account.
- Testimonials are stored securely and associated with the correct Space.
- Testimonial consent is recorded.
- Owners can manage testimonials from the Inbox.
- Owners can publish, hide, favorite and delete testimonials.
- Dashboard statistics are displayed.
- Owners can create and configure embeds.
- Embed code works on an external HTML website.
- Only published testimonials appear publicly.
- Free-plan limits are enforced server-side.
- Stripe Checkout successfully upgrades a user to Pro.
- Stripe webhooks correctly maintain subscription state.
- Billing page reflects the current subscription.
- Application is responsive on desktop and mobile.
- Basic security and abuse-prevention mechanisms are implemented.

---

# 27. Development Priorities

### Phase 1 — Foundation

- Project setup
- Database
- Authentication
- User model
- Base UI/layout

### Phase 2 — Spaces

- Space CRUD
- Field configuration
- Rating configuration
- Themes
- Public Space page

### Phase 3 — Testimonials

- Public submission
- Validation
- Consent
- Anti-spam
- Inbox
- Moderation

### Phase 4 — Dashboard

- Counters
- Charts
- Usage limits
- Empty states

### Phase 5 — Embeds

- Embed model
- Embed builder
- Live preview
- Public API
- JavaScript widget
- External-site testing

### Phase 6 — Billing

- Stripe products/prices
- Checkout
- Webhooks
- Subscription state
- Billing UI
- Usage enforcement

### Phase 7 — QA & Production

- Unit tests
- Integration tests
- E2E tests
- Security review
- Responsive testing
- Performance testing
- Production deployment

---

# 28. Coding-Agent Instructions

The coding agent should:

1. Treat this document as the product source of truth.
2. Do not implement features outside the MVP without explicit approval.
3. Use a modular architecture with clear separation between:
   - Authentication
   - Spaces
   - Testimonials
   - Embeds
   - Billing
   - Analytics
4. Create database migrations for every schema change.
5. Implement authorization at the server/service layer.
6. Write tests alongside core functionality.
7. Use reusable UI components.
8. Keep business rules such as plan limits centralized rather than scattered throughout the UI.
9. Never trust client-side subscription/permission state.
10. Use environment variables for all secrets and third-party credentials.
11. Provide seed/demo data for local development.
12. Document setup, environment variables, database setup and deployment.
13. Before implementing ambiguous functionality, follow the simplest behavior consistent with this PRD rather than inventing complex features.

---

# 29. Definition of Done

A feature is complete only when:

- Backend functionality is implemented.
- UI is implemented.
- Validation is implemented.
- Authorization is implemented.
- Relevant tests pass.
- Error and empty states are handled.
- Mobile layout is verified.
- Database migrations are included.
- Documentation is updated where necessary.

**MVP Goal:** Deliver a small, polished, production-ready testimonial collection SaaS rather than a feature-heavy clone of Testimonial.to.
