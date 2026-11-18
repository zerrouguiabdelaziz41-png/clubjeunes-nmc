import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDays, MapPin, Sparkles, ArrowRight, ClipboardList } from 'lucide-react';
import { getSupabaseClient } from '../lib/supabase.ts';

type ActivityView = 'all' | 'upcoming' | 'mine';

interface PublishedActivitiesPanelProps {
  pageMode?: boolean;
  onBackToHome?: () => void;
}

export const PublishedActivitiesPanel: React.FC<PublishedActivitiesPanelProps> = ({
  pageMode = false,
  onBackToHome,
}) => {
  const client = getSupabaseClient();
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [registrationIds, setRegistrationIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [activeView, setActiveView] = useState<ActivityView>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!client) {
      setError('تعذر تهيئة الاتصال بقاعدة البيانات.');
      return;
    }

    const { data, error: activitiesError } = await client
      .from('activities')
      .select('id,title,description,location,starts_at')
      .eq('published', true)
      .order('starts_at', { ascending: true })
      .limit(100);

    if (activitiesError) setError(activitiesError.message);
    else {
      setError('');
      setItems(data || []);
    }

    const { data: userData } = await client.auth.getUser();
    if (userData.user) {
      setUserId(userData.user.id);
      const [profileResult, registrationResult] = await Promise.all([
        client.from('profiles').select('membership_status').eq('id', userData.user.id).single(),
        client.from('registrations').select('activity_id,status').eq('user_id', userData.user.id),
      ]);
      setIsApproved(profileResult.data?.membership_status === 'approved');
      if (!registrationResult.error) {
        setRegistrationIds(
          (registrationResult.data || [])
            .filter((registration: any) => registration.status !== 'cancelled')
            .map((registration: any) => registration.activity_id),
        );
      }
    } else {
      setUserId('');
      setIsApproved(false);
      setRegistrationIds([]);
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  const register = async (activityId: string) => {
    if (!client || !userId || !isApproved || busy) return;
    setBusy(true);
    setError('');
    setNotice('');
    const { error: registrationError } = await client
      .from('registrations')
      .insert({ activity_id: activityId, user_id: userId, status: 'registered' });

    if (registrationError) {
      setError(
        registrationError.code === '23505'
          ? 'لديك تسجيل سابق في هذا النشاط.'
          : registrationError.message,
      );
    } else {
      setRegistrationIds((old) => [...old, activityId]);
      setNotice('تم تسجيلك في النشاط بنجاح.');
    }
    setBusy(false);
  };

  const visibleItems = useMemo(() => {
    if (activeView === 'mine') {
      return items.filter((item) => registrationIds.includes(item.id));
    }
    if (activeView === 'upcoming') {
      const now = Date.now();
      return items.filter((item) => item.starts_at && new Date(item.starts_at).getTime() >= now);
    }
    return items;
  }, [activeView, items, registrationIds]);

  const tabs: { id: ActivityView; label: string }[] = [
    { id: 'all', label: 'كل الأنشطة' },
    { id: 'upcoming', label: 'الأنشطة القادمة' },
    { id: 'mine', label: 'أنشطتي' },
  ];

  return (
    <section className={pageMode ? 'min-h-[65vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'}>
      <div className="text-center mb-6">
        {pageMode && onBackToHome && (
          <div className="flex justify-start mb-5">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-800 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-900/40"
            >
              <ArrowRight size={16} />
              العودة إلى الرئيسية
            </button>
          </div>
        )}
        <p className="text-xs font-bold tracking-widest text-amber-400">NMC · أنشطة النادي</p>
        <h2 className="text-2xl sm:text-3xl font-black mt-2">
          {pageMode ? 'أنشطة النادي' : 'أنشطة منشورة ومعتمدة'}
        </h2>
        <p className="text-sm text-cyan-100/70 mt-2">
          {pageMode
            ? 'تصفح الأنشطة المنشورة، واكتشف القادمة، وتابع مشاركاتك.'
            : 'تابع آخر الأنشطة التي تنظمها فرق النادي.'}
        </p>
      </div>

      {pageMode && (
        <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist" aria-label="تصنيف الأنشطة">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeView === tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition-colors ${
                activeView === tab.id
                  ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                  : 'border-cyan-900 bg-cyan-950/40 text-cyan-200 hover:bg-cyan-900/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {error && <p role="status" className="text-xs text-rose-300 mb-3">{error}</p>}
      {notice && <p role="status" className="text-xs text-emerald-300 mb-3">{notice}</p>}

      {activeView === 'mine' && !userId && (
        <p className="text-center text-sm text-cyan-100/80 py-4">
          سجّل الدخول لعرض الأنشطة التي شاركت فيها.
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {visibleItems.map((item) => {
          const isRegistered = registrationIds.includes(item.id);
          const isExpanded = expandedId === item.id;
          const isUpcoming = item.starts_at && new Date(item.starts_at).getTime() >= Date.now();
          return (
            <article key={item.id} className="rounded-2xl border border-cyan-900 bg-[#06182c] p-4">
              <div className="flex items-center gap-2 text-amber-300">
                <Sparkles size={15} />
                <span className="text-[11px]">نشاط منشور</span>
                {isUpcoming && <span className="text-[10px] rounded-full bg-emerald-950 px-2 py-0.5 text-emerald-300">قادم</span>}
              </div>
              <h3 className="font-bold mt-2">{item.title}</h3>
              {item.description && (
                <p className={`text-sm text-slate-300 mt-2 whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-3'}`}>
                  {item.description}
                </p>
              )}
              {item.starts_at && (
                <p className="text-xs text-cyan-200 mt-3 flex items-center gap-2">
                  <CalendarDays size={13} />
                  {new Date(item.starts_at).toLocaleString('ar-DZ')}
                </p>
              )}
              {item.location && (
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <MapPin size={13} />
                  {item.location}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="rounded-lg border border-cyan-800 px-3 py-2 text-xs font-bold text-cyan-200 hover:bg-cyan-900/40"
                >
                  {isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                </button>
                {isRegistered && (
                  <span className="rounded-lg bg-emerald-950 px-3 py-2 text-xs font-bold text-emerald-300">
                    مسجل في النشاط
                  </span>
                )}
                {isApproved && !isRegistered && (
                  <button
                    type="button"
                    disabled={busy || !isUpcoming}
                    onClick={() => void register(item.id)}
                    className="rounded-lg bg-cyan-800 px-3 py-2 text-xs font-bold disabled:opacity-50"
                  >
                    {isUpcoming ? (busy ? 'جارٍ التسجيل…' : 'التسجيل في النشاط') : 'انتهى النشاط'}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {!error && visibleItems.length === 0 && (
        <div className="text-center py-12 px-6 rounded-2xl bg-[#06182c]/50 border border-cyan-900/40 text-cyan-200">
          <ClipboardList className="mx-auto mb-3 opacity-70" size={28} />
          <p className="text-sm font-bold">
            {activeView === 'mine'
              ? userId ? 'لم تسجل في أي نشاط منشور بعد.' : 'سجّل الدخول لمتابعة أنشطتك.'
              : activeView === 'upcoming'
                ? 'لا توجد أنشطة قادمة منشورة حالياً.'
                : 'لا توجد أنشطة منشورة حالياً.'}
          </p>
        </div>
      )}
    </section>
  );
};
