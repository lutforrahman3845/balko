# Balko — CRM & Project Management Dashboard

A production-styled admin dashboard for CRM and project-management SaaS apps,
built with **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and
shadcn/ui**.

Balko is the entire frontend of a business app — 14 page groups, 6 auth screens,
16 entities, every table, form, chart and modal already wired — with a mock API
layer shaped so closely to a relational database that swapping in a real one is
mechanical.

---

## The problem

Building the CRM layer of a SaaS product is weeks of work that has nothing to do
with your actual product. Every team rebuilds the same things:

- A data table that sorts, filters, searches, paginates, and has skeleton and
  empty states that don't look broken.
- Create/edit forms with validation, in both modal and full-page flavors.
- A layout shell with a collapsible sidebar, theme switching, and a mobile nav.
- Ten entities that all relate to each other, each needing list, detail, create,
  edit, and delete.
- The plumbing between them: cache invalidation, loading states, filter state
  that resets pagination correctly.

None of it differentiates your product, and all of it has to be right before you
can demo anything.

Balko is that layer, finished. You bring the backend and the idea.

## What Balko is — and isn't

**It is** a complete, navigable frontend. Every screen renders real data, every
form submits, every table filters, every mutation updates the cache.

**It is not** a full-stack application. There is no database and no
authentication. The `/api/*` routes are Next.js Route Handlers that read and
write in-memory arrays in [`src/mock/`](src/mock/) — mutations are lost when the
server restarts. Auth screens are present and styled, but their submit handlers
are demo stubs.

That boundary is deliberate, and the next two sections are about why it costs
less to cross than it sounds like.

## Why it's different

Most dashboard templates are a pile of pretty screens with `const data = [...]`
inlined in each component. Replacing that with real data means rewriting every
page, because there was never a data layer to swap out.

Balko separates the two from the start.

