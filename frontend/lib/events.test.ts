import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchEventBySlug, fetchPublishedEvents } from "./events";

describe("fetchPublishedEvents", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns items from API", async () => {
    const items = [
      {
        id: "1",
        title: "Camp",
        slug: "camp",
        category: "Camps",
        start_at: "2030-01-01T10:00:00Z",
        end_of_life_at: "2030-12-31T23:59:59Z",
        city: "Austin",
        state: "TX",
        venue_name: null,
        latitude: null,
        longitude: null,
        price_label: "Free",
        registration_url: null,
        cover_image_url: null,
        description: null,
        organizer_display_name: "Org",
        interest_count: 5,
        age_range_label: null,
      },
    ];
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items }),
    });

    await expect(fetchPublishedEvents({ origin: "http://localhost:8000" })).resolves.toEqual(items);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/v1/events",
      expect.any(Object),
    );
  });

  it("passes category query param when set", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await fetchPublishedEvents({ origin: "http://localhost:8000", category: "Music" });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/v1/events?category=Music",
      expect.any(Object),
    );
  });

  it("passes search q when set", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await fetchPublishedEvents({ origin: "http://localhost:8000", q: "jazz" });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/v1/events?q=jazz",
      expect.any(Object),
    );
  });

  it("passes city and state when set", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await fetchPublishedEvents({
      origin: "http://localhost:8000",
      city: "Austin",
      state: "TX",
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/v1/events?city=Austin&state=TX",
      expect.any(Object),
    );
  });

  it("passes date_from and date_to when set", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await fetchPublishedEvents({
      origin: "http://localhost:8000",
      date_from: "2030-06-01",
      date_to: "2030-06-30",
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/v1/events?date_from=2030-06-01&date_to=2030-06-30",
      expect.any(Object),
    );
  });

  it("omits blank city and state", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await fetchPublishedEvents({
      origin: "http://localhost:8000",
      city: "  ",
      state: "",
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/v1/events",
      expect.any(Object),
    );
  });
});

describe("fetchEventBySlug", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns null on 404", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    await expect(fetchEventBySlug("missing", "http://localhost:8000")).resolves.toBeNull();
  });

  it("returns event JSON on success", async () => {
    const event = {
      id: "1",
      title: "Fair",
      slug: "fair",
      category: "Festivals",
      start_at: "2030-01-01T10:00:00Z",
      end_of_life_at: "2030-12-31T23:59:59Z",
      city: null,
      state: null,
      venue_name: null,
      latitude: null,
      longitude: null,
      price_label: null,
      registration_url: "https://example.com",
      cover_image_url: null,
      description: "Details",
      organizer_display_name: "Host",
      interest_count: 0,
      age_range_label: null,
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(event),
    });
    await expect(fetchEventBySlug("fair", "http://localhost:8000")).resolves.toEqual(event);
  });
});
