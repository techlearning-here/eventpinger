const DEFAULT_API_ORIGIN = "http://localhost:8000";

export function getApiOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) {
    return DEFAULT_API_ORIGIN;
  }
  return raw.replace(/\/$/, "");
}

export type HealthResponse = {
  status: string;
};

export async function fetchHealth(origin: string = getApiOrigin()): Promise<HealthResponse> {
  const response = await fetch(`${origin}/health`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }
  return response.json() as Promise<HealthResponse>;
}
