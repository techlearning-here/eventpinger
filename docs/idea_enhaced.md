**Engineering feature map:** [`FEATURES.md`](./FEATURES.md) (status + schema vs **P***); [`mvp-feature-list.md`](./mvp-feature-list.md) (§2.3 **P***, §2.5 Eventbrite symbiosis, §9 vision summary); GTM narrative [`additional_notes2..md`](./additional_notes2..md).

---

Overview
A Netflix-inspired platform where users complete a one-time family profile at sign-up. This persistent configuration—family demographics + event categories + geofence—powers automatic, hyper-personalized event discovery for all future matches. No re-entry needed; users return for fresh suggestions.
​

Core Promise: "Set your family's vibe once. Get perfect events forever."

One-Time Onboarding Profile
Duration: 90 seconds max.

Section	Questions	Example Inputs
Family	Ages of household members? Group size?	"2 adults, kids 5&8, teen 14"
Location	Home base + alert radius?	"SF, CA - 25 miles"
Categories	Top 5 interests?	"Malayalam music, tech meetups, family hikes, Disney events, cultural festivals"
Budget	Max per ticket/person?	"$0-50 free/low-cost"
Frequency	Notification cadence?	"Weekly digest + urgent matches"
UI Flow: Gamified quiz → "Meet the [FamilyName] Crew!" profile card → Instant first recommendations.

Matching Engine
Netflix-Style Inputs:

Explicit: Family profile data.

Implicit: Clicks, purchases, past attendance.

Contextual: Time, weather, local trends.

Output: 5-10 events ranked by "Family Fit Score™" (0-100).

Sample Matches:

text
Family: SF • Kids 5&8 • Cultural + Hikes
→ "Malayalam Folk Festival (All Ages)" – 8mi – Free
→ "Family Nature Walk + Live Music" – 12mi – $10
→ "Disney Trivia Night (Kid Zone)" – 20mi – $15
Notification System
Persistent & Proactive (beyond Eventbrite's reactive reminders):

Cadence	Channel	Content
Daily Digest	Push/Email	"3 new matches for your family today"
Geofence Breach	Push	"Malayalam concert just opened 10mi away!"
Urgent	SMS	"Last 5 tickets: Kid-friendly hike tomorrow"
Weekly Recap	Email	"Top 10 family events this month"
Evolution: Profile auto-refines (e.g., "Loves hikes → prioritize outdoors") but family core stays fixed.

Key Differentiators vs. Eventbrite
Feature	Eventbrite	FamilyEvent Netflix
Setup	Per-session filters	One-time family profile
Personalization	Past buys + broad interests	Household demographics + categories
Geofencing	Search radius only	Persistent subscription alerts
Matching	Individual-focused	Family-optimized scoring
Notifications	Transactional reminders	Daily habit-forming digests
Retention	One-off discovery	Endless "just for us" loop
Technical Implementation
text
User Signs In → Profile Quiz → Store JSON:
{
  "family": {"adults":2, "kids":[5,8], "teens":[14]},
  "geo": {"center":"37.7749,-122.4194", "radius_mi":25},
  "categories": ["cultural", "tech", "family_hikes"],
  "budget_max": 50
}

New Event Arrives → Match Against All Profiles → 
IF score > 80 → Queue Notification
Data Flywheel: More families → richer matching → stickier platform.

Privacy & Trust
Opt-In Only: "Share family info for better matches?"

Anonymized: No names/demographics shared with organizers.

Control: Edit profile anytime - Pause notifications - Delete data.

Compliance: GDPR/CCPA-ready.

Business Model Fit
Freemium: Basic matches free; premium = unlimited radius + priority alerts.

Organizer Revenue: Featured placement in family digests (not forced ads).

Stickiness: Daily habit > transactional ticketing.

This family event Netflix solves Eventbrite's weak personalization while creating shared household valu