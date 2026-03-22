# Eventpinger — business idea & strategic plan

**Purpose:** One place for **what we are building**, **why it wins**, and **how we roll it out**—for founders, investors, and cross-functional alignment. For full commercial narrative (pricing nuance, stakeholder asks, risk tables), see [`business-idea.md`](./business-idea.md). For engineering scope and IDs, see [`FEATURES.md`](./FEATURES.md) and [`mvp-feature-list.md`](./mvp-feature-list.md). Product requirements and UX depth live in [`readme.md`](../readme.md).

**Status:** Pre-MVP / planning. Numbers and dates are **illustrative** until validated.

---

## 1. Vision

**Our idea:** ***Get notified about the right kids’ and cultural events in your neighborhood, based on your family profile.*** That is the wedge: **relevant** local **alerts** tied to **who your family is** and **what you care about**—not only a passive directory or generic “events near me.”

**Eventpinger** helps **local organizers** reach the right **families and community members**, and helps **seekers** discover small, **hyper-local** activities—classes, camps, after-school programs, cultural and religious gatherings, arts and music—without hunting flyers, chat threads, and noisy social feeds.

**Supporting promise (family + community fit):** *Notify me of the **right** events for **my** family and **my** community* — see [`ideas_envent.md`](./ideas_envent.md).

**Working narrative:** **Family Event Radar** — *Every event finds its family. Every family finds its events.* ([`additional_notes2..md`](./additional_notes2..md)).

**Brand:** **eventpinger.com** — “ping” when new **matching** listings appear.

---

## 2. Problem

| Who | Pain |
|-----|------|
| **Families** | Relevant events are **scattered** (school email, temples, studios, Facebook, WhatsApp). Big marketplaces under-surface **recurring, local, culturally specific** programming. People **forget** to check; they miss what they would have attended. |
| **Organizers** (studios, temples, nonprofits, camps) | **Visibility** is the bottleneck—not always “we need another ticket vendor.” They need **distribution**, **qualified attention**, and **measurable intent** (views, clicks, interest, leads) tied to a **single listing** and **shareable link**. |

**Insight:** We do **matching + notice-board distribution**; **checkout stays on the organizer’s stack** (Eventbrite, school portal, etc.)—**complementary**, not a head-to-head ticketing play ([`vs-eventbrite.md`](./vs-eventbrite.md)).

---

## 3. Solution (product shape)

- **Supply:** Verified **organizers** create and manage listings (rich metadata: category, ages, location, culture/community tags, schedule, media, **registration URL**, **end-of-life** for stale-free catalog).
- **Demand:** **Anyone** browses and filters (location, category, dates, tags—**anonymous OK**). **Signed-in** users save a **family profile** and **up to three radius zones** with preferences; **dashboard** shows **matching** events; **email** and **WhatsApp** notifications when new fits appear (channels per PRD).
- **Trust:** **Manual human verification** before organizers **publish** publicly—especially important for **family-facing** inventory.
- **Intelligence (phased):** **Rule- and score-based** relevance (distance, ages, culture tags, interests, time windows, social proof)—**immediate** alerts for strong matches, **digests** for the rest ([`readme.md`](../readme.md) §B, [`idea_enhaced.md`](./idea_enhaced.md)).

**Out of scope for initial validation:** **Native ticketing and in-app payments**—optional **later** phase only if strategy commits.

---

## 4. Target users

1. **Parents / guardians** — Kids’ ages, schedule constraints, cultural/community identity; want **age-appropriate** and **nearby** options.
2. **Community-seeking adults** — Language, arts, faith, neighborhood gatherings.
3. **Local organizers** — Dance schools, camps, temples, cultural nonprofits, after-school providers; need **reach** and **signals** without replacing their existing signup flow.

---

## 5. Value proposition

| Audience | Value |
|----------|--------|
| **Families** | One **trusted** place to **browse** and **get pinged** for matches; clear **handoff** to the organizer’s **official** registration or ticket link. |
| **Organizers** | **Structured discovery** for long-tail events; **notifications** that refill the top of the funnel; **analytics** (views, clicks, leads—see **O8** in [`mvp-feature-list.md`](./mvp-feature-list.md)). |
| **Business** | Revenue from **organizers** (**listing fees** and/or **organizer subscriptions**), not from **ticket GMV** at launch ([`business-idea.md`](./business-idea.md) §6). |

---

## 6. Business model (summary)

- **Public:** Free discovery, profiles, saves, interest, and **event notification** subscriptions (distinct from any **paid organizer plan**—label clearly in UI).
- **Organizers:** **Per-event listing** (e.g. **first event free** on that track) **and/or** **recurring organizer subscription** for high-volume hosts—exact tiers in PRD.
- **Later levers (illustrative):** Featured placement in digests (**P10**), family **premium** (**P9**), **affiliate**-tracked outbound links (**D9**), optional **native checkout**—none required to prove the **discovery + alerts** wedge ([`additional_notes2..md`](./additional_notes2..md)).

---

## 7. Strategic plan (phased)

