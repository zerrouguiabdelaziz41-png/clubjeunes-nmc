-- Draft/closed course records are administrator-only.
-- Members and anonymous visitors may discover only courses currently open for enrollment.
DROP POLICY IF EXISTS courses_authenticated_read ON public.courses;

CREATE POLICY courses_open_or_admin_read
ON public.courses
FOR SELECT TO authenticated
USING (
  status = 'open'
  OR (SELECT private.is_active_nmc_admin())
);
