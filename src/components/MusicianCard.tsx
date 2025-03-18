
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-custom/Card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui-custom/Button';
import { MapPin, Music, Calendar } from 'lucide-react';
import { genres } from '@/components/onboarding/BandDetailsStep';
import { instruments } from '@/components/onboarding/InstrumentSelection';

interface Musician {
  id: string;
  name: string;
  instruments: string[];
  genres: string[];
  location: string;
  skillLevel: string;
  age: number;
  experience: string;
  bio: string;
}

interface MusicianCardProps {
  musician: Musician;
}

const MusicianCard = ({ musician }: MusicianCardProps) => {
  // Function to get genre name from ID
  const getGenreName = (genreId: string) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : genreId;
  };

  // Function to get instrument name from ID
  const getInstrumentName = (instrumentId: string) => {
    const instrument = instruments.find(i => i.id === instrumentId);
    return instrument ? instrument.name : instrumentId;
  };

  // Format skill level with first letter capitalized
  const formatSkillLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold truncate">{musician.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {musician.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 mb-3">
            {musician.instruments.map(instrumentId => (
              <Badge key={instrumentId} variant="secondary" className="bg-music-100 text-music-800">
                {getInstrumentName(instrumentId)}
              </Badge>
            ))}
            <Badge variant="outline" className="bg-gray-100">
              {formatSkillLevel(musician.skillLevel)}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {musician.genres.map(genreId => (
              <Badge key={genreId} variant="outline" className="border-music-200">
                {getGenreName(genreId)}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{musician.bio}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{musician.experience} years experience</span>
          </div>
          <Button size="sm" variant="music">
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MusicianCard;
