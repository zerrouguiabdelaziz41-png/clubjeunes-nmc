import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo.tsx';
import { User, UserPlus, Globe, Menu, X, Check, Award, ShieldCheck, Database } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';
import { getSupabaseAnonKey } from '../lib/supabase.ts';

export type { Language };

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇩🇿' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
];

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenJoin: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
  onOpenEvents: () => void;
  onOpenNews: () => void;
  onOpenActivities: () => void;
  onOpenAccount?: () => void;
  onOpenCard?: () => void;
  onOpenVerify?: () => void;
  onOpenSupabase?: () => void;
  currentLanguage?: Language;
  onSelectLanguage?: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenJoin,
  onOpenContact,
  onOpenAbout,
  onOpenEvents,
  onOpenNews,
  onOpenActivities,
  onOpenAccount,
  onOpenCard,
  onOpenVerify,
  onOpenSupabase,
  currentLanguage = 'ar',
  onSelectLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const hasAnonKey = Boolean(getSupabaseAnonKey());
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    if (langMenuOpen || userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen, userMenuOpen]);

  // Clean navigation links matching official screenshot (no membership or account in top bar)
  const navLinks = [
    { id: 'home', label: t.nav.home, action: () => onNavigate('home') },
    { id: 'about', label: t.nav.about, action: onOpenAbout },
    { id: 'activities', label: t.nav.activities, action: onOpenActivities },
    { id: 'news', label: t.nav.news, action: onOpenNews },
    { id: 'events', label: t.nav.events, action: onOpenEvents },
    { id: 'contact', label: t.nav.contact, action: onOpenContact },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    onNavigate(link.id);
    link.action();
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: Language) => {
    if (onSelectLanguage) {
      onSelectLanguage(lang);
    }
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#040f1d]/90 backdrop-blur-md border-b border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Desktop Navigation */}
          <div className="flex items-center gap-7 lg:gap-9">
            {/* Logo */}
            <div 
              onClick={() => onNavigate('home')} 
              className="cursor-pointer transition-transform hover:scale-[1.01] shrink-0"
            >
              <Logo size="md" language={currentLanguage} />
            </div>

            {/* Desktop Navigation Links directly adjacent to Logo */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link)}
                    className={`relative py-2.5 transition-colors cursor-pointer select-none text-[15px] font-bold ${
                      isActive
                        ? 'text-[#f97316]'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-[#f97316] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Circular Utility Action Icons (Exact Match to Reference Screenshot) */}
          <div className="flex items-center gap-3">
            
            {/* User Profile Dropdown: Membership, My Account, Card, Verification */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setLangMenuOpen(false);
                }}
                aria-label={t.nav.userTooltip}
                title={t.nav.userTooltip}
                aria-expanded={userMenuOpen}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 ${
                  userMenuOpen || activeTab === 'account' || activeTab === 'membership'
                    ? 'bg-[#133863] border border-orange-500/80 text-orange-400 shadow-orange-500/30'
                    : 'bg-[#0d2847]/70 hover:bg-[#133863] border border-cyan-800/40 text-slate-200 hover:text-white hover:shadow-cyan-500/20'
                }`}
              >
                <User className="w-[18px] h-[18px]" />
              </button>

              {/* User Dropdown Options Menu */}
              {userMenuOpen && (
                <div 
                  className={`absolute ${isLtr ? 'right-0' : 'left-0'} mt-3 w-72 bg-[#06192e] border border-cyan-700/50 rounded-2xl shadow-2xl overflow-hidden py-1.5 z-50 animate-fadeIn backdrop-blur-xl`}
                  style={{
                    boxShadow: '0 16px 36px -4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(6, 182, 212, 0.25)',
                  }}
                >
                  {/* Dropdown Header */}
                  <div className="px-3.5 py-2 border-b border-cyan-900/50 flex items-center justify-between text-xs font-bold text-cyan-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>
                        {currentLanguage === 'ar'
                          ? 'بوابة العضوية والحساب'
                          : currentLanguage === 'fr'
                          ? 'Espace Adhérent'
                          : 'Membership Portal'}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-[#f97316] border border-orange-500/30">
                      {currentLanguage === 'ar' ? 'منبر الشباب' : 'Menbar'}
                    </span>
                  </div>

                  {/* Menu Options */}
                  <div className="p-1.5 space-y-1">
                    {/* 1. العضوية والأنضمام */}
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenJoin();
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                        activeTab === 'membership'
                          ? 'bg-orange-500/20 text-orange-400 font-bold border border-orange-500/40'
                          : 'text-slate-200 hover:bg-cyan-900/40 hover:text-white'
                      } ${isLtr ? 'text-left' : 'text-right'}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-300 shrink-0">
                        <UserPlus className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold leading-tight">
                          {currentLanguage === 'ar'
                            ? 'العضوية والأنضمام'
                            : currentLanguage === 'fr'
                            ? 'Adhésion & Inscription'
                            : 'Membership & Join'}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {currentLanguage === 'ar'
                            ? 'استمارة الانضمام والشروط والمميزات'
                            : currentLanguage === 'fr'
                            ? 'Formulaire d\'inscription et conditions'
                            : 'Registration form and benefits'}
                        </div>
                      </div>
                    </button>

                    {/* 2. حسابي (لوحة تحكم الأعضاء والمشرفين والمدير) */}
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        if (onOpenAccount) onOpenAccount();
                        else onNavigate('account');
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                        activeTab === 'account'
                          ? 'bg-orange-500/20 text-orange-400 font-bold border border-orange-500/40'
                          : 'text-slate-200 hover:bg-cyan-900/40 hover:text-white'
                      } ${isLtr ? 'text-left' : 'text-right'}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-300 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold leading-tight">
                          {currentLanguage === 'ar'
                            ? 'حسابي'
                            : currentLanguage === 'fr'
                            ? 'Mon Compte'
                            : 'My Account'}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {currentLanguage === 'ar'
                            ? 'لوحة تحكم العضو والمشرف والمدير'
                            : currentLanguage === 'fr'
                            ? 'Tableau de bord membre et modérateur'
                            : 'Dashboard (Member, Organizer, Admin)'}
                        </div>
                      </div>
                    </button>

                    {/* 3. بطاقة العضوية الرقمية */}
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        if (onOpenCard) onOpenCard();
                        else if (onOpenAccount) onOpenAccount();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:bg-cyan-900/40 hover:text-white transition-all cursor-pointer text-right"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-amber-400 shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold leading-tight">
                          {currentLanguage === 'ar'
                            ? 'بطاقة العضوية الرقمية'
                            : currentLanguage === 'fr'
                            ? 'Carte d\'adhérent digitale'
                            : 'Digital Membership Card'}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {currentLanguage === 'ar'
                            ? 'عرض البطاقة الرسمية ورمز QR'
                            : currentLanguage === 'fr'
                            ? 'Voir la carte officielle et QR'
                            : 'View official card and QR'}
                        </div>
                      </div>
                    </button>

                    {/* 4. التحقق من صحة العضوية */}
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        if (onOpenVerify) onOpenVerify();
                        else onNavigate('verification');
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                        activeTab === 'verification'
                          ? 'bg-orange-500/20 text-orange-400 font-bold border border-orange-500/40'
                          : 'text-slate-200 hover:bg-cyan-900/40 hover:text-white'
                      } ${isLtr ? 'text-left' : 'text-right'}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-emerald-400 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold leading-tight">
                          {currentLanguage === 'ar'
                            ? 'التحقق من صحة العضوية'
                            : currentLanguage === 'fr'
                            ? 'Vérification de validité QR'
                            : 'QR Membership Verification'}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {currentLanguage === 'ar'
                            ? 'فحص السجلات الرسمية والاعتماد'
                            : currentLanguage === 'fr'
                            ? 'Validation officielle des registres'
                            : 'Official records verification'}
                        </div>
                      </div>
                    </button>

                    {/* 5. قاعدة بيانات Supabase */}
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        if (onOpenSupabase) onOpenSupabase();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-200 hover:bg-cyan-900/40 hover:text-white transition-all cursor-pointer text-right"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                          <span>
                            {currentLanguage === 'ar'
                              ? 'قاعدة بيانات Supabase'
                              : currentLanguage === 'fr'
                              ? 'Base de données Supabase'
                              : 'Supabase Database'}
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              hasAnonKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                            }`}
                          />
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {currentLanguage === 'ar'
                            ? 'فحص الاتصال وإدارة المفاتيح'
                            : currentLanguage === 'fr'
                            ? 'Test de connexion et clés'
                            : 'Connection test & settings'}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Supabase Database Connection Button */}
            {onOpenSupabase && (
              <button
                onClick={onOpenSupabase}
                aria-label="قاعدة بيانات Supabase"
                title="قاعدة بيانات Supabase – فحص الاتصال والمفاتيح"
                className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 bg-[#0d2847]/70 hover:bg-[#133863] border border-cyan-800/40 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/50"
              >
                <Database className="w-[18px] h-[18px]" />
                <span
                  className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full border border-[#040f1d] ${
                    hasAnonKey ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                  }`}
                />
              </button>
            )}

            {/* Language Switcher circular button (Matches reference UI exactly) */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label={t.nav.langTooltip}
                title={t.nav.langTooltip}
                aria-expanded={langMenuOpen}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 ${
                  langMenuOpen
                    ? 'bg-[#133863] border border-orange-500/80 text-orange-400 shadow-orange-500/30'
                    : 'bg-[#0d2847]/70 hover:bg-[#133863] border border-cyan-800/40 text-slate-200 hover:text-white hover:shadow-cyan-500/20'
                }`}
              >
                <Globe className="w-[18px] h-[18px]" />
              </button>

              {/* 3-Language Dropdown Menu: Arabic, French, English */}
              {langMenuOpen && (
                <div 
                  className={`absolute ${isLtr ? 'right-0' : 'left-0'} mt-3 w-48 bg-[#06192e] border border-cyan-700/50 rounded-2xl shadow-2xl overflow-hidden py-1.5 z-50 animate-fadeIn backdrop-blur-xl`}
                  style={{
                    boxShadow: '0 16px 36px -4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(6, 182, 212, 0.2)',
                  }}
                >
                  <div className="px-3.5 py-1.5 border-b border-cyan-900/50 text-[11px] font-bold text-cyan-300/80 uppercase tracking-wider flex items-center justify-between">
                    <span>{t.nav.langTooltip}</span>
                    <span className="text-[10px] text-orange-400 uppercase font-mono">{currentLanguage}</span>
                  </div>

                  <div className="py-1">
                    {LANGUAGES.map((lang) => {
                      const isSelected = currentLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium transition-colors cursor-pointer ${isLtr ? 'text-left' : 'text-right'} ${
                            isSelected
                              ? 'bg-orange-500/15 text-orange-400 font-bold border-r-2 border-orange-500'
                              : 'text-slate-200 hover:bg-cyan-900/30 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{lang.flag}</span>
                            <span className="text-[13px]">{lang.nativeName}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                              {lang.code}
                            </span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#f97316] stroke-[2.5]" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-[#0d2847]/70 border border-cyan-800/40 text-slate-200"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-5 pt-2 border-t border-cyan-900/40 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isLtr ? 'text-left' : 'text-right'} ${
                      isActive
                        ? 'bg-orange-500/20 text-[#f97316] font-bold border-r-4 border-orange-500'
                        : 'text-slate-200 hover:bg-cyan-900/30'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Membership Portal Section */}
            <div className="mt-3 pt-3 border-t border-cyan-900/40 flex flex-col gap-1.5">
              <div className={`px-4 text-[11px] font-bold uppercase text-cyan-300/70 ${isLtr ? 'text-left' : 'text-right'}`}>
                {currentLanguage === 'ar' ? 'بوابة العضوية والحساب' : 'Membership Portal'}
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoin();
                }}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-cyan-900/30 ${isLtr ? 'text-left' : 'text-right'}`}
              >
                <UserPlus className="w-4 h-4 text-cyan-400" />
                <span>{currentLanguage === 'ar' ? 'العضوية والأنضمام' : currentLanguage === 'fr' ? 'Adhésion' : 'Membership & Join'}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAccount) onOpenAccount();
                  else onNavigate('account');
                }}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-cyan-900/30 ${isLtr ? 'text-left' : 'text-right'}`}
              >
                <User className="w-4 h-4 text-[#f97316]" />
                <span>{currentLanguage === 'ar' ? 'حسابي' : currentLanguage === 'fr' ? 'Mon Compte' : 'My Account'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
