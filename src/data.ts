export interface Translation {
  title: string;
  emergency: string;
  emergencyNumber: string;
  emergencyDesc: string;
  home: string;
  departments: string;
  doctors: string;
  contact: string;
  nicuTitle: string;
  nicuHighlight: string;
  nicuDesc: string;
  clinicsTitle: string;
  selectDoctor: string;
  hospitalDirector: string;
  searchPlaceholder: string;
  allSpecialties: string;
  workingHours: string;
  consultation: string;
  addressTitle: string;
  addressValue: string;
  phoneTitle: string;
  socialTitle: string;
  bookBtn: string;
  learnMore: string;
  callUs: string;
  departmentsDesc: string;
  doctorsDesc: string;
  surgeryDesc: string;
  labDesc: string;
  radDesc: string;
  pharmacyDesc: string;
  clinicsDesc: string;
  emergencyServiceDesc: string;
  whatsappTitle: string;
  contactSubtitle: string;
}

export const translations: Record<'EN' | 'AR' | 'KU', Translation> = {
  EN: {
    title: "Khzmat Medical City",
    emergency: "Emergency",
    emergencyNumber: "07707049191",
    emergencyDesc: "24/7 Neonatal & Adult Emergency Services",
    home: "Home",
    departments: "Departments",
    doctors: "Doctors Directory",
    contact: "Contact & Location",
    nicuTitle: "Neonatal Intensive Care Unit (NICU)",
    nicuHighlight: "State-of-the-art Incubators & Specialized Care",
    nicuDesc: "Our Neonatal Intensive Care Unit (NICU) provides world-class, 24/7 highly specialized critical care for premature and critically ill newborns, managed by leading neonatologists and pediatric specialists.",
    clinicsTitle: "Clinics",
    selectDoctor: "Select a Doctor",
    hospitalDirector: "Hospital Director: Dr. Ako Ibrahim Mohammed",
    searchPlaceholder: "Search for a doctor...",
    allSpecialties: "All Specialties",
    workingHours: "Consultation Hours",
    consultation: "By Appointment / Walk-in",
    addressTitle: "Our Location",
    addressValue: "Kalar, Sulaymaniyah, Iraq",
    phoneTitle: "Direct Line",
    socialTitle: "Connect With Us",
    bookBtn: "Call for Appointment",
    learnMore: "Learn More",
    callUs: "Call Emergency",
    departmentsDesc: "Explore our highly specialized medical departments equipped with state-of-the-art clinical technology.",
    doctorsDesc: "Consult with Kalar's leading certified senior consultants and medical practitioners.",
    surgeryDesc: "Advanced operating theaters for major and minor surgical procedures.",
    labDesc: "Fully automated, precision-grade diagnostic laboratory services.",
    radDesc: "Ultra-precise digital X-Ray, Ultrasound, and CT scanning capabilities.",
    pharmacyDesc: "Fully-stocked in-house pharmacy providing certified therapeutics 24/7.",
    clinicsDesc: "Multi-specialty outpatient clinics providing comprehensive diagnostics.",
    emergencyServiceDesc: "Equipped to handle acute trauma and urgent care with high clinical response.",
    whatsappTitle: "WhatsApp (Inquiries)",
    contactSubtitle: "Get in touch with our administration or coordinate your visit.",
  },
  AR: {
    title: "مدينة خزمت الطبية",
    emergency: "الطوارئ",
    emergencyNumber: "07707049191",
    emergencyDesc: "خدمات الطوارئ للبالغين وحديثي الولادة على مدار الساعة",
    home: "الرئيسية",
    departments: "الأقسام الطبية",
    doctors: "دليل الأطباء",
    contact: "الاتصال والموقع",
    nicuTitle: "وحدة العناية المركزة لحديثي الولادة (NICU)",
    nicuHighlight: "حاضنات متطورة ورعاية تخصصية فائقة",
    nicuDesc: "تقدم وحدة العناية المركزة لحديثي الولادة (NICU) لدينا رعاية حرجة متخصصة للغاية على مدار الساعة طوال أيام الأسبوع للأطفال المبتسرين وحديثي الولادة المرضى، تحت إشراف نخبة من أخصائيي طب الأطفال وحديثي الولادة.",
    clinicsTitle: "العيادات",
    selectDoctor: "اختر الطبيب",
    hospitalDirector: "مدير المستشفى: د. آكو إبراهيم محمد",
    searchPlaceholder: "ابحث عن طبيب...",
    allSpecialties: "جميع التخصصات",
    workingHours: "أوقات الاستشارة",
    consultation: "بالحجز المسبق / أو الحضور المباشر",
    addressTitle: "موقعنا",
    addressValue: "كلار، السليمانية، العراق",
    phoneTitle: "الخط المباشر",
    socialTitle: "تواصل معنا",
    bookBtn: "اتصل للحجز",
    learnMore: "اقرأ المزيد",
    callUs: "اتصال بالطوارئ",
    departmentsDesc: "استكشف أقسامنا الطبية المتخصصة المجهزة بأحدث التقنيات السريرية العالمية.",
    doctorsDesc: "استشر نخبة من كبار الاستشاريين والأخصائيين المعتمدين في كلار.",
    surgeryDesc: "غرف عمليات متطورة للتدخلات الجراحية الكبرى والصغرى.",
    labDesc: "خدمات المختبرات والتحاليل الطبية المؤتمتة بدقة عالية.",
    radDesc: "أجهزة تصوير رقمية متطورة للأشعة السينية، السونار، والمفراس.",
    pharmacyDesc: "صيدلية داخلية متكاملة توفر الأدوية المرخصة على مدار الساعة.",
    clinicsDesc: "عيادات خارجية متعددة التخصصات تقدم تشخيصاً شاملاً.",
    emergencyServiceDesc: "مجهزة بالكامل للتعامل مع الحالات الحرجة والإصابات الحادة بكفاءة عالية.",
    whatsappTitle: "واتساب (للاستفسارات)",
    contactSubtitle: "تواصل مع إدارتنا أو نسّق لزيارتك الطبية.",
  },
  KU: {
    title: "شاری پزیشکی خزمەت",
    emergency: "فریاگوزاری",
    emergencyNumber: "07707049191",
    emergencyDesc: "خزمەتگوزاری فریاگوزاری ٢٤ کاتژمێری بۆ منداڵانی ناکام و گەورە ساڵان",
    home: "سەرەکی",
    departments: "بەشەکان",
    doctors: "ڕێبەری پزیشکان",
    contact: "پەیوەندی و ناونیشان",
    nicuTitle: "نەخۆشخانەی منداڵانی ناکام (NICU)",
    nicuHighlight: "ئامێری چاودێری پێشکەوتوو و چاودێری تایبەتمەند",
    nicuDesc: "بەشی چاودێری چڕی منداڵانی تازەلەدایکبووی ئێمە (NICU) چاودێری پزیشکی ئاست بەرز و ٢٤ کاتژمێری پێشکەش بە منداڵانی ناکام و کەم کێش دەکات لەژێر سەرپەرشتی لێهاتووترین پزیشکانی پسپۆڕی منداڵان.",
    clinicsTitle: "کلینیک",
    selectDoctor: "دکتۆرێک هەڵبژێرە",
    hospitalDirector: "بەڕێوەبەری نەخۆشخانە: د. ئاکۆ ئیبراهیم محەمەد",
    searchPlaceholder: "گەڕان بۆ پزیشک...",
    allSpecialties: "هەموو پسپۆڕییەکان",
    workingHours: "کاتەکانی بینینی نەخۆش",
    consultation: "بەپێی نۆرە یان پەیوەندی پێشوەختە",
    addressTitle: "ناونیشانمان",
    addressValue: "کەلار، سلێمانی، عێراق",
    phoneTitle: "هێڵی ڕاستەوخۆ",
    socialTitle: "لەگەڵمان بن لە سۆشیاڵ میدیا",
    bookBtn: "پەیوەندی بکە بۆ نۆرەگرتن",
    learnMore: "زانیاری زیاتر",
    callUs: "پەیوەندی بە فریاگوزارییەوە بکە",
    departmentsDesc: "بەشە پزیشکییە تایبەتمەندەکانمان بەسەر بکەرەوە کە بە نوێترین تەکنەلۆژیای پزیشکی تەیارکراون.",
    doctorsDesc: "ڕاوێژ بکە لەگەڵ گەورە پسپۆڕان و دکتۆرە لێهاتووەکانی کەلار.",
    surgeryDesc: "هۆڵەکانی نەشتەرگەری پێشکەوتوو بۆ نەشتەرگەرییە گەورە و بچووکەکان.",
    labDesc: "تاقیگەی پزیشکی پێشکەوتوو بۆ هەموو جۆرە پشکنینێک بە ئامێری مۆدێرن.",
    radDesc: "بەشی تیشک و سۆنار و سیتی سکان بە وردترین شێواز.",
    pharmacyDesc: "دەرمانخانەی ناوخۆیی تەیار بە هەموو دەرمانە پێویستەکان بە شێوەی ٢٤ کاتژمێری.",
    clinicsDesc: "کلینیکە دەرەکییەکان بۆ دابینکردنی باشترین دەستنیشانکردنی نەخۆشییەکان.",
    emergencyServiceDesc: "ئامادەکراوە بۆ وەڵامدانەوەی خێرا بۆ هەموو جۆرە حاڵەتێکی کتوپڕ و نەخۆشیە سەختەکان.",
    whatsappTitle: "واتسئاپ (بۆ پرسیار و نامە)",
    contactSubtitle: "پەیوەندیمان پێوە بکە بۆ هەر پشکنین یان زانیارییەک.",
  }
};

