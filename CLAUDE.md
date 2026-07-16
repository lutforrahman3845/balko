# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js, http://localhost:3000)
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint (eslint-config-next: core-web-vitals + typescript)
```

There is no test runner configured in this project.

## Overview

Balko is a CRM / project-management dashboard built on **Next.js 16 (App Router) + React 19 + TypeScript**. It is currently a **frontend-only prototype**: there is no database. Every `/api/*` route is a Next.js Route Handler that reads from and mutates in-memory mock arrays in [src/mock/](src/mock/). Mutations (POST/PATCH/DELETE) push to those arrays and are lost on server restart.

Domains covered: Dashboard, Tasks (Kanban + table), Contacts, Companies, Employees, Teams, Projects, Folders/Documents, and Configuration (Department, Role, Company Type).

## Architecture

The codebase follows one consistent vertical slice per domain. To add or modify a feature, touch these five layers in lockstep:

1. **Type** — `src/@types/<domain>.ts`. Defines the base entity, an `Expanded*`/`Single*` variant (base + joined relations), form values, and a `Get*` paginated-response type.
2. **Mock data** — `src/mock/<domain>Data.ts`. The source of truth. Entities reference each other by string id only.
3. **API route** — `src/app/api/<domain>/route.ts` (list + create) and `src/app/api/<domain>/[id]/route.ts` (get/update/delete). The GET handler does the **relation expansion by hand** — it `.find()`s across the other mock arrays to inline related entities (see [src/app/api/projects/route.ts](src/app/api/projects/route.ts), which joins manager, teams, team members, department, company, and contact). List routes read `searchQuery`, filter params, and `pageIndex`/`pageSize`, then return `{ data, meta: { pageIndex, pageSize, total, totalPages } }`.
4. **RTK Query API** — `src/redux/apis/<Domain>Apis.ts`. Uses `apiSlice.injectEndpoints`. Exports auto-generated hooks (`useGet*Query`, `useCreate*Mutation`, …). Cache coherence is via `providesTags`/`invalidatesTags` against the tag list declared in [src/redux/apiSlice.ts](src/redux/apiSlice.ts) — **when adding a new domain, register its tag in `apiSlice.tagTypes` first**.
5. **UI** — `src/app/(pages)/<domain>/page.tsx` is a thin `"use client"` page that holds filter/pagination state and calls the query hook; the actual rendering lives in `src/components/<Domain>/` (Header, Table, Form, FormModal, Details).

### State & data flow

- **Redux Toolkit + RTK Query is the only global store** ([src/redux/store.ts](src/redux/store.ts)) — it holds nothing but the `apiSlice` reducer. There are no other slices; all server state flows through RTK Query hooks. `NEXT_PUBLIC_BASE_URL` overrides the API base (defaults to `/api`).
- Pages are Client Components. Filter/search/pagination is **local `useState` in each page**, passed as query params to the hook; changing a filter resets `pageIndex` to 1.
- The Redux store is provided by [src/providers/StoreProvider.tsx](src/providers/StoreProvider.tsx), wired in [src/app/layout.tsx](src/app/layout.tsx) alongside `next-themes`, the tooltip provider, and the `sonner` `Toaster`.

### Layout & navigation

- [src/app/layout.tsx](src/app/layout.tsx) → [src/template/layout.tsx](src/template/layout.tsx) (`"use client"`, shows `ScreenLoader` for 1s) → `DashboardLayout` wrapped in `LayoutProvider`.
- [src/config/context.tsx](src/config/context.tsx) exposes `useLayout()` for sidebar collapse/theme state. Consume layout state via this hook, never a new context.
- The sidebar is data-driven by `MAIN_NAV` in [src/config/navitemsconfig.ts](src/config/navitemsconfig.ts). **Add a new top-level page by adding an entry here.** Route groups: user-facing pages live under `src/app/(pages)/`.

### UI conventions

- **shadcn/ui (new-york style)** primitives in [src/components/ui/](src/components/ui/); config in [components.json](components.json). Tailwind CSS v4 (config-less, via `@tailwindcss/postcss`); theme tokens/CSS variables live in [src/app/globals.css](src/app/globals.css).
- Icons mix `lucide-react` and `react-icons`.
- Reusable cross-domain widgets (`DataTable`, `FilterDropDown`, `FilterSearch`, `TablePagination`, `ConfirmDialog`, `CustomeSelect`, `FileUpload`, `CountrySelect`) live in [src/components/shared/](src/components/shared/). Tables are built on **@tanstack/react-table**; [src/components/shared/DataTable.tsx](src/components/shared/DataTable.tsx) takes a prepared `table` instance plus `loading` and handles skeleton/empty states.
- Forms use **react-hook-form + Zod** (`@hookform/resolvers`). Configuration entities (Department, Role, Company Type) are edited in modal dialogs (`*FormModal`); larger entities (Company, Contact, Project) have dedicated `new`/`[id]/edit` routes.
- Drag-and-drop (Kanban `TaskBoard`) uses `@hello-pangea/dnd`. Charts use `recharts`. Status/badge rendering helpers live in [src/lib/](src/lib/) (`projectStatusBadges`, `ContactStatusBadge`, etc.).

### Path aliases

`@/*` → `./src/*` (see [tsconfig.json](tsconfig.json)). Always import via `@/…`.

## Conventions & gotchas

- **The codebase uses irregular filenames/spellings** that are load-bearing — match the existing name exactly rather than "correcting" it: e.g. `src/@types/tassk.ts`, `CustomeSelect.tsx`, `LsitCard.tsx`, `ConatctAPis.ts`, `contactdHistory.ts`, `RoleDeatils.tsx`, and API folders like `contactHistroy`.
- Route Handler files are inconsistently `.ts` or `.tsx` — follow whatever the sibling routes in that folder use.
- Relation expansion is **manual and duplicated** between the list route and the `[id]` route. When you change an entity's joined shape, update both handlers and the `Expanded*` type together.
- POST handlers generate ids as `(mockArray.length + 1).toString()` and set `createdAt`/`updatedAt` via `new Date().toISOString()`.
- `next.config.ts` allows remote images from any http/https host.
