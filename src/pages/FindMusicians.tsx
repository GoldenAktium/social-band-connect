
import { useState, useEffect } from 'react';
import SearchBar from '@/components/musicians/SearchBar';
import FilterSidebar from '@/components/musicians/FilterSidebar';
import MusicianList from '@/components/musicians/MusicianList';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Sample musicians with some marked as having real accounts and being online
const sampleMusicians = [
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
    online: true,
    hasAccount: true
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
    online: false,
    hasAccount: true
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
    hasAccount: false
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
    hasAccount: false
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
    online: true,
    hasAccount: true
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
    hasAccount: false
  },
];

const allGenres = ['Rock', 'Pop', 'Jazz', 'Blues', 'Classical', 'Electronic', 'Hip Hop', 'R&B', 'Folk', 'Country', 'Metal', 'Punk', 'Soul', 'Funk', 'Latin'];
const allInstruments = ['Guitar', 'Vocals', 'Drums', 'Piano', 'Bass', 'Violin', 'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Keyboard', 'DJ'];

const FindMusicians = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState([10]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const { user } = useAuth();

  // In a real app, we would fetch online users from the database
  // For now, we'll use our sample data
  const [musicians, setMusicians] = useState(sampleMusicians);

  // Simulate fetching online users
  useEffect(() => {
    // In a real implementation, we would connect to a realtime presence system
    // For now, we'll just use our sample data
    console.log("Current user:", user);
  }, [user]);

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
    const matchesOnline = !showOnlineOnly || (musician.online === true);
    
    return matchesSearch && matchesDistance && matchesGenre && matchesInstrument && matchesOnline;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Musicians</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <FilterSidebar 
            distanceFilter={distanceFilter}
            setDistanceFilter={setDistanceFilter}
            showAvailable={showAvailable}
            setShowAvailable={setShowAvailable}
            showOnlineOnly={showOnlineOnly}
            setShowOnlineOnly={setShowOnlineOnly}
            selectedGenres={selectedGenres}
            toggleGenre={toggleGenre}
            selectedInstruments={selectedInstruments}
            toggleInstrument={toggleInstrument}
            allGenres={allGenres}
            allInstruments={allInstruments}
          />
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {/* Results */}
          <MusicianList musicians={filteredMusicians} />
        </div>
      </div>
    </div>
  );
};

export default FindMusicians;
