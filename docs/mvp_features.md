You’ll want to plan features in three layers: must‑have MVP, strong v1.0, and later “plus” features.

Core MVP features (must have)
For parents/families
Sign up & family profile

Account creation (email / password, social login later).

Family profile: home zip, radius, kids’ ages/grades, interests (STEM, arts, music/dance, sports, language, religious, community), cultural/community tags (e.g., Indian Hindu, Tamil, Chinese).

Event browsing & search

Event feed filtered by: location (zip + radius), date, category, age range, free/paid, community/culture.

Basic search by keyword (e.g., “bharatanatyam,” “coding camp”).

Event detail page

Title, description, dates/times, age range, price/free, venue map, organizer info, tags.

Buttons: “Save,” “Share,” “I’m interested” (lead for organizer).

Subscriptions & notifications

Choose categories, communities, and radius to follow.

Email notifications for new matching events.

Weekly digest option.

For organizers
Organizer account

Simple sign up, basic profile (name, logo, org type, contact details, website).

Create & manage events

Event form: all structured fields (category, age, culture tags, schedule, venue, price, link).

Draft/publish, edit, unpublish.

See basic stats: views, “interested” count, clicks to external link.

Platform/admin
Admin dashboard

Approve/flag events, manage categories & tags, view overall stats.

Basic geo & email infrastructure

Zip + radius filtering.

Scheduled email job for notifications/digest.

Strong v1.0 features (next layer)
Better personalization
Recommendation ranking

Score events using distance, age match, interests, culture tags, time preferences.

Order the feed: “Recommended for your family.”

Smarter onboarding

After family profile, auto‑select suggested categories/tags (“Recommended for you”) with toggles.

UX improvements
Favorites & calendar

“Save” events and view them in a personal calendar view.

Export single event or saved list to Google/Apple calendar (link/ICS).

Social sharing

One‑click sharing (WhatsApp, SMS, email, copy link) to help organic growth.

Organizer value
Simple lead inbox

List of interested users (name/email) for each event.

Organizer profile page

Public page listing all their upcoming events and a short description.

“Plus” features (later, growth phase)
Mobile app + push notifications

Native or PWA for real‑time neighborhood alerts.

In‑app RSVP / lightweight ticketing

Free RSVPs and check‑in list.

Optional paid tickets with fees if/when you want that model.

Paid promotion

Featured events at top of feeds.

Promoted placement in weekly digests.

Reviews & ratings

Parents rating events/organizers (with moderation).

Multi‑city support

City selector, more complex geo handling.

Localization

Months 1–3: MVP – Validate the concept
Goal: Let organizers post events and parents get relevant email notifications based on location and simple preferences.

Product/UX
Landing page

Hero with your tagline.

Very simple “For Parents” and “For Organizers” explanation.

Email capture for early access.

Auth & basic accounts

Email/password login.

Roles: Parent, Organizer, Admin (flag on User).

Family profile (v1)

Fields: home zip, radius, kids’ ages/grades, 3–5 interest checkboxes (STEM, arts, music/dance, sports, language, religious).

Basic community tags: “Indian,” “Chinese,” “Korean,” “Jewish,” “No preference.”

Event model & posting

Event fields: title, description, category, age range, date/time, venue (address + city + zip), free/paid + simple price, external link, culture tags, organizer.

Organizer flow: sign up → create profile → create/edit/publish/unpublish event.

Event discovery (web)

Simple list view filtered by:

Zip + radius.

Date (today / this week / custom).

Category.

Age range.

Free vs paid.

Event detail page with shareable URL and “I’m interested” button.

Subscriptions & notifications (v1)

Parent chooses:

Followed categories.

Followed community tags.

Nightly batch email:

“New events near you that match your filters in last 24 hours.”

Tech
Stack decision and setup (React/Vue + Node/Express or Django/Rails, PostgreSQL).

Geo: simple radius filtering by zip (no need for complex geo yet).

Email: integrate provider (SendGrid/Mailgun/SES).

Admin:

Simple dashboard: list events, approve/disable, see user counts.

Validation activities
Seed 30–100 real events manually (Bay Area, your target niche).

