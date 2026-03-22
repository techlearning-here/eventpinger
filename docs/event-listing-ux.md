# Event listing UX — plan (Eventeny + Eventbrite–informed)

**References:** [Eventeny](https://www.eventeny.com/) (community / intent chips, dense grid) and [Eventbrite](https://www.eventbrite.com/) (global **Find events** chrome, hero **search**, **All / Today / This weekend** time affordances, **category** pill row, **popular cities** links, light discovery shell). Eventpinger **does not** copy Eventbrite branding or ticketing UX; we **borrow layout and scan patterns** only.

Eventpinger is **local + family/community-first**, **link-out ticketing**, and **no vendor marketplace** in MVP.

**Feature context:** Discovery IDs **D1**–**D10** and implementation status — [`FEATURES.md`](./FEATURES.md), [`mvp-feature-list.md`](./mvp-feature-list.md) §1.

**Mobile-first:** Base layout and typography target **narrow viewports** first (`min-h-11` tap targets, full-width primary buttons, horizontal **snap** scrolling for category/time chips, `100dvh` + **safe-area** insets on the shell). **`sm` / `lg`** enhance spacing and multi-column grids.

---

## 1. What we adopt (MVP)

| Pattern (Eventeny-like) | Eventpinger implementation |
|-------------------------|----------------------------|
| **Hero + headline** | Light shell + **“Browsing events in …”** (location line) on `/events`; home hero **“Discover the best local events”** (Eventbrite-style headline weight). |
| **Search first** | White **card** with rounded search + primary button; **GET** `/events`; **city** / **state** / custom **dates** under **More filters**; preset **All / Today / This weekend** maps to `date_from` / `date_to` (UTC day bounds). |
| **Horizontal chips** | **Category** scroller: **All** + [`FEATURED_CATEGORIES`](../frontend/lib/featured-categories.ts); dark **active** pill (Eventbrite-like contrast). **When** row: **All**, disabled **For you** (placeholder), **Today**, **This weekend**. |
| **Card grid** | **Responsive grid**: image on top, **category** (muted uppercase), title, date/time, place, organizer, **interest** + price, **solid** primary CTA (**View details**)—aligned with readme fields. |
| **Trust / traction** | **Interest count** on every card (public social proof). Optional later: “New this week” section = sort/filter by `created_at` (not in MVP slice yet). |
| **Hosted on / branding** | Eventeny shows “Hosted on Eventeny”; we show **organizer display name** + optional **verified** badge later (T1). |

## 2. What we defer

- **Tabs:** Events vs Tickets vs Products vs Applications — **Events only** for now.  
- **Logged-in personalization** (“Top picks for you”) — needs A* profile data.  
- **Map-first layout** (D8) — add as second surface alongside grid.  
- **Paid placement** (“evTop picks” ads) — roadmap / featured listings.

## 3. Page structure (`/events`)

1. **Global header** — [`SiteHeader`](../frontend/components/SiteHeader.tsx): logo, **Find events**, **Create events** / **Sign in** (placeholders).  
2. **Hero band** — breadcrumb; **H1** “Browsing events in {place}”; subcopy.  
3. **Search card** — `q` + **Search**; hidden fields preserve `category`, `city`, `state`, `date_from`, `date_to` when set.  
4. **When** — pill links: **All**, **For you** (disabled), **Today**, **This weekend** ([`time-presets`](../frontend/lib/time-presets.ts)).  
5. **Category scroller** — merge browse params into chip URLs.  
6. **More filters** — `<details>`: city, state, from/to date + **Apply**.  
7. **Results + grid + empty state** — unchanged intent.

## 4. Data for design & demos

- **[`supabase/seed.sql`](../supabase/seed.sql)** — **~20 published** events across categories, geographies, and **Unsplash**-based `cover_image_url` placeholders for realistic thumbnails.  
- Reset local DB: `npx supabase db reset` (loads migrations + seed).

## 5. Success criteria (UX)

- User understands **where to search** and **how to narrow by category** in **&lt; 5 seconds**.  
- Cards answer **what / when / where / who** at a glance (D7).  
- **One tap** to **detail** and **register / tickets** link (D9).

---

*Revise when map view (D8) and personalization ship.*
