import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EquipmentCard } from '@/components/EquipmentCard';
import { Users, Tractor, HandHeart, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Import equipment images
import tractorImg from '@/assets/tractor.jpg';
import harvesterImg from '@/assets/harvester.jpg';
import tillerImg from '@/assets/tiller.jpg';
import rotavatorImg from '@/assets/rotavator.jpg';
import seedDrillImg from '@/assets/seed-drill.jpg';
import sprayerImg from '@/assets/sprayer.jpg';

export default function Home() {
  const { t } = useLanguage();

  const featuredEquipment = [
    {
      name: 'Tractor',
      image: tractorImg,
      price: '₹1,500',
      description: t('equipment.heavyDutyTractor'),
      availableSlots: ['6:00 AM - 12:00 PM', '2:00 PM - 6:00 PM', 'Tomorrow 8:00 AM'],
      location: 'Bangalore, Karnataka'
    },
    {
      name: 'Harvester',
      image: harvesterImg,
      price: '₹2,500',
      description: t('equipment.combineHarvester'),
      availableSlots: ['5:00 AM - 11:00 AM', 'Day after tomorrow', 'Next week'],
      location: 'Mysore, Karnataka'
    },
    {
      name: 'Seed Drill',
      image: seedDrillImg,
      price: '₹800',
      description: t('equipment.automaticSeedDrill'),
      availableSlots: ['7:00 AM - 1:00 PM', '3:00 PM - 7:00 PM'],
      location: 'Mandya, Karnataka'
    }
  ];

  const features = [
    {
      icon: Users,
      title: t('home.features.connect.title'),
      description: t('home.features.connect.description')
    },
    {
      icon: Tractor,
      title: t('home.features.modern.title'),
      description: t('home.features.modern.description')
    },
    {
      icon: HandHeart,
      title: t('home.features.community.title'),
      description: t('home.features.community.description')
    }
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              {t('home.hero.title')} <span className="text-accent">CROPMATE</span>
            </h1>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
              <br />
              <span className="text-accent font-semibold">{t('home.hero.tagline')}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/renters">
                <Button variant="default" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  {t('home.hero.needEquipment')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/providers">
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  {t('home.hero.haveEquipment')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('home.features.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-in">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('home.featured.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.featured.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredEquipment.map((equipment, index) => (
              <EquipmentCard key={index} {...equipment} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/equipment">
              <Button variant="hero" size="lg">
                {t('home.featured.viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('home.howItWorks.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.howItWorks.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Equipment Providers */}
            <Card className="shadow-medium">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">{t('home.howItWorks.providers.title')}</CardTitle>
                <CardDescription>{t('home.howItWorks.providers.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('home.steps.login')}</h4>
                    <p className="text-sm text-muted-foreground">{t('home.steps.loginDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('home.steps.upload')}</h4>
                    <p className="text-sm text-muted-foreground">{t('home.steps.uploadDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('home.steps.manage')}</h4>
                    <p className="text-sm text-muted-foreground">{t('home.steps.manageDesc')}</p>
                  </div>
                </div>
                <Link to="/providers">
                  <Button variant="hero" className="w-full mt-4">
                    {t('home.steps.startRentingOut')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* For Equipment Renters */}
            <Card className="shadow-medium">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">{t('home.howItWorks.renters.title')}</CardTitle>
                <CardDescription>{t('home.howItWorks.renters.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('home.steps.login')}</h4>
                    <p className="text-sm text-muted-foreground">{t('home.steps.loginDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('home.steps.browse')}</h4>
                    <p className="text-sm text-muted-foreground">{t('home.steps.browseDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('home.steps.request')}</h4>
                    <p className="text-sm text-muted-foreground">{t('home.steps.requestDesc')}</p>
                  </div>
                </div>
                <Link to="/renters">
                  <Button variant="hero" className="w-full mt-4">
                    {t('home.steps.startRenting')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/renters">
              <Button variant="default" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                {t('home.cta.getRenter')}
              </Button>
            </Link>
            <Link to="/providers">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                {t('home.cta.becomeProvider')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}