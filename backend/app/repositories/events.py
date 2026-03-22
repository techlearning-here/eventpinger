from dataclasses import dataclass
from datetime import UTC, date, datetime, timedelta
from typing import Any, Protocol

from supabase import Client


@dataclass(frozen=True)
class PublicEventFilters:
    category: str | None = None
    # Case-insensitive substring on title (MVP).
    q: str | None = None
    # Case-insensitive substring on city / state (MVP location browse; ZIP later).
    city: str | None = None
    state: str | None = None
    # Inclusive calendar bounds in UTC (event `start_at` instant).
    date_from: date | None = None
    date_to: date | None = None


class EventsRepository(Protocol):
    def list_published(self, filters: PublicEventFilters) -> list[dict[str, Any]]: ...

    def get_published_by_slug(self, slug: str) -> dict[str, Any] | None: ...


class EmptyEventsRepository:
    def list_published(self, filters: PublicEventFilters) -> list[dict[str, Any]]:
        return []

    def get_published_by_slug(self, slug: str) -> dict[str, Any] | None:
        return None


class SupabaseEventsRepository:
    def __init__(self, client: Client) -> None:
        self._client = client

    def list_published(self, filters: PublicEventFilters) -> list[dict[str, Any]]:
        now_iso = datetime.now(UTC).isoformat()
        query = (
            self._client.table("events")
            .select("*")
            .eq("status", "published")
            .gt("end_of_life_at", now_iso)
        )
        if filters.category:
            query = query.eq("category", filters.category)
        if filters.q:
            query = query.ilike("title", f"%{filters.q}%")
        if filters.city:
            query = query.ilike("city", f"%{filters.city}%")
        if filters.state:
            query = query.ilike("state", f"%{filters.state}%")
        if filters.date_from:
            lo = datetime(
                filters.date_from.year,
                filters.date_from.month,
                filters.date_from.day,
                tzinfo=UTC,
            )
            query = query.gte("start_at", lo.isoformat())
        if filters.date_to:
            hi_exclusive = datetime(
                filters.date_to.year,
                filters.date_to.month,
                filters.date_to.day,
                tzinfo=UTC,
            ) + timedelta(days=1)
            query = query.lt("start_at", hi_exclusive.isoformat())
        response = query.order("start_at", desc=False).execute()
        return list(response.data or [])

    def get_published_by_slug(self, slug: str) -> dict[str, Any] | None:
        now_iso = datetime.now(UTC).isoformat()
        response = (
            self._client.table("events")
            .select("*")
            .eq("slug", slug)
            .eq("status", "published")
            .gt("end_of_life_at", now_iso)
            .limit(1)
            .execute()
        )
        rows = response.data or []
        return rows[0] if rows else None
