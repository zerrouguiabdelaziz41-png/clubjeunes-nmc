-- Applicants read their current membership state from profiles.membership_status.
-- Keep membership_requests (including internal admin_notes and processing flags) admin-only.
DROP POLICY IF EXISTS "Requests: owner or admin reads" ON public.membership_requests;

CREATE POLICY membership_requests_admin_read
ON public.membership_requests
FOR SELECT TO authenticated
USING ((SELECT private.is_admin()));
