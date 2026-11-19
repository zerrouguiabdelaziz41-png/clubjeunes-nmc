-- Serialize withdrawals with enrollments by locking the course before the enrollment row.
-- This avoids the row->course lock inversion previously introduced by the AFTER UPDATE trigger.

DROP TRIGGER IF EXISTS promote_course_waitlist_after_withdrawal ON public.course_enrollments;
DROP FUNCTION IF EXISTS private.promote_waitlisted_course_enrollment();

DROP POLICY IF EXISTS course_enrollments_self_withdraw ON public.course_enrollments;
DROP POLICY IF EXISTS course_enrollments_update_self_or_admin ON public.course_enrollments;
DROP POLICY IF EXISTS course_enrollments_admin_manage ON public.course_enrollments;

-- Preserve administrative CRUD while requiring withdrawals to use the RPC below.
CREATE POLICY course_enrollments_admin_insert
ON public.course_enrollments
FOR INSERT TO authenticated
WITH CHECK ((SELECT private.is_active_nmc_admin()));

CREATE POLICY course_enrollments_admin_update
ON public.course_enrollments
FOR UPDATE TO authenticated
USING ((SELECT private.is_active_nmc_admin()))
WITH CHECK (
  (SELECT private.is_active_nmc_admin())
  AND status <> 'withdrawn'
);

CREATE POLICY course_enrollments_admin_delete
ON public.course_enrollments
FOR DELETE TO authenticated
USING ((SELECT private.is_active_nmc_admin()));

CREATE OR REPLACE FUNCTION public.withdraw_course_enrollment(p_enrollment_id uuid)
RETURNS TABLE (enrollment_id uuid, enrollment_status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_course_id uuid;
  v_course_status text;
  v_previous_status text;
  v_next_enrollment_id uuid;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '28000';
  END IF;

  -- Read the course reference first, without locking the enrollment row.
  SELECT e.course_id
    INTO v_course_id
    FROM public.course_enrollments AS e
   WHERE e.id = p_enrollment_id
     AND (
       e.user_id = auth.uid()
       OR (SELECT private.is_active_nmc_admin())
     );

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Enrollment not found' USING ERRCODE = 'P0002';
  END IF;

  -- All enrollment and withdrawal operations take this lock before row locks.
  SELECT c.status
    INTO v_course_status
    FROM public.courses AS c
   WHERE c.id = v_course_id
   FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Course not found' USING ERRCODE = 'P0002';
  END IF;

  SELECT e.status
    INTO v_previous_status
    FROM public.course_enrollments AS e
   WHERE e.id = p_enrollment_id
     AND (
       e.user_id = auth.uid()
       OR (SELECT private.is_active_nmc_admin())
     )
   FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Enrollment not found' USING ERRCODE = 'P0002';
  END IF;

  IF v_previous_status NOT IN ('enrolled', 'waitlisted') THEN
    RAISE EXCEPTION 'Only active enrollments can be withdrawn' USING ERRCODE = '55000';
  END IF;

  UPDATE public.course_enrollments AS e
     SET status = 'withdrawn'
   WHERE e.id = p_enrollment_id;

  IF v_previous_status = 'enrolled'
     AND v_course_status IN ('open', 'in_progress') THEN
    SELECT e.id
      INTO v_next_enrollment_id
      FROM public.course_enrollments AS e
     WHERE e.course_id = v_course_id
       AND e.status = 'waitlisted'
     ORDER BY e.enrolled_at ASC, e.id ASC
     LIMIT 1
     FOR UPDATE;

    IF v_next_enrollment_id IS NOT NULL THEN
      UPDATE public.course_enrollments AS e
         SET status = 'enrolled'
       WHERE e.id = v_next_enrollment_id
         AND e.status = 'waitlisted';
    END IF;
  END IF;

  RETURN QUERY
  SELECT e.id, e.status
    FROM public.course_enrollments AS e
   WHERE e.id = p_enrollment_id;
END;
$$;

REVOKE ALL ON FUNCTION public.withdraw_course_enrollment(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.withdraw_course_enrollment(uuid) TO authenticated;
