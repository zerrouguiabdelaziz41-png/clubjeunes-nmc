-- Correct meeting visibility for invited, currently approved members.
drop policy if exists meetings_read_admin_or_invited on public.meetings;
create policy meetings_read_admin_or_invited
on public.meetings
for select
to authenticated
using (
  (select private.is_active_nmc_admin())
  or (
    (select private.is_approved_nmc_member())
    and exists (
      select 1
      from public.meeting_attendees a
      where a.meeting_id = meetings.id
        and a.user_id = (select auth.uid())
    )
  )
);

-- Meeting minutes are visible only to active admins or approved attendees.
drop policy if exists meeting_minutes_read_admin_or_attendee on public.meeting_minutes;
create policy meeting_minutes_read_admin_or_attendee
on public.meeting_minutes
for select
to authenticated
using (
  (select private.is_active_nmc_admin())
  or (
    (select private.is_approved_nmc_member())
    and exists (
      select 1
      from public.meeting_attendees a
      where a.meeting_id = meeting_minutes.meeting_id
        and a.user_id = (select auth.uid())
    )
  )
);
