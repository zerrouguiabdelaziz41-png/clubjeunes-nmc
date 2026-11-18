-- Replace the broad ALL policy with command-specific admin policies.
DROP POLICY IF EXISTS site_page_versions_admin_only ON public.site_page_versions;

CREATE POLICY site_page_versions_admin_read
ON public.site_page_versions
FOR SELECT TO authenticated
USING ((SELECT private.is_active_nmc_admin()));

CREATE POLICY site_page_versions_admin_insert
ON public.site_page_versions
FOR INSERT TO authenticated
WITH CHECK ((SELECT private.is_active_nmc_admin()));

CREATE POLICY site_page_versions_admin_update
ON public.site_page_versions
FOR UPDATE TO authenticated
USING ((SELECT private.is_active_nmc_admin()))
WITH CHECK ((SELECT private.is_active_nmc_admin()));

CREATE POLICY site_page_versions_admin_delete
ON public.site_page_versions
FOR DELETE TO authenticated
USING ((SELECT private.is_active_nmc_admin()));
