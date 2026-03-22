import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="safe-x mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-3 sm:min-h-[3.5rem] sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="touch-manipulation truncate py-2 text-base font-bold tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-50"
        >
          Eventpinger
        </Link>
        <nav className="flex items-center gap-1 sm:gap-6" aria-label="Primary">
          <Link
            href="/events"
            className="touch-manipulation inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-zinc-900 active:bg-zinc-100 sm:px-2 dark:text-zinc-100 dark:active:bg-zinc-800"
          >
            Find events
          </Link>
          <span
            className="hidden cursor-default py-2 text-sm text-zinc-400 sm:inline dark:text-zinc-500"
            title="Coming soon"
          >
            Create events
          </span>
          <span
            className="hidden cursor-default py-2 text-sm text-zinc-400 sm:inline dark:text-zinc-500"
            title="Coming soon"
          >
            Sign in
          </span>
        </nav>
      </div>
    </header>
  );
}
