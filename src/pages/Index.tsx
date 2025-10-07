import { useState } from 'react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Navbar } from '@/components/Navbar';
import { LanguageProvider, LanguageCode } from '@/contexts/LanguageContext';
import Home from './Home';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | ''>('');

  const handleLanguageSelect = (language: LanguageCode) => {
    setSelectedLanguage(language);
  };

  // Show language selector first, then the main app
  if (!selectedLanguage) {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Home />
      </div>
    </LanguageProvider>
  );
};

export default Index;
