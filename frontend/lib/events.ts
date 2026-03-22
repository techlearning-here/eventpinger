import { getApiOrigin } from "./api";

export type EventSummary = {
  id: string;
  title: string;
  slug: string;
  category: string;
  start_at: string;
  end_of_life_at: string;
  city: string | null;
  state: string | null;
  venue_name: string | null;
  latitude: number | null;
  longitude: number | null;
  price_label: string | null;
  registration_url: string | null;
  cover_image_url: string | null;
  description: string | null;
  organizer_display_name: string;
  interest_count: number;
  age_range_label: string | null;
};

export type EventDetail = EventSummary;

export async function fetchPublishedEvents(options?: {
  category?: string;
  /** Title substring search (backend `ilike`). */
  q?: string;
  /** Case-insensitive city substring (backend `ilike`). */
  city?: string;
  /** Case-insensitive state substring (backend `ilike`). */
  state?: string;
  /** Inclusive UTC calendar day (`YYYY-MM-DD`); event `start_at` must be on or after this day. */
  date_from?: string;
  /** Inclusive UTC calendar day (`YYYY-MM-DD`); event `start_at` must be on or before this day. */
  date_to?: string;
  origin?: string;
}): Promise<EventSummary[]> {
  const base = options?.origin ?? getApiOrigin();
  const url = new URL(`${base}/v1/events`);
  if (options?.category) {
    url.searchParams.set("category", options.category);
  }
  if (options?.q?.trim()) {
    url.searchParams.set("q", options.q.trim());
  }
  if (options?.city?.trim()) {
    url.searchParams.set("city", options.city.trim());
  }
  if (options?.state?.trim()) {
    url.searchParams.set("state", options.state.trim());
  }
  if (options?.date_from?.trim()) {
    url.searchParams.set("date_from", options.date_from.trim());
  }
  if (options?.date_to?.trim()) {
    url.searchParams.set("date_to", options.date_to.trim());
  }
  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load events: ${response.status}`);
  }
  const data = (await response.json()) as { items: EventSummary[] };
  return data.items;
}

export async function fetchEventBySlug(
  slug: string,
  origin: string = getApiOrigin(),
): Promise<EventDetail | null> {
  const response = await fetch(`${origin}/v1/events/by-slug/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to load event: ${response.status}`);
  }
  return response.json() as Promise<EventDetail>;
}
