import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Mail,
  Phone,
  Send,
  Download,
  Info,
  Users,
  Compass,
  Award,
  Lock,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActivityItem, EventItem, NewsItem, ALL_EVENTS, NEWS } from '../data/clubData.ts';
import { Language, TRANSLATIONS } from '../data/translations.ts';
import { SupabaseClubService } from '../services/supabaseClubService.ts';

// -------------------------------------------------------------
// 1. Join / Membership Modal
// -------------------------------------------------------------
interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, language = 'ar' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    age: '20',
    city: language === 'ar' ? 'سوق أهراس' : 'Souk Ahras',
    selectedInterests: ['tech', 'volunteering'] as string[],
    motivation: '',
    idProofType: 'cin',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [memberId, setMemberId] = useState('');

  if (!isOpen) return null;

  const handleInterestToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(id)
        ? prev.selectedInterests.filter((item) => item !== id)
        : [...prev.selectedInterests, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = formData.fullName.trim();
    if (!trimmedName || trimmedName.length < 3) {
      setErrorMessage('يرجى إدخال الاسم الكامل بشكل صحيح.');
      return;
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('يرجى إدخال بريد إلكتروني صالح.');
      return;
    }

    const trimmedPhone = formData.phone.trim();
    if (!trimmedPhone || trimmedPhone.length < 8) {
      setErrorMessage('يرجى إدخال رقم هاتف صحيح.');
      return;
    }

    const passToUse = formData.password.trim();
    if (passToUse.length < 6) {
      setErrorMessage('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await SupabaseClubService.signUpClubMember({
        email: trimmedEmail,
        password: passToUse,
        fullName: trimmedName,
        phone: trimmedPhone,
        age: parseInt(formData.age, 10) || 20,
        interest: formData.selectedInterests[0] || 'technological',
        motivation: formData.motivation.trim(),
        city: formData.city,
      });

      if (!result.success) {
        setIsSubmitting(false);
        setErrorMessage(result.arabicMessage);
        return;
      }

      const generatedId = 'MNR-' + Math.floor(100000 + Math.random() * 900000);
      setMemberId(generatedId);
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#38bdf8', '#facc15', '#ffffff'],
        });
      } catch {
        // ignore
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || 'حدث خطأ أثناء إرسال الطلب.');
    }
  };

  const interestOptions = t.activitiesSection.items.map((act) => ({
    id: act.id,
    label: act.name,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className={`relative w-full max-w-lg bg-[#06182c] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 ${
          isLtr ? 'text-left' : 'text-right'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-4 ${isLtr ? 'right-4' : 'left-4'} w-9 h-9 rounded-full bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-cyan-900 cursor-pointer transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="inline-block text-xs font-bold text-[#f97316] uppercase tracking-wider mb-1">
                {t.clubName}
              </span>
              <h3 className="text-2xl font-black text-white">{t.modals.join.title}</h3>
              <p className="text-sm text-slate-300 mt-1">
                {t.modals.join.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{errorMessage}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.modals.join.fullNameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modals.join.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.modals.join.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t.modals.join.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.modals.join.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t.modals.join.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>كلمة المرور (لحساب العضوية)</span>
                  </span>
                  <span className="text-[10px] text-cyan-400">6 أحرف كحد أدنى</span>
                </label>
                <input
                  type="password"
                  placeholder="أدخل كلمة مرور الحساب (اختياري: سيتم توليد كلمة مرور افتراضية إن تُركت فارغة)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.modals.join.ageLabel}
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="35"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.modals.join.cityLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.modals.join.idProofLabel}
                </label>
                <select
                  value={formData.idProofType}
                  onChange={(e) => setFormData({ ...formData, idProofType: e.target.value })}
                  className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="cin">
                    {language === 'ar'
                      ? 'بطاقة التعريف الوطنية (للبالغين)'
                      : language === 'fr'
                      ? 'Carte Nationale d\'Identité (pour majeurs)'
                      : 'National Identity Card (for adults)'}
                  </option>
                  <option value="parental">
                    {language === 'ar'
                      ? 'تصريح أبوي أو شرفي معتمد (للقصر دون 18 سنة)'
                      : language === 'fr'
                      ? 'Autorisation parentale / sur l\'honneur (pour mineurs)'
                      : 'Parental / honorary consent (for minors under 18)'}
                  </option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  {t.modals.join.idProofHelp}
                </p>
              </div>

              {/* Interests checklist */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  {t.modals.join.interestsLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((field) => {
                    const isChecked = formData.selectedInterests.includes(field.id);
                    return (
                      <button
                        type="button"
                        key={field.id}
                        onClick={() => handleInterestToggle(field.id)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-orange-500/20 border-orange-500 text-[#f97316] font-bold'
                            : 'bg-[#0a233f] border-cyan-900/50 text-slate-300 hover:border-cyan-700'
                        }`}
                      >
                        {field.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.modals.join.motivationLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder={t.modals.join.motivationPlaceholder}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-orange-gradient w-full py-3 rounded-full text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Sparkles className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                <span>{isSubmitting ? 'جاري إنشاء الحساب وإرسال الطلب...' : t.modals.join.submitBtn}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State with Digital Membership Card */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">{t.modals.join.successTitle}</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              {t.modals.join.successDesc}
            </p>

            {/* Digital Card Preview */}
            <div className={`bg-gradient-to-br from-[#0c2e55] to-[#05172d] border border-cyan-400/50 rounded-2xl p-5 relative overflow-hidden shadow-xl max-w-sm mx-auto ${isLtr ? 'text-left' : 'text-right'}`}>
              <img
                src="/assets/aistudio/logo_emblem_transparent.png"
                alt="Logo emblem"
                className={`absolute ${isLtr ? '-right-6' : '-left-6'} -bottom-6 w-36 h-36 opacity-10 pointer-events-none select-none filter drop-shadow-[0_0_12px_rgba(245,158,11,0.2)]`}
              />

              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-yellow-400 to-cyan-400" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-cyan-950 p-1 border border-amber-400/40">
                    <img
                      src="/assets/aistudio/logo_emblem_transparent.png"
                      alt="Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{t.clubName}</h5>
                    <span className="text-[10px] text-orange-400 font-semibold">{t.modals.join.cardTitle}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  {memberId}
                </span>
              </div>

              <div className="mb-3">
                <span className="text-[11px] text-slate-400 block">{t.modals.join.fullNameLabel}</span>
                <h4 className="text-lg font-black text-white">{formData.fullName}</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.modals.join.cityLabel}</span>
                  <span className="font-semibold">{formData.city}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.modals.join.cardStatus}</span>
                  <span className="font-semibold text-emerald-300">{t.modals.join.cardStatusActive}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-cyan-800/40 text-[10px] text-cyan-200/70 flex justify-between items-center">
                <span>{t.city}</span>
                <span>{t.tagline}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={onClose}
                className="btn-orange-gradient px-6 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm cursor-pointer"
              >
                {t.modals.join.doneBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. Event Registration Modal
// -------------------------------------------------------------
interface EventModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose, language = 'ar' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  const [attendeeName, setAttendeeName] = useState('');
  const [attendeePhone, setAttendeePhone] = useState('');
  const [ticketReserved, setTicketReserved] = useState(false);

  if (!isOpen || !event) return null;

  // Use localized event details if available
  const isFeatured = event.id === 'creative-youth-camp';
  const displayEvent = isFeatured
    ? {
        ...event,
        title: t.eventsCard.featured.title,
        day: t.eventsCard.featured.day,
        month: t.eventsCard.featured.month,
        location: t.eventsCard.featured.location,
        description: t.eventsCard.featured.description,
        price: t.eventsCard.featured.price,
        duration: t.eventsCard.featured.duration,
        schedule: t.eventsCard.featured.schedule,
      }
    : event;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketReserved(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#38bdf8', '#facc15'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className={`relative w-full max-w-xl bg-[#06182c] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 ${
          isLtr ? 'text-left' : 'text-right'
        }`}
      >
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-4 ${isLtr ? 'right-4' : 'left-4'} w-9 h-9 rounded-full bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-cyan-900 cursor-pointer transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>

        {!ticketReserved ? (
          <div>
            <div className="relative rounded-xl overflow-hidden aspect-[16/7] mb-4 border border-cyan-800/40">
              <img
                src={displayEvent.image}
                alt={displayEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06182c] via-transparent to-black/20" />
              <div className={`absolute bottom-3 ${isLtr ? 'left-3' : 'right-3'}`}>
                <span className="px-3 py-1 rounded-full bg-orange-600 text-white font-bold text-xs shadow-md">
                  {displayEvent.day} {displayEvent.month} {displayEvent.year}
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-2">{displayEvent.title}</h3>

            <div className="flex flex-wrap gap-4 text-xs text-slate-300 mb-4 pb-4 border-b border-cyan-900/40">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>{displayEvent.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{displayEvent.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{displayEvent.spotsLeft} {t.modals.eventDetail.spotsLeftLabel}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {displayEvent.description}
            </p>

            {/* Schedule */}
            {displayEvent.schedule && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-cyan-300 mb-2">
                  {t.modals.eventDetail.scheduleTitle}
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {displayEvent.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#0a233f] text-xs text-slate-200"
                    >
                      <span className="font-bold text-[#f97316] shrink-0 font-mono">{item.time}:</span>
                      <span>{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3 pt-2 border-t border-cyan-900/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder={t.modals.join.fullNamePlaceholder}
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="tel"
                  required
                  placeholder={t.modals.join.phonePlaceholder}
                  value={attendeePhone}
                  onChange={(e) => setAttendeePhone(e.target.value)}
                  className="bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="btn-orange-gradient w-full py-3 rounded-full text-white font-bold text-sm cursor-pointer shadow-md"
              >
                {t.modals.eventDetail.registerBtn}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">{t.modals.join.successTitle}</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              {t.modals.eventDetail.successMsg}
            </p>
            <button
              onClick={onClose}
              className="btn-orange-gradient px-8 py-2.5 rounded-full text-white font-bold text-xs mt-2"
            >
              {t.modals.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. Activity Detail Modal
// -------------------------------------------------------------
interface ActivityModalProps {
  activity: ActivityItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenJoin: () => void;
  language?: Language;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  activity,
  isOpen,
  onClose,
  onOpenJoin,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  if (!isOpen || !activity) return null;

  const loc = t.activitiesSection.items.find((a) => a.id === activity.id) || {
    name: activity.name,
    description: activity.description,
    upcomingEvent: activity.upcomingEvent,
    highlights: activity.highlights,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className={`relative w-full max-w-lg bg-[#06182c] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 ${
          isLtr ? 'text-left' : 'text-right'
        }`}
      >
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-4 ${isLtr ? 'right-4' : 'left-4'} w-9 h-9 rounded-full bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-cyan-900 cursor-pointer transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-900/40 border border-cyan-600/40 flex items-center justify-center text-cyan-300">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-orange-400 font-bold">{t.activitiesSection.title}</span>
            <h3 className="text-2xl font-black text-white">{loc.name}</h3>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-5">
          {loc.description}
        </p>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-cyan-300 mb-2.5">
            {t.modals.activityDetail.highlightsLabel}:
          </h4>
          <div className="space-y-2">
            {loc.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs bg-[#09223e] p-2.5 rounded-xl border border-cyan-800/40">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-cyan-950/40 border border-cyan-800/50 rounded-xl mb-6 text-xs text-cyan-200 flex items-center justify-between">
          <span>{t.modals.activityDetail.upcomingEventLabel}: {loc.upcomingEvent}</span>
          <span className="font-bold text-orange-400">{activity.workshopsCount} {t.modals.activityDetail.workshopsLabel}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenJoin();
            }}
            className="btn-orange-gradient flex-1 py-3 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.modals.activityDetail.registerBtn}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm cursor-pointer"
          >
            {t.modals.close}
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. News Detail Modal
// -------------------------------------------------------------
interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, isOpen, onClose, language = 'ar' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  if (!isOpen || !news) return null;

  const loc = t.newsCard.items.find((n) => n.id === news.id) || {
    title: news.title,
    date: news.date,
    category: news.category,
    readTime: news.readTime,
    summary: news.summary,
    content: news.content,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className={`relative w-full max-w-xl bg-[#06182c] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 ${
          isLtr ? 'text-left' : 'text-right'
        }`}
      >
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-4 ${isLtr ? 'right-4' : 'left-4'} w-9 h-9 rounded-full bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-cyan-900 cursor-pointer transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative rounded-xl overflow-hidden aspect-[16/8] mb-4 border border-cyan-800/40">
          <img src={news.thumbnail} alt={loc.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06182c] via-transparent to-black/20" />
          <div className={`absolute bottom-3 ${isLtr ? 'left-3' : 'right-3'}`}>
            <span className="px-3 py-1 rounded-full bg-cyan-700/80 text-white font-bold text-xs backdrop-blur-sm">
              {loc.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
          <span>{loc.date}</span>
          <span>•</span>
          <span>{loc.readTime}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white mb-4 leading-snug">
          {loc.title}
        </h3>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed mb-6">
          {loc.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <button
          onClick={onClose}
          className="btn-orange-gradient w-full py-2.5 rounded-full text-white font-bold text-xs cursor-pointer"
        >
          {t.modals.close}
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. Video Modal
// -------------------------------------------------------------
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, language = 'ar' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className="relative w-full max-w-3xl bg-[#06182c] border border-cyan-500/40 rounded-2xl shadow-2xl p-4 sm:p-6 text-white"
      >
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-3 ${isLtr ? 'right-3' : 'left-3'} w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer z-10`}
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span>{t.modals.video.title}</span>
        </h3>

        <div className="relative rounded-xl overflow-hidden aspect-video bg-black border border-cyan-800/40 mb-3">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
            title="Club Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p className="text-xs text-slate-300 text-center">
          {t.modals.video.desc}
        </p>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 6. About Modal
// -------------------------------------------------------------
interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoin: () => void;
  language?: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenJoin,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className={`relative w-full max-w-2xl bg-[#06182c] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 ${
          isLtr ? 'text-left' : 'text-right'
        }`}
      >
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-4 ${isLtr ? 'right-4' : 'left-4'} w-9 h-9 rounded-full bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-cyan-900 cursor-pointer transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1 block">
            {t.city}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">{t.modals.about.title}</h3>
          <p className="text-sm text-cyan-200/80 mt-1">{t.modals.about.subtitle}</p>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          {/* History / Overview */}
          <div className="bg-[#0a233f] p-4 rounded-xl border border-cyan-800/40">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span>{t.modals.about.historyTitle}</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.modals.about.historyParagraphs ? (
                t.modals.about.historyParagraphs.map((p, idx) => <p key={idx}>{p}</p>)
              ) : (
                <p>{(t.modals.about as any).historyText}</p>
              )}
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0a233f] p-4 rounded-xl border border-cyan-800/40">
              <h4 className="text-sm font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>{t.modals.about.visionTitle}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.modals.about.visionText}
              </p>
            </div>
            <div className="bg-[#0a233f] p-4 rounded-xl border border-cyan-800/40">
              <h4 className="text-sm font-bold text-orange-300 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                <span>{t.modals.about.missionTitle}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.modals.about.missionText}
              </p>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-[#0a233f] p-4 rounded-xl border border-cyan-800/40">
            <h4 className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.modals.about.goalsTitle}</span>
            </h4>
            {t.modals.about.goalsIntro && (
              <p className="text-xs sm:text-sm text-slate-300 mb-3">{t.modals.about.goalsIntro}</p>
            )}
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
              {(t.modals.about.goalsBullets || (t.modals.about as any).goals || []).map((g: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          {t.modals.about.values && t.modals.about.values.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-white mb-3">
                {t.modals.about.valuesTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.modals.about.values.map((v, i) => (
                  <div key={i} className="p-3 bg-[#0a233f]/70 rounded-xl border border-cyan-900/40 text-xs">
                    <h5 className="font-bold text-amber-300 mb-1">{v.title}</h5>
                    <p className="text-slate-300 text-[11px]">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {t.modals.about.stats && t.modals.about.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {t.modals.about.stats.map((s, i) => (
                <div key={i} className="bg-[#071d33] p-3 rounded-xl border border-cyan-700/40">
                  <span className="text-lg font-black text-[#f97316] block">{s.number}</span>
                  <span className="text-[11px] text-slate-300">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-cyan-900/40 flex gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenJoin();
            }}
            className="btn-orange-gradient flex-1 py-3 rounded-full text-white font-bold text-sm cursor-pointer"
          >
            {t.joinCard.button}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm cursor-pointer"
          >
            {t.modals.close}
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 7. Contact Modal
// -------------------------------------------------------------
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, language = 'ar' }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className={`relative w-full max-w-lg bg-[#06182c] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 ${
          isLtr ? 'text-left' : 'text-right'
        }`}
      >
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-4 ${isLtr ? 'right-4' : 'left-4'} w-9 h-9 rounded-full bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-cyan-900 cursor-pointer transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>

        {!sent ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1 block">
                {t.clubName}
              </span>
              <h3 className="text-2xl font-black text-white">{t.modals.contact.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{t.modals.contact.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.modals.contact.fullName}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modals.join.fullNamePlaceholder}
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.modals.contact.email}
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@example.com"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.modals.contact.subject}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.modals.contact.subjectPlaceholder}
                  value={contactData.subject}
                  onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                  className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.modals.contact.message}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={t.modals.contact.messagePlaceholder}
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full bg-[#0a233f] border border-cyan-800/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="p-3.5 bg-[#0a233f] rounded-xl border border-cyan-800/40 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>{t.modals.contact.addressValue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href={`tel:${t.modals.contact.phoneValue}`} dir="ltr" className="hover:text-emerald-300 font-mono font-semibold transition-colors">
                    {t.modals.contact.phoneValue}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a href={`mailto:${t.modals.contact.emailValue}`} className="hover:text-cyan-300 font-semibold transition-colors">
                    {t.modals.contact.emailValue}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t.modals.contact.workHoursValue}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-orange-gradient w-full py-3 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.modals.contact.sendBtn}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">{t.modals.join.successTitle}</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto">
              {t.modals.contact.successMsg}
            </p>
            <button
              onClick={onClose}
              className="btn-orange-gradient px-8 py-2.5 rounded-full text-white font-bold text-xs mt-2"
            >
              {t.modals.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 8. Legal Modal (Terms & Privacy)
// -------------------------------------------------------------
interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
  language?: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  type,
  isOpen,
  onClose,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  if (!isOpen || !type) return null;

  const isPrivacy = type === 'privacy';
  const legalData = isPrivacy ? t.modals.privacy : t.modals.terms;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className={`relative w-full max-w-3xl bg-[#06182c] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 ${
          isLtr ? 'text-left' : 'text-right'
        }`}
      >
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-4 ${isLtr ? 'right-4' : 'left-4'} w-9 h-9 rounded-full bg-cyan-950/60 border border-cyan-700/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-cyan-900 cursor-pointer transition-colors`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pb-4 border-b border-cyan-900/40">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
            {t.clubName} – {t.city}
          </span>
          <h3 className="text-2xl font-black text-white">{legalData.title}</h3>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {legalData.sections.map((sec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#0a233f] border border-cyan-800/40">
              <h4 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                <span>{sec.title}</span>
              </h4>
              <p className="whitespace-pre-line text-slate-200 text-xs sm:text-sm leading-relaxed">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-cyan-900/40 text-center">
          <button
            onClick={onClose}
            className="btn-orange-gradient px-8 py-2.5 rounded-full text-white font-bold text-xs cursor-pointer"
          >
            {t.modals.close}
          </button>
        </div>
      </div>
    </div>
  );
};
