-- Replace broad ALL admin policies with command-specific write policies.
-- Fold admin visibility into existing read policies to avoid duplicate SELECT paths.
DROP POLICY IF EXISTS club_calendar_admin_manage ON public.club_calendar_events;
DROP POLICY IF EXISTS club_calendar_member_read ON public.club_calendar_events;
DROP POLICY IF EXISTS club_calendar_public_read ON public.club_calendar_events;
CREATE POLICY club_calendar_public_read ON public.club_calendar_events FOR SELECT TO anon USING (visibility='public');
CREATE POLICY club_calendar_authenticated_read ON public.club_calendar_events FOR SELECT TO authenticated USING (visibility='public' OR (SELECT private.is_active_nmc_admin()) OR (visibility='members' AND (SELECT private.is_approved_nmc_member())));
CREATE POLICY club_calendar_admin_insert ON public.club_calendar_events FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY club_calendar_admin_update ON public.club_calendar_events FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY club_calendar_admin_delete ON public.club_calendar_events FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS committee_members_admin_manage ON public.committee_members;
DROP POLICY IF EXISTS committee_members_read_approved ON public.committee_members;
CREATE POLICY committee_members_read_approved ON public.committee_members FOR SELECT TO authenticated USING ((SELECT private.is_active_nmc_admin()) OR (SELECT private.is_approved_nmc_member()));
CREATE POLICY committee_members_admin_insert ON public.committee_members FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY committee_members_admin_update ON public.committee_members FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY committee_members_admin_delete ON public.committee_members FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS course_enrollments_admin_manage ON public.course_enrollments;
DROP POLICY IF EXISTS course_enrollments_self_enroll ON public.course_enrollments;
DROP POLICY IF EXISTS course_enrollments_read_self_or_admin ON public.course_enrollments;
DROP POLICY IF EXISTS course_enrollments_self_withdraw ON public.course_enrollments;
CREATE POLICY course_enrollments_read_self_or_admin ON public.course_enrollments FOR SELECT TO authenticated USING (user_id=(SELECT auth.uid()) OR (SELECT private.is_active_nmc_admin()));
CREATE POLICY course_enrollments_insert_self_or_admin ON public.course_enrollments FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()) OR (user_id=(SELECT auth.uid()) AND (SELECT private.is_approved_nmc_member()) AND EXISTS (SELECT 1 FROM public.courses c WHERE c.id=course_enrollments.course_id AND c.status='open')));
CREATE POLICY course_enrollments_update_self_or_admin ON public.course_enrollments FOR UPDATE TO authenticated USING (user_id=(SELECT auth.uid()) OR (SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()) OR (user_id=(SELECT auth.uid()) AND status='withdrawn'));
CREATE POLICY course_enrollments_admin_delete ON public.course_enrollments FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS courses_admin_manage ON public.courses;
DROP POLICY IF EXISTS courses_authenticated_read ON public.courses;
CREATE POLICY courses_authenticated_read ON public.courses FOR SELECT TO authenticated USING (status='open' OR (SELECT private.is_approved_nmc_member()) OR (SELECT private.is_active_nmc_admin()));
CREATE POLICY courses_admin_insert ON public.courses FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY courses_admin_update ON public.courses FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY courses_admin_delete ON public.courses FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS meeting_attendees_admin_manage ON public.meeting_attendees;
DROP POLICY IF EXISTS meeting_attendees_read_self_or_admin ON public.meeting_attendees;
CREATE POLICY meeting_attendees_read_self_or_admin ON public.meeting_attendees FOR SELECT TO authenticated USING (user_id=(SELECT auth.uid()) OR (SELECT private.is_active_nmc_admin()));
CREATE POLICY meeting_attendees_admin_insert ON public.meeting_attendees FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY meeting_attendees_admin_update ON public.meeting_attendees FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY meeting_attendees_admin_delete ON public.meeting_attendees FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS meeting_minutes_admin_manage ON public.meeting_minutes;
DROP POLICY IF EXISTS meeting_minutes_read_admin_or_attendee ON public.meeting_minutes;
CREATE POLICY meeting_minutes_read_admin_or_attendee ON public.meeting_minutes FOR SELECT TO authenticated USING ((SELECT private.is_active_nmc_admin()) OR ((SELECT private.is_approved_nmc_member()) AND EXISTS (SELECT 1 FROM public.meeting_attendees a WHERE a.meeting_id=meeting_minutes.meeting_id AND a.user_id=(SELECT auth.uid()))));
CREATE POLICY meeting_minutes_admin_insert ON public.meeting_minutes FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY meeting_minutes_admin_update ON public.meeting_minutes FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY meeting_minutes_admin_delete ON public.meeting_minutes FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS meetings_admin_manage ON public.meetings;
DROP POLICY IF EXISTS meetings_read_admin_or_invited ON public.meetings;
CREATE POLICY meetings_read_admin_or_invited ON public.meetings FOR SELECT TO authenticated USING ((SELECT private.is_active_nmc_admin()) OR ((SELECT private.is_approved_nmc_member()) AND EXISTS (SELECT 1 FROM public.meeting_attendees a WHERE a.meeting_id=meetings.id AND a.user_id=(SELECT auth.uid()))));
CREATE POLICY meetings_admin_insert ON public.meetings FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY meetings_admin_update ON public.meetings FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY meetings_admin_delete ON public.meetings FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS partnerships_admin_manage ON public.partnerships;
DROP POLICY IF EXISTS partnerships_read_approved ON public.partnerships;
CREATE POLICY partnerships_read_approved ON public.partnerships FOR SELECT TO authenticated USING ((SELECT private.is_active_nmc_admin()) OR (SELECT private.is_approved_nmc_member()));
CREATE POLICY partnerships_admin_insert ON public.partnerships FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY partnerships_admin_update ON public.partnerships FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY partnerships_admin_delete ON public.partnerships FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS project_tasks_admin_manage ON public.project_tasks;
DROP POLICY IF EXISTS project_tasks_read_approved ON public.project_tasks;
CREATE POLICY project_tasks_read_approved ON public.project_tasks FOR SELECT TO authenticated USING ((SELECT private.is_active_nmc_admin()) OR (SELECT private.is_approved_nmc_member()));
CREATE POLICY project_tasks_admin_insert ON public.project_tasks FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY project_tasks_admin_update ON public.project_tasks FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY project_tasks_admin_delete ON public.project_tasks FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS projects_admin_manage ON public.projects;
DROP POLICY IF EXISTS projects_read_approved ON public.projects;
CREATE POLICY projects_read_approved ON public.projects FOR SELECT TO authenticated USING ((SELECT private.is_active_nmc_admin()) OR (SELECT private.is_approved_nmc_member()));
CREATE POLICY projects_admin_insert ON public.projects FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY projects_admin_update ON public.projects FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY projects_admin_delete ON public.projects FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));

DROP POLICY IF EXISTS site_pages_admin_manage ON public.site_pages;
DROP POLICY IF EXISTS site_pages_public_published_read ON public.site_pages;
CREATE POLICY site_pages_public_published_read ON public.site_pages FOR SELECT TO anon USING (status='published');
CREATE POLICY site_pages_authenticated_read ON public.site_pages FOR SELECT TO authenticated USING (status='published' OR (SELECT private.is_active_nmc_admin()));
CREATE POLICY site_pages_admin_insert ON public.site_pages FOR INSERT TO authenticated WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY site_pages_admin_update ON public.site_pages FOR UPDATE TO authenticated USING ((SELECT private.is_active_nmc_admin())) WITH CHECK ((SELECT private.is_active_nmc_admin()));
CREATE POLICY site_pages_admin_delete ON public.site_pages FOR DELETE TO authenticated USING ((SELECT private.is_active_nmc_admin()));
