import os
from functools import lru_cache

from supabase import Client, create_client

from app.repositories.events import EmptyEventsRepository, EventsRepository, SupabaseEventsRepository


@lru_cache
def _supabase_client() -> Client:
    url = os.environ["SUPABASE_URL"]
    key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    return create_client(url, key)


def get_events_repository() -> EventsRepository:
    if os.getenv("SUPABASE_URL") and os.getenv("SUPABASE_SERVICE_ROLE_KEY"):
        return SupabaseEventsRepository(_supabase_client())
    return EmptyEventsRepository()
