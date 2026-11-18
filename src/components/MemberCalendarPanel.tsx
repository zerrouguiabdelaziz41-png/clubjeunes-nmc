import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';

export const MemberCalendarPanel: React.FC = () => {
  const client=getSupabaseClient();
  const [events,setEvents]=useState<any[]>([]);
  const [error,setError]=useState('');
  const load=useCallback(async()=>{
    if(!client)return;
    const {data,error:e}=await client.from('club_calendar_events').select('id,title,description,starts_at,ends_at,location,event_type,visibility').in('visibility',['public','members']).gte('starts_at',new Date().toISOString()).order('starts_at',{ascending:true}).limit(30);
    if(e)setError(e.message);else setEvents(data||[]);
  },[client]);
  useEffect(()=>{void load();},[load]);
  return <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5 space-y-3">
    <div className="flex items-center gap-3"><CalendarDays className="text-amber-400"/><div><h3 className="font-bold text-lg">التقويم السنوي للنادي</h3><p className="text-xs text-slate-400">المواعيد والأنشطة القادمة المتاحة للأعضاء.</p></div></div>
    {error&&<p role="alert" className="text-sm text-rose-300">{error}</p>}
    {events.map(event=><article key={event.id} className="rounded-xl border border-cyan-950 p-3"><div className="flex flex-wrap items-center justify-between gap-2"><h4 className="font-bold text-sm">{event.title}</h4><span className="text-[11px] text-cyan-300">{event.visibility==='public'?'عام':'للأعضاء'}</span></div><p className="text-xs text-amber-200 mt-2">{new Date(event.starts_at).toLocaleString('ar-DZ')}{event.ends_at?' — '+new Date(event.ends_at).toLocaleString('ar-DZ'):''}</p>{event.location&&<p className="text-xs text-slate-400 mt-1 flex items-center gap-2"><MapPin size={13}/>{event.location}</p>}{event.description&&<p className="text-sm text-slate-300 mt-2">{event.description}</p>}</article>)}
    {!events.length&&!error&&<p className="text-sm text-slate-500">لا توجد مواعيد قادمة متاحة للأعضاء حالياً.</p>}
  </section>;
};
