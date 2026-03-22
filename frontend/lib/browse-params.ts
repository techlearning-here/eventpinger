export type BrowsePreserveParams = {
  q?: string;
  city?: string;
  state?: string;
  /** `YYYY-MM-DD` — matches API `date_from` / `date_to`. */
  date_from?: string;
  date_to?: string;
};

export function mergeBrowseParams(href: string, preserve?: BrowsePreserveParams): string {
  if (!preserve) return href;
  const q = preserve.q?.trim();
  const city = preserve.city?.trim();
  const state = preserve.state?.trim();
  const dateFrom = preserve.date_from?.trim();
  const dateTo = preserve.date_to?.trim();
  if (!q && !city && !state && !dateFrom && !dateTo) return href;
  const u = new URL(href, "http://local.test");
  if (q) u.searchParams.set("q", q);
  if (city) u.searchParams.set("city", city);
  if (state) u.searchParams.set("state", state);
  if (dateFrom) u.searchParams.set("date_from", dateFrom);
  if (dateTo) u.searchParams.set("date_to", dateTo);
  return `${u.pathname}${u.search}`;
}
