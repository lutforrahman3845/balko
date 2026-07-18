# Balko — CRM & Project Management Dashboard (Next.js 16 UI Template)

A polished, production-styled **admin dashboard UI template** for CRM and
project-management SaaS apps, built with **Next.js 16 (App Router), React 19,
TypeScript, Tailwind CSS v4, and shadcn/ui**.

> **This is a frontend template.** Data is served by mock API routes that read
> from in-memory arrays in [`src/mock/`](src/mock/). There is **no database and
> no authentication** — mutations reset when the dev server restarts. Balko is
> designed as a clean, fully-wired UI layer that you drop your own backend
> behind. See [What's included](#whats-included) for the exact boundaries.

## Features

- **9 complete domains**, each a full CRUD slice (list, filter, paginate,
  create, edit, delete): Dashboard, Tasks, Contacts, Companies, Employees,
  Teams, Projects, Folders/Documents, and Configuration.
- **Tasks** in both Kanban (drag-and-drop) and table views.
- **Data tables** built on TanStack Table with sorting, search, filter
  dropdowns, pagination, and skeleton/empty states.
- **Forms** with React Hook Form + Zod validation, in both modal and dedicated
  route flavors.
- **RTK Query** data layer with cache tags, so wiring a real backend is a matter
  of changing the base URL.
- **Light/dark themes** via `next-themes`, charts via Recharts, toasts via
  Sonner, collapsible data-driven sidebar.
- Fully typed, consistent **vertical-slice architecture** — one predictable
  pattern per domain.

## Tech stack

| Layer      | Choice |
|------------|--------|
| Framework  | Next.js 16 (App Router) |
| UI         | React 19, TypeScript, Tailwind CSS v4, shadcn/ui (new-york) |
| State/data | Redux Toolkit + RTK Query |
| Tables     | TanStack Table |
| Forms      | React Hook Form + Zod |
| Charts     | Recharts |
| DnD        | @hello-pangea/dnd |

## Getting started

Requires **Node.js 18.18+** (Node 20+ recommended).

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next core-web-vitals + typescript)
```

## Project structure

```
src/
  @types/        # Per-domain TypeScript types
  mock/          # In-memory mock data (the current "database")
  app/
    api/         # Next.js Route Handlers backed by the mock arrays
    (pages)/     # User-facing pages (one folder per domain)
  components/     # Domain components + shared widgets + shadcn/ui primitives
  redux/         # RTK Query API definitions and store
  config/         # Layout context + sidebar navigation config
  lib/            # Badge/status helpers and utilities
```

Each domain follows the same five-layer slice: **type → mock data → API route →
RTK Query API → UI**. To add a domain, copy an existing slice and follow the
same pattern.

## What's included

**Included:** every screen, component, form, table, chart, and the full mock API
layer — a complete, navigable frontend.

**Not included (bring your own):**

- **Authentication** — no login/session logic. The RTK Query base already stubs
  an `Authorization` header hook in [`src/redux/apiSlice.ts`](src/redux/apiSlice.ts)
  for you to wire up (e.g. Auth.js or Clerk).
- **Database** — the `src/app/api/*` route handlers read/write in-memory arrays.
  Replace each handler's body with your real data source; the request/response
  shapes and RTK Query hooks stay the same.
- **Payments/billing.**

## Wiring your own backend

1. Point `NEXT_PUBLIC_BASE_URL` at your API (defaults to `/api`).
2. Replace the mock reads/writes in `src/app/api/<domain>/route.ts` (and
   `[id]/route.ts`) with real database calls — keep the returned
   `{ data, meta }` shape so the existing RTK Query hooks keep working.
3. Uncomment and implement the auth header logic in `src/redux/apiSlice.ts`.

## License

Commercial template — see [LICENSE](LICENSE). Third-party open-source components
and media are credited in [NOTICES.md](NOTICES.md).
