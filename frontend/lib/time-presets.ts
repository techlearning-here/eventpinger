function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function formatUtcYmd(d: Date): string {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  return `${y}-${pad2(m)}-${pad2(day)}`;
}

function utcDayStart(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function addDaysUtc(d: Date, days: number): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + days));
}

export function todayRangeUtc(now: Date): { date_from: string; date_to: string } {
  const day = utcDayStart(now);
  const ymd = formatUtcYmd(day);
  return { date_from: ymd, date_to: ymd };
}

export function thisWeekendRangeUtc(now: Date): { date_from: string; date_to: string } {
  const day = utcDayStart(now);
  const wd = day.getUTCDay();
  let friday: Date;
  if (wd === 0) {
    friday = addDaysUtc(day, -2);
  } else if (wd === 6) {
    friday = addDaysUtc(day, -1);
  } else if (wd === 5) {
    friday = day;
  } else {
    friday = addDaysUtc(day, 5 - wd);
  }
  const sunday = addDaysUtc(friday, 2);
  return { date_from: formatUtcYmd(friday), date_to: formatUtcYmd(sunday) };
}

export type BrowseTimePreset = "all" | "today" | "weekend" | "custom";

export function detectBrowseTimePreset(
  dateFrom: string | undefined,
  dateTo: string | undefined,
  now: Date,
): BrowseTimePreset {
  const df = dateFrom?.trim();
  const dt = dateTo?.trim();
  if (!df && !dt) return "all";
  const today = todayRangeUtc(now);
  if (df === today.date_from && dt === today.date_to) return "today";
  const wk = thisWeekendRangeUtc(now);
  if (df === wk.date_from && dt === wk.date_to) return "weekend";
  return "custom";
}