export interface Doctor {
  id: string;
  name: Record<'EN' | 'AR' | 'KU', string>;
  specialty: Record<'EN' | 'AR' | 'KU', string>;
  specialtyKey: 'obstetrics' | 'cardiology' | 'gastro' | 'rheum' | 'peds' | 'ortho' | 'ophthalm';
  hours: Record<'EN' | 'AR' | 'KU', string>;
  days: Record<'EN' | 'AR' | 'KU', string>;
}

export const doctorsList: Doctor[] = [
  {
    id: "1",
    name: {
      EN: "Dr. Dilsoz Imad Bajalan",
      AR: "د. دڵسۆز عماد باجەڵان",
      KU: "د. دڵسۆز عماد باجەڵان"
    },
    specialty: {
      EN: "Obstetrics & Gynecology",
      AR: "النسائية والتوليد (ژنان)",
      KU: "ژنان و لەدایکبوون"
    },
    specialtyKey: "obstetrics",
    hours: {
      EN: "9:00 AM - 1:00 PM & 4:00 PM - 8:00 PM",
      AR: "9:00 صباحاً - 1:00 ظهراً ومن 4:00 عصراً - 8:00 مساءً",
      KU: "٩:٠٠ی بەیانی - ١:٠٠ی نیوەڕۆ & ٤:٠٠ی ئێوارە - ٨:٠٠ی شەو"
    },
    days: {
      EN: "Saturday - Thursday",
      AR: "السبت - الخميس",
      KU: "شەممە - پێنجشەممە"
    }
  },
  {
    id: "2",
    name: {
      EN: "Dr. Jamal Karim Rahim",
      AR: "د. جەمال کەریم ڕەحیم",
      KU: "د. جەمال کەریم ڕەحیم"
    },
    specialty: {
      EN: "Cardiology, Catheterization & Echo",
      AR: "أمراض القلب والقسطرة والإيكو",
      KU: "نەخۆشی دڵ و قەستەرە و ئیکۆ"
    },
    specialtyKey: "cardiology",
    hours: {
      EN: "4:00 PM - 8:30 PM",
      AR: "4:00 عصراً - 8:30 مساءً",
      KU: "٤:٠٠ی ئێوارە - ٨:٣٠ی شەو"
    },
    days: {
      EN: "Saturday - Wednesday",
      AR: "السبت - الأربعاء",
      KU: "شەممە - چوارشەممە"
    }
  },
  {
    id: "3",
    name: {
      EN: "Dr. Parzhin Jalal Ali",
      AR: "د. پەرژین جەلال عەلی",
      KU: "د. پەرژین جەلال عەلی"
    },
    specialty: {
      EN: "Obstetrics, Gynecology & Infertility",
      AR: "النسائية والتوليد والعقم (ژنان)",
      KU: "ژنان و لەدایکبوون و نەزۆکی"
    },
    specialtyKey: "obstetrics",
    hours: {
      EN: "9:00 AM - 2:00 PM",
      AR: "9:00 صباحاً - 2:00 ظهراً",
      KU: "٩:٠٠ی بەیانی - ٢:٠٠ی پاشنیوەڕۆ"
    },
    days: {
      EN: "Saturday - Thursday",
      AR: "السبت - الخميس",
      KU: "شەممە - پێنجشەممە"
    }
  },
  {
    id: "4",
    name: {
      EN: "Dr. Bakhtiar Sadiq Tawfeeq",
      AR: "د. بەختیار سادق تۆفیق",
      KU: "د. بەختیار سادق تۆفیق"
    },
    specialty: {
      EN: "Gastroenterology, Hepatology & Endoscopy",
      AR: "أمراض الجهاز الهضمي والكبد والناظور",
      KU: "هەرس و جگەر و نازوور"
    },
    specialtyKey: "gastro",
    hours: {
      EN: "3:30 PM - 7:30 PM",
      AR: "3:30 عصراً - 7:30 مساءً",
      KU: "٣:٣٠ی ئێوارە - ٧:٣٠ی شەو"
    },
    days: {
      EN: "Saturday - Wednesday",
      AR: "السبت - الأربعاء",
      KU: "شەممە - چوارشەممە"
    }
  },
  {
    id: "5",
    name: {
      EN: "Dr. Rawand Ali Mustafa",
      AR: "د. ڕەوەند عەلی مستەفا",
      KU: "د. ڕەوەند عەلی مستەفا"
    },
    specialty: {
      EN: "Rheumatology, Joints & Spine",
      AR: "أمراض الروماتيزم والمفاصل والعمود الفقري",
      KU: "رۆماتیزم و جومگە و بڕبڕەی پشت"
    },
    specialtyKey: "rheum",
    hours: {
      EN: "4:00 PM - 8:00 PM",
      AR: "4:00 عصراً - 8:00 مساءً",
      KU: "٤:٠٠ی ئێوارە - ٨:٠٠ی شەو"
    },
    days: {
      EN: "Saturday - Thursday",
      AR: "السبت - الخميس",
      KU: "شەممە - پێنجشەممە"
    }
  },
  {
    id: "6",
    name: {
      EN: "Dr. Orhan Nazim Mawlood",
      AR: "د. ئورهان ناظم مولود",
      KU: "د. ئورهان ناظم مولود"
    },
    specialty: {
      EN: "Pediatrics & Neonatology",
      AR: "أمراض الأطفال وحديثي الولادة",
      KU: "منداڵان و تازە لە دایک بوون"
    },
    specialtyKey: "peds",
    hours: {
      EN: "10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM",
      AR: "10:00 صباحاً - 1:00 ظهراً ومن 5:00 عصراً - 9:00 مساءً",
      KU: "١٠:٠٠ی بەیانی - ١:٠٠ی نیوەڕۆ & ٥:٠٠ی ئێوارە - ٩:٠٠ی شەو"
    },
    days: {
      EN: "All days except Friday",
      AR: "طيلة أيام الأسبوع عدا الجمعة",
      KU: "هەموو ڕۆژانی هەفتە جگە لە هەینی"
    }
  },
  {
    id: "7",
    name: {
      EN: "Dr. Muthanna Salim",
      AR: "د. موسەنا سالم",
      KU: "د. موسەنا سالم"
    },
    specialty: {
      EN: "Orthopedics, Fractures & Joints",
      AR: "أمراض وجراحة العظام والكسور والمفاصل",
      KU: "ئێسک و شکاوی و جومگە"
    },
    specialtyKey: "ortho",
    hours: {
      EN: "4:00 PM - 8:00 PM",
      AR: "4:00 عصراً - 8:00 مساءً",
      KU: "٤:٠٠ی ئێوارە - ٨:٠٠ی شەو"
    },
    days: {
      EN: "Saturday - Wednesday",
      AR: "السبت - الأربعاء",
      KU: "شەممە - چوارشەممە"
    }
  },
  {
    id: "8",
    name: {
      EN: "Dr. Bnar Yadgar Hishmat",
      AR: "د. بنار یادگار حیشمەت",
      KU: "د. بنار یادگار حیشمەت"
    },
    specialty: {
      EN: "Cardiology, Catheterization & Echo",
      AR: "أمراض القلب والقسطرة وإيكو القلب",
      KU: "دڵ و قەستەرە و ئیکۆی دڵ"
    },
    specialtyKey: "cardiology",
    hours: {
      EN: "4:00 PM - 8:00 PM",
      AR: "4:00 عصراً - 8:00 مساءً",
      KU: "٤:٠٠ی ئێوارە - ٨:٠٠ی شەو"
    },
    days: {
      EN: "Saturday - Thursday",
      AR: "السبت - الخميس",
      KU: "شەممە - پێنجشەممە"
    }
  },
  {
    id: "9",
    name: {
      EN: "Dr. Ammar Ahmed Barzanji",
      AR: "د. عەمار ئەحمەد بەرزنجی",
      KU: "د. عەمار ئەحمەد بەرزنجی"
    },
    specialty: {
      EN: "Ophthalmology & Eye Surgery",
      AR: "أمراض وجراحة العيون",
      KU: "نەشتەرگەری و نەخۆشیەکانی چاو"
    },
    specialtyKey: "ophthalm",
    hours: {
      EN: "9:00 AM - 1:00 PM & 4:00 PM - 7:30 PM",
      AR: "9:00 صباحاً - 1:00 ظهراً ومن 4:00 عصراً - 7:30 مساءً",
      KU: "٩:٠٠ی بەیانی - ١:٠٠ی نیوەڕۆ & ٤:٠٠ی ئێوارە - ٧:٣٠ی ئێوارە"
    },
    days: {
      EN: "Saturday - Thursday",
      AR: "السبت - الخميس",
      KU: "شەممە - پێنجشەممە"
    }
  }
];

