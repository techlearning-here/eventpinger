# Business idea brief: local events & activities—marketing and discovery

**Audience:** Product, engineering, design, marketing, partnerships, and leadership stakeholders who need a shared picture of *why* we might build this and *what* success looks like—without implementation detail.

**Strategic plan (condensed):** [`business-idea-and-plan.md`](./business-idea-and-plan.md) — vision, phased rollout, metrics, and immediate decisions in one narrative.

**Status:** Concept / pre-MVP. Technical and product specifics live in the project README and future PRD. **Stack:** Next.js (`frontend/`), FastAPI (`backend/`), Supabase (`supabase/` + hosted Postgres/Auth, Google OAuth)—see [`tech-stack.md`](./tech-stack.md). **Engineering feature catalog + implementation status:** [`FEATURES.md`](./FEATURES.md); **full ID’d MVP tables:** [`mvp-feature-list.md`](./mvp-feature-list.md).

**Primary product idea:** ***Get notified about the right kids’ and cultural events in your neighborhood, based on your family profile*** — i.e. **proactive** alerts when **new listings** fit **ages**, **interests**, **community/culture tags**, and **location** the user has saved (see project README for anonymous browse vs signed-in **dashboard**).

**Positioning:** This platform is **not limited to children’s activities.** It is a way to **amplify marketing** for **any** local activity or program that needs to be **communicated to the public** to drive awareness, interest, and turnout. Examples include classes, camps, festivals, concerts, workshops, religious and cultural gatherings, sports, community meetings, and volunteer drives—**for all ages**.

**Alternate narrative (stakeholder pitch):** **Family Event Radar** — *Every event finds its family. Every family finds its events.* Same wedge as above, with explicit **symbiosis** with ticketing platforms (e.g. **Eventbrite**): we improve **discovery and matching**; organizers keep **checkout** on the stack they already use. Optional **import** of public listings (**O7**) and **affiliate**-tracked ticket links (**D9**) are **roadmap** levers—see [`additional_notes2..md`](./additional_notes2..md). Illustrative **dual revenue** (organizer **featured** placement **P10**, family **premium** **P9**) is **not** fixed pricing until PRD locks it.

**Brand / domain:** **eventpinger.com** — matches the product codename and the idea of **pinging** users when **new matching events** appear; **availability** reported at stakeholder check—**re-verify at purchase** and run a quick **trademark** screen in target markets.

**End-to-end intent (initial focus):** Support the path from **awareness** to **qualified intent**: help organizers **get visibility** (the job many solve today with **notice boards, shop windows, and word of mouth**), **generate leads**, and **hand people off** to whatever **registration or ticketing** they already use (**Eventbrite, Brown Paper Tickets, church/school portals, etc.**). **Native payments and ticketing are explicitly out of scope for the first phase**—most organizers already have a third-party stack; what they lack is **distribution and marketing**, not another checkout.

**Optional later phase:** If research shows demand, we could add **on-platform payment** and **ticketing**—not required to validate the core wedge.

**Terminology:**

- **Event notification subscription** (public / attendees): opt-in to categories, tags, and zones so we **notify** them when **new matching events** are posted—**not** a paid site membership.
- **Organizer subscription** (paid plan for hosts): optional **recurring** plan (e.g. monthly/annual) for organizers who post **often**—distinct from **event notification** subscriptions; label clearly in the product (**“Pro organizer plan”** etc.) to avoid confusion.

**Organizer pricing model (dual option):** Organizers choose what fits their volume—**win-win** with flexibility:

1. **Per-event listing fees** — pay **each time** they publish a listing (after **first event free**). Best for **occasional** hosts.
2. **Organizer subscription** — **recurring** fee (monthly/annual) that includes **N listings per period**, **unlimited** listings up to a cap, or **discounted** per-event overage—exact tiers in PRD. Best for **schools, studios, and orgs** that post **many** events and want **predictable** cost.

**Revenue at launch** is **listing and organizer subscription**—not **take rate on ticket sales**. If we later add **on-platform payment**, a **commission** could be introduced as an **additional** lever; optional **prepaid event packs** can complement per-event users.

**Notification channels:** **Email** and **WhatsApp** are the intended **event notification** mechanisms (user‑configurable). **Push** notifications may follow in a later phase.

---

## 1. Executive summary

The **core idea** is ***get notified about the right kids’ and cultural events in your neighborhood, based on your family profile***: users opt in to **alerts** when **new listings** match **family context** (ages, culture, interests) and **place**, not only generic proximity.

