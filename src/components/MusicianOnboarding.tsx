
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui-custom/Card';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';
import Button from './ui-custom/Button';
import { Label } from './ui/label';
import DateSelector from './DateSelector';
import { useToast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

type InstrumentOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

const instrumentOptions: InstrumentOption[] = [
  { value: 'guitar', label: 'Guitar' },
  { value: 'bass', label: 'Bass Guitar' },
  { value: 'drums', label: 'Drums' },
  { value: 'vocals', label: 'Vocals' },
  { value: 'keyboard', label: 'Keyboard' },
  { value: 'piano', label: 'Piano' },
  { value: 'saxophone', label: 'Saxophone' },
  { value: 'trumpet', label: 'Trumpet' },
  { value: 'violin', label: 'Violin' },
  { value: 'cello', label: 'Cello' },
  { value: 'flute', label: 'Flute' },
  { value: 'clarinet', label: 'Clarinet' },
  { value: 'trombone', label: 'Trombone' },
  { value: 'ukulele', label: 'Ukulele' },
  { value: 'banjo', label: 'Banjo' },
  { value: 'harmonica', label: 'Harmonica' },
  { value: 'other', label: 'Other' },
];

export const MusicianOnboarding = () => {
  const [step, setStep] = useState(1);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDateChange = (date: Date | null) => {
    setBirthDate(date);
  };

  const toggleInstrument = (value: string) => {
    setSelectedInstruments(prev => {
      if (prev.includes(value)) {
        return prev.filter(i => i !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleNext = () => {
    if (step === 1 && !birthDate) {
      toast({
        title: 'Birth date required',
        description: 'Please select your birth date before continuing',
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
    if (selectedInstruments.length === 0) {
      toast({
        title: 'Instrument selection required',
        description: 'Please select at least one instrument',
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
          description: 'Please log in to complete your profile',
          variant: 'destructive'
        });
        navigate('/login');
        return;
      }

      // Here you would normally save the user data to your database
      // For this example, we'll just simulate success and navigate to the dashboard
      
      toast({
        title: 'Profile complete!',
        description: 'Your musician profile has been created successfully',
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Something went wrong',
        description: 'Failed to save your profile. Please try again.',
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
          <CardTitle className="text-2xl font-display">Set Up Your Musician Profile</CardTitle>
          <CardDescription className="text-lg">
            {step === 1 
              ? "When were you born?" 
              : "What instruments do you play?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <Label htmlFor="birthdate">Birth Date</Label>
              <DateSelector 
                onChange={handleDateChange} 
                className="mt-2"
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
                {instrumentOptions.map((instrument) => (
                  <button
                    key={instrument.value}
                    type="button"
                    onClick={() => toggleInstrument(instrument.value)}
                    className={`
                      flex items-center p-3 rounded-lg border-2 transition-colors
                      ${selectedInstruments.includes(instrument.value)
                        ? 'border-music-600 bg-music-50/50'
                        : 'border-border hover:border-music-300'}
                    `}
                  >
                    <span>{instrument.label}</span>
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
                  {isSubmitting ? 'Saving...' : 'Complete Profile'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default MusicianOnboarding;
