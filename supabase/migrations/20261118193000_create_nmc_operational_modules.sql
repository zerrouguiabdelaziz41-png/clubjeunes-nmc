-- NMC: core operational modules (additive schema only).
-- No existing member/profile records are modified or deleted.

create or replace function private.is_approved_nmc_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid())
      and p.membership_status = 'approved'
  );
$$;

create or replace function private.is_active_nmc_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
      and p.membership_status = 'approved'
  );
$$;

revoke all on function private.is_approved_nmc_member() from public, anon;
revoke all on function private.is_active_nmc_admin() from public, anon;
grant execute on function private.is_approved_nmc_member() to authenticated;
grant execute on function private.is_active_nmc_admin() to authenticated;

create table if not exists public.committee_members (
  id uuid primary key default gen_random_uuid(),
  committee_id uuid not null references public.committees(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  committee_role text not null default 'member' check (committee_role in ('chair','member')),
  joined_at timestamptz not null default now(),
  is_active boolean not null default true,
  unique (committee_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(btrim(title)) between 2 and 180),
  description text,
  status text not null default 'planning' check (status in ('planning','active','on_hold','completed','cancelled')),
  start_date date,
  due_date date,
  committee_id uuid references public.committees(id) on delete set null,
  lead_user_id uuid references public.profiles(id) on delete set null,
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (due_date is null or start_date is null or due_date >= start_date)
);

create table if not exists public.project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null check (length(btrim(title)) between 2 and 180),
  description text,
  status text not null default 'todo' check (status in ('todo','in_progress','blocked','done','cancelled')),
  priority text not null default 'medium' check (priority in ('low','medium','high','urgent')),
  assigned_to uuid references public.profiles(id) on delete set null,
  due_at timestamptz,
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(btrim(title)) between 2 and 180),
  description text,
  instructor_id uuid references public.profiles(id) on delete set null,
  starts_at timestamptz,
  ends_at timestamptz,
  location text,
  capacity integer check (capacity is null or capacity > 0),
  status text not null default 'draft' check (status in ('draft','open','in_progress','completed','cancelled')),
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'enrolled' check (status in ('enrolled','waitlisted','completed','withdrawn')),
  enrolled_at timestamptz not null default now(),
  unique (course_id, user_id)
);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(btrim(title)) between 2 and 180),
  agenda text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  meeting_type text not null default 'administrative' check (meeting_type in ('administrative','committee','project','general')),
  status text not null default 'scheduled' check (status in ('scheduled','held','cancelled')),
  committee_id uuid references public.committees(id) on delete set null,
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  check (ends_at is null or ends_at >= starts_at)
);

create table if not exists public.meeting_attendees (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  attendance_status text not null default 'invited' check (attendance_status in ('invited','accepted','declined','attended','absent')),
  unique (meeting_id, user_id)
);

create table if not exists public.meeting_minutes (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null unique references public.meetings(id) on delete cascade,
  content text not null,
  decisions jsonb not null default '[]'::jsonb check (jsonb_typeof(decisions) = 'array'),
  recorded_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partnerships (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null check (length(btrim(partner_name)) between 2 and 180),
  partner_type text,
  description text,
  contact_name text,
  contact_email text,
  contact_phone text,
  starts_on date,
  ends_on date,
  status text not null default 'prospective' check (status in ('prospective','active','expired','terminated')),
  document_url text,
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_on is null or starts_on is null or ends_on >= starts_on)
);

create table if not exists public.admin_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  recipient_id uuid not null references public.profiles(id) on delete restrict,
  subject text,
  body text not null check (length(btrim(body)) between 1 and 20000),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  archived_at timestamptz,
  check (sender_id <> recipient_id)
);

create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,119}$'),
  title text not null,
  content jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_page_versions (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.site_pages(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  title text not null,
  content jsonb not null,
  status text not null check (status in ('draft','published','archived')),
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  unique (page_id, version_number)
);

create table if not exists public.club_calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(btrim(title)) between 2 and 180),
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  event_type text not null default 'general' check (event_type in ('activity','meeting','training','deadline','general')),
  visibility text not null default 'members' check (visibility in ('public','members','admin')),
  related_activity_id uuid references public.activities(id) on delete set null,
  created_by uuid not null default auth.uid() references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at >= starts_at)
);

create index if not exists committee_members_user_idx on public.committee_members(user_id) where is_active;
create index if not exists projects_status_due_idx on public.projects(status, due_date);
create index if not exists project_tasks_project_status_idx on public.project_tasks(project_id, status);
create index if not exists project_tasks_assignee_idx on public.project_tasks(assigned_to);
create index if not exists courses_status_start_idx on public.courses(status, starts_at);
create index if not exists course_enrollments_user_idx on public.course_enrollments(user_id);
create index if not exists meetings_starts_idx on public.meetings(starts_at);
create index if not exists meeting_attendees_user_idx on public.meeting_attendees(user_id);
create index if not exists admin_messages_recipient_created_idx on public.admin_messages(recipient_id, created_at desc);
create index if not exists site_pages_status_idx on public.site_pages(status);
create index if not exists site_page_versions_page_idx on public.site_page_versions(page_id, version_number desc);
create index if not exists club_calendar_events_starts_idx on public.club_calendar_events(starts_at);

