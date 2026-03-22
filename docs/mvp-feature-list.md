# MVP feature list (from `additional_notes.md`)

**Hub (status, doc map, schema vs features):** [`FEATURES.md`](./FEATURES.md) — **48** ID’d capabilities (breakdown in **§1.1** there).

**Source:** UX and scope guidance in [`additional_notes.md`](./additional_notes.md) and **[`additional_notes2..md`](./additional_notes2..md)** (Family Event Radar, Eventbrite **symbiosis**, **O7**/**O8**, illustrative dual revenue), cross-checked with [`business-idea.md`](./business-idea.md) and [`readme.md`](../readme.md) (link-out ticketing, organizer verification). **Layered MVP / v1 / plus** roadmap and 12‑month plan: [`mvp_features.md`](./mvp_features.md) — see **§0.1** below. **Product-strategist brief** (hyper-local wedge, five pillars, rule-based routing, phase map): [`ideas_envent.md`](./ideas_envent.md) — see **alignment** below.

**Product vision (extended):** [`idea_enhaced.md`](./idea_enhaced.md) — **Netflix-style** loop: **one-time family profile** (~90s) → persistent **household demographics + categories + geofence (+ budget cap)** → **ranked “family fit” matches** and **habit-forming digests** (vs one-off session filters). Core promise: *“Set your family’s vibe once. Get perfect events forever.”* Items in **§2.3** and **§9** map that doc into phased features; not all are MVP-day-one.

**Engineering:** **Next.js** (`frontend/`) + **FastAPI** (`backend/`) + **Supabase** (`supabase/` migrations + hosted DB/Auth, **Google OAuth**); see [`tech-stack.md`](./tech-stack.md). **TDD** per [`testing-strategy.md`](./testing-strategy.md).

**MVP principle:** Fast browsing, clear filtering, personalized **email** alerts—not “listings only.” Hybrid of **search, map, list, and subscriptions.** The enhanced vision **adds** structured **family profile + scoring + proactive notifications** as the retention layer on top.

**Product idea:** ***Get notified about the right kids’ and cultural events in your neighborhood, based on your family profile*** (proactive alerts for **new** listings that match **saved** profile + zones).

**Positioning (notes2):** **Family Event Radar** — *Every event finds its family. Every family finds its events.* Complement **Eventbrite** (and peers): **matching + notice-board distribution** here; **ticketing** stays link-out; optional **import** (**O7**) and **affiliate-tracked** ticket CTAs when enrolled.

**Implemented (TDD):** **D7** list/grid view + **D9** detail + **D3/D4** category scroller + **hero + search** (`q` title filter) + **city/state** (`ilike`) + **date range** (`date_from`, `date_to` as `YYYY-MM-DD`, **UTC calendar-day** bounds on `start_at`) on `/events` — UX plan vs [Eventeny](https://www.eventeny.com/) in [`event-listing-ux.md`](./event-listing-ux.md); **backend** `GET /v1/events` (`category`, `q`, `city`, `state`, `date_from`, `date_to`) and `GET /v1/events/by-slug/{slug}` with **Supabase** when `SUPABASE_*` env is set; migrations [`20260321120000_events_core.sql`](../supabase/migrations/20260321120000_events_core.sql), [`20260322120000_profiles_saved_events.sql`](../supabase/migrations/20260322120000_profiles_saved_events.sql) (**`profiles`**, **`saved_events`**, signup trigger — **P1** / **A2** schema only); [`supabase/seed.sql`](../supabase/seed.sql) (~20 dummy events). **Not yet:** map (D8), **ZIP** + **autocomplete** (D1 remainder), geo/radius filters, **app wiring** for Auth + profile/saves UI, **Fit Score (P4)**, organizer flows (O*), **O7** Eventbrite/URL import, **O8** analytics, **D9** affiliate wrapping.

**UI detail:** **§1.1** (discovery — implemented + planned), **§2.1–§5.1** (attendee, organizer, trust, admin — planned screens).

### Alignment with [`ideas_envent.md`](./ideas_envent.md)

**Problem:** Small hyper-local listings (dance, camps, after-school, temple/church, cultural events) are scattered across flyers, WhatsApp, school email, Facebook groups, and large platforms that weakly surface **recurring, highly local** offerings.

**Core value (1–2 sentences):** Families **get notified** about the **right kids’ and cultural** events **in their neighborhood**, **from their family profile**; local organizers publish once and reach **matched** households. **Transactions** stay on the organizer’s link (same complementarity as Eventbrite in [`additional_notes2..md`](./additional_notes2..md)).

**Personas → this backlog**

| Persona (ideas doc) | Where it lives |
|---------------------|----------------|
| **Parent / family** | **A***, **P***, **D***, readme **B** / **C** / **D** (zones, dashboard, subscriptions) |
| **Local organizer** (studio, temple, nonprofit, camp host) | **O***, **T***, **O4** verification |

**Five MVP pillars (ideas doc) → capability IDs**

| Pillar | IDs / notes |
|--------|-------------|
| Event creation & management | **O1**–**O7**, **O5** lifecycle, optional **AD4** |
| Family profile & demographics | **P1**–**P3**, **P8**; up to **3 radius zones**, ages, culture tags, interests, schedule prefs (readme **B**) |
| Event discovery & filters | **D1**–**D10**; anonymous **main** filters vs signed-in **dashboard** (matching-only) |
| Subscriptions & notifications | **A3**–**A7**, **P6**; **email** + **WhatsApp** (readme MVP); **push** when elevated (**§8**) |
| Organizer analytics (views, clicks, leads) | **O8** — extend **leads** in PRD (e.g. contact intent, forwarded inquiries, RSVP funnel if distinct from **interest**) |

**Rule-based matching & alerts:** Location (**zip + radius** / zones), **kids’ ages or grades**, **interests**, **cultural/community tags**, **preferred time windows** — same spirit as readme **B** and **P4**. **At signup:** propose **default categories and tags to follow** (**P2**/**P3**, **A4**). **Feed ranking:** weighted score (**P4**). **Notifications:** high score → **immediate**; lower → **digest-first** (**P6**, configurable thresholds).

