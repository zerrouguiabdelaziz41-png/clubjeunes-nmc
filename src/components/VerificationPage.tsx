import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Home,
  User,
  Calendar,
  QrCode,
  Award,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  Search,
  Database,
  RefreshCw,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';
import { QRCodeBadge } from './QRCodeBadge.tsx';
import { MemberData, DEFAULT_MEMBER } from './MembershipCardModal.tsx';
import { SupabaseClubService } from '../services/supabaseClubService.ts';

interface VerificationPageProps {
  onBackToHome: () => void;
  onBackToAccount?: () => void;
  member?: MemberData;
  language?: Language;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({
  onBackToHome,
  onBackToAccount,
  member: initialMember = DEFAULT_MEMBER,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  const [currentMember, setCurrentMember] = useState<MemberData>(initialMember);
  const [searchNumber, setSearchNumber] = useState(initialMember.membershipNumber);
  const [isSearching, setIsSearching] = useState(false);
  const [verifySource, setVerifySource] = useState<'supabase' | 'local'>('supabase');
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNumber.trim()) return;

    setIsSearching(true);
    setNotFound(false);

    try {
      const res = await SupabaseClubService.verifyMember(searchNumber.trim());
      if (res.found && res.member) {
        setCurrentMember(res.member);
        setVerifySource(res.source);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div
      dir={isLtr ? 'ltr' : 'rtl'}
      className="min-h-screen bg-[#040f1c] text-white selection:bg-orange-500 selection:text-white pb-24"
    >
      {/* 1. Hero Panorama & Header Banner */}
      <div className="relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden border-b border-cyan-900/40">
        <img
          src="/assets/aistudio/_____________38f0e34a.png"
          alt="Panoramic Banner"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c] via-[#040f1c]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040f1c]/80 via-transparent to-[#040f1c]/80" />

        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent blur-2xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-6">
          {/* Breadcrumb Row */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-200/80">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>الرئيسية</span>
            </button>
            <span className="text-cyan-700">/</span>
            <span className="text-white font-bold">التحقق من صحة العضوية</span>
          </div>

          {/* Page Main Title Badge */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-lg shadow-emerald-500/30 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#040f1d] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                <span>التحقق من صحة العضوية</span>
              </h1>
              <p className="text-xs sm:text-sm text-cyan-200/80 mt-1 font-medium">
                تأكد من صحة بيانات العضوية الصادرة من نادي منبر الشاب المبدع
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Verification Box - 1:1 match to reference screenshot */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
        {/* Outer Card with Cyan Glowing Border */}
        <div className="bg-[#05172b]/95 backdrop-blur-md border border-cyan-500/50 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
          
          {/* Header Card Brand */}
          <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#072444] via-[#051c35] to-[#072444] border border-cyan-800/60 overflow-hidden flex items-center justify-between">
            <div className="flex items-center gap-3.5 z-10">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-orange-500 shadow-md flex items-center justify-center bg-white/10 shrink-0">
                <img
                  src="/assets/aistudio/Youth_Creativity_Club_Emblem_41b52108.png"
                  alt="Emblem"
                  className="w-full h-full object-cover rounded-full filter drop-shadow"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  نادي منبر الشاب المبدع
                </h3>
                <p className="text-xs text-amber-400 font-bold mt-0.5">
                  إبداع .. تواصل .. بناء.
                </p>
              </div>
            </div>

            {/* Subtle decorative swoop */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-amber-500/15 to-transparent pointer-events-none" />
          </div>

          {/* Quick Membership Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="أدخل رقم العضوية (مثال: NMC-2026-0001) للتحقق من السجل..."
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#030e1d] border border-cyan-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-4 h-4 text-cyan-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shadow-md shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSearching ? 'animate-spin' : ''}`} />
              <span>{isSearching ? 'جاري الفحص...' : 'فحص العضوية'}</span>
            </button>
          </form>

          {notFound && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between">
              <span>⚠️ لم يتم العثور على عضو بهذا الرقم ({searchNumber}) في السجلات.</span>

            </div>
          )}

          {/* Status Banner: "العضوية صالحة" with glowing green checkmark */}
          <div className={`rounded-2xl p-4 sm:p-5 border flex items-center justify-between shadow-lg ${currentMember.status === 'active' && !notFound ? 'bg-emerald-950/50 border-emerald-500/50' : 'bg-amber-950/40 border-amber-600/50'}`}>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-lg sm:text-2xl font-black ${currentMember.status === 'active' && !notFound ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {currentMember.status === 'active' && !notFound ? 'العضوية معتمدة' : 'العضوية غير مثبتة'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Database className="w-2.5 h-2.5" />
                  <span>سجلات Supabase</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 font-medium">
                {currentMember.status === 'active' && !notFound ? 'تم العثور على سجل عضوية معتمد في قاعدة البيانات.' : 'أدخل معرّف العضوية الكامل للتحقق من وجود سجل معتمد.'}
              </p>
            </div>
            
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center shrink-0 ${currentMember.status === 'active' && !notFound ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' : 'bg-amber-500/20 border-amber-400 text-amber-300'}`}>
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>

          {/* Member Profile & Verification Details Grid */}
          <div className="rounded-2xl p-5 sm:p-6 bg-[#031122]/90 border border-cyan-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Member Avatar & Role Badge */}
            <div className="flex flex-col items-center text-center shrink-0 w-full md:w-auto">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] mb-3">
                <img
                  src={currentMember.avatar}
                  alt={currentMember.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <span className="px-4 py-1 rounded-full text-xs font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md mb-1.5">
                {currentMember.roleLabel}
              </span>

              <div className="text-xs text-slate-300 font-mono mt-0.5">
                رقم العضوية: <span className="text-amber-400 font-bold">{currentMember.membershipNumber}</span>
              </div>

              <div className="mt-2 text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>معاً .. نصنع فرقاً</span>
              </div>
            </div>

            {/* Information Rows Table */}
            <div className="w-full md:flex-1 space-y-3.5 divide-y divide-cyan-900/40 text-xs sm:text-sm">
              <div className="flex items-center justify-between pt-2">
                <span className="text-cyan-300/80 font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>اسم العضو</span>
                </span>
                <span className="text-white font-black text-sm sm:text-base">{currentMember.name}</span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-cyan-300/80 font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>نوع العضوية</span>
                </span>
                <span className="text-emerald-300 font-bold">{currentMember.roleLabel}</span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-cyan-300/80 font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>تاريخ إصدار البطاقة</span>
                </span>
                <span className="text-slate-300 font-mono">{currentMember.issueDate}</span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-cyan-300/80 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>تاريخ انتهاء العضوية</span>
                </span>
                <span className="text-emerald-400 font-bold font-mono">{currentMember.expiryDate}</span>
              </div>
            </div>

          </div>

          {/* QR Code Verification Explanation */}
          <div className="rounded-2xl p-5 bg-[#031122]/90 border border-cyan-900/60 flex flex-col sm:flex-row items-center gap-5">
            <div className="shrink-0">
              <QRCodeBadge size={105} value={currentMember.membershipNumber} />
            </div>
            <div>
              <h4 className="text-sm font-black text-white flex items-center gap-2 mb-1.5">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>رمز التحقق الرقمي</span>
              </h4>
              <p className="text-xs text-cyan-200/90 leading-relaxed font-normal">
                تم إنشاء هذا الرمز للتحقق من صحة بطاقة العضوية ويعرض البيانات المصرح بها فقط لضمان الخصوصية وأمان العضوية الرسمية.
              </p>
            </div>
          </div>

          {/* Security & Official Verification Disclaimer Footer */}
          <div className="rounded-2xl p-4 bg-cyan-950/40 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">التحقق من صحة البطاقة أو بصمتها</span>
                <span className="text-[11px] text-cyan-200/80">
                  يمكن لأي جهة رسمية أو فرد التحقق من صحة العضوية عبر مسح رمز QR أو من خلال رقم العضوية.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 bg-[#020b16] px-3.5 py-1.5 rounded-xl border border-cyan-900/60">
              <img
                src="/assets/aistudio/__________________3__201639fb.svg"
                alt="Issuer"
                className="w-6 h-6 object-contain"
              />
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">جهة الإصدار</span>
                <span className="text-xs font-bold text-white">نادي منبر الشاب المبدع</span>
              </div>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-cyan-900/50">
            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-200 hover:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              العودة إلى الصفحة الرئيسية
            </button>

            {onBackToAccount && (
              <button
                onClick={onBackToAccount}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-orange-500/20 flex items-center gap-2"
              >
                <span>العودة إلى ملف الحساب</span>
                {isLtr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
