# Burger Pack Paws Project (Next.js + React + Supabase) - Cream Theme

## Setup
1) Install deps:
   npm install

2) Add env vars:
   - Copy .env.example to .env.local
   - Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from Supabase Project Settings → API

3) Create the Supabase table (SQL Editor):
```sql
create table if not exists public.partnership_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  rescue_name text not null,
  contact_name text not null,
  email text not null,

  phone text,
  website text,
  instagram text,
  city text,
  capacity text,
  needs text,
  notes text
);

alter table public.partnership_inquiries enable row level security;

create policy "Allow anonymous inserts"
on public.partnership_inquiries
for insert
to anon
with check (true);
```

4) Run:
   npm run dev
