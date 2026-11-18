import React, { useCallback, useEffect, useState } from 'react';
import { getSupabaseClient } from '../lib/supabase.ts';

type ModuleKey = 'projects'|'committees'|'courses'|'meetings'|'partnerships'|'calendar'|'pages'|'messages';
const tabs: {key:ModuleKey;label:string}[] = [
  {key:'projects',label:'المشاريع والمهام'},{key:'committees',label:'اللجان'},
  {key:'courses',label:'الدورات والتكوين'},{key:'meetings',label:'الاجتماعات'},
  {key:'partnerships',label:'الشراكات'},{key:'calendar',label:'التقويم'},
  {key:'pages',label:'إدارة المحتوى'},{key:'messages',label:'مراسلات الإدارة'}
];
const styles = 'w-full rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-white';
const labels: Record<string,string> = {
  title:'العنوان',description:'الوصف',status:'الحالة',start_date:'تاريخ البداية',due_date:'آخر أجل',
  starts_at:'تاريخ ووقت البداية',ends_at:'تاريخ ووقت النهاية',location:'المكان',
  partner_name:'اسم الشريك',partner_type:'نوع الشراكة',contact_name:'اسم جهة الاتصال',
  contact_email:'البريد',contact_phone:'الهاتف',slug:'الرابط المختصر',body:'نص الرسالة',instructor_id:'المدرب',
  subject:'الموضوع',recipient_id:'المستلم',visibility:'الظهور',event_type:'نوع الحدث',
  agenda:'جدول الأعمال'
};
const fields: Record<ModuleKey,string[]> = {
  projects:['title','description','status','start_date','due_date','committee_id','lead_user_id'],
  committees:[],
  courses:['title','description','instructor_id','starts_at','ends_at','location','status'],
  meetings:['title','agenda','starts_at','ends_at','location','meeting_type','committee_id'],
  partnerships:['partner_name','partner_type','description','contact_name','contact_email','contact_phone','starts_on','ends_on','status'],
  calendar:['title','description','starts_at','ends_at','location','event_type','visibility'],
  pages:['slug','title'],
  messages:['recipient_id','subject','body']
};
function displayRow(row:any) {
  return row.title || row.partner_name || row.slug || row.subject || row.name || row.id;
}
export const AdminModulesPanel: React.FC = () => {
  const client = getSupabaseClient();
  const [tab,setTab] = useState<ModuleKey>('projects');
  const [rows,setRows] = useState<any[]>([]);
  const [committees,setCommittees] = useState<any[]>([]);
  const [people,setPeople] = useState<any[]>([]);
  const [committeeUser,setCommitteeUser] = useState<Record<string,string>>({});
  const [committeeRole,setCommitteeRole] = useState<Record<string,string>>({});
  const [pageDrafts,setPageDrafts] = useState<Record<string,string>>({});
  const [projectDrafts,setProjectDrafts] = useState<Record<string,any>>({});
  const [currentUserId,setCurrentUserId] = useState('');
  const [courseEnrollments,setCourseEnrollments] = useState<any[]>([]);
  const [meetingPeople,setMeetingPeople] = useState<any[]>([]);
  const [meetingCommittees,setMeetingCommittees] = useState<any[]>([]);
  const [meetingAttendees,setMeetingAttendees] = useState<any[]>([]);
  const [meetingAttendeeSelection,setMeetingAttendeeSelection] = useState<Record<string,string>>({});
  const [meetingMinuteDrafts,setMeetingMinuteDrafts] = useState<Record<string,string>>({});
  const [meetingMinuteApprovals,setMeetingMinuteApprovals] = useState<Record<string,any>>({});
  const [pageVersions,setPageVersions] = useState<Record<string,any[]>>({});
  const [form,setForm] = useState<Record<string,string>>({});
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [notice,setNotice] = useState('');
  const load = useCallback(async () => {
    if (!client) return;
    setBusy(true); setError('');
    const {data:userData} = await client.auth.getUser();
    setCurrentUserId(userData.user?.id || '');
    const table = tab === 'calendar' ? 'club_calendar_events' : tab === 'pages' ? 'site_pages' : tab;
    const query = tab === 'messages'
      ? client.from('admin_messages').select('id,sender_id,recipient_id,subject,body,created_at,read_at').order('created_at',{ascending:false}).limit(100)
      : client.from(table).select('*').order('created_at',{ascending:false}).limit(100);
    const {data,error:loadError} = await query;
    if (loadError) setError(loadError.message); else setRows(data || []);
    if (tab === 'committees') {
      const [c,m] = await Promise.all([
        client.from('committees').select('*').order('id'),
        client.from('committee_members').select('*').order('joined_at',{ascending:false})
      ]);
      const {data:approvedPeople,error:peopleError} = await client.from('profiles').select('id,full_name,membership_number').eq('membership_status','approved').order('full_name');
      if (c.error) setError(c.error.message);
      else setCommittees((c.data || []).map((x:any)=>({...x,members:(m.data||[]).filter((y:any)=>y.committee_id===x.id)})));
      if (m.error) setError(m.error.message);
      if (peopleError) setError(peopleError.message); else setPeople(approvedPeople || []);
    }
    if (tab === 'messages') {
      const {data:admins,error:adminError} = await client.from('profiles').select('id,full_name').eq('role','admin').eq('membership_status','approved');
      if (adminError) setError(adminError.message); else setPeople(admins || []);
    }
    if (tab === 'projects') {
      const [peopleResult,committeeResult] = await Promise.all([
        client.from('profiles').select('id,full_name').eq('membership_status','approved').order('full_name'),
        client.from('committees').select('id,name').eq('is_active',true).order('name')
      ]);
      if (peopleResult.error) setError(peopleResult.error.message); else setPeople(peopleResult.data||[]);
      if (committeeResult.error) setError(committeeResult.error.message); else setMeetingCommittees(committeeResult.data||[]);
    }
    if (tab === 'courses') {
      const [enrollmentResult,peopleResult] = await Promise.all([
        client.from('course_enrollments').select('id,course_id,user_id,status,enrolled_at,profiles(full_name)').order('enrolled_at',{ascending:false}),
        client.from('profiles').select('id,full_name').eq('membership_status','approved').order('full_name')
      ]);
      if (enrollmentResult.error) setError(enrollmentResult.error.message); else setCourseEnrollments(enrollmentResult.data||[]);
      if (peopleResult.error) setError(peopleResult.error.message); else setPeople(peopleResult.data||[]);
    }
    if (tab === 'meetings') {
      const [memberResult,committeeResult,attendeeResult,minutesResult] = await Promise.all([
        client.from('profiles').select('id,full_name').eq('membership_status','approved').order('full_name'),
        client.from('committees').select('id,name').eq('is_active',true).order('name'),
        client.from('meeting_attendees').select('id,meeting_id,user_id,attendance_status').order('id'),
        client.from('meeting_minutes').select('id,meeting_id,content,decisions,updated_at,approved_by,approved_at')
      ]);
      if (memberResult.error) setError(memberResult.error.message); else setMeetingPeople(memberResult.data||[]);
      if (committeeResult.error) setError(committeeResult.error.message); else setMeetingCommittees(committeeResult.data||[]);
      if (attendeeResult.error) setError(attendeeResult.error.message); else setMeetingAttendees(attendeeResult.data||[]);
      if (minutesResult.error) setError(minutesResult.error.message); else {
        setMeetingMinuteDrafts(old=>({...Object.fromEntries((minutesResult.data||[]).map((m:any)=>[m.meeting_id,m.content||''])),...old}));
        setMeetingMinuteApprovals(Object.fromEntries((minutesResult.data||[]).map((m:any)=>[m.meeting_id,{approved_by:m.approved_by,approved_at:m.approved_at}])));
      }
    }
    setBusy(false);
  },[client,tab]);
  useEffect(()=>{ void load(); },[load]);
  const setField = (key:string,value:string) => setForm(old=>({...old,[key]:value}));
  const submit = async (e:React.FormEvent) => {
    e.preventDefault(); if (!client) return;
    setBusy(true); setError(''); setNotice('');
    const payload:any = {};
    for (const [key,value] of Object.entries(form)) {
      if (!value.trim()) continue;
      if (key.endsWith('_at')) payload[key] = new Date(value).toISOString();
      else payload[key] = value.trim();
    }
    if (tab === 'messages') payload.sender_id = (await client.auth.getUser()).data.user?.id;
    if (tab === 'pages') { payload.content = {}; payload.status = 'draft'; }
    const table = tab === 'calendar' ? 'club_calendar_events' : tab === 'pages' ? 'site_pages' : tab === 'messages' ? 'admin_messages' : tab;
    const {error:saveError} = await client.from(table).insert(payload);
    if (saveError) setError(saveError.message);
    else { setNotice('تم الحفظ بنجاح.'); setForm({}); await load(); }
    setBusy(false);
  };
  const addCommitteeMember = async (committeeId:string) => {
    if (!client) return;
    const userId = committeeUser[committeeId];
    const role = committeeRole[committeeId] || 'member';
    if (!userId) { setError('اختر عضواً معتمداً أولاً.'); return; }
    setBusy(true); setError(''); setNotice('');
    const {error:e} = await client.from('committee_members').insert({committee_id:committeeId,user_id:userId,committee_role:role});
    if (e) setError(e.message); else {
      setNotice(role === 'chair' ? 'تم تعيين رئيس اللجنة.' : 'تمت إضافة العضو إلى اللجنة.');
      setCommitteeUser(old=>({...old,[committeeId]:''}));
      await load();
    }
    setBusy(false);
  };
  const setCommitteeChair = async (committeeId:string,memberId:string) => {
    if (!client) return;
    setBusy(true); setError(''); setNotice('');
    const {error:demoteError} = await client.from('committee_members').update({committee_role:'member'}).eq('committee_id',committeeId).eq('committee_role','chair').eq('is_active',true);
    if (demoteError) {setError(demoteError.message);setBusy(false);return;}
    const {error:promoteError} = await client.from('committee_members').update({committee_role:'chair',is_active:true}).eq('id',memberId);
    if (promoteError) setError(promoteError.message);
    else setNotice('تم تحديث رئيس اللجنة.'); 
    await load(); setBusy(false);
  };
  const toggleCommitteeMember = async (id:string,isActive:boolean) => {
    if (!client) return;
    setBusy(true); setError('');
    const {error:e} = await client.from('committee_members').update({is_active:!isActive}).eq('id',id);
    if (e) setError(e.message); else {setNotice('تم تحديث حالة عضوية اللجنة.'); await load();}
    setBusy(false);
  };
  const savePageContent = async (page:any) => {
    if (!client) return;
    let parsed:any;
    try { parsed = JSON.parse(pageDrafts[page.id] ?? JSON.stringify(page.content ?? {}, null, 2)); }
    catch { setError('صيغة المحتوى ليست JSON صحيحة.'); return; }
    setBusy(true); setError(''); setNotice('');
    const {data:versions,error:versionError} = await client.from('site_page_versions').select('version_number').eq('page_id',page.id).order('version_number',{ascending:false}).limit(1);
    if (versionError) { setError(versionError.message); setBusy(false); return; }
    const versionNumber = (versions?.[0]?.version_number || 0) + 1;
    const {error:saveError} = await client.from('site_pages').update({content:parsed,updated_by:(await client.auth.getUser()).data.user?.id,updated_at:new Date().toISOString()}).eq('id',page.id);
    if (saveError) { setError(saveError.message); setBusy(false); return; }
    const {error:snapshotError} = await client.from('site_page_versions').insert({page_id:page.id,version_number:versionNumber,title:page.title,content:parsed,status:page.status});
    if (snapshotError) setError('تم تحديث المحتوى لكن تعذر حفظ نسخة الإصدار: '+snapshotError.message);
    else setNotice('تم حفظ المحتوى وإنشاء نسخة رقم '+versionNumber+'.');
    await load(); setBusy(false);
  };
  const loadPageVersions = async (pageId:string) => {
    if (!client) return;
    const {data,error:e} = await client.from('site_page_versions').select('id,version_number,title,status,created_at,content').eq('page_id',pageId).order('version_number',{ascending:false}).limit(20);
    if (e) setError(e.message); else setPageVersions(old=>({...old,[pageId]:data||[]}));
  };
  const restorePageVersion = async (page:any,version:any) => {
    if (!client || !window.confirm('سيتم استرجاع محتوى الإصدار المحدد. هل تريد المتابعة؟')) return;
    setBusy(true); setError(''); setNotice('');
    const {data:latest,error:latestError} = await client.from('site_page_versions').select('version_number').eq('page_id',page.id).order('version_number',{ascending:false}).limit(1);
    if (latestError) {setError(latestError.message);setBusy(false);return;}
    const nextVersion = (latest?.[0]?.version_number||0)+1;
    const {error:snapshotError} = await client.from('site_page_versions').insert({page_id:page.id,version_number:nextVersion,title:page.title,content:page.content,status:page.status});
    if (snapshotError) {setError('تعذر حفظ نسخة الحالة الحالية قبل الاسترجاع: '+snapshotError.message);setBusy(false);return;}
    const {error:restoreError} = await client.from('site_pages').update({title:version.title,content:version.content,status:version.status,published_at:version.status==='published'?new Date().toISOString():null,updated_by:currentUserId,updated_at:new Date().toISOString()}).eq('id',page.id);
    if (restoreError) setError(restoreError.message); else {setNotice('تم استرجاع الإصدار '+version.version_number+' وحفظ نسخة من الحالة السابقة.');setPageDrafts(old=>({...old,[page.id]:JSON.stringify(version.content,null,2)}));await load();}
    await loadPageVersions(page.id); setBusy(false);
  };
  const togglePagePublish = async (page:any) => {
    if (!client) return;
    const next = page.status === 'published' ? 'draft' : 'published';
    setBusy(true); setError('');
    const {error:e} = await client.from('site_pages').update({status:next,published_at:next==='published'?new Date().toISOString():null,updated_by:(await client.auth.getUser()).data.user?.id,updated_at:new Date().toISOString()}).eq('id',page.id);
    if (e) setError(e.message); else {setNotice(next==='published'?'تم نشر الصفحة.':'تم تحويل الصفحة إلى مسودة.'); await load();}
    setBusy(false);
  };
  const addMeetingAttendee = async (meetingId:string) => {
    if (!client) return;
    const userId = meetingAttendeeSelection[meetingId];
    if (!userId) {setError('اختر عضواً لإضافته إلى الاجتماع.');return;}
    setBusy(true);setError('');
    const {error:e} = await client.from('meeting_attendees').insert({meeting_id:meetingId,user_id:userId,attendance_status:'invited'});
    if (e) setError(e.message); else {setMeetingAttendeeSelection(old=>({...old,[meetingId]:''}));setNotice('تمت إضافة المدعو إلى الاجتماع.');await load();}
    setBusy(false);
  };
  const updateAttendance = async (id:string,status:string) => {
    if (!client) return;
    setBusy(true);setError('');
    const {error:e} = await client.from('meeting_attendees').update({attendance_status:status}).eq('id',id);
    if (e) setError(e.message); else await load();
    setBusy(false);
  };
  const saveMeetingMinutes = async (meetingId:string) => {
    if (!client) return;
    const content = (meetingMinuteDrafts[meetingId]||'').trim();
    if (!content) {setError('أدخل نص محضر الاجتماع قبل الحفظ.');return;}
    setBusy(true);setError('');
    const {error:e} = await client.from('meeting_minutes').upsert({meeting_id:meetingId,content,recorded_by:currentUserId,approved_by:null,approved_at:null,updated_at:new Date().toISOString()},{onConflict:'meeting_id'});
    if (e) setError(e.message); else {setNotice('تم حفظ محضر الاجتماع.');await load();}
    setBusy(false);
  };
  const saveProjectDetails = async (row:any) => {
    if (!client) return;
    const draft=projectDrafts[row.id]||{};
    const title=(draft.title??row.title).trim();
    const startDate=draft.start_date??row.start_date??'';
    const dueDate=draft.due_date??row.due_date??'';
    if (title.length<2) {setError('عنوان المشروع يجب أن يتكون من حرفين على الأقل.');return;}
    if (startDate&&dueDate&&dueDate<startDate) {setError('آخر أجل للمشروع لا يمكن أن يسبق تاريخ بدايته.');return;}
    setBusy(true);setError('');setNotice('');
    const {error:e}=await client.from('projects').update({title,description:(draft.description??row.description??'').trim()||null,start_date:startDate||null,due_date:dueDate||null,updated_at:new Date().toISOString()}).eq('id',row.id);
    if(e)setError(e.message);else{setNotice('تم تحديث بيانات المشروع.');await load();}
    setBusy(false);
  };
  const updateRowStatus = async (row:any,status:string) => {
    if (!client) return;
    const table = tab==='calendar'?'club_calendar_events':tab==='pages'?'site_pages':tab;
    const patch:any = tab==='calendar'?{visibility:status}:{status};
    if (tab==='pages') patch.updated_by=currentUserId;
    if (tab==='pages'||tab==='projects'||tab==='courses'||tab==='partnerships'||tab==='calendar') patch.updated_at=new Date().toISOString();
    if (tab==='pages') patch.published_at=status==='published'?new Date().toISOString():null;
    setBusy(true);setError('');setNotice('');
    const {error:e} = await client.from(table).update(patch).eq('id',row.id);
    if (e) setError(e.message); else {setNotice('تم تحديث حالة السجل.');await load();}
    setBusy(false);
  };
  const updateCourseEnrollment = async (id:string,status:string) => {
    if (!client) return;
    setBusy(true);setError('');setNotice('');
    const {error:e} = await client.from('course_enrollments').update({status}).eq('id',id);
    if (e) setError(e.message); else {setNotice('تم تحديث حالة تسجيل المتدرب.');await load();}
    setBusy(false);
  };
  const approveMeetingMinutes = async (meetingId:string) => {
    if (!client) return;
    setBusy(true);setError('');setNotice('');
    const {error:e} = await client.from('meeting_minutes').update({approved_by:currentUserId,approved_at:new Date().toISOString()}).eq('meeting_id',meetingId);
    if (e) setError(e.message); else {setNotice('تم اعتماد محضر الاجتماع.');await load();}
    setBusy(false);
  };
  const markRead = async (id:string) => {
    if (!client) return;
    const {error:e} = await client.from('admin_messages').update({read_at:new Date().toISOString()}).eq('id',id);
    if (e) setError(e.message); else await load();
  };
  return <section className="rounded-3xl border border-cyan-800 bg-[#06182c] p-5 space-y-4">
    <div><h2 className="text-xl font-black">إدارة وحدات النادي</h2><p className="text-xs text-slate-400 mt-1">مساحة الإدارة المركزية المرتبطة بقاعدة بيانات NMC.</p></div>
    <div className="flex gap-2 overflow-x-auto pb-2">{tabs.map(t=><button key={t.key} onClick={()=>{setTab(t.key);setForm({});setNotice('');}} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold border ${tab===t.key?'bg-cyan-800 border-cyan-500 text-white':'bg-[#030e1c] border-cyan-950 text-slate-300'}`}>{t.label}</button>)}</div>
    {error && <p role="alert" className="rounded-xl bg-rose-950/40 border border-rose-800 p-3 text-sm text-rose-200">{error}</p>}
    {notice && <p className="rounded-xl bg-emerald-950/40 border border-emerald-800 p-3 text-sm text-emerald-200">{notice}</p>}
    {tab==='committees' ? <div className="grid md:grid-cols-2 gap-3">{committees.map((c:any)=><article key={c.id} className="rounded-2xl border border-cyan-950 p-4"><h3 className="font-bold">{c.name || c.title || c.committee_name || 'لجنة'}</h3><p className="text-xs text-slate-500 mt-1">{c.description || '—'}</p><p className="text-xs text-cyan-300 mt-3">عدد الأعضاء: {c.members.filter((m:any)=>m.is_active).length}</p><div className="mt-3 space-y-2">{c.members.map((m:any)=><div key={m.id} className="flex items-center justify-between gap-2 text-xs border-t border-cyan-950 pt-2"><span>{people.find((p:any)=>p.id===m.user_id)?.full_name || 'عضو'} · {m.committee_role==='chair'?'رئيس اللجنة':'عضو'} · {m.is_active?'نشط':'غير نشط'}</span><div className="flex gap-2"><button disabled={busy||!m.is_active||m.committee_role==='chair'} onClick={()=>void setCommitteeChair(c.id,m.id)} className="text-cyan-300">تعيين رئيس</button><button disabled={busy} onClick={()=>void toggleCommitteeMember(m.id,m.is_active)} className="text-amber-300">{m.is_active?'تعطيل':'تفعيل'}</button></div></div>)}</div><div className="mt-3 grid sm:grid-cols-[1fr_auto_auto] gap-2"><select value={committeeUser[c.id]||''} onChange={e=>setCommitteeUser(old=>({...old,[c.id]:e.target.value}))} className={styles}><option value="">اختر عضواً معتمداً</option>{people.filter((p:any)=>!c.members.some((m:any)=>m.user_id===p.id)).map((p:any)=><option key={p.id} value={p.id}>{p.full_name || p.membership_number || p.id}</option>)}</select><select value={committeeRole[c.id]||'member'} onChange={e=>setCommitteeRole(old=>({...old,[c.id]:e.target.value}))} className={styles}><option value="member">عضو</option><option value="chair">رئيس</option></select><button disabled={busy||!committeeUser[c.id]} onClick={()=>void addCommitteeMember(c.id)} className="rounded-lg bg-cyan-900 px-3 py-2 text-xs">إضافة</button></div></article>)}{!committees.length&&<p className="text-sm text-slate-400">لم تُسجل لجان بعد في جدول اللجان.</p>}</div>
    : <><form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
      {fields[tab].map(key=><label key={key} className={`text-sm ${key==='description'||key==='body'||key==='agenda'?'md:col-span-2':''}`}>{labels[key]||key}
        {key==='recipient_id' ? <select required value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}><option value="">اختر عضواً من الإدارة</option>{people.map(p=><option key={p.id} value={p.id}>{p.full_name||p.id}</option>)}</select>
        : key==='status' ? <select value={form[key]|| (tab==='projects'?'planning':tab==='courses'?'draft':tab==='partnerships'?'prospective':'scheduled')} onChange={e=>setField(key,e.target.value)} className={styles}>{(tab==='projects'?['planning','active','on_hold','completed','cancelled']:tab==='courses'?['draft','open','in_progress','completed','cancelled']:tab==='partnerships'?['prospective','active','expired','terminated']:['scheduled','held','cancelled']).map(v=><option key={v}>{v}</option>)}</select>
        : key==='committee_id' ? <select value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}><option value="">دون لجنة</option>{meetingCommittees.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
        : key==='lead_user_id' ? <select value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}><option value="">اختر مسؤول المشروع</option>{people.map(p=><option key={p.id} value={p.id}>{p.full_name||p.id}</option>)}</select>
        : key==='instructor_id' ? <select value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}><option value="">اختر المدرب (اختياري)</option>{people.map(p=><option key={p.id} value={p.id}>{p.full_name||p.id}</option>)}</select>
        : key==='meeting_type' ? <select value={form[key]||'administrative'} onChange={e=>setField(key,e.target.value)} className={styles}>{['administrative','committee','project','general'].map(v=><option key={v} value={v}>{v}</option>)}</select>
        : key==='committee_id' ? <select value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}><option value="">دون لجنة محددة</option>{meetingCommittees.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
        : key==='visibility' ? <select value={form[key]||'members'} onChange={e=>setField(key,e.target.value)} className={styles}><option value="public">عام</option><option value="members">الأعضاء</option><option value="admin">الإدارة</option></select>
        : key==='event_type' ? <select value={form[key]||'general'} onChange={e=>setField(key,e.target.value)} className={styles}>{['activity','meeting','training','deadline','general'].map(v=><option key={v} value={v}>{v}</option>)}</select>
        : key==='description'||key==='body'||key==='agenda' ? <textarea required={key==='body'||key==='agenda'} rows={3} maxLength={20000} value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}/>
        : <input required={['title','partner_name','slug','starts_at'].includes(key)} type={key.endsWith('_at')?'datetime-local':(key.endsWith('_date')||key.endsWith('_on'))?'date':key==='contact_email'?'email':'text'} value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}/>}
      </label>)}
      <button disabled={busy} className="md:col-span-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-3 font-bold disabled:opacity-50">{busy?'جارٍ الحفظ…':'حفظ السجل'}</button>
    </form>
    <div className="space-y-2"><div className="flex justify-between items-center"><h3 className="font-bold">السجلات الحالية ({rows.length})</h3><button onClick={()=>void load()} className="text-xs text-cyan-300">تحديث</button></div>
      {rows.map(row=><article key={row.id} className="rounded-xl border border-cyan-950 p-3 space-y-2"><div className="flex flex-wrap justify-between gap-2"><div><p className="font-semibold text-sm">{displayRow(row)}</p><p className="text-xs text-slate-400 mt-1">{row.status||row.visibility||row.created_at||''}</p>{['projects','courses','meetings','partnerships'].includes(tab)&&<select aria-label="تحديث حالة السجل" disabled={busy} value={row.status||''} onChange={e=>void updateRowStatus(row,e.target.value)} className="mt-2 rounded-lg bg-[#030e1c] border border-cyan-900 p-2 text-xs">{(tab==='projects'?['planning','active','on_hold','completed','cancelled']:tab==='courses'?['draft','open','in_progress','completed','cancelled']:tab==='partnerships'?['prospective','active','expired','terminated']:['scheduled','held','cancelled']).map(v=><option key={v} value={v}>{v}</option>)}</select>}{tab==='calendar'&&<select aria-label="تحديث ظهور الحدث" disabled={busy} value={row.visibility||'members'} onChange={e=>void updateRowStatus(row,e.target.value)} className="mt-2 rounded-lg bg-[#030e1c] border border-cyan-900 p-2 text-xs"><option value="public">عام</option><option value="members">الأعضاء</option><option value="admin">الإدارة</option></select>}{tab==='messages'&&<p className="text-xs text-slate-300 mt-2 whitespace-pre-wrap">{row.body}</p>}{tab==='projects'&&<div className="mt-3 grid sm:grid-cols-2 gap-2"><input aria-label="عنوان المشروع" value={projectDrafts[row.id]?.title??row.title} onChange={e=>setProjectDrafts(old=>({...old,[row.id]:{...old[row.id],title:e.target.value}}))} className={styles}/><input type="date" aria-label="تاريخ بداية المشروع" value={projectDrafts[row.id]?.start_date??row.start_date??''} onChange={e=>setProjectDrafts(old=>({...old,[row.id]:{...old[row.id],start_date:e.target.value}}))} className={styles}/><textarea aria-label="وصف المشروع" rows={2} value={projectDrafts[row.id]?.description??row.description??''} onChange={e=>setProjectDrafts(old=>({...old,[row.id]:{...old[row.id],description:e.target.value}}))} className={styles}/><input type="date" aria-label="آخر أجل للمشروع" value={projectDrafts[row.id]?.due_date??row.due_date??''} onChange={e=>setProjectDrafts(old=>({...old,[row.id]:{...old[row.id],due_date:e.target.value}}))} className={styles}/><button disabled={busy} onClick={()=>void saveProjectDetails(row)} className="sm:col-span-2 rounded-lg bg-cyan-900 px-3 py-2 text-xs">حفظ تفاصيل المشروع</button></div>}</div>{tab==='messages'&&!row.read_at&&row.recipient_id===currentUserId&&<button onClick={()=>void markRead(row.id)} className="text-xs text-cyan-300">تحديد كمقروء</button>}</div>{tab==='courses'&&<div className="border-t border-cyan-950 pt-3 space-y-2"><p className="text-xs font-bold text-cyan-200">طلبات وتسجيلات المتدربين ({courseEnrollments.filter((x:any)=>x.course_id===row.id).length})</p>{courseEnrollments.filter((x:any)=>x.course_id===row.id).map((enrollment:any)=><div key={enrollment.id} className="flex flex-wrap items-center justify-between gap-2 text-xs"><span>{enrollment.profiles?.full_name||'عضو'} · {new Date(enrollment.enrolled_at).toLocaleDateString('ar-DZ')}</span><select aria-label="حالة تسجيل المتدرب" value={enrollment.status} onChange={e=>void updateCourseEnrollment(enrollment.id,e.target.value)} className="rounded-lg bg-[#030e1c] border border-cyan-900 p-2"><option value="enrolled">مسجل</option><option value="waitlisted">قائمة الانتظار</option><option value="completed">أكمل الدورة</option><option value="withdrawn">ملغى</option></select></div>)}{!courseEnrollments.some((x:any)=>x.course_id===row.id)&&<p className="text-xs text-slate-500">لا توجد تسجيلات لهذه الدورة.</p>}</div>}{tab==='pages'&&<><textarea rows={5} value={pageDrafts[row.id]??JSON.stringify(row.content??{},null,2)} onChange={e=>setPageDrafts(old=>({...old,[row.id]:e.target.value}))} className={styles}/><div className="flex flex-wrap gap-2"><button disabled={busy} onClick={()=>void savePageContent(row)} className="rounded-lg bg-cyan-900 px-3 py-2 text-xs">حفظ المحتوى وإنشاء نسخة</button><button disabled={busy} onClick={()=>void togglePagePublish(row)} className="rounded-lg bg-amber-700 px-3 py-2 text-xs">{row.status==='published'?'إلغاء النشر':'نشر الصفحة'}</button><button disabled={busy} onClick={()=>void loadPageVersions(row.id)} className="rounded-lg bg-slate-700 px-3 py-2 text-xs">سجل الإصدارات</button></div>{(pageVersions[row.id]||[]).map(v=><div key={v.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-cyan-950 pt-2 text-xs"><span>الإصدار {v.version_number} · {v.status} · {new Date(v.created_at).toLocaleString('ar-DZ')}</span><button disabled={busy} onClick={()=>void restorePageVersion(row,v)} className="text-amber-300">استرجاع</button></div>)}</>}{tab==='meetings'&&<div className="space-y-3 border-t border-cyan-950 pt-3"><div className="grid sm:grid-cols-[1fr_auto] gap-2"><select value={meetingAttendeeSelection[row.id]||''} onChange={e=>setMeetingAttendeeSelection(old=>({...old,[row.id]:e.target.value}))} className={styles}><option value="">إضافة عضو معتمد للاجتماع</option>{meetingPeople.filter(p=>!meetingAttendees.some(a=>a.meeting_id===row.id&&a.user_id===p.id)).map(p=><option key={p.id} value={p.id}>{p.full_name||p.id}</option>)}</select><button disabled={busy||!meetingAttendeeSelection[row.id]} onClick={()=>void addMeetingAttendee(row.id)} className="rounded-lg bg-cyan-900 px-3 py-2 text-xs">إضافة مدعو</button></div><div className="space-y-2">{meetingAttendees.filter(a=>a.meeting_id===row.id).map(a=><div key={a.id} className="flex flex-wrap justify-between items-center gap-2 text-xs"><span>{meetingPeople.find(p=>p.id===a.user_id)?.full_name||'عضو'}</span><select value={a.attendance_status} onChange={e=>void updateAttendance(a.id,e.target.value)} className="rounded-lg bg-[#030e1c] border border-cyan-900 p-2"><option value="invited">مدعو</option><option value="accepted">أكد الحضور</option><option value="declined">اعتذر</option><option value="attended">حضر</option><option value="absent">غائب</option></select></div>)}</div><label className="block text-xs">محضر الاجتماع<textarea rows={4} value={meetingMinuteDrafts[row.id]??''} onChange={e=>setMeetingMinuteDrafts(old=>({...old,[row.id]:e.target.value}))} placeholder="سجل مجريات الاجتماع والقرارات المتخذة" className={styles}/></label><div className="flex flex-wrap gap-2"><button disabled={busy} onClick={()=>void saveMeetingMinutes(row.id)} className="rounded-lg bg-amber-700 px-3 py-2 text-xs">حفظ المحضر</button>{meetingMinuteApprovals[row.id]&&!meetingMinuteApprovals[row.id].approved_at&&<button disabled={busy} onClick={()=>void approveMeetingMinutes(row.id)} className="rounded-lg bg-emerald-800 px-3 py-2 text-xs">اعتماد المحضر</button>}</div>{meetingMinuteApprovals[row.id]?.approved_at&&<p className="text-xs text-emerald-300">محضر معتمد بتاريخ {new Date(meetingMinuteApprovals[row.id].approved_at).toLocaleString('ar-DZ')}</p>}</div>}</article>)}
      {!rows.length&&<p className="text-sm text-slate-500">لا توجد سجلات في هذا القسم بعد.</p>}
    </div></>}
  </section>;
};
