CREATE OR REPLACE FUNCTION public.admin_assign_committee_chair(p_committee_id uuid, p_user_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $function$
DECLARE v_member_id uuid; v_member_active boolean; v_full_name text;
BEGIN
  IF auth.uid() IS NULL OR NOT (SELECT private.is_active_nmc_admin()) THEN RAISE EXCEPTION 'Administrator permission required' USING errcode='42501'; END IF;
  IF p_committee_id IS NULL OR p_user_id IS NULL THEN RAISE EXCEPTION 'Committee and member are required' USING errcode='22023'; END IF;
  PERFORM 1 FROM public.committees WHERE id=p_committee_id AND is_active=true FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Active committee not found' USING errcode='P0002'; END IF;
  SELECT full_name INTO v_full_name FROM public.profiles WHERE id=p_user_id AND membership_status='approved' FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Only approved members can chair a committee' USING errcode='23514'; END IF;
  SELECT id,is_active INTO v_member_id,v_member_active FROM public.committee_members WHERE committee_id=p_committee_id AND user_id=p_user_id FOR UPDATE;
  IF NOT FOUND THEN
    INSERT INTO public.committee_members(committee_id,user_id,committee_role,is_active) VALUES(p_committee_id,p_user_id,'member',true) RETURNING id INTO v_member_id;
  ELSIF NOT v_member_active THEN RAISE EXCEPTION 'Inactive committee members cannot be assigned as chair' USING errcode='23514';
  END IF;
  UPDATE public.committee_members SET committee_role='member' WHERE committee_id=p_committee_id AND committee_role='chair' AND is_active=true AND id<>v_member_id;
  UPDATE public.committee_members SET committee_role='chair' WHERE id=v_member_id AND is_active=true;
  UPDATE public.committees SET chair_user_id=p_user_id,chair_name=v_full_name,updated_at=now() WHERE id=p_committee_id;
END;
$function$;
CREATE OR REPLACE FUNCTION public.admin_set_committee_member_active(p_membership_id uuid,p_is_active boolean)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $function$
DECLARE v_committee_id uuid; v_user_id uuid; v_role text;
BEGIN
  IF auth.uid() IS NULL OR NOT (SELECT private.is_active_nmc_admin()) THEN RAISE EXCEPTION 'Administrator permission required' USING errcode='42501'; END IF;
  IF p_membership_id IS NULL OR p_is_active IS NULL THEN RAISE EXCEPTION 'Membership and active state are required' USING errcode='22023'; END IF;
  SELECT committee_id,user_id,committee_role INTO v_committee_id,v_user_id,v_role FROM public.committee_members WHERE id=p_membership_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Committee membership not found' USING errcode='P0002'; END IF;
  PERFORM 1 FROM public.committees WHERE id=v_committee_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Committee not found' USING errcode='P0002'; END IF;
  IF p_is_active AND NOT EXISTS(SELECT 1 FROM public.profiles WHERE id=v_user_id AND membership_status='approved') THEN RAISE EXCEPTION 'Only approved members can be active in a committee' USING errcode='23514'; END IF;
  IF NOT p_is_active AND v_role='chair' THEN
    UPDATE public.committees SET chair_user_id=NULL,chair_name=NULL,updated_at=now() WHERE id=v_committee_id AND chair_user_id=v_user_id;
  END IF;
  UPDATE public.committee_members SET is_active=p_is_active,committee_role=CASE WHEN p_is_active THEN committee_role ELSE 'member' END WHERE id=p_membership_id;
END;
$function$;
REVOKE ALL ON FUNCTION public.admin_assign_committee_chair(uuid,uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_set_committee_member_active(uuid,boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_assign_committee_chair(uuid,uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_committee_member_active(uuid,boolean) TO authenticated;