**Ideas-doc phased roadmap → engineering slices (below, **§7**)**

| Ideas phase | Maps to |
|-------------|---------|
| **1** — Barebones post/browse, family profile, **manual** or simple notifications | **Slice A**, **B**, early **P1**/**P3**, transactional email without full **P4**/**P6** automation |
| **2** — Automated matching/notifications, richer filters, organizer dashboard + analytics | **P4**, **P6**, **D10**, **Slice C** + **O8** |
| **3** — Optional in-app ticketing/RSVP, paid featured listings, deeper geography | **§8** (native checkout optional); **P10**; US-wide discovery already assumed in readme |

### 0.1 Layered scope & calendar — [`mvp_features.md`](./mvp_features.md)

[`mvp_features.md`](./mvp_features.md) groups work in **three layers** (must-have **MVP**, **strong v1.0**, **plus**). The **ID tables below remain canonical** for engineering; this subsection **maps** that doc and flags **intentional differences** from our stack choices.

**Deliberate deltas (keep README / tech-stack as source of truth)**

| Topic | [`mvp_features.md`](./mvp_features.md) (Months 1–3 sketch) | Eventpinger decision |
|--------|-----------------------------------------------------------|----------------------|
| **Auth** | Email/password first; “social later” | **Supabase Google OAuth** first ([`tech-stack.md`](./tech-stack.md)); optional **email/password** later if PRD adds it. |
| **Organizer signup** | “Simple sign up” | **Manual verification before public publish** (**O4**) — stronger trust for family-facing inventory (see [`readme.md`](../readme.md) **A**). |
| **Family geo** | Single home zip + radius in MVP sketch | **Up to three radius zones** + per-zone prefs in full PRD ([`readme.md`](../readme.md) **B** / **D**); MVP may ship **one** zone first. |
| **Notifications** | **Nightly batch** email in early roadmap | Compatible with **A6** (**daily** / **weekly** digest); tune job cadence in PRD (nightly vs digest window). |

**Must-have MVP (doc) → capability IDs**

