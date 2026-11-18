import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';

export const PublishedActivitiesPanel: React.FC = () => {
  const client=getSupabaseClient();
  const [items,setItems]=useState<any[]>([]);
  const [error,setError]=useState('');
  const load=useCallback(async()=>{
    if(!client)return;
    const {data,error:e}=await client.from('activities').select('id,title,description,location,starts_at').eq('published',true).order('starts_at',{ascending:true}).limit(12);
    if(e)setError(e.message);else setItems(data||[]);
  },[client]);
  useEffect(()=>{void load();},[load]);
  if(!items.length&&!error)return null;
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="text-center mb-6"><p className="text-xs font-bold tracking-widest text-amber-400">NMC · أنشطة النادي</p><h2 className="text-2xl sm:text-3xl font-black mt-2">أنشطة منشورة ومعتمدة</h2><p className="text-sm text-cyan-100/70 mt-2">تابع آخر الأنشطة التي تنظمها فرق النادي.</p></div>
    {error&&<p role="status" className="text-xs text-slate-500">{error}</p>}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">{items.map(item=><article key={item.id} className="rounded-2xl border border-cyan-900 bg-[#06182c] p-4"><div className="flex items-center gap-2 text-amber-300"><Sparkles size={15}/><span className="text-[11px]">نشاط معتمد</span></div><h3 className="font-bold mt-2">{item.title}</h3>{item.description&&<p className="text-sm text-slate-300 mt-2 whitespace-pre-wrap line-clamp-4">{item.description}</p>}{item.starts_at&&<p className="text-xs text-cyan-200 mt-3 flex items-center gap-2"><CalendarDays size={13}/>{new Date(item.starts_at).toLocaleString('ar-DZ')}</p>}{item.location&&<p className="text-xs text-slate-400 mt-1 flex items-center gap-2"><MapPin size={13}/>{item.location}</p>}</article>)}</div>
  </section>;
};
