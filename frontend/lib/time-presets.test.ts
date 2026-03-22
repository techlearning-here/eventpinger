import { describe, expect, it } from "vitest";

import {
  detectBrowseTimePreset,
  formatUtcYmd,
  thisWeekendRangeUtc,
  todayRangeUtc,
} from "./time-presets";

describe("formatUtcYmd", () => {
  it("formats UTC calendar date", () => {
    const d = new Date(Date.UTC(2030, 5, 9, 15, 30, 0));
    expect(formatUtcYmd(d)).toBe("2030-06-09");
  });
});

describe("todayRangeUtc", () => {
  it("returns same from and to for the UTC day", () => {
    const now = new Date(Date.UTC(2030, 5, 11, 12, 0, 0));
    expect(todayRangeUtc(now)).toEqual({ date_from: "2030-06-11", date_to: "2030-06-11" });
  });
});

describe("thisWeekendRangeUtc", () => {
  it("returns a Friday-through-Sunday span in UTC for a mid-week instant", () => {
    const now = new Date(Date.UTC(2030, 5, 11, 12, 0, 0));
    expect(thisWeekendRangeUtc(now)).toEqual({ date_from: "2030-06-14", date_to: "2030-06-16" });
  });

  it("returns the same span when the instant is already on that Friday UTC", () => {
    const now = new Date(Date.UTC(2030, 5, 14, 12, 0, 0));
    expect(thisWeekendRangeUtc(now)).toEqual({ date_from: "2030-06-14", date_to: "2030-06-16" });
  });

  it("maps Sunday to the preceding Friday–Sunday window", () => {
    const now = new Date(Date.UTC(2030, 5, 16, 12, 0, 0));
    expect(thisWeekendRangeUtc(now)).toEqual({ date_from: "2030-06-14", date_to: "2030-06-16" });
  });
});

describe("detectBrowseTimePreset", () => {
  it("detects all, today, weekend, custom", () => {
    const now = new Date(Date.UTC(2030, 5, 11, 12, 0, 0));
    const weekend = thisWeekendRangeUtc(now);
    expect(detectBrowseTimePreset(undefined, undefined, now)).toBe("all");
    expect(detectBrowseTimePreset("2030-06-11", "2030-06-11", now)).toBe("today");
    expect(detectBrowseTimePreset(weekend.date_from, weekend.date_to, now)).toBe("weekend");
    expect(detectBrowseTimePreset("2030-06-01", "2030-06-02", now)).toBe("custom");
  });
});
