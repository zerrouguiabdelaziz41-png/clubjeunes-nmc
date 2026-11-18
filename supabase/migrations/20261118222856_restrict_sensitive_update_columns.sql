-- Registrations can only change state; identity and activity linkage are immutable
-- through the client API. Admins/organizers retain the same status-update capability.
REVOKE UPDATE ON TABLE public.registrations FROM anon, authenticated;
GRANT UPDATE (status) ON TABLE public.registrations TO authenticated;

-- Admin inbox recipients only mark messages as read from the current UI.
-- Prevent edits to sender, recipient, subject, body, and creation timestamp.
REVOKE UPDATE ON TABLE public.admin_messages FROM anon, authenticated;
GRANT UPDATE (read_at) ON TABLE public.admin_messages TO authenticated;
