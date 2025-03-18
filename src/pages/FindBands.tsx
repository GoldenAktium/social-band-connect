
import React, { useState, useEffect } from 'react';
import { Filter, Search, MapPin, Music, Users } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui-custom/Button";
import BandCard from '@/components/BandCard';
import { genres } from '@/components/onboarding/BandDetailsStep';

// Mock data for the bands
const MOCK_BANDS = [
  {
    id: '1',
    name: 'Electric Harmony',
    genre: ['rock', 'metal'],
    location: 'New York, NY',
    skillLevel: 'intermediate',
    members: 3,
    lookingFor: ['drummer', 'vocalist'],
    description: 'Rock band looking for a drummer and vocalist to complete our sound.'
  },
  {
    id: '2',
    name: 'Jazz Collective',
    genre: ['jazz', 'blues'],
    location: 'Chicago, IL',
    skillLevel: 'advanced',
    members: 4,
    lookingFor: ['saxophonist'],
    description: 'Professional jazz group seeking an experienced saxophonist.'
  },
  {
    id: '3',
    name: 'Indie Dreams',
    genre: ['indie', 'pop'],
    location: 'Austin, TX',
    skillLevel: 'beginner',
    members: 2,
    lookingFor: ['bassist', 'keyboardist'],
    description: 'New indie band looking to grow with passionate musicians.'
  },
  {
    id: '4',
    name: 'Rhythm Section',
    genre: ['r&b', 'hip-hop'],
    location: 'Los Angeles, CA',
    skillLevel: 'intermediate',
    members: 3,
    lookingFor: ['guitarist'],
    description: 'R&B group looking for a skilled guitarist to join our team.'
  },
  {
    id: '5',
    name: 'Classical Fusion',
    genre: ['classical', 'folk'],
    location: 'Boston, MA',
    skillLevel: 'advanced',
    members: 5,
    lookingFor: ['violinist'],
    description: 'Fusion ensemble seeking a classically trained violinist.'
  },
  {
    id: '6',
    name: 'Electronic Dreams',
    genre: ['electronic', 'pop'],
    location: 'Miami, FL',
    skillLevel: 'intermediate',
    members: 2,
    lookingFor: ['producer', 'vocalist'],
    description: 'Electronic music duo looking for a producer and vocalist.'
  },
  {
    id: '7',
    name: 'Country Roads',
    genre: ['country', 'folk'],
    location: 'Nashville, TN',
    skillLevel: 'beginner',
    members: 3,
    lookingFor: ['fiddle player', 'bassist'],
    description: 'Country band welcoming beginners who love the genre.'
  },
  {
    id: '8',
    name: 'Metal Mayhem',
    genre: ['metal'],
    location: 'Seattle, WA',
    skillLevel: 'advanced',
    members: 4,
    lookingFor: ['drummer'],
    description: 'Heavy metal band looking for a technical drummer.'
  }
];

// Locations and skill levels for filters
const LOCATIONS = ['All Locations', 'New York, NY', 'Chicago, IL', 'Austin, TX', 'Los Angeles, CA', 'Boston, MA', 'Miami, FL', 'Nashville, TN', 'Seattle, WA'];
const SKILL_LEVELS = ['All Skill Levels', 'beginner', 'intermediate', 'advanced'];

const FindBands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [skillLevelFilter, setSkillLevelFilter] = useState('All Skill Levels');
  const [bands, setBands] = useState(MOCK_BANDS);
  const [filteredBands, setFilteredBands] = useState(MOCK_BANDS);

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...bands];

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(band => 
        band.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        band.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply genre filter
    if (genreFilter && genreFilter !== 'All Genres') {
      filtered = filtered.filter(band => 
        band.genre.includes(genreFilter.toLowerCase())
      );
    }

    // Apply location filter
    if (locationFilter && locationFilter !== 'All Locations') {
      filtered = filtered.filter(band => 
        band.location === locationFilter
      );
    }

    // Apply skill level filter
    if (skillLevelFilter && skillLevelFilter !== 'All Skill Levels') {
      filtered = filtered.filter(band => 
        band.skillLevel === skillLevelFilter.toLowerCase()
      );
    }

    setFilteredBands(filtered);
  }, [searchQuery, genreFilter, locationFilter, skillLevelFilter, bands]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Music className="text-music-600" />
        Find Bands
      </h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Input
            placeholder="Search for bands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Genre Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Music className="h-4 w-4" />
              Genre
            </label>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Genres">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Location
            </label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skill Level Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Skill Level
            </label>
            <Select value={skillLevelFilter} onValueChange={setSkillLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Skill Levels" />
              </SelectTrigger>
              <SelectContent>
                {SKILL_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Reset Button */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setGenreFilter('');
              setLocationFilter('All Locations');
              setSkillLevelFilter('All Skill Levels');
            }}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-muted-foreground mb-4">
        Found {filteredBands.length} bands
      </p>

      {/* Grid of Bands */}
      {filteredBands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBands.map(band => (
            <BandCard key={band.id} band={band} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No bands found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
};

export default FindBands;
