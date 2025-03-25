
import { useState, useEffect } from 'react';
import { Music, Search, Calendar, User, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import HomeButton from '@/components/HomeButton';
import Button from '@/components/ui-custom/Button';
import { Input } from '@/components/ui/input';
import { AnimatedContainer } from '@/components/ui-custom/AnimatedContainer';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

type MusicUpload = {
  id: string;
  title: string;
  artist: string;
  genre: string | null;
  file_path: string;
  created_at: string;
};

export const FindMusic = () => {
  const [musicList, setMusicList] = useState<MusicUpload[]>([]);
  const [filteredMusic, setFilteredMusic] = useState<MusicUpload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchMusic = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('music_uploads')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setMusicList(data || []);
        setFilteredMusic(data || []);
      } catch (error) {
        console.error('Error fetching music:', error);
        toast({
          title: 'Error',
          description: 'Failed to load music. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusic();

    // Cleanup function for audio
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, [toast]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMusic(musicList);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = musicList.filter(
        item => 
          item.title.toLowerCase().includes(lowercasedSearch) || 
          item.artist.toLowerCase().includes(lowercasedSearch) ||
          (item.genre && item.genre.toLowerCase().includes(lowercasedSearch))
      );
      setFilteredMusic(filtered);
    }
  }, [searchTerm, musicList]);

  const handlePlayPause = (musicId: string, filePath: string) => {
    if (currentlyPlaying === musicId) {
      // If this music is already playing, pause it
      if (audioElement) {
        audioElement.pause();
        setCurrentlyPlaying(null);
      }
    } else {
      // If another music is playing, stop it first
      if (audioElement) {
        audioElement.pause();
      }
      
      // Create a new audio element and play the selected music
      const audio = new Audio(filePath);
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        toast({
          title: 'Playback Error',
          description: 'Unable to play this track. Please try again.',
          variant: 'destructive'
        });
      });
      
      // Set up event listener for when the audio ends
      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
      });
      
      setAudioElement(audio);
      setCurrentlyPlaying(musicId);
    }
  };

  const handleUploadClick = async () => {
    const { data } = await supabase.auth.getSession();
    
    if (!data.session) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to upload music',
      });
      navigate('/login');
    } else {
      navigate('/upload-music');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <HomeButton />
            <h1 className="text-2xl font-display font-bold">Find Music</h1>
          </div>
          <Button variant="music" onClick={handleUploadClick}>
            Upload Music
          </Button>
        </div>
        
        <AnimatedContainer animation="slide-up" className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title, artist, or genre..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </AnimatedContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading state
            Array.from({ length: 6 }).map((_, i) => (
              <AnimatedContainer key={i} animation="slide-up" delay={`${i * 0.1}s`}>
                <Card className="h-56 animate-pulse">
                  <CardHeader className="space-y-2">
                    <div className="h-6 bg-muted rounded w-2/3"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-10 bg-muted rounded w-full mt-4"></div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))
          ) : filteredMusic.length === 0 ? (
            // No results state
            <AnimatedContainer animation="slide-up" className="col-span-full">
              <div className="text-center py-12">
                <Music className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-xl font-medium">No music found</h3>
                <p className="text-muted-foreground mt-2">
                  {searchTerm ? "No results match your search criteria" : "Be the first to upload music!"}
                </p>
                <Button variant="outline" className="mt-4" onClick={handleUploadClick}>
                  Upload Music
                </Button>
              </div>
            </AnimatedContainer>
          ) : (
            // Music list
            filteredMusic.map((item, index) => (
              <AnimatedContainer key={item.id} animation="slide-up" delay={`${index * 0.1}s`}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="mr-1 h-4 w-4" />
                      <span className="line-clamp-1">{item.artist}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {item.genre && (
                      <div className="inline-block px-2 py-1 text-xs rounded-full bg-music-100 text-music-700">
                        {item.genre}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                    <Button 
                      variant={currentlyPlaying === item.id ? "default" : "music"}
                      className="w-full"
                      onClick={() => handlePlayPause(item.id, item.file_path)}
                    >
                      {currentlyPlaying === item.id ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Play
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FindMusic;
