-- Membership requests are created by the trusted auth.users trigger and
-- reviewed through the atomic admin RPC / audited Edge Function only.
REVOKE INSERT, UPDATE, DELETE ON TABLE public.membership_requests FROM anon, authenticated;

DROP POLICY IF EXISTS "Requests: submit own pending request" ON public.membership_requests;
DROP POLICY IF EXISTS "Requests: admin updates" ON public.membership_requests;
DROP POLICY IF EXISTS "Requests: admin deletes" ON public.membership_requests;
