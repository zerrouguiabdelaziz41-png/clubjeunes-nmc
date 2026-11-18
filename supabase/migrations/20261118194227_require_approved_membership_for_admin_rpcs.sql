-- Require an approved membership for every legacy admin RPC using private.is_admin().
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
      and p.membership_status = 'approved'
  );
$function$;

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;
