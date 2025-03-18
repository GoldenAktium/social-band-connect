
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui-custom/Card';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';
import Button from './ui-custom/Button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const genres = [
  { id: 'rock', name: 'Rock' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'pop', name: 'Pop' },
  { id: 'blues', name: 'Blues' },
  { id: 'classical', name: 'Classical' },
  { id: 'electronic', name: 'Electronic' },
  { id: 'folk', name: 'Folk' },
  { id: 'metal', name: 'Metal' },
  { id: 'r&b', name: 'R&B' },
  { id: 'hip-hop', name: 'Hip Hop' },
  { id: 'country', name: 'Country' },
  { id: 'indie', name: 'Indie' },
];

export const BandOnboarding = () => {
  const [bandName, setBandName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleSubmit = () => {
    if (!bandName.trim()) {
      toast({
        title: "Band name is required",
        description: "Please enter a name for your band",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedGenres.length === 0) {
      toast({
        title: "Genre selection is required",
        description: "Please select at least one genre for your band",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Save data
    const bandData = {
      type: 'band-creator',
      bandName,
      genres: selectedGenres
    };
    localStorage.setItem('socialBandUserProfile', JSON.stringify(bandData));
    
    toast({
      title: "Band created successfully!",
      description: `${bandName} has been created. Redirecting to dashboard.`,
    });
    
    // Redirect to dashboard after short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <AnimatedContainer animation="fade-in" className="w-full max-w-3xl mx-auto">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-display">Create Your Band</CardTitle>
          <CardDescription className="text-lg">
            Set up your band's profile to start finding musicians
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <label className="text-xl font-medium block">What's your band's name?</label>
            <Input
              value={bandName}
              onChange={(e) => setBandName(e.target.value)}
              placeholder="Enter band name"
              className="text-lg py-6"
            />
          </div>
          
          <div className="space-y-4">
            <label className="text-xl font-medium block">What style of music will your band play?</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id);
                
                return (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreSelect(genre.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-base font-medium transition-all",
                      isSelected 
                        ? "bg-music-600 text-white" 
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    )}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-center pt-6">
            <Button 
              variant="music" 
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              icon={<CheckCircle />}
              iconPosition="right"
            >
              {isSubmitting ? 'Creating Band...' : 'Create Band'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default BandOnboarding;
