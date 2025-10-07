import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EquipmentCardProps {
  name: string;
  image: string;
  price: string;
  availableSlots: string[];
  description: string;
  location?: string;
}

export function EquipmentCard({ name, image, price, availableSlots, description, location }: EquipmentCardProps) {
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestRental = async () => {
    setIsRequesting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to request equipment rental.",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      const { error } = await supabase
        .from('rental_requests')
        .insert({
          user_id: user.id,
          equipment_name: name,
          equipment_price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "Your rental request has been sent to the admin for approval.",
      });
    } catch (error) {
      console.error('Error creating rental request:', error);
      toast({
        title: "Error",
        description: "Failed to submit rental request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Card className="overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="secondary" className="text-primary font-semibold">
            <DollarSign className="h-3 w-3 mr-1" />
            {price}/day
          </Badge>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
        {location && (
          <p className="text-xs text-muted-foreground">📍 {location}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <div className="flex items-center text-sm font-medium mb-2">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              Available Slots
            </div>
            <div className="flex flex-wrap gap-1">
              {availableSlots.slice(0, 3).map((slot, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {slot}
                </Badge>
              ))}
              {availableSlots.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{availableSlots.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Calendar className="h-4 w-4 mr-1" />
              View Schedule
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              className="flex-1"
              onClick={handleRequestRental}
              disabled={isRequesting}
            >
              {isRequesting ? 'Requesting...' : 'Request Rental'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}