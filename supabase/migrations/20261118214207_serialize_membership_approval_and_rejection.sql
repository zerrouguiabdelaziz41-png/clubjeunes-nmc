alter table public.membership_requests
  add column if not exists rejection_processing boolean not null default false;

create or replace function public.begin_membership_rejection_audit(
  p_request_reference text,
  p_performed_by uuid,
  p_reason text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_id uuid;
  v_request_id uuid;
  v_user_id uuid;
begin
  if current_setting('request.jwt.claim.role', true) is distinct from 'service_role' then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  if p_request_reference is null
     or length(btrim(p_request_reference)) = 0
     or p_performed_by is null
     or p_reason is null
     or char_length(btrim(p_reason)) < 3
     or char_length(btrim(p_reason)) > 1000 then
    raise exception 'invalid audit data' using errcode = '22023';
  end if;

  begin
    v_request_id := btrim(p_request_reference)::uuid;
  exception when invalid_text_representation then
    raise exception 'invalid request reference' using errcode = '22023';
  end;

  select r.user_id
    into v_user_id
    from public.membership_requests r
   where r.id = v_request_id
     and r.status = 'pending'
     and r.rejection_processing = false
   for update;

  if not found then
    raise exception 'membership request is no longer pending' using errcode = 'P0002';
  end if;

  perform 1
    from public.profiles p
   where p.id = v_user_id
     and p.role = 'member'
     and p.membership_status = 'pending'
   for update;

  if not found then
    raise exception 'membership applicant is no longer pending' using errcode = 'P0002';
  end if;

  update public.membership_requests
     set rejection_processing = true
   where id = v_request_id
     and status = 'pending'
     and rejection_processing = false;

  if not found then
    raise exception 'membership rejection already in progress' using errcode = '40001';
  end if;

  insert into nmc_private.membership_rejection_audit
    (request_reference, performed_by, reason)
  values
    (btrim(p_request_reference), p_performed_by, btrim(p_reason))
  returning id into v_id;

  return v_id;
end;
$function$;

create or replace function public.finish_membership_rejection_audit(
  p_audit_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_request_reference text;
begin
  if current_setting('request.jwt.claim.role', true) is distinct from 'service_role' then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  if p_status not in ('completed', 'failed') then
    raise exception 'invalid status' using errcode = '22023';
  end if;

  select request_reference
    into v_request_reference
    from nmc_private.membership_rejection_audit
   where id = p_audit_id
     and status = 'processing'
   for update;

  if not found then
    raise exception 'audit record not found or already finalized' using errcode = 'P0002';
  end if;

  update nmc_private.membership_rejection_audit
     set status = p_status,
         completed_at = now()
   where id = p_audit_id
     and status = 'processing';

  if not found then
    raise exception 'audit record not found or already finalized' using errcode = 'P0002';
  end if;

  if p_status = 'failed' then
    update public.membership_requests
       set rejection_processing = false
     where id = v_request_reference::uuid
       and status = 'pending'
       and rejection_processing = true;
  end if;
end;
$function$;

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
    raise exception 'Not authorized' using errcode = '42501';
  end if;

  if p_status is distinct from 'approved' then
    raise exception 'Membership rejection must use the admin-reject-membership server function';
  end if;

  select r.user_id
    into v_user_id
    from public.membership_requests r
   where r.id = p_request_id
     and r.status = 'pending'
     and r.rejection_processing = false
   for update;

  if not found then
    raise exception 'Pending membership request not found or rejection is in progress';
  end if;

  update public.membership_requests
     set status = 'approved',
         admin_notes = p_admin_notes
   where id = p_request_id
     and status = 'pending'
     and rejection_processing = false;

  if not found then
    raise exception 'Membership request changed during review';
  end if;

  update public.profiles
     set membership_status = 'approved'
   where id = v_user_id
     and role = 'member'
     and membership_status = 'pending';

  if not found then
    raise exception 'Pending member profile not found';
  end if;
end;
$function$;
