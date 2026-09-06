create table if not exists public.product_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'trial' check (plan in ('trial','pro')),
  active boolean not null default true,
  trial_interactions_used integer not null default 0 check (trial_interactions_used between 0 and 5),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.product_entitlements enable row level security;
grant select on public.product_entitlements to authenticated;

create policy "entitlements owner read" on public.product_entitlements
for select to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.consume_trial_interaction()
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare next_count integer;
begin
  insert into public.product_entitlements(user_id)
  values ((select auth.uid()))
  on conflict (user_id) do nothing;

  update public.product_entitlements
  set trial_interactions_used = trial_interactions_used + 1,
      updated_at = now()
  where user_id = (select auth.uid())
    and plan = 'trial'
    and active = true
    and trial_interactions_used < 5
  returning trial_interactions_used into next_count;

  if next_count is null then
    raise exception 'Trial interaction limit reached or paid access required';
  end if;
  return next_count;
end;
$$;

grant execute on function public.consume_trial_interaction() to authenticated;
