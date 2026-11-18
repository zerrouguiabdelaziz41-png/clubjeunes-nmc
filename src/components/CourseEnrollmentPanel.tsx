import React, { useCallback, useEffect, useState } from 'react';
import { BookOpen, CalendarDays, MapPin } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';

export const CourseEnrollmentPanel: React.FC = () => {
  const client = getSupabaseClient();
  const [courses,setCourses] = useState<any[]>([]);
  const [enrollments,setEnrollments] = useState<any[]>([]);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [notice,setNotice] = useState('');
  const load = useCallback(async () => {
    if (!client) return;
    setBusy(true); setError('');
    const {data:userData,error:userError} = await client.auth.getUser();
    if (userError || !userData.user) {setError('يرجى تسجيل الدخول أولاً.');setBusy(false);return;}
    const [courseResult,enrollmentResult] = await Promise.all([
      client.from('courses').select('id,title,description,starts_at,ends_at,location,status,capacity').eq('status','open').order('starts_at',{ascending:true}),
      client.from('course_enrollments').select('id,course_id,status,enrolled_at').eq('user_id',userData.user.id).order('enrolled_at',{ascending:false})
    ]);
    if (courseResult.error) setError(courseResult.error.message); else setCourses(courseResult.data||[]);
    if (enrollmentResult.error) setError(enrollmentResult.error.message); else setEnrollments(enrollmentResult.data||[]);
    setBusy(false);
  },[client]);
  useEffect(()=>{void load();},[load]);
  const enroll = async (courseId:string) => {
    if (!client) return;
    setBusy(true);setError('');setNotice('');
    const {data:userData,error:userError} = await client.auth.getUser();
    if (userError || !userData.user) {setError('تعذر التحقق من حسابك.');setBusy(false);return;}
    const {error:e} = await client.from('course_enrollments').insert({course_id:courseId,user_id:userData.user.id,status:'enrolled'});
    if (e) setError(e.code==='23505'?'لديك تسجيل سابق في هذه الدورة.':e.message);
    else {setNotice('تم تسجيلك في الدورة بنجاح.');await load();}
    setBusy(false);
  };
  const withdraw = async (id:string) => {
    if (!client || !window.confirm('هل تريد إلغاء تسجيلك في هذه الدورة؟')) return;
    setBusy(true);setError('');
    const {error:e} = await client.from('course_enrollments').update({status:'withdrawn'}).eq('id',id);
    if (e) setError(e.message); else {setNotice('تم إلغاء تسجيلك.');await load();}
    setBusy(false);
  };
  const statusLabel:Record<string,string> = {enrolled:'مسجل',waitlisted:'قائمة الانتظار',completed:'أكملت الدورة',withdrawn:'ملغى'};
  return <section className="rounded-3xl border border-cyan-900 bg-[#06182c] p-5 space-y-4">
    <div className="flex items-center gap-3"><BookOpen className="text-amber-400"/><div><h3 className="font-bold text-lg">الدورات والتكوين</h3><p className="text-xs text-slate-400">استعرض الدورات المفتوحة وتابع تسجيلاتك.</p></div></div>
    {error&&<p role="alert" className="rounded-lg bg-rose-950/40 p-3 text-sm text-rose-200">{error}</p>}
    {notice&&<p className="rounded-lg bg-emerald-950/40 p-3 text-sm text-emerald-200">{notice}</p>}
    {busy&&<p className="text-xs text-slate-400">جارٍ التحديث…</p>}
    <div className="grid md:grid-cols-2 gap-3">
      {courses.map(course=>{
        const enrollment=enrollments.find(x=>x.course_id===course.id);
        return <article key={course.id} className="rounded-2xl border border-cyan-950 p-4 space-y-2">
          <h4 className="font-bold">{course.title}</h4>
          {course.description&&<p className="text-sm text-slate-300 whitespace-pre-wrap">{course.description}</p>}
          {course.starts_at&&<p className="text-xs text-cyan-200 flex items-center gap-2"><CalendarDays size={14}/>{new Date(course.starts_at).toLocaleString('ar-DZ')}</p>}
          {course.location&&<p className="text-xs text-slate-400 flex items-center gap-2"><MapPin size={14}/>{course.location}</p>}
          {enrollment ? <div className="flex items-center justify-between gap-2"><span className="text-xs text-emerald-300">{statusLabel[enrollment.status]||enrollment.status}</span>{enrollment.status!=='withdrawn'&&<button disabled={busy} onClick={()=>void withdraw(enrollment.id)} className="text-xs text-rose-300">إلغاء التسجيل</button>}</div>
          : <button disabled={busy} onClick={()=>void enroll(course.id)} className="rounded-lg bg-cyan-800 px-4 py-2 text-sm font-bold disabled:opacity-50">التسجيل في الدورة</button>}
        </article>;
      })}
      {!courses.length&&<p className="text-sm text-slate-400">لا توجد دورات مفتوحة للتسجيل حالياً.</p>}
    </div>
    <div className="border-t border-cyan-950 pt-3"><h4 className="font-bold text-sm mb-2">سجل تسجيلاتي</h4>{enrollments.length?enrollments.map(e=><p key={e.id} className="text-xs text-slate-300 py-1">{courses.find(c=>c.id===e.course_id)?.title||'دورة سابقة'} — {statusLabel[e.status]||e.status}</p>):<p className="text-xs text-slate-500">لم تسجل في أي دورة بعد.</p>}</div>
  </section>;
};
