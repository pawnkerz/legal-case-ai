create table if not exists public.issue_evidence_links (
  issue_id uuid not null references public.case_issues(id) on delete cascade,
  evidence_id uuid not null references public.evidence_items(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  relationship text not null default 'supports' check (relationship in ('supports','contradicts','context')),
  created_at timestamptz not null default now(),
  primary key (issue_id, evidence_id)
);

alter table public.case_timeline_events enable row level security;
alter table public.evidence_items enable row level security;
alter table public.case_issues enable row level security;
alter table public.issue_evidence_links enable row level security;
alter table public.case_intake_answers enable row level security;
alter table public.immigration_profiles enable row level security;
alter table public.legal_sources enable row level security;
alter table public.legal_source_versions enable row level security;
alter table public.legal_authorities enable row level security;

grant select, insert, update, delete on public.case_timeline_events, public.evidence_items, public.case_issues, public.issue_evidence_links, public.case_intake_answers, public.immigration_profiles to authenticated;
grant select on public.legal_sources, public.legal_source_versions, public.legal_authorities to authenticated;
grant execute on function public.search_legal_authorities(text, text, integer) to authenticated;

create policy "timeline owner select" on public.case_timeline_events for select to authenticated using ((select auth.uid()) = user_id);
create policy "timeline owner insert" on public.case_timeline_events for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "timeline owner update" on public.case_timeline_events for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "timeline owner delete" on public.case_timeline_events for delete to authenticated using ((select auth.uid()) = user_id);

create policy "evidence owner select" on public.evidence_items for select to authenticated using ((select auth.uid()) = user_id);
create policy "evidence owner insert" on public.evidence_items for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "evidence owner update" on public.evidence_items for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "evidence owner delete" on public.evidence_items for delete to authenticated using ((select auth.uid()) = user_id);

create policy "issues owner select" on public.case_issues for select to authenticated using ((select auth.uid()) = user_id);
create policy "issues owner insert" on public.case_issues for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "issues owner update" on public.case_issues for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "issues owner delete" on public.case_issues for delete to authenticated using ((select auth.uid()) = user_id);

create policy "issue links owner select" on public.issue_evidence_links for select to authenticated using ((select auth.uid()) = user_id);
create policy "issue links owner insert" on public.issue_evidence_links for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "issue links owner update" on public.issue_evidence_links for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "issue links owner delete" on public.issue_evidence_links for delete to authenticated using ((select auth.uid()) = user_id);

create policy "intake owner select" on public.case_intake_answers for select to authenticated using ((select auth.uid()) = user_id);
create policy "intake owner insert" on public.case_intake_answers for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "intake owner update" on public.case_intake_answers for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "intake owner delete" on public.case_intake_answers for delete to authenticated using ((select auth.uid()) = user_id);

create policy "immigration owner select" on public.immigration_profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "immigration owner insert" on public.immigration_profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "immigration owner update" on public.immigration_profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "immigration owner delete" on public.immigration_profiles for delete to authenticated using ((select auth.uid()) = user_id);

create policy "legal sources authenticated read" on public.legal_sources for select to authenticated using (enabled = true);
create policy "legal versions authenticated read" on public.legal_source_versions for select to authenticated using (true);
create policy "legal authorities authenticated read" on public.legal_authorities for select to authenticated using (verified = true and superseded_date is null);
