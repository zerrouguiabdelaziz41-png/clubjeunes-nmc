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
  contact_email:'البريد',contact_phone:'الهاتف',slug:'الرابط المختصر',body:'نص الرسالة',
  subject:'الموضوع',recipient_id:'المستلم',visibility:'الظهور',event_type:'نوع الحدث',
  agenda:'جدول الأعمال'
};
const fields: Record<ModuleKey,string[]> = {
  projects:['title','description','status','start_date','due_date'],
  committees:[],
  courses:['title','description','starts_at','ends_at','location','status'],
  meetings:['title','agenda','starts_at','ends_at','location'],
  partnerships:['partner_name','partner_type','description','contact_name','contact_email','contact_phone'],
  calendar:['title','description','starts_at','ends_at','location','event_type','visibility'],
  pages:['slug','title'],
  messages:['recipient_id','subject','body']
};
const defaults: Record<string,string> = {
  status:'planning',event_type:'general',visibility:'members'
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
  const [form,setForm] = useState<Record<string,string>>({});
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [notice,setNotice] = useState('');
  const load = useCallback(async () => {
    if (!client) return;
    setBusy(true); setError('');
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
      if (c.error) setError(c.error.message);
      else setCommittees((c.data || []).map((x:any)=>({...x,members:(m.data||[]).filter((y:any)=>y.committee_id===x.id)})));
    }
    if (tab === 'messages') {
      const {data:admins,error:adminError} = await client.from('profiles').select('id,full_name').eq('role','admin').eq('membership_status','approved');
      if (adminError) setError(adminError.message); else setPeople(admins || []);
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
    const userId = window.prompt('أدخل معرّف حساب العضو (UUID) لإضافته إلى اللجنة:')?.trim();
    if (!userId) return;
    setBusy(true); setError('');
    const {error:e} = await client.from('committee_members').insert({committee_id:committeeId,user_id:userId,committee_role:'member'});
    if (e) setError(e.message); else {setNotice('تمت إضافة العضو إلى اللجنة.'); await load();}
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
    {tab==='committees' ? <div className="grid md:grid-cols-2 gap-3">{committees.map((c:any)=><article key={c.id} className="rounded-2xl border border-cyan-950 p-4"><h3 className="font-bold">{c.name || c.title || c.committee_name || 'لجنة'}</h3><p className="text-xs text-slate-500 mt-1">{c.description || '—'}</p><p className="text-xs text-cyan-300 mt-3">عدد الأعضاء: {c.members.length}</p><button disabled={busy} onClick={()=>void addCommitteeMember(c.id)} className="mt-3 rounded-lg bg-cyan-900 px-3 py-2 text-xs">إضافة عضو للجنة</button></article>)}{!committees.length&&<p className="text-sm text-slate-400">لم تُسجل لجان بعد في جدول اللجان.</p>}</div>
    : <><form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
      {fields[tab].map(key=><label key={key} className={`text-sm ${key==='description'||key==='body'||key==='agenda'?'md:col-span-2':''}`}>{labels[key]||key}
        {key==='recipient_id' ? <select required value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}><option value="">اختر عضواً من الإدارة</option>{people.map(p=><option key={p.id} value={p.id}>{p.full_name||p.id}</option>)}</select>
        : key==='status' ? <select value={form[key]|| (tab==='projects'?'planning':tab==='courses'?'draft':'scheduled')} onChange={e=>setField(key,e.target.value)} className={styles}>{(tab==='projects'?['planning','active','on_hold','completed','cancelled']:tab==='courses'?['draft','open','in_progress','completed','cancelled']:['scheduled','held','cancelled']).map(v=><option key={v}>{v}</option>)}</select>
        : key==='visibility' ? <select value={form[key]||'members'} onChange={e=>setField(key,e.target.value)} className={styles}><option value="public">عام</option><option value="members">الأعضاء</option><option value="admin">الإدارة</option></select>
        : key==='event_type' ? <select value={form[key]||'general'} onChange={e=>setField(key,e.target.value)} className={styles}>{['activity','meeting','training','deadline','general'].map(v=><option key={v} value={v}>{v}</option>)}</select>
        : key==='description'||key==='body'||key==='agenda' ? <textarea required={key==='body'||key==='agenda'} rows={3} maxLength={20000} value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}/>
        : <input required={['title','partner_name','slug','starts_at'].includes(key)} type={key.endsWith('_at')?'datetime-local':key.endsWith('_date')?'date':key==='contact_email'?'email':'text'} value={form[key]||''} onChange={e=>setField(key,e.target.value)} className={styles}/>}
      </label>)}
      <button disabled={busy} className="md:col-span-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-3 font-bold disabled:opacity-50">{busy?'جارٍ الحفظ…':'حفظ السجل'}</button>
    </form>
    <div className="space-y-2"><div className="flex justify-between items-center"><h3 className="font-bold">السجلات الحالية ({rows.length})</h3><button onClick={()=>void load()} className="text-xs text-cyan-300">تحديث</button></div>
      {rows.map(row=><article key={row.id} className="rounded-xl border border-cyan-950 p-3 flex flex-wrap justify-between gap-2"><div><p className="font-semibold text-sm">{displayRow(row)}</p><p className="text-xs text-slate-400 mt-1">{row.status||row.visibility||row.created_at||''}</p>{tab==='messages'&&<p className="text-xs text-slate-300 mt-2 whitespace-pre-wrap">{row.body}</p>}</div>{tab==='messages'&&!row.read_at&&<button onClick={()=>void markRead(row.id)} className="text-xs text-cyan-300">تحديد كمقروء</button>}</article>)}
      {!rows.length&&<p className="text-sm text-slate-500">لا توجد سجلات في هذا القسم بعد.</p>}
    </div></>}
  </section>;
};
