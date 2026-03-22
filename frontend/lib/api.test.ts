import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchHealth, getApiOrigin } from "./api";

describe("getApiOrigin", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses NEXT_PUBLIC_API_URL when set", () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.com/");
    expect(getApiOrigin()).toBe("https://api.example.com");
  });

  it("defaults to local FastAPI origin", () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    expect(getApiOrigin()).toBe("http://localhost:8000");
  });
});

describe("fetchHealth", () => {
  it("returns JSON on success", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: "ok" }),
    });

    await expect(fetchHealth("http://localhost:8000")).resolves.toEqual({
      status: "ok",
    });
    expect(globalThis.fetch).toHaveBeenCalledWith("http://localhost:8000/health", {
      cache: "no-store",
    });
  });

  it("throws when response is not ok", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    });

    await expect(fetchHealth("http://localhost:8000")).rejects.toThrow(
      "Health check failed: 503",
    );
  });
});
