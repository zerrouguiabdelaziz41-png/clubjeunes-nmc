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

-- The membership history sequence is written through the two administrator
-- SECURITY DEFINER functions owned by postgres. API roles do not need direct
-- sequence access; service_role keeps its existing privileges.
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public
FROM anon, authenticated;

-- Stop future tables created by either project schema owner from being
-- exposed automatically. Migrations creating API-backed tables must GRANT
-- only the privileges required by their clients.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE ALL PRIVILEGES ON TABLES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public
  REVOKE ALL PRIVILEGES ON TABLES FROM anon, authenticated;

-- Public clients do not need direct sequence access on future objects.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE ALL PRIVILEGES ON SEQUENCES FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public
  REVOKE ALL PRIVILEGES ON SEQUENCES FROM anon, authenticated;

-- PostgreSQL's default PUBLIC EXECUTE grant is global: a per-schema REVOKE
-- cannot cancel it. Remove that default for functions created by either
-- project schema owner. This applies across schemas for those owners.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Also remove the explicit anon/authenticated defaults in public. Existing
-- functions, including the two intentional public RPCs, are not changed.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE EXECUTE ON FUNCTIONS FROM anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public
  REVOKE EXECUTE ON FUNCTIONS FROM anon, authenticated;
