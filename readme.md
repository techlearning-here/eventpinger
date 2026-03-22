I want you to help me design and build an MVP for a web platform for local family and community events.

**Implementation:** `frontend/` (Next.js), `backend/` (FastAPI), `supabase/` (CLI config + migrations). Run locally: [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md). **Env reference:** [`env.example`](env.example), plus `frontend/.env.example` and `backend/.env.example`.

**Required features (engineering hub):** [`docs/FEATURES.md`](docs/FEATURES.md) — doc map, **D / A / O / T / AD / P** status vs migrations, gap checklist, env ↔ capability mapping. **Full ID tables + UI specs:** [`docs/mvp-feature-list.md`](docs/mvp-feature-list.md). **Layered MVP / v1 / plus roadmap:** [`docs/mvp_features.md`](docs/mvp_features.md). **Netflix-style personalization vision:** [`docs/idea_enhaced.md`](docs/idea_enhaced.md). **Condensed product-strategist brief** (problem, personas, five pillars, phased roadmap): [`docs/ideas_envent.md`](docs/ideas_envent.md). **Business idea & strategic plan:** [`docs/business-idea-and-plan.md`](docs/business-idea-and-plan.md). **Team onboarding (share the idea):** [`docs/team-idea-brief.md`](docs/team-idea-brief.md).

1. High‑level concept

**Product idea:** *Get notified about the right kids’ and cultural events in your neighborhood, based on your family profile* — delivered via **email**, **WhatsApp**, and future channels when **new matching listings** go live for **saved** zones and preferences (anonymous visitors can still **browse** and filter without a profile).

Build a website where:

Event organizers can **add**, **edit**, and **delete** their event listings (see **A**). **Organizer accounts** require **manual human verification** before they can **publish** to the public site (see **A**—reduces rogue and harmful listings). Event types include:

Kids’ classes

Camps

After‑school activities

Community gatherings

Cultural and religious events

Music, dance, and arts events

Families and community members can:

Discover relevant events based on location and interests

**Main page (no account required):** Visitors who are **not signed up** can still use **filters / preference-style controls** (e.g., zip + radius, categories, age band, community tags, date range—align with **C**) on the **home/landing** and **view matching published events** in the results list. Those choices are **not tied to a saved profile** unless they create an account (optional: **session** or **URL params** only—PRD decides persistence for anonymous users).

**After sign-in:** The same kinds of preferences can be **saved** to the user’s account (**up to three** **radius zones** with **per-zone** categories/tags—see **D**). The **dashboard** shows **only active events that match** those **saved** preferences (plus other rules in **B**)—a **strictly filtered** personal view, not the full unfiltered catalog. Users **add** and **edit** zones and categories from the dashboard or settings. They can **hide specific events** from the dashboard only (events stay public on the main site for others). **Email/WhatsApp notifications** use the same saved preferences.

**See all published (live) events** from the main page when filters are **cleared** or set broadly; the main page remains the **public catalog** entry point.

**Interest counts:** **Any user** (including **not logged in**) can **see** the **aggregated interest count** on **event cards** and **event pages**. **Only logged-in users** can **add** or **remove** their interest (anonymous visitors get a **sign-in** prompt if they tap the action).

**After sign-in:** Subscribe to event categories and community tags (aligned with saved zones/preferences).

Receive **event notifications** when new matching events are posted—via **email** and/or **WhatsApp** (**signed-in** users only; see subscriptions settings)

The core value:

**For families:** *Get notified about the right kids’ and cultural events in your neighborhood, based on your family profile* — so you are not stuck checking flyers, chats, and generic marketplaces.

**For organizers:** Make it easy for small/local hosts (temples, cultural schools, after‑school providers, studios) to **reach** households that **care** about what they run.