| `mvp_features.md` theme | IDs |
|-------------------------|-----|
| Sign up & **family profile** (zip, radius, ages/grades, interests, culture tags) | **A1**, **P1**, **P2** (partial) |
| **Browse / search** (zip+radius, date, category, age, free/paid, culture + keyword) | **D1**–**D4**, **D10**, `q` search |
| **Event detail** (map, organizer, **Save**, **Share**, **Interested**) | **D9**, **A2**, interest; **Share** = part of **D9** UX |
| **Subscriptions** (categories, communities, radius; **email**; **weekly** digest) | **A3**–**A6**, **A4** |
| **Organizer** profile + **create/edit** listing (**draft** / **publish** / **unpublish**) | **O6**, **O1**, optional **unpublish** (readme **A**); **O4** verification |
| **Stats** (views, interested count, outbound link clicks) | **O8** |
| **Admin** (approve/flag events, categories & tags, high-level stats) | **AD3**–**AD6**, **AD4**/**AD5** as policy |
| **Infra** (zip + radius filtering, **scheduled email** for notifications/digest) | **D1** + worker/cron (not yet ID’d separately) |

**Strong v1.0 (doc) → capability IDs**

| `mvp_features.md` theme | IDs |
|-------------------------|-----|
| **Recommendation ranking** + “Recommended for your family” feed | **P4**, **P6** (routing) |
| **Smarter onboarding** — suggested categories/tags with toggles | **P2**, **P3** |
| **Favorites** + **personal calendar** view; **ICS** / Google / Apple export | **A2**, **A8** |
| **Social sharing** (WhatsApp, SMS, email, **copy link**) | **D9** (detail + share sheet); channels phased per compliance |
| **Organizer lead inbox** (interested users’ **name/email** per event, **consent-gated**) | **O8** extension (organizer-only; **not** public attendee list—see [`readme.md`](../readme.md) **C**) |
| **Organizer public profile page** (upcoming events) | **O6** surface |

**Plus / later (doc) → placement**

| `mvp_features.md` theme | Where tracked |
|-------------------------|----------------|
| Mobile / **PWA** + **push** | **§8**; **P6** when channels ship |
| In-app **RSVP** / lightweight ticketing | **§8** |
| **Paid featured** feeds + digest placement | **P10**, **AD6** |
| **Reviews & ratings** | **§8** (new bullet) |
| **Multi-city** selector + “live cities” | **AD6** launch geography + **§8** |
| **Localization** | **§8** |

**12‑month roadmap (doc) ↔ slices**

| Doc timeframe | Emphasis | Rough slice / IDs |
|---------------|----------|-------------------|
| **Months 1–3** — validate concept | Post events, **email** notifications from **simple** prefs, seed events, early organizers | **Slice A**–**C** core, **B**, **E** minimal; **A5**/**A6** |
| **Months 4–6** — v1.0 “for my family” | **Scoring**, second zip / richer prefs, **saved + interested** list, organizer metrics | **P4**, **P1**/**P2** v2, **O8** dashboard, **D10** |
| **Months 7–9** — stickiness + monetization prep | **ICS** / calendar view, **frequency** controls, **lead inbox**, **featured** UI stub | **A8**, **P6**, **O8** inbox, **P10** UI |
| **Months 10–12** — scale | **PWA**/push, **paid featured**, **Stripe**, multi-city, analytics stack | **P6**, **P10**, **§8** billing |

---

## 1. Public discovery & browsing

### 1.1 UI specification (implemented + reference)

Full narrative and Eventeny mapping: [`event-listing-ux.md`](./event-listing-ux.md). Below: **what the code does today** (paths under `frontend/`).

| Area | UI detail |
|------|-----------|
| **Routes** | `/` — [`app/page.tsx`](../frontend/app/page.tsx): Eventbrite-style **Discover** hero, search card, **popular categories** + **popular cities**, API status. `/events` — [`app/events/page.tsx`](../frontend/app/events/page.tsx). `/events/[slug]` — [`app/events/[slug]/page.tsx`](../frontend/app/events/[slug]/page.tsx). |
| **Global chrome** | [`SiteHeader`](../frontend/components/SiteHeader.tsx) in [`layout.tsx`](../frontend/app/layout.tsx): sticky light bar, **Eventpinger** logo, **Find events**, **Create events** / **Sign in** (placeholders). |
| **Browse hero** | Light band: **H1** “Browsing events in {United States \| city \| city, state}”; breadcrumb **Home / Events**; subcopy. |
| **Search** | White **rounded-2xl card** + shadow: **GET** `q` + **Search**; **hidden** fields preserve `category`, `city`, `state`, `date_from`, `date_to` when active. **When** pills: **All**, **For you** (disabled), **Today**, **This weekend** ([`time-presets`](../frontend/lib/time-presets.ts)). **More filters** `<details>`: city, state, dates + **Apply**. API unchanged (`ilike`, UTC day range). |
| **Category chips** | Horizontal **scroller**: **All** + [`FEATURED_CATEGORIES`](../frontend/lib/featured-categories.ts); **active** = dark pill (`zinc-900` / light invert in dark mode). Merges browse params via [`mergeBrowseParams`](../frontend/lib/browse-params.ts). |
| **Results header** | **“N events”** + context (category, `q`, city/state, date range). **Clear filters** → `/events` when any filter active. |
| **Event grid** | Responsive **`grid gap-6 sm:grid-cols-2 xl:grid-cols-3`**. [`EventCard`](../frontend/components/EventCard.tsx) **`presentation="grid"`**: **16:10** image; **category** muted uppercase; **title**; **date**; **location**; **organizer**; **interest** + **price**; **View details** **solid** button (`zinc-900`). |
| **Event card (row)** | **`presentation="row"`**: **96×96** thumb, **Details** text link (`zinc-900`). |
| **Empty state** | Dashed rounded panel; explains no matches; points to **`npx supabase db reset`** and **`supabase/seed.sql`**. |
| **Detail page** | Muted **Home** / **Events** links atop. **Category** small caps line. **H1** title. **Long date** (`weekday, month day, year`, time). **Location** (venue → city/state). **Ages** line if `age_range_label`. **Hosted by** organizer. **Price** + **interest** lines. **Description** `whitespace-pre-wrap`. **Primary CTA:** **Register / tickets** (external, `rel="noopener noreferrer"`). **Secondary:** **Back to browse**. `notFound()` if slug missing. |
| **Images** | Grid/row cards use **`<img>`** for arbitrary organizer URLs; **`next/image`** when `images.remotePatterns` is finalized. Seed uses **Unsplash** URLs (~20 rows). |
| **App shell** | [`app/layout.tsx`](../frontend/app/layout.tsx): Geist fonts, **`viewport`** (`device-width`, `viewport-fit: cover`), **`min-h-dvh`**, **`safe-area-inset`** padding on body/header, **`suppressHydrationWarning`** on **`<html>`** / **`<body>`** — see [`frontend/README.md`](../frontend/README.md). **Mobile-first** defaults site-wide. |
| **API status (home)** | Fetches `GET /health`; **Connected** (emerald) vs **Not reachable** (amber) + `uvicorn` hint + **Base URL** code snippet. |

