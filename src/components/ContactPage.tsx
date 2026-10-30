import React, { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  HelpCircle,
  FileText,
  Paperclip,
  UploadCloud,
  CheckCircle2,
  Share2,
  Map as MapIcon,
  Compass,
  Plus,
  Minus,
  ExternalLink,
  X as CloseIcon,
  Home,
  ChevronRight,
  ChevronLeft,
  Building2,
  TreePine,
  Sparkles,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations.ts';

// SVG icons for social media matching reference
const YouTubeIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const XTwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.201.301-.778.98-.954 1.181-.176.2-.352.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.352.452-.528.15-.176.2-.301.301-.502.101-.201.05-.377-.025-.528-.075-.15-.678-1.634-.929-2.237-.245-.588-.494-.508-.678-.518-.176-.009-.377-.011-.578-.011-.201 0-.528.075-.804.377-.276.301-1.055 1.03-1.055 2.512 0 1.482 1.08 2.914 1.23 3.115.15.201 2.125 3.245 5.148 4.552.719.311 1.28.497 1.718.636.723.23 1.381.198 1.901.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.306.176-1.431-.075-.125-.276-.201-.577-.351zM12.042 21.674c-1.748 0-3.46-.46-4.968-1.332l-.356-.211-3.693.968.985-3.601-.231-.368A9.61 9.61 0 0 1 2.4 12.042c0-5.316 4.326-9.642 9.642-9.642 2.576 0 4.998 1.004 6.819 2.825a9.588 9.588 0 0 1 2.825 6.817c0 5.317-4.326 9.632-9.644 9.632zm7.982-17.625A11.237 11.237 0 0 0 12.042.8C5.836.8.784 5.852.784 12.058c0 1.98.516 3.916 1.498 5.621L0 24l6.504-2.235a11.21 11.21 0 0 0 5.538 1.442h.005c6.205 0 11.256-5.052 11.256-11.258a11.2 11.2 0 0 0-3.279-7.908z" />
  </svg>
);

const HeadsetIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h3c.55 0 1-.45 1-1v-2.08A3.001 3.001 0 0 0 21 13V10a9 9 0 0 0-9-9zM7 14v4H6c-.55 0-1-.45-1-1v-3h2zm12 3c0 .55-.45 1-1 1h-1v-4h2v3z"/>
  </svg>
);