**Positioning note:** Treat the product as **complementary** to ticketing marketplaces (e.g. **Eventbrite**): **matching and notice-board distribution** on Eventpinger; **transactions** stay on the organizer’s chosen link. Optional **import** and **affiliate** flows are specified in [`docs/additional_notes2..md`](docs/additional_notes2..md) and IDs **O7** / **D9** in [`docs/mvp-feature-list.md`](docs/mvp-feature-list.md).

2. Target users and personas
Design for these primary personas:

Parent:

Has one or more kids.

Wants age‑appropriate classes, camps, and cultural/community events.

Cares about distance, time of day, price, and cultural fit (e.g., Indian Hindu parents looking for festivals, language classes, classical music/dance).

Community / event organizer:

Runs classes, camps, cultural events, festivals, or small concerts.

Needs a simple way to:

**Add**, **edit**, and **delete** their own events

Get signups or leads

Share the event link to WhatsApp / social media.

Community‑oriented user:

Wants to discover local gatherings and cultural events related to their demographic (e.g., Indian Hindus in USA, specific language groups, etc.).

3. Key features (MVP)
Design and plan the MVP around these features:

A. Event posting (organizer side)

Organizers must have full **CRUD-style** control over their listings: **add** (create), **edit** (update fields any time policy allows), and **delete** (remove a listing deliberately—see flows below). **Unpublish** (hide from public without deleting the row) is optional in PRD if you want a softer state than delete.

Each event should have:

Title

Description

Category (e.g., Kids Class, Camp, After‑school, Religious/Cultural, Music/Dance, Sports, Community Gathering, Workshop)

Community / culture tags (e.g., Indian Hindu, Telugu, Tamil, Gujarati, Marathi, Chinese, Korean, Jewish, etc.)

Age range (e.g., 3–5, 6–9, teens, adults)

Date and time (start/end, single or recurring)

**End of life (required at publish):** The organizer must choose a **date and time** when this listing is no longer active. After that moment, the platform **removes the event from the database** (scheduled job or equivalent)—it no longer appears in discovery, search, or notifications. *For recurring events,* this should be the end of the **last** occurrence (or a later cutoff the organizer explicitly wants); the UI should help avoid accidental early removal. *Legal/finance retention* (e.g., tax, chargebacks) may require **archival or anonymized records** in addition to removing the public listing—define in compliance review.

Venue (name, full address, city, zip, Google Maps link if possible)

Online/Offline flag (for virtual events)

Price signal (free / paid, price range) and **registration or ticket URL** (required when the event uses an external signup or ticketing provider—expected common case in MVP)

Organizer profile (name, logo, website, contact email/phone, WhatsApp link optional)

Media (cover image, optional gallery)

Organizer flows:

**Sign up and manual verification (organizers only):** **Event organizer** registration is **not** instant self-serve approval for publishing. Organizers complete sign-up and supply **verification materials** defined in the PRD (e.g., **organization or host identity**, verifiable **contact** information, link to **official website** or social presence, optional **nonprofit/tax ID** or other **proof of legitimacy**—exact list and redaction rules are compliance/legal decisions). A **human reviewer** (internal ops or trust-and-safety) **manually approves or rejects** the account **before** the organizer may **publish** listings to the **public** site. **Purpose:** limit **rogue actors**, **scams**, **misleading** events, and **dangerous or illegal** activity that could harm attendees—especially **families and children**. Account states (example): **pending review**, **verified** (may publish), **rejected** (with actionable reason), **suspended** (post-verification violations). **Optional PRD choice:** allow **draft** events while **pending** (not publicly visible) to reduce time-to-first-publish after approval. **Public / attendee** accounts do **not** go through this same **organizer** verification path.

Sign in (verified organizers)

**Add event:** Create via form → **preview** → **publish** (or save **draft** if you support drafts in MVP). **Publish** to the live catalog is **blocked** until organizer status is **verified** (or equivalent).

**Edit event:** Open existing listing from **organizer dashboard** → change any allowed fields (title, schedule, venue, categories, tags, media, **end of life**, price, etc.) → save; changes reflect on **main page** and in discovery after publish rules apply

