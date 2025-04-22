
import { useState, useEffect } from 'react';
import SearchBar from '@/components/musicians/SearchBar';
import FilterSidebar from '@/components/musicians/FilterSidebar';
import MusicianList from '@/components/musicians/MusicianList';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Moving types to their own file later if they grow
interface Musician {
  id: string;
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
  online: boolean;
  hasAccount: boolean;
}

const allGenres = ['Rock', 'Pop', 'Jazz', 'Blues', 'Classical', 'Electronic', 'Hip Hop', 'R&B', 'Folk', 'Country', 'Metal', 'Punk', 'Soul', 'Funk', 'Latin'];
const allInstruments = ['Guitar', 'Vocals', 'Drums', 'Piano', 'Bass', 'Violin', 'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Keyboard', 'DJ'];

const FindMusicians = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState([10]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const { data: users, error } = await supabase
          .from('musicians')
          .select('*');

        if (error) {
          throw error;
        }

        if (users) {
          const formattedMusicians = users.map(user => ({
            id: user.id,
            name: user.name,
            instrument: Array.isArray(user.instrument) ? user.instrument[0] : user.instrument,
            location: user.location || 'Location not specified',
            distance: user.distance || 'Distance not available',
            rating: user.rating || 4.5,
            reviews: user.reviews || 0,
            experience: user.experience || '0 years',
            genres: Array.isArray(user.genres) ? user.genres : [],
            availability: user.availability || 'Not specified',
            image: user.image || 'https://randomuser.me/api/portraits/lego/1.jpg',
            online: false, // We'll implement real-time presence later
            hasAccount: true
          }));

          setMusicians(formattedMusicians);
        }
      } catch (error) {
        console.error('Error fetching musicians:', error);
        toast({
          title: "Error",
          description: "Failed to load musicians",
          variant: "destructive"
        });
      }
    };

    fetchMusicians();
  }, [toast]);

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
    const matchesDistance = isNaN(distanceValue) || distanceValue <= distanceFilter[0];
    
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
