drop function if exists public.verify_approved_member(text);

create function public.verify_approved_member(p_membership_number text)
returns table (
  membership_number text,
  full_name text,
  role text
)
language sql
stable
security definer
set search_path = ''
as $function$
  select
    p.membership_number,
    p.full_name,
    p.role
  from public.profiles as p
  where p.membership_status = 'approved'
    and p.membership_number = upper(btrim(p_membership_number))
    and p_membership_number is not null
    and length(btrim(p_membership_number)) between 13 and 32
  limit 1;
$function$;

revoke all on function public.verify_approved_member(text) from public;
grant execute on function public.verify_approved_member(text) to anon, authenticated;
