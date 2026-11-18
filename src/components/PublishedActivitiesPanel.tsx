import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';

export const PublishedActivitiesPanel: React.FC = () => {
  const client=getSupabaseClient();
  const [items,setItems]=useState<any[]>([]);
  const [error,setError]=useState('');
  const [userId,setUserId]=useState('');
  const [isApproved,setIsApproved]=useState(false);
  const [registrationIds,setRegistrationIds]=useState<string[]>([]);
  const [busy,setBusy]=useState(false);
  const [notice,setNotice]=useState('');
  const load=useCallback(async()=>{
    if(!client)return;
    const {data,error:e}=await client.from('activities').select('id,title,description,location,starts_at').eq('published',true).order('starts_at',{ascending:true}).limit(12);
    if(e)setError(e.message);else setItems(data||[]);
    const {data:userData}=await client.auth.getUser();
    if(userData.user){
      setUserId(userData.user.id);
      const [profileResult,registrationResult]=await Promise.all([
        client.from('profiles').select('membership_status').eq('id',userData.user.id).single(),
        client.from('registrations').select('activity_id').eq('user_id',userData.user.id)
      ]);
      setIsApproved(profileResult.data?.membership_status==='approved');
      if(!registrationResult.error)setRegistrationIds((registrationResult.data||[]).map((x:any)=>x.activity_id));
    }else{setUserId('');setIsApproved(false);setRegistrationIds([]);}
  },[client]);
  useEffect(()=>{void load();},[load]);
  const register = async (activityId:string) => {
    if(!client||!userId||!isApproved)return;
    setBusy(true);setError('');setNotice('');
    const {error:e}=await client.from('registrations').insert({activity_id:activityId,user_id:userId,status:'registered'});
    if(e)setError(e.code==='23505'?'لديك تسجيل سابق في هذا النشاط.':e.message);
    else{setRegistrationIds(old=>[...old,activityId]);setNotice('تم تسجيلك في النشاط بنجاح.');}
    setBusy(false);
  };
  if(!items.length&&!error)return null;
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="text-center mb-6"><p className="text-xs font-bold tracking-widest text-amber-400">NMC · أنشطة النادي</p><h2 className="text-2xl sm:text-3xl font-black mt-2">أنشطة منشورة ومعتمدة</h2><p className="text-sm text-cyan-100/70 mt-2">تابع آخر الأنشطة التي تنظمها فرق النادي.</p></div>
    {error&&<p role="status" className="text-xs text-rose-300">{error}</p>}{notice&&<p role="status" className="text-xs text-emerald-300">{notice}</p>}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">{items.map(item=><article key={item.id} className="rounded-2xl border border-cyan-900 bg-[#06182c] p-4"><div className="flex items-center gap-2 text-amber-300"><Sparkles size={15}/><span className="text-[11px]">نشاط معتمد</span></div><h3 className="font-bold mt-2">{item.title}</h3>{item.description&&<p className="text-sm text-slate-300 mt-2 whitespace-pre-wrap line-clamp-4">{item.description}</p>}{item.starts_at&&<p className="text-xs text-cyan-200 mt-3 flex items-center gap-2"><CalendarDays size={13}/>{new Date(item.starts_at).toLocaleString('ar-DZ')}</p>}{item.location&&<p className="text-xs text-slate-400 mt-1 flex items-center gap-2"><MapPin size={13}/>{item.location}</p>}{isApproved&&<button disabled={busy||registrationIds.includes(item.id)} onClick={()=>void register(item.id)} className="mt-3 rounded-lg bg-cyan-800 px-3 py-2 text-xs font-bold disabled:opacity-50">{registrationIds.includes(item.id)?'مسجل في النشاط':'التسجيل في النشاط'}</button>}</article>)}</div>
  </section>;
};
