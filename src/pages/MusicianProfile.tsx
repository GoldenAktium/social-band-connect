
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Music, MapPin, Calendar, Star, UserPlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { genres } from '@/components/onboarding/BandDetailsStep';
import { instruments } from '@/components/onboarding/InstrumentSelection';
import { HomeButton } from '@/components/HomeButton';
import type { Musician } from '@/types/musician';
import GroupInviteDialog from '@/components/groups/GroupInviteDialog';

const MusicianProfile = () => {
  const { id } = useParams();
  const [musician, setMusician] = useState<Musician | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
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
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          console.log('Fetched profile:', data);
          setMusician(data as Musician);
        }
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

    if (id) {
      fetchMusicianProfile();
    }
  }, [id, toast]);

  const handleInviteToGroup = () => {
    setShowGroupDialog(true);
  };

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
                <AvatarImage src={musician.avatar_url || undefined} alt={musician.name || 'User'} />
                <AvatarFallback>{musician.name ? musician.name.charAt(0) : 'U'}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold mb-1">{musician.name || 'Unnamed User'}</h1>
              {musician.location && (
                <p className="text-muted-foreground flex items-center mb-4">
                  <MapPin className="h-4 w-4 mr-1" /> {musician.location}
                </p>
              )}
              <Button className="w-full mb-2" onClick={handleInviteToGroup}>
                <UserPlus className="h-4 w-4 mr-2" /> Invite to Group
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{musician.online ? 'Online' : 'Offline'}</p>
              </div>
              {musician.rating !== null && (
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{musician.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({musician.reviews || 0} reviews)</span>
                  </div>
                </div>
              )}
              {musician.experience && (
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{musician.experience}</p>
                </div>
              )}
              {musician.availability && (
                <div>
                  <p className="text-sm text-muted-foreground">Availability</p>
                  <p className="font-medium">{musician.availability}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {musician.instrument && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Instruments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {musician.instrument}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {musician.genres && musician.genres.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Genres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {musician.genres.map((genre, index) => (
                    <Badge key={index} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
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

      <GroupInviteDialog 
        open={showGroupDialog}
        musician={musician}
        onOpenChange={setShowGroupDialog}
      />
    </div>
  );
};

export default MusicianProfile;
