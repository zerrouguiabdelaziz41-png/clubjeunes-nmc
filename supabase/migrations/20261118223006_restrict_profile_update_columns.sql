-- Client profile edits are limited to user-editable presentation/contact fields.
-- Role, membership state/number, primary key, and created_at remain server-managed.
REVOKE UPDATE ON TABLE public.profiles FROM anon, authenticated;
GRANT UPDATE (full_name, phone, interests, avatar_url)
ON TABLE public.profiles TO authenticated;