We are evaluating a **web platform** that helps **organizers** market local **activities and events** more effectively, and helps the **public** discover what matters to them nearby—then **express interest** and **reach the organizer**, with **registration and payment** happening on **the organizer’s existing ticketing or signup links**.

**Organizer problem (commercial):** Many worthwhile activities fail to get **traction** because **visibility** is the bottleneck—not the absence of a ticket vendor. Promotion is fragmented: **physical notice boards**, grocery-shop flyers, ad-hoc chat groups, one-off websites, and noisy social feeds. Organizers often **already pay** for **Eventbrite (or similar)**; what they still do is **paste posters** and **ask shops** to carry flyers because **digital discovery** does not reach the **right local audience** in a **structured, repeatable** way. **Leads leak** when interest scattered across channels never surfaces as **actionable signals** for the team.

**Public problem:** People miss events they would have attended because information is hard to find in one **trusted, filterable** place—and when they are interested, they lack a **clear next step** to the organizer’s **official signup or ticket page**.

The product’s wedge is **structured discovery and marketing**: categories, location and radius, scheduling and time preferences, optional **audience signals** (e.g., age range when relevant, cultural or community tags), plus **event notification subscriptions** delivered via **email** and/or **WhatsApp** (see terminology). We **generate leads** (e.g., interest signals, inquiries), optionally support **real-time communication** with the organizer’s team, and **surface outbound links** to the organizer’s **chosen registration URL**—without replacing their ticketing stack in v1.

**Geography:** The platform is intended for use **anywhere in the United States**. **Organizers can publish from any U.S. location**; **attendees** discover and subscribe by **their own** location, radius, and interests—there is **no** product requirement to limit publishing or browsing to a single metro.

**Public use of discovery, notifications, and core participation is free.** Attendees **pay** for priced activities **only through the organizer’s external systems** when v1 is link-out only. Organizers are the primary commercial counterpart: **either** **per-event listing fees** (with **the first event published free**) **or** an **organizer subscription** plan (recurring, for high-volume hosts). **No platform commission on ticket sales** until/unless **native checkout** exists.

---

## 2. Problem

**For the public**

- Relevant local activities are **under-marketed** or scattered across channels.
- Generic listings and social algorithms rarely combine **place**, **topic**, **timing**, and **audience fit** in one place.
- Without **proactive notifications**, people forget to check; **traction** for good events stays lower than it could be.
- **Friction after interest:** Even after they find an event, the **handoff** to “where do I sign up?” is unclear unless the listing **surfaces the organizer’s official link** and optional **contact** paths.

**For organizers (the marketing gap)**

- Schools, temples, studios, nonprofits, venues, instructors, and community groups need **reach**, **qualified leads**, and **signals** (views, saves, “interested,” messages) that justify spend—**analogous to foot traffic past a notice board**, but **measurable** and **targeted**.
- They need a **single place to publish**, **shareable links**, and **notification-driven rediscovery** so they are not only relying on **physical placements** and **one-off posts**.
- **Lead drop-off** is common when **discovery** and **conversation** live in different silos than **registration**; v1 **connects discovery to the link and the team**, not to a **second** ticketing product.

---

## 3. Opportunity

- **Long tail of local programming:** A huge volume of activities needs **distribution**; most organizers are not expert marketers or sales operators.
- **Relevance drives conversion:** Matching **location**, **interests**, **community/culture** (when applicable), and **time** improves **lead quality** versus untargeted posts.
- **Notification as marketing:** **Event notification subscriptions** build an **ongoing audience** for future listings.
- **Marketing + handoff:** Owning **discovery → lead → (optional) chat → outbound registration link** improves **organizer ROI** on **listing spend** versus **directory-only** products that stop at a **cold URL** with no **intent signals** or **notifications**.

---

## 4. Proposed solution (product, in business terms)

A **two-sided marketplace** (supply: events and activities; demand: the general public and community members) framed as **local event marketing, discovery, and lead generation**—with **registration** on the **organizer’s tools**:

| Side | Core promise |
|------|----------------|
| **Organizers** | **Sign-up requires manual human verification** before **public** publishing (trust & safety—reduces rogue/harmful listings). Then **list and market** nationwide using **per-event fees** and/or an **organizer subscription** plan (**first event published is free** under per-event track—see business model). **Capture leads** from discovery and interest actions. **Communicate in real time** with prospects where productized (e.g., in-app or connected messaging—exact channel TBD in PRD). **Prominent outbound link** to **existing ticketing / RSVP / signup** (and optional price signal on the card). **Engagement and funnel metrics** beyond raw views—**not** replacement of their ticket vendor in v1. |
| **Public** | **Free** discovery: browse, filter, save, express interest, subscribe to **event notifications**. When ready, **open the organizer’s official registration or ticket URL** and/or **reach the organizing team** for Q&A per product rules. |

