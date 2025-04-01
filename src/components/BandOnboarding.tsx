import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui-custom/Card';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';
import Button from './ui-custom/Button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

type GenreOption = {
  value: string;
  label: string;
};

const genreOptions: GenreOption[] = [
  { value: 'rock', label: 'Rock' },
  { value: 'pop', label: 'Pop' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'blues', label: 'Blues' },
  { value: 'classical', label: 'Classical' },
  { value: 'electronic', label: 'Electronic' },
  { value: 'hip-hop', label: 'Hip Hop' },
  { value: 'r-and-b', label: 'R&B' },
  { value: 'country', label: 'Country' },
  { value: 'folk', label: 'Folk' },
  { value: 'metal', label: 'Metal' },
  { value: 'punk', label: 'Punk' },
  { value: 'reggae', label: 'Reggae' },
  { value: 'latin', label: 'Latin' },
  { value: 'world', label: 'World' },
  { value: 'alternative', label: 'Alternative' },
];

export const BandOnboarding = () => {
  const [step, setStep] = useState(1);
  const [bandName, setBandName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleGenre = (value: string) => {
    setSelectedGenres(prev => {
      if (prev.includes(value)) {
        return prev.filter(i => i !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleNext = () => {
    if (step === 1 && !bandName.trim()) {
      toast({
        title: 'Band name required',
        description: 'Please enter a name for your band before continuing',
        variant: 'destructive'
      });
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (selectedGenres.length === 0) {
      toast({
        title: 'Genre selection required',
        description: 'Please select at least one genre for your band',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication error',
          description: 'Please log in to complete your band profile',
          variant: 'destructive'
        });
        navigate('/login');
        return;
      }

      const bandId = '1'; // In a real app, this would be the returned ID
      
      toast({
        title: 'Band created!',
        description: `${bandName} has been created successfully`,
      });
      
      navigate(`/band/${bandId}`);
    } catch (error) {
      console.error('Error creating band:', error);
      toast({
        title: 'Something went wrong',
        description: 'Failed to create your band. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedContainer animation="scale-in" className="w-full max-w-md">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display">Create Your Band</CardTitle>
          <CardDescription className="text-lg">
            {step === 1 
              ? "What's your band's name?" 
              : "What genre(s) does your band play?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <Label htmlFor="bandName">Band Name</Label>
              <Input 
                id="bandName"
                value={bandName}
                onChange={(e) => setBandName(e.target.value)}
                placeholder="Enter your band's name"
                className="text-lg"
              />
              
              <div className="pt-4">
                <Button 
                  variant="music" 
                  className="w-full" 
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {genreOptions.map((genre) => (
                  <button
                    key={genre.value}
                    type="button"
                    onClick={() => toggleGenre(genre.value)}
                    className={`
                      flex items-center p-3 rounded-lg border-2 transition-colors
                      ${selectedGenres.includes(genre.value)
                        ? 'border-music-600 bg-music-50/50'
                        : 'border-border hover:border-music-300'}
                    `}
                  >
                    <span>{genre.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button 
                  variant="music" 
                  className="flex-1" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Band'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default BandOnboarding;
