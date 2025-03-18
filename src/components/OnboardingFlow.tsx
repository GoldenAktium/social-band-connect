
import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Card } from './ui-custom/Card';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';
import Button from './ui-custom/Button';
import UserTypeStep from './onboarding/UserTypeStep';
import AgeStep from './onboarding/AgeStep';
import InstrumentSelection from './onboarding/InstrumentSelection';
import BandDetailsStep from './onboarding/BandDetailsStep';
import ProgressBar from './onboarding/ProgressBar';

type UserType = 'musician' | 'band-creator' | null;
type Step = 1 | 2 | 3 | 4;

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

  const handleBandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBandName(e.target.value);
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <UserTypeStep userType={userType} onSelect={handleUserTypeSelect} />;
      case 2:
        return <AgeStep age={age} onAgeChange={handleAgeChange} />;
      case 3:
        return <InstrumentSelection 
                 selectedInstruments={selectedInstruments} 
                 onInstrumentSelect={handleInstrumentSelect} 
               />;
      case 4:
        return <BandDetailsStep 
                 userType={userType} 
                 bandName={bandName} 
                 onBandNameChange={handleBandNameChange}
                 selectedGenres={selectedGenres}
                 onGenreSelect={handleGenreSelect}
               />;
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
        {userType && <ProgressBar currentStep={currentStep} totalSteps={4} />}
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
