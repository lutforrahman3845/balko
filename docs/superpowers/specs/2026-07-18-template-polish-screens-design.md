# Balko Template Polish — Design Spec

**Date:** 2026-07-18
**Goal:** Raise Balko from a niche CRM template to a competitive, marketplace-ready
Next.js admin template ("Path A") by adding the standard scaffolding screens buyers
expect. **All work is UI-only** — no real auth, no database, no billing logic. This
preserves the README's "bring your own backend" boundary.

## Locked decisions

- **Delivery:** Tier by tier. Build + commit each tier; review checkpoint after each.
- **Data:** Static, in-component mock data co-located in each screen. No mock arrays,
  no API routes, no fake persistence for the new screens.
- **i18n / RTL:** Skipped for this build (deferred as a possible v2 selling point).
- **Heavy screens:** Include both chat/inbox and a second (analytics) dashboard.

## Shared conventions

- New **auth** screens reuse the sign-in card chrome: `Login-bgCover.svg` background,
  blue-600 accent, dual light/dark logos, and the existing fake-async `setTimeout` +
  `sonner` toast pattern. Extract `src/app/(auth)/layout.tsx` for the shared chrome and
  refactor the existing `sign-in` page onto it (removes duplication; targeted cleanup).
- New **in-app** pages live under `src/app/(pages)/`, render inside `DashboardLayout`,
  and (where sidebar-reachable) get a `MAIN_NAV` entry in
  `src/config/navitemsconfig.ts`.
- New **marketing** pages live in a `src/app/(marketing)/` route group with its own
  light navbar/footer layout, outside the dashboard shell.
- Reuse existing primitives: shadcn/ui, `command.tsx` (cmdk), Recharts, `date-fns`,
  `sonner`. No new dependencies.

## Tier 1 — Auth & Account (ship first)

**Auth screens** (`src/app/(auth)/`):
- `sign-up/page.tsx`
- `forgot-password/page.tsx`
- `reset-password/page.tsx`
- `verify-email/page.tsx` (OTP entry)
- `lock-screen/page.tsx`
- `layout.tsx` (shared chrome; `sign-in` refactored onto it)

Fixes the currently-dead `/sign-up` link in the sign-in card.

**Account pages** (`src/app/(pages)/account/`):
- `profile/page.tsx` — avatar, personal details, bio (view/edit form).
- `settings/page.tsx` — tabbed: General / Password / Notifications.
- Components in `src/components/Account/`.

**Error boundary:** `src/app/error.tsx` — styled 500 boundary matching the existing
`not-found.tsx`.

**Housekeeping:**
- `.env.example` documenting `NEXT_PUBLIC_BASE_URL`.
- Wire the topbar user menu to Profile / Settings / Lock screen / Sign out.

## Tier 2 — Productivity

- **⌘K command palette:** `src/components/shared/CommandPalette.tsx` using the existing
  `CommandDialog`; mounted in `DashboardLayout`; searches nav + quick actions; bound to
  ⌘K / Ctrl+K.
- **Notifications menu:** topbar bell → popover with mock notifications + activity feed.
- **Analytics dashboard:** `src/app/(pages)/analytics/` — Recharts revenue / funnel /
  KPI layout. `MAIN_NAV` entry.
- **Calendar:** `src/app/(pages)/calendar/` — month grid with mock events, built on
  `date-fns` (no new dependency). `MAIN_NAV` entry.

## Tier 3 — Premium (i18n/RTL excluded)

- **Chat/inbox:** `src/app/(pages)/chat/` — conversation list + message thread +
  composer, mock data. Components in `src/components/Chat/`. `MAIN_NAV` entry.
- **Components showcase:** `src/app/(pages)/ui-kit/` — one page demoing every primitive
  (buttons, inputs, badges, tables, modals, toasts, charts). `MAIN_NAV` entry.
- **Marketing:** `src/app/(marketing)/` route group →
  - `landing/page.tsx` — full-width marketing landing.
  - `pricing/page.tsx` — pricing tiers; "Subscribe" buttons are inert/demo.

## Nav integration

Add **Analytics, Calendar, Chat, UI Kit** to `MAIN_NAV`. Auth, account, and marketing
pages are reached via links (topbar menu, sign-in flow, footer), not the sidebar.

## Scope guard (YAGNI / out of scope)

- No real authentication, sessions, or password checking.
- No database or persistence for new screens.
- No billing/payment integration — pricing CTAs are demo-only.
- No i18n / RTL.

These belong to "Path B" (turning the template into a working SaaS product) and would
change the product category; explicitly excluded here.

## Verification

After each tier: `npm run lint` and `npm run build` must pass clean (both currently
exit 0). Manual walk of new screens in light + dark, at desktop and mobile widths.