**Delete event:** Organizer explicitly **deletes** a listing (confirm in UI). Effect: **remove from public** immediately (or after soft-delete grace—PRD); **purge** or archive per retention rules. **Initial product assumption:** registration happens on **external** ticketing/signup URLs—**no** platform-native orders to reconcile on delete. If **future** on-platform sales ship, **block** or **warn** when orders exist and require refund/settlement workflow—define in PRD. **Interest** rows follow the same removal policy as automatic **end of life**.

**Unpublish** (optional): Temporarily **hide** from public without full delete—if implemented, distinguish from **delete** in UI.

Automatic **purge** of the event row after **`end_of_life_at`** when the organizer has **not** already deleted it (no indefinite stale listings)

See simple stats: views, clicks, **interest** (same signal as public aggregate—see **C**), “Going” / **RSVP** if distinct, and other funnel metrics

**Event card (compact listing UI)** — In the spirit of **marketplace / festival-style** products (e.g., **Eventeny**-like **event cards** in grids and lists), every **browse** surface (main page, search results, dashboard rows, map popovers) should use a **consistent card** layout. The **detail page** carries the full description, gallery, map, and legal fine print; the **card** is scannable.

**Show on every event card (MVP target):**

| Priority | What to show | Notes |
|----------|----------------|-------|
| **Required** | **Cover image** | Primary visual; safe crop/aspect ratio; placeholder if missing. |
| **Required** | **Title** | One line; truncate with ellipsis on small breakpoints. |
| **Required** | **Start date & time** (and **end** if same day, or “multi-day” / date **range** if spanning days) | Respect timezone (organizer or venue local—PRD); recurring events show **next occurrence** or “Recurring — see details”. |
| **Required** | **Location line** | **Online** (if virtual) **or** **City, ST** + optional **neighborhood/venue short name**; **do not** need full street on the card. If user location known, optional **“~X mi”** from anchor (see **B** zones). |
| **Required** | **Category** | At least **one** primary category chip/label. |
| **Required** | **Price signal** | **Free**, **From $X**, **$X–$Y**, or **Paid** (link on detail)—match organizer fields. |
| **Required** | **Aggregated interest count** | Public integer + label/icon (see **C**); visible to **all** users. |
| **Strongly recommended** | **1–2 community / culture tags** | Chips; hide row if none selected. |
| **Strongly recommended** | **Age range** | e.g., “Ages 5–8” or “All ages”. |
| **Strongly recommended** | **Organizer display** | **Organizer name** + **small logo** (or initials avatar) for trust. |
| **Optional** | **Verified organizer** badge | If you surface verification state to the public. |
| **Optional** | **“New”** or **spotlight** ribbon | Time-bounded promo (featured listings—later phase). |

**Omit from the card (keep for detail page):** Full **description**, long **address**, **gallery** (beyond cover), full **registration/ticket URL** (use **“Details”** / **“View event”** on card; **detail page** is the primary place for **Register / Get tickets** CTA), organizer **phone/email** (privacy), internal **end of life** timestamp.

**Card actions:** Tap card → **event details**; optional quick **Interested** (signed-in only) without opening detail—PRD choice.

B. Family profile, demographics, and personalization

**What personalization should achieve (same spirit as demographic + context recommenders elsewhere):**

- **Kids’ ages** → Suggest **age‑appropriate** classes, camps, and activities (e.g., toddler playgroups vs SAT prep).
- **Cultural / ethnic identity** → Highlight relevant **festivals**, **language classes**, **temple / church / mosque / sangha** events, and **music/dance** tied to that culture.
- **Location and mobility** → Users set **up to three** **radius distances** from one or more **anchors**; **category and tag preferences can differ by zone** so discovery matches how far they are willing to go for each kind of activity.
- **Family context (richer signals over time)** → With optional fields such as **household size**, **working‑hours constraints**, or **budget band** (free/low‑cost vs premium), nudge categories and filters toward **realistic time windows** and **price fit**. For **MVP**, treat these as **optional** or **later** if scope is tight; core value comes from zip/radius, ages, culture, interests, and schedule.

