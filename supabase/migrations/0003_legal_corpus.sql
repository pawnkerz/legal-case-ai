create table if not exists public.legal_sources (
  id text primary key,
  name text not null,
  jurisdiction text not null,
  authority text not null check (authority in ('official','secondary')),
  base_url text not null,
  refresh_cadence text not null check (refresh_cadence in ('daily','weekly','monthly','change_triggered')),
  parser_type text not null check (parser_type in ('html','pdf','api','rss','bulk')),
  enabled boolean not null default true,
  last_success_at timestamptz,
  last_failure_at timestamptz,
  consecutive_failures integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.legal_source_versions (
  id uuid primary key default gen_random_uuid(),
  source_id text not null references public.legal_sources(id) on delete cascade,
  content_hash text not null,
  source_url text not null,
  retrieved_at timestamptz not null default now(),
  effective_date date,
  superseded_date date,
  metadata jsonb not null default '{}'::jsonb,
  unique (source_id, content_hash, source_url)
);

create table if not exists public.legal_authorities (
  id uuid primary key default gen_random_uuid(),
  source_version_id uuid not null references public.legal_source_versions(id) on delete cascade,
  jurisdiction text not null,
  authority_level text not null check (authority_level in ('constitution','statute','regulation','court_rule','binding_case','persuasive_case','agency_guidance','form','secondary')),
  title text not null,
  citation text,
  court text,
  body_text text not null,
  official_url text not null,
  effective_date date,
  superseded_date date,
  verified boolean not null default false,
  search_vector tsvector generated always as (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(citation,'') || ' ' || coalesce(body_text,''))) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists legal_authorities_jurisdiction_idx on public.legal_authorities(jurisdiction, authority_level);
create index if not exists legal_authorities_search_idx on public.legal_authorities using gin(search_vector);
create index if not exists legal_source_versions_source_idx on public.legal_source_versions(source_id, retrieved_at desc);

create or replace function public.search_legal_authorities(p_jurisdiction text, p_query text, p_limit integer default 20)
returns setof public.legal_authorities
language sql
stable
security invoker
set search_path = public
as $$
  select a.* from public.legal_authorities a
  where a.verified = true
    and a.superseded_date is null
    and (a.jurisdiction = p_jurisdiction or a.jurisdiction = 'US')
    and a.search_vector @@ websearch_to_tsquery('english', p_query)
  order by ts_rank_cd(a.search_vector, websearch_to_tsquery('english', p_query)) desc
  limit least(greatest(p_limit, 1), 50);
$$;
