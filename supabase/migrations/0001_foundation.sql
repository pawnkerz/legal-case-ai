create extension if not exists pgcrypto;

create type public.case_status as enum ('intake','active','closed');
create type public.compliance_class as enum ('self_help','high_risk','representation_required');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 180),
  matter_type text not null check (matter_type in ('immigration','family','housing','criminal','traffic','employment','consumer_debt','small_claims','civil','personal_injury','probate_estate','business','real_estate','bankruptcy','benefits_administrative','other')),
  jurisdiction_country text not null default 'US',
  jurisdiction_state text,
  jurisdiction_county text,
  court_name text,
  status public.case_status not null default 'intake',
  next_deadline timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index cases_user_id_idx on public.cases(user_id, created_at desc);

create table public.case_documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null unique,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  sha256 text,
  processing_status text not null default 'pending' check (processing_status in ('pending','processing','ready','failed')),
  created_at timestamptz not null default now()
);
create index case_documents_case_id_idx on public.case_documents(case_id, created_at desc);
create index case_documents_user_id_idx on public.case_documents(user_id);

create table public.chat_interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  case_id uuid references public.cases(id) on delete cascade,
  compliance_class public.compliance_class not null,
  user_message text not null,
  response_excerpt text,
  jurisdiction jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index chat_interactions_user_created_idx on public.chat_interactions(user_id, created_at desc);

create table public.audit_events (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  case_id uuid references public.cases(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_events_case_created_idx on public.audit_events(case_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.cases enable row level security;
alter table public.case_documents enable row level security;
alter table public.chat_interactions enable row level security;
alter table public.audit_events enable row level security;

grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.cases to authenticated;
grant select, insert, delete on public.case_documents to authenticated;
grant select, insert on public.chat_interactions to authenticated;
grant select on public.audit_events to authenticated;

create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "cases_select_own" on public.cases for select to authenticated using ((select auth.uid()) = user_id);
create policy "cases_insert_own" on public.cases for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "cases_update_own" on public.cases for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "cases_delete_own" on public.cases for delete to authenticated using ((select auth.uid()) = user_id);

create policy "documents_select_own" on public.case_documents for select to authenticated using ((select auth.uid()) = user_id);
create policy "documents_insert_own" on public.case_documents for insert to authenticated with check ((select auth.uid()) = user_id and exists (select 1 from public.cases c where c.id = case_id and c.user_id = (select auth.uid())));
create policy "documents_delete_own" on public.case_documents for delete to authenticated using ((select auth.uid()) = user_id);

create policy "chat_select_own" on public.chat_interactions for select to authenticated using ((select auth.uid()) = user_id);
create policy "chat_insert_own" on public.chat_interactions for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "audit_select_own" on public.audit_events for select to authenticated using ((select auth.uid()) = user_id);