**Data to collect in a family profile (MVP)** — small, high‑value set at onboarding:

- **Up to three radius-based zones:** For each zone (max **3**), collect **anchor** (e.g., home zip, work zip, or another U.S. zip) and **radius** (miles). The user **selects event category and community-tag preferences per zone** (or inherits a default set they then refine—PRD choice). Matching treats an event as in-scope for that user if it falls **inside at least one** zone’s circle **and** matches that zone’s selected preferences (exact boolean logic—AND within zone, OR across zones—for dashboard/notifications should stay consistent everywhere).
- **Children’s year of birth** and/or **school grade** (derive or display age bands for matching).
- **Cultural / religious identity tags** (e.g., Indian Hindu, Tamil, Gujarati, Jewish, Chinese, Korean, etc.) — **multi‑select from a controlled list**, plus **“prefer not to say”** and path to **generic recommendations only**.
- **Top interests:** STEM, arts, sports, music/dance, language, religious/spiritual, community volunteering (checkboxes or ranked picks).
- **Schedule preferences:** e.g., **weekdays after 5pm**, **weekend mornings**, **weekend afternoons**, **school breaks**.

Use these fields to **pre‑select default event notification subscriptions** (categories + community tags + location scope); users **adjust toggles** before finishing signup.

**Recommendation logic (MVP)** — **rule‑ and score‑based** (no heavy ML required); same family of ideas as many **event recommenders** (demographics + context + interactions).

Build a **score per event per user** from weighted signals, for example:

| Signal | Example effect |
|--------|----------------|
| **Location match** | Event falls inside **one or more** of the user’s **up to three** radius zones; closer to anchor or smaller-radius zone → higher component (e.g., +X₁ by tier). |
| **Age fit** | Event age range matches **at least one child** → +Y. |
| **Cultural / community tag overlap** | User tags align with event tags (e.g., user Indian Hindu + event Diwali at local temple) → +Z. |
| **Category / interest overlap** | Event category matches stated interests → contribute to score. |
| **Time fit** | Event schedule overlaps **preferred windows** (weekday evening vs weekend morning) → +W. |
| **Popularity / social proof** | Use **aggregated interest count** (and optionally proximity); many interested users → +P (cap to avoid only showing “blockbusters”). |

Tune **X, Y, Z, W, P** as constants in config; refine with A/B tests later.

**Use the score to:**

- **Onboarding:** Propose **default subscription toggles** and **first categories** (“Suggested for your family”).
- **Home / browse:** Order or section **“Suggested for your family this week”**; separate **“Trending in your community”** (can mix score + recency + local engagement).
- **Notifications:** **High scores** → eligible for **immediate** “new event” alerts; **medium** → **weekly digest**; thresholds configurable.

**Behavioral learning (start simple, expand over time):**

- **Positive signals** (opened detail, saved, RSVP/interested, purchased) → **boost** similar categories and tags in scoring weights or light boosters.
- **Negative signals** (dismissed, ignored repeatedly) → **lower** weight for similar items (with floors so users aren’t trapped in a bubble).

**UX: how proposals appear**

- **After signup form:** Screen **“We recommend these for your family”** with **pre‑selected toggles** (e.g., Kids 5–8, STEM after‑school, Indian festivals, Carnatic music) — all **editable** before continue.
- **Home:** Sections such as **“Suggested for your family this week”** and **“Trending in your community.”**
- **Notifications (example, email or WhatsApp):** *“New event: Holi celebration ~10 minutes from you — fits your Indian festivals + kids 6–10 preferences.”*

**Privacy and trust**

