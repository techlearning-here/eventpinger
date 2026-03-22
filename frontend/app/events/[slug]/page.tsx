import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchEventBySlug } from "@/lib/events";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await fetchEventBySlug(slug);
  if (!event) {
    notFound();
  }

  const start = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(event.start_at));

  const location =
    event.venue_name ||
    (event.city && event.state ? `${event.city}, ${event.state}` : event.city || "Location TBD");

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <article className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <p className="text-sm text-zinc-500">
          <Link href="/" className="touch-manipulation hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/events" className="touch-manipulation hover:underline">
            Events
          </Link>
        </p>
        <p className="mt-4 text-sm font-medium uppercase tracking-wide text-zinc-500">
          {event.category}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{event.title}</h1>
        <p className="mt-2 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">{start}</p>
        <p className="mt-1 text-zinc-700 dark:text-zinc-300">{location}</p>
        {event.age_range_label ? (
          <p className="mt-1 text-sm text-zinc-500">Ages: {event.age_range_label}</p>
        ) : null}
        <p className="mt-4 text-sm text-zinc-500">Hosted by {event.organizer_display_name}</p>
        {event.price_label ? (
          <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {event.price_label}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {event.interest_count} interested
        </p>

        {event.description ? (
          <div className="mt-8 whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
            {event.description}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
          {event.registration_url ? (
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-manipulation inline-flex min-h-12 w-full items-center justify-center rounded-full bg-zinc-900 px-6 text-base font-semibold text-white hover:bg-zinc-800 active:bg-zinc-950 sm:w-auto sm:text-sm dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:active:bg-zinc-200"
            >
              Register / tickets
            </a>
          ) : (
            <p className="text-sm text-zinc-500">Registration link not provided for this listing.</p>
          )}
          <Link
            href="/events"
            className="touch-manipulation inline-flex min-h-12 w-full items-center justify-center rounded-full border border-zinc-300 px-6 text-base font-medium text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200 sm:w-auto sm:text-sm dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:active:bg-zinc-800"
          >
            Back to browse
          </Link>
        </div>
      </article>
    </div>
  );
}