| ID | Feature | UI/UX notes (product) | UI status |
|----|---------|------------------------|-----------|
| D1 | **Location-based search** | Search by **city or ZIP**; **location autocomplete** in hero. | **Partial** — **city** + **state** text filters + API (`ilike`); no **ZIP**, **autocomplete**, or **geo** yet. |
| D2 | **Hero discovery** | Large search + combining **location + type + time** patterns. | **Partial** — search card + **All / Today / This weekend** + **More filters** dates; no **time-of-day** filter; **For you** disabled until **signed-in + profile** ([`idea_enhaced.md`](./idea_enhaced.md) “perfect matches” loop). |
| D3 | **Quick filter chips** | **Category**, **date**, **distance**, **free/paid**, **age group**—avoid one giant list. | **Partial** — **category** + **When** pills + **search** + **city/state/dates** in **More filters**; no **distance** / **free-paid** / **age** chips yet. |
| D4 | **Category browse** | **Featured categories** as distinct affordances (Kids Classes, Camps, …). | **Implemented** — horizontal chips from shared constant (not separate “card” tiles; can evolve to icon cards later). |
| D5 | **“Popular near you”** | Homepage section for social proof / traction. | **Planned** — not on `/` yet (only API status + browse link). |
| D6 | **“New this week”** | Time-bounded feed for freshness. | **Planned** — no `created_at` sort section in UI. |
| D7 | **List / grid view** | Card: **title, category, date/time, place, organizer, thumbnail**, primary action (**Details** / **Save**). | **Implemented** — **grid** on `/events`, **row** variant available; **interest** + **price** on card; **Save** pending A*. |
| D8 | **Map view** | Toggle or tab with list when **location** drives choice. | **Planned** — no map library or toggle. |
| D9 | **Event detail page** | **What / where / when / who**; **CTA**; **registration link-out**; **Share** (copy link, native share, and/or WhatsApp / SMS / email per [`mvp_features.md`](./mvp_features.md) phased rollout). When listing came via **O7** or ticket host is in an **affiliate program**, use **tracked outbound URL** (server-side or redirect) per policy. | **Implemented** — layout + **Register / tickets** external; **Save / Subscribe** pending A*; **Share** actions pending; **affiliate wrapping** not built. |

**Stretch from same doc (community guide positioning):** filters for **language/culture** interest groups (e.g., regional/cultural tags). **Launch strategy in notes:** start with **one geography + a few categories**, then deepen cultural filters—so treat **D10** as **Phase 1b** if scope is tight.

| ID | Feature | Notes | UI status |
|----|---------|-------|-----------|
| D10 | **Community / culture filters** | Targeted chips (e.g., cultural or language-aligned events)—high value for stated niche. | **Planned** — no extra chip row beyond `FEATURED_CATEGORIES` yet; schema/tags TBD. |

---

## 2. Accounts, saves, and subscriptions (attendee)

### 2.1 UI specification (planned)

