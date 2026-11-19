-- Harden the exposed public schema without changing row-level policies.
--
-- Anonymous clients are limited to the six relations that have explicit
-- public-read RLS policies. Authenticated users keep their existing DML
-- privileges; only database-maintenance and schema-reference privileges
-- that the application does not need are removed.
--
-- New objects created by either project schema owner must receive explicit
-- API grants in the migration that creates them.

-- anon has no write policy in the current public schema. Remove all table
-- privileges, then restore SELECT only for relations with public-read RLS.
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM anon;

GRANT SELECT ON TABLE
  public.activities,
  public.club_calendar_events,
  public.committees,
  public.courses,
  public.news,
  public.site_pages
TO anon;

-- RLS continues to govern authenticated CRUD. These privileges are not
-- required by the application and are not constrained by ordinary RLS.
REVOKE TRUNCATE, REFERENCES, TRIGGER, MAINTAIN
ON ALL TABLES IN SCHEMA public
FROM authenticated;

-- The only public-schema sequence is used by the server-side membership
-- audit workflow. service_role retains its existing privileges.
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public
FROM anon, authenticated;

-- Stop future tables created by either schema owner from being exposed
-- automatically. Migrations creating API-backed tables must GRANT only
-- the privileges required by their clients.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE ALL PRIVILEGES ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public
  REVOKE ALL PRIVILEGES ON TABLES FROM anon, authenticated;

-- Public clients do not need direct sequence access.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE ALL PRIVILEGES ON SEQUENCES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public
  REVOKE ALL PRIVILEGES ON SEQUENCES FROM anon, authenticated;

-- Function execution is granted explicitly by each migration. In
-- particular, the two intentional public RPCs keep their current ACLs;
-- this only changes defaults for functions created in the future.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC, anon, authenticated;

