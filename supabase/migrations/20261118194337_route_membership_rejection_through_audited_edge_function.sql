-- Keep membership rejection on the audited server-side deletion workflow.
-- The legacy RPC may only approve a pending request.
create or replace function public.admin_review_membership(
  p_request_id uuid,
  p_status text,
  p_admin_notes text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_user_id uuid;
begin
  if auth.uid() is null or not (select private.is_admin()) then
    raise exception 'Not authorized';
  end if;

  if p_status is distinct from 'approved' then
    raise exception 'Membership rejection must use the admin-reject-membership server function';
  end if;

  select r.user_id
    into v_user_id
  from public.membership_requests r
  where r.id = p_request_id
    and r.status = 'pending'
  for update;

  if not found then
    raise exception 'Pending membership request not found';
  end if;

  update public.membership_requests
  set status = 'approved',
      admin_notes = p_admin_notes
  where id = p_request_id;

  update public.profiles
  set membership_status = 'approved'
  where id = v_user_id;

  if not found then
    raise exception 'Profile not found';
  end if;
end;
$function$;

revoke all on function public.admin_review_membership(uuid, text, text) from public, anon;
grant execute on function public.admin_review_membership(uuid, text, text) to authenticated;
