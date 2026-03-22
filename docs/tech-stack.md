# Tech stack (decided)

| Layer | Choice | Role |
|--------|--------|------|
| **Frontend** | **Next.js** (App Router assumed unless PRD says otherwise) | Public discovery, organizer dashboard, attendee dashboard, UI for filters, maps, subscriptions. |
| **Backend API** | **FastAPI** | Business rules, admin actions, jobs (e.g. notification fan-out), secrets that must not live in the browser. |
| **Database** | **Supabase** (managed **PostgreSQL**) | Primary data store: events, users profile extensions, organizer verification, subscriptions, audit fields. Use **Row Level Security (RLS)** where data is accessed from clients; prefer **service role** or server-only access from FastAPI for sensitive admin paths. |
| **Authentication** | **Supabase Auth** with **Google** OAuth *(Gmail accounts)* | End-user and organizer **sign-in**; JWT/session handled by Supabase; FastAPI **verifies** JWT for protected routes. |

---

## Data model (migrations in repo today)

| Object | Supports (feature IDs) |
|--------|-------------------------|
| **`public.events`** | Discovery **D***, organizer listings **O1**–**O6** (when app exists), detail **D9**; **O7**/**O8** fields or related tables as designed. |
| **`public.profiles`** | **P1** `family_profile` JSONB, **P8** consent/onboarding fields; one row per `auth.users`. |
| **`public.saved_events`** | **A2** favorites. |

Planned tables (organizers, interest, subscriptions, admin audit, zones) and **implementation status:** [`FEATURES.md`](./FEATURES.md), narrative in [`readme.md`](../readme.md) §4.

---

## Integration shape (target)

- **Browser → `frontend/` (Next.js)** for UI and **server components / route handlers** where useful.
- **Browser → `backend/` (FastAPI)** (or **Next.js BFF → FastAPI**) for mutations and privileged reads that should not expose **service role** keys.
- **FastAPI → Supabase** (schema from **`supabase/migrations`**) via official **Python client** or **PostgREST** with **service role** for server-side queries—**never** ship service role key to Next.js client bundles.
- **Optional:** Next.js uses **Supabase client** with **anon key + RLS** for a subset of reads (e.g. public event catalog) if that speeds MVP; align with security review.

**Staff admin:** Use a **separate** auth path from public Google login (e.g. Supabase **email/password** users with `role=admin` in **JWT claims** / `app_metadata`, or **FastAPI-only** admin sessions)—define in PRD so admin accounts are not confused with organizer OAuth identities.

---

## Related product docs

- **Required features + doc map:** [`FEATURES.md`](./FEATURES.md).
- Email/WhatsApp notifications remain as in [`readme.md`](../readme.md) (outside Supabase).
- TDD tooling: [`testing-strategy.md`](./testing-strategy.md).

---

*Adjust this document if you adopt Supabase Edge Functions or move more logic into Next.js API routes.*

**Repo layout:** `frontend/` (Next.js), `backend/` (FastAPI), `supabase/` (CLI + migrations). Local workflow: [`DEVELOPMENT.md`](./DEVELOPMENT.md). **Env templates:** [`../env.example`](../env.example), [`../frontend/.env.example`](../frontend/.env.example), [`../backend/.env.example`](../backend/.env.example).
