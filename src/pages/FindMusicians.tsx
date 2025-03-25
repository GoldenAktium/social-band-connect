import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, MapPin, Star, User, Music } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const musicians = [
  {
    id: 1,
    name: 'Alex Johnson',
    instrument: 'Guitar',
    location: 'New York, NY',
    distance: '2 miles away',
    rating: 4.8,
    reviews: 24,
    experience: '8 years',
    genres: ['Rock', 'Blues', 'Jazz'],
    availability: 'Weekends',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    online: true
  },
  {
    id: 2,
    name: 'Samantha Lee',
    instrument: 'Vocals',
    location: 'Brooklyn, NY',
    distance: '4 miles away',
    rating: 4.9,
    reviews: 36,
    experience: '10 years',
    genres: ['Pop', 'R&B', 'Soul'],
    availability: 'Evenings',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: false
  },
  {
    id: 3,
    name: 'Marcus Wilson',
    instrument: 'Drums',
    location: 'Queens, NY',
    distance: '6 miles away',
    rating: 4.7,
    reviews: 19,
    experience: '5 years',
    genres: ['Rock', 'Metal', 'Punk'],
    availability: 'Full-time',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: 4,
    name: 'Jasmine Chen',
    instrument: 'Piano',
    location: 'Manhattan, NY',
    distance: '1 mile away',
    rating: 4.6,
    reviews: 15,
    experience: '12 years',
    genres: ['Classical', 'Jazz', 'Contemporary'],
    availability: 'Weekdays',
    image: 'https://randomuser.me/api/portraits/women/24.jpg',
  },
  {
    id: 5,
    name: 'David Rodriguez',
    instrument: 'Bass',
    location: 'Bronx, NY',
    distance: '8 miles away',
    rating: 4.5,
    reviews: 11,
    experience: '7 years',
    genres: ['Funk', 'Jazz', 'Latin'],
    availability: 'Weekends',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
  },
  {
    id: 6,
    name: 'Emma Thompson',
    instrument: 'Violin',
    location: 'Jersey City, NJ',
    distance: '10 miles away',
    rating: 4.9,
    reviews: 28,
    experience: '15 years',
    genres: ['Classical', 'Folk', 'Contemporary'],
    availability: 'Part-time',
    image: 'https://randomuser.me/api/portraits/women/14.jpg',
  },
];

const FindMusicians = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState([10]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  const allGenres = ['Rock', 'Pop', 'Jazz', 'Blues', 'Classical', 'Electronic', 'Hip Hop', 'R&B', 'Folk', 'Country', 'Metal', 'Punk', 'Soul', 'Funk', 'Latin'];
  const allInstruments = ['Guitar', 'Vocals', 'Drums', 'Piano', 'Bass', 'Violin', 'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Keyboard', 'DJ'];

  const filteredMusicians = musicians.filter((musician) => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      musician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      musician.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
      musician.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Distance filter
    const distanceValue = parseInt(musician.distance);
    const matchesDistance = distanceValue <= distanceFilter[0];
    
    // Genre filter
    const matchesGenre = selectedGenres.length === 0 || 
      musician.genres.some(genre => selectedGenres.includes(genre));
    
    // Instrument filter
    const matchesInstrument = selectedInstruments.length === 0 || 
      selectedInstruments.includes(musician.instrument);
    
    // Online filter
    const matchesOnline = !showOnlineOnly || musician.online;
    
    return matchesSearch && matchesDistance && matchesGenre && matchesInstrument && matchesOnline;
  });

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };

  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrument) 
        ? prev.filter(i => i !== instrument) 
        : [...prev, instrument]
    );
  };

  const handleViewProfile = (musicianId: number) => {
    navigate(`/musician/${musicianId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Musicians</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Distance Filter */}
              <div className="space-y-3">
                <h3 className="font-medium flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Distance
                </h3>
                <div className="space-y-2">
                  <Slider
                    value={distanceFilter}
                    min={1}
                    max={50}
                    step={1}
                    onValueChange={setDistanceFilter}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 mile</span>
                    <span>{distanceFilter[0]} miles</span>
                    <span>50 miles</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Instrument Filter */}
              <div className="space-y-3">
                <h3 className="font-medium flex items-center">
                  <Music className="mr-2 h-4 w-4" />
                  Instrument
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedInstruments.length === 0 
                        ? "Select instruments" 
                        : `${selectedInstruments.length} selected`}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Instruments</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-[300px] overflow-auto">
                      {allInstruments.map((instrument) => (
                        <DropdownMenuItem 
                          key={instrument}
                          onClick={() => toggleInstrument(instrument)}
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 border rounded-sm flex items-center justify-center">
                            {selectedInstruments.includes(instrument) && (
                              <div className="w-2 h-2 bg-primary rounded-sm" />
                            )}
                          </div>
                          {instrument}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                {selectedInstruments.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedInstruments.map(instrument => (
                      <Badge 
                        key={instrument} 
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => toggleInstrument(instrument)}
                      >
                        {instrument} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* Genre Filter */}
              <div className="space-y-3">
                <h3 className="font-medium flex items-center">
                  <Music className="mr-2 h-4 w-4" />
                  Genre
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedGenres.length === 0 
                        ? "Select genres" 
                        : `${selectedGenres.length} selected`}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Genres</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-[300px] overflow-auto">
                      {allGenres.map((genre) => (
                        <DropdownMenuItem 
                          key={genre}
                          onClick={() => toggleGenre(genre)}
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 border rounded-sm flex items-center justify-center">
                            {selectedGenres.includes(genre) && (
                              <div className="w-2 h-2 bg-primary rounded-sm" />
                            )}
                          </div>
                          {genre}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                {selectedGenres.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedGenres.map(genre => (
                      <Badge 
                        key={genre} 
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => toggleGenre(genre)}
                      >
                        {genre} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* Availability Filter */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="available-only"
                  checked={showAvailable}
                  onCheckedChange={setShowAvailable}
                />
                <Label htmlFor="available-only">Available now</Label>
              </div>
              
              {/* Online Filter - New */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="online-only"
                  checked={showOnlineOnly}
                  onCheckedChange={setShowOnlineOnly}
                />
                <Label htmlFor="online-only">Online users only</Label>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, instrument, or genre..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Results */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {filteredMusicians.length} Musicians Found
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMusicians.map((musician) => (
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
            
            {filteredMusicians.length === 0 && (
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No musicians found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindMusicians;
