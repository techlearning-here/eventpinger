/** MVP D4 — homepage / browse chips (align with readme + additional_notes). */
export const FEATURED_CATEGORIES = [
  "Kids Classes",
  "Camps",
  "After-School",
  "Festivals",
  "Music",
  "Religious/Cultural",
  "Community Gatherings",
] as const;

export type FeaturedCategory = (typeof FEATURED_CATEGORIES)[number];
