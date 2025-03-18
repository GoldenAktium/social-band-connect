
import { useState } from 'react';
import { 
  Guitar, 
  Mic, 
  Users, 
  Calendar, 
  Music, 
  ArrowRight, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui-custom/Card';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';
import Button from './ui-custom/Button';
import { cn } from '@/lib/utils';

type UserType = 'musician' | 'band-creator' | null;
type Step = 1 | 2 | 3 | 4;

const instruments = [
  { id: 'guitar', name: 'Guitar', icon: Guitar },
  { id: 'vocals', name: 'Vocals', icon: Mic },
  { id: 'drums', name: 'Drums', icon: Users },
  { id: 'bass', name: 'Bass', icon: Music },
  { id: 'keyboard', name: 'Keyboard', icon: Music },
  { id: 'other', name: 'Other', icon: Music },
];

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

export const OnboardingFlow = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [bandName, setBandName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [age, setAge] = useState<number | null>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentStep(2);
  };

  const handleInstrumentSelect = (instrumentId: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrumentId)
        ? prev.filter(id => id !== instrumentId)
        : [...prev, instrumentId]
    );
  };

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setAge(value);
    } else {
      setAge(null);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    } else {
      setUserType(null);
    }
  };

  const isNextButtonDisabled = () => {
    switch (currentStep) {
      case 1:
        return userType === null;
      case 2:
        return age === null || age < 14;
      case 3:
        return selectedInstruments.length === 0;
      case 4:
        return selectedGenres.length === 0 || (userType === 'band-creator' && !bandName);
      default:
        return false;
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                step === currentStep 
                  ? "bg-music-600 text-white" 
                  : step < currentStep 
                    ? "bg-music-200 text-music-800" 
                    : "bg-gray-200 text-gray-400"
              )}
            >
              {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
            </div>
          ))}
        </div>
        <div className="relative w-full h-1 bg-gray-200 rounded">
          <div 
            className="absolute h-1 bg-music-600 rounded transition-all"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col space-y-6">
            <CardHeader>
              <CardTitle>Welcome to SocialBand!</CardTitle>
              <CardDescription>Tell us how you want to use the platform</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleUserTypeSelect('musician')}
                className={cn(
                  "flex flex-col items-center p-8 rounded-xl border-2 transition-all hover:shadow-md space-y-4",
                  userType === 'musician' 
                    ? "border-music-600 bg-music-50/50" 
                    : "border-border hover:border-music-300"
                )}
              >
                <div className="p-4 bg-music-100 rounded-full text-music-700">
                  <Guitar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold">I'm a Musician</h3>
                <p className="text-center text-muted-foreground">
                  Looking to join a band or collaborate with other musicians
                </p>
              </button>
              
              <button
                onClick={() => handleUserTypeSelect('band-creator')}
                className={cn(
                  "flex flex-col items-center p-8 rounded-xl border-2 transition-all hover:shadow-md space-y-4",
                  userType === 'band-creator' 
                    ? "border-music-600 bg-music-50/50" 
                    : "border-border hover:border-music-300"
                )}
              >
                <div className="p-4 bg-music-100 rounded-full text-music-700">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-semibold">I'm Forming a Band</h3>
                <p className="text-center text-muted-foreground">
                  Looking to create a new band and find musicians to join
                </p>
              </button>
            </CardContent>
          </div>
        );
        
      case 2:
        return (
          <div className="flex flex-col space-y-6">
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
              <CardDescription>This helps us personalize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  What's your age?
                </label>
                <input
                  type="number"
                  value={age || ''}
                  onChange={handleAgeChange}
                  placeholder="Enter your age"
                  className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-music-400"
                />
                {age !== null && age < 14 && (
                  <p className="text-sm text-destructive mt-1">
                    You must be at least 14 years old to create or join a band
                  </p>
                )}
              </div>
            </CardContent>
          </div>
        );
        
      case 3:
        return (
          <div className="flex flex-col space-y-6">
            <CardHeader>
              <CardTitle>What instruments do you play?</CardTitle>
              <CardDescription>Select all that apply</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </div>
        );
        
      case 4:
        return (
          <div className="flex flex-col space-y-6">
            <CardHeader>
              <CardTitle>
                {userType === 'band-creator' ? 'About your band' : 'Your music style'}
              </CardTitle>
              <CardDescription>
                {userType === 'band-creator' 
                  ? 'Tell us about the band you want to form' 
                  : 'What genres do you play or are interested in?'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userType === 'band-creator' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Band Name</label>
                  <input
                    type="text"
                    value={bandName}
                    onChange={(e) => setBandName(e.target.value)}
                    placeholder="Enter your band name"
                    className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-music-400"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {userType === 'band-creator' 
                    ? 'What style of music will your band play?' 
                    : 'What genres do you play or are interested in?'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);
                    
                    return (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreSelect(genre.id)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all",
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
            </CardContent>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!userType && currentStep === 1) {
    // Initial screen with animation
    return (
      <AnimatedContainer animation="scale-in">
        <Card className="w-full max-w-2xl">
          {renderStepContent()}
        </Card>
      </AnimatedContainer>
    );
  }

  return (
    <AnimatedContainer animation="fade-in">
      <Card className="w-full max-w-2xl">
        {userType && renderProgressBar()}
        {renderStepContent()}
        
        <div className="flex justify-between mt-8 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
          >
            Back
          </Button>
          <Button 
            variant="music" 
            onClick={handleNextStep}
            disabled={isNextButtonDisabled()}
            icon={currentStep === 4 ? <CheckCircle /> : <ArrowRight />}
            iconPosition="right"
          >
            {currentStep === 4 ? 'Complete Setup' : 'Continue'}
          </Button>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default OnboardingFlow;