### End-to-end funnel (stakeholder view, v1)

1. **Lead generation** — Structured listings, notification reach, and explicit interest actions produce **actionable leads** for organizers (with appropriate privacy and consent).
2. **Real-time communication** (as scoped in PRD) — Prospects can engage the **organizing team** to improve trust and answer speed.
3. **Handoff** — **Register or buy** on the **organizer’s chosen URL**; the platform **tracks clicks and interest**, not **GMV**, until native checkout is a deliberate phase.

**Listing lifecycle:** At publish time, organizers **must set an end of life** (date/time) for the listing. After that time, the system **removes the event from the database** so the catalog stays current and storage does not grow with dead listings. (If **future** on-platform payments ship, implementation may need **retention exceptions** for disputes or law—separate from “public listing gone.”)

**Kids’ and family programming** remains a **strong use case**—but the same mechanics support **adults-only**, **all-ages**, **cultural**, **arts**, **sports**, **civic**, and **professional** local activities.

MVP scope should **assume** **discovery, listings, notifications, interest/leads, and outbound registration links** first; **native payments and ticketing** only if/when explicitly added in a **later** milestone. **Messaging** modality and depth **as validated**. Stakeholders should align sequencing in the PRD. A **6–10 week** slice targets **the marketing wedge**, not a **second** ticketing product.

---

## 5. Target users (summary)

1. **Organizers / hosts** — Entities that need **marketing, visibility, and leads** in one coherent flow—**alongside** their **existing** ticketing or signup stack: education providers, cultural and religious organizations, arts venues, sports clubs, community groups, workshops, etc. May publish from **any U.S. location**. **Pricing choice:** **per-event listing fees** (first event free on that track) **or** **organizer subscription** for frequent posters.

2. **General public** — Anyone discovering and attending local activities. **Free** for discovery and notifications; **pay** for priced events **through organizer systems** when using external links.

3. **Organizing team members** — Staff or volunteers who **respond to leads** and **support** attendees—may need roles, handoffs, and light operational tooling (defined in product). **Check-in** stays on **organizer/ticketing tools** in v1 unless product scope expands.

4. **Segment examples (illustrative)** — Families; adults seeking cultural or hobby programming; **neighborhood-** or **topic-based** subscribers—not a closed list.

---

## 6. Business model

| Party | Economics |
|--------|-----------|
| **Public** | **Free** for browse, profiles, saves, interest, **event notification subscriptions**, and **messaging** tied to legitimate lead conversations (policy TBD). **No** platform **checkout** in v1—users **complete purchase** on **organizer-linked** systems when events are paid. |
| **Organizers** | **Track A — Per event:** **First event published: free**; then a **fee per listed/published event** (define what counts and whether **edits** re-charge). **Track B — Organizer subscription:** **Recurring** plan (e.g. monthly/annual) with **included listings** and/or **lower overage** fees—PRD sets tiers and whether **first event free** applies before subscription starts. Organizers **pick** the track that fits **volume**; switching and **proration** rules TBD. **Primary revenue** = **listing/subscription**. |
| **Transactions (future)** | If **native payment** is added later, **commission** on **GMV** could become a **second** revenue lever—**not** assumed at launch. |
| **Ticketing (future)** | **Out of scope for v1.** Optional **phase** only if the product strategy commits to **owning checkout**; until then, **deep links** to **third-party** ticketing suffice. |

**Summary:** Revenue from **organizers** via **per-event listing fees** (with **free first event** on that track) **and/or** **organizer subscription** plans. The public is **not** charged for using the marketplace surface. **Ticket revenue** flows **outside** the platform in the initial model.

---

## 7. Value proposition

**For organizers**

- **Pipeline:** Not just eyeballs—**leads** you can act on.
- **Speed to trust:** **Real-time communication** with prospects through the organizing team improves **qualification** (where productized).
- **Complements what you already use:** You keep **Eventbrite (or similar)**; we add **discovery, notifications, and intent signals**—the gap **notice boards** fill physically, **digitally**.
- **Affordable trial:** **First event published free** (per-event track) so organizers can prove traction before paying **per listing** or upgrading to **subscription**.
- **Choice:** **Sporadic** hosts avoid a **monthly** commitment; **frequent** hosts get **predictable** cost via **subscription**.
- **Proof:** Funnel metrics support **renewal** of whichever plan (per-event or subscription) delivers ROI.

