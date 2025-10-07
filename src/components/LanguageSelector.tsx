import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { languages, LanguageCode } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  onLanguageSelect: (language: LanguageCode) => void;
}

export function LanguageSelector({ onLanguageSelect }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | ''>('');

  const handleLanguageSelect = (languageCode: LanguageCode) => {
    setSelectedLanguage(languageCode);
    onLanguageSelect(languageCode);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-strong animate-fade-in">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-12 w-12 text-primary mr-3" />
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CROPMATE
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Agricultural Equipment Rental Platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-6">
            Choose Your Language / भाषा चुनें / ಭಾಷೆಯನ್ನು ಆರಿಸಿ
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant={selectedLanguage === language.code ? "hero" : "outline"}
                size="lg"
                onClick={() => handleLanguageSelect(language.code)}
                className="w-full justify-start text-left h-auto p-4 animate-slide-in"
              >
                <div className="flex flex-col items-start">
                  <span className="font-semibold">{language.name}</span>
                  <span className="text-sm opacity-90">{language.nativeName}</span>
                </div>
              </Button>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Select your preferred language to continue
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}