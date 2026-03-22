# Additional notes — Family Event Radar & Eventbrite symbiosis

**Engineering IDs:** [`mvp-feature-list.md`](./mvp-feature-list.md) (**O7**, **O8**, **P9**/**P10**, **D9** affiliate note, attendee dashboard §2.1). **Status + schema:** [`FEATURES.md`](./FEATURES.md).

---

## Positioning

**Framing:** A **family-focused event notice board** that **complements** Eventbrite (and similar)—not a head-to-head ticketing competitor. Organizers **post once** on Eventpinger (or **import** via Eventbrite), and **Netflix-style matching** makes listings hyper-reachable to the right families. **Amplification**, not replacement.

**Working name / narrative:** **Family Event Radar**

**Core idea (owner):** ***Get notified about the right kids’ and cultural events in your neighborhood, based on your family profile.***

**Tagline:** *Every event finds its family. Every family finds its events.*

---

## Dual revenue model (illustrative — lock in PRD)

| Side | Shape (example from brainstorm) |
|------|----------------------------------|
| **Organizers** | Free listing → paid **featured placement** in family digests (e.g. **$29/mo** tier—**P10**) |
| **Families** | Free basic → **premium** (e.g. **$4.99/mo**: larger/unlimited radius + **SMS** alerts—**P9** + **P6**) |

**Stakeholder win-win**

| Stakeholder | Value |
|-------------|--------|
| **Organizers** | Free reach to targeted families + keep ticketing on Eventbrite (or their link) |
| **Families** | Strong matches without browsing generic marketplace noise |
| **Eventbrite** | More traffic via **affiliate** or partner links where applicable |
| **Platform** | Retention (families) + organizer subscriptions / placement |

---

## Flows

### Organizer

1. **Quick post** — Event basics + **family-facing tags** (e.g. kids 5–12, cultural, budget-friendly), **O1** “Family Smart Post” wizard.
2. **Import from Eventbrite** — Paste **public event URL** (or API/OAuth when ready) → auto-populate fields + **add family metadata** before publish (**O7**).
3. **On Eventpinger** — Notice-board listing + **family-smart** distribution (matching + digests).
4. **Ticketing** — Remains on Eventbrite (or organizer’s URL); outbound CTA **tracks** affiliate when enrolled (**D9**).

### User (one-time setup)

**Sign-up** → **family profile** (ages + categories + radius, e.g. 25 mi) → **daily** (or digest): *“5 perfect events for your crew this week”* → click → **checkout on Eventbrite** (affiliate where applicable).

---

## Key product surfaces (map to MVP list)

1. **Notice-board / radar dashboard (signed-in)** — Feed such as *“{City} family events this weekend”*; **Family Fit Score™** on cards when **P4** ships; **Buy tickets** → external; filters: **my radius**, **my categories**, **budget** (extends §2.1 attendee dashboard).
2. **Organizer “superpowers”** — **Who’s this for?** (0–5 / 6–12 / teens / adults); **Event vibe?** (cultural, tech, outdoor, music, …); **auto-tags** + optional **score preview** for likely family match; **O7** import/export path with Eventbrite; **O8** analytics (*e.g. N families saw, M clicked ticket link*—aggregates only).
3. **Family radar engine** — Persistent profile → matching → smart notifications; sample push-style copy: *“Malayalam Music Fest + Kid Zone — 8 mi away • Tomorrow • Free • 95% Family Fit™”* (**P6** channel mix when push/SMS ship).

---

## Technical integration (roadmap)

- **Eventbrite API** (or URL scrape MVP) → ingest public events → **attach family metadata** in our schema.
- **Matching** → notify / digest to eligible profiles.
- **Click-through** → Eventbrite checkout with **affiliate / partner tracking** (compliance + program enrollment TBD).

**Messaging (draft)**

- **Organizers:** *Post free. Reach perfect families. Sell more tickets.*
- **Families:** *Your family’s personal event scout. No browsing required.*

---

## Phased monetization (planning example — not committed)

| Phase | Idea |
|-------|------|
| **Month 1** | Free for all — network effect |
| **Month 3** | Organizers pay for **featured** digest placement |
| **Month 6** | Family **premium** (radius + SMS, etc.) |
| **Month 12** | Affiliate + organizer subs at scale |

**Principle:** Eventpinger is **infrastructure for family event discovery**; checkout stays on the organizer’s stack (**symbiosis** with Eventbrite). Differentiation is **matching**, not the cart.
