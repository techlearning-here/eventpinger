# Eventbrite subcategories — family/community lens (Eventpinger)

Eventbrite’s taxonomy is **generic** (nightlife, business, etc.). For **family and community discovery**, we keep a **curated subset of subcategory IDs** so imports, filters, and future matching can align with product positioning without hand-picking from 200+ labels every time.

## Source of truth (code)

Rules live in **[`backend/scripts/eventbrite_family_taxonomy.py`](../backend/scripts/eventbrite_family_taxonomy.py)**:

| Rule | Meaning |
|------|--------|
| **Full parent include** | Every subcategory under these Eventbrite **parent** categories is included: **Family & Education**, **School Activities**, **Seasonal & Holiday**, **Charity & Causes**, **Religion & Spirituality**, **Community & Culture**, **Performing & Visual Arts**, **Sports & Fitness**, **Health & Wellness**, **Travel & Outdoor**. |
| **Food & Drink** | Only **Food** and **Other** (excludes dedicated Beer / Wine / Spirits subtypes by default — widen in code if you want festival beer gardens). |
| **Film & Media** | All subcategories except **Adult**. |
| **Hobbies** | All except **Adult**. |
| **Music** | Excludes a short list skewed to **club / heavy EDM / mosh** (tunable). |
| **Science & Tech** | STEM / tech culture slice; omits professional **Medicine** / **Biotech** defaults. |
| **Business** | **Environment**, **Educators**, **Nonprofit**, **Other** only. |
| **Home & Lifestyle** | **Pets**, **Home & Garden**, **Other** (no **Dating**). |

**Omitted by default:** **Government & Politics**, **Fashion & Beauty**, **Auto, Boat & Air**, top-level **Other** (no subcategories) — add in taxonomy if PRD requires.

## Generated CSV (repo)

Regenerate after changing rules (needs `EVENTBRITE_PRIVATE_TOKEN`):

```bash
cd backend
python scripts/eventbrite_list_events.py export-categories-csv --family \
  -o data/eventbrite_family_subcategories.csv
```

Committed snapshot: **[`backend/data/eventbrite_family_subcategories.csv`](../backend/data/eventbrite_family_subcategories.csv)** (subcategory rows only). Each row includes **`main_category_id`** and **`main_category_name`** (Eventbrite top-level category, e.g. Music, Family & Education) alongside the subcategory `id` / `name`.

## Mapping to Eventpinger chips

[`frontend/lib/featured-categories.ts`](../frontend/lib/featured-categories.ts) is **not** 1:1 with Eventbrite. For **O7** import, plan a small mapping table (EB `subcategory_id` → internal tag or `FEATURED_CATEGORIES` label) in the backend when you persist events.

---

*Taxonomy IDs are defined by Eventbrite; re-run export periodically if they add categories.*
