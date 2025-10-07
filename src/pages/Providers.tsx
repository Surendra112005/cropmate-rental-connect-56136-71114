import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Upload, Calendar, DollarSign, Shield, Info } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Generate Additional Income',
    description: 'Earn money from your idle equipment. Average providers make ₹15,000-30,000 per month.'
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Set your own availability. You control when and how your equipment is rented.'
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'All transactions are secure and we provide support for any issues that arise.'
  }
];

const steps = [
  {
    step: '1',
    title: 'Login with Gmail',
    description: 'Quick and secure authentication using your Google account'
  },
  {
    step: '2',
    title: 'Upload Equipment Details',
    description: 'Add photos, specifications, rental rates, and availability schedules'
  },
  {
    step: '3',
    title: 'Receive Booking Requests',
    description: 'Get notifications when farmers want to rent your equipment'
  },
  {
    step: '4',
    title: 'Approve & Earn',
    description: 'Accept bookings and start earning from your equipment rentals'
  }
];

export default function Providers() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Become an Equipment Provider
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Turn your unused agricultural equipment into a source of steady income while helping fellow farmers
          </p>
          <Alert className="bg-primary-foreground/10 border-primary-foreground/20 mb-8">
            <Info className="h-4 w-4 text-primary-foreground" />
            <AlertDescription className="text-primary-foreground/90">
              To provide equipment rentals, you'll need to connect your account through our Supabase integration 
              for secure authentication and booking management.
            </AlertDescription>
          </Alert>
          <Button variant="default" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Get Started as Provider
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Rent Out Your Equipment?</h2>
            <p className="text-muted-foreground text-lg">Join hundreds of farmers already earning from their equipment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Simple steps to start earning from your equipment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-in">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Equipment We Accept</h2>
            <p className="text-muted-foreground text-lg">All types of agricultural machinery are welcome</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Tractors',
              'Harvesters',
              'Tillers',
              'Rotavators',
              'Seed Drills',
              'Sprayers',
              'Threshing Machines',
              'Fertilizer Spreaders',
              'Weeders',
              'Grain Dryers'
            ].map((equipment, index) => (
              <Card key={index} className="text-center p-4 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">{equipment}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16 bg-gradient-earth">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-strong">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">Pricing Guidelines</CardTitle>
              <CardDescription>Suggested rental rates for different equipment types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Heavy Equipment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tractor (40-60 HP)</span>
                      <span className="font-medium">₹1,200-1,800/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Harvester</span>
                      <span className="font-medium">₹2,000-3,000/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Threshing Machine</span>
                      <span className="font-medium">₹1,000-1,500/day</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Smaller Equipment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tiller/Rotavator</span>
                      <span className="font-medium">₹600-1,000/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seed Drill</span>
                      <span className="font-medium">₹600-900/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sprayer</span>
                      <span className="font-medium">₹300-500/day</span>
                    </div>
                  </div>
                </div>
              </div>
              <Alert className="mt-6">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  These are suggested rates. You can set your own pricing based on equipment condition, 
                  local demand, and operating costs.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Requirements</h2>
            <p className="text-muted-foreground text-lg">What you need to get started</p>
          </div>
          <Card className="shadow-medium">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Equipment Requirements
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Working agricultural equipment</li>
                    <li>• Regular maintenance records</li>
                    <li>• Clear ownership documentation</li>
                    <li>• Insurance coverage (recommended)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Provider Requirements
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Gmail account for authentication</li>
                    <li>• Valid contact information</li>
                    <li>• Location within service area</li>
                    <li>• Willingness to train renters (if needed)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join CROPMATE today and turn your idle equipment into a profitable business opportunity.
          </p>
          <Alert className="bg-primary-foreground/10 border-primary-foreground/20 mb-8">
            <Info className="h-4 w-4 text-primary-foreground" />
            <AlertDescription className="text-primary-foreground/90">
              <strong>Note:</strong> To enable full provider functionality including equipment upload and booking management, 
              you'll need to connect to our secure Supabase backend integration.
            </AlertDescription>
          </Alert>
          <Button variant="default" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Upload className="mr-2 h-5 w-5" />
            Start Listing Equipment
          </Button>
        </div>
      </section>
    </div>
  );
}