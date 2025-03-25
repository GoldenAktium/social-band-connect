
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, User, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Musician {
  id: number;
  name: string;
  instrument: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  experience: string;
  genres: string[];
  availability: string;
  image: string;
  online?: boolean;
}

interface MusicianListProps {
  musicians: Musician[];
}

const MusicianList = ({ musicians }: MusicianListProps) => {
  const navigate = useNavigate();

  const handleViewProfile = (musicianId: number) => {
    navigate(`/musician/${musicianId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {musicians.length} Musicians Found
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort by: Relevance
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Relevance</DropdownMenuItem>
            <DropdownMenuItem>Distance</DropdownMenuItem>
            <DropdownMenuItem>Rating (High to Low)</DropdownMenuItem>
            <DropdownMenuItem>Experience (Most to Least)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {musicians.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {musicians.map((musician) => (
            <Card key={musician.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 p-4 flex items-center justify-center bg-muted">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={musician.image} alt={musician.name} />
                      <AvatarFallback>{musician.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {musician.online && (
                      <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                </div>
                <div className="sm:w-2/3 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{musician.name}</h3>
                      <p className="text-muted-foreground">{musician.instrument}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{musician.rating}</span>
                      <span className="text-muted-foreground text-sm ml-1">({musician.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{musician.distance}</span>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {musician.genres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm">{musician.experience}</span>
                    <Button 
                      size="sm"
                      onClick={() => handleViewProfile(musician.id)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No musicians found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};

export default MusicianList;
