import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDays, Newspaper } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';

export const PublicClubContent: React.FC = () => {
  const client = getSupabaseClient();
  const [pages,setPages] = useState<any[]>([]);
  const [events,setEvents] = useState<any[]>([]);
  const [error,setError] = useState('');
  const load = useCallback(async () => {
    if (!client) return;
    const [pageResult,eventResult] = await Promise.all([
      client.from('site_pages').select('id,slug,title,content,published_at').eq('status','published').order('published_at',{ascending:false}).limit(6),
      client.from('club_calendar_events').select('id,title,description,starts_at,ends_at,location,event_type').eq('visibility','public').gte('starts_at',new Date().toISOString()).order('starts_at',{ascending:true}).limit(6)
    ]);
    if (pageResult.error) setError(pageResult.error.message); else setPages(pageResult.data||[]);
    if (eventResult.error) setError(eventResult.error.message); else setEvents(eventResult.data||[]);
  },[client]);
  useEffect(()=>{void load();},[load]);
  const contentText=(content:any):string=>{
    if (!content) return '';
    if (typeof content==='string') return content;
    if (typeof content.intro==='string') return content.intro;
    if (typeof content.body==='string') return content.body;
    if (Array.isArray(content.sections)) return content.sections.map((s:any)=>[s.heading,s.body||s.content].filter(Boolean).join('\n')).filter(Boolean).join('\n\n');
    if (Array.isArray(content.blocks)) return content.blocks.map((b:any)=>b.text||b.content||'').filter(Boolean).join('\n\n');
    return '';
  };
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
    {(pages.length>0||events.length>0)&&<div className="text-center"><p className="text-xs font-bold tracking-widest text-amber-400">NMC · آخر المستجدات</p><h2 className="text-2xl sm:text-3xl font-black mt-2">أخبار النادي ومواعيده</h2></div>}
    {error&&<p role="status" className="text-xs text-slate-500">{error}</p>}
    {pages.length>0&&<div><h3 className="font-bold flex items-center gap-2 mb-3"><Newspaper className="text-cyan-300"/> منشورات النادي</h3><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">{pages.map(p=><article key={p.id} className="rounded-2xl border border-cyan-900 bg-[#06182c] p-4"><h4 className="font-bold">{p.title}</h4><p className="text-sm text-slate-300 mt-2 whitespace-pre-wrap line-clamp-5">{contentText(p.content)||'تابع هذا المنشور لمعرفة آخر مستجدات النادي.'}</p><p className="text-[11px] text-slate-500 mt-3">{p.published_at?new Date(p.published_at).toLocaleDateString('ar-DZ'):''}</p></article>)}</div></div>}
    {events.length>0&&<div><h3 className="font-bold flex items-center gap-2 mb-3"><CalendarDays className="text-amber-400"/> المواعيد القادمة</h3><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">{events.map(e=><article key={e.id} className="rounded-2xl border border-cyan-900 bg-[#06182c] p-4"><h4 className="font-bold">{e.title}</h4>{e.description&&<p className="text-sm text-slate-300 mt-2">{e.description}</p>}<p className="text-xs text-cyan-200 mt-3">{new Date(e.starts_at).toLocaleString('ar-DZ')}</p>{e.location&&<p className="text-xs text-slate-400 mt-1">{e.location}</p>}</article>)}</div></div>}
  </section>;
};
