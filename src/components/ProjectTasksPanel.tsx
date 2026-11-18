import React, { useCallback, useEffect, useState } from 'react';
import { getSupabaseClient } from '../lib/supabase.ts';

export const ProjectTasksPanel: React.FC = () => {
  const client = getSupabaseClient();
  const [projects,setProjects] = useState<any[]>([]);
  const [tasks,setTasks] = useState<any[]>([]);
  const [projectId,setProjectId] = useState('');
  const [title,setTitle] = useState('');
  const [priority,setPriority] = useState('medium');
  const [assignedTo,setAssignedTo] = useState('');
  const [dueAt,setDueAt] = useState('');
  const [people,setPeople] = useState<any[]>([]);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const load = useCallback(async () => {
    if (!client) return;
    const [p,t,m] = await Promise.all([
      client.from('projects').select('id,title').order('created_at',{ascending:false}),
      client.from('project_tasks').select('id,project_id,title,status,priority,due_at,assigned_to').order('created_at',{ascending:false}),
      client.from('profiles').select('id,full_name').eq('membership_status','approved').order('full_name')
    ]);
    if (p.error) setError(p.error.message); else setProjects(p.data || []);
    if (t.error) setError(t.error.message); else setTasks(t.data || []);
    if (m.error) setError(m.error.message); else setPeople(m.data || []);
  },[client]);
  useEffect(()=>{void load();},[load]);
  const add = async (e:React.FormEvent) => {
    e.preventDefault(); if (!client || !projectId || !title.trim()) return;
    setBusy(true);setError('');
    const {error:e2} = await client.from('project_tasks').insert({project_id:projectId,title:title.trim(),priority,assigned_to:assignedTo||null,due_at:dueAt?new Date(dueAt).toISOString():null});
    if (e2) setError(e2.message); else {setTitle('');setAssignedTo('');setDueAt('');await load();}
    setBusy(false);
  };
  const updateStatus = async (id:string,status:string) => {
    if (!client || !['todo','in_progress','blocked','done','cancelled'].includes(status)) return;
    setBusy(true);
    setError('');
    const {error:e} = await client.from('project_tasks').update({status,updated_at:new Date().toISOString()}).eq('id',id);
    if (e) setError(e.message); else await load();
    setBusy(false);
  };
  return <section className="rounded-3xl border border-cyan-800 bg-[#06182c] p-5 space-y-4">
    <div><h3 className="font-bold text-lg">متابعة المهام</h3><p className="text-xs text-slate-400">إنشاء المهام وتحديث تقدمها ضمن المشاريع.</p></div>
    {error&&<p role="alert" className="text-sm text-rose-300">{error}</p>}
    <form onSubmit={add} className="grid md:grid-cols-3 gap-2">
      <select required value={projectId} onChange={e=>setProjectId(e.target.value)} className="rounded-xl bg-[#030e1c] border border-cyan-900 p-3"><option value="">اختر المشروع</option>{projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select>
      <input required minLength={2} maxLength={180} value={title} onChange={e=>setTitle(e.target.value)} placeholder="عنوان المهمة" className="rounded-xl bg-[#030e1c] border border-cyan-900 p-3"/>
      <select value={assignedTo} onChange={e=>setAssignedTo(e.target.value)} className="rounded-xl bg-[#030e1c] border border-cyan-900 p-3"><option value="">دون مسؤول</option>{people.map(p=><option key={p.id} value={p.id}>{p.full_name||p.id}</option>)}</select>
      <input type="datetime-local" value={dueAt} onChange={e=>setDueAt(e.target.value)} aria-label="آخر أجل للمهمة" className="rounded-xl bg-[#030e1c] border border-cyan-900 p-3"/>
      <div className="flex gap-2"><select value={priority} onChange={e=>setPriority(e.target.value)} className="min-w-0 flex-1 rounded-xl bg-[#030e1c] border border-cyan-900 p-3"><option value="low">منخفضة</option><option value="medium">متوسطة</option><option value="high">عالية</option><option value="urgent">عاجلة</option></select><button disabled={busy||!projectId} className="rounded-xl bg-cyan-800 px-4 font-bold">إضافة</button></div>
    </form>
    <div className="space-y-2">{tasks.map(t=><article key={t.id} className="rounded-xl border border-cyan-950 p-3 flex flex-wrap items-center justify-between gap-3"><div><p className="font-semibold text-sm">{t.title}</p><p className="text-xs text-slate-400">{projects.find(p=>p.id===t.project_id)?.title || 'مشروع'} · الأولوية: {t.priority} · المسؤول: {people.find(p=>p.id===t.assigned_to)?.full_name||'غير محدد'} · الأجل: {t.due_at?new Date(t.due_at).toLocaleDateString('ar-DZ'):'غير محدد'}</p></div><select aria-label="حالة المهمة" disabled={busy} value={t.status} onChange={e=>void updateStatus(t.id,e.target.value)} className="rounded-lg bg-[#030e1c] border border-cyan-900 px-3 py-2 text-xs"><option value="todo">لم تبدأ</option><option value="in_progress">قيد التنفيذ</option><option value="blocked">متوقفة</option><option value="done">مكتملة</option><option value="cancelled">ملغاة</option></select></article>)}{!tasks.length&&<p className="text-sm text-slate-500">لا توجد مهام حالياً.</p>}</div>
  </section>;
};
