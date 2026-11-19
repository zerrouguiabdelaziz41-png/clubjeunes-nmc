-- Promote the oldest waitlisted participant when an enrolled participant withdraws.
-- The course row lock serializes promotions with new enrollments and other withdrawals.

CREATE OR REPLACE FUNCTION private.promote_waitlisted_course_enrollment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_next_enrollment_id uuid;
BEGIN
  IF OLD.status = 'enrolled' AND NEW.status = 'withdrawn' THEN
    PERFORM 1
      FROM public.courses AS c
     WHERE c.id = NEW.course_id
       AND c.status IN ('open', 'in_progress')
     FOR UPDATE;

    IF FOUND THEN
      SELECT e.id
        INTO v_next_enrollment_id
        FROM public.course_enrollments AS e
       WHERE e.course_id = NEW.course_id
         AND e.status = 'waitlisted'
       ORDER BY e.enrolled_at ASC, e.id ASC
       LIMIT 1
       FOR UPDATE SKIP LOCKED;

      IF v_next_enrollment_id IS NOT NULL THEN
        UPDATE public.course_enrollments
           SET status = 'enrolled'
         WHERE id = v_next_enrollment_id
           AND status = 'waitlisted';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION private.promote_waitlisted_course_enrollment() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS promote_course_waitlist_after_withdrawal ON public.course_enrollments;
CREATE TRIGGER promote_course_waitlist_after_withdrawal
AFTER UPDATE OF status ON public.course_enrollments
FOR EACH ROW
EXECUTE FUNCTION private.promote_waitlisted_course_enrollment();
