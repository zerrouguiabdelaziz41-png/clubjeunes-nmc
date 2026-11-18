-- Keep cancellation records instead of allowing members to hard-delete registrations.
drop policy if exists "Registrations: owner or admin deletes" on public.registrations;
create policy "Registrations: admin deletes"
on public.registrations
for delete to authenticated
using ((select private.is_admin()));

-- Members may cancel their own active registration; they cannot mark attendance
-- or change ownership/activity because UPDATE is column-limited to status.
drop policy if exists "Registrations: owner cancels own registration" on public.registrations;
create policy "Registrations: owner cancels own registration"
on public.registrations
for update to authenticated
using (
  user_id = (select auth.uid())
  and status = 'registered'
)
with check (
  user_id = (select auth.uid())
  and status = 'cancelled'
);
