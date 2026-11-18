-- Enrollment owners may only withdraw their own enrollment.
-- Column-level privileges prevent changing ownership, course assignment, or timestamps
-- even when the row-level UPDATE policy permits a self-withdrawal.
REVOKE UPDATE ON TABLE public.course_enrollments FROM anon, authenticated;
GRANT UPDATE (status) ON TABLE public.course_enrollments TO authenticated;