- **Organizer verification** is a **trust and safety** measure; store reviewer notes and submitted proofs under **least privilege** and **retention** policies aligned with legal counsel.

- **Plain language** on what is stored and why: *only to personalize recommendations, feed order, and notifications* on channels the user enabled (**email** / **WhatsApp**) (and operate the product).
- **Easy opt‑out** of sensitive personalization: **“Generic recommendations only”** (still zip/radius‑based or fully manual subscriptions).
- **Do not expose individual demographic profiles to organizers**; if sharing insights, use **aggregated** stats only (e.g., “40% of interested users are within 5 miles”).

C. Event discovery and filters (user side)

**Surfaces**

- **Main page (site home / landing):** **Published events** are **listed and discoverable** for **everyone**, including users **without an account**. Provide **filter / preference controls** (location, radius, category, age, culture tags, date, free/paid, etc.) so visitors can **narrow results and view the filtered list** without signing up. Filters are **ephemeral** (session/URL) unless the user **signs in**—then equivalent choices can be **saved** (see dashboard). Logged-in users may still use the main page the same way; it does not replace the dashboard’s **saved, matching-only** view.
- **User dashboard (signed-in only):** Preferences (**three radius zones** + **per-zone** categories/tags, and profile signals in **B**) are **persisted**. The dashboard shows **only** **active** events that **match** those saved rules—**no** full catalog here by default. Users **add** and **edit** zones and preferences; **hide** individual events from *my* dashboard (**per-user suppression** only—the event stays public on the main page for others unless the organizer unpublishes it).

Users should be able to:

On the **main page**, browse and **filter without an account**; results update to match the selected filters. On the **dashboard** (signed-in), the list is **only** events that match **saved** preferences (same matching logic as notifications where applicable), optionally plus **scoring** ordering from **B**.

Filter or search dimensions (available on **main page** for all; **dashboard** applies saved values but may allow temporary overrides—PRD choice):

Location (city / zip + radius; **three-zone** model applies when **saved** after sign-in)

Date (today, this weekend, specific date range)

Category

Age range

Free vs paid

Community / culture tags

View event details page (with all info from organizer, and share buttons).

**Interest and social proof (per event):**
- **Who can see the count:** **Everyone**—anonymous visitors, logged-in users, and organizers viewing as the public would—all see the same **aggregated interest count** (non-negative integer; show **0** when none).
- **Who can add/remove interest:** **Only logged-in** users. One row per user per event (toggle off removes interest—define idempotency). Optional separate **“Going”** in PRD if you need two buckets.
- **Where the count appears:** On **every event card** (main page lists, browse grids, dashboard rows, map popovers—any compact listing surface; **card field spec** in **A**) and on the **event details** page (count visible to all; **interest button** only for signed-in users, or disabled + **sign in** for anonymous).

Public surfaces show **the count only**, not the list of individuals (unless a future feature explicitly allows it). Organizers still see **their own** richer stats in the organizer dashboard (see **A**).

Save / favorite events and mark “Interested” or “Going” (even if external ticketing is used)—**requires sign-in** (or equivalent identity) where persistence is needed; **interest** drives the **aggregate count** above (align **favorite** vs **interest** in PRD if both exist).

D. Subscriptions and notifications

Core mechanism:

Users can subscribe to:

Categories (e.g., Kids 3–5, STEM, Music & Dance, Indian Festivals, Religious Services, Camps, After‑school)

Community / culture tags

**Locations:** **Up to three** **radius zones**—each with **anchor zip** (or equivalent) **+ radius (miles)** **+ per-zone category/tag preferences**. Notifications and digests should respect the same zones (event must fall in a zone **and** match that zone’s category/tag picks, per the same rules as the dashboard—define explicitly in PRD).

Based on their demographic profile, interests, and **three-zone** defaults, suggest a default set of subscriptions they can adjust.

