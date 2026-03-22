# Supabase (local + migrations)

Initialized with the [Supabase CLI](https://supabase.com/docs/guides/cli). This folder holds **`config.toml`** and SQL **`migrations/`** for schema, RLS policies, and seeds.

## Common commands (from repo root)

```bash
npx supabase start    # local Postgres, Auth, Studio (Docker required)
npx supabase stop
npx supabase status   # URLs and anon/service keys for .env
```

Link to a hosted project:

```bash
npx supabase link --project-ref <ref>
npx supabase db push  # apply migrations to linked project
```

Add a migration after editing SQL:

```bash
npx supabase migration new <name>
```

**Migrations:** `20260321120000_events_core.sql` — public **`events`**. `20260322120000_profiles_saved_events.sql` — **`profiles`** (`family_profile` JSONB, onboarding + consent flags per [`docs/idea_enhaced.md`](../docs/idea_enhaced.md) / **P1**), **`saved_events`** (favorites, **A2**), auth trigger to create **`profiles`** on signup, RLS for **`authenticated`** only.

**Seed data:** [`seed.sql`](./seed.sql) inserts **~20** published sample events (categories, cities, Unsplash thumbnails) for Eventeny-style grid demos. Loaded on `supabase db reset` when seed is enabled in `config.toml`. UX notes: [`../docs/event-listing-ux.md`](../docs/event-listing-ux.md).

See also [`docs/FEATURES.md`](../docs/FEATURES.md) (schema ↔ feature IDs, roadmap gaps), [`docs/DEVELOPMENT.md`](../docs/DEVELOPMENT.md), and [`docs/tech-stack.md`](../docs/tech-stack.md).
