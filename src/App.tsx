import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Stethoscope, 
  Layers, 
  FlaskConical, 
  ScanFace, 
  Pill, 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Globe, 
  ChevronRight, 
  CheckCircle, 
  Award, 
  Heart, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Shield,
  MessageSquare,
  Baby
} from 'lucide-react';
import { translations, doctorsList, departmentsList, Doctor, Department } from './data';

// @ts-ignore
import heroImg from './assets/images/khzmat_medical_city_hero_1783346322976.jpg';
// @ts-ignore
import nicuImg from './assets/images/khzmat_medical_city_nicu_1783346337499.jpg';
// @ts-ignore
import lobbyImg from './assets/images/khzmat_medical_city_lobby_1783346353725.jpg';
// @ts-ignore
import hallwayImg from './assets/images/clinical_hallway_1783349265958.jpg';

export default function App() {
  const [lang, setLang] = useState<'EN' | 'AR' | 'KU'>('KU');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'home' | 'departments' | 'doctors' | 'contact'>('home');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  
  // Appointment Form State
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [formDoctorId, setFormDoctorId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const t = translations[lang];
  const isRtl = lang === 'AR' || lang === 'KU';

  // Trigger Medical Emergency modal 3 seconds after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEmergencyOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Synchronize document direction with active language
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.toLowerCase();
  }, [lang, isRtl]);

  // Handle appointment form submission
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !formDoctorId) return;
    
    const selectedDoc = doctorsList.find(d => d.id === formDoctorId);
    const selectedDocName = selectedDoc ? selectedDoc.name[lang] : "";
    const selectedDepName = selectedDoc ? selectedDoc.specialty[lang] : "";
    
    const randomCode = 'KMC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(randomCode);
    
    const formattedDateText = bookingDate ? bookingDate : new Date().toLocaleDateString();
    
    let textMsg = "";
    if (lang === 'KU') {
      textMsg = `سڵاو، دەمەوێت نۆرەیەک بگرم بۆ:\n` +
                `🆔 کۆدی تیکەت: ${randomCode}\n` +
                `👤 ناوی نەخۆش: ${patientName}\n` +
                `📞 ژمارەی مۆبایل: ${patientPhone}\n` +
                `🏥 بەش: ${selectedDepName}\n` +
                `👨‍⚕️ پزیشک: ${selectedDocName}\n` +
                `📅 ڕێککەوت: ${formattedDateText}`;
    } else if (lang === 'AR') {
      textMsg = `مرحبا، أود حجز موعد لـ:\n` +
                `🆔 رمز التذكرة: ${randomCode}\n` +
                `👤 اسم المريض: ${patientName}\n` +
                `📞 رقم الهاتف: ${patientPhone}\n` +
                `🏥 القسم: ${selectedDepName}\n` +
                `👨‍⚕️ الطبيب: ${selectedDocName}\n` +
                `📅 التاريخ: ${formattedDateText}`;
    } else {
      textMsg = `Hello, I want to book an appointment for:\n` +
                `🆔 Ticket Code: ${randomCode}\n` +
                `👤 Patient Name: ${patientName}\n` +
                `📞 Phone: ${patientPhone}\n` +
                `🏥 Department: ${selectedDepName}\n` +
                `👨‍⚕️ Doctor: ${selectedDocName}\n` +
                `📅 Date: ${formattedDateText}`;
    }
    
    // Action: opens WhatsApp directly with formatted message text
    const whatsappUrl = `https://wa.me/9647705915454?text=${encodeURIComponent(textMsg)}`;
    window.open(whatsappUrl, '_blank');
    
    setAppointmentSuccess(true);
  };

  const resetBookingForm = () => {
    setPatientName('');
    setPatientPhone('');
    setSelectedDepartment('all');
    setFormDoctorId('');
    setBookingDate('');
    setAppointmentSuccess(false);
  };

  // Filter doctors based on search and specialty selection
  const filteredDoctors = doctorsList.filter(doc => {
    const matchesSearch = 
      doc.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.name.KU.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.KU.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = 
      selectedSpecialty === 'all' || doc.specialtyKey === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  const specialties = [
    { key: 'all', label: t.allSpecialties },
    { key: 'obstetrics', label: lang === 'KU' ? 'ژنان' : lang === 'AR' ? 'النسائية والتوليد' : 'Obstetrics & Gynecology' },
    { key: 'cardiology', label: lang === 'KU' ? 'دڵ' : lang === 'AR' ? 'أمراض القلب' : 'Cardiology' },
    { key: 'gastro', label: lang === 'KU' ? 'هەرس و جگەر' : lang === 'AR' ? 'الجهاز الهضمي' : 'Gastroenterology' },
    { key: 'rheum', label: lang === 'KU' ? 'رۆماتیزم و جومگە' : lang === 'AR' ? 'الروماتيزم والمفاصل' : 'Rheumatology' },
    { key: 'peds', label: lang === 'KU' ? 'منداڵان' : lang === 'AR' ? 'الأطفال' : 'Pediatrics' },
    { key: 'ortho', label: lang === 'KU' ? 'ئێسک و جومگە' : lang === 'AR' ? 'العظام والمفاصل' : 'Orthopedics' },
    { key: 'ophthalm', label: lang === 'KU' ? 'چاو' : lang === 'AR' ? 'أمراض العيون' : 'Ophthalmology' }
  ];

  return (
    <div className="min-h-screen font-sans antialiased text-[#1F242E] bg-[#FAF9F5] flex flex-col selection:bg-navy-900 selection:text-white" id="kmc-app">
      
      {/* PRIMARY STICKY NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EAE6DF] py-3.5 px-4 md:px-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] animate-fade-in" id="kmc-main-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center shadow-md shrink-0 border border-navy-800">
                <Activity className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <h1 className="text-base md:text-lg font-serif font-bold tracking-tight text-navy-900 leading-tight">
                  {lang === 'KU' ? 'شاری پزیشکی خزمەت' : lang === 'AR' ? 'مدينة خزمت الطبية' : 'Khzmat Medical City'}
                </h1>
                <p className="text-[9px] text-slate-500 tracking-wider uppercase font-mono mt-0.5">Kalar, Sulaymaniyah, Iraq</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-5 md:gap-8 text-xs md:text-sm font-medium w-full md:w-auto justify-center">
            <a 
              href="#kmc-hero" 
              onClick={() => setActiveTab('home')}
              className={`py-1 transition-all border-b-2 ${activeTab === 'home' ? 'text-navy-900 border-navy-900 font-semibold' : 'text-slate-600 border-transparent hover:text-navy-900'}`}
            >
              {t.home}
            </a>
            <a 
              href="#kmc-departments" 
              onClick={() => setActiveTab('departments')}
              className={`py-1 transition-all border-b-2 ${activeTab === 'departments' ? 'text-navy-900 border-navy-900 font-semibold' : 'text-slate-600 border-transparent hover:text-navy-900'}`}
            >
              {t.departments}
            </a>
            <a 
              href="#kmc-doctors" 
              onClick={() => setActiveTab('doctors')}
              className={`py-1 transition-all border-b-2 ${activeTab === 'doctors' ? 'text-navy-900 border-navy-900 font-semibold' : 'text-slate-600 border-transparent hover:text-navy-900'}`}
            >
              {t.doctors}
            </a>
            <a 
              href="#kmc-contact" 
              onClick={() => setActiveTab('contact')}
              className={`py-1 transition-all border-b-2 ${activeTab === 'contact' ? 'text-navy-900 border-navy-900 font-semibold' : 'text-slate-600 border-transparent hover:text-navy-900'}`}
            >
              {t.contact}
            </a>
          </nav>

          {/* Language Switcher & Emergency Button */}
          <div className="flex items-center gap-3 self-stretch md:self-auto justify-center">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-[#EAE6DF]" id="kmc-lang-switcher">
              <button 
                onClick={() => setLang('KU')}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${lang === 'KU' ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'}`}
              >
                کوردى
              </button>
              <button 
                onClick={() => setLang('AR')}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${lang === 'AR' ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'}`}
              >
                عربي
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${lang === 'EN' ? 'bg-navy-900 text-white shadow-xs' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'}`}
              >
                EN
              </button>
            </div>

            {/* Red Emergency Trigger Button */}
            <button 
              onClick={() => setIsEmergencyOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer border border-red-600"
              id="header-emergency-btn"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{lang === 'KU' ? 'فریاگوزاری' : lang === 'AR' ? 'الطوارئ' : 'Emergency'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative bg-navy-900 overflow-hidden border-b border-[#EAE6DF] py-16 lg:py-24 text-white" id="kmc-hero">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col space-y-7">
            <div className="inline-flex items-center gap-2 bg-navy-800 text-slate-300 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border border-[#3d5a8b]/30 w-fit self-start shadow-sm">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {lang === 'KU' ? 'باوەڕپێکراو لەلایەن وەزارەتی تەندروستی' : lang === 'AR' ? 'معتمد من قبل وزارة الصحة' : 'Fully Accredited Private Medical City'}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-white leading-tight tracking-tight">
              {lang === 'KU' ? 'نایابی لە خزمەتگوزاری تایبەت و چاودێری تەندروستی' : 
               lang === 'AR' ? 'التميز في الخدمات الطبية الخاصة والرعاية الصحية المتكاملة' : 
               'Excellence in Private Services & Integrated Healthcare'}
            </h2>

            <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
              {lang === 'KU' ? 'شاری پزیشکی خزمەت نوێترین دەستکەوتی چاودێری تەندروستییە لە کەلار. پێشکەشکردنی باشترین و باوەڕپێکراوترین خزمەتگوزارییەکان لەلایەن کبار ئەندامی کۆلێژی پزیشکی لە هەموو بەشەکاندا.' :
               lang === 'AR' ? 'تعد مدينة خزمت الطبية صرحاً طبياً متكاملاً في كلار، حيث تجمع نخبة من كبار الأطباء والاستشاريين لتقديم أرقى مستويات الرعاية الصحية الموثوقة.' :
               'Khzmat Medical City is the premier private healthcare institution in Kalar, gathering elite senior clinical consultants to provide state-of-the-art medical diagnostics and patient-first care.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#kmc-booking" 
                className="bg-[#CDB38C] text-[#0B1528] font-bold px-7 py-3.5 rounded-xl hover:bg-[#DBC19C] hover:-translate-y-0.5 transition-all duration-300 text-center flex items-center justify-center gap-2 text-xs md:text-sm active:scale-98 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'KU' ? 'نۆرەگرتنی سەرھێڵ' : lang === 'AR' ? 'حجز موعد أونلاين' : 'Book Online Now'}</span>
              </a>
              <a 
                href="#kmc-doctors" 
                className="bg-transparent text-white border border-slate-500 font-semibold px-7 py-3.5 rounded-xl hover:bg-white/5 hover:border-white hover:-translate-y-0.5 transition-all duration-300 text-center flex items-center justify-center gap-2 text-xs md:text-sm active:scale-98"
              >
                <Stethoscope className="w-4 h-4 text-[#CDB38C]" />
                <span>{t.doctors}</span>
              </a>
            </div>

            {/* Quick Stats Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#3d5a8b]/30">
              <div>
                <div className="text-2xl md:text-3xl font-light font-mono text-[#CDB38C]">24/7</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1 leading-snug">
                  {lang === 'KU' ? 'فریاگوزاری و دەرمانخانە' : lang === 'AR' ? 'الطوارئ والصيدلية' : 'Emergency & Pharmacy'}
                </div>
              </div>
              <div className="border-l border-[#3d5a8b]/30 pl-4">
                <div className="text-2xl md:text-3xl font-light font-mono text-[#CDB38C]">9+</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1 leading-snug">
                  {lang === 'KU' ? 'پزیشکی پسپۆڕ' : lang === 'AR' ? 'أطباء استشاريين' : 'Senior Consultants'}
                </div>
              </div>
              <div className="border-l border-[#3d5a8b]/30 pl-4">
                <div className="text-2xl md:text-3xl font-light font-mono text-[#CDB38C]">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1 leading-snug">
                  {lang === 'KU' ? 'تەکنەلۆژیای مۆدێرن' : lang === 'AR' ? 'تقنيات حديثة' : 'Advanced Tech'}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[20px] overflow-hidden border border-[#CDB38C]/30 bg-navy-850 p-2 shadow-xl">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 md:aspect-auto">
                <img 
                  src={heroImg} 
                  alt="Khzmat Medical City Exterior" 
                  className="w-full h-[260px] md:h-[400px] object-cover hover:scale-102 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent"></div>
                
                {/* Image Caption overlay */}
                <div className="absolute bottom-3 right-3 left-3 bg-navy-900/90 backdrop-blur-xs px-3.5 py-2 rounded-lg border border-slate-700/50 text-center text-[10px] text-slate-300 font-medium tracking-wide">
                  {lang === 'KU' ? 'بەرەی دەرەوەی شاری پزیشکی خزمەت' :
                   lang === 'AR' ? 'الواجهة الخارجية لمدينة خزمت الطبية' :
                   'Khzmat Medical City Main Exterior View'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DEPARTMENTS SECTION */}
      <section className="py-16 bg-[#FAF9F5] border-b border-[#EAE6DF]" id="kmc-departments">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-normal text-navy-900 tracking-tight">
              {t.departments}
            </h3>
            <p className="text-slate-600 mt-2 text-xs md:text-sm leading-relaxed">
              {t.departmentsDesc}
            </p>
          </div>

          {/* Clean 6-card Medical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsList.map((dep) => {
              const IconComponent = 
                dep.icon === "Activity" ? Activity :
                dep.icon === "Stethoscope" ? Stethoscope :
                dep.icon === "Layers" ? Layers :
                dep.icon === "FlaskConical" ? FlaskConical :
                dep.icon === "ScanFace" ? ScanFace : Pill;

              return (
                <div 
                  key={dep.id} 
                  className="bg-white p-6 rounded-2xl border border-[#EAE6DF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_-5px_rgba(11,21,40,0.05)] hover:border-navy-900/20 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#FAF9F5] group-hover:bg-navy-900 text-navy-900 group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 border border-[#EAE6DF]/60 group-hover:border-transparent">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      {dep.tag && (
                        <span className="bg-red-50 text-red-700 border border-red-100 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                          {dep.tag}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-navy-900 mb-1.5 group-hover:text-navy-700 transition-colors">
                      {dep.name[lang]}
                    </h4>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      {t[dep.descKey]}
                    </p>
                  </div>
                  
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-1 text-[11px] text-navy-900 font-semibold group-hover:underline cursor-pointer">
                    <span>{t.learnMore}</span>
                    <ArrowRight className={`w-3 h-3 transition-transform ${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. DEDICATED NICU HIGHLIGHT SECTION */}
          <div className="mt-16 bg-white rounded-2xl border border-[#EAE6DF] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_-5px_rgba(11,21,40,0.04)] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0" id="kmc-nicu">
            <div className="lg:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col justify-center space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#FFF0F2] text-[#B23B50] px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-[#F3D1D6] w-fit">
                <Baby className="w-3.5 h-3.5" />
                <span>{lang === 'KU' ? 'نەخۆشخانەی منداڵانی ناکام (NICU)' : lang === 'AR' ? 'وحدة الأطفال المبتسرين (NICU)' : 'Neonatal Intensive Care Unit'}</span>
              </div>
              
              <h4 className="text-xl md:text-2xl lg:text-3xl font-serif font-normal text-navy-900 tracking-tight leading-tight">
                {t.nicuTitle}
              </h4>
              
              <p className="text-navy-900/90 font-semibold text-xs md:text-sm">
                {t.nicuHighlight}
              </p>
              
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                {t.nicuDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EAF7ED] flex items-center justify-center shrink-0 mt-0.5 border border-[#C6EDD0]">
                    <CheckCircle className="w-3 h-3 text-emerald-700" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-navy-900">
                      {lang === 'KU' ? 'چاودێری بەردەوام ٢٤ کاتژمێر' : lang === 'AR' ? 'مراقبة مستمرة ٢٤ ساعة' : '24/7 Clinical Monitoring'}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === 'KU' ? 'چاودێری خێرا بە ئامێری مۆدێرن' : lang === 'AR' ? 'رعاية فائقة بأجهزة حديثة' : 'Continuous telemetry'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EAF7ED] flex items-center justify-center shrink-0 mt-0.5 border border-[#C6EDD0]">
                    <CheckCircle className="w-3 h-3 text-emerald-700" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-navy-900">
                      {lang === 'KU' ? 'پزیشکی پسپۆڕی منداڵان' : lang === 'AR' ? 'استشاريين في طب الأطفال' : 'Expert Neonatologists'}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === 'KU' ? 'سەرپەرشتی لەلایەن د. ئورهان ناظم' : lang === 'AR' ? 'تحت إشراف د. أورهان ناظم' : 'Managed by senior clinical experts'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative min-h-[280px] bg-slate-50 border-t lg:border-t-0 lg:border-l border-[#EAE6DF]">
              <img 
                src={nicuImg} 
                alt="State-of-the-art NICU incubator at Khzmat" 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-navy-950/5"></div>
            </div>
          </div>

          {/* 4b. PREMIUM RECEPTION & HOSPITALITY HIGHLIGHT */}
          <div className="mt-16 bg-white rounded-2xl border border-[#EAE6DF] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_-5px_rgba(11,21,40,0.04)] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0" id="kmc-lobby-feature">
            <div className="lg:col-span-5 relative min-h-[280px] bg-slate-50 order-last lg:order-first border-b lg:border-b-0 lg:border-r border-[#EAE6DF]">
              <img 
                src={lobbyImg} 
                alt="Khzmat Medical City Reception Desk" 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-navy-950/5"></div>
            </div>

            <div className="lg:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col justify-center space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#FAF7F2] text-[#8C6D3D] px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-[#EBE3D3] w-fit">
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'KU' ? 'پێشوازی دۆستانە و ژینگەی دڵنیاکەرەوە' : lang === 'AR' ? 'الاستقبال الفاخر والرعاية المتكاملة' : 'Premium Hospitality & Comfort'}</span>
              </div>
              
              <h4 className="text-xl md:text-2xl lg:text-3xl font-serif font-normal text-navy-900 tracking-tight leading-tight">
                {lang === 'KU' ? 'پێشوازی و پەیوەندییەکانی نەخۆش' : lang === 'AR' ? 'الاستقبال وخدمات المرضى المتميزة' : 'World-Class Lobby & Patient Reception'}
              </h4>
              
              <p className="text-navy-900/90 font-semibold text-xs md:text-sm">
                {lang === 'KU' ? 'ژینگەیەکی ئارام و مۆدێرن کە شایستە بە شکۆی پزیشکی و چاودێری نەخۆش بێت.' :
                 lang === 'AR' ? 'بيئة استقبال هادئة ومجهزة بأحدث سبل الراحة الفندقية لضمان كرامة وراحة المرضى.' :
                 'A serene welcoming lobby meticulously designed to provide clinical dignity and absolute peace of mind.'}
              </p>
              
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                {lang === 'KU' ? 'شاری پزیشکی خزمەت گرنگییەکی زۆر بە بەشی پێشوازی دەدات. لە دەستپێکی هاتی نەخۆشەوە کارمەندانی لێهاتووی ئێمە ئامادەن بۆ یارمەتیدان و ڕێنمایی نەخۆش بۆ ناو هۆبەی پزیشکەکان یان بەشە جیاوازەکان بە خێراترین کات.' :
                 lang === 'AR' ? 'نحن نؤمن بأن رحلة العلاج تبدأ من اللحظة الأولى لدخول المريض. يوفر قسم الاستقبال لدينا كادرًا متخصصًا لتقديم الدعم السريع والإجابة على الاستفسارات وتوجيه المراجعين بكفاءة عالية.' :
                 'We believe that therapeutic healing begins the exact second a patient walks through our doors. Our general reception features 24/7 patient coordinators, prompt bilingual registrations, and an elegant lounge designed to minimize patient distress.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 mt-0.5 border border-[#EBE3D3]">
                    <CheckCircle className="w-3 h-3 text-[#8C6D3D]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-navy-900">
                      {lang === 'KU' ? 'پیشوازی ٢٤ کاتژمێری چالاک' : lang === 'AR' ? 'مكتب استقبال فعال ٢٤ ساعة' : '24/7 Active Hospitality'}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === 'KU' ? 'ڕێنماییکردنی نەخۆش بە بەرزترین ئاست' : lang === 'AR' ? 'توجيه وإرشاد المرضى والمراجعين' : 'Continuous guest coordination'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 mt-0.5 border border-[#EBE3D3]">
                    <CheckCircle className="w-3 h-3 text-[#8C6D3D]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-navy-900">
                      {lang === 'KU' ? 'تۆمارکردنی ئەلیکترۆنی خێرا' : lang === 'AR' ? 'تسجيل إلكتروني سريع' : 'Rapid Patient Triaging'}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === 'KU' ? 'کەمترین کاتی چاوەڕوانی بۆ نەخۆش' : lang === 'AR' ? 'تقليل أوقات الانتظار إلى الحد الأدنى' : 'Streamlined admission desk'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. DOCTORS DIRECTORY (Text-only cards, NO IMAGES) */}
      <section className="py-16 bg-white border-b border-[#EAE6DF]" id="kmc-doctors">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl md:text-3xl font-serif font-normal text-navy-900 tracking-tight">
              {t.doctors}
            </h3>
            <p className="text-slate-600 mt-2 text-xs md:text-sm">
              {t.doctorsDesc}
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#EAE6DF] shadow-[0_2px_15px_rgba(0,0,0,0.01)] mb-8 space-y-4" id="doctors-filter-panel">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <Search className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5`} />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 rounded-xl border border-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 bg-white transition-all text-xs font-medium`}
                />
              </div>

              {/* Total found text */}
              <div className="text-xs text-slate-500 font-medium bg-white px-3.5 py-2 rounded-xl border border-[#EAE6DF]">
                <span className="font-bold text-navy-900">{filteredDoctors.length}</span> {lang === 'KU' ? 'پزیشک دۆزرایەوە' : lang === 'AR' ? 'أطباء تم العثور عليهم' : 'doctors found'}
              </div>

            </div>

            {/* Specialty Horizontal Badges - Fully Responsive scrollable row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
              {specialties.map(spec => (
                <button
                  key={spec.key}
                  onClick={() => setSelectedSpecialty(spec.key)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer border hover:-translate-y-0.5 ${selectedSpecialty === spec.key ? 'bg-navy-900 text-white border-navy-900 shadow-sm' : 'bg-white text-slate-600 border-[#EAE6DF] hover:bg-slate-50 hover:text-navy-900'}`}
                >
                  {spec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Grid (Sleek Text-Only Cards, No Images) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doc) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  key={doc.id}
                  className="bg-white p-6 rounded-2xl border border-[#EAE6DF] shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_25px_-5px_rgba(11,21,40,0.04)] hover:border-navy-900/25 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-[#FAF7F2] text-[#8C6D3D] text-[10px] px-2.5 py-1 rounded-lg font-bold border border-[#EBE3D3] uppercase tracking-wider">
                        {doc.specialty[lang]}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                        <User className="w-4 h-4 text-slate-500" />
                      </div>
                    </div>

                    <h4 className="text-lg font-serif font-normal text-navy-900 mb-1">
                      {doc.name[lang]}
                    </h4>
                    
                    {doc.specialtyKey === 'obstetrics' && (
                      <p className="text-[10px] text-rose-700 font-bold mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 block"></span> {lang === 'KU' ? 'بەشی تایبەتی ژنان' : lang === 'AR' ? 'قسم طب النساء والتوليد المتكامل' : 'Obstetrics & Infertility Practitioner'}
                      </p>
                    )}

                    <div className="space-y-2 mt-4 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-[#8C6D3D] shrink-0 mt-0.5" />
                        <span>{doc.hours[lang]}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#8C6D3D] shrink-0" />
                        <span>{doc.days[lang]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2.5 pt-3 border-t border-slate-50">
                    <button 
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setFormDoctorId(doc.id);
                        const bookingEl = document.getElementById('kmc-booking');
                        if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 bg-navy-900 hover:bg-navy-800 text-white font-medium py-2 px-3 rounded-xl text-xs transition-colors text-center cursor-pointer shadow-sm"
                    >
                      {lang === 'KU' ? 'نۆرەگرتن' : lang === 'AR' ? 'حجز موعد' : 'Book Appointment'}
                    </button>
                    <a 
                      href={`https://wa.me/9647705915454?text=${encodeURIComponent(lang === 'KU' ? `سڵاو، دەمەوێت نۆرە بگرم لەگەڵ ${doc.name.KU}` : `مرحبا، أود حجز موعد مع ${doc.name.AR}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent hover:bg-emerald-50 text-emerald-850 border border-emerald-300 hover:border-emerald-500 py-2 px-3.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'KU' ? 'واتسئاپ' : lang === 'AR' ? 'واتساب' : 'WhatsApp'}</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredDoctors.length === 0 && (
              <div className="col-span-full py-12 text-center bg-[#FAF9F5] rounded-2xl border border-dashed border-[#EAE6DF]">
                <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 text-sm font-semibold">
                  {lang === 'KU' ? 'هیچ پزیشکێک نەدۆزرایەوە بەم ناوەوە' : lang === 'AR' ? 'لم يتم العثور على طبيب بهذا الاسم' : 'No doctors found matching this criteria'}
                </p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedSpecialty('all'); }}
                  className="mt-2.5 text-xs text-navy-900 font-bold underline hover:text-navy-700 cursor-pointer"
                >
                  {lang === 'KU' ? 'پیشاندانی هەمووان' : lang === 'AR' ? 'عرض جميع الأطباء' : 'Clear search filters'}
                </button>
              </div>
            )}
          </div>

          {/* HOSPITAL DIRECTOR ADMINISTRATOR NOTE */}
          <div className="mt-12 bg-[#FAF9F5] rounded-2xl border border-[#EAE6DF] p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900 shrink-0 border border-slate-100">
                <Award className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy-900">{t.hospitalDirector}</p>
                <p className="text-[10px] text-slate-500 font-medium">{lang === 'KU' ? 'بەڕێوبەرایەتی شاری پزیشکی خزمەت' : lang === 'AR' ? 'إدارة مدينة خزمت الطبية' : 'General Administration & Clinical Director'}</p>
              </div>
            </div>
            <div className="bg-white px-3.5 py-1.5 rounded-lg border border-[#EAE6DF] text-[10px] font-mono font-bold text-slate-500 shrink-0 uppercase tracking-wide">
              Ref: KMC-DIR-2026
            </div>
          </div>

        </div>
      </section>

      {/* 6. CLINICAL APPOINTMENT SCHEDULER */}
      <section className="py-16 bg-[#FAF9F5] border-b border-[#EAE6DF]" id="kmc-booking">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-[0_15px_40px_rgba(11,21,40,0.03)] overflow-hidden">
            
            {/* Header */}
            <div className="bg-navy-900 text-white p-8 text-center relative border-b border-[#EAE6DF]/15">
              <div className="absolute top-4 right-4 bg-white/10 text-[#CDB38C] text-[9px] px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-white/10">
                {lang === 'KU' ? 'بینینی دکتۆر' : lang === 'AR' ? 'حجز العيادات' : 'KMC Consultation'}
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-normal tracking-tight">
                {lang === 'KU' ? 'سیستەمی نۆرەگرتنی ئەلیکترۆنی' : lang === 'AR' ? 'منظومة حجز المواعيد الطبية' : 'Secure Online Appointment System'}
              </h3>
              <p className="text-slate-300 text-[11px] md:text-xs mt-2 max-w-lg mx-auto leading-relaxed">
                {lang === 'KU' ? 'تکایە زانیارییەکان پڕبکەرەوە بۆ وەرگرتنی کارتی چوونە ژوورەوە' : lang === 'AR' ? 'يرجى ملء البيانات التالية لإصدار تذكرة مراجعة الطبيب' : 'Fill in the following details to generate your digital consulting slip'}
              </p>
            </div>

            <div className="p-6 md:p-10">
              {!appointmentSuccess ? (
                <form onSubmit={handleBooking} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Patient Name */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                        {lang === 'KU' ? 'ناوی تەواوی نەخۆش' : lang === 'AR' ? 'اسم المريض الكامل' : 'Patient Full Name'} *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder={lang === 'KU' ? 'ناوی دووجا یان تەواو' : lang === 'AR' ? 'الاسم الثنائي أو الثلاثي' : 'e.g. Ayad Mohammed'}
                        className="p-3 rounded-xl border border-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 bg-white text-xs text-slate-800 transition-all"
                      />
                    </div>

                    {/* Patient Phone */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                        {lang === 'KU' ? 'ژمارەی تەلەفۆن' : lang === 'AR' ? 'رقم الهاتف المحمول' : 'Mobile Phone Number'} *
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="0770XXXXXXX"
                        className="p-3 rounded-xl border border-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 bg-white text-xs text-slate-800 text-start font-mono transition-all"
                      />
                    </div>

                    {/* Department Selector */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                        {lang === 'KU' ? 'بەشی پزیشکی' : lang === 'AR' ? 'القسم الطبي' : 'Medical Department'} *
                      </label>
                      <select 
                        required
                        value={selectedDepartment}
                        onChange={(e) => {
                          setSelectedDepartment(e.target.value);
                          setFormDoctorId(''); // Reset doctor when department changes
                        }}
                        className="p-3 rounded-xl border border-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 bg-white text-xs font-medium cursor-pointer text-slate-800 transition-all"
                      >
                        <option value="all">
                          {lang === 'KU' ? '--- هەموو بەشەکان ---' : lang === 'AR' ? '--- جميع الأقسام ---' : '--- All Departments ---'}
                        </option>
                        {specialties.filter(s => s.key !== 'all').map(spec => (
                          <option key={spec.key} value={spec.key}>
                            {spec.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Doctor Selector */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                        {t.selectDoctor} *
                      </label>
                      <select 
                        required
                        value={formDoctorId}
                        onChange={(e) => setFormDoctorId(e.target.value)}
                        className="p-3 rounded-xl border border-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 bg-white text-xs font-medium cursor-pointer text-slate-800 transition-all"
                      >
                        <option value="">
                          {lang === 'KU' ? '--- دکتۆرێک هەڵبژێرە ---' : lang === 'AR' ? '--- اختر الطبيب من هنا ---' : '--- Choose Doctor ---'}
                        </option>
                        {doctorsList
                           .filter(doc => selectedDepartment === 'all' || doc.specialtyKey === selectedDepartment)
                           .map(doc => (
                             <option key={doc.id} value={doc.id}>
                               {doc.name[lang]} ({doc.specialty[lang]})
                             </option>
                           ))}
                      </select>
                    </div>

                    {/* Appointment Date */}
                    <div className="flex flex-col space-y-2 md:col-span-2">
                      <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider">
                        {lang === 'KU' ? 'ڕێککەوتی چاوپێکەوتن' : lang === 'AR' ? 'تاريخ الموعد المطلوب' : 'Preferred Appointment Date'} *
                      </label>
                      <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="p-3 rounded-xl border border-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-navy-900 focus:border-navy-900 bg-white text-xs font-mono text-slate-800 transition-all"
                      />
                    </div>

                  </div>

                  <div className="bg-[#FAF7F2] p-4 rounded-xl text-[11px] text-[#8C6D3D] leading-relaxed flex items-start gap-2.5 border border-[#EBE3D3]">
                    <Shield className="w-4 h-4 text-[#8C6D3D] shrink-0 mt-0.5" />
                    <span>
                      {lang === 'KU' ? 'ئەم پشکنینە نۆرەگرتنێکی تاقیکاری مۆدێرنە. پاش تۆمارکردن، دەتوانیت ڕاستەوخۆ تیکەتەکە بێریت بۆ بەشی واتسئاپ بۆ کۆتایی هێنان بە نۆرەگرتنەکەت.' :
                       lang === 'AR' ? 'هذا الحجز سريري أولي. عند التأكيد، يمكنك إرسال التذكرة مباشرة عبر الواتساب لتأكيد موعد المراجعة مع العيادة.' :
                       'This is an electronic pre-appointment ticket. Upon generation, you can send it directly to our desk on WhatsApp or call us to confirm.'}
                    </span>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-navy-900 hover:bg-navy-800 hover:-translate-y-0.5 text-white font-medium py-3.5 px-5 rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <CheckCircle className="w-4 h-4 text-[#CDB38C]" />
                    <span>{lang === 'KU' ? 'تۆمارکردن و دروستکردنی کارتی نۆرە' : lang === 'AR' ? 'تأكيد الحجز وإصدار التذكرة' : 'Confirm & Generate Consulting Ticket'}</span>
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4 space-y-5"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 shrink-0 border border-emerald-100 shadow-xs">
                    <CheckCircle className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-navy-900">
                      {lang === 'KU' ? 'کارتی نۆرە بە سەرکەوتوویی دروستکرا!' : lang === 'AR' ? 'تم إصدار تذكرة الحجز بنجاح!' : 'Medical Slip Generated Successfully!'}
                    </h4>
                    <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                      {lang === 'KU' ? 'تکایە ئەم تیکەتە بپارێزە یان پەیوەندی بکە بۆ یەکجاری کردنی کاتەکە.' : lang === 'AR' ? 'يرجى الاحتفاظ بالتذكرة التالية أو تأكيدها عبر الهاتف.' : 'Please save this slip or send it to our frontdesk to finalize your slot.'}
                    </p>
                  </div>

                  {/* High fidelity medical ticket */}
                  <div className="max-w-xs mx-auto bg-[#FAF9F5] border border-[#EAE6DF] rounded-2xl p-6 text-start space-y-4 font-sans relative shadow-sm">
                    <div className="absolute top-4 right-4 text-[9px] bg-[#FAF7F2] text-[#8C6D3D] px-2.5 py-1 rounded-lg font-mono font-bold border border-[#EBE3D3]">
                      {bookingCode}
                    </div>
                    <div className="border-b border-[#EAE6DF] pb-2.5">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.title}</h5>
                      <p className="text-xs font-bold text-navy-900 mt-0.5">
                        {lang === 'KU' ? 'کارتی نۆرەگرتنی کلینیک' : lang === 'AR' ? 'بطاقة مراجعة العيادة الخارجية' : 'Consultation Check-in Slip'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">{lang === 'KU' ? 'ناوی نەخۆش' : lang === 'AR' ? 'اسم المريض' : 'Patient'}</span>
                        <span className="font-bold text-slate-800 block truncate">{patientName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">{lang === 'KU' ? 'مۆبایل' : lang === 'AR' ? 'الهاتف' : 'Phone'}</span>
                        <span className="font-mono font-bold text-slate-800 block">{patientPhone}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">{lang === 'KU' ? 'دکتۆری پسپۆڕ' : lang === 'AR' ? 'الطبيب المعالج' : 'Consultant Doctor'}</span>
                        <span className="font-bold text-navy-900 block">
                          {doctorsList.find(d => d.id === formDoctorId)?.name[lang]}
                        </span>
                        <span className="block text-[10px] text-slate-500 font-medium">
                          {doctorsList.find(d => d.id === formDoctorId)?.specialty[lang]}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#EAE6DF] text-[10px] text-slate-600 space-y-1.5">
                      <div className="flex justify-between">
                        <span>{lang === 'KU' ? 'کاتی بینین:' : lang === 'AR' ? 'ساعات المراجعة:' : 'Timing:'}</span>
                        <span className="font-semibold text-slate-800 text-end">
                          {doctorsList.find(d => d.id === formDoctorId)?.hours[lang]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'KU' ? 'ڕۆژانی نۆرە:' : lang === 'AR' ? 'أيام العمل:' : 'Days:'}</span>
                        <span className="font-semibold text-slate-800 text-end">
                          {doctorsList.find(d => d.id === formDoctorId)?.days[lang]}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-slate-100 pt-1.5 mt-1.5">
                        <span>{lang === 'KU' ? 'ڕێککەوتی نۆرە:' : lang === 'AR' ? 'تاريخ الموعد:' : 'Date:'}</span>
                        <span className="font-semibold text-navy-800">
                          {bookingDate ? bookingDate : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-xs mx-auto pt-2">
                    <a 
                      href={`https://wa.me/9647705915454?text=${encodeURIComponent(
                        lang === 'KU' ? `سڵاو، دەمەوێت نۆرەکەم جێگیر بکەم: نیشانەی کورتەکارت ${bookingCode}. ناوم ${patientName}. دکتۆر: ${doctorsList.find(d => d.id === formDoctorId)?.name.KU}. بەروار: ${bookingDate}` :
                        `مرحبا، أود تثبيت الحجز برمز التذكرة ${bookingCode}. الاسم: ${patientName}. الطبيب: ${doctorsList.find(d => d.id === formDoctorId)?.name.AR}. التاريخ: ${bookingDate}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer hover:-translate-y-0.5 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{lang === 'KU' ? 'ناردن بە واتسئاپ' : lang === 'AR' ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}</span>
                    </a>
                    <button 
                      onClick={resetBookingForm}
                      className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-[#EAE6DF] font-medium py-2 px-3 rounded-xl text-xs transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      {lang === 'KU' ? 'نۆرەگرتنی تر' : lang === 'AR' ? 'حجز جديد' : 'New Appointment'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 7. LOCATION & CONTACT */}
      <section className="py-20 bg-[#FAF9F5] border-t border-[#EAE6DF]" id="kmc-contact">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 flex flex-col space-y-8 justify-between bg-white rounded-2xl border border-[#EAE6DF] p-8 md:p-10 shadow-sm">
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-serif font-normal text-navy-900 tracking-tight">
                  {t.contact}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  {t.contactSubtitle}
                </p>
              </div>

              <div className="space-y-6 my-6">
                
                {/* Physical Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#FAF9F5] text-navy-900 rounded-xl flex items-center justify-center shrink-0 border border-[#EAE6DF]">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">{t.addressTitle}</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                      {t.addressValue}
                    </p>
                  </div>
                </div>

                {/* Primary Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#FAF9F5] text-navy-900 rounded-xl flex items-center justify-center shrink-0 border border-[#EAE6DF]">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">{t.phoneTitle} (Direct Line)</h4>
                    <a href="tel:07707049191" className="text-sm md:text-base font-mono font-bold text-red-600 hover:underline mt-1 block">
                      07707049191
                    </a>
                  </div>
                </div>

                {/* Secondary WhatsApp */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#EAF7ED] text-emerald-900 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                    <MessageSquare className="w-4.5 h-4.5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">{t.whatsappTitle}</h4>
                    <a 
                      href="https://wa.me/9647705915454" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm md:text-base font-mono font-bold text-emerald-600 hover:underline mt-1 block"
                    >
                      07705915454
                    </a>
                  </div>
                </div>

                {/* Corporate Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#FAF9F5] text-navy-900 rounded-xl flex items-center justify-center shrink-0 border border-[#EAE6DF]">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Email Support</h4>
                    <a href="mailto:xzmat@outlook.com" className="text-xs md:text-sm text-slate-600 hover:underline hover:text-navy-900 mt-1 block font-medium">
                      xzmat@outlook.com
                    </a>
                  </div>
                </div>

              </div>

              {/* SOCIAL LINKS */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {t.socialTitle}
                </h4>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://www.facebook.com/XzmatMedicalCity" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-[#EAE6DF] flex items-center justify-center text-slate-600 hover:bg-navy-900 hover:text-white hover:border-transparent transition-all cursor-pointer shrink-0 shadow-xs"
                    title="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://www.tiktok.com/@xzmat_medical_city" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-[#EAE6DF] flex items-center justify-center text-slate-600 hover:bg-black hover:text-white hover:border-transparent transition-all cursor-pointer shrink-0 shadow-xs"
                    title="TikTok"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.11-.11.23-.21.36-.31a7.717 7.717 0 0 0 .54-.42c1.23-.97 1.88-2.4 1.95-3.95.02.43.01.87.02 1.3 0 1.25.43 2.47 1.25 3.44a4.932 4.932 0 0 0 3.39 1.71c-.01 1.34.01 2.68-.02 4.02-.75-.01-1.49-.15-2.2-.42-1.12-.41-2.09-1.18-2.73-2.18l-.02 6.78c.03 2.18-.75 4.31-2.22 5.92a7.616 7.616 0 0 1-5.32 2.46c-2.42.14-4.85-.75-6.52-2.5a8.204 8.204 0 0 1-2.24-5.38 8.017 8.017 0 0 1 1.77-5.69 7.42 7.42 0 0 1 4.96-2.82c.02 1.32-.01 2.64.02 3.96a3.844 3.844 0 0 0-2.31 1.63 4.148 4.148 0 0 0-.46 3.07c.36 1.48 1.56 2.68 3.07 2.96 1.83.33 3.73-.61 4.33-2.36.17-.49.23-1.01.21-1.53V0z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://www.instagram.com/xzmat.medical.city" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-[#EAE6DF] flex items-center justify-center text-slate-600 hover:bg-gradient-to-tr hover:from-yellow-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all cursor-pointer shrink-0 shadow-xs"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Satellite Map/Lobby Card */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="bg-white rounded-2xl overflow-hidden border border-[#EAE6DF] relative shadow-sm flex flex-col h-full min-h-[350px]">
                
                {/* Lobby Frame */}
                <img 
                  src={hallwayImg} 
                  alt="Khzmat Medical City Clinical Hallway" 
                  className="w-full h-56 object-cover brightness-95" 
                  referrerPolicy="no-referrer"
                />

                {/* Interactive Map Layout */}
                <div className="p-8 bg-[#0B1528] text-white flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] bg-red-600 text-white font-mono font-bold px-2.5 py-0.5 rounded-md tracking-wide uppercase">
                        {lang === 'KU' ? 'سەرەکی' : lang === 'AR' ? 'الموقع الرئيسي' : 'Coordinates'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-medium">34.6191° N, 45.3121° E</span>
                    </div>
                    <p className="text-base md:text-lg font-bold text-white">
                      {lang === 'KU' ? 'کەلار، سلێمانی، عێراق' :
                       lang === 'AR' ? 'كلار، السليمانية، العراق' :
                       'Kalar, Sulaymaniyah, Iraq'}
                    </p>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                      {lang === 'KU' ? 'شاری پزیشکی خزمەت دەکەوێتە شوێنێکی ستراتیژی لە ناوەندی کەلار بە ئاسانی دەستڕاگەیشتن بۆ ئۆتۆمبێلی فریاگوزاری و وەستانی ئۆتۆمبێلی گشتی.' :
                       lang === 'AR' ? 'تقع مدينة خزمت الطبية في موقع استراتيجي وسط كلار، مما يسهل وصول سيارات الإسعاف والمراجعين مع توفر مواقف سيارات مجانية.' :
                       'Our facilities are strategically located in central Kalar, designed for rapid ambulance access, fully equipped with premium general parking fields.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-[#CDB38C]" />
                      <span>{lang === 'KU' ? '٢٤ کاتژمێر کراوەیە' : lang === 'AR' ? 'مفتوح ٢٤ ساعة' : 'Emergency Open 24/7'}</span>
                    </div>
                    <a 
                      href="https://maps.google.com/?q=Kalar+Iraq" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#CDB38C] hover:bg-[#DBC19C] text-navy-950 font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-xs shadow-md"
                    >
                      <span>{lang === 'KU' ? 'نەخشەی گوگل' : lang === 'AR' ? 'خرائط جوجل' : 'Open Google Maps'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. CORPORATE FOOTER */}
      <footer className="mt-auto bg-navy-950 text-slate-300 py-10 px-4 md:px-8 border-t border-slate-900" id="kmc-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-navy-800 flex items-center justify-center text-white shrink-0">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <p className="font-semibold text-slate-300">
              {lang === 'KU' ? 'شاری پزیشکی خزمەت' : lang === 'AR' ? 'مدينة خزمت الطبية' : 'Khzmat Medical City'}
            </p>
          </div>
          
          <div className="text-center md:text-end space-y-1">
            <p className="font-mono tracking-wide text-slate-400">
              © 2026 Khzmat Medical City. All rights reserved. | Developed & Designed by Ayad M.Ismail
            </p>
            <p className="text-[10px] text-slate-500">
              {lang === 'KU' ? 'پێشکەشکراوە بە بەرزترین ئاستی لێهاتوویی پزیشکی لە گەرمیان' : lang === 'AR' ? 'صمم لتقديم أفضل الرعاية الطبية في منطقة كرميان' : 'Engineered for premium healthcare excellence in Garmiyan'}
            </p>
          </div>
        </div>
      </footer>

      {/* MEDICAL EMERGENCY POP-UP MODAL */}
      <AnimatePresence>
        {isEmergencyOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            id="emergency-modal-overlay"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-500/10"
              id="emergency-modal-card"
            >
              {/* Modal Top Banner */}
              <div className="bg-red-600 text-white p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/30 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/20 rounded-full blur-xl -ml-5 -mb-5"></div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setIsEmergencyOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-red-700/50 p-1.5 rounded-full transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/20 shrink-0 shadow-inner">
                    <Activity className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-red-200">
                      {lang === 'KU' ? 'شاری پزیشکی خزمەت' : lang === 'AR' ? 'مدينة خزمت الطبية' : 'Khzmat Medical City'}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold mt-0.5">
                      {lang === 'KU' ? 'فریاگوزاری کتوپڕی پزیشکی' : lang === 'AR' ? 'فریاگوزاری (طوارئ عاجلة)' : 'Medical Emergency Department'}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6 text-center">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-base font-extrabold text-navy-800 font-sans">
                      پەیوەندی فریاگوزاری: <span className="font-mono text-red-600 font-bold">07707049191</span>
                    </p>
                    <p className="text-xs text-slate-500">خزمەتگوزاری چاودێری چڕ و فریاگوزاری خێرا ٢٤ کاتژمێر</p>
                  </div>
                  
                  <div className="h-px bg-slate-100 max-w-xs mx-auto"></div>

                  <div className="space-y-1">
                    <p className="text-base font-extrabold text-navy-800 font-sans">
                      الاتصال بالطوارئ: <span className="font-mono text-red-600 font-bold">07707049191</span>
                    </p>
                    <p className="text-xs text-slate-500">العناية المركزة وقسم الحالات الطارئة على مدار الساعة</p>
                  </div>

                  <div className="h-px bg-slate-100 max-w-xs mx-auto"></div>

                  <div className="space-y-1">
                    <p className="text-base font-extrabold text-navy-800 font-mono">
                      Emergency Call: <span className="text-red-600 font-bold">07707049191</span>
                    </p>
                    <p className="text-xs text-slate-500">24/7 Adult & Neonatal Trauma & Intensive Care Services</p>
                  </div>
                </div>

                {/* Call Action Button */}
                <a 
                  href="tel:07707049191"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-600/20 active:scale-98 transition-all flex items-center justify-center gap-2.5 text-sm md:text-base cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-white" />
                  <span>{lang === 'KU' ? 'پەیوەندی بکە ئێستا' : lang === 'AR' ? 'اتصل الآن بالطوارئ' : 'Call Emergency Now'}</span>
                </a>

                {/* Footer text */}
                <div className="text-[11px] text-slate-400 flex justify-center items-center gap-1 font-mono">
                  <span>Kalar, Sulaymaniyah, Iraq</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
