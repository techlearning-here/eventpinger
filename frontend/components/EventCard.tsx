import Link from "next/link";

export type EventCardModel = {
  title: string;
  slug: string;
  category: string;
  startAtIso: string;
  locationLine: string;
  organizerName: string;
  interestCount: number;
  priceLabel: string | null;
  thumbnailUrl: string | null;
};

export type EventCardPresentation = "row" | "grid";

function formatStart(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function eventToCardModel(event: {
  title: string;
  slug: string;
  category: string;
  start_at: string;
  city: string | null;
  state: string | null;
  venue_name: string | null;
  organizer_display_name: string;
  interest_count: number;
  price_label: string | null;
  cover_image_url: string | null;
}): EventCardModel {
  let locationLine = "Location TBD";
  if (event.venue_name) {
    locationLine = event.venue_name;
  } else if (event.city && event.state) {
    locationLine = `${event.city}, ${event.state}`;
  } else if (event.city) {
    locationLine = event.city;
  }

  return {
    title: event.title,
    slug: event.slug,
    category: event.category,
    startAtIso: event.start_at,
    locationLine,
    organizerName: event.organizer_display_name,
    interestCount: event.interest_count,
    priceLabel: event.price_label,
    thumbnailUrl: event.cover_image_url,
  };
}

export function EventCard({
  event,
  presentation = "row",
}: {
  event: EventCardModel;
  presentation?: EventCardPresentation;
}) {
  const href = `/events/${event.slug}`;

  if (presentation === "grid") {
    return (
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow active:shadow-md sm:hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
        <Link
          href={href}
          className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-100 touch-manipulation dark:bg-zinc-900"
        >
          {event.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.thumbnailUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-400">No image</div>
          )}
        </Link>
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            {event.category}
          </p>
          <h2 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-zinc-900 sm:text-lg dark:text-zinc-50">
            <Link href={href} className="touch-manipulation hover:underline">
              {event.title}
            </Link>
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {formatStart(event.startAtIso)}
          </p>
          <p className="text-sm text-zinc-500">{event.locationLine}</p>
          <p className="mt-1 text-sm text-zinc-500">{event.organizerName}</p>
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 sm:pt-4">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {event.interestCount} interested
            </span>
            {event.priceLabel ? (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {event.priceLabel}
              </span>
            ) : null}
          </div>
          <Link
            href={href}
            className="touch-manipulation mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800 active:bg-zinc-950 sm:w-fit dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:active:bg-zinc-200"
          >
            View details
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm sm:gap-4 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:h-24 sm:w-24 dark:bg-zinc-900">
        {event.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.thumbnailUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">No image</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{event.category}</p>
        <h2 className="line-clamp-2 text-base font-semibold text-zinc-900 sm:truncate sm:text-lg dark:text-zinc-50">
          <Link href={href} className="touch-manipulation hover:underline">
            {event.title}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {formatStart(event.startAtIso)} · {event.locationLine}
        </p>
        <p className="mt-1 text-sm text-zinc-500">{event.organizerName}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            {event.interestCount} interested
          </span>
          {event.priceLabel ? (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {event.priceLabel}
            </span>
          ) : null}
          <Link
            href={href}
            className="touch-manipulation ml-auto inline-flex min-h-11 min-w-[4.5rem] items-center justify-end font-semibold text-zinc-900 hover:underline sm:min-h-0 dark:text-zinc-100"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
