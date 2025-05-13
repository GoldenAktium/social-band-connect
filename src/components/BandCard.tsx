
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-custom/Card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui-custom/Button';
import { MapPin, Music } from 'lucide-react';
import { genres } from '@/components/onboarding/BandDetailsStep';
import type { Musician } from '@/types/musician';

interface BandCardProps {
  band: Musician;
}

const BandCard = ({ band }: BandCardProps) => {
  const navigate = useNavigate();
  
  // Function to get genre name from ID
  const getGenreName = (genreId: string) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : genreId;
  };

  const handleViewProfile = () => {
    navigate(`/band/${band.id}`);
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold truncate">{band.name || 'Unnamed Band'}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {band.location || 'Location not specified'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 mb-3">
            {band.experience && (
              <Badge variant="outline" className="bg-gray-100">
                {band.experience}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {band.genres && band.genres.map(genreId => (
              <Badge key={genreId} variant="outline" className="border-music-200">
                {getGenreName(genreId)}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {band.availability || 'No description available'}
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Music className="h-4 w-4" />
            <span>{band.instrument || 'Instruments not specified'}</span>
          </div>
          <Button size="sm" variant="music" onClick={handleViewProfile}>
            View Band
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BandCard;
