import { describe, expect, it } from "vitest";

import { mergeBrowseParams } from "./browse-params";

describe("mergeBrowseParams", () => {
  it("returns href when preserve is missing", () => {
    expect(mergeBrowseParams("/events?category=Music")).toBe("/events?category=Music");
  });

  it("returns href when all preserved fields are blank", () => {
    expect(
      mergeBrowseParams("/events", {
        q: "  ",
        city: "",
        state: undefined,
        date_from: "",
        date_to: undefined,
      }),
    ).toBe("/events");
  });

  it("appends q city state to path without existing search", () => {
    expect(
      mergeBrowseParams("/events", { q: "yoga", city: "Austin", state: "TX" }),
    ).toBe("/events?q=yoga&city=Austin&state=TX");
  });

  it("merges with existing category on href", () => {
    expect(
      mergeBrowseParams("/events?category=Camps", { city: "Portland", state: "OR" }),
    ).toBe("/events?category=Camps&city=Portland&state=OR");
  });

  it("appends date_from and date_to", () => {
    expect(
      mergeBrowseParams("/events", {
        date_from: "2030-01-01",
        date_to: "2030-01-31",
      }),
    ).toBe("/events?date_from=2030-01-01&date_to=2030-01-31");
  });
});
