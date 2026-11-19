-- Enforce course capacity atomically to prevent concurrent over-enrollment.
-- Members enroll through this RPC; administrative management remains governed by RLS.

DROP POLICY IF EXISTS course_enrollments_self_enroll ON public.course_enrollments;
DROP POLICY IF EXISTS course_enrollments_insert_self_or_admin ON public.course_enrollments;

CREATE OR REPLACE FUNCTION public.enroll_in_course(p_course_id uuid)
RETURNS TABLE (enrollment_id uuid, enrollment_status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_capacity integer;
  v_enrolled_count integer;
  v_status text;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '28000';
  END IF;

  IF NOT private.is_approved_nmc_member() THEN
    RAISE EXCEPTION 'Approved membership required' USING ERRCODE = '42501';
  END IF;

  SELECT c.capacity
    INTO v_capacity
    FROM public.courses AS c
   WHERE c.id = p_course_id
     AND c.status = 'open'
   FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Course is not open for enrollment' USING ERRCODE = 'P0002';
  END IF;

  IF EXISTS (
    SELECT 1
      FROM public.course_enrollments AS e
     WHERE e.course_id = p_course_id
       AND e.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Already enrolled in this course' USING ERRCODE = '23505';
  END IF;

  SELECT count(*)
    INTO v_enrolled_count
    FROM public.course_enrollments AS e
   WHERE e.course_id = p_course_id
     AND e.status = 'enrolled';

  v_status := CASE
    WHEN v_capacity IS NULL OR v_enrolled_count < v_capacity THEN 'enrolled'
    ELSE 'waitlisted'
  END;

  RETURN QUERY
  INSERT INTO public.course_enrollments (course_id, user_id, status)
  VALUES (p_course_id, auth.uid(), v_status)
  RETURNING id, status;
END;
$$;

REVOKE ALL ON FUNCTION public.enroll_in_course(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.enroll_in_course(uuid) TO authenticated;
