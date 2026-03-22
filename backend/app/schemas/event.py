from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EventSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    slug: str
    category: str
    start_at: datetime
    end_of_life_at: datetime
    city: str | None
    state: str | None
    venue_name: str | None
    latitude: float | None
    longitude: float | None
    price_label: str | None
    registration_url: str | None
    cover_image_url: str | None
    description: str | None
    organizer_display_name: str
    interest_count: int
    age_range_label: str | None


class EventDetail(EventSummary):
    """Same shape as summary for MVP; split later if list payloads shrink."""

    pass


class EventListResponse(BaseModel):
    items: list[EventSummary]
