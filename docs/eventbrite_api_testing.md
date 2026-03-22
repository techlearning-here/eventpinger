# Eventbrite API — manual test plan (access & **O7** smoke)

This document turns [`eventbrite_api.md`](./eventbrite_api.md) into **repeatable checks** you can run before wiring **O7** (import) in FastAPI. It also records **what actually works today** vs outdated examples on the web.

**Official reference:** [Eventbrite Platform API](https://www.eventbrite.com/platform/api)  
**Product context:** [`FEATURES.md`](./FEATURES.md) (**O7**), [`mvp-feature-list.md`](./mvp-feature-list.md).

---

## 1. Errata vs `eventbrite_api.md`

| Topic | Issue | What to do instead |
|--------|--------|---------------------|
| **`GET /v3/events/search/`** | Official reference labels this **List (deprecated)** — [Event Search → list (deprecated)](https://www.eventbrite.com/platform/api#/reference/event-search/list-deprecated). Live calls often **404**; do **not** use for new integrations. | List events via **`/organizations/{id}/events/`**, **`/venues/{id}/events/`**, **`/users/me/organizations/`** then org events, **`/users/{id}/owned_events/`** (sometimes works), or **`/events/{id}/`** — see **§9** (Python). |
| **`client_credentials` token URL** | Your integration guide shows `POST …/v3/auth/oauth2/token/` with `grant_type=client_credentials`. Eventbrite’s live flows are usually **Private token** (server) or **OAuth authorization code** (per organizer). | Use **Private token** for first smoke tests (**§3**). Confirm any **server-to-server** grant in the **current** developer UI; do not assume URLs from old snippets. |
| **“Public events: no auth”** | Unauthenticated calls return **`401 NO_AUTH`** (verified: `GET /v3/events/{id}/` without token). | **All** tested paths require `Authorization: Bearer <token>`. |

---

## 2. Goals of this test pass

1. Prove you have a **valid bearer token** (`/v3/users/me/`).
2. Prove you can read a **single public event** by numeric **event id** (core **O7** import).
3. (Optional) List events for an **organization** or **venue** you are allowed to access.
4. Record **field mapping** snippets for your internal event model (title, start, url, venue, description).

**Out of scope here:** Affiliate program enrollment, rate-limit billing, production secret storage (use `.env` only, never commit).

---

## 3. Prerequisites

1. **Eventbrite account** with developer access.
2. In **Account settings → Developer links → API keys** (wording may vary): create an app and obtain a **Private token** (sometimes labeled **personal OAuth token** / **API key**) — use this as the Bearer token for server-side experiments.
3. **Shell tools:** `curl`, optional [`jq`](https://jqlang.github.io/jq/) for pretty JSON.
4. Export locally (example):

```bash
export EVENTBRITE_TOKEN='paste_private_token_here'
```

---

## 4. Test cases

Use `BASE=https://www.eventbriteapi.com/v3` and `HDR="Authorization: Bearer $EVENTBRITE_TOKEN"`.

### TC-0 — Token not set (sanity)

```bash
curl -sS "$BASE/users/me/"
```

**Expect:** `401`, `"error":"NO_AUTH"`.

### TC-1 — Authenticated identity

```bash
curl -sS -H "$HDR" "$BASE/users/me/"
```

**Expect:** `200`, JSON with your user `id`, `name`, `emails` (shape per current API).

**Pass criteria:** `id` present and stable for later calls (e.g. `owned_events`).

### TC-2 — Read event by ID (import core)

Pick a **real, live** Eventbrite event you can open in the browser. From a URL like:

- `https://www.eventbrite.com/e/…-123456789890`  
the trailing **numeric** segment is often the **event id** (confirm in the page URL / embed).

```bash
EVENT_ID='123456789890'   # replace with real id
curl -sS -H "$HDR" "$BASE/events/$EVENT_ID/?expand=venue"
```

**Expect:** `200`, object including at least:

- `name.text` — title  
- `start.local` / `start.utc` — datetime  
- `url` — canonical Eventbrite URL (ticket CTA / **D9** link-out)  
- `description` — HTML or text (check `description.html` vs `.text` in payload)  
- `venue` (when expanded) — address fields for city/state

**Pass criteria:** You can derive: **title**, **start_at**, **registration_url** (`url` or ticket URL field if present), **venue text** for your `events` table.

**Failure modes:**

| HTTP | Meaning |
|------|--------|
| `401` | Token invalid or revoked |
| `404` | Wrong id, deleted event, or token cannot access that event |

### TC-3 — Expand parameters (import quality)

Retry TC-2 with different `expand` values as allowed by [API reference](https://www.eventbrite.com/platform/api) (e.g. `venue`, `organizer`).

```bash
curl -sS -H "$HDR" "$BASE/events/$EVENT_ID/?expand=venue,organizer"
```

**Pass criteria:** Enough data to fill **O1** “Family Smart Post” without manual re-typing.

### TC-4 — Organization events (supply-side list)

If you have an **organization id** (from dashboard URL or API):

```bash
ORG_ID='your_organization_id'
curl -sS -H "$HDR" "$BASE/organizations/$ORG_ID/events/?status=live"
```

**Expect:** `200`, paginated `events` array (empty is OK if none live).

**Pass criteria:** Confirms you can **sync** multiple listings for **your** org (not a substitute for global search).

### TC-5 — Venue events (optional)

```bash
VENUE_ID='your_venue_id'
curl -sS -H "$HDR" "$BASE/venues/$VENUE_ID/events/"
```

**Pass:** Same as TC-4 for venues you manage.

### TC-6 — Organizations + events (recommended; `owned_events` often 404)

`GET /users/me/owned_events/` and sometimes even `GET /users/me/` + `owned_events` return **`404` “The user_id you requested does not exist”** with a **private token** ([known behavior](https://stackoverflow.com/questions/53866034/eventbrite-api-the-user-id-you-requested-does-not-exist-with-oauth-token)). Prefer **organizations**:

```bash
curl -sS -H "$HDR" "$BASE/users/me/organizations/"
ORG_ID='paste_from_response'
curl -sS -H "$HDR" "$BASE/organizations/$ORG_ID/events/?status=live"
```

**Pass:** First call returns at least one **organization** `id`; second returns **`events`** (may be empty if none live).

**Optional:** `GET /users/{numeric_id}/owned_events/?status=live` where `numeric_id` is from **TC-1** — works for some accounts; the repo script tries this then falls back to organizations.

---

## 5. Field mapping checklist (**O7** → Eventpinger)

After TC-2 succeeds, fill this table once per sample event (copy from JSON):

| Eventpinger (concept) | Eventbrite JSON path (typical) | Notes |
|----------------------|---------------------------------|--------|
| Title | `name.text` | |
| Start | `start.utc` or `start.local` | Normalize to UTC in DB |
| End | `end.utc` / `end.local` | If missing, policy TBD |
| Description (summary on event) | `description.text` / `description.html` on `GET /events/{id}/` | Often **only the short summary** for events created with newer Eventbrite flows. |
| Description (**full HTML**) | **`GET /v3/events/{id}/description/`** | Official “retrieve full HTML description” — [API ref](https://www.eventbrite.com/platform/api#/reference/event/retrieve/retrieve-full-html-description). Repo: `python scripts/eventbrite_list_events.py description EVENT_ID`. Sanitize before `dangerouslySetInnerHTML` / DB HTML. |
| Ticket / register URL | `url` | **D9** affiliate wrapping later |
| External id | `id` | Store for re-import / dedupe (**O7**) |
| City / state | `venue.address.city`, `venue.address.region` | Requires `expand=venue` |
| Cover image | `logo.url` or media fields | Check payload |

---

## 6. Security & ops

- **Never** send `EVENTBRITE_TOKEN` from the browser; keep calls in **FastAPI** (or server action) only.
- Add to **`backend/.env`** (gitignored), e.g. `EVENTBRITE_PRIVATE_TOKEN=`, and document in [`FEATURES.md`](./FEATURES.md) §5 / [`env.example`](../env.example) when implementation starts.
- Log **request id** and status code on failure; do **not** log full tokens or PII.

---

## 7. Rate limits

[`eventbrite_api.md`](./eventbrite_api.md) cites **~1,000 calls/day** on a free tier and paid overages — **confirm in your Eventbrite developer / billing UI**; numbers change.

**Smoke test impact:** This plan uses **&lt; 10** calls.

---

## 8. Automation (later)

When you add code:

- **pytest** + `httpx` or `responses` mocks: assert mapping from a **fixture JSON** (snapshot from TC-2) into your internal DTO.
- Optional contract test: one **marked** integration test gated on `EVENTBRITE_TOKEN` in CI secrets (skip locally if unset).

---

## 9. Python: list events (supported endpoints only)

Eventbrite documents the old **event search list** as **deprecated** in the Platform API reference:  
[event-search → list (deprecated)](https://www.eventbrite.com/platform/api#/reference/event-search/list-deprecated).

Use one of these **supported** patterns (all require `Authorization: Bearer <private_token>` unless Eventbrite docs say otherwise for a specific beta endpoint).

### 9.1 Endpoints (summary)

| Goal | Method & path | Typical use |
|------|----------------|------------|
| Who am I? | `GET /v3/users/me/` | Verify token; read `id` for debugging. |
| My orgs | `GET /v3/users/me/organizations/` | **Use this** when `owned_events` 404s; each org has an `id`. |
| My events | `GET /v3/users/{id}/owned_events/?status=live` | May **404** for many tokens; then use **organizations → events** (below). |
| Org calendar | `GET /v3/organizations/{organization_id}/events/` | List events for an org you manage (`status` optional). |
| Venue calendar | `GET /v3/venues/{venue_id}/events/` | List events at a venue you have access to. |
| Single import (**O7**) | `GET /v3/events/{event_id}/?expand=venue` | One event by id (from pasted URL). |

Pagination: responses often include `pagination` with `has_more_items` and a `continuation` marker — follow the [official pagination](https://www.eventbrite.com/platform/api) rules for your client.

### 9.2 `httpx` (matches backend dev tests)

```python
import os
import httpx

BASE = "https://www.eventbriteapi.com/v3"
TOKEN = os.environ["EVENTBRITE_PRIVATE_TOKEN"]
headers = {"Authorization": f"Bearer {TOKEN}"}

def list_org_events(organization_id: str, status: str | None = "live") -> dict:
    params = {}
    if status:
        params["status"] = status
    r = httpx.get(
        f"{BASE}/organizations/{organization_id}/events/",
        headers=headers,
        params=params,
        timeout=60.0,
    )
    r.raise_for_status()
    return r.json()

def list_my_organizations() -> dict:
    r = httpx.get(f"{BASE}/users/me/organizations/", headers=headers, timeout=60.0)
    r.raise_for_status()
    return r.json()


def list_categories() -> dict:
    r = httpx.get(f"{BASE}/categories/", headers=headers, timeout=60.0)
    r.raise_for_status()
    return r.json()


def get_category(category_id: str) -> dict:
    r = httpx.get(f"{BASE}/categories/{category_id}/", headers=headers, timeout=60.0)
    r.raise_for_status()
    return r.json()
```

Install in the backend venv: `pip install httpx` (already in `[project.optional-dependencies] dev`).

### 9.3 Repo script (stdlib only, no extra packages)

From `backend/` — either **export** the token or put **`EVENTBRITE_PRIVATE_TOKEN`** in **`backend/.env`** (the script loads that file automatically; it does not override variables already set in your shell):

```bash
export EVENTBRITE_PRIVATE_TOKEN='...'   # optional if .env is set
python scripts/eventbrite_list_events.py me
python scripts/eventbrite_list_events.py orgs
python scripts/eventbrite_list_events.py owned --status live
python scripts/eventbrite_list_events.py org YOUR_ORG_ID
python scripts/eventbrite_list_events.py event YOUR_EVENT_ID --expand venue
python scripts/eventbrite_list_events.py categories
python scripts/eventbrite_list_events.py categories 110
python scripts/eventbrite_list_events.py category 110
python scripts/eventbrite_list_events.py export-categories-csv -o eventbrite_categories.csv
python scripts/eventbrite_list_events.py export-categories-csv --top-only -o eventbrite_top_categories.csv
python scripts/eventbrite_list_events.py export-categories-csv --family -o data/eventbrite_family_subcategories.csv
```

Source: [`backend/scripts/eventbrite_list_events.py`](../backend/scripts/eventbrite_list_events.py).

**CSV export:** `export-categories-csv` paginates `GET /categories/`, then (unless `--top-only`) calls `GET /categories/{id}/` per top-level row to attach **subcategories**. Columns include **`main_category_id`** and **`main_category_name`** (Eventbrite top-level category; for `kind=category` rows, same as `id` / `name`; for `kind=subcategory`, the parent). **`parent_category_id`** / **`parent_category_name`** mirror the same for subcategories and are empty on top-level rows.

**`--family`:** writes **only** subcategory rows that pass the curated rules in [`eventbrite_family_taxonomy.py`](../backend/scripts/eventbrite_family_taxonomy.py). Product doc: [`eventbrite_family_subcategories.md`](./eventbrite_family_subcategories.md).

---

## 10. Sign-off template

| Test | Date | Result | Notes |
|------|------|--------|--------|
| TC-1 `/users/me/` | | pass / fail | |
| TC-2 event by id | | pass / fail | Event id: |
| TC-4 org events | | pass / skip | Org id: |
| §9 Python script | | pass / skip | |
| Mapping table | | done | Sample event id: |

---

*Last aligned with live unauthenticated probes: `GET /v3/events/{id}/` → `401 NO_AUTH`; `GET /v3/events/search/…` → `404 NOT_FOUND`. Re-run if Eventbrite changes routing.*
