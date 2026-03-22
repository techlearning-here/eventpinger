# Eventpinger — idea brief for the team

**Why this doc:** A short, shareable explanation of **what we’re building** and **why**, without engineering checklists or feature IDs. Use it to onboard teammates, align design and product, or kick off a discussion. **Deeper detail** for builders lives in [`readme.md`](../readme.md); **strategy and pricing** in [`business-idea.md`](./business-idea.md) and [`business-idea-and-plan.md`](./business-idea-and-plan.md).

---

## In one sentence

**We help families get notified about the right kids’ and cultural events in their neighborhood—based on a one-time family profile—while giving local organizers a trusted place to publish and reach matched audiences.** Registration and tickets stay on **their** existing tools (Eventbrite, a school portal, a Google form, etc.).

---

## The problem we see

**For parents and families**  
Small, local opportunities—dance classes, camps, temple festivals, language programs, after-school activities—are buried in **flyers, WhatsApp groups, school email, and Facebook**. Big event sites exist, but they often miss **recurring, hyper-local, culturally specific** listings. Even when listings exist, people **don’t keep checking**; they only hear about things **after** the fact.

**For organizers**  
Studios, cultural organizations, nonprofits, and camp hosts don’t always need “another checkout.” They need **distribution**: a **single listing**, a **shareable link**, and a way for **the right nearby families** to **discover** and **opt in to updates** when something new fits them. Today that marketing work is fragmented and hard to measure.

---

## What we’re building

**Eventpinger** is a **two-sided web product**:

1. **Organizers** post structured events (what it is, when, where, ages, price signal, culture/community tags, link to sign up or buy tickets). Before listings go **public**, organizer accounts go through **human verification** so families can trust what they see.

2. **Families and community members** can **browse and filter** without an account (location, categories, dates, tags—exact scope evolves with the MVP). When they **sign in** and save a **family profile** (kids’ ages, interests, cultural/community preferences, how far they’re willing to travel), they get a **personal view** and can turn on **notifications** (email first; WhatsApp and others as we add them) when **new** events match their profile.

3. The product **pings** people when there’s a **good match**, instead of relying on them to remember to search again.

**What we are not trying to replace on day one:** your credit card flow. We’re **not** the primary ticketing company. We’re the **discovery and alert layer** that sends interested people to the organizer’s **official** link.

---

## Who it’s for

| Who | Examples |
|-----|----------|
| **Families** | Parents with kids; anyone caring about **age-appropriate** and **culturally relevant** local activities. |
| **Organizers** | Dance schools, camps, temples, cultural nonprofits, after-school programs—anyone running **local** programs that need **reach**. |

---

## How the experience should feel

**Parent or community member**

- Land on a **clear** site: find events near you, filter by what matters (kids’ ages, categories, culture, free vs paid, dates).
- Optionally **sign in**, set up a **short family profile**, and choose **what to follow** and **how often** to hear from us (e.g. digest vs more immediate alerts when we support it).
- Get messages that feel **specific**: not “10 random events,” but “things that fit **your** kids and **your** community context.”
- Tap through to **register or get tickets** on the organizer’s own page.

**Organizer**

- Apply, get **verified**, then **create and manage** listings (draft, publish, update, hide or remove as we define in the product).
- See **simple stats**: who saw the listing, interest signals, clicks to the registration link—so they can tell if Eventpinger is working for them.

**Ops / trust**

- A **small admin** workflow to review organizers, handle reports, and keep categories and tags sensible as the catalog grows.

---

## How we’re different

- **Alerts over endless browsing** — The core idea is **notification** driven by **family context**, not only a passive directory.
- **Kids + culture** — We care explicitly about **children’s programming** and **cultural/community** alignment, not generic “stuff happening downtown.”
- **Complement ticketing platforms** — We’re **symbiotic** with Eventbrite-style tools: **discovery and matching** here; **checkout** there unless we deliberately expand later.
- **Trust on the supply side** — Verified organizers before **public** publishing, because the audience includes **families**.

---

## Phased direction (plain language)

We’re not shipping everything at once. Roughly:

1. **First** — Solid **browse + search + event pages**; organizers can **post** verified events; users can **save preferences** and get **email** when new matches appear (plus weekly-style digests where it makes sense).
2. **Next** — Smarter **ranking** (“recommended for your family”), richer **filters** (including community tags), **share** flows, **calendar export**, and better **organizer analytics** (including a careful **lead** view where privacy allows).
3. **Later** — Things like **push** notifications, **featured** paid placement, optional **RSVP/ticketing** on our side, **reviews**, and **multi-city** polish—only where the business and team are ready.

A month-by-month sketch of this layering is in [`mvp_features.md`](./mvp_features.md); engineering maps it to a detailed backlog in [`mvp-feature-list.md`](./mvp-feature-list.md).

---

## How we’ll know it’s working (early signals)

- Families **complete profiles**, turn on **notifications**, and **open** / **click through** to organizer links.
- Organizers **publish repeat** events and report **signups or interest** they attribute to us.
- **Low** trust-and-safety noise relative to growth (reports, bad listings).

We’ll pick one **north-star** metric (e.g. qualified clicks to organizer registration URLs) once we have real usage.

---

## Tech direction (for context)

**Next.js** (frontend), **FastAPI** (API), **Supabase** (database and auth—e.g. Google sign-in). Details: [`tech-stack.md`](./tech-stack.md) and [`DEVELOPMENT.md`](./DEVELOPMENT.md).

---

## Questions we expect from the team

**“Is this only for Indian / one community?”**  
No—the **product** is built for **any** U.S. local community; **marketing** might start focused where we learn fastest.

**“Why verify organizers?”**  
Family-facing listings and children’s activities need a **higher bar** than an open anonymous board.

**“Will we sell tickets?”**  
**Not** in the first validation phase. We **link out**. Native ticketing is a **possible** future bet, not the current wedge.

---

## Where to go deeper

| Topic | Document |
|--------|----------|
| Full product requirements (long) | [`readme.md`](../readme.md) |
| Business model, risks, stakeholders | [`business-idea.md`](./business-idea.md) |
| Vision + rollout phases | [`business-idea-and-plan.md`](./business-idea-and-plan.md) |
| Layered MVP / v1 / “plus” roadmap | [`mvp_features.md`](./mvp_features.md) |
| Engineering status + feature catalog | [`FEATURES.md`](./FEATURES.md) |

---

*Share this file as-is, or paste sections into slides. Update the one-sentence pitch here when positioning shifts.*
