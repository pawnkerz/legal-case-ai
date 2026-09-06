create extension if not exists pgcrypto;

create table if not exists public.case_timeline_events (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  occurred_at timestamptz not null,
  label text not null,
  description text,
  source_document_id uuid references public.documents(id) on delete set null,
  is_deadline boolean not null default false,
  confidence text not null default 'confirmed' check (confidence in ('confirmed','needs_review')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  kind text not null check (kind in ('document','photo','video','audio','message','testimony','other')),
  status text not null default 'collected' check (status in ('collected','missing','disputed')),
  notes text,
  source_document_id uuid references public.documents(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_issues (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'possible' check (status in ('possible','supported','disputed','resolved')),
  elements jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_intake_answers (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  section text not null,
  answer_key text not null,
  answer_value jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (case_id, section, answer_key)
);

create table if not exists public.immigration_profiles (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null unique references public.cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  goal text,
  a_number_encrypted jsonb,
  receipt_numbers_encrypted jsonb not null default '[]'::jsonb,
  current_status text,
  country_of_citizenship text,
  entry_history jsonb not null default '[]'::jsonb,
  proceedings jsonb not null default '{}'::jsonb,
  filings jsonb not null default '[]'::jsonb,
  notices jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists case_timeline_case_idx on public.case_timeline_events(case_id, occurred_at);
create index if not exists evidence_case_idx on public.evidence_items(case_id, created_at);
create index if not exists case_issues_case_idx on public.case_issues(case_id, status);
