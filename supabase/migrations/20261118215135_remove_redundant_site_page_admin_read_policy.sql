-- site_pages_admin_manage already grants active administrators SELECT, so this identical SELECT policy is redundant.
DROP POLICY IF EXISTS site_pages_admin_read_drafts ON public.site_pages;
