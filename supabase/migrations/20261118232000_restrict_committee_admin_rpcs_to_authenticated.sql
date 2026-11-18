REVOKE EXECUTE ON FUNCTION public.admin_assign_committee_chair(uuid, uuid) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_set_committee_member_active(uuid, boolean) FROM anon, PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_assign_committee_chair(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_committee_member_active(uuid, boolean) TO authenticated;
