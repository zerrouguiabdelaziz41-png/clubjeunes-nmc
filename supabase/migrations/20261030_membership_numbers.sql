-- Official club membership numbers: NMC-YYYY-0001
-- Run once in Supabase SQL Editor. Existing UUID profile IDs remain unchanged.

create table if not exists public.membership_number_counters (
  membership_year integer primary key,
  last_value integer not null default 0
);

alter table public.profiles
  add column if not exists membership_number text;

create unique index if not exists profiles_membership_number_unique
  on public.profiles (membership_number)
  where membership_number is not null;

create or replace function public.assign_club_membership_number()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_year integer := extract(year from coalesce(new.created_at, now()))::integer;
  next_value integer;
begin
  if new.membership_number is null or btrim(new.membership_number) = '' then
    insert into public.membership_number_counters (membership_year, last_value)
    values (current_year, 1)
    on conflict (membership_year)
    do update set last_value = public.membership_number_counters.last_value + 1
    returning last_value into next_value;

    new.membership_number := 'NMC-' || current_year::text || '-' || lpad(next_value::text, 4, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_assign_membership_number on public.profiles;
create trigger profiles_assign_membership_number
before insert on public.profiles
for each row execute function public.assign_club_membership_number();

-- Backfill existing profiles in creation order without changing their UUID IDs.
do $$
declare
  profile_row record;
begin
  for profile_row in
    select id, created_at
    from public.profiles
    where membership_number is null or btrim(membership_number) = ''
    order by created_at, id
  loop
    update public.profiles
    set membership_number = null
    where id = profile_row.id;
  end loop;
end;
$$;

-- Backfill is performed by the trigger in a separate update to guarantee one unique
-- number per existing profile and to keep the same yearly counter logic.
do $$
declare
  profile_row record;
begin
  for profile_row in
    select id, created_at
    from public.profiles
    where membership_number is null or btrim(membership_number) = ''
    order by created_at, id
  loop
    update public.profiles
    set created_at = coalesce(created_at, now())
    where id = profile_row.id;
    update public.profiles
    set membership_number = 'NMC-' || extract(year from coalesce(created_at, now()))::integer::text
      || '-' || lpad((
        select count(*)::text
        from public.profiles p2
        where extract(year from coalesce(p2.created_at, now())) = extract(year from coalesce(profile_row.created_at, now()))
          and (p2.created_at, p2.id) <= (profile_row.created_at, profile_row.id)
      ), 4, '0')
    where id = profile_row.id;
  end loop;
end;
$$;

-- Keep yearly counters at least as high as the numbers already assigned.
insert into public.membership_number_counters (membership_year, last_value)
select
  split_part(membership_number, '-', 2)::integer,
  max(split_part(membership_number, '-', 3)::integer)
from public.profiles
where membership_number ~ '^NMC-[0-9]{4}-[0-9]{4,}$'
group by split_part(membership_number, '-', 2)::integer
on conflict (membership_year)
do update set last_value = greatest(public.membership_number_counters.last_value, excluded.last_value);