**For the public**

- Discover and follow local activities; when interested, **follow the organizer’s official link** to register or buy tickets, and **talk to the team** where the product supports it.

**For the business**

- **Per-event listing fees** and/or **organizer subscription** revenue as the **near-term** model.
- Durable advantage if we own **intent data** and **qualified reach**—**clicks and leads** attributable to the platform—even when **checkout** stays external.

---

## 8. Differentiation (hypothesis)

- **Marketing-first** local events: **discovery + notifications + leads + (optional) team communication + outbound registration**—not only a directory or calendar embed, and **not** competing with **organizers’ existing ticketing** on day one.
- **Local + structured metadata** (category, place, time, optional audience/community tags).
- **Event notification subscriptions** for recurring demand generation.
- **Accessible** to long-tail organizers who already have **a signup URL**; we improve **who sees the listing**, not **card processing** in v1.
- **Trust gate on supply:** **Manual verification** for **organizer** accounts before live listings—stronger than open-post calendars for **family-facing** inventory.
- **Flexible organizer economics:** **Per-event** for **occasional** hosts; **subscription** for **high-volume** hosts—**listing-led**, not **GMV-take-rate** at launch. Different **bundle** than **festival/vendor** SaaS (Eventeny-style depth), same **visibility job** as **flyers and notice boards**, with **digital targeting**.
- **Family-aware recommendations (MVP):** **Rule/score‑based** ranking using zip/radius, **children’s ages**, **cultural/ethnic tags**, **interests**, **schedule preferences**, and light **social proof**—to pre‑select **event notification subscriptions**, order **“suggested for your family”**, and split **immediate vs digest** notifications (see project README for detail). **No heavy ML** required initially; add **behavioral** boosts (opens, RSVPs, dismissals) over time.
- **Privacy-by-design for sensitive attributes:** Clear copy, **generic recommendations** opt‑out, and **no sharing of individual family profiles** with organizers—**aggregates only** where insights are shown.

*Assumptions to validate:* Organizers will pay for **listings** without **native ticketing** because **reach and leads** are the pain; **per-event** vs **subscription** split makes sense by **posting volume**; **subscription** ARPU covers **verification** and support; teams will **staff** messaging (if offered) at acceptable response times; users are willing to **click out** to a **trusted** external URL when copy and **verification** make that feel safe.

---

## 9. Go-to-market lens

- **Nationwide product, flexible marketing:** The **product** is open to **all U.S. locations** for both publishers and seekers. **Marketing, partnerships, and support** may still **prioritize** specific metros or communities early for focus and learning—without hard-coding a geographic ceiling in the product.
- **Supply-side:** **First event free** as a clear hook for long-tail organizers anywhere in the country; pilots with organizers who **already use** a ticketing link but **struggle with visibility**—co-design **messaging** and **metrics** around **link clicks** and **interest**.
- **Demand-side:** **Free discovery**; emphasize **relevant notifications** and a **clear path** to the organizer’s **official** registration page.

---

## 10. Success metrics (indicative)

| Area | Examples |
|------|-----------|
| **Activation** | Profile completion; **event notification subscriptions** created |
| **Leads** | Leads per listing; cost per lead vs. organizer benchmarks |
| **Conversation** | Real-time thread starts; median **first response time** by organizing team |
| **Conversion (v1)** | **Registration link clicks** per listing; lead → **click** rate; optional **self-reported** “filled seats” from pilots |
| **Supply** | Organizers onboarded; **free-first-event** → paid (**per-event** or **subscription** attach); repeat listing; **plan** retention / churn |
| **Revenue** | **Per-event** listing; **organizer subscription MRR** |
| **Quality** | Support volume; trust & safety incidents |

North Star candidates: *organizer-attributed **link clicks** and **interest** from the platform*, or *organizers with positive ROI on **listing fees** vs. **physical promotion** cost*—to be chosen with data. If **native checkout** ships later, add *GMV / commission* metrics.

---

## 11. Revenue roadmap & extensions

**Core (aligned with business model, v1)**

- **Per-event listing fees** — after **first event free** on the per-event track.
- **Organizer subscription plans** — recurring plans for **frequent** posters (included listings / overage pricing—PRD).

**Later / enhanced**

