# Features — documentation map & required capabilities

This file is the **hub** for *what* we are building. Deep tables and UI specs live in the linked docs; **status** is summarized here so every other document can point to one place.

---

## 1. Where product detail lives

| Document | Contents |
|----------|----------|
| **[`mvp-feature-list.md`](./mvp-feature-list.md)** | Full **ID’d** feature tables (**D**, **A**, **O**, **T**, **AD**, **P**), UI specs §1.1–§5.1, MVP slices §7, out of scope §8, vision §9. |
| **[`mvp_features.md`](./mvp_features.md)** | **Layered roadmap:** must-have MVP vs **strong v1.0** vs **plus**; 12‑month month-by-month plan; cross-mapped to IDs in [`mvp-feature-list.md`](./mvp-feature-list.md). |
| **[`idea_enhaced.md`](./idea_enhaced.md)** | **Netflix-style** vision: one-time **family profile**, **Family Fit Score**, proactive **digests**, privacy/freemium/digest placement. Maps to **P*** in MVP list. |
| **[`readme.md`](../readme.md)** | Stakeholder **PRD-style** narrative: organizers (**A**), family profile (**B**), discovery (**C**), subscriptions (**D**), cards, admin, data model bullets. |
| **[`additional_notes.md`](./additional_notes.md)** | UX notes: hybrid **search / map / list / subscriptions**, homepage patterns, notification best practices. |
| **[`additional_notes2..md`](./additional_notes2..md)** | **Family Event Radar** positioning, **Eventbrite symbiosis**, **O7**/**O8**, illustrative **P9**/**P10** revenue, phased GTM example. |
| **[`event-listing-ux.md`](./event-listing-ux.md)** | Browse UI patterns (Eventeny + Eventbrite-informed), **mobile-first**, `/events` structure. |
| **[`business-idea.md`](./business-idea.md)** | **Why**: positioning, monetization (listing vs organizer subscription), channels (email/WhatsApp), no native ticketing in v1. |
| **[`business-idea-and-plan.md`](./business-idea-and-plan.md)** | **Idea + plan:** vision, problem/solution, phased roadmap (aligned with ideas doc + engineering slices), metrics, top risks, decision checklist. |
| **[`team-idea-brief.md`](./team-idea-brief.md)** | **Team shareout:** plain-language idea, problem/solution, users, journeys, differentiation, phased direction, FAQ—**no** feature IDs. |
| **[`SECURITY.md`](./SECURITY.md)** | **Secrets** placement, leak response (revoke, purge git history), prevention. |
| **[`testing-strategy.md`](./testing-strategy.md)** | **TDD** layers and what to test per domain (verification, discovery contract, interest, subscriptions, admin). |
| **[`tech-stack.md`](./tech-stack.md)** | Next.js, FastAPI, Supabase, Auth, integration boundaries. |
| **[`DEVELOPMENT.md`](./DEVELOPMENT.md)** | Local run, env, tests, milestones. |
| **[`../supabase/README.md`](../supabase/README.md)** | Migrations, seed, CLI commands. |
| **[`eventbrite_api_testing.md`](./eventbrite_api_testing.md)** | **O7** smoke: curl test cases, token checks, field mapping, Eventbrite endpoint errata. |
| **[`eventbrite_family_subcategories.md`](./eventbrite_family_subcategories.md)** | Curated Eventbrite **subcategory** IDs for family/community discovery; CSV in `backend/data/`. |
| **[`eventbrite_api.md`](./eventbrite_api.md)** | Integration sketch (verify against testing doc before implementation). |
| **[`ideas_envent.md`](./ideas_envent.md)** | **Strategist brief:** hyper-local **family + community** wedge; **product idea** — *get notified about the right kids’ and cultural events in your neighborhood, based on your family profile*; fragmented discovery today; personas and pains; PRD skeleton; **five pillars**; **rule-based** matching + **immediate vs digest** routing; **6–10 week** MVP framing. **Maps to IDs** in [`mvp-feature-list.md`](./mvp-feature-list.md) (alignment subsection). |

### 1.1 Tracked capability IDs (from [`mvp-feature-list.md`](./mvp-feature-list.md))

| Prefix | Range | Count |
|--------|--------|------:|
| **D** | D1–D10 | 10 |
| **A** | A1–A8 | 8 |
| **P** | P1–P10 | 10 |
| **O** | O1–O8 | 8 |
| **T** | T1–T5 | 5 |
| **AD** | AD1–AD7 | 7 |
| **Total** | | **48** |

---

## 2. Supabase schema (migrations) vs features

| Object | Migration | Supports |
|--------|-----------|----------|
| **`public.events`** | `20260321120000_events_core.sql` | Discovery (**D***), organizer listings (**O1**–**O6** when app exists), detail (**D9**); **O7** may add external source fields; **O8** may add aggregate **views/clicks/leads** (or separate analytics table). `interest_count` on card (denormalized; per-user **interest** rows TBD). |
| **`public.profiles`** | `20260322120000_profiles_saved_events.sql` | **P1** persisted **`family_profile` JSONB**, **onboarding_completed_at**, **consent_family_matching** (**P8**); row per `auth.users`. |
| **`public.saved_events`** | same | **A2** favorites (user ↔ event). |
| **Auth trigger** | same | New user → **`profiles`** row (**A1** prerequisite). |