| Screen / element | Intended UI |
|------------------|-------------|
| **Sign in / sign up** | **Supabase Google OAuth** — routes such as `/login`, `/auth/callback` or modal; **Continue with Google**; post-login return to prior page or **dashboard**. ([`mvp_features.md`](./mvp_features.md) sketches **email/password** MVP—defer or add per PRD.) |
| **One-time family onboarding (~90s)** | **Gamified quiz** ([`idea_enhaced.md`](./idea_enhaced.md)): **Family** (ages / household size), **Location** (home base + **alert radius**), **Categories** (e.g. top interests), **Budget** (max per ticket/person), **Frequency** (digest vs urgent-style prefs). Cap at **~90 seconds**; progress saved if abandoned. |
| **Profile card** | Post-quiz **“Meet the [FamilyName] crew!”** (or neutral label) **summary card** + **instant first recommendations** list (even if rules-based before full **Fit Score**). |
| **Attendee dashboard** (**Family Event Radar** framing per [`additional_notes2..md`](./additional_notes2..md)) | Per [`readme`](../readme.md) **D**: up to **3 radius zones** **or** single **geo center + radius_mi** from profile ([`idea_enhaced.md`](./idea_enhaced.md) JSON); **notice-board** headline (e.g. geo + weekend window); list of **matching** events with **Family Fit** badge when **P4** ships; filters **My radius / My categories / Budget**; **hide** event (per user); **Buy tickets** uses registration URL (**affiliate-wrapped** when **O7** + program applies); links to **subscriptions**, **profile**, **edit family profile**. |
| **For you** (discovery) | Signed-in **home /events** surface: ranked **5–10** matches when **P4** exists; until then, **zone + category** matches or placeholder. |
| **Save / favorite** | **Heart or Save** on **event card** and **detail** (signed-in); inline **saved** state; aligns with **A2** and **implicit** signals (**P5**). |
| **Subscribe to alerts** | Homepage **section** + **settings**: categories, zones, **email** (MVP); **frequency** (instant / **daily digest** / **weekly recap**); **nightly batch** “matches in last 24h” is one valid **MVP** implementation of digest ([`mvp_features.md`](./mvp_features.md)). **push** / **SMS** per **§2.3 P6** when elevated. **WhatsApp** optional phase 2. |
| **Opt-out / snooze** | **Subscriptions** settings: per-subscription **pause**, **delete**; global **unsubscribe** in emails. **Profile** pause/delete aligns with **P8**. |

| ID | Feature | UI/UX notes |
|----|---------|-------------|
| A1 | **User accounts** | Required for **saved events** and **subscriptions** (per notes). |
| A2 | **Save / favorites** | Persist saved events; align primary card action **Details** vs **Save** in PRD. |
| A3 | **“Subscribe to alerts”** | Homepage section + flow to create **personalized** subscriptions. |
| A4 | **Subscription dimensions** | **Categories** + **radius** (and/or location anchor—match readme’s zone model when you implement). |
| A5 | **Notification channel (MVP)** | **Email** for new matching events (explicit MVP in notes). |
| A6 | **Frequency** | **Instant**, **daily digest**, or **weekly digest**—reduces notification fatigue. |
| A7 | **Opt-out / snooze** | User controls to stay trustworthy and avoid overload. |
| A8 | **Calendar export** | Per event: **Add to calendar** (Google / Apple / Outlook) via **ICS** or deep links; optional **“My calendar”** view of **saved** + **interested** events ([`mvp_features.md`](./mvp_features.md) Months 4–9). **Phase:** strong **v1.0**, not core MVP day-one. |

