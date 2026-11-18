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

  const handleDownload = async () => {
    try {
      const width = 1400;
      const height = 880;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('تعذر إنشاء صورة البطاقة');

      const roundedRect = (x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
      };
      const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
      });

      // بطاقة مستقلة عالية الدقة، مع رسم النص العربي باتجاه RTL.
      ctx.fillStyle = '#020b16';
      ctx.fillRect(0, 0, width, height);
      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, '#06182c');
      background.addColorStop(0.55, '#040f1c');
      background.addColorStop(1, '#020b16');
      ctx.fillStyle = background;
      roundedRect(8, 8, width - 16, height - 16, 38);
      ctx.fill();

      ctx.save();
      roundedRect(10, 10, width - 20, height - 20, 36);
      ctx.clip();
      try {
        const banner = await loadImage('/assets/aistudio/_____________38f0e34a.png');
        ctx.globalAlpha = 0.62;
        ctx.drawImage(banner, 10, 10, width - 20, 255);
        ctx.globalAlpha = 1;
      } catch {
        ctx.fillStyle = '#0b2942';
        ctx.fillRect(10, 10, width - 20, 255);
      }
      const shade = ctx.createLinearGradient(0, 10, 0, 265);
      shade.addColorStop(0, 'rgba(2,11,22,0.15)');
      shade.addColorStop(1, '#040f1c');
      ctx.fillStyle = shade;
      ctx.fillRect(10, 10, width - 20, 255);
      ctx.restore();

      ctx.strokeStyle = 'rgba(34,211,238,0.65)';
      ctx.lineWidth = 5;
      roundedRect(10, 10, width - 20, height - 20, 36);
      ctx.stroke();

      ctx.direction = 'rtl';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.fillText('نادي منبر الشاب المبدع', width - 75, 92);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 27px Arial, sans-serif';
      ctx.fillText('إبداع .. تواصل .. بناء.', width - 75, 137);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 38px Arial, sans-serif';
      ctx.fillText('بطاقة عضوية', 75, 88);
      ctx.fillStyle = '#fcd34d';
      ctx.font = 'bold 22px Arial, sans-serif';
      ctx.fillText('MEMBERSHIP CARD', 75, 128);

      // صورة العضو؛ عند تعذر تحميلها تظهر دائرة بديلة دون إيقاف التنزيل.
      ctx.save();
      ctx.beginPath();
      ctx.arc(190, 490, 112, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(190, 490, 101, 0, Math.PI * 2);
      ctx.clip();
      try {
        if (member.avatar) {
          const avatar = await loadImage(member.avatar);
          ctx.drawImage(avatar, 89, 389, 202, 202);
        } else {
          throw new Error('No avatar');
        }
      } catch {
        ctx.fillStyle = '#12334c';
        ctx.fillRect(89, 389, 202, 202);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.direction = 'rtl';
        ctx.font = 'bold 72px Arial, sans-serif';
        ctx.fillText((member.name || '؟').trim().charAt(0), 190, 515);
      }
      ctx.restore();

      const infoX = 1020;
      ctx.textAlign = 'right';
      ctx.direction = 'rtl';
      const rows = [
        ['الاسم:', member.name],
        ['رقم العضوية:', member.membershipNumber],
        ['نوع العضوية:', member.roleLabel],
        ['تاريخ الإصدار:', member.issueDate],
      ];
      rows.forEach(([label, value], index) => {
        const y = 405 + index * 92;
        ctx.fillStyle = '#67e8f9';
        ctx.font = 'bold 27px Arial, sans-serif';
        ctx.fillText(label, infoX, y);
        ctx.fillStyle = index === 1 ? '#fbbf24' : '#ffffff';
        ctx.font = 'bold 34px Arial, sans-serif';
        ctx.fillText(String(value || '—'), infoX, y + 43);
      });

      // تضمين رمز QR الحقيقي من SVG المعروض على البطاقة.
      const qrSvg = document.querySelector('#printable-membership-card svg') as SVGSVGElement | null;
      if (qrSvg) {
        const serialized = new XMLSerializer().serializeToString(qrSvg);
        const qrImage = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`);
        ctx.fillStyle = '#ffffff';
        roundedRect(1090, 355, 235, 235, 22);
        ctx.fill();
        ctx.drawImage(qrImage, 1107, 372, 201, 201);
      }

      ctx.fillStyle = '#030c18';
      ctx.fillRect(10, 730, width - 20, 140);
      ctx.strokeStyle = 'rgba(8,145,178,0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 730);
      ctx.lineTo(width - 10, 730);
      ctx.stroke();
      ctx.direction = 'rtl';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fcd34d';
      ctx.font = 'bold 30px Arial, sans-serif';
      ctx.fillText('معاً .. نصنع فرقاً', width - 75, 795);
      ctx.fillStyle = '#a5f3fc';
      ctx.font = 'bold 23px Arial, sans-serif';
      ctx.fillText(`صلاحية العضوية: ${member.expiryDate || (member.status === 'active' ? 'سارية ما دام الاعتماد قائماً' : 'غير سارية')}`, width - 75, 840);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error('تعذر حفظ الصورة')), 'image/png');
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `NMC-Membership-${member.membershipNumber || 'card'}.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Membership card PNG export failed:', error);
      setDownloadSuccess(false);
      window.alert('تعذر إنشاء صورة البطاقة. يرجى المحاولة مرة أخرى.');
    }
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
              <span className="font-mono text-white font-bold">{member.expiryDate || (member.status === 'active' ? 'سارية ما دام الاعتماد قائماً' : 'غير سارية')}</span>
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
