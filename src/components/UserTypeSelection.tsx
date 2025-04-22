
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Guitar, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui-custom/Card';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';
import { cn } from '@/lib/utils';

type UserType = 'musician' | 'band-creator' | null;

export const UserTypeSelection = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const navigate = useNavigate();

  const handleSelection = (type: UserType) => {
    setUserType(type);
    
    if (type === 'musician') {
      navigate('/musician-onboarding');
    } else if (type === 'band-creator') {
      navigate('/band-onboarding');
    }
  };

  return (
    <AnimatedContainer animation="scale-in" className="w-full max-w-2xl">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-display">Welcome to SocialBand!</CardTitle>
          <CardDescription className="text-lg">
            Tell us how you want to use the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <button
            onClick={() => handleSelection('musician')}
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
            onClick={() => handleSelection('band-creator')}
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
      </Card>
    </AnimatedContainer>
  );
};

export default UserTypeSelection;
