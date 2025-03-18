
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-custom/Card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui-custom/Button';
import { MapPin, Music, Users } from 'lucide-react';
import { genres } from '@/components/onboarding/BandDetailsStep';

interface Band {
  id: string;
  name: string;
  genre: string[];
  location: string;
  skillLevel: string;
  members: number;
  lookingFor: string[];
  description: string;
}

interface BandCardProps {
  band: Band;
}

const BandCard = ({ band }: BandCardProps) => {
  // Function to get genre name from ID
  const getGenreName = (genreId: string) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : genreId;
  };

  // Format skill level with first letter capitalized
  const formatSkillLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold truncate">{band.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {band.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 mb-3">
            {band.genre.map(genreId => (
              <Badge key={genreId} variant="secondary" className="bg-music-100 text-music-800">
                {getGenreName(genreId)}
              </Badge>
            ))}
            <Badge variant="outline" className="bg-gray-100">
              {formatSkillLevel(band.skillLevel)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{band.description}</p>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Looking for:</h4>
          <div className="flex flex-wrap gap-1">
            {band.lookingFor.map(role => (
              <Badge key={role} variant="outline">
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{band.members} members</span>
          </div>
          <Button size="sm" variant="music">
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BandCard;
