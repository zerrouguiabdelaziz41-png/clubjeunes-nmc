import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  X,
  Key,
  Users,
  Lock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  getSupabaseUrl,
  getSupabaseAnonKey,
  setLocalSupabaseAnonKey,
  testSupabaseConnection,
  ConnectionTestResult,
} from '../lib/supabase.ts';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState(getSupabaseUrl());
  const [anonKey, setAnonKey] = useState(getSupabaseAnonKey());
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<ConnectionTestResult | null>(null);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'env_guide' | 'roles'>('status');

  useEffect(() => {
    if (isOpen) {
      setUrl(getSupabaseUrl());
      setAnonKey(getSupabaseAnonKey());
      handleTest(getSupabaseAnonKey());
    }
  }, [isOpen]);

  const handleTest = async (keyToTest?: string) => {
    setTesting(true);
    try {
      const res = await testSupabaseConnection(keyToTest !== undefined ? keyToTest : anonKey);
      setResult(res);
    } catch (err: any) {
      setResult({
        success: false,
        code: 'NETWORK_ERROR',
        url: getSupabaseUrl(),
        message: 'حدث خطأ أثناء فحص الاتصال.',
        details: err?.message,
        hasEnvKey: false,
        hasLocalKey: false,
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSaveAndTest = (newKey: string) => {
    setAnonKey(newKey);
    setLocalSupabaseAnonKey(newKey);
    handleTest(newKey);
  };

  const copyEnvSnippet = () => {
    const text = `# Supabase Environment Configuration
VITE_SUPABASE_URL="${url}"
VITE_SUPABASE_ANON_KEY="${anonKey || 'YOUR_ANON_PUBLISHABLE_KEY_HERE'}"`;
    navigator.clipboard.writeText(text);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="relative w-full max-w-2xl bg-[#06182c] border border-cyan-700/60 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-[#041224] via-[#08223f] to-[#041224] border-b border-cyan-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>ربط قاعدة بيانات Supabase</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                  v2.0
                </span>
              </h2>
              <p className="text-xs text-cyan-200/80">
                إدارة الاتصال الآمن والمفاتيح العامة لنادي منبر الشاب المبدع
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-cyan-900/60 bg-[#04101e]/60 px-6 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'status'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>حالة الاتصال والاختبار</span>
          </button>

          <button
            onClick={() => setActiveTab('env_guide')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'env_guide'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>أين تضع المفاتيح؟ (دليل البيئة)</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'roles'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>أدوار النظام و RLS</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {activeTab === 'status' && (
            <>
              {/* Project Details Banner */}
              <div className="p-4 rounded-2xl bg-[#040f1d] border border-cyan-900/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">رابط المشروع (Project URL):</span>
                  <span className="font-mono text-emerald-400 font-bold dir-ltr select-all">
                    {url}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">المفتاح العام (Publishable Key):</span>
                  <span className="font-mono text-xs text-amber-300">
                    {anonKey
                      ? `${anonKey.substring(0, 14)}...${anonKey.substring(anonKey.length - 8)} (تم التعيين)`
                      : '⚠️ بانتظار الإدخال'}
                  </span>
                </div>
              </div>

              {/* Live Status Box */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  result?.success
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : result?.code === 'MISSING_KEY'
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result?.success ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  ) : result?.code === 'MISSING_KEY' ? (
                    <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">
                      {result?.message || 'جاري التحقق من الاتصال...'}
                    </h4>
                    {result?.details && (
                      <p className="text-xs opacity-90 leading-relaxed font-mono">
                        {result.details}
                      </p>
                    )}
                    {result?.latencyMs !== undefined && (
                      <div className="text-[11px] font-mono text-emerald-400 mt-1">
                        ⏱️ زمن الاستجابة: {result.latencyMs}ms
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Fast Test / Override Input */}
              <div className="p-4 rounded-2xl bg-[#030c18] border border-cyan-900/60 space-y-3">
                <label className="block text-xs font-bold text-cyan-200">
                  إدخال / تجربة مفتاح Publishable Key (يدعم sb_publishable_ و anon):
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="sb_publishable_... أو eyJhbGciOi..."
                    value={anonKey}
                    onChange={(e) => handleSaveAndTest(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#06182c] border border-cyan-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    dir="ltr"
                  />
                  <button
                    onClick={() => handleTest()}
                    disabled={testing}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shadow-md shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                    <span>{testing ? 'جارٍ الفحص...' : 'فحص الاتصال'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  💡 يمكنك لصق المفتاح العام هنا لاختباره فوراً (يدعم المفاتيح الحديثة <code className="text-emerald-300 font-mono">sb_publishable_</code> والمفاتيح الكلاسيكية)، أو وضعه في ملف <code className="text-cyan-300 font-mono">.env.local</code>.
                </p>
              </div>
            </>
          )}

          {activeTab === 'env_guide' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#040f1d] border border-cyan-900/60 space-y-2">
                <h3 className="text-xs font-black text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>أين تضع Project URL و Publishable Key؟</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تستخدم حزمة Vite البادئة <code className="text-amber-300 font-mono font-bold">VITE_</code> لتعريض المتغيرات الآمنة للواجهة الأمامية. يمكنك وضع المتغيرات في ملف <code className="text-cyan-300 font-mono font-bold">.env.local</code> أو <code className="text-cyan-300 font-mono font-bold">.env</code> في المجلد الرئيسي كما يلي:
                </p>
              </div>

              {/* Code snippet with copy button */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-900/80 bg-[#020b14]">
                <div className="flex items-center justify-between px-4 py-2 bg-[#041220] border-b border-cyan-900/60 text-xs text-slate-400 font-mono">
                  <span>/.env.local</span>
                  <button
                    onClick={copyEnvSnippet}
                    className="flex items-center gap-1 text-cyan-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEnv ? 'تم النسخ!' : 'نسخ الإعداد'}</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed" dir="ltr">
{`# 1. عنوان مشروعك في Supabase
VITE_SUPABASE_URL="${url}"

# 2. المفتاح العام (sb_publishable_ أو anon)
VITE_SUPABASE_ANON_KEY="sb_publishable_..."`}
                </pre>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
                <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold">قاعدة الأمان الصارمة:</span>
                  <p className="text-slate-300 leading-relaxed">
                    لا تضع أبداً مفتاح <code className="text-rose-400 font-mono">service_role</code> في الواجهة الأمامية أو في متغيرات <code className="text-amber-300 font-mono">VITE_</code>، بل استخدم فقط مفتاح <code className="text-emerald-400 font-mono">anon</code> (المفتاح العام المصرح به).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-[#040f1d] border border-cyan-900/60">
                <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>الحفاظ على الجداول وسياسات RLS</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تم ضبط الكود ليحترم جميع سياسات أمان صفوف البيانات (Row Level Security) والجداول الموجودة في حسابك دون أي حذف أو تعديل للسياسات الحالية.
                </p>
              </div>

              {/* Roles Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* 1. Member */}
                <div className="p-3.5 rounded-2xl bg-[#030e1c] border border-cyan-900/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-orange-400">
                    <span>👤</span>
                    <span>دور العضو (Member)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    عرض بطاقة العضوية، التسجيل في الأنشطة، تحديث الملف الشخصي، التحقق من العضوية عبر QR.
                  </p>
                </div>

                {/* 2. Organizer */}
                <div className="p-3.5 rounded-2xl bg-[#030e1c] border border-cyan-900/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <span>🧑‍🏫</span>
                    <span>مشرف النشاط (Organizer)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    إدارة المشاركين في الأنشطة المسندة، مراجعة طلبات التسجيل، إحصائيات النشاط.
                  </p>
                </div>

                {/* 3. Admin */}
                <div className="p-3.5 rounded-2xl bg-[#030e1c] border border-cyan-900/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                    <span>👑</span>
                    <span>مدير الموقع (Admin)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    لوحة التحكم الشاملة للنادي، إحصائيات الأعضاء الكلية، قبول وتعيين المشرفين.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#04101e] border-t border-cyan-900/60 flex items-center justify-between">
          <a
            href="https://supabase.com/dashboard/project/geniskumuwdedhckkexn/settings/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>لوحة مفاتيح API في Supabase ↗</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-900/60 hover:bg-cyan-800 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