**Alignment with dashboard:** The **three radius zones** and **per-zone** category/tag choices users **add** or **edit** after login (dashboard or settings) are the same **subscription / preference** records that power **notifications** and **scoring** (see **B**), so one coherent model drives **dashboard**, **alerts**, and **browse personalization** where applicable.

**Notification delivery (MVP):** **Email** and **WhatsApp** are the supported **event notification** mechanisms. Users choose which channel(s) to enable in **Subscriptions & notification settings**; each channel requires appropriate **contact info** (verified email; **WhatsApp** number with **explicit opt‑in** and compliance with **Meta / WhatsApp Business** messaging rules and regional law). **Mobile push** may be added in a later phase.

When a new event is posted that matches their:

**At least one** configured **radius zone** (distance from that zone’s anchor) **and** that zone’s **category + community-tag** preferences (same rules as **dashboard**)

Kid age range and other **global** profile signals (**B**) as needed

Weekly digest option: “New events for your family this week near [city].”

**Notification policy (tie to scores):** Use the **same per‑user event score** (see **B**) to route **high‑scoring** new listings to **immediate** notifications and **lower‑scoring** matches primarily to the **digest**, per configurable thresholds.

*(Scoring design is specified in section **B** above: location, age fit, cultural tags, interests, time fit, social proof, plus behavioral tuning.)*

4. Product requirements
Please produce:

A concise product requirements document (PRD) for this MVP:

Problem statement

Goals and non‑goals

User stories (for parent, organizer, community user)

Key features and acceptance criteria

A proposed information architecture:

Main pages and their hierarchy:

Landing / Home (**published events**; **anonymous filter** by preferences → results; **no save** until sign-up)

Browse events (may overlap home sections; dedicated list/map views as needed)

Event details

**User dashboard** (signed-in only: **saved** preferences; **only** **active** events that **match**; **up to 3 radius zones** + **per-zone categories/tags**; **hide** specific events from *my* dashboard; links to subscriptions & profile)

Organizer dashboard (list **my** events; **add**, **edit**, **delete** actions; **verification status** if pending)

Create / edit / **delete** event (flows and confirmation modals per **A**)

**Internal / admin** (staff only, **separate authenticated area**): **Admin login** (dedicated staff accounts or **role-based** `User` with `admin` / `reviewer` flags—PRD). Capabilities should include: **organizer verification queue** (view submitted proofs, **approve / reject / suspend**, internal notes, assign reviewer—align with **A**); **event publishing approval** (queue or per-listing action when policy requires **moderation before public**—configurable: e.g. **all events**, **first event only**, **only if organizer not yet verified**, or **off** for trusted accounts); **reports & moderation** (user-reported listings/organizers, **unpublish** or **escalate**); **site configuration** (managed **categories** and tags, **featured** sections, **launch geography** toggles, notification/email **defaults**, optional **maintenance mode**); **audit trail** (who changed verification state, who approved a publish—**least privilege** and retention per legal). **Do not** expose admin paths on the public IA; use a **separate URL prefix** or host where practical.

User profile & family profile

Subscriptions & notification settings (**channels:** email / WhatsApp; frequency; digest vs immediate—aligned with scoring in **B**; **same three radius zones + per-zone preferences** as the **user dashboard**)

Data model / schema design:

Tables/entities (physical DB: **Supabase PostgreSQL**; schema via **`supabase/migrations`**): User, FamilyProfile, Child, Organizer (**verification status**, **submitted-at**, **reviewed-at**, **reviewer** id, internal **rejection/suspension** reason—PII-sensitive), **StaffAdmin** or **User.role** (admin/reviewer scopes—PRD), **AdminAuditLog** (optional but recommended for verification/publish actions), Event (**published** / **draft** / **pending_moderation** / **deleted** or **`deleted_at`**—PRD if event-level approval exists), Category, CommunityTag, Subscription, Notification, **notification channel preferences** (email vs WhatsApp flags, opt‑in timestamps), **user radius preference zones** (up to **3** per user: anchor, radius miles, linked category/tag selections), **user dashboard hidden events** (user + event id, “hide from my dashboard” — does not unpublish the event), **event interest** (user + event, unique; supports **aggregate `interest_count`** via query or denormalized counter on `Event` for fast card rendering), etc.