export interface Department {
  id: string;
  name: Record<'EN' | 'AR' | 'KU', string>;
  icon: string;
  descKey: 'emergencyServiceDesc' | 'clinicsDesc' | 'surgeryDesc' | 'labDesc' | 'radDesc' | 'pharmacyDesc' | 'nicuDesc';
  tag?: string;
}

export const departmentsList: Department[] = [
  {
    id: "dep-1",
    name: {
      EN: "Emergency Care",
      AR: "فریاگوزاری (Emergency)",
      KU: "فریاگوزاری"
    },
    icon: "Activity",
    descKey: "emergencyServiceDesc",
    tag: "24/7"
  },
  {
    id: "dep-2",
    name: {
      EN: "Outpatient Clinics",
      AR: "عيادات خارجية (Clinics)",
      KU: "کلینیک"
    },
    icon: "Stethoscope",
    descKey: "clinicsDesc"
  },
  {
    id: "dep-3",
    name: {
      EN: "Surgery & Operating Theaters",
      AR: "نەشتەرگەری (Surgery)",
      KU: "نەشتەرگەری"
    },
    icon: "Layers",
    descKey: "surgeryDesc"
  },
  {
    id: "dep-4",
    name: {
      EN: "Laboratory",
      AR: "تاقیگە (Laboratory)",
      KU: "تاقیگە"
    },
    icon: "FlaskConical",
    descKey: "labDesc"
  },
  {
    id: "dep-5",
    name: {
      EN: "Radiology & Imaging",
      AR: "تیشک (Radiology)",
      KU: "تیشک"
    },
    icon: "ScanFace",
    descKey: "radDesc"
  },
  {
    id: "dep-6",
    name: {
      EN: "Pharmacy",
      AR: "دەرمانخانە (Pharmacy)",
      KU: "دەرمانخانە"
    },
    icon: "Pills",
    descKey: "pharmacyDesc",
    tag: "24/7"
  }
];