alter table public.committee_members enable row level security;
alter table public.projects enable row level security;
alter table public.project_tasks enable row level security;
alter table public.courses enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.meetings enable row level security;
alter table public.meeting_attendees enable row level security;
alter table public.meeting_minutes enable row level security;
alter table public.partnerships enable row level security;
alter table public.admin_messages enable row level security;
alter table public.site_pages enable row level security;
alter table public.site_page_versions enable row level security;
alter table public.club_calendar_events enable row level security;

-- Administrative access requires an approved admin account, not merely a stored role.
create policy committee_members_read_approved on public.committee_members
for select to authenticated using ((select private.is_approved_nmc_member()));
create policy committee_members_admin_manage on public.committee_members
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy projects_read_approved on public.projects
for select to authenticated using ((select private.is_approved_nmc_member()));
create policy projects_admin_manage on public.projects
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy project_tasks_read_approved on public.project_tasks
for select to authenticated using ((select private.is_approved_nmc_member()));
create policy project_tasks_admin_manage on public.project_tasks
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy courses_read_open_or_approved on public.courses
for select to anon, authenticated using (
  status = 'open' or (select private.is_approved_nmc_member())
);
create policy courses_admin_manage on public.courses
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy course_enrollments_read_self_or_admin on public.course_enrollments
for select to authenticated using (
  user_id = (select auth.uid()) or (select private.is_active_nmc_admin())
);
create policy course_enrollments_self_enroll on public.course_enrollments
for insert to authenticated with check (
  user_id = (select auth.uid())
  and (select private.is_approved_nmc_member())
  and exists (select 1 from public.courses c where c.id = course_id and c.status = 'open')
);
create policy course_enrollments_self_withdraw on public.course_enrollments
for update to authenticated using (user_id = (select auth.uid()))
with check (
  user_id = (select auth.uid())
  and status = 'withdrawn'
);
create policy course_enrollments_admin_manage on public.course_enrollments
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy meetings_read_admin_or_invited on public.meetings
for select to authenticated using (
  (select private.is_active_nmc_admin())
  or exists (
    select 1 from public.meeting_attendees a
    where a.meeting_id = id and a.user_id = (select auth.uid())
  )
);
create policy meetings_admin_manage on public.meetings
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy meeting_attendees_read_self_or_admin on public.meeting_attendees
for select to authenticated using (
  user_id = (select auth.uid()) or (select private.is_active_nmc_admin())
);
create policy meeting_attendees_admin_manage on public.meeting_attendees
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy meeting_minutes_read_admin_or_attendee on public.meeting_minutes
for select to authenticated using (
  (select private.is_active_nmc_admin())
  or exists (
    select 1 from public.meeting_attendees a
    where a.meeting_id = meeting_id and a.user_id = (select auth.uid())
  )
);
create policy meeting_minutes_admin_manage on public.meeting_minutes
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy partnerships_read_approved on public.partnerships
for select to authenticated using ((select private.is_approved_nmc_member()));
create policy partnerships_admin_manage on public.partnerships
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy admin_messages_participants_read on public.admin_messages
for select to authenticated using (
  sender_id = (select auth.uid()) or recipient_id = (select auth.uid())
);
create policy admin_messages_admin_send on public.admin_messages
for insert to authenticated with check (
  sender_id = (select auth.uid())
  and (select private.is_active_nmc_admin())
  and exists (
    select 1 from public.profiles p
    where p.id = recipient_id and p.role = 'admin' and p.membership_status = 'approved'
  )
);
create policy admin_messages_recipient_mark_read on public.admin_messages
for update to authenticated using (
  recipient_id = (select auth.uid())
  and (select private.is_active_nmc_admin())
) with check (
  recipient_id = (select auth.uid())
  and (select private.is_active_nmc_admin())
);

create policy site_pages_public_published_read on public.site_pages
for select to anon, authenticated using (status = 'published');
create policy site_pages_admin_read_drafts on public.site_pages
for select to authenticated using ((select private.is_active_nmc_admin()));
create policy site_pages_admin_manage on public.site_pages
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy site_page_versions_admin_only on public.site_page_versions
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

create policy club_calendar_public_read on public.club_calendar_events
for select to anon, authenticated using (visibility = 'public');
create policy club_calendar_member_read on public.club_calendar_events
for select to authenticated using (
  visibility = 'members' and (select private.is_approved_nmc_member())
);
create policy club_calendar_admin_read on public.club_calendar_events
for select to authenticated using (
  visibility = 'admin' and (select private.is_active_nmc_admin())
);
create policy club_calendar_admin_manage on public.club_calendar_events
for all to authenticated using ((select private.is_active_nmc_admin()))
with check ((select private.is_active_nmc_admin()));

-- Explicit table grants; RLS remains the row-level authorization boundary.
grant select on public.committee_members, public.projects, public.project_tasks,
  public.course_enrollments, public.meetings, public.meeting_attendees,
  public.meeting_minutes, public.partnerships, public.admin_messages,
  public.site_page_versions to authenticated;
grant insert, update, delete on public.committee_members, public.projects, public.project_tasks,
  public.courses, public.meetings, public.meeting_attendees, public.meeting_minutes,
  public.partnerships, public.admin_messages, public.site_pages,
  public.site_page_versions, public.club_calendar_events to authenticated;
grant select on public.courses to anon, authenticated;
grant select on public.site_pages, public.club_calendar_events to anon, authenticated;
grant update (read_at, archived_at) on public.admin_messages to authenticated;
grant select, insert on public.course_enrollments to authenticated;
grant update (status) on public.course_enrollments to authenticated;
