-- Members may create only their own initial "enrolled" record.
-- Waitlist/completion/withdrawal states remain controlled by administrators or the
-- narrowly scoped self-withdrawal UPDATE policy.
DROP POLICY IF EXISTS course_enrollments_insert_self_or_admin ON public.course_enrollments;

CREATE POLICY course_enrollments_insert_self_or_admin
ON public.course_enrollments
FOR INSERT TO authenticated
WITH CHECK (
  (SELECT private.is_active_nmc_admin())
  OR (
    user_id = (SELECT auth.uid())
    AND status = 'enrolled'
    AND (SELECT private.is_approved_nmc_member())
    AND EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = course_enrollments.course_id
        AND c.status = 'open'
    )
  )
);