Onboard 10–20 real organizers.

Collect metrics: signups, events posted, email open/click rates, organizer feedback.

Months 4–6: v1.0 – Personalization and value for organizers
Goal: Make discovery feel “for my family” and prove value to organizers.

Product/UX
Family profile (v2)

Add:

Second zip (e.g., work).

More granular time prefs (weekday evenings, weekend mornings/afternoons).

More specific cultural tags (e.g., Indian Hindu, Tamil, Telugu, Gujarati, etc.).

Recommendation & sorting (rule‑based)

Scoring for each event per user using:

Distance (zip + radius).

Age overlap with at least one child.

Shared interest categories.

Shared cultural tags.

Time preference match.

Use score to:

Order the event feed as “Recommended for your family.”

Decide which events go into notification emails.

Smarter onboarding

After creating family profile:

Screen: “We recommend these categories for your family” with toggles pre‑selected.

Quick explainer: “We’ll notify you only when we find good matches.”

Saved events & personal view

“Save”/favorite button on events.

“My Events” page: list of saved + “I’m interested” events.

Organizer value (v1)

Event stats:

Views.

“Interested” count.

Clicks on external link.

Organizer dashboard listing all their events with these metrics.

Tech
Implement scoring logic in backend (no ML, just weighted rules).

Improve email templates:

“New events for your family this week.”

“3 new events that match [child age group] within [radius].”

Growth experiments
Add share buttons (WhatsApp, SMS, email, copy link).

Manually partner with:

2–3 temples/cultural orgs.

3–5 after‑school centers/dance schools.

Track: leads reported by organizers (did they get signups from your site?).

Months 7–9: v1.5 – Stickiness and early monetization hooks
Goal: Increase repeat usage; prepare the ground for revenue.

Product/UX
Calendar integration

“Add to calendar” (Google/Apple/Outlook via ICS) for each event.

Optional “My calendar” view for saved/interested events.

Notification upgrades

Let users tune frequency:

Instantly.

Daily summary.

Weekly digest only.

Basic unsubscribe/notification center.

Organizer improvements

Lead inbox:

List of interested users with contact info (email; phone optional).

Organizer public profile page:

Logo, bio, website, and all upcoming events.

Basic monetization placeholders

Non‑functional “Featured” tag UI (for future paid placements).

Admin ability to mark an event as “Featured” for testing.

Tech
Performance tuning (indexes on event time, location, tags).

Better fraud/spam prevention (basic checks, report/flag event).

Market expansion prep
Evaluate data:

Top categories and communities.

Which events drive clicks and “Interested.”

Decide:

Next metro to pilot (e.g., another big city) or

Deeper penetration of Bay Area with more communities.

Months 10–12: v2.0 – Apps, monetization, and multi‑city
Goal: Turn a working product into a scalable business.

Product/UX
Mobile experience

Either:

Good PWA with push notifications.

Or lightweight native app (one platform first, likely iOS).

Push notifications

Event match → push: “New [category] event 2 miles away this weekend that fits [child age].”

Controls to avoid spamming (max per day, per week).

Monetization (v1)

Paid “Featured Event” option for organizers:

Higher placement in feeds.

Highlight in digest emails.

Simple pricing:

e.g., USD 19/event feature or USD 29–49/month organizer plan.

Multi‑city support

City/metro selector.

Admin tools to manage which cities are “live.”

Home page: show supported cities.

Tech
Billing integration (Stripe).

Role/permission tweaks for paid features.

Logging & analytics stack (Mixpanel/Amplitude or similar) to track funnels.

How to use this roadmap
Months 1–3: prove people care and organizers get leads.

Months 4–6: prove personalization works and users come back.

Months 7–9: make it sticky and prep for monetization.

Months 10–12: scale to more cities and turn it into a real business.

---

**Engineering mapping:** Canonical **feature IDs**, status, and how this file’s **MVP / v1 / plus** layers map to **D / A / O / T / AD / P** — [`mvp-feature-list.md`](./mvp-feature-list.md) (**§0.1**). Documentation hub: [`FEATURES.md`](./FEATURES.md).

