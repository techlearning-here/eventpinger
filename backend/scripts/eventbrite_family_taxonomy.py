"""
Curated Eventbrite subcategories for Eventpinger (family / community discovery).

Used by `eventbrite_list_events.py export-categories-csv --family`.
Adjust sets here when PRD expands (e.g. add Food & Drink beer/wine for adult-forward listings).

Eventbrite category ids reference:
https://www.eventbrite.com/platform/api
"""

from __future__ import annotations

# Every subcategory under these parents is included.
FAMILY_FULL_PARENT_CATEGORY_IDS: frozenset[str] = frozenset(
    {
        "105",  # Performing & Visual Arts
        "107",  # Health & Wellness
        "108",  # Sports & Fitness
        "109",  # Travel & Outdoor
        "111",  # Charity & Causes
        "113",  # Community & Culture
        "114",  # Religion & Spirituality
        "115",  # Family & Education
        "116",  # Seasonal & Holiday
        "120",  # School Activities
    }
)

# Food & Drink — default: food-forward + other (exclude pure alcohol subtypes for kid-first browse).
FAMILY_FOOD_SUBCATEGORY_IDS: frozenset[str] = frozenset({"10003", "10999"})

# Film, Media & Entertainment — drop “Adult”.
FAMILY_FILM_EXCLUDED_SUBCATEGORY_IDS: frozenset[str] = frozenset({"4006"})

# Hobbies & Special Interest — drop “Adult”.
FAMILY_HOBBIES_EXCLUDED_SUBCATEGORY_IDS: frozenset[str] = frozenset({"19007"})

# Music — drop club / heavy EDM / mosh-pit skew (tunable).
FAMILY_MUSIC_EXCLUDED_SUBCATEGORY_IDS: frozenset[str] = frozenset(
    {
        "3006",  # EDM / Electronic
        "3011",  # Metal
        "3023",  # DJ/Dance
        "3024",  # EDM
        "3025",  # Electronic
        "3028",  # Psychedelic
        "3029",  # Punk/Hardcore
    }
)

# Science & Technology — STEM / tech culture; omit professional medicine/biotech defaults.
FAMILY_SCIENCE_SUBCATEGORY_IDS: frozenset[str] = frozenset(
    {
        "2002",  # Science
        "2004",  # High Tech
        "2005",  # Mobile
        "2006",  # Social Media
        "2007",  # Robotics
        "2999",  # Other
    }
)

# Business & Professional — community / learning skew only.
FAMILY_BUSINESS_SUBCATEGORY_IDS: frozenset[str] = frozenset(
    {
        "1003",  # Environment & Sustainability
        "1004",  # Educators
        "1006",  # Non Profit & NGOs
        "1999",  # Other
    }
)

# Home & Lifestyle — omit dating.
FAMILY_HOME_SUBCATEGORY_IDS: frozenset[str] = frozenset(
    {
        "17002",  # Pets & Animals
        "17003",  # Home & Garden
        "17999",  # Other
    }
)


def is_family_suitable_subcategory(parent_category_id: str, subcategory_id: str) -> bool:
    pid = str(parent_category_id).strip()
    sid = str(subcategory_id).strip()
    if not pid or not sid:
        return False
    if pid in FAMILY_FULL_PARENT_CATEGORY_IDS:
        return True
    if pid == "110":
        return sid in FAMILY_FOOD_SUBCATEGORY_IDS
    if pid == "104":
        return sid not in FAMILY_FILM_EXCLUDED_SUBCATEGORY_IDS
    if pid == "119":
        return sid not in FAMILY_HOBBIES_EXCLUDED_SUBCATEGORY_IDS
    if pid == "103":
        return sid not in FAMILY_MUSIC_EXCLUDED_SUBCATEGORY_IDS
    if pid == "102":
        return sid in FAMILY_SCIENCE_SUBCATEGORY_IDS
    if pid == "101":
        return sid in FAMILY_BUSINESS_SUBCATEGORY_IDS
    if pid == "117":
        return sid in FAMILY_HOME_SUBCATEGORY_IDS
    return False
