import React, { useCallback, useEffect, useState } from 'react';
import { Home, User, LogOut, ShieldCheck, CalendarDays, ClipboardList, RefreshCw, Check, X, LockKeyhole } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';
import { Language } from '../data/translations.ts';
import { MemberData } from './MembershipCardModal.tsx';

type Role = 'member' | 'organizer' | 'admin';
type Profile = { id: string; membership_number?: string | null; full_name: string; phone: string | null; interests: string | null; role: Role; membership_status: 'pending' | 'approved' | 'rejected'; created_at: string };
interface Props {
  onBackToHome: () => void;
  onOpenCardModal: (member: MemberData) => void;
  onOpenVerify: (member: MemberData) => void;
  onOpenSupabase?: () => void;
  initialMember?: MemberData;
  language?: Language;
}
const roleNames: Record<Role, string> = { member: 'عضو', organizer: 'مشرف نشاط', admin: 'مدير الموقع' };
const statusNames = { pending: 'قيد المراجعة', approved: 'معتمد', rejected: 'مرفوض' };

export const AccountPage: React.FC<Props> = ({ onBackToHome, onOpenCardModal, onOpenVerify }) => {
  const client = getSupabaseClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessionEmail, setSessionEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityDescription, setNewActivityDescription] = useState('');
  const [newActivityLocation, setNewActivityLocation] = useState('');
  const [newActivityStartsAt, setNewActivityStartsAt] = useState('');

  const loadAccount = useCallback(async () => {
    if (!client) { setError('إعداد الاتصال بقاعدة البيانات غير مكتمل. يرجى مراجعة إعدادات Supabase.'); return; }
    setBusy(true); setError('');
    try {
      const { data: authData, error: authError } = await client.auth.getUser();
      if (authError || !authData.user) { setProfile(null); setSessionEmail(''); return; }
      const user = authData.user;
      setSessionEmail(user.email || '');
      const { data: p, error: pError } = await client.from('profiles').select('id,membership_number,full_name,phone,interests,role,membership_status,created_at').eq('id', user.id).single();
      if (pError) throw pError;
      const safeRole: Role = ['member','organizer','admin'].includes(p.role) ? p.role : 'member';
      setProfile({ ...p, role: safeRole });
      if (safeRole === 'admin') {
        const [r, a, pList, assigned] = await Promise.all([
          client.from('membership_requests').select('id,user_id,motivation,status,created_at,admin_notes').eq('status','pending').order('created_at',{ascending:false}),
          client.from('activities').select('id,title,description,location,starts_at,published,review_status,created_by').order('created_at',{ascending:false}),
          client.from('profiles').select('id,full_name,role,membership_status').order('full_name'),
          client.from('organizers').select('id,user_id,activity_id,profiles(full_name),activities(title)').order('assigned_at',{ascending:false})
        ]);
        if (r.error) throw r.error; if (a.error) throw a.error;
        if (pList.error) throw pList.error; if (assigned.error) throw assigned.error;
        setRequests(r.data || []); setActivities(a.data || []); setPeople(pList.data || []); setAssignments(assigned.data || []);
      } else if (safeRole === 'organizer') {
        const { data: assigned, error: assignedError } = await client.from('organizers').select('activity_id, activities(id,title,description,location,starts_at,published,review_status)').eq('user_id', user.id);
        if (assignedError) throw assignedError;
        setActivities((assigned || []).map((x:any) => x.activities).filter(Boolean));
      } else {
        const { data: regs, error: regError } = await client.from('registrations').select('id,status,created_at,activities(id,title,location,starts_at)').eq('user_id', user.id).order('created_at',{ascending:false});
        if (regError) throw regError;
        setRegistrations(regs || []);
      }
    } catch (e:any) { setError(e?.message || 'تعذر تحميل بيانات الحساب.'); }
    finally { setBusy(false); }
  }, [client]);

  useEffect(() => {
    if (!client) return;
    void loadAccount();
    // Login/logout handlers refresh state explicitly; avoid calling auth methods
    // recursively from inside onAuthStateChange callbacks.
    return undefined;
  }, [client, loadAccount]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault(); if (!client) return;
    setBusy(true); setError(''); setNotice('');
    const { error: authError } = await client.auth.signInWithPassword({ email: email.trim(), password });
    if (authError) setError(authError.message === 'Invalid login credentials' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : authError.message);
    else { setPassword(''); await loadAccount(); }
    setBusy(false);
  };
  const signOut = async () => { if (!client) return; const { error: signOutError } = await client.auth.signOut(); if (signOutError) { setError(signOutError.message); return; } setProfile(null); setSessionEmail(''); setRequests([]); setActivities([]); setRegistrations([]); setNotice('تم تسجيل الخروج بأمان.'); };
  const reviewMembership = async (id:string, status:'approved'|'rejected') => {
    if (!client) return; setBusy(true); setError('');
    const { error: rpcError } = await client.rpc('admin_review_membership', { p_request_id:id, p_status:status, p_admin_notes:null });
    if (rpcError) setError(rpcError.message); else { setNotice('تم تحديث قرار طلب العضوية.'); await loadAccount(); }
    setBusy(false);
  };
  const changeRole = async (userId:string, role:Role) => {
    if (!client) return;
    setBusy(true); setError(''); setNotice('');
    const { error: rpcError } = await client.rpc('admin_set_profile_access', {
      p_user_id: userId, p_role: role, p_membership_status: 'approved'
    });
    if (rpcError) setError(rpcError.message);
    else {
      if (role !== 'organizer') {
        const { error: cleanupError } = await client.from('organizers').delete().eq('user_id', userId);
        if (cleanupError) setError('تم تغيير الدور، لكن تعذر حذف التكليفات القديمة: ' + cleanupError.message);
      }
      setNotice('تم تحديث صلاحية الحساب.'); await loadAccount();
    }
    setBusy(false);
  };
  const assignOrganizer = async () => {
    if (!client || !selectedOrganizer || !selectedActivity) return;
    setBusy(true); setError(''); setNotice('');
    const { data: existing, error: lookupError } = await client.from('organizers').select('id').eq('user_id', selectedOrganizer).eq('activity_id', selectedActivity).maybeSingle();
    if (lookupError) { setError(lookupError.message); setBusy(false); return; }
    if (existing) { setError('هذا المشرف مكلّف بهذا النشاط مسبقاً.'); setBusy(false); return; }
    const { error: insertError } = await client.from('organizers').insert({ user_id: selectedOrganizer, activity_id: selectedActivity });
    if (insertError) setError(insertError.message);
    else { setNotice('تم إسناد النشاط إلى المشرف.'); setSelectedOrganizer(''); setSelectedActivity(''); await loadAccount(); }
    setBusy(false);
  };
  const removeAssignment = async (id:string) => {
    if (!client) return;
    setBusy(true); setError('');
    const { error: deleteError } = await client.from('organizers').delete().eq('id', id);
    if (deleteError) setError(deleteError.message);
    else { setNotice('تم إلغاء إسناد النشاط.'); await loadAccount(); }
    setBusy(false);
  };
  const reviewActivity = async (id:string, status:'approved'|'rejected') => {
    if (!client) return; setBusy(true); setError('');
    const { error: rpcError } = await client.rpc('admin_review_activity', { p_activity_id:id, p_decision:status });
    if (rpcError) setError(rpcError.message); else { setNotice('تم تحديث حالة النشاط.'); await loadAccount(); }
    setBusy(false);
  };
  const createAdminActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !profile || profile.role !== 'admin' || !newActivityTitle.trim()) return;
    setBusy(true); setError(''); setNotice('');
    const payload = {
      title: newActivityTitle.trim(),
      description: newActivityDescription.trim() || null,
      location: newActivityLocation.trim() || null,
      starts_at: newActivityStartsAt ? new Date(newActivityStartsAt).toISOString() : null,
      created_by: profile.id,
      published: true,
      review_status: 'approved',
    };
    const { error: insertError } = await client.from('activities').insert(payload);
    if (insertError) {
      setError('تعذر إضافة النشاط. تحقق من صلاحية الإضافة وسياسات قاعدة البيانات: ' + insertError.message);
    } else {
      setNotice('تم حفظ النشاط واعتماده في قاعدة البيانات. قد لا يظهر ضمن تصنيفات الصفحة العامة حتى نربط عرض الأنشطة بها.');
      setNewActivityTitle(''); setNewActivityDescription(''); setNewActivityLocation(''); setNewActivityStartsAt('');
      await loadAccount();
    }
    setBusy(false);
  };
  const memberCard: MemberData = profile ? {
    id: profile.id, membershipNumber: profile.membership_number || 'قيد تخصيص الرقم', name: profile.full_name || sessionEmail,
    role: profile.role, roleLabel: roleNames[profile.role], age: 0, phone: profile.phone || '', email: sessionEmail,
    city: 'الجزائر', avatar: '', issueDate: profile.created_at?.slice(0,10) || '', expiryDate: '',
    status: profile.membership_status === 'approved' ? 'active' : 'pending'
  } : ({} as MemberData);

  return <div dir="rtl" className="min-h-screen bg-[#040f1c] text-white pb-20">
    <header className="border-b border-cyan-900/50 bg-[#06182c] px-4 py-5"><div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
      <div><button onClick={onBackToHome} className="text-cyan-300 text-sm mb-2 flex items-center gap-2"><Home size={16}/> الرئيسية</button><h1 className="text-2xl font-black">بوابة الحسابات</h1><p className="text-sm text-slate-400 mt-1">نادي منبر الشاب المبدع</p></div>
      {profile && <button onClick={signOut} className="rounded-xl border border-rose-700/60 px-3 py-2 text-rose-300 flex items-center gap-2"><LogOut size={16}/> تسجيل الخروج</button>}
    </div></header>
    <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-5">
      {error && <div role="alert" className="rounded-xl border border-rose-700 bg-rose-950/40 p-3 text-rose-200 text-sm">{error}</div>}
      {notice && <div className="rounded-xl border border-emerald-700 bg-emerald-950/40 p-3 text-emerald-200 text-sm">{notice}</div>}
      {!profile ? <section className="max-w-lg mx-auto mt-8 rounded-3xl border border-cyan-900 bg-[#06182c] p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-5"><LockKeyhole className="text-amber-400"/><div><h2 className="text-xl font-bold">تسجيل الدخول</h2><p className="text-xs text-slate-400">استخدم حساب النادي المسجل في قاعدة البيانات</p></div></div>
        <form onSubmit={signIn} className="space-y-4"><label className="block text-sm">البريد الإلكتروني<input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-white"/></label>
        <label className="block text-sm">كلمة المرور<input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-white"/></label>
        <button disabled={busy} className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 p-3 font-bold disabled:opacity-50">{busy?'جارٍ التحقق…':'دخول آمن'}</button></form>
        <p className="text-xs text-slate-500 mt-4">لا يمكن اختيار الدور يدوياً؛ يتم تحديد الصلاحية من ملفك المعتمد في قاعدة البيانات.</p>
      </section> : <>
        <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-cyan-950 flex items-center justify-center"><User className="text-amber-400"/></div><div><h2 className="text-xl font-bold">مرحباً، {profile.full_name || sessionEmail}</h2><p className="text-sm text-cyan-300">{sessionEmail}</p></div></div>
          <div className="flex flex-wrap gap-2"><span className="rounded-full bg-amber-500/15 border border-amber-500/40 px-3 py-1 text-sm">{roleNames[profile.role]}</span><span className="rounded-full bg-cyan-500/10 border border-cyan-700 px-3 py-1 text-sm">العضوية: {statusNames[profile.membership_status]}</span><button onClick={()=>void loadAccount()} className="rounded-xl border border-cyan-800 p-2" title="تحديث"><RefreshCw size={17}/></button></div>
        </section>
        {profile.membership_status !== 'approved' && <div className="rounded-2xl border border-amber-700/60 bg-amber-950/30 p-4 text-amber-200 text-sm">حسابك موجود، لكن العضوية {statusNames[profile.membership_status]}. بعض خدمات النادي ستظل غير متاحة حتى اعتماد الطلب.</div>}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-cyan-900 bg-[#06182c] p-5"><h3 className="font-bold flex items-center gap-2 mb-3"><ShieldCheck className="text-emerald-400"/> صلاحيات الحساب</h3><p className="text-sm text-slate-300">{profile.role==='admin'?'لديك صلاحيات إدارة الموقع وفق سياسات قاعدة البيانات.':profile.role==='organizer'?'تظهر هنا الأنشطة المسندة إليك فقط.':'يمكنك متابعة تسجيلاتك وطلباتك الشخصية.'}</p>
          {profile.membership_status==='approved' && <div className="flex gap-2 mt-4"><button onClick={()=>onOpenCardModal(memberCard)} className="text-xs rounded-lg bg-cyan-900 px-3 py-2">بطاقة العضوية</button><button onClick={()=>onOpenVerify(memberCard)} className="text-xs rounded-lg bg-cyan-900 px-3 py-2">التحقق من البطاقة</button></div>}</div>
          <div className="rounded-2xl border border-cyan-900 bg-[#06182c] p-5"><h3 className="font-bold flex items-center gap-2 mb-3"><CalendarDays className="text-amber-400"/> {profile.role==='member'?'تسجيلاتي في الأنشطة':'الأنشطة المسندة'}</h3>
            {profile.role==='member' ? registrations.length ? registrations.map((r:any)=><p key={r.id} className="text-sm border-t border-cyan-950 py-2">{r.activities?.title || 'نشاط'} — {r.status}</p>) : <p className="text-sm text-slate-400">لا توجد تسجيلات بعد.</p> : activities.length ? activities.map((a:any)=><p key={a.id} className="text-sm border-t border-cyan-950 py-2">{a.title} — {a.review_status || (a.published?'منشور':'قيد المراجعة')}</p>) : <p className="text-sm text-slate-400">لا توجد أنشطة مسندة أو مسجلة حالياً.</p>}</div>
        </section>
        {profile.role==='admin' && <>
          <section className="rounded-3xl border border-emerald-800/70 bg-[#06182c] p-5">
            <h3 className="font-bold mb-2">إضافة نشاط جديد</h3>
            <p className="text-xs text-slate-400 mb-4">النشاط الذي يضيفه المدير يُحفظ معتمدًا في قاعدة البيانات. ربطه بتصنيفات الصفحة العامة خطوة منفصلة.</p>
            <form onSubmit={createAdminActivity} className="grid sm:grid-cols-2 gap-3">
              <label className="block text-sm sm:col-span-2">عنوان النشاط<input required maxLength={140} value={newActivityTitle} onChange={e=>setNewActivityTitle(e.target.value)} placeholder="مثال: دورة في الإعلام الآلي" className="mt-1 w-full rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-white"/></label>
              <label className="block text-sm sm:col-span-2">وصف النشاط<textarea rows={3} maxLength={2000} value={newActivityDescription} onChange={e=>setNewActivityDescription(e.target.value)} placeholder="اكتب نبذة عن النشاط وأهدافه" className="mt-1 w-full rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-white"/></label>
              <label className="block text-sm">مكان النشاط<input maxLength={200} value={newActivityLocation} onChange={e=>setNewActivityLocation(e.target.value)} placeholder="مكان إقامة النشاط" className="mt-1 w-full rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-white"/></label>
              <label className="block text-sm">تاريخ ووقت النشاط<input type="datetime-local" value={newActivityStartsAt} onChange={e=>setNewActivityStartsAt(e.target.value)} className="mt-1 w-full rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-white"/></label>
              <button disabled={busy || !newActivityTitle.trim()} className="sm:col-span-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold disabled:opacity-50">{busy?'جارٍ الحفظ…':'إضافة النشاط ونشره'}</button>
            </form>
          </section>
          <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5"><h3 className="font-bold flex items-center gap-2 mb-4"><ClipboardList className="text-amber-400"/> طلبات الانضمام المعلقة ({requests.length})</h3>
            {requests.length===0?<p className="text-sm text-slate-400">لا توجد طلبات معلقة.</p>:requests.map((r:any)=><div key={r.id} className="border-t border-cyan-950 py-3 flex flex-wrap justify-between gap-3"><div><p className="text-sm">طلب عضو — {new Date(r.created_at).toLocaleDateString('ar-DZ')}</p><p className="text-xs text-slate-400 mt-1">{r.motivation || 'لا توجد رسالة مرفقة'}</p><p className="text-[11px] text-slate-500">معرّف المستخدم: {r.user_id}</p></div><div className="flex gap-2"><button disabled={busy} onClick={()=>void reviewMembership(r.id,'approved')} className="rounded-lg bg-emerald-800 px-3 py-2 text-xs flex items-center gap-1"><Check size={14}/> اعتماد</button><button disabled={busy} onClick={()=>void reviewMembership(r.id,'rejected')} className="rounded-lg bg-rose-900 px-3 py-2 text-xs flex items-center gap-1"><X size={14}/> رفض</button></div></div>)}</section>
          <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5"><h3 className="font-bold mb-4">مراجعة الأنشطة</h3>{activities.length===0?<p className="text-sm text-slate-400">لا توجد أنشطة.</p>:activities.map((a:any)=><div key={a.id} className="border-t border-cyan-950 py-3 flex flex-wrap justify-between gap-3"><div><p className="text-sm font-bold">{a.title}</p><p className="text-xs text-slate-400">{a.location || 'دون موقع'} — {a.review_status}</p></div>{a.review_status==='pending'&&<div className="flex gap-2"><button disabled={busy} onClick={()=>void reviewActivity(a.id,'approved')} className="rounded-lg bg-emerald-800 px-3 py-2 text-xs">نشر</button><button disabled={busy} onClick={()=>void reviewActivity(a.id,'rejected')} className="rounded-lg bg-rose-900 px-3 py-2 text-xs">رفض</button></div>}</div>)}</section>
          <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5">
            <h3 className="font-bold mb-4">إدارة صلاحيات المشرفين</h3>
            <p className="text-xs text-slate-400 mb-3">تغيير الدور يتم عبر الدالة الإدارية المحمية في قاعدة البيانات، ولا يستطيع المستخدم منح نفسه صلاحية.</p>
            <div className="space-y-2">
              {people.filter((person:any) => person.id !== profile.id).map((person:any) => (
                <div key={person.id} className="border-t border-cyan-950 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div><p className="text-sm font-semibold">{person.full_name || 'مستخدم دون اسم'}</p><p className="text-xs text-slate-400">{statusNames[person.membership_status as keyof typeof statusNames]} · {roleNames[person.role as Role] || person.role}</p></div>
                  <div className="flex gap-2">
                    {person.membership_status === 'approved' && person.role === 'member' && <button disabled={busy} onClick={()=>void changeRole(person.id,'organizer')} className="rounded-lg bg-cyan-900 px-3 py-2 text-xs">تعيينه مشرفاً</button>}
                    {person.role === 'organizer' && <button disabled={busy} onClick={()=>void changeRole(person.id,'member')} className="rounded-lg bg-slate-700 px-3 py-2 text-xs">إعادته عضواً</button>}
                  </div>
                </div>
              ))}
              {people.length <= 1 && <p className="text-sm text-slate-400">لا توجد حسابات أخرى مسجلة.</p>}
            </div>
          </section>
          <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5">
            <h3 className="font-bold mb-3">إسناد الأنشطة إلى المشرفين</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <select value={selectedOrganizer} onChange={e=>setSelectedOrganizer(e.target.value)} className="rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-sm">
                <option value="">اختر المشرف</option>
                {people.filter((person:any)=>person.role==='organizer' && person.membership_status==='approved').map((person:any)=><option key={person.id} value={person.id}>{person.full_name}</option>)}
              </select>
              <select value={selectedActivity} onChange={e=>setSelectedActivity(e.target.value)} className="rounded-xl bg-[#030e1c] border border-cyan-900 p-3 text-sm">
                <option value="">اختر النشاط</option>
                {activities.map((activity:any)=><option key={activity.id} value={activity.id}>{activity.title}</option>)}
              </select>
              <button disabled={busy || !selectedOrganizer || !selectedActivity} onClick={()=>void assignOrganizer()} className="rounded-xl bg-amber-600 px-4 py-3 text-sm font-bold disabled:opacity-50">إسناد النشاط</button>
            </div>
            <div className="mt-4 space-y-2">
              {assignments.map((item:any)=><div key={item.id} className="flex flex-wrap justify-between gap-2 border-t border-cyan-950 py-2 text-sm"><span>{item.profiles?.full_name || 'مشرف'} — {item.activities?.title || 'نشاط'}</span><button disabled={busy} onClick={()=>void removeAssignment(item.id)} className="text-rose-300 text-xs">إلغاء الإسناد</button></div>)}
              {!assignments.length && <p className="text-xs text-slate-400">لا توجد تكليفات حالياً.</p>}
            </div>
          </section>
        </>}
      </>}
    </main>
  </div>;
};
