-- SolveDesk Pro - Supabase schema
-- Rode este script no SQL Editor do Supabase.

create extension if not exists pgcrypto;

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

create table if not exists public.solvedesk_inventory_sectors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  owner text,
  physical_location text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, name)
);

create table if not exists public.solvedesk_inventory_resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_type text not null,
  name text not null,
  patrimony text,
  sector_id uuid references public.solvedesk_inventory_sectors(id) on delete set null,
  sector_name text,
  location text,
  desk_room text,
  responsible text,
  status text,
  physical_state text,
  quantity numeric not null default 1,
  available numeric not null default 0,
  registered_at date,
  last_maintenance date,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.solvedesk_inventory_movements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid references public.solvedesk_inventory_resources(id) on delete cascade,
  resource_patrimony text,
  movement_type text not null,
  description text,
  from_sector text,
  to_sector text,
  actor text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.solvedesk_inventory_maintenances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_id uuid references public.solvedesk_inventory_resources(id) on delete set null,
  resource_patrimony text,
  reported_problem text not null,
  technician text,
  entry_date date,
  exit_date date,
  status text,
  applied_solution text,
  cost numeric not null default 0,
  metadata jsonb not null default '{}'::jsonb,
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

drop trigger if exists solvedesk_inventory_sectors_set_updated_at on public.solvedesk_inventory_sectors;
create trigger solvedesk_inventory_sectors_set_updated_at
before update on public.solvedesk_inventory_sectors
for each row execute function public.set_updated_at();

drop trigger if exists solvedesk_inventory_resources_set_updated_at on public.solvedesk_inventory_resources;
create trigger solvedesk_inventory_resources_set_updated_at
before update on public.solvedesk_inventory_resources
for each row execute function public.set_updated_at();

drop trigger if exists solvedesk_inventory_maintenances_set_updated_at on public.solvedesk_inventory_maintenances;
create trigger solvedesk_inventory_maintenances_set_updated_at
before update on public.solvedesk_inventory_maintenances
for each row execute function public.set_updated_at();

alter table public.solvedesk_profiles enable row level security;
alter table public.solvedesk_workspace enable row level security;
alter table public.solvedesk_inventory_sectors enable row level security;
alter table public.solvedesk_inventory_resources enable row level security;
alter table public.solvedesk_inventory_movements enable row level security;
alter table public.solvedesk_inventory_maintenances enable row level security;
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

drop policy if exists "inventory_sectors_select_own" on public.solvedesk_inventory_sectors;
create policy "inventory_sectors_select_own" on public.solvedesk_inventory_sectors
for select to authenticated using (auth.uid() = user_id);

drop policy if exists "inventory_sectors_insert_own" on public.solvedesk_inventory_sectors;
create policy "inventory_sectors_insert_own" on public.solvedesk_inventory_sectors
for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "inventory_sectors_update_own" on public.solvedesk_inventory_sectors;
create policy "inventory_sectors_update_own" on public.solvedesk_inventory_sectors
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "inventory_sectors_delete_own" on public.solvedesk_inventory_sectors;
create policy "inventory_sectors_delete_own" on public.solvedesk_inventory_sectors
for delete to authenticated using (auth.uid() = user_id);

drop policy if exists "inventory_resources_select_own" on public.solvedesk_inventory_resources;
create policy "inventory_resources_select_own" on public.solvedesk_inventory_resources
for select to authenticated using (auth.uid() = user_id);

drop policy if exists "inventory_resources_insert_own" on public.solvedesk_inventory_resources;
create policy "inventory_resources_insert_own" on public.solvedesk_inventory_resources
for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "inventory_resources_update_own" on public.solvedesk_inventory_resources;
create policy "inventory_resources_update_own" on public.solvedesk_inventory_resources
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "inventory_resources_delete_own" on public.solvedesk_inventory_resources;
create policy "inventory_resources_delete_own" on public.solvedesk_inventory_resources
for delete to authenticated using (auth.uid() = user_id);

drop policy if exists "inventory_movements_select_own" on public.solvedesk_inventory_movements;
create policy "inventory_movements_select_own" on public.solvedesk_inventory_movements
for select to authenticated using (auth.uid() = user_id);

drop policy if exists "inventory_movements_insert_own" on public.solvedesk_inventory_movements;
create policy "inventory_movements_insert_own" on public.solvedesk_inventory_movements
for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "inventory_movements_update_own" on public.solvedesk_inventory_movements;
create policy "inventory_movements_update_own" on public.solvedesk_inventory_movements
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "inventory_movements_delete_own" on public.solvedesk_inventory_movements;
create policy "inventory_movements_delete_own" on public.solvedesk_inventory_movements
for delete to authenticated using (auth.uid() = user_id);

drop policy if exists "inventory_maintenances_select_own" on public.solvedesk_inventory_maintenances;
create policy "inventory_maintenances_select_own" on public.solvedesk_inventory_maintenances
for select to authenticated using (auth.uid() = user_id);

drop policy if exists "inventory_maintenances_insert_own" on public.solvedesk_inventory_maintenances;
create policy "inventory_maintenances_insert_own" on public.solvedesk_inventory_maintenances
for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "inventory_maintenances_update_own" on public.solvedesk_inventory_maintenances;
create policy "inventory_maintenances_update_own" on public.solvedesk_inventory_maintenances
for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "inventory_maintenances_delete_own" on public.solvedesk_inventory_maintenances;
create policy "inventory_maintenances_delete_own" on public.solvedesk_inventory_maintenances
for delete to authenticated using (auth.uid() = user_id);
