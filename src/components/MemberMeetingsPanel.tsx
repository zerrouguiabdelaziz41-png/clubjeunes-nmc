import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDays, MapPin, FileText } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';

export const MemberMeetingsPanel: React.FC = () => {
  const client=getSupabaseClient();
  const [items,setItems]=useState<any[]>([]);
  const [error,setError]=useState('');
  const load=useCallback(async()=>{
    if(!client)return;
    const {data:userData,error:userError}=await client.auth.getUser();
    if(userError||!userData.user){setError('تعذر التحقق من حسابك.');return;}
    const {data,error:e}=await client.from('meeting_attendees').select('id,attendance_status,meeting_id,meetings(id,title,agenda,starts_at,ends_at,location,meeting_minutes(content,decisions,approved_at))').eq('user_id',userData.user.id).order('id',{ascending:false});
    if(e)setError(e.message);else setItems(data||[]);
  },[client]);
  useEffect(()=>{void load();},[load]);
  const labels:Record<string,string>={invited:'دعوة بانتظار التأكيد',accepted:'تم تأكيد الحضور',declined:'اعتذار مسجل',attended:'تم تسجيل الحضور',absent:'غياب مسجل'};
  return <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5 space-y-3">
    <div className="flex items-center gap-3"><CalendarDays className="text-amber-400"/><div><h3 className="font-bold text-lg">اجتماعاتي ودعوات الحضور</h3><p className="text-xs text-slate-400">الاجتماعات التي تمت دعوتك إليها ومحاضرها المعتمدة.</p></div></div>
    {error&&<p role="alert" className="text-sm text-rose-300">{error}</p>}
    {items.map(item=>{const meeting=item.meetings;if(!meeting)return null;const minute=Array.isArray(meeting.meeting_minutes)?meeting.meeting_minutes[0]:meeting.meeting_minutes;return <article key={item.id} className="rounded-xl border border-cyan-950 p-4 space-y-2"><div className="flex flex-wrap justify-between gap-2"><h4 className="font-bold">{meeting.title}</h4><span className="text-xs text-cyan-200">{labels[item.attendance_status]||item.attendance_status}</span></div><p className="text-xs text-amber-200">{new Date(meeting.starts_at).toLocaleString('ar-DZ')}</p>{meeting.location&&<p className="text-xs text-slate-400 flex items-center gap-2"><MapPin size={13}/>{meeting.location}</p>}{meeting.agenda&&<p className="text-sm text-slate-300 whitespace-pre-wrap">{meeting.agenda}</p>}{minute?.approved_at&&<div className="border-t border-cyan-950 pt-2"><p className="text-xs text-emerald-300 flex items-center gap-2"><FileText size={13}/> محضر الاجتماع المعتمد</p><p className="text-sm text-slate-300 mt-1 whitespace-pre-wrap">{minute.content}</p></div>}</article>;})}
    {!items.length&&!error&&<p className="text-sm text-slate-500">لا توجد دعوات اجتماعات مرتبطة بحسابك حالياً.</p>}
  </section>;
};
