# Local development

Monorepo layout:

| Path | Stack |
|------|--------|
| `frontend/` | Next.js 16 (App Router), Tailwind, Vitest |
| `backend/` | FastAPI, pytest |
| `supabase/` | Supabase CLI (`config.toml`, SQL `migrations/`) |

**Auth / DB:** Hosted or local Supabase per [`../supabase/README.md`](../supabase/README.md) and [`tech-stack.md`](./tech-stack.md). Wire Google OAuth and RLS as you add tables.

## Environment variables

- **Master reference:** [`../env.example`](../env.example) (all apps).
- **Frontend:** copy [`../frontend/.env.example`](../frontend/.env.example) → `frontend/.env.local` (or use [`../frontend/env.example`](../frontend/env.example)).
- **Backend:** copy [`../backend/.env.example`](../backend/.env.example) → `backend/.env` and load before `uvicorn`, or export vars in your shell.

Hosted Supabase: Dashboard → **Settings → API** (Project URL, anon key, service role). Local: `npx supabase status` after `supabase start`.

## Prerequisites

- **Node.js** (e.g. via nvm) for `frontend/`
- **Python 3.11+** (e.g. Homebrew `python@3.12`) for `backend/`
- **Docker** (optional) for `npx supabase start`

## Supabase (optional local stack)

From repo root:

```bash
npx supabase start
npx supabase status   # copy URLs/keys into frontend/.env.local
```

See [`../supabase/README.md`](../supabase/README.md).

## Backend

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -e ".[dev]"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- OpenAPI docs: http://127.0.0.1:8000/docs  
- Health: http://127.0.0.1:8000/health  

```bash
pytest
```

## Frontend

```bash
cd frontend
cp .env.example .env.local   # optional; API URL defaults to localhost:8000 without file
npm install
npm run dev
```

- App: http://localhost:3000  

```bash
npm run test
npm run lint
```

## TDD

See [`testing-strategy.md`](./testing-strategy.md). Run **both** `backend/pytest` and `frontend/npm run test` before pushing when you touch either side.

## Next implementation milestones

**Single source for required features + current status:** [`FEATURES.md`](./FEATURES.md). **Full acceptance criteria (IDs):** [`mvp-feature-list.md`](./mvp-feature-list.md). **Layered product roadmap (MVP vs v1 vs plus):** [`mvp_features.md`](./mvp_features.md) — mapped to IDs in **mvp-feature-list §0.1**.

1. **In DB today:** `public.events`, `public.profiles` (`family_profile` JSONB, onboarding/consent), `public.saved_events`, RLS, auth → profile trigger — see [`../supabase/README.md`](../supabase/README.md).
2. **App wiring:** Supabase Google OAuth in Next.js; UI for profile and saved events (**A1**, **A2**, **P1** schema exists; UI and Fit Score **P4** not built).
3. **Discovery gaps:** map (**D8**), ZIP/autocomplete/geo (**D1**), interest toggle + aggregates, homepage sections (**D5**–**D6**, **D10**).
4. **Supply & trust:** organizer tables + verification + CRUD (**O1**–**O6**), admin queues (**AD***), reports (**T***).
5. **Distribution integrations (after core O):** **O7** Eventbrite/URL import, **O8** listing analytics, **D9** affiliate-aware ticket redirects — see [`additional_notes2..md`](./additional_notes2..md).
6. **Notifications:** email/WhatsApp digests per [`readme.md`](../readme.md) and [`business-idea.md`](./business-idea.md).
