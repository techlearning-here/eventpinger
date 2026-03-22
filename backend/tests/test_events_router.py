"""Public events API (MVP D7 / D9) — TDD."""

from datetime import UTC, datetime, timedelta
from typing import Any

import pytest
from fastapi.testclient import TestClient

from app.deps import get_events_repository
from app.main import app
from app.repositories.events import EventsRepository, PublicEventFilters


class StubEventsRepository(EventsRepository):
    def __init__(self, rows: list[dict[str, Any]]) -> None:
        self._rows = rows

    def list_published(self, filters: PublicEventFilters) -> list[dict[str, Any]]:
        rows = [r for r in self._rows if r["status"] == "published"]
        now = datetime.now(UTC)
        rows = [r for r in rows if _parse_ts(r["end_of_life_at"]) > now]
        if filters.category:
            rows = [r for r in rows if r["category"] == filters.category]
        if filters.q:
            needle = filters.q.lower()
            rows = [
                r
                for r in rows
                if needle in r["title"].lower()
                or (
                    r.get("description")
                    and isinstance(r["description"], str)
                    and needle in r["description"].lower()
                )
            ]
        if filters.city:
            needle = filters.city.lower()
            rows = [
                r
                for r in rows
                if r.get("city") and isinstance(r["city"], str) and needle in r["city"].lower()
            ]
        if filters.state:
            needle = filters.state.lower()
            rows = [
                r
                for r in rows
                if r.get("state") and isinstance(r["state"], str) and needle in r["state"].lower()
            ]
        if filters.date_from:
            lo = datetime(
                filters.date_from.year,
                filters.date_from.month,
                filters.date_from.day,
                tzinfo=UTC,
            )
            rows = [r for r in rows if _parse_ts(r["start_at"]) >= lo]
        if filters.date_to:
            hi_exclusive = datetime(
                filters.date_to.year,
                filters.date_to.month,
                filters.date_to.day,
                tzinfo=UTC,
            ) + timedelta(days=1)
            rows = [r for r in rows if _parse_ts(r["start_at"]) < hi_exclusive]
        return sorted(rows, key=lambda r: _parse_ts(r["start_at"]))

    def get_published_by_slug(self, slug: str) -> dict[str, Any] | None:
        for r in self.list_published(PublicEventFilters()):
            if r["slug"] == slug:
                return r
        return None


def _parse_ts(value: Any) -> datetime:
    if isinstance(value, datetime):
        return value if value.tzinfo else value.replace(tzinfo=UTC)
    return datetime.fromisoformat(str(value).replace("Z", "+00:00"))


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)


def test_list_events_returns_empty_items_when_no_events(client: TestClient) -> None:
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository([])
    try:
        r = client.get("/v1/events")
        assert r.status_code == 200
        assert r.json() == {"items": []}
    finally:
        app.dependency_overrides.clear()


