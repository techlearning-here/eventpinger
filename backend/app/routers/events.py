from fastapi import APIRouter, Depends, HTTPException

from app.date_params import parse_optional_iso_date
from app.deps import get_events_repository
from app.repositories.events import EventsRepository, PublicEventFilters
from app.schemas.event import EventDetail, EventListResponse, EventSummary

router = APIRouter(prefix="/v1/events", tags=["events"])


@router.get("", response_model=EventListResponse)
def list_events(
    category: str | None = None,
    q: str | None = None,
    city: str | None = None,
    state: str | None = None,
    date_from: str | None = None,
    date_to: str | None = None,
    repo: EventsRepository = Depends(get_events_repository),
) -> EventListResponse:
    search = (q or "").strip() or None
    city_q = (city or "").strip() or None
    state_q = (state or "").strip() or None
    d_from = parse_optional_iso_date(date_from)
    d_to = parse_optional_iso_date(date_to)
    rows = repo.list_published(
        PublicEventFilters(
            category=category,
            q=search,
            city=city_q,
            state=state_q,
            date_from=d_from,
            date_to=d_to,
        ),
    )
    return EventListResponse(items=[EventSummary.model_validate(r) for r in rows])


@router.get("/by-slug/{slug}", response_model=EventDetail)
def get_event_by_slug(
    slug: str,
    repo: EventsRepository = Depends(get_events_repository),
) -> EventDetail:
    row = repo.get_published_by_slug(slug)
    if row is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return EventDetail.model_validate(row)
