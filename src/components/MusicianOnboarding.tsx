
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Guitar, Mic, Users, Music, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui-custom/Card';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';
import Button from './ui-custom/Button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

const instruments = [
  { id: 'guitar', name: 'Guitar', icon: Guitar },
  { id: 'vocals', name: 'Vocals', icon: Mic },
  { id: 'drums', name: 'Drums', icon: Users },
  { id: 'bass', name: 'Bass', icon: Music },
  { id: 'keyboard', name: 'Keyboard', icon: Music },
  { id: 'saxophone', name: 'Saxophone', icon: Music },
  { id: 'trumpet', name: 'Trumpet', icon: Music },
  { id: 'violin', name: 'Violin', icon: Music },
  { id: 'cello', name: 'Cello', icon: Music },
  { id: 'flute', name: 'Flute', icon: Music },
  { id: 'clarinet', name: 'Clarinet', icon: Music },
  { id: 'trombone', name: 'Trombone', icon: Music },
  { id: 'other', name: 'Other', icon: Music },
];

export const MusicianOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInstrumentSelect = (instrumentId: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrumentId)
        ? prev.filter(id => id !== instrumentId)
        : [...prev, instrumentId]
    );
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!birthDate) {
        toast({
          title: "Please select your birth date",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    } else {
      if (selectedInstruments.length === 0) {
        toast({
          title: "Please select at least one instrument",
          variant: "destructive",
        });
        return;
      }
      // Save data and redirect
      const userData = {
        type: 'musician',
        birthDate,
        instruments: selectedInstruments
      };
      localStorage.setItem('socialBandUserProfile', JSON.stringify(userData));
      
      toast({
        title: "Profile created successfully!",
        description: "Redirecting to your dashboard",
      });
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <AnimatedContainer animation="fade-in" className="w-full max-w-3xl mx-auto">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-display">
            {currentStep === 1 ? "Tell us about yourself" : "What instruments do you play?"}
          </CardTitle>
          <CardDescription className="text-lg">
            {currentStep === 1 
              ? "Let's set up your musician profile" 
              : "Select all the instruments you play"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {currentStep === 1 ? (
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-medium">When were you born?</h3>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "PPP") : <span>Pick your birth date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <p className="text-muted-foreground text-center max-w-md mt-4">
                All ages are welcome on SocialBand! Note that some features may have age restrictions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {instruments.map((instrument) => {
                const Icon = instrument.icon;
                const isSelected = selectedInstruments.includes(instrument.id);
                
                return (
                  <button
                    key={instrument.id}
                    onClick={() => handleInstrumentSelect(instrument.id)}
                    className={cn(
                      "flex items-center p-3 rounded-lg border-2 transition-all",
                      isSelected 
                        ? "border-music-600 bg-music-50/50" 
                        : "border-border hover:border-music-300"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-full mr-3",
                      isSelected ? "bg-music-100 text-music-700" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{instrument.name}</span>
                  </button>
                );
              })}
            </div>
          )}
          
          <div className="flex justify-center pt-4">
            <Button 
              variant="music" 
              size="lg"
              onClick={handleNext}
              icon={currentStep === 2 ? <CheckCircle /> : <ArrowRight />}
              iconPosition="right"
            >
              {currentStep === 2 ? 'Complete Setup' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default MusicianOnboarding;
