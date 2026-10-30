import React, { useState, useRef } from 'react';
import {
  Home,
  Users,
  UserPlus,
  User,
  Mail,
  Phone,
  Calendar,
  Star,
  Camera,
  FileText,
  Send,
  GraduationCap,
  Heart,
  BookOpen,
  Award,
  Medal,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckSquare,
  Square,
  ClipboardList,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Database,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';
import { MemberData } from './MembershipCardModal.tsx';
import { SupabaseClubService } from '../services/supabaseClubService.ts';

interface MembershipPageProps {
  onBackToHome: () => void;
  onRegistered: (newMember: MemberData) => void;
  onOpenAccount: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenSupabase?: () => void;
  language?: Language;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({
  onBackToHome,
  onRegistered,
  onOpenAccount,
  onOpenPrivacy,
  onOpenTerms,
  onOpenSupabase,
  language = 'ar',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  // Form State
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [interest, setInterest] = useState('technological');
  const [bio, setBio] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>(
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
  );
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMissingKey, setIsMissingKey] = useState(false);
  const [registeredMemberNumber, setRegisteredMemberNumber] = useState<string>('');
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage('نوع الملف غير مدعوم. يرجى اختيار ملف صورة صالح (JPG, PNG, WebP).');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      // Validate file size: 2MB limit (2 * 1024 * 1024 bytes)
      const MAX_FILE_SIZE = 2 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage('حجم الصورة المحددة يتجاوز 2 ميغابايت. يرجى اختيار صورة أصغر حجماً (الحد الأقصى: 2 ميغابايت).');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      setErrorMessage(null);
      setSelectedPhotoFile(file);
      // Create a lightweight local object URL for preview without heavy Base64 conversion
      const localUrl = URL.createObjectURL(file);
      setPhotoPreview(localUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsMissingKey(false);

    if (!agreeTerms) {
      setErrorMessage('يرجى الموافقة على الشروط والأحكام وسياسة الخصوصية للاستمرار.');
      return;
    }

    const trimmedName = fullName.trim();
    if (!trimmedName || trimmedName.length < 3) {
      setErrorMessage('يرجى إدخال الاسم الكامل (الثنائي أو الثلاثي) بشكل صحيح.');
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('يرجى إدخال بريد إلكتروني صالح (مثال: ahmed@example.com).');
      return;
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone || trimmedPhone.length < 8) {
      setErrorMessage('يرجى إدخال رقم هاتف صحيح للتواصل.');
      return;
    }

    const trimmedPassword = password.trim();
    if (!trimmedPassword || trimmedPassword.length < 6) {
      setErrorMessage('يرجى إدخال كلمة مرور مكونة من 6 خانات أو أحرف على الأقل لحماية حسابك.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create account via Supabase Auth without Base64 payload (prevents HTTP 413 body too large error)
      const result = await SupabaseClubService.signUpClubMember({
        email: trimmedEmail,
        password: trimmedPassword,
        fullName: trimmedName,
        phone: trimmedPhone,
        age: parseInt(age, 10) || 16,
        interest: interest,
        motivation: bio.trim(),
        avatar: '', // Intentionally omitted from Auth payload
        city: 'سوق أهراس، الجزائر',
      });

      if (!result.success) {
        setIsSubmitting(false);
        setErrorMessage(result.arabicMessage);
        if (result.errorCode === 'MISSING_SUPABASE_KEY') {
          setIsMissingKey(true);
        }
        return;
      }

      // 2. Separate upload to Supabase Storage if the user picked a custom photo
      let finalAvatarUrl = photoPreview;
      if (selectedPhotoFile && result.userId) {
        try {
          const uploadRes = await SupabaseClubService.uploadUserAvatar(result.userId, selectedPhotoFile);
          if (uploadRes.success && uploadRes.publicUrl) {
            finalAvatarUrl = uploadRes.publicUrl;
          } else if (uploadRes.error) {
            console.warn('[MembershipPage] Notice uploading avatar to storage:', uploadRes.error);
          }
        } catch (uploadErr) {
          console.warn('[MembershipPage] Avatar upload caught error:', uploadErr);
        }
      }

      // 3. Success with Supabase Auth!
      let memberNum = 'يظهر بعد تأكيد البريد';
      // The database trigger assigns the official number. Read it from the profile when a session is available.
      if (result.userId) {
        const { getSupabaseClient } = await import('../lib/supabase.ts');
        const client = getSupabaseClient();
        if (client) {
          const { data: profile } = await client
            .from('profiles')
            .select('membership_number')
            .eq('id', result.userId)
            .maybeSingle();
          if (profile?.membership_number) memberNum = profile.membership_number;
        }
      }
      setRegisteredMemberNumber(memberNum);
      setNeedsEmailConfirmation(Boolean(result.needsEmailConfirmation));

      const newMember: MemberData = {
        id: result.userId || `mem-${Date.now()}`,
        membershipNumber: memberNum,
        name: trimmedName,
        role: 'member',
        roleLabel: 'عضو جديد',
        age: parseInt(age, 10) || 16,
        phone: trimmedPhone,
        email: trimmedEmail,
        city: 'سوق أهراس، الجزائر',
        avatar: finalAvatarUrl,
        issueDate: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
        expiryDate: '2026/01/15',
        status: 'pending', // حالة طلب الانضمام معلّق للمراجعة
      };

      setIsSubmitting(false);
      setIsSubmitted(true);
      onRegistered(newMember);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(`حدث خطأ غير متوقع: ${err?.message || 'تعذر إتمام التسجيل'}`);
    }
  };


  return (
    <div
      dir={isLtr ? 'ltr' : 'rtl'}
      className="min-h-screen bg-[#040f1c] text-white selection:bg-orange-500 selection:text-white pb-24"
    >
      {/* 1. Hero Panorama & Breadcrumb Header Banner */}
      <div className="relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden border-b border-cyan-900/40">
        <img
          src="/assets/aistudio/_____________38f0e34a.png"
          alt="Panoramic Banner"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040f1c] via-[#040f1c]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040f1c]/80 via-transparent to-[#040f1c]/80" />

        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-amber-500/15 via-cyan-500/10 to-transparent blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-6">
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
            <span className="text-white font-bold">العضوية والأنضمام</span>
          </div>

          {/* Page Main Title Badge */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-orange-500/30 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#040f1d] rounded-[14px] flex items-center justify-center">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <span>العضوية والأنضمام</span>
              </h1>
              <p className="text-xs sm:text-sm text-cyan-200/80 mt-1 font-medium">
                كن جزءاً من مجتمعنا الإبداعي .. وانضم إلى نادي منبر الشاب المبدع
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid - 1:1 match to reference screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ------------------------------------------------------------- */}
          {/* COLUMN 1 (Right in RTL): استمارة التسجيل (Registration Form) */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-5 bg-[#06182c]/95 backdrop-blur-md border border-cyan-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-black text-white">تم إرسال طلب العضوية بنجاح!</h3>

                <div className="p-4 rounded-2xl bg-[#031122]/90 border border-amber-500/30 text-xs text-amber-200 text-right space-y-2.5 max-w-md mx-auto">
                  <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
                    <span className="text-slate-400 font-medium">حالة الطلب:</span>
                    <span className="font-bold text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40 text-[11px]">
                      معلّق قيد المراجعة
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
                    <span className="text-slate-400 font-medium">الحساب في Supabase Auth:</span>
                    <span className="font-mono text-cyan-300 font-bold">{email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">رقم العضوية المبدئي:</span>
                    <span className="font-mono text-amber-300 font-bold">{registeredMemberNumber || 'بانتظار إنشاء الحساب'}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-cyan-200/90 max-w-md mx-auto leading-relaxed">
                  {needsEmailConfirmation
                    ? 'تم تسجيل حسابك في نظام النادي. يرجى مراجعة بريدك الإلكتروني لتأكيد الحساب إن طُلب ذلك، وسيتم تفعيل بطاقتك فور اعتماد الإدارة للطلب.'
                    : 'تم تسجيل بيانات حسابك في نظام النادي بنجاح، وطلب الانضمام الآن قيد مراجعة واعتماد إدارة النادي.'}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={onOpenAccount}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs transition-all cursor-pointer shadow-lg shadow-orange-500/30"
                  >
                    الانتقال إلى لوحة حسابي
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setErrorMessage(null);
                    }}
                    className="py-3 px-5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-200 text-xs font-bold hover:bg-cyan-900 cursor-pointer"
                  >
                    تقديم طلب آخر
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form Header */}
                <div className="pb-3 border-b border-cyan-900/50">
                  <div className="flex items-center gap-2.5">
                    <UserPlus className="w-5 h-5 text-orange-400" />
                    <h2 className="text-lg sm:text-xl font-black text-white">استمارة التسجيل</h2>
                  </div>
                  <p className="text-xs text-cyan-200/80 mt-1">
                    يرجى تعبئة البيانات التالية بدقة، وسيتم تسجيل حسابك وإرسال طلبك إلى إدارة النادي لمراجعته واعتماده.
                  </p>
                </div>

                {/* Error Banner if any */}
                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3 animate-fadeIn">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1.5 text-right">
                      <p className="font-bold text-rose-300">تنبيه أثناء التسجيل:</p>
                      <p className="leading-relaxed text-slate-200">{errorMessage}</p>
                      {isMissingKey && onOpenSupabase && (
                        <button
                          type="button"
                          onClick={onOpenSupabase}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/90 hover:bg-cyan-800 text-cyan-200 border border-cyan-600/40 font-bold text-[11px] cursor-pointer transition-colors"
                        >
                          <Database className="w-3.5 h-3.5 text-cyan-400" />
                          <span>فتح إعدادات مفتاح Supabase</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Name & Age Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-cyan-200 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>الاسم الكامل *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك الكامل"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#040f1d] border border-cyan-800/70 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-cyan-200 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>العمر *</span>
                    </label>
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-[#040f1d] border border-cyan-800/70 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {Array.from({ length: 24 }, (_, i) => i + 12).map((a) => (
                        <option key={a} value={a}>
                          {a} سنة
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-cyan-200 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>رقم الهاتف *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="أدخل رقم هاتفك"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#040f1d] border border-cyan-800/70 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      dir="ltr"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-cyan-200 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>البريد الإلكتروني *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#040f1d] border border-cyan-800/70 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-bold text-cyan-200 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>كلمة المرور * (لحساب العضوية)</span>
                    </span>
                    <span className="text-[10px] text-cyan-400/80 font-normal">6 أحرف أو أرقام كحد أدنى</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="أدخل كلمة المرور الخاصة بحسابك"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#040f1d] border border-cyan-800/70 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono pl-10"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-white transition-colors"
                      title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Interests / Specialization */}
                <div>
                  <label className="block text-xs font-bold text-cyan-200 mb-1 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span>التخصصات / الاهتمامات</span>
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full bg-[#040f1d] border border-cyan-800/70 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="technological">تقنية وبرمجة وذكاء اصطناعي</option>
                    <option value="artistic">فنون تشكيلية وتصميم ومسرح</option>
                    <option value="volunteering">عمل تطوعي ومبادرات مجتمعية</option>
                    <option value="cultural">آداب وقراءة وخطابة وإلقاء</option>
                    <option value="media">إعلام وصحافة وصناعة محتوى</option>
                    <option value="scouting">أنشطة كشفية ومغامرة وهواء طلق</option>
                  </select>
                </div>

                {/* Personal Photo Dropzone */}
                <div>
                  <label className="block text-xs font-bold text-cyan-200 mb-1 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>الصورة الشخصية *</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-cyan-800/80 hover:border-amber-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-[#031122]/60 hover:bg-[#031122]"
                  >
                    <div className="flex flex-col items-center">
                      {photoPreview ? (
                        <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-orange-500 mb-2">
                          <img
                            src={photoPreview}
                            alt="preview"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-cyan-950 flex items-center justify-center text-cyan-400 mb-2">
                          <Upload className="w-6 h-6" />
                        </div>
                      )}
                      <p className="text-xs font-bold text-white">اضغط لرفع الصورة أو اسحبها هنا</p>
                      <p className="text-[10px] text-cyan-300/70 mt-0.5">
                        الصيغ المقبولة: JPG, PNG | الحد الأقصى للحجم: 2MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Short Bio / Motivation (الدافع للانضمام) */}
                <div>
                  <label className="block text-xs font-bold text-cyan-200 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>الدافع للانضمام ونبذة عنك (اختياري)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="اكتب نبذة قصيرة عن نفسك، مهاراتك، أو دوافعك ورغبتك في الانضمام للنادي."
                    className="w-full bg-[#040f1d] border border-cyan-800/70 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                  />
                </div>

                {/* Terms Agreement Checkbox */}
                <div
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer pt-1"
                >
                  <div className="text-orange-400 shrink-0">
                    {agreeTerms ? (
                      <CheckSquare className="w-4 h-4 fill-orange-500 text-white" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </div>
                  <span className="leading-snug select-none">
                    أوافق على{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTerms();
                      }}
                      className="text-cyan-400 underline hover:text-cyan-300"
                    >
                      الشروط والأحكام
                    </button>{' '}
                    و
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPrivacy();
                      }}
                      className="text-cyan-400 underline hover:text-cyan-300 ml-1"
                    >
                      سياسة الخصوصية
                    </button>{' '}
                    الخاصة بالنادي.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !agreeTerms}
                  className={`w-full py-3.5 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                    agreeTerms && !isSubmitting
                      ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:brightness-110 shadow-orange-500/30'
                      : 'bg-slate-700 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>{isSubmitting ? 'جاري إنشاء الحساب وإرسال الطلب...' : 'إرسال الطلب'}</span>
                </button>
              </form>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* COLUMN 2 (Left in RTL): شروط ومميزات العضوية & بانر معاً نصنع فرقاً */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Card 1: شروط الانضمام */}
            <div className="bg-[#06182c]/95 backdrop-blur-md border border-cyan-900/60 rounded-3xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-2.5 mb-1.5">
                <ClipboardList className="w-5 h-5 text-orange-400" />
                <h3 className="text-base sm:text-lg font-black text-white">شروط الانضمام</h3>
              </div>
              <p className="text-xs text-cyan-200/80 mb-4">
                للانضمام إلى نادي منبر الشاب المبدع، يرجى استيفاء الشروط التالية:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Condition 1 */}
                <div className="p-3.5 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    الاهتمام بالمجالات الإبداعية والتطويرية
                  </p>
                </div>

                {/* Condition 2 */}
                <div className="p-3.5 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-rose-400 mb-2 group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    الالتزام بقيم النادي وأهدافه
                  </p>
                </div>

                {/* Condition 3 */}
                <div className="p-3.5 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-105 transition-transform">
                    <User className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    أن يكون المتقدم من الفئة العمرية المستهدفة (12 - 25 سنة)
                  </p>
                </div>

                {/* Condition 4 */}
                <div className="p-3.5 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    تقديم طلب الانضمام عبر الموقع الإلكتروني
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: مميزات العضوية */}
            <div className="bg-[#06182c]/95 backdrop-blur-md border border-cyan-900/60 rounded-3xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Star className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-black text-white">مميزات العضوية</h3>
              </div>
              <p className="text-xs text-cyan-200/80 mb-4">
                بعد انضمامك إلى النادي ستحصل على العديد من المميزات:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {/* Benefit 1 */}
                <div className="p-3 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-2">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    المشاركة في الفعاليات والأنشطة
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="p-3 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    الحصول على دورات وورش عمل
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="p-3 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    التواصل مع خبراء ومختصين
                  </p>
                </div>

                {/* Benefit 4 */}
                <div className="p-3 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2">
                    <Award className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    فرص التطوع والمبادرات
                  </p>
                </div>

                {/* Benefit 5 */}
                <div className="p-3 rounded-2xl bg-[#031122]/80 border border-cyan-900/60 hover:border-amber-400/50 flex flex-col items-center text-center transition-all group col-span-2 sm:col-span-1">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
                    <Medal className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-200 leading-snug">
                    شهادات معتمدة عند المشاركة
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Banner "معاً .. نصنع فرقاً" */}
            <div className="relative rounded-3xl overflow-hidden border border-cyan-800/60 shadow-xl bg-gradient-to-r from-[#072444] via-[#051c35] to-[#0a2f58] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4 z-10">
                <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-orange-500 shadow-md shrink-0 flex items-center justify-center bg-white/10">
                  <img
                    src="/assets/aistudio/Youth_Creativity_Club_Emblem_41b52108.png"
                    alt="Emblem"
                    className="w-full h-full object-cover rounded-full filter drop-shadow"
                  />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-amber-300">
                    معاً .. نصنع فرقاً
                  </h4>
                  <p className="text-xs sm:text-sm text-cyan-100/90 mt-0.5">
                    انضم إلينا وكن جزءاً من رحلة الإبداع والتغيير
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenAccount}
                className="z-10 py-2.5 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md whitespace-nowrap"
              >
                <span>دخول بوابة العضوية</span>
                {isLtr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              </button>

              {/* Background ambient texture */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
