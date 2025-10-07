import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Target, Users, Tractor, Award, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Heart,
    title: 'Community First',
    description: 'We prioritize the needs of farming communities and work to create sustainable solutions that benefit everyone.'
  },
  {
    icon: Target,
    title: 'Mission Driven',
    description: 'Our mission is to make modern agricultural equipment accessible to all farmers, regardless of their scale of operation.'
  },
  {
    icon: Users,
    title: 'Farmer Focused',
    description: 'Every decision we make is centered around supporting farmers and improving agricultural productivity.'
  }
];

const impact = [
  { number: '1000+', label: 'Farmers Connected' },
  { number: '500+', label: 'Equipment Listed' },
  { number: '50+', label: 'Villages Served' },
  { number: '₹10L+', label: 'Savings Generated' }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            About CROPMATE
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Bridging the gap between farmers to create a more sustainable and efficient agricultural ecosystem
          </p>
          <Badge variant="secondary" className="text-primary text-lg px-4 py-2">
            <Tractor className="h-4 w-4 mr-2" />
            Empowering Agriculture Since 2024
          </Badge>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                CROPMATE was born from a simple yet powerful observation: many large-scale farmers have expensive 
                agricultural equipment that sits idle for significant periods, while small-scale farmers struggle 
                to access the modern tools they need to improve their productivity and income.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our platform creates a win-win solution by connecting these two groups, enabling equipment owners 
                to generate additional income from their investments while providing small-scale farmers with 
                affordable access to professional-grade agricultural machinery.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Equipment Sharing</Badge>
                <Badge variant="outline">Community Building</Badge>
                <Badge variant="outline">Sustainable Farming</Badge>
                <Badge variant="outline">Technology Innovation</Badge>
              </div>
            </div>
            <Card className="shadow-strong animate-fade-in">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  To become the leading agricultural equipment sharing platform in India, 
                  democratizing access to modern farming technology and creating a thriving 
                  ecosystem where every farmer can succeed.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-muted-foreground text-lg">Making a difference in farming communities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impact.map((stat, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-in">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 bg-gradient-earth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How We Support Farmers</h2>
            <p className="text-muted-foreground text-lg">Creating opportunities for both equipment owners and renters</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Large-scale Farmers */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Tractor className="h-5 w-5" />
                  For Large-scale Farmers
                </CardTitle>
                <CardDescription>Equipment owners and providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Monetize Idle Equipment</h4>
                      <p className="text-sm text-muted-foreground">Turn your unused machinery into a source of additional income</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Flexible Scheduling</h4>
                      <p className="text-sm text-muted-foreground">Set your own availability and rental terms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Community Impact</h4>
                      <p className="text-sm text-muted-foreground">Help fellow farmers while generating returns</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Small-scale Farmers */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  For Small-scale Farmers
                </CardTitle>
                <CardDescription>Equipment renters and users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Affordable Access</h4>
                      <p className="text-sm text-muted-foreground">Rent modern equipment at fraction of purchase cost</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Increased Productivity</h4>
                      <p className="text-sm text-muted-foreground">Access to professional-grade machinery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Local Availability</h4>
                      <p className="text-sm text-muted-foreground">Find equipment in your local area</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Serving Karnataka</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Currently operating across Karnataka with plans to expand to other states. 
            We're proud to support the farming communities in cities like Bangalore, Mysore, 
            Hassan, Tumkur, Mandya, and many more.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="outline">Bangalore</Badge>
            <Badge variant="outline">Mysore</Badge>
            <Badge variant="outline">Hassan</Badge>
            <Badge variant="outline">Mandya</Badge>
            <Badge variant="outline">Tumkur</Badge>
            <Badge variant="outline">Belgaum</Badge>
            <Badge variant="outline">Hubli</Badge>
            <Badge variant="outline">Chitradurga</Badge>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Join the CROPMATE Community
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Whether you're looking to rent out equipment or need access to farming tools, 
            we're here to support your agricultural journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/providers">
              <Button variant="default" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Become a Provider
              </Button>
            </Link>
            <Link to="/renters">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Find Equipment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}