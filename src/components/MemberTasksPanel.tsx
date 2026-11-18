import React, { useCallback, useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';

export const MemberTasksPanel: React.FC = () => {
  const client=getSupabaseClient();
  const [tasks,setTasks]=useState<any[]>([]);
  const [error,setError]=useState('');
  const load=useCallback(async()=>{
    if(!client)return;
    const {data:userData,error:userError}=await client.auth.getUser();
    if(userError||!userData.user){setError('تعذر التحقق من حسابك.');return;}
    const {data,error:e}=await client.from('project_tasks').select('id,title,status,priority,due_at,projects(title)').eq('assigned_to',userData.user.id).order('due_at',{ascending:true});
    if(e)setError(e.message);else setTasks(data||[]);
  },[client]);
  useEffect(()=>{void load();},[load]);
  const status:Record<string,string>={todo:'لم تبدأ',in_progress:'قيد التنفيذ',blocked:'متوقفة',done:'مكتملة',cancelled:'ملغاة'};
  const priority:Record<string,string>={low:'منخفضة',medium:'متوسطة',high:'عالية',urgent:'عاجلة'};
  return <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5 space-y-3">
    <div className="flex items-center gap-3"><ClipboardList className="text-cyan-300"/><div><h3 className="font-bold text-lg">المهام المسندة إليّ</h3><p className="text-xs text-slate-400">تابع مهامك ومواعيد إنجازها ضمن مشاريع النادي.</p></div></div>
    {error&&<p role="alert" className="text-sm text-rose-300">{error}</p>}
    {tasks.map(task=><article key={task.id} className="rounded-xl border border-cyan-950 p-3"><div className="flex flex-wrap justify-between gap-2"><p className="font-bold text-sm">{task.title}</p><span className="text-xs text-cyan-200">{status[task.status]||task.status}</span></div><p className="text-xs text-slate-400 mt-1">{task.projects?.title||'مشروع'} · الأولوية: {priority[task.priority]||task.priority}</p>{task.due_at&&<p className="text-xs text-amber-200 mt-2">آخر أجل: {new Date(task.due_at).toLocaleString('ar-DZ')}</p>}</article>)}
    {!tasks.length&&!error&&<p className="text-sm text-slate-500">لا توجد مهام مسندة إليك حالياً.</p>}
  </section>;
};
