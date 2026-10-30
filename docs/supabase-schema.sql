-- Suki Safari Hub, Supabase schema, step by step.
-- Run this in the Supabase SQL editor, in a new free project, only after
-- Sula approves the project. No payments, no escrow, no real bookings yet.
-- This is the filing system behind the app, not the app itself.
-- Places are public read only. Guides are public read only in this MVP.
-- No guide can be booked or charged from these tables.

create table if not exists places (
  id bigint generated always as identity primary key,
  country text not null,
  name text not null unique,
  type text not null,
  famous_for text not null,
  fee_note text not null,
  created_at timestamptz not null default now()
);

create table if not exists guides (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  licence_number text,
  licence_registry text,
  verification_status text not null default 'self_declared'
    check (verification_status in ('self_declared', 'peer_reviewed', 'registry_verified')),
  languages text[] not null default '{}',
  specialisms text[] not null default '{}',
  regions text[] not null default '{}',
  vehicle_type text,
  day_rate_range_usd text,
  is_suki_guide boolean not null default false,
  created_at timestamptz not null default now()
);

-- Verified badge rule, in plain words: only registry_verified shows the
-- verified badge in the app. Suki's own guides use exactly the same rules.

alter table places enable row level security;
alter table guides enable row level security;

create policy "Places are public to read" on places
  for select using (true);

create policy "Guides are public to read" on guides
  for select using (true);

-- No insert, update, or delete policy is created here on purpose.
-- That means only the project owner, in the Supabase dashboard, can add
-- or change rows for now. App users can only read. Booking, payment, and
-- escrow tables are deliberately NOT created in this step.
