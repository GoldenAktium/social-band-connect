
import { useState } from 'react';
import { Guitar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui-custom/Card';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type UserType = 'musician' | 'band-creator';

export const UserTypeSelection = () => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedType === 'musician') {
      navigate('/musician-onboarding');
    } else if (selectedType === 'band-creator') {
      navigate('/band-onboarding');
    }
  };

  return (
    <AnimatedContainer animation="scale-in" className="w-full max-w-3xl mx-auto">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-display">Welcome to SocialBand!</CardTitle>
          <CardDescription className="text-lg">Tell us how you want to use the platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setSelectedType('musician')}
              className={cn(
                "flex flex-col items-center p-8 rounded-xl border-2 transition-all hover:shadow-md space-y-4 h-full",
                selectedType === 'musician' 
                  ? "border-music-600 bg-music-50/50" 
                  : "border-border hover:border-music-300"
              )}
            >
              <div className="p-4 bg-music-100 rounded-full text-music-700">
                <Guitar className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-semibold">I'm a Musician</h3>
              <p className="text-center text-muted-foreground">
                Looking to join a band or collaborate with other musicians
              </p>
            </button>
            
            <button
              onClick={() => setSelectedType('band-creator')}
              className={cn(
                "flex flex-col items-center p-8 rounded-xl border-2 transition-all hover:shadow-md space-y-4 h-full",
                selectedType === 'band-creator' 
                  ? "border-music-600 bg-music-50/50" 
                  : "border-border hover:border-music-300"
              )}
            >
              <div className="p-4 bg-music-100 rounded-full text-music-700">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-semibold">I'm Forming a Band</h3>
              <p className="text-center text-muted-foreground">
                Looking to create a new band and find musicians to join
              </p>
            </button>
          </div>
          
          {selectedType && (
            <AnimatedContainer animation="fade-in" className="flex justify-center">
              <button
                onClick={handleContinue}
                className="bg-music-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-music-700 transition-colors"
              >
                Continue as {selectedType === 'musician' ? 'Musician' : 'Band Creator'}
              </button>
            </AnimatedContainer>
          )}
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default UserTypeSelection;