interface ContactPageProps {
  onBackToHome: () => void;
  language?: Language;
  onOpenJoin?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  language = 'ar',
  onOpenJoin,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.ar;
  const isLtr = t.direction === 'ltr';

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapHighlighted, setMapHighlighted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Localization dictionary for the contact page
  const pageTexts = {
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbContact: 'تواصل معنا',
      heroTitle: 'تواصل معنا',
      heroSubtitle:
        'نحن دائماً على تواصل معكم .. للاستفسارات، الاستشارات، أو لمزيد من المعلومات حول النادي.',
      infoTitle: 'معلومات التواصل',
      infoSubtitle: 'يمكنكم التواصل معنا عبر الوسائل التالية',
      phoneTitle: 'رقم الهاتف',
      phoneValue: '+213 697 92 15 51',
      phoneHours: 'من الأحد إلى الخميس - من 9:00 ص إلى 5:00 م',
      emailTitle: 'البريد الإلكتروني',
      emailValue: 'club.jeunes41@gmail.com',
      emailNote: 'نرد على جميع الرسائل خلال 24 ساعة',
      addressTitle: 'العنوان',
      addressMain: 'مقر نادي منبر الشاب المبدع',
      addressSub: 'دار الشباب حفصي عبد الرزاق - سوق أهراس',
      viewOnMap: 'عرض على الخريطة',
      socialTitle: 'تابعونا على مواقع التواصل الاجتماعي',
      socialFb: 'فيسبوك',
      socialYt: 'يوتيوب',
      socialIg: 'إنستغرام',
      socialX: 'إكس',
      socialWa: 'واتساب',
      formTitle: 'أرسل لنا رسالة',
      formSubtitle: 'يسعدنا تواصلكم معنا؛ اكتب رسالتك وسنقوم بالرد في أقرب وقت',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'أدخل اسمك الكامل',
      emailLabel: 'البريد الإلكتروني *',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      phoneLabel: 'رقم الجوال *',
      phonePlaceholder: 'أدخل رقم الجوال',
      inquiryLabel: 'نوع الاستفسار *',
      inquiryPlaceholder: 'اختر نوع الاستفسار',
      inquiries: [
        'استفسار عام',
        'طلب انضمام وعضوية',
        'اقتراح نشاط أو ورشة عمل',
        'شراكة أو رعاية مجتمعية',
        'استفسار حول الفعاليات والمخيمات',
        'أخرى',
      ],
      messageLabel: 'الرسالة *',
      messagePlaceholder: 'اكتب رسالتك هنا...',
      fileLabel: 'إرفاق ملف (اختياري)',
      fileDesc:
        'يمكنك إرفاق أي ملف يدعم رسالتك (صورة، مستند، إلخ) - الحد الأقصى للحجم: 5MB',
      sendBtn: 'إرسال الرسالة',
      sendingBtn: 'جاري الإرسال...',
      successTitle: 'تم إرسال رسالتك بنجاح!',
      successDesc:
        'شكراً لتواصلك مع نادي منبر الشاب المبدع. سيقوم فريقنا بمراجعة رسالتك والتواصل معك في أقرب وقت.',
      sendAnother: 'إرسال رسالة أخرى',
      mapHQ: 'مقر النادي',
      mapRoad1: 'طريق النشاطات',
      mapRoad2: 'شارع الاستقلال',
      mapPark: 'الحديقة العامة',
      mapCenter: 'دار الشباب والمحيط الثقافي',
      openGoogleMaps: 'فتح الموقع في خرائط Google',
      hqBuildingTitle: 'مقر نادي منبر الشاب المبدع',
      hqBuildingSubtitle: 'سوق أهراس - دار الشباب حفصي عبد الرزاق',
    },
    fr: {
      breadcrumbHome: 'Accueil',
      breadcrumbContact: 'Contactez-nous',
      heroTitle: 'Contactez-nous',
      heroSubtitle:
        'Nous sommes toujours à votre écoute pour vos demandes, conseils ou pour plus d’informations sur le club.',
      infoTitle: 'Coordonnées de Contact',
      infoSubtitle: 'Vous pouvez nous joindre via les moyens suivants',
      phoneTitle: 'Numéro de Téléphone',
      phoneValue: '+213 697 92 15 51',
      phoneHours: 'Du dimanche au jeudi - de 09:00 à 17:00',
      emailTitle: 'Adresse E-mail',
      emailValue: 'club.jeunes41@gmail.com',
      emailNote: 'Nous répondons à tous les messages dans les 24 heures',
      addressTitle: 'Adresse',
      addressMain: 'Siège du Club Menbar Jeune Créatif',
      addressSub: 'Maison de Jeunes Hafsi Abdelrazak - Souk Ahras',
      viewOnMap: 'Afficher sur la carte',
      socialTitle: 'Suivez-nous sur les réseaux sociaux',
      socialFb: 'Facebook',
      socialYt: 'YouTube',
      socialIg: 'Instagram',
      socialX: 'X (Twitter)',
      socialWa: 'WhatsApp',
      formTitle: 'Envoyez-nous un Message',
      formSubtitle:
        'Votre message nous intéresse ; écrivez-nous et nous vous répondrons rapidement',
      nameLabel: 'Nom complet *',
      namePlaceholder: 'Entrez votre nom complet',
      emailLabel: 'Adresse E-mail *',
      emailPlaceholder: 'Entrez votre adresse e-mail',
      phoneLabel: 'Numéro de mobile *',
      phonePlaceholder: 'Entrez votre numéro de mobile',
      inquiryLabel: 'Type de demande *',
      inquiryPlaceholder: 'Choisissez le type de demande',
      inquiries: [
        'Renseignement général',
        'Adhésion et inscription',
        'Proposition d’activité ou atelier',
        'Partenariat ou sponsoring',
        'Question sur les événements et camps',
        'Autre demande',
      ],
      messageLabel: 'Message *',
      messagePlaceholder: 'Écrivez votre message ici...',
      fileLabel: 'Joindre un fichier (optionnel)',
      fileDesc:
        'Vous pouvez joindre un fichier (image, document, etc.) - Taille max : 5 Mo',
      sendBtn: 'Envoyer le Message',
      sendingBtn: 'Envoi en cours...',
      successTitle: 'Message envoyé avec succès !',
      successDesc:
        'Merci d’avoir contacté le Club Menbar Jeune Créatif. Notre équipe vous répondra très rapidement.',
      sendAnother: 'Envoyer un autre message',
      mapHQ: 'Siège du Club',
      mapRoad1: 'Route des Activités',
      mapRoad2: 'Avenue de l’Indépendance',
      mapPark: 'Jardin Public',
      mapCenter: 'Maison de Jeunes & Centre Culturel',
      openGoogleMaps: 'Ouvrir dans Google Maps',
      hqBuildingTitle: 'Siège du Club Menbar Jeune Créatif',
      hqBuildingSubtitle: 'Souk Ahras - Maison de Jeunes Hafsi Abdelrazak',
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbContact: 'Contact Us',
      heroTitle: 'Contact Us',
      heroSubtitle:
        'We are always in touch with you .. for inquiries, consultations, or more information about the club.',
      infoTitle: 'Contact Information',
      infoSubtitle: 'You can reach us through the following channels',
      phoneTitle: 'Phone Number',
      phoneValue: '+213 697 92 15 51',
      phoneHours: 'Sunday to Thursday - from 9:00 AM to 5:00 PM',
      emailTitle: 'Email Address',
      emailValue: 'club.jeunes41@gmail.com',
      emailNote: 'We reply to all inquiries within 24 hours',
      addressTitle: 'Address',
      addressMain: 'Menbar Creative Youth Club Headquarters',
      addressSub: 'Hafsi Abdelrazak Youth Center - Souk Ahras',
      viewOnMap: 'View on Map',
      socialTitle: 'Follow Us on Social Media',
      socialFb: 'Facebook',
      socialYt: 'YouTube',
      socialIg: 'Instagram',
      socialX: 'X',
      socialWa: 'WhatsApp',
      formTitle: 'Send Us a Message',
      formSubtitle:
        'We are glad to connect with you; write your message and we will respond promptly',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'Enter your email address',
      phoneLabel: 'Mobile Number *',
      phonePlaceholder: 'Enter your mobile number',
      inquiryLabel: 'Inquiry Type *',
      inquiryPlaceholder: 'Select inquiry type',
      inquiries: [
        'General Inquiry',
        'Membership & Joining Request',
        'Suggest Activity or Workshop',
        'Partnership or Sponsorship',
        'Events & Camps Information',
        'Other Inquiry',
      ],
      messageLabel: 'Message *',
      messagePlaceholder: 'Write your message here...',
      fileLabel: 'Attach File (Optional)',
      fileDesc:
        'You can attach any supporting file (image, document, etc.) - Max size: 5MB',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      successTitle: 'Your message has been sent successfully!',
      successDesc:
        'Thank you for contacting Menbar Creative Youth Club. Our team will review your message and reach out shortly.',
      sendAnother: 'Send another message',
      mapHQ: 'Club HQ',
      mapRoad1: 'Activities Boulevard',
      mapRoad2: 'Independence Avenue',
      mapPark: 'Public Park',
      mapCenter: 'Youth Cultural Center',
      openGoogleMaps: 'Open in Google Maps',
      hqBuildingTitle: 'Menbar Creative Youth Club Headquarters',
      hqBuildingSubtitle: 'Souk Ahras - Hafsi Abdelrazak Youth Center',
    },
  };

  const texts = pageTexts[language] || pageTexts.ar;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert(
          language === 'ar'
            ? 'حجم الملف يتجاوز الحد الأقصى 5MB'
            : 'File exceeds maximum 5MB limit'
        );
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      alert(
        language === 'ar'
          ? 'يرجى ملء الحقول المطلوبة (الاسم، البريد، والرسالة)'
          : 'Please complete all required fields'
      );
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setInquiryType('');
    setMessage('');
    setSelectedFile(null);
    setIsSubmitted(false);
  };

  const handleFocusMap = () => {
    setMapHighlighted(true);
    mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => setMapHighlighted(false), 2500);
  };

  return (
    <div className="w-full relative pb-20">
      {/* 1. Atmospheric Header with Sunrise Panorama & Breadcrumbs */}
      <div className="relative w-full overflow-hidden border-b border-cyan-900/30 bg-[#04101e]">
        {/* Background panoramic image with darkening gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/________________31643738.png"
            alt="Scenic Sunrise Youth"
            className="w-full h-full object-cover object-top opacity-20 filter saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040f1c]/90 via-[#040f1c]/80 to-[#040f1c]" />
          <div className="absolute inset-0 bg-radial from-orange-500/10 via-cyan-950/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pb-14">
          {/* Breadcrumb Row */}
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200/80 mb-6">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            >
              <Home className="w-4 h-4 text-[#f97316] group-hover:scale-110 transition-transform" />
              <span>{texts.breadcrumbHome}</span>
            </button>
            <span className="text-slate-500">/</span>
            <span className="text-white font-bold">{texts.breadcrumbContact}</span>
          </div>

          {/* Hero Header matching screenshot */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 shrink-0">
                  <Mail className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {texts.heroTitle}
                </h1>
              </div>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
                {texts.heroSubtitle}
              </p>
            </div>

            {/* Quick action button to join / membership */}
            {onOpenJoin && (
              <div className="hidden sm:block shrink-0">
                <button
                  onClick={onOpenJoin}
                  className="px-5 py-2.5 rounded-xl border border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-200 hover:text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>
                    {language === 'ar'
                      ? 'طلب العضوية والانضمام'
                      : language === 'fr'
                      ? 'Rejoindre le club'
                      : 'Join the Club'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Content Layout (Exact match to reference screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================= */}
          {/* COLUMN 1 (RTL: Left / LTR: Right): Contact Info Panel     */}
          {/* ========================================================= */}
          <div className={`lg:col-span-4 flex flex-col gap-5 ${isLtr ? 'order-3' : 'order-1'}`}>
            <div className="bg-[#06172d]/80 border border-cyan-800/40 hover:border-cyan-500/40 rounded-2xl p-6 shadow-xl backdrop-blur-md transition-all">
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
                  <HeadsetIcon />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">
                    {texts.infoTitle}
                  </h2>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-6 font-normal">
                {texts.infoSubtitle}
              </p>

              {/* Cards List */}
              <div className="space-y-4">
                
                {/* 1. Phone Card */}
                <div className="bg-[#031021]/80 border border-cyan-900/50 hover:border-cyan-600/60 rounded-xl p-4 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-400 mb-1">
                        {texts.phoneTitle}
                      </div>
                      <a
                        href={`tel:${texts.phoneValue.replace(/\s+/g, '')}`}
                        dir="ltr"
                        className="text-base sm:text-lg font-extrabold text-white hover:text-orange-400 transition-colors inline-block tracking-wider font-mono"
                      >
                        {texts.phoneValue}
                      </a>
                      <div className="flex items-center gap-1.5 text-[11px] text-cyan-300/80 mt-1.5 font-normal">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{texts.phoneHours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Email Card */}
                <div className="bg-[#031021]/80 border border-cyan-900/50 hover:border-cyan-600/60 rounded-xl p-4 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-400 mb-1">
                        {texts.emailTitle}
                      </div>
                      <a
                        href={`mailto:${texts.emailValue}`}
                        className="text-sm sm:text-base font-bold text-white hover:text-orange-400 transition-colors break-all inline-block font-sans"
                      >
                        {texts.emailValue}
                      </a>
                      <div className="flex items-center gap-1.5 text-[11px] text-cyan-300/80 mt-1.5 font-normal">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{texts.emailNote}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Address Card */}
                <div className="bg-[#031021]/80 border border-cyan-900/50 hover:border-cyan-600/60 rounded-xl p-4 transition-all group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0 group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-400 mb-1">
                        {texts.addressTitle}
                      </div>
                      <div className="text-sm font-bold text-white leading-snug">
                        {texts.addressMain}
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {texts.addressSub}
                      </div>
                      
                      <button
                        onClick={handleFocusMap}
                        className="mt-3.5 w-full py-2 px-3 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/40 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MapIcon className="w-3.5 h-3.5 text-orange-400" />
                        <span>{texts.viewOnMap}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4. Social Links Box */}
              <div className="mt-6 pt-5 border-t border-cyan-900/50">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-3.5">
                  <Share2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>{texts.socialTitle}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/213697921551"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={texts.socialWa}
                    className="h-10 rounded-xl bg-[#031021] hover:bg-[#25D366] border border-cyan-900/50 hover:border-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    <WhatsAppIcon />
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={texts.socialX}
                    className="h-10 rounded-xl bg-[#031021] hover:bg-[#f97316] border border-cyan-900/50 hover:border-[#f97316] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    <XTwitterIcon />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={texts.socialIg}
                    className="h-10 rounded-xl bg-[#031021] hover:bg-[#E1306C] border border-cyan-900/50 hover:border-[#E1306C] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    <InstagramIcon />
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={texts.socialYt}
                    className="h-10 rounded-xl bg-[#031021] hover:bg-[#FF0000] border border-cyan-900/50 hover:border-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    <YouTubeIcon />
                  </a>

                  {/* Facebook (Official Link) */}
                  <a
                    href="https://www.facebook.com/share/1CA8B73bnM/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={texts.socialFb}
                    className="h-10 rounded-xl bg-[#031021] hover:bg-[#1877F2] border border-cyan-900/50 hover:border-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    <FacebookIcon />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2 (Center): Map & Building Photo Showcase          */}
          {/* ========================================================= */}
          <div
            ref={mapContainerRef}
            className={`lg:col-span-3 flex flex-col gap-5 ${isLtr ? 'order-2' : 'order-2'}`}
          >
            {/* Top Card: High-tech Dark Vector Map */}
            <div
              className={`bg-[#06172d]/80 border ${
                mapHighlighted
                  ? 'border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.4)]'
                  : 'border-cyan-800/40 hover:border-cyan-500/40'
              } rounded-2xl p-3 shadow-xl backdrop-blur-md transition-all relative overflow-hidden`}
            >
              {/* Map Canvas Visual */}
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-[#030d1a] border border-cyan-950">
                {/* SVG Map Lines & Landmarks */}
                <div
                  className="absolute inset-0 transition-transform duration-300"
                  style={{
                    transform: `scale(${mapZoom})`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Grid Pattern */}
                    <defs>
                      <pattern
                        id="grid-pattern"
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 24 0 L 0 0 0 24"
                          fill="none"
                          stroke="rgba(6, 182, 212, 0.07)"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />

                    {/* Secondary roads */}
                    <path
                      d="M -10 60 L 420 180"
                      stroke="#0f3050"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 120 -10 L 190 330"
                      stroke="#0f3050"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 60 330 L 350 -10"
                      stroke="#143e67"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />

                    {/* Main Boulevard / Highway (Cyan & Orange Glowing) */}
                    <path
                      d="M -20 220 C 120 200 240 130 420 110"
                      stroke="#0284c7"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <path
                      d="M -20 220 C 120 200 240 130 420 110"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      opacity="0.9"
                    />

                    {/* Access road to HQ with orange trail */}
                    <path
                      d="M 210 145 L 205 175"
                      stroke="#f97316"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    {/* Landmark 1: City Cultural Center */}
                    <g transform="translate(300, 100)">
                      <rect
                        x="-10"
                        y="-10"
                        width="20"
                        height="20"
                        rx="4"
                        fill="#0c2d4a"
                        stroke="#0ea5e9"
                        strokeWidth="1.5"
                      />
                      <Building2 className="w-3.5 h-3.5 text-cyan-300" x="-7" y="-7" />
                      <text
                        x="0"
                        y="22"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="9"
                        fontWeight="bold"
                        className="select-none"
                      >
                        {texts.mapCenter}
                      </text>
                    </g>

                    {/* Landmark 2: Public Park */}
                    <g transform="translate(90, 120)">
                      <circle
                        cx="0"
                        cy="0"
                        r="11"
                        fill="#06382e"
                        stroke="#10b981"
                        strokeWidth="1.5"
                      />
                      <TreePine className="w-3.5 h-3.5 text-emerald-400" x="-7" y="-7" />
                      <text
                        x="0"
                        y="22"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="9"
                        fontWeight="bold"
                        className="select-none"
                      >
                        {texts.mapPark}
                      </text>
                    </g>

                    {/* Street Label 1 */}
                    <g transform="translate(195, 215) rotate(-14)">
                      <text
                        x="0"
                        y="0"
                        fill="#64748b"
                        fontSize="8.5"
                        fontWeight="bold"
                        letterSpacing="1"
                        className="select-none"
                      >
                        {texts.mapRoad1}
                      </text>
                    </g>

                    {/* Street Label 2 */}
                    <g transform="translate(75, 185) rotate(48)">
                      <text
                        x="0"
                        y="0"
                        fill="#64748b"
                        fontSize="8"
                        fontWeight="bold"
                        className="select-none"
                      >
                        {texts.mapRoad2}
                      </text>
                    </g>

                    {/* Central HQ Marker with Pulsing Glow (Exact match to screenshot) */}
                    <g transform="translate(205, 140)">
                      {/* Pulse Ring */}
                      <circle cx="0" cy="0" r="24" fill="#f97316" opacity="0.15">
                        <animate
                          attributeName="r"
                          values="14;28;14"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3;0;0.3"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="0" cy="0" r="14" fill="#f97316" opacity="0.25" />

                      {/* Pin teardrop / polygon */}
                      <path
                        d="M 0 -22 C -9 -22 -16 -15 -16 -6 C -16 5 0 20 0 20 C 0 20 16 5 16 -6 C 16 -15 9 -22 0 -22 Z"
                        fill="#f97316"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <circle cx="0" cy="-6" r="6" fill="#ffffff" />
                      <circle cx="0" cy="-6" r="3" fill="#ea580c" />

                      {/* Pin Label Box */}
                      <g transform="translate(0, 32)">
                        <rect
                          x="-45"
                          y="-10"
                          width="90"
                          height="20"
                          rx="5"
                          fill="#041224"
                          stroke="#f97316"
                          strokeWidth="1.2"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {texts.mapHQ}
                        </text>
                      </g>
                    </g>
                  </svg>
                </div>

                {/* Compass N Badge on Top Left */}
                <div className="absolute top-2.5 left-2.5 z-10 w-8 h-8 rounded-lg bg-[#041224]/90 border border-cyan-800/60 text-cyan-300 flex flex-col items-center justify-center font-bold text-[10px] shadow-md backdrop-blur-sm">
                  <Compass className="w-3.5 h-3.5 text-orange-400" />
                  <span className="leading-none text-[9px] text-white">N</span>
                </div>

                {/* Zoom Controls on Bottom Right */}
                <div className="absolute bottom-2.5 right-2.5 z-10 flex flex-col gap-1">
                  <button
                    onClick={() => setMapZoom((z) => Math.min(z + 0.2, 1.8))}
                    title="Zoom in"
                    className="w-7 h-7 rounded-md bg-[#041224]/90 hover:bg-[#0f2d4e] border border-cyan-800/60 text-cyan-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm text-xs font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                    title="Zoom out"
                    className="w-7 h-7 rounded-md bg-[#041224]/90 hover:bg-[#0f2d4e] border border-cyan-800/60 text-cyan-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm text-xs font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* External Google Maps Button */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Souk+Ahras+Algeria+Dar+Chabab"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 w-full py-2 px-3 rounded-lg bg-[#030f1e] hover:bg-[#08203c] border border-cyan-800/40 hover:border-cyan-500/50 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                <span>{texts.openGoogleMaps}</span>
              </a>
            </div>

            {/* Bottom Card: Club HQ Building Exterior Photo */}
            <div className="bg-[#06172d]/80 border border-cyan-800/40 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md transition-all group">
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#030c18]">
                <img
                  src="/assets/aistudio/club_hq_facade.jpg"
                  alt="Club Headquarters Facade"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041121] via-transparent to-transparent opacity-90" />
                
                {/* Glowing emblem signage badge on building */}
                <div className="absolute top-3 left-3 bg-[#041326]/90 backdrop-blur-md border border-cyan-500/40 rounded-lg px-2.5 py-1 flex items-center gap-2 shadow-lg">
                  <img
                    src="/assets/aistudio/logo_emblem_transparent.png"
                    alt="Emblem"
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    نادي منبر الشاب المبدع
                  </span>
                </div>
              </div>

              {/* Caption details below photo */}
              <div className="p-4 bg-[#051426]">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <MapPin className="w-4 h-4 text-[#f97316] shrink-0" />
                  <span className="truncate">{texts.hqBuildingTitle}</span>
                </div>
                <div className="text-xs text-cyan-300/80 font-normal mt-1 pr-6">
                  {texts.hqBuildingSubtitle}
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* COLUMN 3 (RTL: Right / LTR: Left): Message Contact Form   */}
          {/* ========================================================= */}
          <div className={`lg:col-span-5 flex flex-col gap-5 ${isLtr ? 'order-1' : 'order-3'}`}>
            <div className="bg-[#06172d]/80 border border-cyan-800/40 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all relative">
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Send className="w-5 h-5 stroke-[2.2] -rotate-12" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    {texts.formTitle}
                  </h2>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-6 font-normal">
                {texts.formSubtitle}
              </p>

              {/* Form or Success State */}
              {isSubmitted ? (
                <div className="bg-gradient-to-b from-cyan-950/60 to-[#031122] border border-cyan-500/40 rounded-2xl p-6 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {texts.successTitle}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
                    {texts.successDesc}
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    {texts.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                        <User className="w-3.5 h-3.5 text-orange-400" />
                        <span>{texts.nameLabel}</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={texts.namePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#030e1b] border border-cyan-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                        <Mail className="w-3.5 h-3.5 text-orange-400" />
                        <span>{texts.emailLabel}</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={texts.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#030e1b] border border-cyan-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Inquiry Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                        <Phone className="w-3.5 h-3.5 text-orange-400" />
                        <span>{texts.phoneLabel}</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={texts.phonePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#030e1b] border border-cyan-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all font-mono"
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
                        <span>{texts.inquiryLabel}</span>
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#030e1b] border border-cyan-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white outline-none transition-all cursor-pointer"
                      >
                        <option value="" className="bg-[#04101e] text-slate-400">
                          {texts.inquiryPlaceholder}
                        </option>
                        {texts.inquiries.map((inq, idx) => (
                          <option key={idx} value={inq} className="bg-[#04101e] text-white">
                            {inq}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                      <FileText className="w-3.5 h-3.5 text-orange-400" />
                      <span>{texts.messageLabel}</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={texts.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#030e1b] border border-cyan-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all resize-y"
                    />
                  </div>

                  {/* Row 4: File Upload Dropzone (matching screenshot) */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-orange-400" />
                      <span>{texts.fileLabel}</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {selectedFile ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 border border-cyan-600/50">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Paperclip className="w-4 h-4 text-orange-400 shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">
                              {selectedFile.name}
                            </div>
                            <div className="text-[10px] text-cyan-300">
                              {(selectedFile.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="w-6 h-6 rounded-full bg-cyan-900/60 hover:bg-red-900/80 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <CloseIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-cyan-800/60 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all group"
                      >
                        <div className="w-11 h-11 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-inner">
                          <UploadCloud className="w-5 h-5 text-cyan-300 group-hover:text-orange-400 transition-colors" />
                        </div>
                        <p className="text-[11px] text-slate-300 max-w-sm mx-auto leading-relaxed">
                          {texts.fileDesc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Row 5: Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60"
                    >
                      <Send className="w-4 h-4 stroke-[2.2]" />
                      <span>{isSubmitting ? texts.sendingBtn : texts.sendBtn}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
