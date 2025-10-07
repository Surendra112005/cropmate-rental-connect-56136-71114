import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Call us for immediate assistance',
    details: '8792153536',
    availability: 'Mon-Sat, 9 AM - 6 PM'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us your questions',
    details: 'surendravarman77041@mail.com',
    availability: 'We respond within 24 hours'
  },
  {
    icon: MapPin,
    title: 'Service Area',
    description: 'Currently serving across Karnataka',
    details: 'Bangalore, Mysore, Hassan, Mandya, Tumkur and more',
    availability: 'Expanding to other states soon'
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-earth py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact CROPMATE</h1>
          <p className="text-lg text-muted-foreground">
            We're here to help you with all your agricultural equipment rental needs
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="userType">I am a</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="provider">Equipment Provider (Large-scale Farmer)</SelectItem>
                      <SelectItem value="renter">Equipment Renter (Small-scale Farmer)</SelectItem>
                      <SelectItem value="both">Both Provider and Renter</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="equipment">Equipment Related</SelectItem>
                      <SelectItem value="booking">Booking Support</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe your inquiry or issue in detail..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button variant="hero" className="w-full">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about CROPMATE? Need help with equipment rental or listing? 
                  Our team is here to support you every step of the way.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <method.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                          <p className="font-medium text-primary">{method.details}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{method.availability}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQ Section */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">How do I list my equipment?</h4>
                    <p className="text-sm text-muted-foreground">Sign up as a provider, login with Gmail, and upload your equipment details with photos and pricing.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">What if equipment gets damaged?</h4>
                    <p className="text-sm text-muted-foreground">We recommend equipment insurance and provide dispute resolution support.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">How are payments handled?</h4>
                    <p className="text-sm text-muted-foreground">Payments are coordinated between farmers, with platform support for any issues.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Which areas do you serve?</h4>
                    <p className="text-sm text-muted-foreground">Currently across Karnataka, with plans to expand to other agricultural states.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}