def test_list_events_returns_only_published_non_expired(client: TestClient) -> None:
    future = datetime(2030, 1, 15, 12, 0, 0, tzinfo=UTC)
    past_eol = datetime(2020, 1, 1, 0, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "11111111-1111-1111-1111-111111111111",
            "title": "Draft camp",
            "slug": "draft-camp",
            "category": "Camps",
            "start_at": future,
            "end_of_life_at": future,
            "city": "Austin",
            "state": "TX",
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": "Free",
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Org",
            "interest_count": 0,
            "age_range_label": None,
            "status": "draft",
        },
        {
            "id": "22222222-2222-2222-2222-222222222222",
            "title": "Live festival",
            "slug": "live-festival",
            "category": "Festivals",
            "start_at": future,
            "end_of_life_at": future,
            "city": "Austin",
            "state": "TX",
            "venue_name": "Park",
            "latitude": 30.27,
            "longitude": -97.74,
            "price_label": "From $10",
            "registration_url": "https://example.com/tickets",
            "cover_image_url": None,
            "description": "Fun for all ages.",
            "organizer_display_name": "City Arts",
            "interest_count": 42,
            "age_range_label": "All ages",
            "status": "published",
        },
        {
            "id": "33333333-3333-3333-3333-333333333333",
            "title": "Expired",
            "slug": "expired",
            "category": "Music",
            "start_at": past_eol,
            "end_of_life_at": past_eol,
            "city": None,
            "state": None,
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "X",
            "interest_count": 0,
            "age_range_label": None,
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events")
        assert r.status_code == 200
        body = r.json()
        assert len(body["items"]) == 1
        assert body["items"][0]["slug"] == "live-festival"
        assert body["items"][0]["interest_count"] == 42
    finally:
        app.dependency_overrides.clear()


def test_list_events_filters_by_category(client: TestClient) -> None:
    future = datetime(2030, 6, 1, 10, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            "title": "STEM class",
            "slug": "stem-class",
            "category": "Kids Classes",
            "start_at": future,
            "end_of_life_at": future,
            "city": None,
            "state": None,
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Lab",
            "interest_count": 3,
            "age_range_label": "6–9",
            "status": "published",
        },
        {
            "id": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
            "title": "Concert",
            "slug": "concert",
            "category": "Music",
            "start_at": future,
            "end_of_life_at": future,
            "city": None,
            "state": None,
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Band",
            "interest_count": 1,
            "age_range_label": None,
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events", params={"category": "Kids Classes"})
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) == 1
        assert items[0]["slug"] == "stem-class"
    finally:
        app.dependency_overrides.clear()


def test_list_events_filters_by_search_query(client: TestClient) -> None:
    future = datetime(2030, 8, 1, 10, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "dddddddd-dddd-dddd-dddd-dddddddddddd",
            "title": "Morning yoga in the park",
            "slug": "morning-yoga",
            "category": "Community Gatherings",
            "start_at": future,
            "end_of_life_at": future,
            "city": "Portland",
            "state": "OR",
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": "Donation",
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Wellness Co",
            "interest_count": 5,
            "age_range_label": "Adults",
            "status": "published",
        },
        {
            "id": "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
            "title": "Kids soccer kickoff",
            "slug": "kids-soccer",
            "category": "Kids Classes",
            "start_at": future,
            "end_of_life_at": future,
            "city": "Portland",
            "state": "OR",
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": "Free",
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Youth League",
            "interest_count": 12,
            "age_range_label": "6–10",
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events", params={"q": "yoga"})
        assert r.status_code == 200
        slugs = [item["slug"] for item in r.json()["items"]]
        assert slugs == ["morning-yoga"]
    finally:
        app.dependency_overrides.clear()


def test_list_events_filters_by_city(client: TestClient) -> None:
    future = datetime(2030, 10, 1, 10, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "11111111-1111-1111-1111-111111111111",
            "title": "Austin makers",
            "slug": "austin-makers",
            "category": "Community Gatherings",
            "start_at": future,
            "end_of_life_at": future,
            "city": "Austin",
            "state": "TX",
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Makers",
            "interest_count": 1,
            "age_range_label": None,
            "status": "published",
        },
        {
            "id": "22222222-2222-2222-2222-222222222222",
            "title": "Dallas fair",
            "slug": "dallas-fair",
            "category": "Festivals",
            "start_at": future,
            "end_of_life_at": future,
            "city": "Dallas",
            "state": "TX",
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "City",
            "interest_count": 2,
            "age_range_label": None,
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events", params={"city": "austin"})
        assert r.status_code == 200
        slugs = [item["slug"] for item in r.json()["items"]]
        assert slugs == ["austin-makers"]
    finally:
        app.dependency_overrides.clear()


def test_list_events_filters_by_state(client: TestClient) -> None:
    future = datetime(2030, 11, 1, 10, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            "title": "CA beach cleanup",
            "slug": "ca-cleanup",
            "category": "Community Gatherings",
            "start_at": future,
            "end_of_life_at": future,
            "city": "San Diego",
            "state": "CA",
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Eco",
            "interest_count": 0,
            "age_range_label": None,
            "status": "published",
        },
        {
            "id": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
            "title": "TX rodeo",
            "slug": "tx-rodeo",
            "category": "Festivals",
            "start_at": future,
            "end_of_life_at": future,
            "city": "Houston",
            "state": "TX",
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Rodeo",
            "interest_count": 0,
            "age_range_label": None,
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events", params={"state": "ca"})
        assert r.status_code == 200
        slugs = [item["slug"] for item in r.json()["items"]]
        assert slugs == ["ca-cleanup"]
    finally:
        app.dependency_overrides.clear()


def test_list_events_ignores_blank_search_query(client: TestClient) -> None:
    future = datetime(2030, 9, 1, 10, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "ffffffff-ffff-ffff-ffff-ffffffffffff",
            "title": "Only event",
            "slug": "only-event",
            "category": "Music",
            "start_at": future,
            "end_of_life_at": future,
            "city": None,
            "state": None,
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Band",
            "interest_count": 0,
            "age_range_label": None,
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events", params={"q": "   "})
        assert r.status_code == 200
        assert len(r.json()["items"]) == 1
    finally:
        app.dependency_overrides.clear()


def test_list_events_filters_by_date_from_and_date_to(client: TestClient) -> None:
    eol = datetime(2031, 1, 1, 0, 0, 0, tzinfo=UTC)
    base = {
        "category": "Festivals",
        "venue_name": None,
        "latitude": None,
        "longitude": None,
        "city": None,
        "state": None,
        "price_label": None,
        "registration_url": None,
        "cover_image_url": None,
        "description": None,
        "organizer_display_name": "Org",
        "interest_count": 0,
        "age_range_label": None,
        "status": "published",
    }
    rows = [
        {
            **base,
            "id": "aaaaaaaa-aaaa-aaaa-aaaa-000000000001",
            "title": "Early camp",
            "slug": "early-camp",
            "start_at": datetime(2030, 1, 10, 9, 0, 0, tzinfo=UTC),
            "end_of_life_at": eol,
        },
        {
            **base,
            "id": "aaaaaaaa-aaaa-aaaa-aaaa-000000000002",
            "title": "Mid fair",
            "slug": "mid-fair",
            "start_at": datetime(2030, 1, 15, 14, 0, 0, tzinfo=UTC),
            "end_of_life_at": eol,
        },
        {
            **base,
            "id": "aaaaaaaa-aaaa-aaaa-aaaa-000000000003",
            "title": "Late show",
            "slug": "late-show",
            "start_at": datetime(2030, 1, 20, 19, 0, 0, tzinfo=UTC),
            "end_of_life_at": eol,
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events", params={"date_from": "2030-01-16"})
        assert [item["slug"] for item in r.json()["items"]] == ["late-show"]

        r2 = client.get("/v1/events", params={"date_to": "2030-01-14"})
        assert [item["slug"] for item in r2.json()["items"]] == ["early-camp"]

        r3 = client.get(
            "/v1/events",
            params={"date_from": "2030-01-12", "date_to": "2030-01-18"},
        )
        assert [item["slug"] for item in r3.json()["items"]] == ["mid-fair"]
    finally:
        app.dependency_overrides.clear()


def test_list_events_ignores_invalid_date_params(client: TestClient) -> None:
    eol = datetime(2031, 1, 1, 0, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "bbbbbbbb-bbbb-bbbb-bbbb-000000000001",
            "title": "One",
            "slug": "one",
            "category": "Music",
            "start_at": datetime(2030, 2, 1, 12, 0, 0, tzinfo=UTC),
            "end_of_life_at": eol,
            "city": None,
            "state": None,
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Band",
            "interest_count": 0,
            "age_range_label": None,
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events", params={"date_from": "not-a-date", "date_to": "2030-02-02"})
        assert r.status_code == 200
        assert len(r.json()["items"]) == 1
    finally:
        app.dependency_overrides.clear()


def test_list_events_ignores_blank_city_and_state(client: TestClient) -> None:
    future = datetime(2030, 12, 1, 10, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "cccccccc-cccc-cccc-cccc-cccccccccccc",
            "title": "Solo",
            "slug": "solo",
            "category": "Music",
            "start_at": future,
            "end_of_life_at": future,
            "city": "Seattle",
            "state": "WA",
            "venue_name": None,
            "latitude": None,
            "longitude": None,
            "price_label": None,
            "registration_url": None,
            "cover_image_url": None,
            "description": None,
            "organizer_display_name": "Band",
            "interest_count": 0,
            "age_range_label": None,
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events", params={"city": "   ", "state": "\t"})
        assert r.status_code == 200
        assert len(r.json()["items"]) == 1
    finally:
        app.dependency_overrides.clear()


def test_get_event_by_slug_returns_404_when_missing(client: TestClient) -> None:
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository([])
    try:
        r = client.get("/v1/events/by-slug/nope")
        assert r.status_code == 404
    finally:
        app.dependency_overrides.clear()


def test_get_event_by_slug_returns_detail(client: TestClient) -> None:
    future = datetime(2030, 3, 1, 18, 0, 0, tzinfo=UTC)
    rows = [
        {
            "id": "cccccccc-cccc-cccc-cccc-cccccccccccc",
            "title": "Diwali fair",
            "slug": "diwali-fair",
            "category": "Religious/Cultural",
            "start_at": future,
            "end_of_life_at": future,
            "city": "San Francisco",
            "state": "CA",
            "venue_name": "Community hall",
            "latitude": None,
            "longitude": None,
            "price_label": "Free",
            "registration_url": "https://example.com/rsvp",
            "cover_image_url": None,
            "description": "Full detail text here.",
            "organizer_display_name": "Temple committee",
            "interest_count": 100,
            "age_range_label": "All ages",
            "status": "published",
        },
    ]
    app.dependency_overrides[get_events_repository] = lambda: StubEventsRepository(rows)
    try:
        r = client.get("/v1/events/by-slug/diwali-fair")
        assert r.status_code == 200
        data = r.json()
        assert data["title"] == "Diwali fair"
        assert data["registration_url"] == "https://example.com/rsvp"
        assert data["description"] == "Full detail text here."
    finally:
        app.dependency_overrides.clear()
