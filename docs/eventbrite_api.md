Family Event Radar API Integration Guide

**Manual access tests (curl, TC checklist, field mapping):** [`eventbrite_api_testing.md`](./eventbrite_api_testing.md).  
**Heads-up:** Legacy **`GET /v3/events/search/`** is **not** reliable (often **404** / deprecated). Prefer **event-by-id** import and **organization**/**owned** event lists — see testing doc **§1**.

---

Yes, Eventbrite provides a public API (v3 at https://www.eventbrite.com/platform/api) that can support your "notice board + Eventbrite complement" strategy when you use **supported** endpoints and a valid **Bearer** token.

Eventbrite API Capabilities for Your Platform
✅ Core Endpoints You Need
text
GET /v3/events/{event_id}/ → Full event details (title, date, venue, description)
GET /v3/events/search/ → Discover events by location, category, date range
GET /v3/organizations/{org_id}/events/ → Organizer's event list
GET /v3/venues/{venue_id}/ → Venue details for geofencing
✅ Your Integration Flow
text
1. Organizer pastes Eventbrite URL → Extract event_id from URL
2. API call → Pull event data → Auto-populate your form
3. Organizer adds "Family Tags" → Your platform stores enhanced metadata
4. Your matching engine → Distribute to matching families
5. User clicks → Affiliate Eventbrite checkout link
Sample Implementation
Step 1: Get OAuth Token (Private app)

text
curl -X POST https://www.eventbriteapi.com/v3/auth/oauth2/token/ \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_APP_KEY" \
  -d "client_secret=YOUR_APP_SECRET"
Step 2: Import Event

javascript
// Paste Eventbrite URL: https://www.eventbrite.com/e/my-event-123456789
const eventId = "123456789";
fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/`, {
  headers: {
    'Authorization': 'Bearer YOUR_OAUTH_TOKEN'
  }
})
.then(r => r.json())
.then(event => {
  // Auto-fill your form
  form.title = event.name.text;
  form.date = event.start.local;
  form.venue = event.venue.address.localized_area_display;
  form.eb_url = event.url; // Affiliate tracking
});
Step 3: Enhanced Family Metadata

json
{
  "eventbrite_id": "123456789",
  "family_tags": ["kids_5_12", "cultural", "budget_friendly"],
  "family_fit_score": 92,
  "radius_match": true
}
Key Benefits of This Approach
Your Platform	Eventbrite	Win
One-click import	Manual entry	30s vs 5min
Family intelligence	Generic listing	10x targeting
Notice board reach	Marketplace noise	Perfect matches
No ticketing risk	Handles payments	You focus on discovery
Rate Limits & Costs
Free tier: 1,000 calls/day (ample for MVP)

Paid: $0.10/1k calls beyond limit

Public events: No auth needed for basic search
​

Quick Start
text
1. Sign up Eventbrite → Account Settings → Developer Links → API Keys
2. Create "Family Event Radar" app → Get OAuth credentials
3. Test: https://www.eventbriteapi.com/v3/events/search/?location.address=San+Francisco
4. Build "Import Eventbrite Event" button
Updated Positioning Doc
text
**Tagline**: "Eventbrite events. Family-smart matching."

**Flow**:
Organizer: "Import my Eventbrite show → Add family tags → FREE family distribution"
Family: "Daily: '5 perfect matches within 20mi → Buy on Eventbrite'"

**Revenue**:
- Organizer: $29/mo featured placement
- Affiliate: 5% Eventbrite referral
- Families: $4.99/mo premium radar
This is pure symbiosis—Eventbrite gets more ticket sales, you own the family matching moat, organizers get targeted reach. Launch-ready architecture.

