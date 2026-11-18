create or replace function public.admin_set_profile_access(
  p_user_id uuid,
  p_role text,
  p_membership_status text
)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_target public.profiles%rowtype;
  v_admin_count bigint;
begin
  if auth.uid() is null or not (select private.is_admin()) then
    raise exception 'Not authorized' using errcode = '42501';
  end if;

  if p_user_id is null then
    raise exception 'Member is required' using errcode = '22023';
  end if;

  if p_role is null or p_role not in ('member', 'organizer', 'admin') then
    raise exception 'Invalid role' using errcode = '22023';
  end if;

  if p_membership_status is null
     or p_membership_status not in ('pending', 'approved', 'rejected') then
    raise exception 'Invalid membership status' using errcode = '22023';
  end if;

  if p_role in ('organizer', 'admin') and p_membership_status <> 'approved' then
    raise exception 'Organizer and admin must be approved' using errcode = '22023';
  end if;

  -- Serialize role changes so concurrent requests cannot remove the final approved admin.
  perform pg_advisory_xact_lock(20261118, 1);

  select *
    into v_target
    from public.profiles
   where id = p_user_id
   for update;

  if not found then
    raise exception 'Profile not found' using errcode = 'P0002';
  end if;

  if v_target.role = 'admin'
     and v_target.membership_status = 'approved'
     and p_role <> 'admin' then
    select count(*)
      into v_admin_count
      from public.profiles
     where role = 'admin'
       and membership_status = 'approved';

    if v_admin_count <= 1 then
      raise exception 'Cannot remove the last approved admin' using errcode = '23514';
    end if;
  end if;

  update public.profiles
     set role = p_role,
         membership_status = p_membership_status
   where id = p_user_id;
end;
$function$;