- **Featured listings** or boosted placement.
- **Advanced organizer tooling** (CRM-style leads, templates, analytics, team permissions, SLA dashboards for response time).
- **Optional:** **On-platform payment + ticketing** if strategy and compliance investment justify it—would introduce **GMV** and **commission** as additional levers.

Phasing for **any** future **payment** product should respect **regulatory**, **tax**, and **card-network** obligations.

---

## 12. Risks & assumptions

| Risk | Mitigation direction |
|------|----------------------|
| Cold start | Nationwide listing; seed **demand** in priority markets via partnerships and marketing |
| **Free first event** abuse (shell accounts, spam) | **Organizer manual verification** before any **public** publish; identity signals; clear TOS; caps on concurrent pending accounts |
| **Verification queue** delays frustrate good organizers | **SLA** targets, triage playbook, transparent status UI, optional **draft** listings while pending |
| **Messaging** abuse, spam, PII mishandling | Trust & safety policy; reporting; rate limits; **post-verification** monitoring and suspension path |
| **Real-time** expectations unmet | Set expectations in UX; team roles; notifications for organizers |
| **Future** payment disputes, chargebacks, refunds | Only if native checkout ships: clear terms; Stripe (or similar) patterns; support playbooks |
| **Outbound link** abuse (phishing, wrong URL) | **Verification**; URL policies; reporting; organizer education |
| Organizer resistance to **listing fees** without **in-platform tickets** | Transparent ROI on **views, interest, clicks**; **calculator** (per-event vs subscription); compare to **print/flyer** and **ad-hoc** promotion cost |
| **Naming confusion** (“subscription” = attendee alerts vs organizer plan) | Distinct **UI labels**; glossary in onboarding |
| Operational load (nationwide) | Tiered support; help center; optional **priority** metros for live ops first |

**Key assumption:** A **connected marketing funnel** (discovery, notifications, leads, **trusted link-out**) delivers **enough organizer value** to fund **listing/subscription**—without **owning ticket GMV** on day one.

---

## 13. What we need from stakeholder teams

| Team | Typical asks |
|------|----------------|
| **Product / Design** | PRD: funnel states; **organizer plan picker** (per-event vs subscription); **messaging** UX (if in scope); **registration URL** fields and **click tracking**; MVP phasing (**no** native checkout in v1 unless explicitly changed) |
| **Engineering** | Discovery, notifications, listings, **interest/leads**; optional real-time infra for **organizer–public communication**; **link-out** analytics; **staff admin** app (auth, **organizer verification** queue, optional **event publish** approval, **config**, **audit** trail) |
| **Marketing / Comms** | Story: **visibility + discovery + leads**; **works with your existing ticketing**; public trust; organizer ROI |
| **Partnerships** | Pilots with organizers who **already have** a **signup/ticket URL** |
| **Legal / Trust** | **Organizer verification** evidence retention and privacy; content policy; messaging retention/consent; **email + WhatsApp** compliance; marketplace terms; children’s data if applicable; **future** payment/ticketing terms if that phase ships |
| **Finance** | **Per-event** + **subscription** pricing; **MRR** mix; **economics of first-event-free** (CAC vs LTV) |
| **Customer support** | Playbooks for **verification**, **listing**, and **reporting bad links**; **future** payment issues if checkout ships |
| **Trust & safety / Ops** | **Manual review** staffing, **SLAs**, escalation for **dangerous** or **illegal** content |
| **Leadership** | Resourcing for **verification ops** and **trust & safety**; **payments** only if roadmap adds checkout |

---

## 14. Next steps

1. Align on **marketing-first MVP** vs **optional later** checkout/ticketing (what ships in 6–10 weeks vs next).  
2. Fix **business rules**: **per-event** fee schedule; **subscription** tiers (included listings, overage, annual discount); definition of **first free event**; whether **edits** re-charge; **plan switch** / proration.  
3. Spike **messaging** approach (build vs integrate) and define **registration URL + click** analytics requirements.  
4. Produce **PRD** and **roadmap** with explicit **discovery → interest/leads → outbound registration link** acceptance criteria (and **optional** future **checkout** criteria if pursued).

---

**Related documents:** [US competitive landscape](./us-market-competitive-landscape.md) (includes **opportunity** + **SWOT**) · [India market landscape](./india-market-landscape.md) (desk snapshot if expanding or benchmarking) · [Eventpinger vs Eventbrite](./vs-eventbrite.md) · [Eventpinger vs Patch](./vs-patch.md)

---

*This document reflects the current product concept. Numbers, timelines, and metrics should be updated as research and pilots complete.*
