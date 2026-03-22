-- Core public events (Slice A — discovery). RLS: anon can read published, non-expired rows only.

create table public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  category text not null,
  start_at timestamptz not null,
  end_of_life_at timestamptz not null,
  city text,
  state text,
  venue_name text,
  latitude double precision,
  longitude double precision,
  price_label text,
  registration_url text,
  cover_image_url text,
  description text,
  organizer_display_name text not null default '',
  interest_count integer not null default 0,
  age_range_label text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'pending_moderation', 'deleted'))
);

create index events_public_list_idx
  on public.events (status, end_of_life_at desc, start_at asc);

comment on table public.events is 'Event listings; public API must only expose published + not past end_of_life_at.';

alter table public.events enable row level security;

create policy "anon_select_published_active_events"
  on public.events
  for select
  to anon, authenticated
  using (
    status = 'published'
    and end_of_life_at > now()
  );
