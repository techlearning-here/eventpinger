import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/**
 * Browser-only Supabase client. Returns null when env is not configured (e.g. before a Supabase project exists).
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (typeof window === "undefined") {
    return null;
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) {
    return null;
  }
  if (!browserClient) {
    browserClient = createClient(url, key);
  }
  return browserClient;
}
