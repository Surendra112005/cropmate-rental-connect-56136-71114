import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Phone, Calendar, Package, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Profile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

interface RentalRequest {
  id: string;
  equipment_name: string;
  equipment_price: number;
  status: string;
  request_date: string;
  response_date: string | null;
  admin_notes: string | null;
}

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [rentalHistory, setRentalHistory] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndFetchData();

    // Subscribe to real-time updates for rental requests
    const channel = supabase
      .channel('rental-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rental_requests',
        },
        () => {
          // Refresh data when rental requests are updated
          checkAuthAndFetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch rental history
      const { data: rentalData, error: rentalError } = await supabase
        .from('rental_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('request_date', { ascending: false });

      if (rentalError) throw rentalError;
      setRentalHistory(rentalData || []);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold">My Profile</h1>
        </div>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your account details and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{profile?.full_name || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{profile?.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile?.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rental History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Rental History
            </CardTitle>
            <CardDescription>Your equipment rental requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            {rentalHistory.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No rental requests yet</p>
                <Button 
                  variant="link" 
                  onClick={() => navigate('/equipment')}
                  className="mt-2"
                >
                  Browse Equipment
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {rentalHistory.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{request.equipment_name}</h3>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Price: ${request.equipment_price}/day</p>
                        <p>Requested: {new Date(request.request_date).toLocaleDateString()}</p>
                        {request.response_date && (
                          <p>Responded: {new Date(request.response_date).toLocaleDateString()}</p>
                        )}
                        {request.admin_notes && (
                          <p className="text-foreground mt-2">
                            <span className="font-medium">Admin Notes:</span> {request.admin_notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
