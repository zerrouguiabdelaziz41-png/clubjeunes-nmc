import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ActivitiesSection } from './components/ActivitiesSection.tsx';
import { JoinCard } from './components/JoinCard.tsx';
import { NewsCard } from './components/NewsCard.tsx';
import { EventsCard } from './components/EventsCard.tsx';
import { Footer } from './components/Footer.tsx';
import {
  JoinModal,
  EventModal,
  ActivityModal,
  NewsModal,
  VideoModal,
  AboutModal,
  ContactModal,
  LegalModal,
} from './components/Modals.tsx';
import { ActivityItem, EventItem, NewsItem, FEATURED_EVENT, NEWS, ACTIVITIES } from './data/clubData.ts';
import { ContactPage } from './components/ContactPage.tsx';
import { EventsPage } from './components/EventsPage.tsx';
import { NewsPage } from './components/NewsPage.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { MembershipPage } from './components/MembershipPage.tsx';
import { AccountPage } from './components/AccountPage.tsx';
import { VerificationPage } from './components/VerificationPage.tsx';
import { MembershipCardModal, MemberData, DEFAULT_MEMBER } from './components/MembershipCardModal.tsx';
import { SupabaseModal } from './components/SupabaseModal.tsx';
import { Image as ImageIcon, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from './data/translations.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ar');

  // Member & Digital Card state
  const [currentMember, setCurrentMember] = useState<MemberData>(DEFAULT_MEMBER);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);

  // Modals state
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);

  // Original design comparison overlay preview
  const [showOriginalComparison, setShowOriginalComparison] = useState(false);
  const [comparisonTarget, setComparisonTarget] = useState<
    'about' | 'events' | 'news' | 'contact' | 'home' | 'membership' | 'account' | 'card' | 'verification'
  >('membership');

  // Smooth scroll to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLtr = currentLanguage !== 'ar';

  return (
    <div
      dir={isLtr ? 'ltr' : 'rtl'}
      className="min-h-screen font-['Cairo',sans-serif] selection:bg-orange-500 selection:text-white transition-colors duration-300 bg-[#040f1c] text-white"
    >
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        onNavigate={(tab) => {
          if (tab === 'about') {
            setActiveTab('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'contact') {
            setActiveTab('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'events') {
            setActiveTab('events');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'news') {
            setActiveTab('news');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'membership') {
            setActiveTab('membership');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'account') {
            setActiveTab('account');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'verification') {
            setActiveTab('verification');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'home') {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (activeTab !== 'home') {
            setActiveTab('home');
            setTimeout(() => {
              if (tab === 'activities') scrollToSection('activities-section');
            }, 50);
          } else {
            setActiveTab(tab);
            if (tab === 'activities') {
              scrollToSection('activities-section');
            }
          }
        }}
        onOpenJoin={() => {
          setActiveTab('membership');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAccount={() => {
          setActiveTab('account');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCard={() => {
          setIsCardModalOpen(true);
        }}
        onOpenVerify={() => {
          setActiveTab('verification');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupabase={() => {
          setIsSupabaseOpen(true);
        }}
        onOpenContact={() => {
          setActiveTab('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => {
          setActiveTab('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenEvents={() => {
          setActiveTab('events');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenNews={() => {
          setActiveTab('news');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenActivities={() => {
          if (activeTab !== 'home') {
            setActiveTab('home');
            setTimeout(() => scrollToSection('activities-section'), 50);
          } else {
            scrollToSection('activities-section');
          }
        }}
      />

      {/* Main Page Content */}
      <main className="w-full">
        {activeTab === 'about' ? (
          <AboutPage
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={currentLanguage}
            onOpenJoin={() => setIsJoinOpen(true)}
            onOpenVideo={() => setIsVideoOpen(true)}
            onOpenContact={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenEvents={() => {
              setActiveTab('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeTab === 'contact' ? (
          <ContactPage
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={currentLanguage}
            onOpenJoin={() => setIsJoinOpen(true)}
          />
        ) : activeTab === 'events' ? (
          <EventsPage
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={currentLanguage}
            onOpenJoin={() => setIsJoinOpen(true)}
          />
        ) : activeTab === 'news' ? (
          <NewsPage
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={currentLanguage}
            onOpenJoin={() => {
              setActiveTab('membership');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeTab === 'membership' ? (
          <MembershipPage
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRegistered={(newMember) => {
              setCurrentMember(newMember);
              setActiveTab('account');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAccount={() => {
              setActiveTab('account');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPrivacy={() => setLegalType('privacy')}
            onOpenTerms={() => setLegalType('terms')}
            onOpenSupabase={() => setIsSupabaseOpen(true)}
            language={currentLanguage}
          />
        ) : activeTab === 'account' ? (
          <AccountPage
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCardModal={(m) => {
              setCurrentMember(m);
              setIsCardModalOpen(true);
            }}
            onOpenVerify={(m) => {
              setCurrentMember(m);
              setActiveTab('verification');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            initialMember={currentMember}
            language={currentLanguage}
            onOpenSupabase={() => setIsSupabaseOpen(true)}
          />
        ) : activeTab === 'verification' ? (
          <VerificationPage
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToAccount={() => {
              setActiveTab('account');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            member={currentMember}
            language={currentLanguage}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <section id="home-hero">
              <Hero
                onDiscoverActivities={() => scrollToSection('activities-section')}
                onWatchVideo={() => setIsVideoOpen(true)}
                onOpenJoin={() => {
                  setActiveTab('membership');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                language={currentLanguage}
              />
            </section>

            {/* 2. Activities Container */}
            <div id="activities-section">
              <ActivitiesSection
                onSelectActivity={(activity) => setSelectedActivity(activity)}
                language={currentLanguage}
              />
            </div>

            {/* 3. Bottom 3-Card Section */}
            <section
              id="cards-section"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {/* Card 1: Join / Community CTA */}
                <div className={isLtr ? 'order-3' : 'order-1'}>
                  <JoinCard
                    onOpenJoin={() => {
                      setActiveTab('membership');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    language={currentLanguage}
                  />
                </div>

                {/* Card 2: Latest News */}
                <div className="order-2">
                  <NewsCard
                    onSelectNews={() => {
                      setActiveTab('news');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onViewAllNews={() => {
                      setActiveTab('news');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    language={currentLanguage}
                  />
                </div>

                {/* Card 3: Upcoming Events */}
                <div className={isLtr ? 'order-1' : 'order-3'}>
                  <EventsCard
                    onRegisterEvent={() => {
                      setActiveTab('events');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onViewAllEvents={() => {
                      setActiveTab('events');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    language={currentLanguage}
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalType('privacy')}
        onOpenTerms={() => setLegalType('terms')}
        language={currentLanguage}
      />

      {/* Floating Design Comparison Tool */}
      <div className={`fixed bottom-4 ${isLtr ? 'right-4' : 'left-4'} z-40`}>
        <button
          onClick={() => setShowOriginalComparison(!showOriginalComparison)}
          className="flex items-center gap-2 bg-[#09223e]/90 hover:bg-[#0f345e] border border-cyan-500/40 text-cyan-200 hover:text-white px-3.5 py-2 rounded-full shadow-lg backdrop-blur-md text-xs font-bold transition-all cursor-pointer hover:scale-105"
          title={
            currentLanguage === 'ar'
              ? 'معاينة الصورة الأصلية والتطابق'
              : currentLanguage === 'fr'
              ? 'Comparer avec le design original'
              : 'Compare with original design'
          }
        >
          <ImageIcon className="w-4 h-4 text-[#f97316]" />
          <span>
            {currentLanguage === 'ar'
              ? 'مقارنة مع التصميم الأصلي'
              : currentLanguage === 'fr'
              ? 'Design Original'
              : 'Original Design'}
          </span>
        </button>
      </div>

      {/* Original Screenshot Comparison Modal */}
      {showOriginalComparison && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-5xl w-full bg-[#041427] border border-cyan-500/50 rounded-2xl p-4 overflow-hidden shadow-2xl">
            <div className="flex flex-wrap justify-between items-center pb-3 mb-3 border-b border-cyan-900/40 gap-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <div className="flex items-center gap-2 bg-[#020b16] p-1 rounded-xl border border-cyan-800/40">
                  <button
                    onClick={() => setComparisonTarget('about')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'about'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'تصميم عن النادي'
                      : currentLanguage === 'fr'
                      ? 'Design À Propos'
                      : 'About Design'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('membership')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'membership'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'العضوية والأنضمام'
                      : currentLanguage === 'fr'
                      ? 'Adhésion'
                      : 'Membership'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('account')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'account'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'حسابي'
                      : currentLanguage === 'fr'
                      ? 'Mon Compte'
                      : 'My Account'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('card')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'card'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'بطاقة العضوية'
                      : currentLanguage === 'fr'
                      ? 'Carte Adhérent'
                      : 'Membership Card'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('verification')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'verification'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'التحقق QR'
                      : currentLanguage === 'fr'
                      ? 'Vérification QR'
                      : 'QR Verification'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('about')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'about'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'عن النادي'
                      : currentLanguage === 'fr'
                      ? 'À Propos'
                      : 'About'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('events')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'events'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'الفعاليات'
                      : currentLanguage === 'fr'
                      ? 'Événements'
                      : 'Events'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('news')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'news'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'الأخبار'
                      : currentLanguage === 'fr'
                      ? 'Actualités'
                      : 'News'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('contact')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'contact'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'تواصل معنا'
                      : currentLanguage === 'fr'
                      ? 'Contact'
                      : 'Contact'}
                  </button>
                  <button
                    onClick={() => setComparisonTarget('home')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      comparisonTarget === 'home'
                        ? 'bg-[#f97316] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {currentLanguage === 'ar'
                      ? 'الرئيسية'
                      : currentLanguage === 'fr'
                      ? 'Accueil'
                      : 'Home'}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowOriginalComparison(false)}
                className="px-3 py-1 rounded-lg bg-cyan-900/40 text-cyan-200 text-xs hover:bg-cyan-800 cursor-pointer"
              >
                {currentLanguage === 'ar' ? 'إغلاق' : currentLanguage === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded-xl border border-cyan-800/40 bg-black/40 p-1">
              <img
                src={
                  comparisonTarget === 'membership'
                    ? '/assets/aistudio/__________________54f1de4a.png'
                    : comparisonTarget === 'account'
                    ? '/assets/aistudio/______c00c13ac.png'
                    : comparisonTarget === 'card'
                    ? '/assets/aistudio/______________2f52be7d.png'
                    : comparisonTarget === 'verification'
                    ? '/assets/aistudio/_________________1fd88ed8.png'
                    : comparisonTarget === 'about'
                    ? '/assets/aistudio/__________ef4da63a.png'
                    : comparisonTarget === 'events'
                    ? '/assets/aistudio/________________________________636ae388.png'
                    : comparisonTarget === 'news'
                    ? '/assets/aistudio/_____________38f0e34a.png'
                    : comparisonTarget === 'contact'
                    ? '/assets/aistudio/____________________________________7b8a7fee.png'
                    : '/assets/aistudio/________________31643738.png'
                }
                alt="Design reference"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        language={currentLanguage}
      />

      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        language={currentLanguage}
      />

      <ActivityModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onOpenJoin={() => setIsJoinOpen(true)}
        language={currentLanguage}
      />

      <NewsModal
        news={selectedNews}
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        language={currentLanguage}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        language={currentLanguage}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenJoin={() => setIsJoinOpen(true)}
        language={currentLanguage}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language={currentLanguage}
      />

      <LegalModal
        type={legalType}
        isOpen={!!legalType}
        onClose={() => setLegalType(null)}
        language={currentLanguage}
      />

      {/* Digital Membership Card Modal */}
      <MembershipCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        member={currentMember}
        language={currentLanguage}
        onVerify={() => {
          setIsCardModalOpen(false);
          setActiveTab('verification');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Supabase Connection & Settings Modal */}
      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
      />
    </div>
  );
}
