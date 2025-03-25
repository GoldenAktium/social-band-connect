
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Music, MapPin, Calendar, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { genres } from '@/components/onboarding/BandDetailsStep';
import { instruments } from '@/components/onboarding/InstrumentSelection';
import { HomeButton } from '@/components/HomeButton';

interface MusicianProfile {
  id: string;
  name: string;
  instruments: string[];
  genres: string[];
  location: string;
  skillLevel: string;
  age: number;
  experience: string;
  bio: string;
  email: string;
}

const MusicianProfile = () => {
  const { id } = useParams();
  const [musician, setMusician] = useState<MusicianProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Function to get genre name from ID
  const getGenreName = (genreId: string) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : genreId;
  };

  // Function to get instrument name from ID
  const getInstrumentName = (instrumentId: string) => {
    const instrument = instruments.find(i => i.id === instrumentId);
    return instrument ? instrument.name : instrumentId;
  };

  useEffect(() => {
    const fetchMusicianProfile = async () => {
      try {
        // For now using the musicians data from FindMusicians page
        // In a real app, this would fetch from Supabase
        const musician = {
          id: '1',
          name: 'Alex Johnson',
          instruments: ['guitar'],
          genres: ['rock', 'blues', 'jazz'],
          location: 'New York, NY',
          skillLevel: 'intermediate',
          age: 28,
          experience: '8',
          bio: 'Professional guitarist with experience in rock, blues, and jazz. Available for session work, tours, and forming new bands.',
          email: 'alex.johnson@example.com'
        };
        
        setMusician(musician);
      } catch (error) {
        console.error('Error fetching musician profile:', error);
        toast({
          title: "Error",
          description: "Failed to load musician profile",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMusicianProfile();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!musician) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Musician Not Found</h2>
          <p className="mb-4">The musician profile you're looking for doesn't exist or has been removed.</p>
          <HomeButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link to="/find-musicians" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Musicians
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={`https://randomuser.me/api/portraits/men/32.jpg`} alt={musician.name} />
                <AvatarFallback>{musician.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold mb-1">{musician.name}</h1>
              <p className="text-muted-foreground flex items-center mb-4">
                <MapPin className="h-4 w-4 mr-1" /> {musician.location}
              </p>
              <Button className="w-full mb-2">
                <Mail className="h-4 w-4 mr-2" /> Contact
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{musician.age} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="font-medium">{musician.experience} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Skill Level</p>
                <p className="font-medium capitalize">{musician.skillLevel}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{musician.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{musician.bio}</p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Instruments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {musician.instruments.map(instrumentId => (
                  <Badge key={instrumentId} className="bg-primary text-primary-foreground">
                    {getInstrumentName(instrumentId)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Genres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {musician.genres.map(genreId => (
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

export default MusicianProfile;
