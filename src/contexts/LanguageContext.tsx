import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LanguageCode = 'en' | 'kn' | 'te' | 'hi' | 'ta';

interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
];

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  const setLanguage = (language: LanguageCode) => {
    setCurrentLanguage(language);
    localStorage.setItem('cropmate_language', language);
  };

  const t = (key: string): string => {
    return getTranslation(key, currentLanguage);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation function
function getTranslation(key: string, language: LanguageCode): string {
  const translations = getTranslations(language);
  return translations[key] || key;
}

// Translation data
function getTranslations(language: LanguageCode): Record<string, string> {
  const translationData: Record<LanguageCode, Record<string, string>> = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.equipment': 'Equipment',
      'nav.about': 'About',
      'nav.providers': 'Providers',
      'nav.contact': 'Contact',
      
      // Language Selector
      'lang.title': 'Choose Your Language',
      'lang.subtitle': 'Select your preferred language to continue',
      'lang.description': 'Agricultural Equipment Rental Platform',
      
      // Home Page
      'home.hero.title': 'Welcome to',
      'home.hero.subtitle': 'Connecting large-scale farmers with unused equipment to small-scale farmers who need affordable tools.',
      'home.hero.tagline': 'Empowering Agriculture Together.',
      'home.hero.needEquipment': 'I Need Equipment',
      'home.hero.haveEquipment': 'I Have Equipment to Rent',
      
      'home.features.title': 'Why Choose CROPMATE?',
      'home.features.subtitle': 'Supporting farmers with modern agricultural solutions',
      'home.features.connect.title': 'Connect Farmers',
      'home.features.connect.description': 'Bridge the gap between equipment owners and those who need tools',
      'home.features.modern.title': 'Modern Equipment',
      'home.features.modern.description': 'Access to latest agricultural machinery and equipment',
      'home.features.community.title': 'Community Support',
      'home.features.community.description': 'Supporting small-scale farmers with affordable rental options',
      
      'home.featured.title': 'Featured Equipment',
      'home.featured.subtitle': 'Available for rent in your area',
      'home.featured.viewAll': 'View All Equipment',
      
      'home.howItWorks.title': 'How CROPMATE Works',
      'home.howItWorks.subtitle': 'Simple steps to get started',
      'home.howItWorks.providers.title': 'For Equipment Providers',
      'home.howItWorks.providers.subtitle': 'Large-scale farmers with unused equipment',
      'home.howItWorks.renters.title': 'For Equipment Renters',
      'home.howItWorks.renters.subtitle': 'Small-scale farmers needing affordable tools',
      
      'home.steps.login': 'Login with Gmail',
      'home.steps.loginDesc': 'Quick and secure authentication',
      'home.steps.upload': 'Upload Equipment Details',
      'home.steps.uploadDesc': 'Add images, pricing, and availability',
      'home.steps.manage': 'Manage Bookings',
      'home.steps.manageDesc': 'Accept requests and earn income',
      'home.steps.browse': 'Browse Equipment',
      'home.steps.browseDesc': 'View prices and available time slots',
      'home.steps.request': 'Request Rental',
      'home.steps.requestDesc': 'Book equipment when you need it',
      
      'home.steps.startRentingOut': 'Start Renting Out Equipment',
      'home.steps.startRenting': 'Start Renting Equipment',
      
      'home.cta.title': 'Ready to Transform Your Farming?',
      'home.cta.subtitle': 'Join thousands of farmers already using CROPMATE to access affordable agricultural equipment.',
      'home.cta.getRenter': 'Get Started as Renter',
      'home.cta.becomeProvider': 'Become a Provider',
      
      // Equipment
      'equipment.heavyDutyTractor': 'Heavy-duty tractor for plowing and field preparation',
      'equipment.combineHarvester': 'Combine harvester for wheat, rice, and grain crops',
      'equipment.automaticSeedDrill': 'Automatic seed drill for precise sowing',
    },
    
    kn: {
      // Navigation
      'nav.home': 'ಮುಖ್ಯ',
      'nav.equipment': 'ಯಂತ್ರೋಪಕರಣಗಳು',
      'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
      'nav.providers': 'ಪೂರೈಕೆದಾರರು',
      'nav.contact': 'ಸಂಪರ್ಕ',
      
      // Language Selector
      'lang.title': 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
      'lang.subtitle': 'ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ',
      'lang.description': 'ಕೃಷಿ ಯಂತ್ರೋಪಕರಣ ಬಾಡಿಗೆ ವೇದಿಕೆ',
      
      // Home Page
      'home.hero.title': 'ಕ್ರಾಪ್‌ಮೇಟ್‌ಗೆ ಸ್ವಾಗತ',
      'home.hero.subtitle': 'ಬಳಕೆಯಾಗದ ಉಪಕರಣಗಳನ್ನು ಹೊಂದಿರುವ ದೊಡ್ಡ ಪ್ರಮಾಣದ ರೈತರನ್ನು ಕೈಗೆಟುಕುವ ಉಪಕರಣಗಳ ಅಗತ್ಯವಿರುವ ಸಣ್ಣ ಪ್ರಮಾಣದ ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು.',
      'home.hero.tagline': 'ಒಟ್ಟಾಗಿ ಕೃಷಿಯನ್ನು ಶಕ್ತಿಯುತಗೊಳಿಸುವುದು.',
      'home.hero.needEquipment': 'ನನಗೆ ಉಪಕರಣಗಳು ಬೇಕು',
      'home.hero.haveEquipment': 'ನನ್ನಲ್ಲಿ ಬಾಡಿಗೆಗೆ ಉಪಕರಣಗಳಿವೆ',
      
      'home.features.title': 'ಕ್ರಾಪ್‌ಮೇಟ್ ಅನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?',
      'home.features.subtitle': 'ಆಧುನಿಕ ಕೃಷಿ ಪರಿಹಾರಗಳೊಂದಿಗೆ ರೈತರನ್ನು ಬೆಂಬಲಿಸುವುದು',
      'home.features.connect.title': 'ರೈತರನ್ನು ಸಂಪರ್ಕಿಸಿ',
      'home.features.connect.description': 'ಉಪಕರಣ ಮಾಲೀಕರು ಮತ್ತು ಉಪಕರಣಗಳ ಅಗತ್ಯವಿರುವವರ ನಡುವಿನ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡಿ',
      'home.features.modern.title': 'ಆಧುನಿಕ ಉಪಕರಣಗಳು',
      'home.features.modern.description': 'ಇತ್ತೀಚಿನ ಕೃಷಿ ಯಂತ್ರೋಪಕರಣ ಮತ್ತು ಉಪಕರಣಗಳಿಗೆ ಪ್ರವೇಶ',
      'home.features.community.title': 'ಸಮುದಾಯ ಬೆಂಬಲ',
      'home.features.community.description': 'ಕೈಗೆಟುಕುವ ಬಾಡಿಗೆ ಆಯ್ಕೆಗಳೊಂದಿಗೆ ಸಣ್ಣ ಪ್ರಮಾಣದ ರೈತರನ್ನು ಬೆಂಬಲಿಸುವುದು',
      
      'home.featured.title': 'ವಿಶೇಷ ಉಪಕರಣಗಳು',
      'home.featured.subtitle': 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಬಾಡಿಗೆಗೆ ಲಭ್ಯ',
      'home.featured.viewAll': 'ಎಲ್ಲಾ ಉಪಕರಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      
      'home.howItWorks.title': 'ಕ್ರಾಪ್‌ಮೇಟ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
      'home.howItWorks.subtitle': 'ಪ್ರಾರಂಭಿಸಲು ಸರಳ ಹಂತಗಳು',
      'home.howItWorks.providers.title': 'ಉಪಕರಣ ಪೂರೈಕೆದಾರರಿಗಾಗಿ',
      'home.howItWorks.providers.subtitle': 'ಬಳಕೆಯಾಗದ ಉಪಕರಣಗಳನ್ನು ಹೊಂದಿರುವ ದೊಡ್ಡ ಪ್ರಮಾಣದ ರೈತರು',
      'home.howItWorks.renters.title': 'ಉಪಕರಣ ಬಾಡಿಗೆದಾರರಿಗಾಗಿ',
      'home.howItWorks.renters.subtitle': 'ಕೈಗೆಟುಕುವ ಉಪಕರಣಗಳ ಅಗತ್ಯವಿರುವ ಸಣ್ಣ ಪ್ರಮಾಣದ ರೈತರು',
      
      'home.steps.login': 'Gmail ನೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ',
      'home.steps.loginDesc': 'ತ್ವರಿತ ಮತ್ತು ಸುರಕ್ಷಿತ ದೃಢೀಕರಣ',
      'home.steps.upload': 'ಉಪಕರಣ ವಿವರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      'home.steps.uploadDesc': 'ಚಿತ್ರಗಳು, ಬೆಲೆ ಮತ್ತು ಲಭ್ಯತೆಯನ್ನು ಸೇರಿಸಿ',
      'home.steps.manage': 'ಬುಕಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
      'home.steps.manageDesc': 'ವಿನಂತಿಗಳನ್ನು ಸ್ವೀಕರಿಸಿ ಮತ್ತು ಆದಾಯ ಗಳಿಸಿ',
      'home.steps.browse': 'ಉಪಕರಣಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
      'home.steps.browseDesc': 'ಬೆಲೆಗಳು ಮತ್ತು ಲಭ್ಯವಿರುವ ಸಮಯ ಸ್ಲಾಟ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      'home.steps.request': 'ಬಾಡಿಗೆ ವಿನಂತಿ',
      'home.steps.requestDesc': 'ನಿಮಗೆ ಅಗತ್ಯವಿದ್ದಾಗ ಉಪಕರಣವನ್ನು ಬುಕ್ ಮಾಡಿ',
      
      'home.steps.startRentingOut': 'ಉಪಕರಣಗಳನ್ನು ಬಾಡಿಗೆಗೆ ನೀಡಲು ಪ್ರಾರಂಭಿಸಿ',
      'home.steps.startRenting': 'ಉಪಕರಣಗಳನ್ನು ಬಾಡಿಗೆಗೆ ತೆಗೆದುಕೊಳ್ಳಲು ಪ್ರಾರಂಭಿಸಿ',
      
      'home.cta.title': 'ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಪರಿವರ್ತಿಸಲು ಸಿದ್ಧರೇ?',
      'home.cta.subtitle': 'ಕೈಗೆಟುಕುವ ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ಈಗಾಗಲೇ ಕ್ರಾಪ್‌ಮೇಟ್ ಬಳಸುತ್ತಿರುವ ಸಾವಿರಾರು ರೈತರೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ.',
      'home.cta.getRenter': 'ಬಾಡಿಗೆದಾರನಾಗಿ ಪ್ರಾರಂಭಿಸಿ',
      'home.cta.becomeProvider': 'ಪೂರೈಕೆದಾರನಾಗಿ',
      
      // Equipment
      'equipment.heavyDutyTractor': 'ಉಳುಮೆ ಮತ್ತು ಕ್ಷೇತ್ರ ಸಿದ್ಧತೆಗಾಗಿ ಭಾರೀ ಯಂತ್ರ ಟ್ರಾಕ್ಟರ್',
      'equipment.combineHarvester': 'ಗೋಧಿ, ಅಕ್ಕಿ ಮತ್ತು ಧಾನ್ಯ ಬೆಳೆಗಳಿಗಾಗಿ ಸಂಯೋಜಿತ ಹಾರ್ವೆಸ್ಟರ್',
      'equipment.automaticSeedDrill': 'ನಿಖರವಾದ ಬಿತ್ತನೆಗಾಗಿ ಸ್ವಯಂಚಾಲಿತ ಬೀಜ ಡ್ರಿಲ್',
    },
    
    te: {
      // Navigation
      'nav.home': 'హోమ్',
      'nav.equipment': 'పరికరాలు',
      'nav.about': 'మా గురించి',
      'nav.providers': 'ప్రొవైడర్లు',
      'nav.contact': 'సంప్రదింపులు',
      
      // Language Selector
      'lang.title': 'మీ భాషను ఎంచుకోండి',
      'lang.subtitle': 'కొనసాగించడానికి మీ ప్రాధాన్య భాషను ఎంచుకోండి',
      'lang.description': 'వ్యవసాయ పరికరాల అద్దె వేదిక',
      
      // Home Page
      'home.hero.title': 'క్రాప్‌మేట్‌కు స్వాగతం',
      'home.hero.subtitle': 'ఉపయోగించని పరికరాలను కలిగి ఉన్న పెద్ద-స్థాయి రైతులను సరసమైన సాధనాలు అవసరమైన చిన్న-స్థాయి రైతులతో కలుపుతోంది.',
      'home.hero.tagline': 'కలిసి వ్యవసాయాన్ని శక్తివంతం చేయడం.',
      'home.hero.needEquipment': 'నాకు పరికరాలు కావాలి',
      'home.hero.haveEquipment': 'నా దగ్గర అద్దెకు పరికరాలు ఉన్నాయి',
      
      'home.features.title': 'క్రాప్‌మేట్‌ను ఎందుకు ఎంచుకోవాలి?',
      'home.features.subtitle': 'ఆధునిక వ్యవసాయ పరిష్కారాలతో రైతులకు మద్దతు',
      'home.features.connect.title': 'రైతులను కనెక్ట్ చేయండి',
      'home.features.connect.description': 'పరికరాల యజమానులు మరియు సాధనాలు అవసరమైన వారి మధ్య అంతరాన్ని తగ్గించండి',
      'home.features.modern.title': 'ఆధునిక పరికరాలు',
      'home.features.modern.description': 'తాజా వ్యవసాయ యంత్రాలు మరియు పరికరాలకు ప్రవేశం',
      'home.features.community.title': 'కమ్యూనిటీ మద్దతు',
      'home.features.community.description': 'సరసమైన అద్దె ఎంపికలతో చిన్న-స్థాయి రైతులకు మద్దతు ఇవ్వడం',
      
      'home.featured.title': 'ప్రత్యేక పరికరాలు',
      'home.featured.subtitle': 'మీ ప్రాంతంలో అద్దెకు అందుబాటులో',
      'home.featured.viewAll': 'అన్ని పరికరాలను చూడండి',
      
      'home.howItWorks.title': 'క్రాప్‌మేట్ ఎలా పని చేస్తుంది',
      'home.howItWorks.subtitle': 'ప్రారంభించడానికి సులభ దశలు',
      'home.howItWorks.providers.title': 'పరికరాల ప్రొవైడర్లకు',
      'home.howItWorks.providers.subtitle': 'ఉపయోగించని పరికరాలతో పెద్ద-స్థాయి రైతులు',
      'home.howItWorks.renters.title': 'పరికరాల అద్దెదారులకు',
      'home.howItWorks.renters.subtitle': 'సరసమైన సాధనాలు అవసరమైన చిన్న-స్థాయి రైతులు',
      
      'home.steps.login': 'Gmail తో లాగిన్ చేయండి',
      'home.steps.loginDesc': 'వేగవంతమైన మరియు సురక్షితమైన ప్రమాణీకరణ',
      'home.steps.upload': 'పరికరాల వివరాలను అప్‌లోడ్ చేయండి',
      'home.steps.uploadDesc': 'చిత్రాలు, ధర మరియు అందుబాటును జోడించండి',
      'home.steps.manage': 'బుకింగ్‌లను నిర్వహించండి',
      'home.steps.manageDesc': 'అభ్యర్థనలను అంగీకరించి ఆదాయం పొందండి',
      'home.steps.browse': 'పరికరాలను బ్రౌజ్ చేయండి',
      'home.steps.browseDesc': 'ధరలు మరియు అందుబాటులో ఉన్న సమయ స్లాట్‌లను చూడండి',
      'home.steps.request': 'అద్దె అభ్యర్థన',
      'home.steps.requestDesc': 'మీకు అవసరమైనప్పుడు పరికరాన్ని బుక్ చేయండి',
      
      'home.steps.startRentingOut': 'పరికరాలను అద్దెకు ఇవ్వడం ప్రారంభించండి',
      'home.steps.startRenting': 'పరికరాలను అద్దెకు తీసుకోవడం ప్రారంభించండి',
      
      'home.cta.title': 'మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?',
      'home.cta.subtitle': 'సరసమైన వ్యవసాయ పరికరాలను యాక్సెస్ చేయడానికి ఇప్పటికే క్రాప్‌మేట్‌ను ఉపయోగిస్తున్న వేలాది రైతులతో చేరండి.',
      'home.cta.getRenter': 'అద్దెదారుగా ప్రారంభించండి',
      'home.cta.becomeProvider': 'ప్రొవైడర్ అవ్వండి',
      
      // Equipment
      'equipment.heavyDutyTractor': 'దున్నుట మరియు క్షేత్ర తయారీకి హెవీ-డ్యూటీ ట్రాక్టర్',
      'equipment.combineHarvester': 'గోధుమలు, వరి మరియు ధాన్య పంటలకు కంబైన్ హార్వెస్టర్',
      'equipment.automaticSeedDrill': 'ఖచ్చితమైన విత్తనం కోసం ఆటోమేటిక్ సీడ్ డ్రిల్',
    },
    
    hi: {
      // Navigation
      'nav.home': 'होम',
      'nav.equipment': 'उपकरण',
      'nav.about': 'हमारे बारे में',
      'nav.providers': 'प्रदाता',
      'nav.contact': 'संपर्क',
      
      // Language Selector
      'lang.title': 'अपनी भाषा चुनें',
      'lang.subtitle': 'जारी रखने के लिए अपनी पसंदीदा भाषा चुनें',
      'lang.description': 'कृषि उपकरण किराया प्लेटफॉर्म',
      
      // Home Page
      'home.hero.title': 'क्रॉपमेट में आपका स्वागत है',
      'home.hero.subtitle': 'बड़े पैमाने के किसानों को जिनके पास अप्रयुक्त उपकरण हैं, छोटे पैमाने के किसानों से जोड़ना जिन्हें किफायती उपकरणों की आवश्यकता है।',
      'home.hero.tagline': 'मिलकर कृषि को सशक्त बनाना।',
      'home.hero.needEquipment': 'मुझे उपकरण चाहिए',
      'home.hero.haveEquipment': 'मेरे पास किराए के लिए उपकरण हैं',
      
      'home.features.title': 'क्रॉपमेट को क्यों चुनें?',
      'home.features.subtitle': 'आधुनिक कृषि समाधानों के साथ किसानों का समर्थन',
      'home.features.connect.title': 'किसानों को जोड़ें',
      'home.features.connect.description': 'उपकरण मालिकों और उपकरणों की आवश्यकता वाले लोगों के बीच की खाई को पाटें',
      'home.features.modern.title': 'आधुनिक उपकरण',
      'home.features.modern.description': 'नवीनतम कृषि मशीनरी और उपकरणों तक पहुंच',
      'home.features.community.title': 'समुदायिक समर्थन',
      'home.features.community.description': 'किफायती किराया विकल्पों के साथ छोटे पैमाने के किसानों का समर्थन',
      
      'home.featured.title': 'विशेष उपकरण',
      'home.featured.subtitle': 'आपके क्षेत्र में किराए के लिए उपलब्ध',
      'home.featured.viewAll': 'सभी उपकरण देखें',
      
      'home.howItWorks.title': 'क्रॉपमेट कैसे काम करता है',
      'home.howItWorks.subtitle': 'शुरू करने के लिए सरल चरण',
      'home.howItWorks.providers.title': 'उपकरण प्रदाताओं के लिए',
      'home.howItWorks.providers.subtitle': 'अप्रयुक्त उपकरणों वाले बड़े पैमाने के किसान',
      'home.howItWorks.renters.title': 'उपकरण किराएदारों के लिए',
      'home.howItWorks.renters.subtitle': 'किफायती उपकरणों की आवश्यकता वाले छोटे पैमाने के किसान',
      
      'home.steps.login': 'Gmail के साथ लॉगिन करें',
      'home.steps.loginDesc': 'त्वरित और सुरक्षित प्रमाणीकरण',
      'home.steps.upload': 'उपकरण विवरण अपलोड करें',
      'home.steps.uploadDesc': 'चित्र, मूल्य और उपलब्धता जोड़ें',
      'home.steps.manage': 'बुकिंग प्रबंधित करें',
      'home.steps.manageDesc': 'अनुरोध स्वीकार करें और आय अर्जित करें',
      'home.steps.browse': 'उपकरण ब्राउज़ करें',
      'home.steps.browseDesc': 'मूल्य और उपलब्ध समय स्लॉट देखें',
      'home.steps.request': 'किराया अनुरोध',
      'home.steps.requestDesc': 'जब आपको आवश्यकता हो तो उपकरण बुक करें',
      
      'home.steps.startRentingOut': 'उपकरण किराए पर देना शुरू करें',
      'home.steps.startRenting': 'उपकरण किराए पर लेना शुरू करें',
      
      'home.cta.title': 'अपनी खेती को बदलने के लिए तैयार हैं?',
      'home.cta.subtitle': 'किफायती कृषि उपकरणों तक पहुंचने के लिए पहले से ही क्रॉपमेट का उपयोग कर रहे हजारों किसानों के साथ जुड़ें।',
      'home.cta.getRenter': 'किराएदार के रूप में शुरू करें',
      'home.cta.becomeProvider': 'प्रदाता बनें',
      
      // Equipment
      'equipment.heavyDutyTractor': 'जुताई और क्षेत्र तैयारी के लिए हेवी-ड्यूटी ट्रैक्टर',
      'equipment.combineHarvester': 'गेहूं, चावल और अनाज की फसलों के लिए कंबाइन हार्वेस्टर',
      'equipment.automaticSeedDrill': 'सटीक बुआई के लिए स्वचालित सीड ड्रिल',
    },
    
    ta: {
      // Navigation
      'nav.home': 'முகப்பு',
      'nav.equipment': 'கருவிகள்',
      'nav.about': 'எங்களைப் பற்றி',
      'nav.providers': 'வழங்குநர்கள்',
      'nav.contact': 'தொடர்பு',
      
      // Language Selector
      'lang.title': 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
      'lang.subtitle': 'தொடர உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்',
      'lang.description': 'விவசாய கருவிகள் வாடகை தளம்',
      
      // Home Page
      'home.hero.title': 'க்ராப்மேட்டிற்கு வரவேற்கிறோம்',
      'home.hero.subtitle': 'பயன்படுத்தப்படாத கருவிகளைக் கொண்ட பெரிய அளவிலான விவசாயிகளை மலிவான கருவிகள் தேவைப்படும் சிறிய அளவிலான விவசாயிகளுடன் இணைக்கிறது.',
      'home.hero.tagline': 'ஒன்றாக விவசாயத்தை வலுப்படுத்துதல்.',
      'home.hero.needEquipment': 'எனக்கு கருவிகள் தேவை',
      'home.hero.haveEquipment': 'என்னிடம் வாடகைக்கு கருவிகள் உள்ளன',
      
      'home.features.title': 'ஏன் க்ராப்மேட்டைத் தேர்ந்தெடுக்க வேண்டும்?',
      'home.features.subtitle': 'நவீன விவசாய தீர்வுகளுடன் விவசாயிகளை ஆதரித்தல்',
      'home.features.connect.title': 'விவசாயிகளை இணைக்கவும்',
      'home.features.connect.description': 'கருவி உரிமையாளர்கள் மற்றும் கருவிகள் தேவைப்படுபவர்களுக்கு இடையிலான இடைவெளியைக் குறைக்கவும்',
      'home.features.modern.title': 'நவீன கருவிகள்',
      'home.features.modern.description': 'சமீபத்திய விவசாய இயந்திரங்கள் மற்றும் கருவிகளுக்கான அணுகல்',
      'home.features.community.title': 'சமூக ஆதரவு',
      'home.features.community.description': 'மலிவான வாடகை விருப்பங்களுடன் சிறிய அளவிலான விவசாயிகளை ஆதரித்தல்',
      
      'home.featured.title': 'சிறப்பு கருவிகள்',
      'home.featured.subtitle': 'உங்கள் பகுதியில் வாடகைக்கு கிடைக்கிறது',
      'home.featured.viewAll': 'அனைத்து கருவிகளையும் பார்க்கவும்',
      
      'home.howItWorks.title': 'க்ராப்மேட் எவ்வாறு செயல்படுகிறது',
      'home.howItWorks.subtitle': 'தொடங்குவதற்கான எளிய படிகள்',
      'home.howItWorks.providers.title': 'கருவி வழங்குநர்களுக்கு',
      'home.howItWorks.providers.subtitle': 'பயன்படுத்தப்படாத கருவிகளைக் கொண்ட பெரிய அளவிலான விவசாயிகள்',
      'home.howItWorks.renters.title': 'கருவி வாடகைதாரர்களுக்கு',
      'home.howItWorks.renters.subtitle': 'மலிவான கருவிகள் தேவைப்படும் சிறிய அளவிலான விவசாயிகள்',
      
      'home.steps.login': 'Gmail உடன் உள்நுழையவும்',
      'home.steps.loginDesc': 'விரைவான மற்றும் பாதுகாப்பான அங்கீகாரம்',
      'home.steps.upload': 'கருவி விவரங்களை பதிவேற்றவும்',
      'home.steps.uploadDesc': 'படங்கள், விலை மற்றும் கிடைக்கும் தன்மையைச் சேர்க்கவும்',
      'home.steps.manage': 'முன்பதிவுகளை நிர்வகிக்கவும்',
      'home.steps.manageDesc': 'கோரிக்கைகளை ஏற்று வருமானம் பெறவும்',
      'home.steps.browse': 'கருவிகளை உலாவ',
      'home.steps.browseDesc': 'விலைகள் மற்றும் கிடைக்கும் நேர ஸ்லாட்டுகளைப் பார்க்கவும்',
      'home.steps.request': 'வாடகை கோரிக்கை',
      'home.steps.requestDesc': 'உங்களுக்குத் தேவைப்படும் போது கருவியை முன்பதிவு செய்யவும்',
      
      'home.steps.startRentingOut': 'கருவிகளை வாடகைக்கு விடுவதைத் தொடங்கவும்',
      'home.steps.startRenting': 'கருவிகளை வாடகைக்கு எடுப்பதைத் தொடங்கவும்',
      
      'home.cta.title': 'உங்கள் விவசாயத்தை மாற்றத் தயாரா?',
      'home.cta.subtitle': 'மலிவான விவசாய கருவிகளை அணுக ஏற்கனவே க்ராப்மேட்டைப் பயன்படுத்தும் ஆயிரக்கணக்கான விவசாயிகளுடன் சேரவும்.',
      'home.cta.getRenter': 'வாடகைதாரராகத் தொடங்கவும்',
      'home.cta.becomeProvider': 'வழங்குநராக மாறவும்',
      
      // Equipment
      'equipment.heavyDutyTractor': 'உழவு மற்றும் வயல் தயாரிப்புக்கான கனரக டிராக்டர்',
      'equipment.combineHarvester': 'கோதுமை, அரிசி மற்றும் தானிய பயிர்களுக்கான கூட்டு அறுவடை இயந்திரம்',
      'equipment.automaticSeedDrill': 'துல்லியமான விதைப்புக்கான தானியங்கி விதை துளைப்பான்',
    }
  };

  return translationData[language] || translationData.en;
}