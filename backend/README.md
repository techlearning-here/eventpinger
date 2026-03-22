# Eventpinger API (FastAPI)

**Product features this service will back:** public discovery (**GET /v1/events**, detail by slug), then auth-protected saves, organizer CRUD, admin, and notification jobs — see [`docs/FEATURES.md`](../docs/FEATURES.md) and [`docs/mvp-feature-list.md`](../docs/mvp-feature-list.md). **Today:** read-only catalog when `SUPABASE_*` is set.

## Setup

Requires **Python 3.11+** (macOS system Python 3.9 is too old—use e.g. `brew install python@3.12`).

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install --upgrade pip
pip install -e ".[dev]"
```

## Environment (optional for live data)

Copy [`.env.example`](./.env.example) to `backend/.env` (gitignored) or export variables.

Without `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`, `GET /v1/events` returns an empty list (safe local default).

```bash
export SUPABASE_URL="https://<project>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<service_role_secret>"
```

## Run

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Test (TDD)

```bash
pytest
```

## Eventbrite API (O7 exploration)

The Platform API marks **event search list** as **deprecated** ([reference](https://www.eventbrite.com/platform/api#/reference/event-search/list-deprecated)). List events via **organization**, **venue**, **owned_events**, or **single event id** — see [`docs/eventbrite_api_testing.md`](../docs/eventbrite_api_testing.md) §9.

```bash
export EVENTBRITE_PRIVATE_TOKEN='...'
python scripts/eventbrite_list_events.py me
python scripts/eventbrite_list_events.py orgs
python scripts/eventbrite_list_events.py owned --status live
```

If `owned` prints a note about **404** then **organizations**, that is normal for many private tokens — use **`orgs`** and **`org <organization_id>`** with an id from that JSON.

Export Eventbrite taxonomy to CSV (categories + subcategories):

```bash
python scripts/eventbrite_list_events.py export-categories-csv -o eventbrite_categories.csv
python scripts/eventbrite_list_events.py export-categories-csv --family -o data/eventbrite_family_subcategories.csv
```

Family-oriented subcategory list (curated rules): [`docs/eventbrite_family_subcategories.md`](../docs/eventbrite_family_subcategories.md).
