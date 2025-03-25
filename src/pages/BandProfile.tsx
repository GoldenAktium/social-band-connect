
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Music, MapPin, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { genres } from '@/components/onboarding/BandDetailsStep';
import { HomeButton } from '@/components/HomeButton';

interface BandProfile {
  id: string;
  name: string;
  genre: string[];
  location: string;
  skillLevel: string;
  members: number;
  lookingFor: string[];
  description: string;
}

const BandProfile = () => {
  const { id } = useParams();
  const [band, setBand] = useState<BandProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Function to get genre name from ID
  const getGenreName = (genreId: string) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : genreId;
  };

  useEffect(() => {
    const fetchBandProfile = async () => {
      try {
        // For now using the bands data from FindBands page
        // In a real app, this would fetch from Supabase
        const band = {
          id: '1',
          name: 'Electric Harmony',
          genre: ['rock', 'metal'],
          location: 'New York, NY',
          skillLevel: 'intermediate',
          members: 3,
          lookingFor: ['drummer', 'vocalist'],
          description: 'Rock band looking for a drummer and vocalist to complete our sound. We play original music and covers, with influences from classic and modern rock. We rehearse weekly and are looking to book gigs in the local area.'
        };
        
        setBand(band);
      } catch (error) {
        console.error('Error fetching band profile:', error);
        toast({
          title: "Error",
          description: "Failed to load band profile",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBandProfile();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!band) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Band Not Found</h2>
          <p className="mb-4">The band profile you're looking for doesn't exist or has been removed.</p>
          <HomeButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link to="/find-bands" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Bands
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Band Info Sidebar */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold mb-1 text-center">{band.name}</h1>
              <p className="text-muted-foreground flex items-center justify-center mb-4">
                <MapPin className="h-4 w-4 mr-1" /> {band.location}
              </p>
              <Button className="w-full mb-2">
                <Mail className="h-4 w-4 mr-2" /> Contact Band
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Band Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Members</p>
                <p className="font-medium">{band.members} members</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Skill Level</p>
                <p className="font-medium capitalize">{band.skillLevel}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Looking For</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {band.lookingFor.map(position => (
                    <Badge key={position} variant="outline">
                      {position}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">About the Band</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{band.description}</p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Genres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {band.genre.map(genreId => (
                  <Badge key={genreId} variant="outline">
                    {getGenreName(genreId)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Music</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <Music className="h-10 w-10 mx-auto mb-3" />
                <p>No music uploads yet</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BandProfile;