**Aligned with readme (add if not dropped from MVP):** second channel (e.g., **WhatsApp**) can be **Phase 2** unless you fold it into MVP—`additional_notes.md` lists push/SMS as “best practice” but **not** in the bullet MVP list. **[`additional_notes2..md`](./additional_notes2..md)** uses **SMS** in an illustrative **family premium** tier (**P9**/**P6**)—confirm channel mix in PRD.

### 2.3 Personalization & “family Netflix” loop ([`idea_enhaced.md`](./idea_enhaced.md))

Structured profile (example shape from vision doc): `family` (adults, kids ages, teens), `geo` (center + `radius_mi`), `categories`, `budget_max`; extend with **notification prefs** and **consent** flags.

| ID | Feature | Notes | Phase |
|----|---------|-------|--------|
| P1 | **Persisted family profile** | Store structured profile (JSONB or normalized tables); **edit anytime**; powers recommendations + alerts. | **1a** after A1 |
| P2 | **Onboarding quiz UX** | **≤90s** guided flow; sections map to **Family / Location / Categories / Budget / Frequency**; optional **skip** with defaults (document gaps). | **1a** |
| P3 | **Profile card + first run** | **“Meet the crew”** celebratory card + **first recommendation list** on completion (can be heuristic before P4). | **1a** |
| P4 | **Family Fit Score™ (0–100)** | Rank **5–10** events per session or digest; **explicit** match from profile; document formula v1 (category + distance + ages + budget). | **1b** |
| P5 | **Implicit signals** | **Clicks, saves,** future **attendance** → adjust ranking weights; **family core** (household/geo) stays stable per vision. | **2** |
| P6 | **Proactive notification mix** | **Daily digest** (email MVP; push later), **geofence / “opened near you”** (push), **urgent** (SMS), **weekly recap** (email)—queue + templates; **threshold** e.g. score > **80** for high-priority sends (tune per policy). | **2** (email slices earlier) |
| P7 | **Auto-refinement** | Safe nudges to profile weights from behavior; **no silent** change to kids’ ages—require confirm for structural edits. | **2** |
| P8 | **Privacy & trust** | **Opt-in** framing (“Share family info for better matches?”); **anonymized** to organizers (no household PII in listings); **pause / delete**; **GDPR/CCPA**-ready retention and export hooks. | **1a** legal copy; **ongoing** engineering |
| P9 | **Freemium (optional)** | Basic matches **free**; **premium** (illustrative in notes2: e.g. **unlimited / larger radius + SMS**)—exact caps and pricing in PRD; not required for first technical MVP. | **Later** |
| P10 | **Organizer placement in digests** | **Featured** slots in family-oriented digests (illustrative **$29/mo** tier in notes2—**not** committed); ties **O*** supply + **monetization**; coordinate with **AD6** config. | **Later** |

### 2.4 Differentiators (product positioning vs generic ticketing)

| Theme | Eventpinger direction ([`idea_enhaced.md`](./idea_enhaced.md)) |
|-------|------------------------------------------------------------------|
| **Setup** | **One-time** family profile vs repeating session filters only. |
| **Personalization** | **Household** demographics + interests vs individual purchase history alone. |
| **Geo** | **Persistent** radius + **subscription** alerts vs search-radius only. |
| **Matching** | **Family-optimized** scoring vs individual-only relevance. |
| **Notifications** | **Habit-forming** digests + proactive proximity vs transactional reminders only. |
| **Retention** | **“Just for us”** loop vs one-off discovery. |

### 2.5 Eventbrite symbiosis & go-to-market narrative ([`additional_notes2..md`](./additional_notes2..md))

| Theme | Direction |
|-------|-----------|
| **Positioning** | **Family Event Radar**; complement ticketing marketplaces—**distribution + matching** here, **checkout** on organizer’s stack. |
| **Supply** | **Quick post** + **O7** import; **O8** proves reach to organizers. |
| **Demand** | One-time profile → **digests** / radar feed → **tracked** ticket CTA (**D9**). |
| **Revenue (examples)** | **P10** featured digest placement + **P9** family premium + long-term **affiliate** where allowed—see notes2 phased table. |

---

## 3. Organizer experience

### 3.1 UI specification (planned)

| Screen / element | Intended UI |
|------------------|-------------|
| **Organizer onboarding** | **Sign up** → **verification checklist** (evidence per PRD) → **pending** banner on dashboard until **verified**. |
| **Create / edit event** | **Multi-step or long form** with **preview**; **“Family Smart Post”** prompts per [`additional_notes2..md`](./additional_notes2..md): **Who’s this for?** (age bands), **Event vibe?** (cultural, outdoor, music, …) → **auto-tags** + optional **match preview** before **P4** is heuristic; required **end of life** datetime; **registration URL** prominent; **cover image** upload or URL; **publish** vs **draft** if drafts ship. **Import** path: **O7**. |
| **Organizer dashboard** | **My events** table/cards; **verification** badge; **add event** CTA; **edit** / **delete** with confirm. |
| **Profile** | **Org name**, **logo**, **website**, contact (public surface per readme privacy). |

| ID | Feature | UI/UX notes |
|----|---------|-------------|
| O1 | **Guided posting flow** | Lightweight, step-by-step: title, **category**, **age group**, **location**, **date/time**, **language/community tags** (when in scope), **images**, **contact + registration link**; **family-facing metadata** (vibe, budget hints) for matching—see **Family Smart Post** in §3.1. **Draft**, **publish**, **edit**, **unpublish** (hide without delete) per [`mvp_features.md`](./mvp_features.md) and readme **A**. |
| O2 | **Pricing clarity on listing** | Clear labels: **free**, **paid** (range or “from”), **donation-based** if applicable. |
| O3 | **Audience targeting (product logic)** | Notify or prioritize: **nearby users**, users **subscribed to category**, users **following organizer**, users interested in **language/culture**—implement as **notification routing rules** behind the scenes. Extend with **P4**/**P6**: families whose **Fit Score** exceeds threshold for this event. |

**Aligned with readme (supply trust):**

| ID | Feature | Notes |
|----|---------|--------|
| O4 | **Organizer sign-up + manual verification** | Before **public** publish; trust gate for community/family use. |
| O5 | **Listing end-of-life** | Required **date/time** at publish; auto-remove from public catalog after. |
| O6 | **Organizer profile** | Name, logo, links—supports trust (see §4). |
| O7 | **Third-party listing import (Eventbrite-first)** | **Paste public event URL** (MVP) and/or **Eventbrite API** (later): **map** to our event schema; organizer **adds / confirms family metadata** before publish; **registration URL** preserved; enables **affiliate-tracked** outbound CTAs (**D9**) when partner program is live. Legal/API keys TBD. |
| O8 | **Organizer listing analytics** | Aggregate **listing views**, **ticket-link clicks**, and **leads** (e.g. **I’m interested** / inquiry intent—define events in PRD). **v1.0 extension ([`mvp_features.md`](./mvp_features.md)):** **lead inbox** — per-event list of interested users (**name/email** only with **explicit consent** and privacy policy; **not** shown on public surfaces—see [`readme.md`](../readme.md) **C**). Public cards stay **aggregate interest count** only. |

---

## 4. Trust, safety, and quality

### 4.1 UI specification (planned)

| Element | Intended UI |
|---------|-------------|
| **T1 Verified badge** | **Checkmark + “Verified organizer”** on **card** (optional per readme), **organizer profile**, and **detail** byline. |
| **T2 Reporting** | **Report** on **event detail** → modal (reason + optional text) → confirmation; no public report count. |
| **T3 Duplicates** | **Organizer** sees **warning** on fuzzy match (title + time + venue); **admin** queue optional. |
| **T4 / T5** | **Language / culture** as **chips** in post flow and **browse filters** when D10 ships; **photo** strongly encouraged in post flow. |

| ID | Feature | UI/UX notes |
|----|---------|-------------|
| T1 | **Verified organizer** badge | Shown on profile/listings where verified. |
| T2 | **Reporting** | User-facing report flow + moderation path (workflow depth TBD). |
| T3 | **Duplicate detection** | At least **organizer-facing** warning or admin queue (implementation level TBD). |
| T4 | **Rich listing trust** | Photos, **venue** clarity, optional **past events** / history when you have data. |
| T5 | **Language tags** | For multilingual communities (ties to O1/D10). |

---

## 5. Admin & operations (staff)

**Goal:** Password-protected **admin** area (separate from public and organizer apps) to run verification, optional publish gates, moderation, and configuration—**not** a shared “organizer login with extra menu” unless roles are strictly enforced in code.

### 5.1 UI specification (planned)

| Area | Intended UI |
|------|-------------|
| **Entry** | **Separate base path** (e.g. `/admin` or `admin.` host); **staff login** only; no shared nav with public site except **sign out**. |
| **AD3 Queue** | **Table**: submitted date, org name, status; row **open** → **drawer** with evidence, **approve** / **reject** (reason) / **suspend**; optional **assign reviewer**. |
| **AD4 Event moderation** | **Pending events** table, **preview**, **approve** / **reject**. |
| **AD5 Reports** | **Tickets** queue; links to **event** and **reporter** (opaque id); **unpublish**, **dismiss**, **suspend organizer**. |
| **AD6 Config** | **Forms**: category/tag editor, feature flags, **maintenance mode** text + toggle. |
| **AD7 Audit** | **Read-only table**: timestamp, actor, action, entity id; optional CSV export. |

| ID | Feature | Notes |
|----|---------|--------|
| AD1 | **Staff sign-in** | Dedicated admin authentication (or **role-gated** users with **no** public organizer overlap for privileged roles—PRD). **Session** security aligned with sensitivity of PII in verification materials. |
| AD2 | **Roles (recommended)** | e.g. **Reviewer** (queues only), **Admin** (config + queues), **Super-admin** (staff user management)—minimize blast radius. |
| AD3 | **Organizer verification queue** | List **pending** sign-ups; open submitted **evidence**; **approve / reject / suspend**; **internal notes**; record **reviewer** and **timestamp** (supports readme **A**). |
| AD4 | **Event publish approval** | When enabled by policy: organizer submits **publish** → event stays **pending_moderation** until staff **approves** or **rejects** (with reason). **Policy toggles (config):** e.g. **moderate every event**, **first event only**, **only unverified organizers**, or **off** (verified organizers go live per current flow). |
| AD5 | **Reports & moderation** | Queue for **user reports**; actions: **unpublish** event, **suspend** organizer, dismiss—ties to **T2**. |
| AD6 | **Site configuration** | Manage **category/tag** catalog (or feature flags), **homepage** featured buckets, **launch geography** limits (if MVP is single-metro; **multi-city “live”** toggles per [`mvp_features.md`](./mvp_features.md) **plus**), **email/notification defaults**, optional **maintenance mode**. **Overall platform stats** (user/event counts) can live here or a staff dashboard row. |
| AD7 | **Audit log** | Append-only (or tamper-evident) log: verification decisions, publish approvals, config changes—**retention** per legal. |

**Slice E — Admin:** AD1–AD3 are **MVP-critical** if manual verification ships; AD4 if you want **double gate** (account + each event); AD5–AD7 scale with trust-and-safety and ops maturity.

---

## 6. Explicit MVP scope (verbatim synthesis from end of `additional_notes.md`)

1. Search by **city/ZIP**  
2. **Category** filters  
3. **List + map** view  
4. **Event detail** pages  
5. **Organizer posting** form  
6. **User accounts** for **saved** events and **subscriptions**  
7. **Email** notifications for **new matching** events  
8. **Launch constraint:** **one geography** + **few categories** first; expand cultural granularity and recommendations with traction  
9. *(Roadmap)* **Eventbrite (or URL) import** (**O7**) and **affiliate-aware** ticket links (**D9**) when partner/legal ready—not required to ship Slice A read-only discovery.

**Vision extension ([`idea_enhaced.md`](./idea_enhaced.md)):** treat **structured family profile + ranked matches + richer digests** as **Slice B+** after accounts (**§2.3 P***), not a replacement for bullets 1–8 above. **[`additional_notes2..md`](./additional_notes2..md)** adds **symbiosis** narrative and **O7**/**O8**/**P9**/**P10** examples.

**Cross-check [`mvp_features.md`](./mvp_features.md) core MVP checklist:** sign up + family profile · zip/radius browse + filters + keyword search · detail with Save / Share / Interested · subscriptions + **email** (+ weekly digest option) · organizer profile + event CRUD (draft/publish/edit/unpublish) · basic stats · admin approve/flag + category/tag management · scheduled email jobs — all mapped in **§0.1**.

---

## 7. Suggested MVP slices (for engineering planning)

**Cross-check:** Three-phase framing from [`ideas_envent.md`](./ideas_envent.md) maps to these slices in the **alignment** subsection above (ideas **Phase 1** ≈ **A**/**B** + early profile; **Phase 2** ≈ **P4**/**P6**/**D10**/**C**/**O8**; **Phase 3** ≈ **§8** optional ticketing + **P10**). **12‑month horizons** from [`mvp_features.md`](./mvp_features.md) are summarized in **§0.1**.

