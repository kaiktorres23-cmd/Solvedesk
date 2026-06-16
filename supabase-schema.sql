-- SolveDesk Pro - Supabase schema
-- Rode este script no SQL Editor do Supabase.

create table if not exists public.solvedesk_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.solvedesk_workspace (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists solvedesk_profiles_set_updated_at on public.solvedesk_profiles;
create trigger solvedesk_profiles_set_updated_at
before update on public.solvedesk_profiles
for each row execute function public.set_updated_at();

drop trigger if exists solvedesk_workspace_set_updated_at on public.solvedesk_workspace;
create trigger solvedesk_workspace_set_updated_at
before update on public.solvedesk_workspace
for each row execute function public.set_updated_at();

alter table public.solvedesk_profiles enable row level security;
alter table public.solvedesk_workspace enable row level security;
alter table public.solvedesk_workspace replica identity full;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1
       from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'solvedesk_workspace'
     ) then
    alter publication supabase_realtime add table public.solvedesk_workspace;
  end if;
end;
$$;

drop policy if exists "profiles_select_own" on public.solvedesk_profiles;
create policy "profiles_select_own"
on public.solvedesk_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.solvedesk_profiles;
create policy "profiles_insert_own"
on public.solvedesk_profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.solvedesk_profiles;
create policy "profiles_update_own"
on public.solvedesk_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "profiles_delete_own" on public.solvedesk_profiles;
create policy "profiles_delete_own"
on public.solvedesk_profiles
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "workspace_select_own" on public.solvedesk_workspace;
create policy "workspace_select_own"
on public.solvedesk_workspace
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "workspace_insert_own" on public.solvedesk_workspace;
create policy "workspace_insert_own"
on public.solvedesk_workspace
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "workspace_update_own" on public.solvedesk_workspace;
create policy "workspace_update_own"
on public.solvedesk_workspace
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "workspace_delete_own" on public.solvedesk_workspace;
create policy "workspace_delete_own"
on public.solvedesk_workspace
for delete
to authenticated
using (auth.uid() = user_id);
