-- Allow invitees to accept or decline their own meeting invitation.
-- They cannot self-mark attendance or alter another attendee's record.

REVOKE UPDATE ON TABLE public.meeting_attendees FROM anon, authenticated;
GRANT UPDATE (attendance_status) ON TABLE public.meeting_attendees TO authenticated;

DROP POLICY IF EXISTS meeting_attendees_self_respond ON public.meeting_attendees;
CREATE POLICY meeting_attendees_self_respond
ON public.meeting_attendees
FOR UPDATE
TO authenticated
USING (
  user_id = (SELECT auth.uid())
  AND attendance_status = 'invited'
)
WITH CHECK (
  user_id = (SELECT auth.uid())
  AND attendance_status IN ('accepted', 'declined')
);
