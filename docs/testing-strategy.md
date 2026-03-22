# Testing strategy — test-driven development (TDD)

**Status:** Engineering norm for this repo once implementation starts.

**Goal:** Catch regressions early, document behavior through tests, and keep **verification, discovery, and notifications** logic safe to change.

---

## 1. Default workflow: TDD

For **new behavior** and **non-trivial fixes**:

1. **Red** — Write a **failing** automated test that expresses the desired behavior (or bug).
2. **Green** — Implement the **minimum** code to pass.
3. **Refactor** — Clean up with tests **still green**.

**Exceptions (judgment call):** Spikes, one-off scripts, or exploratory UI—time-boxed; **promote** to tested code before merge or delete the spike.

**Commits:** Prefer small steps where each commit keeps the suite passing (or marks a test `@skip` / WIP only on short-lived branches—avoid long-lived red main).

---

## 2. Test layers (pyramid)

| Layer | What | Examples for Eventpinger |
|-------|------|---------------------------|
| **Unit** | Pure logic, no I/O or mocked I/O | Matching rules (radius, categories, tags), subscription eligibility, **end-of-life** rules, slug/validation helpers, admin policy (who may publish) |
| **Integration** | App + DB, HTTP API, queue workers | Organizer **verification** state transitions, event **draft → pending → published**, notification fan-out to a **test** email backend, admin approve/reject APIs |
| **End-to-end (E2E)** | Browser + real stack (or close) | Critical paths: **anonymous browse → filter**, **sign-up → save event → admin verify → publish → appears in discovery**, **subscribe → new event → digest** (keep **few** and **stable**) |

**Bias:** Many **fast unit** tests, **focused integration** tests for boundaries, **minimal E2E** for user journeys that must not break.

---

## 3. MVP priorities (what to test first)

Cross-reference feature IDs in [`mvp-feature-list.md`](./mvp-feature-list.md) and status in [`FEATURES.md`](./FEATURES.md).

- **Trust & supply (**O***, **T***, **AD***):** Organizer verification transitions; **only verified** organizers can set **published** (unless PRD says otherwise); **pending_moderation** when event approval is on. **O7:** import mapping + idempotency (no duplicate publishes); **O8:** aggregate counts only, no PII leakage in APIs.
- **Discovery contract (**D***):** Public queries never return draft / pending / deleted / past **end_of_life** events; list/map/geo filters match API contract once **D1**/**D8** ship.
- **Profiles & saves (**P1**, **A2**, RLS):** `profiles.family_profile` shape and consent flags; **`saved_events`** insert/select only for owning user; trigger creates profile on signup.
- **Interest (**T3**-related):** Logged-in toggle updates aggregate; anonymous cannot mutate (API + UI if applicable).
- **Personalization (**P4**–**P10**):** When **Fit Score** and digests exist — unit tests for scoring inputs; integration for digest eligibility and quiet hours.
- **Subscriptions:** “New matching event” logic and **digest** scheduling (unit + integration with fake clock where possible).
- **Admin:** Audit-worthy actions (approve organizer, approve event) recorded or testable.

---

## 4. Tooling (aligned with [`tech-stack.md`](./tech-stack.md))

| Layer | Suggested tooling |
|-------|-------------------|
| **FastAPI** | **pytest**; **httpx** `AsyncClient` or Starlette `TestClient` for API integration tests |
| **Next.js** | **Vitest** or **Jest** + **React Testing Library** for components and hooks |
| **E2E** | **Playwright** (one primary suite for critical journeys) |
| **Database** | **Supabase local** / test project or **transaction-scoped** DB in CI—**no** production keys in tests |
| **CI** | Run **full suite** on every PR; **main** stays green (`backend/` pytest, `frontend/` Vitest—see [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)) |

---

## 5. Data and environments

- Use **fixtures** or factories for organizers, events, zones—avoid **shared** mutable DB state across tests.
- **No** production credentials in tests; **separate** test DB or containers in CI.

---

## 6. Definition of Done (engineering)

- New feature or bugfix includes **automated tests** at the appropriate layer unless explicitly agreed otherwise.
- **README** or service README documents how to run `test` / `lint` locally.

---

*Update §4 if tooling choices change (e.g. Cypress instead of Playwright).*