This plan **aligns** the **product strategist roadmap** in [`ideas_envent.md`](./ideas_envent.md) with **engineering slices** in [`mvp-feature-list.md`](./mvp-feature-list.md) §7 and status in [`FEATURES.md`](./FEATURES.md).

### Phase 0 — Foundation (now)

- **Goal:** Runnable **stack** and **read-only discovery** proving list/detail/filter UX.
- **Deliverables:** Next.js + FastAPI + Supabase; public **events** API; seed data; CI/tests per [`testing-strategy.md`](./testing-strategy.md).
- **Exit criteria:** Stakeholders can **demo** browse and detail pages; engineering backlog is **ID-aligned**.

### Phase 1 — Validate the wedge (~6–10 weeks, MVP slice)

- **Goal:** **Post**, **browse**, **family profile**, **manual or semi-automated** notifications—**ideas** “Phase 1” ([`ideas_envent.md`](./ideas_envent.md)).
- **Product:** Organizer **verification** + **CRUD** (**Slice C** core); **Auth** + **saved preferences** + **dashboard matching** (**Slice B**); **email** (and policy for **WhatsApp**) for new matches (**A3–A7**); **interest** + aggregate counts (**readme** §C).
- **GTM:** **Nationwide** product; **marketing** may focus **one metro or community** for learning ([`business-idea.md`](./business-idea.md) §9).
- **Exit criteria:** Organizers can publish **verified** listings; families can **subscribe** and receive **relevant** alerts; **no** native payments.

### Phase 2 — Retention & supply depth

- **Goal:** **Automated** scoring and notification routing; richer **filters**; organizer **dashboard** polish and **O8** analytics.
- **Product:** **P4** Fit Score v1; **P6** immediate vs digest; **D10** culture chips; **O7** import (e.g. Eventbrite URL/API); **O8** views/clicks/leads.
- **Exit criteria:** Measurable **CTR** on registration links; organizers report **ROI** vs flyers/ad-hoc posts; repeat listing behavior.

### Phase 3 — Scale & monetization options

- **Goal:** Optional **ticketing/RSVP** on-platform **only if** strategy chooses; **featured** listings (**P10**); expand **geography** and **communities** with playbook.
- **Dependencies:** Legal/compliance for payments if added; ops for verification at volume; partner programs for **D9**.

### Cross-cutting

- **Trust & safety:** **T***, **AD*** queues, audit (**readme** admin section).
- **Tech:** [`tech-stack.md`](./tech-stack.md), [`DEVELOPMENT.md`](./DEVELOPMENT.md).

---

## 8. Success metrics (north star and early signals)

| Horizon | Examples |
|---------|----------|
| **North star (candidates)** | Organizer-attributed **registration link clicks** + **interest** from the platform; or **repeat listings** with positive self-reported fill rates. |
| **Early** | Verified organizers live; **subscriptions** created per active seeker; **notification** open/click rates; **time-to-first-published-event** after approval. |
| **Quality** | Report rate, verification **SLA**, support tickets per 1k MAU. |

Refine with pilot data ([`business-idea.md`](./business-idea.md) §10 for expanded tables).

---

## 9. Key risks (short list)

1. **Cold start** — Need **both** supply and demand in priority pockets; mitigate with **focused** outreach and **first event free**.
2. **Verification backlog** — Friction for good organizers; mitigate with **SLA**, clear status, optional **drafts** while pending.
3. **“Why pay without ticketing?”** — Mitigate with **transparent** funnel metrics and **comparison** to print/ad-hoc spend.
4. **Channel fatigue** — Mitigate with **digest** defaults and **score-based** throttling (**P6**).
5. **Scope creep** — **Checkout** and **heavy ML** deferred until **matching + alerts** are proven.

Full risk matrix: [`business-idea.md`](./business-idea.md) §12.

---

## 10. Immediate next decisions

1. **MVP channel mix:** Email-only vs **email + WhatsApp** for v1 (compliance and ops).
2. **Pricing:** Per-event fee schedule vs **subscription** tiers; definition of **“first event free.”**
3. **Launch geography (marketing):** Which metro or community **first** for **learning**, while product stays **US-wide**-ready.
4. **O8 “leads” definition:** What counts as a **lead** beyond clicks (e.g. contact intent, form—PRD).

---

## 11. Related documents

| Document | Role |
|----------|------|
| [`business-idea.md`](./business-idea.md) | Extended commercial brief, pricing detail, stakeholder asks |
| [`readme.md`](../readme.md) | PRD-style requirements, data model bullets, flows |
| [`ideas_envent.md`](./ideas_envent.md) | Strategist prompt: personas, five pillars, phased framing |
| [`idea_enhaced.md`](./idea_enhaced.md) | Personalization / “Netflix loop” vision |
| [`additional_notes2..md`](./additional_notes2..md) | Eventbrite symbiosis, illustrative revenue |
| [`FEATURES.md`](./FEATURES.md) | Engineering hub + implementation status |
| [`mvp-feature-list.md`](./mvp-feature-list.md) | Feature IDs, UI specs, MVP slices |
| [`DEVELOPMENT.md`](./DEVELOPMENT.md) | Local development and env |

---

*Update this document when phases complete, pricing is locked, or the north star metric is chosen.*