**Still needed in migrations (when built):** organizers + verification, interest table or RPC, subscriptions, zones (readme **three radius zones**), admin audit, optional `pending_moderation` flows, **import provenance** / external IDs for **O7**, **analytics** events for **O8**—see [`readme.md`](../readme.md) data model §4 and [`mvp-feature-list.md`](./mvp-feature-list.md).

---

## 3. Implementation status (high level)

| Area | IDs | Status |
|------|-----|--------|
| **Public discovery** | **D1**–**D4** partial, **D7**–**D9** implemented | List/detail, search `q`, city/state, date range, categories, Eventbrite-style + mobile-first UI; **D8** map, **D1** ZIP/autocomplete/geo, **D5**–**D6** homepage sections, **D10** culture chips **not** done. **D9** **affiliate-wrapped** ticket URLs (**O7** pairing) **not** built. |
| **Attendee** | **A1**–**A8** | **Schema:** profiles + saved_events. **App:** no Google OAuth UI, dashboard, subscriptions, email send yet. **A8** calendar export not started. |
| **Personalization** | **P1**–**P10** | **Schema:** `family_profile` + consent only. **App:** no quiz, **Fit Score**, digests, push/SMS. |
| **Organizer** | **O1**–**O8** | Not implemented (no organizer tables in DB yet). **O7** = Eventbrite/URL **import** + family metadata; **O8** = aggregate **views/clicks** on listings. |
| **Trust** | **T1**–**T5** | Not implemented. |
| **Admin** | **AD1**–**AD7** | Not implemented. |
| **Backend API** | — | `GET /health`, `GET /v1/events`, `GET /v1/events/by-slug/{slug}`; no auth mutations, saves, or admin. |

---

## 4. Required capabilities checklist (by theme)

Use this as a **gap list** against the MVP list and readme.

**Discovery:** ZIP/geo search · map view · distance/free-paid/age chips · “Popular near you” / “New this week” · community/culture tags (**D10**) · interest toggle (logged-in) with aggregate update.

**Attendee:** Supabase **Google OAuth** · **dashboard** (zones + matching-only view per readme **C**) · **hide** event from my dashboard · **Save** + **Interested** + **Share** on detail (**D9**) · **email** notifications for new matches · optional WhatsApp · **profile edit** / pause / delete (**P8**) · **A8** Add to calendar / ICS (v1 per [`mvp_features.md`](./mvp_features.md)).

**Personalization (vision):** **≤90s onboarding quiz** · **profile card** · **Fit Score** v1 · implicit signals (**P5**) · daily digest / geofence / urgent / weekly recap (**P6**, phased channels) · **P9**/**P10** when product ready.

**Onboarding defaults ([`ideas_envent.md`](./ideas_envent.md)):** From **family profile**, **suggest categories and community tags to follow** (editable toggles before signup completes)—ties **P2**/**P3** and **A3**/**A4**/**D10**.

**Organizer:** verified account gate · CRUD events · **Family Smart Post** metadata (**O1**) · end-of-life purge · **O7** paste-URL or API **import** (Eventbrite-first) + family tags · **O8** aggregate **views**, **clicks**, and **leads** (inquiry/contact intent—define funnel in PRD) on listings · listing fields (tags, recurring, media, etc. per readme **A**).

**Partners & monetization (roadmap, [`additional_notes2..md`](./additional_notes2..md)):** **affiliate** or partner-tracked **D9** CTAs · **P10** digest placement · **P9** family premium (illustrative: radius + SMS)—legal/pricing TBD.

**Trust & admin:** verified badge · reports · duplicate hints · **AD** queues and audit.

---

## 5. Environment variables tied to features

| Feature area | Vars |
|--------------|------|
| Discovery API from Next | `NEXT_PUBLIC_API_URL` |
| Supabase client (browser) | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Server reads/writes (FastAPI) | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| Future transactional email | ESP API keys (server-only, not in repo yet) |
| **O7** Eventbrite (or provider) | Server-only **`EVENTBRITE_PRIVATE_TOKEN`** (or OAuth per organizer); see [`eventbrite_api_testing.md`](./eventbrite_api_testing.md) |
| **D9** affiliate redirects | Partner **affiliate IDs** or redirect base URL (server-only) |

See [`../env.example`](../env.example), [`../frontend/.env.example`](../frontend/.env.example), [`../backend/.env.example`](../backend/.env.example).

---

*Keep this file in sync when migrations ship or MVP list gains new IDs. Prefer editing [`mvp-feature-list.md`](./mvp-feature-list.md) for long-form acceptance criteria.*
