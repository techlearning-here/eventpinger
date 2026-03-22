import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventCard, eventToCardModel } from "./EventCard";

describe("eventToCardModel", () => {
  it("builds location from venue_name", () => {
    const m = eventToCardModel({
      title: "T",
      slug: "t",
      category: "C",
      start_at: "2030-01-01T12:00:00Z",
      city: "Austin",
      state: "TX",
      venue_name: "Zilker Park",
      organizer_display_name: "Org",
      interest_count: 1,
      price_label: "Free",
      cover_image_url: null,
    });
    expect(m.locationLine).toBe("Zilker Park");
  });

  it("falls back to city and state", () => {
    const m = eventToCardModel({
      title: "T",
      slug: "t",
      category: "C",
      start_at: "2030-01-01T12:00:00Z",
      city: "Dallas",
      state: "TX",
      venue_name: null,
      organizer_display_name: "Org",
      interest_count: 0,
      price_label: null,
      cover_image_url: null,
    });
    expect(m.locationLine).toBe("Dallas, TX");
  });
});

describe("EventCard", () => {
  it("renders title, organizer, interest count, and details link", () => {
    render(
      <EventCard
        event={{
          title: "Summer camp",
          slug: "summer-camp",
          category: "Camps",
          startAtIso: "2030-07-01T09:00:00.000Z",
          locationLine: "Austin, TX",
          organizerName: "Kids Co",
          interestCount: 12,
          priceLabel: "From $50",
          thumbnailUrl: null,
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: /summer camp/i })).toBeInTheDocument();
    expect(screen.getByText(/kids co/i)).toBeInTheDocument();
    expect(screen.getByText(/12 interested/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^details$/i })).toHaveAttribute(
      "href",
      "/events/summer-camp",
    );
  });
});
