
import React, { useState, useEffect } from 'react';
import { Filter, Search, MapPin, Guitar, Users } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui-custom/Button";
import MusicianCard from '@/components/MusicianCard';
import { genres } from '@/components/onboarding/BandDetailsStep';
import { instruments } from '@/components/onboarding/InstrumentSelection';

// Mock data for musicians
const MOCK_MUSICIANS = [
  {
    id: '1',
    name: 'Alex Johnson',
    instruments: ['guitar', 'vocals'],
    genres: ['rock', 'indie'],
    location: 'New York, NY',
    skillLevel: 'intermediate',
    age: 28,
    experience: '10',
    bio: 'Rock guitarist with a passion for classic and alternative rock. Looking to join a band for regular gigs.'
  },
  {
    id: '2',
    name: 'Jamie Smith',
    instruments: ['drums'],
    genres: ['jazz', 'blues'],
    location: 'Chicago, IL',
    skillLevel: 'advanced',
    age: 34,
    experience: '15',
    bio: 'Professional jazz drummer with extensive experience in live performances and studio recordings.'
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    instruments: ['bass'],
    genres: ['rock', 'metal'],
    location: 'Austin, TX',
    skillLevel: 'intermediate',
    age: 25,
    experience: '8',
    bio: 'Bass player influenced by rock and metal. Looking for a serious band committed to writing original music.'
  },
  {
    id: '4',
    name: 'Jordan Lee',
    instruments: ['keyboard'],
    genres: ['electronic', 'pop'],
    location: 'Los Angeles, CA',
    skillLevel: 'advanced',
    age: 30,
    experience: '12',
    bio: 'Keyboardist and producer specializing in electronic and pop music. Strong background in music theory and composition.'
  },
  {
    id: '5',
    name: 'Casey Brown',
    instruments: ['vocals'],
    genres: ['r&b', 'pop'],
    location: 'Miami, FL',
    skillLevel: 'intermediate',
    age: 26,
    experience: '7',
    bio: 'Versatile vocalist with a soulful style. Experienced in both lead and backing vocals.'
  },
  {
    id: '6',
    name: 'Morgan Harris',
    instruments: ['guitar', 'bass'],
    genres: ['folk', 'country'],
    location: 'Nashville, TN',
    skillLevel: 'beginner',
    age: 22,
    experience: '3',
    bio: 'Multi-instrumentalist focused on folk and country music. Looking to gain more experience in a collaborative setting.'
  },
  {
    id: '7',
    name: 'Riley Cooper',
    instruments: ['drums', 'other'],
    genres: ['hip-hop', 'r&b'],
    location: 'Atlanta, GA',
    skillLevel: 'intermediate',
    age: 27,
    experience: '9',
    bio: 'Drummer and percussionist with expertise in hip-hop and R&B rhythms. Also produce beats and work with digital audio.'
  },
  {
    id: '8',
    name: 'Avery Martinez',
    instruments: ['keyboard', 'vocals'],
    genres: ['classical', 'jazz'],
    location: 'Boston, MA',
    skillLevel: 'advanced',
    age: 35,
    experience: '20',
    bio: 'Classically trained pianist and vocalist with a jazz background. Experienced in composing and arranging.'
  }
];

// Locations and skill levels for filters
const LOCATIONS = ['All Locations', 'New York, NY', 'Chicago, IL', 'Austin, TX', 'Los Angeles, CA', 'Boston, MA', 'Miami, FL', 'Nashville, TN', 'Atlanta, GA'];
const SKILL_LEVELS = ['All Skill Levels', 'beginner', 'intermediate', 'advanced'];

const FindMusicians = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [instrumentFilter, setInstrumentFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [skillLevelFilter, setSkillLevelFilter] = useState('All Skill Levels');
  const [musicians, setMusicians] = useState(MOCK_MUSICIANS);
  const [filteredMusicians, setFilteredMusicians] = useState(MOCK_MUSICIANS);

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...musicians];

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(musician => 
        musician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        musician.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply instrument filter
    if (instrumentFilter && instrumentFilter !== 'All Instruments') {
      filtered = filtered.filter(musician => 
        musician.instruments.includes(instrumentFilter.toLowerCase())
      );
    }

    // Apply genre filter
    if (genreFilter && genreFilter !== 'All Genres') {
      filtered = filtered.filter(musician => 
        musician.genres.includes(genreFilter.toLowerCase())
      );
    }

    // Apply location filter
    if (locationFilter && locationFilter !== 'All Locations') {
      filtered = filtered.filter(musician => 
        musician.location === locationFilter
      );
    }

    // Apply skill level filter
    if (skillLevelFilter && skillLevelFilter !== 'All Skill Levels') {
      filtered = filtered.filter(musician => 
        musician.skillLevel === skillLevelFilter.toLowerCase()
      );
    }

    setFilteredMusicians(filtered);
  }, [searchQuery, instrumentFilter, genreFilter, locationFilter, skillLevelFilter, musicians]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Guitar className="text-music-600" />
        Find Musicians
      </h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Input
            placeholder="Search for musicians..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Instrument Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Guitar className="h-4 w-4" />
              Instrument
            </label>
            <Select value={instrumentFilter} onValueChange={setInstrumentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Instruments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Instruments">All Instruments</SelectItem>
                {instruments.map((instrument) => (
                  <SelectItem key={instrument.id} value={instrument.id}>
                    {instrument.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
              setInstrumentFilter('');
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
        Found {filteredMusicians.length} musicians
      </p>

      {/* Grid of Musicians */}
      {filteredMusicians.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusicians.map(musician => (
            <MusicianCard key={musician.id} musician={musician} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No musicians found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
};

export default FindMusicians;
