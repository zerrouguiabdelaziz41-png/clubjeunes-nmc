-- Project task details are private to the assignee and active administrators.
-- The member panel only displays tasks assigned to the signed-in user.
DROP POLICY IF EXISTS project_tasks_read_approved ON public.project_tasks;

CREATE POLICY project_tasks_read_assigned_or_admin
ON public.project_tasks
FOR SELECT TO authenticated
USING (
  (SELECT private.is_active_nmc_admin())
  OR (
    (SELECT private.is_approved_nmc_member())
    AND assigned_to = (SELECT auth.uid())
  )
);
