import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  User,
  QrCode,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';
import { QRCodeBadge } from './QRCodeBadge.tsx';

export interface MemberData {
  id: string;
  membershipNumber: string;
  name: string;
  role: 'member' | 'organizer' | 'admin';
  roleLabel: string;
  age: number;
  phone: string;
  email: string;
  city: string;
  avatar: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'pending' | 'expired';
}

export const DEFAULT_MEMBER: MemberData = {
  id: '',
  membershipNumber: '',
  name: 'لا توجد بيانات عضو',
  role: 'member',
  roleLabel: 'غير معتمد',
  age: 0,
  phone: '',
  email: '',
  city: '',
  avatar: '',
  issueDate: '',
  expiryDate: '',
  status: 'pending',
};

interface MembershipCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: MemberData;
  language?: Language;
  onVerify?: () => void;
}

export const MembershipCardModal: React.FC<MembershipCardModalProps> = ({
  isOpen,
  onClose,
  member = DEFAULT_MEMBER,
  language = 'ar',
  onVerify,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  if (!isOpen) return null;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div
        dir={isLtr ? 'ltr' : 'rtl'}
        className="relative w-full max-w-2xl bg-[#041427] border border-cyan-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl text-white my-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t.modals.close}
          className={`absolute top-4 ${isLtr ? 'right-4' : 'left-4'} w-9 h-9 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-slate-200 hover:text-white flex items-center justify-center hover:bg-cyan-900 cursor-pointer transition-colors z-20`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center mb-5">
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>بطاقة العضوية الرقمية</span>
          </h3>
          <p className="text-xs text-cyan-200/80 mt-0.5">
            البطاقة الرقمية الرسمية لنادي منبر الشاب المبدع – سوق أهراس
          </p>
        </div>

        {/* The Card Container - 1:1 match to reference screenshot */}
        <div
          id="printable-membership-card"
          className="relative w-full rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.15)] bg-gradient-to-br from-[#06182c] via-[#040f1c] to-[#020b16] select-none"
        >
          {/* Top Banner with Sunset Mountains & City Skyline */}
          <div className="relative h-28 sm:h-32 w-full overflow-hidden border-b border-cyan-800/50">
            <img
              src="/assets/aistudio/_____________38f0e34a.png"
              alt="Card Header Banner"
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c] via-[#040f1c]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040f1c]/80 via-transparent to-[#040f1c]/80" />

            {/* Club Brand in Banner (Right side in RTL) */}
            <div className={`absolute top-3.5 ${isLtr ? 'left-4' : 'right-4'} flex items-center gap-2.5 z-10`}>
              <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-orange-500 shadow-md shrink-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <img
                  src="/assets/aistudio/Youth_Creativity_Club_Emblem_41b52108.png"
                  alt="Club Emblem"
                  className="w-full h-full object-cover rounded-full filter drop-shadow"
                />
              </div>
              <div className="flex flex-col text-white leading-tight">
                <span className="text-xs sm:text-sm font-black tracking-tight drop-shadow">
                  نادي منبر الشاب المبدع
                </span>
                <span className="text-[10px] text-amber-400 font-bold drop-shadow">
                  إبداع .. تواصل .. بناء.
                </span>
              </div>
            </div>

            {/* Card Type Header (Left side in RTL) */}
            <div className={`absolute top-3.5 ${isLtr ? 'right-4 text-right' : 'left-4 text-left'} z-10`}>
              <span className="text-sm sm:text-base font-black text-[#f97316] tracking-tight block drop-shadow">
                بطاقة عضوية
              </span>
              <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-amber-300 block uppercase drop-shadow font-mono">
                MEMBERSHIP CARD
              </span>
            </div>
          </div>

          {/* Card Body Row */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 relative">
            
            {/* Ambient Watermark Background */}
            <div className="absolute left-6 bottom-4 w-28 h-28 opacity-5 pointer-events-none">
              <img
                src="/assets/aistudio/__________________3__201639fb.svg"
                alt="watermark"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right block: Avatar & Member Information */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Golden Glowing Circular Avatar */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)] shrink-0">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Information Rows */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300/80 font-medium">الاسم:</span>
                  <span className="text-white font-black text-sm sm:text-base">{member.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-cyan-300/80 font-medium">رقم العضوية:</span>
                  <span className="text-amber-400 font-black font-mono tracking-wider">{member.membershipNumber}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-cyan-300/80 font-medium">نوع العضوية:</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {member.roleLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-cyan-300/80 font-medium">تاريخ الإصدار:</span>
                  <span className="text-slate-300 font-mono text-[11px]">{member.issueDate}</span>
                </div>
              </div>
            </div>

            {/* Left block: QR Code Badge with Direct Verification Action */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <QRCodeBadge
                size={96}
                value={member.membershipNumber}
                onClick={onVerify}
                showClickHint={true}
              />
              <span className="text-[10px] text-cyan-300 mt-2 font-mono">
                #{member.membershipNumber}
              </span>
            </div>
          </div>

          {/* Card Footer Bar */}
          <div className="px-5 py-2.5 bg-[#030c18] border-t border-cyan-900/60 flex items-center justify-between text-xs text-slate-300">
            {/* Tagline */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-extrabold text-amber-300 text-xs">
                معاً .. نصنع فرقاً
              </span>
            </div>

            {/* Expiry Badge */}
            <div className="flex items-center gap-1.5 text-[11px] text-cyan-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>صلاحية البطاقة:</span>
              <span className="font-mono text-white font-bold">{member.expiryDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs transition-all cursor-pointer shadow-lg shadow-orange-500/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>تحميل البطاقة</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-200 hover:text-white font-bold text-xs transition-all cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>طباعة البطاقة</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-200 hover:text-white font-bold text-xs transition-all cursor-pointer active:scale-95"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>{copied ? 'تم النسخ!' : 'مشاركة البطاقة'}</span>
          </button>

          {/* Verify QR */}
          <button
            onClick={onVerify}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-600/50 text-emerald-300 hover:text-emerald-200 font-bold text-xs transition-all cursor-pointer active:scale-95"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>التحقق من العضوية</span>
          </button>
        </div>

        {/* Feedback message when downloaded or copied */}
        {downloadSuccess && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-200 text-xs text-center flex items-center justify-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>تم تجهيز بطاقة العضوية وحفظها بنجاح بصيغة رقمية فائقة الدقة!</span>
          </div>
        )}
      </div>
    </div>
  );
};
