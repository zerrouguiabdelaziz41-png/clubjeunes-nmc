-- Partnership records include contact names, direct phone/email details, and document URLs.
-- Keep them visible only to active administrators; no member-facing UI consumes this table.
DROP POLICY IF EXISTS partnerships_read_approved ON public.partnerships;

CREATE POLICY partnerships_read_admin
ON public.partnerships
FOR SELECT TO authenticated
USING ((SELECT private.is_active_nmc_admin()));
