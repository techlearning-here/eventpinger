import Link from "next/link";

import { EventCard, eventToCardModel } from "@/components/EventCard";
import { mergeBrowseParams, type BrowsePreserveParams } from "@/lib/browse-params";
import { FEATURED_CATEGORIES } from "@/lib/featured-categories";
import { fetchPublishedEvents } from "@/lib/events";
import {
  detectBrowseTimePreset,
  thisWeekendRangeUtc,
  todayRangeUtc,
} from "@/lib/time-presets";

type EventsPageProps = {
  searchParams: Promise<{
    category?: string;
    q?: string;
    city?: string;
    state?: string;
    date_from?: string;
    date_to?: string;
  }>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const now = new Date();
  const { category, q, city, state, date_from, date_to } = await searchParams;
  const query = q?.trim() || undefined;
  const cityFilter = city?.trim() || undefined;
  const stateFilter = state?.trim() || undefined;
  const dateFromFilter = date_from?.trim() || undefined;
  const dateToFilter = date_to?.trim() || undefined;
  const events = await fetchPublishedEvents({
    category,
    q: query,
    city: cityFilter,
    state: stateFilter,
    date_from: dateFromFilter,
    date_to: dateToFilter,
  });
  const preserveBrowse: BrowsePreserveParams = {
    q: query,
    city: cityFilter,
    state: stateFilter,
    date_from: dateFromFilter,
    date_to: dateToFilter,
  };
  const preserveBase: BrowsePreserveParams = {
    q: query,
    city: cityFilter,
    state: stateFilter,
  };
  const listHref = category
    ? `/events?category=${encodeURIComponent(category)}`
    : "/events";
  const timePreset = detectBrowseTimePreset(dateFromFilter, dateToFilter, now);
  const today = todayRangeUtc(now);
  const weekend = thisWeekendRangeUtc(now);
  const hrefTimeAll = mergeBrowseParams(listHref, preserveBase);
  const hrefTimeToday = mergeBrowseParams(listHref, { ...preserveBase, ...today });
  const hrefTimeWeekend = mergeBrowseParams(listHref, { ...preserveBase, ...weekend });

  const locationHeadline =
    cityFilter && stateFilter
      ? `${cityFilter}, ${stateFilter}`
      : cityFilter
        ? cityFilter
        : stateFilter
          ? stateFilter
          : "United States";

  const hasActiveFilters = Boolean(
    query || category || cityFilter || stateFilter || dateFromFilter || dateToFilter,
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="touch-manipulation hover:underline">
              Home
            </Link>
            <span className="mx-2 text-zinc-300 dark:text-zinc-600">/</span>
            <span className="text-zinc-800 dark:text-zinc-200">Events</span>
          </p>
          <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-zinc-900 sm:mt-4 sm:text-3xl lg:text-4xl dark:text-zinc-50">
            Browsing events in{" "}
            <span className="text-zinc-600 dark:text-zinc-300">{locationHeadline}</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            Classes, camps, festivals, and gatherings — search, pick a time range, or browse by
            category.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <form action="/events" method="get" className="space-y-5" role="search">
              {category ? <input type="hidden" name="category" value={category} /> : null}
              {cityFilter ? <input type="hidden" name="city" value={cityFilter} /> : null}
              {stateFilter ? <input type="hidden" name="state" value={stateFilter} /> : null}
              {dateFromFilter ? (
                <input type="hidden" name="date_from" value={dateFromFilter} />
              ) : null}
              {dateToFilter ? <input type="hidden" name="date_to" value={dateToFilter} /> : null}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <label htmlFor="event-search" className="sr-only">
                  Search events
                </label>
                <input
                  id="event-search"
                  type="search"
                  name="q"
                  defaultValue={q ?? ""}
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

              <div>
                <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                  When
                </p>
                <div
                  className="scrollbar-thin mt-2 flex snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
                  role="group"
                  aria-label="Time range"
                >
                  <TimePill href={hrefTimeAll} label="All" active={timePreset === "all"} />
                  <span
                    className="inline-flex min-h-11 shrink-0 snap-start cursor-default items-center rounded-full border border-dashed border-zinc-200 px-4 text-sm font-medium text-zinc-400 dark:border-zinc-700 dark:text-zinc-500"
                    title="Coming soon — sign in for personalized picks"
                  >
                    For you
                  </span>
                  <TimePill href={hrefTimeToday} label="Today" active={timePreset === "today"} />
                  <TimePill
                    href={hrefTimeWeekend}
                    label="This weekend"
                    active={timePreset === "weekend"}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          Browse by category
        </h2>
        <div className="scrollbar-thin mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:thin] sm:pb-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <CategoryChip label="All" active={!category} href="/events" preserveBrowse={preserveBrowse} />
          {FEATURED_CATEGORIES.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              active={category === c}
              href={`/events?category=${encodeURIComponent(c)}`}
              preserveBrowse={preserveBrowse}
            />
          ))}
        </div>

        <details className="mt-6 rounded-xl border border-zinc-200 bg-white p-3 sm:p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden dark:text-zinc-100">
            More filters — city, state, dates
          </summary>
          <form action="/events" method="get" className="mt-4 space-y-4">
            {category ? <input type="hidden" name="category" value={category} /> : null}
            <input type="hidden" name="q" value={q ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="more-city"
                  className="text-xs font-semibold tracking-wide text-zinc-500 uppercase"
                >
                  City
                </label>
                <input
                  id="more-city"
                  type="text"
                  name="city"
                  defaultValue={city ?? ""}
                  placeholder="e.g. Austin"
                  autoComplete="address-level2"
                  className="mt-1 min-h-11 w-full rounded-lg border border-zinc-200 px-3 text-base sm:min-h-10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
              <div>
                <label
                  htmlFor="more-state"
                  className="text-xs font-semibold tracking-wide text-zinc-500 uppercase"
                >
                  State
                </label>
                <input
                  id="more-state"
                  type="text"
                  name="state"
                  defaultValue={state ?? ""}
                  placeholder="e.g. TX"
                  autoComplete="address-level1"
                  maxLength={32}
                  className="mt-1 min-h-11 w-full rounded-lg border border-zinc-200 px-3 text-base sm:min-h-10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
              <div>
                <label
                  htmlFor="more-date-from"
                  className="text-xs font-semibold tracking-wide text-zinc-500 uppercase"
                >
                  From date
                </label>
                <input
                  id="more-date-from"
                  type="date"
                  name="date_from"
                  defaultValue={date_from ?? ""}
                  className="mt-1 min-h-11 w-full rounded-lg border border-zinc-200 px-3 text-base sm:min-h-10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
              <div>
                <label
                  htmlFor="more-date-to"
                  className="text-xs font-semibold tracking-wide text-zinc-500 uppercase"
                >
                  To date
                </label>
                <input
                  id="more-date-to"
                  type="date"
                  name="date_to"
                  defaultValue={date_to ?? ""}
                  className="mt-1 min-h-11 w-full rounded-lg border border-zinc-200 px-3 text-base sm:min-h-10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-950"
                />
              </div>
            </div>
            <button
              type="submit"
              className="touch-manipulation mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-5 text-base font-semibold text-white hover:bg-zinc-800 active:bg-zinc-950 sm:w-auto sm:text-sm dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:active:bg-zinc-200"
            >
              Apply filters
            </button>
          </form>
        </details>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-2">
          <p className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-50">
            {events.length} event{events.length === 1 ? "" : "s"}
            {category ? (
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                {" "}
                in <span className="font-medium text-zinc-700 dark:text-zinc-300">{category}</span>
              </span>
            ) : null}
            {query ? (
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                {" "}
                matching &quot;{query}&quot;
              </span>
            ) : null}
            {cityFilter ? (
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                {" "}
                in <span className="font-medium text-zinc-700 dark:text-zinc-300">{cityFilter}</span>
              </span>
            ) : null}
            {stateFilter ? (
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                {" "}
                ({stateFilter})
              </span>
            ) : null}
            {dateFromFilter || dateToFilter ? (
              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                {" "}
                {dateFromFilter && dateToFilter
                  ? `from ${dateFromFilter} to ${dateToFilter}`
                  : dateFromFilter
                    ? `from ${dateFromFilter}`
                    : `through ${dateToFilter}`}
              </span>
            ) : null}
          </p>
          {hasActiveFilters && (
            <Link
              href="/events"
              className="touch-manipulation inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-zinc-900 underline-offset-4 hover:underline sm:min-h-0 dark:text-zinc-100"
            >
              Clear filters
            </Link>
          )}
        </div>

        {events.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center sm:p-12 dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              No events match these filters. Try another category, time range, or search term.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              Local dev: run{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                npx supabase db reset
              </code>{" "}
              to load sample listings from{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
                supabase/seed.sql
              </code>
              .
            </p>
          </div>
        ) : (
          <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {events.map((e) => (
              <li key={e.id} className="min-w-0">
                <EventCard event={eventToCardModel(e)} presentation="grid" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TimePill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`touch-manipulation inline-flex min-h-11 shrink-0 snap-start items-center rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
        active
          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
          : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      }`}
    >
      {label}
    </Link>
  );
}

function CategoryChip({
  label,
  href,
  active,
  preserveBrowse,
}: {
  label: string;
  href: string;
  active: boolean;
  preserveBrowse?: BrowsePreserveParams;
}) {
  const url = mergeBrowseParams(href, preserveBrowse);

  return (
    <Link
      href={url}
      className={`touch-manipulation inline-flex min-h-11 shrink-0 snap-start items-center rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${
        active
          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
      }`}
    >
      {label}
    </Link>
  );
}
