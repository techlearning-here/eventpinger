**Eventpinger — product one-liner (canonical):** *Get notified about the right kids’ and cultural events in your neighborhood, based on your family profile.*

---

You are an expert product strategist, UX designer, and full‑stack engineer.

I want to build a web platform with the following idea and market context:

Parents and families struggle to find small, hyper‑local events like dance classes, summer camps, after‑school programs, community gatherings, and cultural/religious events.

Today, these are scattered: flyers at grocery stores, WhatsApp groups, school emails, temple/church bulletins, local Facebook groups, niche blogs, and a few big platforms (like Eventbrite) that don’t surface many of these small, recurring, or highly local offerings well.

My product focuses on:

Kids’ classes, camps, after‑school activities

Community gatherings and cultural/religious events (for example, Indian Hindu festivals and language/music/dance programs in the USA)

Local musical and arts events

Organizers (temples, cultural schools, small studios, local nonprofits, after‑school providers) can post events easily.

Families create a family profile (kids’ ages, cultural/community identity, interests, preferred times, location/radius).

The system uses that family profile to:

Suggest default event categories to follow

Recommend relevant events

Send notifications (email/push) when new matching events are posted near them.

The main theme is “notify me of the right events for my family and community.”

Your tasks:

Clarify and refine the product concept

Summarize the core value proposition in 1–2 sentences.

Define 2–3 primary user personas:

Parent/family user

Local/community organizer (e.g., dance teacher, camp organizer, temple/cultural organizer)

List their main pains today and how this product solves them.

Turn this into a clear product spec

Write a concise Product Requirements Document (PRD) for an MVP, including:

Problem statement

Goals and non‑goals

User stories for parents and organizers

Core features:

Event creation & management

Family profile & demographics

Event discovery & filters

Subscriptions & notifications

Basic analytics for organizers (views, clicks, leads)

Design the data model and recommendation logic

Propose entities/tables (e.g., User, FamilyProfile, Child, Organizer, Event, Category, CommunityTag, Subscription, Notification).

List key fields and relationships for each entity.

Describe a simple, rule‑based recommendation and notification logic that uses:

Location (zip + radius)

Kids’ ages / grade ranges

Interests (STEM, arts, sports, music/dance, language, religious, community)

Cultural/community tags (e.g., Indian Hindu, Tamil, Gujarati, Chinese, Korean, Jewish, etc.)

Preferred times (weekday evenings, weekend mornings/afternoons, school breaks)

Explain how this logic:

Suggests default categories and tags to follow at signup

Ranks events in the feed

Decides which new events should trigger immediate notifications vs only appear in a digest.

Outline UX flows

Parent flow:

Sign up → create family profile → see suggested categories & community tags to follow → view personalized event feed → manage notifications.

Organizer flow:

Sign up → create organizer profile → create first event (with proper categories, community tags, age ranges, and location) → share event link → see basic stats.

Implementation guidance

Recommend a realistic tech stack for a small team (frontend, backend, database, auth, email/notification service).

Suggest a 6–10 week MVP roadmap split into phases:

Phase 1: Barebones posting, browsing, family profile, manual notifications

Phase 2: Automated recommendations/notifications, better filters, organizer dashboard

Phase 3: Optional extras (ticketing/RSVP, paid featured listings, more communities/cities)

Please respond with a structured, step‑by‑step plan (headings, bullet points) that a developer team can immediately start implementing.