**Slice A — Read-only discovery:** **D1**–**D9** (without save/subscribe), public homepage + list + map + detail + registration link; **D10** culture chips optional **1b**.  
**Slice B — Attendee identity & retention:** A1–A2, then A3–A7 (**email** matching events).  
**Slice F — Calendar export (v1):** **A8** after core saves/detail are stable ([`mvp_features.md`](./mvp_features.md) Months 4–9).  
**Slice B+ — Family profile (vision):** **P1–P3 + P8** (profile store, onboarding quiz, first recommendations, privacy copy/controls) after **A1**; then **P4** (Fit Score v1), then **P5–P7** and **P6** channels as prioritized.  
**Slice C — Supply:** O1–O3 + O4–O6 (verification and lifecycle). **Slice C+ — Distribution integrations:** **O7** (import) + **O8** (analytics) + **D9** affiliate wrapping when policy requires—can trail core **O** CRUD.  
**Slice D — Trust:** T1 minimum; T2–T5 as capacity allows.  
**Slice E — Admin:** AD1–AD3 minimum; AD4–AD7 per policy and capacity.

---

## 8. Out of scope for this MVP list (per current product docs)

- **Native ticketing / on-platform payment** (checkout stays **link-out**—Eventbrite, etc.)  
- **In-app checkout** — out of scope. **Integrations** (**O7** import, **D9** affiliate-aware outbound ticket URLs) are **roadmap** and still **hand off** to the organizer’s ticketing page.  
- **Push / SMS** notifications — **explicitly in** [`idea_enhaced.md`](./idea_enhaced.md) for **P6**; [`additional_notes2..md`](./additional_notes2..md) ties **SMS** to illustrative **P9** premium; keep **email-first** until PRD elevates channels.  
- **Featured listings / paid boost** — readme roadmap; **P10** (digest placement) is a **separate** monetization path when ready (illustrative pricing in notes2).  
- **Full “Netflix” implicit + contextual engine** (weather, city trends) — **P5**/**P7** partials first; full **contextual** layer **later**  
- **Parent/organizer reviews & ratings** (with moderation) — [`mvp_features.md`](./mvp_features.md) **plus**; not MVP.  
- **Heavy multi-city / i18n localization** — product may stay **US-wide** with one UX language first; **city selector** and **localized** copy are **later** unless PRD prioritizes ([`mvp_features.md`](./mvp_features.md) Months 10–12 sketch).

---

## 9. Vision backlog summary ([`idea_enhaced.md`](./idea_enhaced.md))

| Area | Intent |
|------|--------|
| **Onboarding** | ~**90s** quiz → persistent **family + geo + categories + budget + frequency**. |
| **Data** | Profile JSON (or normalized) + future **event → profile** batch matching (“new event arrives → match all profiles”). |
| **Output** | **5–10** ranked listings, **Fit Score** 0–100, habit-forming **digests** + selective **urgent** channels. |
| **Flywheel** | More families → better matching signals → retention; organizers optional **digest** placement (**P10**). |
| **Partners** | **Eventbrite (etc.)** as **ticketing home**; Eventpinger drives **qualified clicks** (**O7**, **D9**, **O8**) per [`additional_notes2..md`](./additional_notes2..md). |

---

*Update this file when PRD locks channel mix (email vs push/SMS vs WhatsApp), **P4** scoring v1, **Fit Score** naming/branding, whether **P9** freemium ships, **O7** provider scope (URL-only vs API), affiliate program rules, exact card fields (e.g., aggregated **interest** count from readme), whether D10 ships in MVP or 1b, **event-level moderation** default (**AD4** on vs off for verified organizers), **A8** calendar scope (single-event ICS vs saved list), **O8** lead-inbox consent model, and when **§2.1–§5.1** planned UI is superseded by concrete routes/components.*
