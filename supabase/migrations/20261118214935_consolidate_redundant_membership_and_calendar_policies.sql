-- Consolidate overlapping permissive policies without widening row access.
DROP POLICY IF EXISTS club_calendar_admin_read ON public.club_calendar_events;
DROP POLICY IF EXISTS "Registrations: admin or assigned organizer updates" ON public.registrations;
DROP POLICY IF EXISTS "Registrations: owner cancels own registration" ON public.registrations;
CREATE POLICY "Registrations: admin organizer or owner cancellation updates"
ON public.registrations FOR UPDATE TO authenticated
USING (
  (SELECT private.is_admin())
  OR (SELECT private.is_organizer_for(registrations.activity_id))
  OR (user_id = (SELECT auth.uid()) AND status = 'registered')
)
WITH CHECK (
  (SELECT private.is_admin())
  OR (SELECT private.is_organizer_for(registrations.activity_id))
  OR (user_id = (SELECT auth.uid()) AND status = 'cancelled')
);