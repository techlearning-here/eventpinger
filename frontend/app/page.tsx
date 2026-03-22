import Link from "next/link";

import { fetchHealth, getApiOrigin } from "@/lib/api";
import { mergeBrowseParams } from "@/lib/browse-params";
import { FEATURED_CATEGORIES } from "@/lib/featured-categories";
import { POPULAR_CITY_DESTINATIONS } from "@/lib/popular-destinations";
import { thisWeekendRangeUtc, todayRangeUtc } from "@/lib/time-presets";

export default async function Home() {
  const now = new Date();
  const today = todayRangeUtc(now);
  const weekend = thisWeekendRangeUtc(now);

  let apiStatus: "ok" | "down" = "down";
  try {
    const health = await fetchHealth();
    apiStatus = health.status === "ok" ? "ok" : "down";
  } catch {
    apiStatus = "down";
  }

  return (
    <div className="bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <main className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[1.65rem] font-bold leading-snug tracking-tight text-zinc-900 sm:text-3xl sm:leading-tight lg:text-4xl dark:text-zinc-50">
            Get notified about the right kids’ and cultural events in your neighborhood, based on
            your family profile.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 sm:mt-4 sm:text-lg dark:text-zinc-400">
            Classes, camps, festivals, and gatherings near you — matched to ages and community
            context. Browse the catalog anytime; sign in for alerts (email / WhatsApp — coming soon).
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-4 shadow-md sm:mt-10 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <form action="/events" method="get" className="space-y-4" role="search">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <label htmlFor="home-search" className="sr-only">
                Search events
              </label>
              <input
                id="home-search"
                type="search"
                name="q"
                placeholder="Search events, venues, or topics"
                enterKeyHint="search"
                className="min-h-12 w-full min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:bg-zinc-900"
              />
              <button
                type="submit"
                className="touch-manipulation inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl bg-zinc-900 px-6 text-base font-semibold text-white hover:bg-zinc-800 active:bg-zinc-950 sm:w-auto sm:px-8 sm:text-sm dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:active:bg-zinc-200"
              >
                Search
              </button>
            </div>
            <div
              className="scrollbar-thin -mx-1 flex snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
              aria-label="Time range"
            >
              <Link
                href="/events"
                className="touch-manipulation inline-flex min-h-11 snap-start items-center justify-center rounded-full bg-zinc-100 px-4 text-sm font-semibold whitespace-nowrap text-zinc-800 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                All dates
              </Link>
              <Link
                href={mergeBrowseParams("/events", today)}
                className="touch-manipulation inline-flex min-h-11 snap-start items-center justify-center rounded-full bg-zinc-100 px-4 text-sm font-semibold whitespace-nowrap text-zinc-800 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Today
              </Link>
              <Link
                href={mergeBrowseParams("/events", weekend)}
                className="touch-manipulation inline-flex min-h-11 snap-start items-center justify-center rounded-full bg-zinc-100 px-4 text-sm font-semibold whitespace-nowrap text-zinc-800 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                This weekend
              </Link>
            </div>
          </form>
        </div>

        <div className="mx-auto mt-10 max-w-5xl sm:mt-12">
          <p className="text-sm font-semibold tracking-wide text-zinc-500 uppercase sm:text-center dark:text-zinc-400">
            Popular categories
          </p>
          <div className="scrollbar-thin mt-3 flex snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto pb-3 sm:mt-4 sm:justify-center sm:overflow-x-visible sm:pb-2">
            {FEATURED_CATEGORIES.slice(0, 10).map((c) => (
              <Link
                key={c}
                href={`/events?category=${encodeURIComponent(c)}`}
                className="touch-manipulation inline-flex min-h-11 shrink-0 snap-start items-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-14">
          <h2 className="text-base font-bold text-zinc-900 sm:text-lg dark:text-zinc-50">
            Popular cities
          </h2>
          <ul className="mt-3 space-y-1 text-base sm:mt-4 sm:columns-2 sm:gap-x-8 sm:text-sm lg:columns-3">
            {POPULAR_CITY_DESTINATIONS.map(({ city, state }) => {
              const href = mergeBrowseParams("/events", { city, state });
              return (
                <li key={`${city}-${state}`} className="break-inside-avoid py-1 sm:py-0">
                  <Link
                    href={href}
                    className="touch-manipulation inline-flex min-h-11 items-center text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline active:text-zinc-950 sm:min-h-0 dark:text-zinc-300 dark:hover:text-zinc-100"
                  >
                    Things to do in {city}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className="mx-auto mt-12 max-w-3xl rounded-xl border border-zinc-200 bg-white p-4 sm:mt-14 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
          aria-label="Development status"
        >
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">API</h2>
          <p className="mt-2 text-lg font-medium">
            {apiStatus === "ok" ? (
              <span className="text-emerald-600 dark:text-emerald-400">Connected</span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400">
                Not reachable — start FastAPI{" "}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                  uvicorn app.main:app --reload --port 8000
                </code>
              </span>
            )}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Base URL: <code className="text-zinc-700 dark:text-zinc-300">{getApiOrigin()}</code>
          </p>
          <p className="mt-4">
            <Link
              href="/events"
              className="touch-manipulation inline-flex min-h-11 items-center text-sm font-semibold text-zinc-900 underline-offset-4 hover:underline sm:min-h-0 dark:text-zinc-100"
            >
              Browse all events →
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