**1. The mock data is a relational schema, not decoration.**
Entities live in normalized arrays and reference each other by string id —
foreign keys, nullable foreign keys, join arrays, `createdAt`/`updatedAt`
timestamps. `src/mock/` is a database that happens to live in memory. See
[Built for a real backend](#built-for-a-real-backend).

**2. Every domain is the same five layers, in the same order.**
Type → mock data → API route → RTK Query API → UI. Once you've read one domain
you can read all of them, and adding the tenth costs the same as adding the
second.

**3. The network boundary is real.**
Components never import mock data. They call RTK Query hooks that make HTTP
requests to route handlers. That boundary already exists, so moving the backend
elsewhere is a change of URL, not a change of architecture.

**4. It is typed end to end.**
Each domain declares its entity, its joined `Expanded*` shape, its form values,
and its paginated response type. The response contract is written down, so when
you replace a handler the compiler tells you if you got the shape wrong.

## How it works

Every domain is one vertical slice, five files deep:

```
src/@types/project.ts                1. Type   Project, ExpandedProject, GetProjects
src/mock/projectData.ts              2. Data   mockProjects: Project[]
src/app/api/projects/route.ts        3. API    list + create      (GET, POST)
src/app/api/projects/[id]/route.ts            get/update/delete  (GET, PATCH, DELETE)
src/redux/apis/ProjectApis.ts        4. Query  useGetProjectsQuery, useCreateProjectMutation…
src/app/(pages)/projects/page.tsx    5. UI     holds filter state, calls the hook
src/components/Project/                        Header, Table, Form, FormModal, Details
```

A request flows like this:

```
Page  (useState: search, filters, pageIndex)
  │  passed as query params
  ▼
RTK Query hook  ──── HTTP ────▶  Route handler
  │                                 │  filters + paginates the mock array
  │                                 │  joins related entities by id
  ▼                                 ▼
Cached result   ◀─── JSON ────  { data, meta: { pageIndex, pageSize, total, totalPages } }
```

Mutations invalidate cache tags declared in
[`src/redux/apiSlice.ts`](src/redux/apiSlice.ts), so affected lists refetch on
their own — no manual refresh logic in components.

Two conventions worth knowing:

- **Filter state is local.** Each page owns its search/filter/pagination in
  `useState` and passes it to the hook. Changing a filter resets `pageIndex` to
  1. There is no global UI store to reason about.
- **Redux holds only the API slice.** No hand-written reducers, no server state
  duplicated into the store.

## Built for a real backend

This is what makes Balko cheap to adopt: **the mock data is already a SQL
schema.** Entities are normalized, reference each other by id, and never embed
related objects.

Here is `Project`, from [`src/@types/project.ts`](src/@types/project.ts):

```ts
export interface Project {
  id: string;
  name: string;
  description: string;
  type: "client" | "internal";
  status: "planning" | "active" | "on_hold" | "completed" | "cancelled";
  priority: "high" | "medium" | "low";
  startDate: string;
  endDate: string | null;
  managerId: string;              // → employees.id
  teamIds: string[];              // → many-to-many
  departmentId: string | null;    // → departments.id, nullable
  companyId: string | null;       // → companies.id, nullable
  contactPersonId: string | null; // → contacts.id, nullable
  budget: number;
  currency: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}
```

That becomes DDL with no design decisions left to make:

```sql
CREATE TABLE projects (
  id                TEXT PRIMARY KEY,
  name              TEXT NOT NULL,
  description       TEXT NOT NULL,
  type              TEXT NOT NULL CHECK (type IN ('client','internal')),
  status            TEXT NOT NULL CHECK (status IN ('planning','active','on_hold','completed','cancelled')),
  priority          TEXT NOT NULL CHECK (priority IN ('high','medium','low')),
  start_date        TIMESTAMPTZ NOT NULL,
  end_date          TIMESTAMPTZ,
  manager_id        TEXT NOT NULL REFERENCES employees(id),
  department_id     TEXT REFERENCES departments(id),
  company_id        TEXT REFERENCES companies(id),
  contact_person_id TEXT REFERENCES contacts(id),
  budget            NUMERIC NOT NULL,
  currency          TEXT NOT NULL,
  progress          INTEGER NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL,
  updated_at        TIMESTAMPTZ NOT NULL
);

-- teamIds is the one field that isn't a column: it's a join table.
CREATE TABLE project_teams (
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  team_id    TEXT NOT NULL REFERENCES teams(id)    ON DELETE CASCADE,
  PRIMARY KEY (project_id, team_id)
);
```

The rule generalizes across all 16 entities:

| In the mock layer | In your database |
|---|---|
| `interface Project` | a table |
| `mockProjects: Project[]` | its rows — usable as seed data |
| `managerId: string` | `NOT NULL` foreign key |
| `companyId: string \| null` | nullable foreign key |
| `teamIds: string[]` | a join table |
| union type (`"active" \| …`) | `CHECK` constraint or enum |
| `ExpandedProject` | the result of the `JOIN` |
| `{ data, meta }` | `SELECT … LIMIT/OFFSET` plus `COUNT(*)` |

`ExpandedProject` is worth dwelling on. The list handler builds it by hand today
— `.find()`ing across the other mock arrays to inline the manager, teams,
department, company, and contact. That hand-rolled join is exactly the query
you'll write in SQL, and the shape it has to return is already declared in the
type.

### Migration path

1. Create tables from the `src/@types/*` interfaces; seed them from
   `src/mock/*`.
2. Rewrite each route handler's body to query the database. **Keep the
   `{ data, meta }` response shape** — the RTK Query hooks and every component
   above them stay untouched.
3. Wire auth. [`src/redux/apiSlice.ts`](src/redux/apiSlice.ts) already stubs the
   `Authorization` header hook for Auth.js, Clerk, or your own tokens.

You can do this one domain at a time. Migrated and mock domains coexist, because
each is only coupled to the others through HTTP.

To host the API elsewhere entirely, set `NEXT_PUBLIC_BASE_URL` and delete
`src/app/api/` — the frontend won't notice.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS v4, shadcn/ui (new-york) |
| State & data | Redux Toolkit + RTK Query |
| Tables | TanStack Table |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Drag & drop | @hello-pangea/dnd |
| Theming | next-themes |
| Toasts | Sonner |
| Icons | lucide-react, react-icons |

Tailwind v4 is config-less — theme tokens live as CSS variables in
[`src/app/globals.css`](src/app/globals.css).

## Getting started

Requires **Node.js 18.18+** (Node 20+ recommended).

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next core-web-vitals + typescript)
```

There is no test runner configured.

## Project structure

```
src/
  @types/           Per-domain types: entity, Expanded*, form values, Get* response
  mock/             In-memory data — the current "database" (16 entities)
  app/
    api/            Route Handlers backed by the mock arrays
    (pages)/        dashboards, tasks, contacts, companies, employees, teams,
                    projects, folders, calendar, chat, analytics, account,
                    configuration, ui-kit
    (auth)/         sign-in, sign-up, forgot-password, reset-password,
                    verify-email, lock-screen
    globals.css     Tailwind v4 theme tokens (light + dark)
  components/
    ui/             shadcn/ui primitives
    shared/         Cross-domain widgets: DataTable, FilterDropDown, FilterSearch,
                    TablePagination, ConfirmDialog, CustomSelect, FileUpload…
    <Domain>/       Header, Table, Form, FormModal, Details per domain
  redux/
    apiSlice.ts     Base query, tag types, auth header hook
    apis/           injectEndpoints per domain
  config/           Layout context (useLayout) + sidebar navigation config
  lib/              Status/badge helpers and utilities
```

To add a page to the sidebar, add an entry to `MAIN_NAV` in
[`src/config/navitemsconfig.ts`](src/config/navitemsconfig.ts) — the sidebar is
data-driven.

## What's included

**Included** — every screen, component, form, table, chart, and the full mock API
layer. Nine business domains with complete CRUD (Dashboard, Tasks, Contacts,
Companies, Employees, Teams, Projects, Folders/Documents, Configuration), plus
calendar, chat, analytics, account, and a UI-kit reference page. Tasks ship as
both a drag-and-drop Kanban board and a table.

**Not included — bring your own:**

- **Authentication.** Screens are built; session logic is not.
- **Database.** Route handlers read and write in-memory arrays.
- **Payments / billing.**

## License

Commercial license — see [LICENSE](LICENSE). Balko is licensed, not sold.

Third-party open-source components and media are credited in
[NOTICES.md](NOTICES.md).
