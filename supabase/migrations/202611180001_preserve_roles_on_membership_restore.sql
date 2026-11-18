-- NMC: preserve technical roles when membership is revoked/restored.
-- Review and approve before applying to the live Supabase database.

CREATE OR REPLACE FUNCTION public.admin_revoke_membership(
  p_user_id uuid,
  p_reason text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  v_target public.profiles%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND membership_status = 'approved'
  ) THEN
    RAISE EXCEPTION 'Administrator permission required';
  END IF;

  IF p_user_id IS NULL OR p_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot revoke own membership';
  END IF;

  IF NULLIF(BTRIM(p_reason), '') IS NULL OR CHAR_LENGTH(p_reason) > 1000 THEN
    RAISE EXCEPTION 'A valid reason is required';
  END IF;

  SELECT * INTO v_target
  FROM public.profiles
  WHERE id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Member not found';
  END IF;

  IF v_target.role = 'admin' THEN
    RAISE EXCEPTION 'Cannot revoke administrator';
  END IF;

  IF v_target.membership_status IS DISTINCT FROM 'approved' THEN
    RAISE EXCEPTION 'Membership is not approved';
  END IF;

  -- Keep role unchanged; revoked membership status blocks member privileges.
  UPDATE public.profiles
  SET membership_status = 'revoked'
  WHERE id = p_user_id;

  INSERT INTO public.membership_access_history (
    user_id, performed_by, action, reason
  ) VALUES (
    p_user_id, auth.uid(), 'revoke', BTRIM(p_reason)
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_restore_membership(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  v_target public.profiles%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND membership_status = 'approved'
  ) THEN
    RAISE EXCEPTION 'Administrator permission required';
  END IF;

  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'Member is required';
  END IF;

  SELECT * INTO v_target
  FROM public.profiles
  WHERE id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Member not found';
  END IF;

  IF v_target.role = 'admin' THEN
    RAISE EXCEPTION 'Cannot modify administrator';
  END IF;

  IF v_target.membership_status IS DISTINCT FROM 'revoked'
     OR NOT EXISTS (
       SELECT 1 FROM public.membership_access_history
       WHERE user_id = p_user_id AND action = 'revoke'
     ) THEN
    RAISE EXCEPTION 'No revoked membership to restore';
  END IF;

  -- Restore membership only; preserve the member's pre-revocation role.
  UPDATE public.profiles
  SET membership_status = 'approved'
  WHERE id = p_user_id;

  INSERT INTO public.membership_access_history (
    user_id, performed_by, action
  ) VALUES (
    p_user_id, auth.uid(), 'restore'
  );
END;
$function$;

-- These functions are administrative actions and must never be callable by anon.
REVOKE ALL ON FUNCTION public.admin_revoke_membership(uuid, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_restore_membership(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_revoke_membership(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_restore_membership(uuid) TO authenticated;