Key fields and relationships

**Event (lifecycle):** Required **`end_of_life_at`** (or equivalent) set at publish time. **Two removal paths:** (1) **Organizer delete**—user-initiated removal from organizer tools (see **A**). (2) **Automatic purge** when `now >= end_of_life_at` if the event still exists. Use **soft delete** + delayed hard delete if you need undo or compliance buffers. Discovery must only return **published, non-deleted** events with `end_of_life_at` in the future (exclude **draft** and **pending admin approval** if that state exists). **Event interest** rows should be removed or archived with the event per the same policy.

A basic UX flow for:

Parent signing up, filling family info, being shown suggested categories, and seeing recommended events

Anonymous visitor → **main page** → set filters / preferences → **view filtered results** (not saved). User **signs up / signs in** → **save** zones + per-zone categories → **dashboard** shows **only** events **matching** saved preferences → user may **hide** a specific event from the dashboard; **main page** remains available with optional **“use my saved preferences”** shortcut (PRD choice)

Any user sees **interest_count** on cards/details. **Logged-in** user taps **Interested** → count updates everywhere that event is shown; **anonymous** user is prompted to **sign in** to register interest

Organizer **signs up** → submits **verification** → **manual approval** → **add** first event → **publish** (live) → later **edit** or **delete** from organizer dashboard

**Technical stack (decided):** **Next.js** (frontend), **FastAPI** (backend API), **Supabase** (PostgreSQL + platform features), **Supabase Auth** with **Google (Gmail) OAuth** for user sign-in. Integration notes, admin-auth caveat, and security boundaries are in [`docs/tech-stack.md`](docs/tech-stack.md).

**Email** delivery (transactional ESP) and **WhatsApp** delivery (e.g., **WhatsApp Business Platform** / approved BSP); template messages and opt‑in flows per provider rules. Optional: mobile push later.

Location handling (zip + radius filtering; **haversine** or geocoder-backed distance; **up to three zones** per user)

A simple roadmap:

Phase 1 (MVP to validate concept)

Phase 2 (improvements like better recommendations, push notifications, organizer analytics)

Phase 3 (monetization such as **featured listings**; **optional** in‑app ticketing/RSVP **only if** product strategy adds native checkout—most organizers are expected to keep **third‑party** ticketing)

5. Style and constraints
Optimize for clarity and practicality: I want something that a small dev team can implement in 6–10 weeks.

Make reasonable assumptions where needed and state them.

Present outputs in a clear, structured way with headings and bullet points.

Design for **United States–wide** use: organizers may publish from **any U.S. location**, and discovery is driven by each user’s location, radius, and interests. **Marketing, partnerships, or ops** may still concentrate on specific metros early for focus, but the product should not assume a single-region ceiling. Consider **organizer monetization** as **either** **per-event listing fees** (with **first event free** on that track) **or** optional **organizer subscription** plans (recurring, for high-volume hosts—included listings / overage in PRD). **MVP assumption:** revenue is **listing/subscription**, not **take rate on ticket sales**; attendees pay via **organizer-linked** systems. **Commission** on on-platform payments would apply **only if** a later phase adds **native checkout**. **Do not** confuse **organizer subscription** with **event notification subscription** (attendee alerts)—use distinct product copy.

6. Test-driven development  
Implementation follows **TDD** by default (**red → green → refactor**). Test layers, MVP test priorities, and exceptions are documented in [`docs/testing-strategy.md`](docs/testing-strategy.md). CI should run the automated suite on every change once the codebase exists.

Now, using all of the above, produce the PRD, data model, UX flows, and implementation plan so a development team could start building this MVP.