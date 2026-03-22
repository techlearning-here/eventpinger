-- Attendee identity: profiles (family JSON per docs/idea_enhaced.md + mvp P1/P8) and saved events (A2).
-- RLS: authenticated users only; each row scoped to auth.uid().

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  display_name text,
  family_profile jsonb not null default '{}'::jsonb,
  onboarding_completed_at timestamptz,
  consent_family_matching boolean not null default false
);

comment on table public.profiles is 'One row per auth user; family_profile holds Netflix-style onboarding JSON (family, geo, categories, budget_max, notification_prefs).';
comment on column public.profiles.family_profile is 'Example: {"family":{"adults":2,"kids":[5,8],"teens":[14]},"geo":{"lat":37.77,"lng":-122.42,"radius_mi":25},"categories":[],"budget_max":50}.';
comment on column public.profiles.consent_family_matching is 'P8: explicit opt-in for using household data for matching; organizers never receive raw PII via this field.';

create index profiles_onboarding_idx
  on public.profiles (onboarding_completed_at)
  where onboarding_completed_at is null;

create table public.saved_events (
  user_id uuid not null references auth.users (id) on delete cascade,
  event_id uuid not null references public.events (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

create index saved_events_user_id_idx on public.saved_events (user_id);
create index saved_events_event_id_idx on public.saved_events (event_id);

comment on table public.saved_events is 'Favorites / saves for signed-in users (A2).';

alter table public.profiles enable row level security;
alter table public.saved_events enable row level security;

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "saved_events_select_own"
  on public.saved_events
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "saved_events_insert_own"
  on public.saved_events
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "saved_events_delete_own"
  on public.saved_events
  for delete
  to authenticated
  using (auth.uid() = user_id);

revoke all on table public.profiles from public, anon;
revoke all on table public.saved_events from public, anon;

grant select, insert, update on table public.profiles to authenticated;
grant select, insert, delete on table public.saved_events to authenticated;

create or replace function public.touch_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row
  execute procedure public.touch_profiles_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      nullif(split_part(coalesce(new.email, ''), '@', 1), '')
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user_profile();
