
import { useState, useEffect } from 'react';
import { useMusiciansFilter } from '@/hooks/useMusiciansFilter';
import SearchBar from '@/components/musicians/SearchBar';
import FilterSidebar from '@/components/musicians/FilterSidebar';
import MusicianList from '@/components/musicians/MusicianList';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import type { Musician } from '@/types/musician';

const allGenres = ['Rock', 'Pop', 'Jazz', 'Blues', 'Classical', 'Electronic', 'Hip Hop', 'R&B', 'Folk', 'Country', 'Metal', 'Punk', 'Soul', 'Funk', 'Latin'];
const allInstruments = ['Guitar', 'Vocals', 'Drums', 'Piano', 'Bass', 'Violin', 'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Keyboard', 'DJ'];

// Sample data for musicians
const sampleMusicians: Musician[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    instrument: 'Guitar',
    location: 'New York, NY',
    distance: '5 miles',
    rating: 4.8,
    reviews: 24,
    experience: '10 years',
    genres: ['Rock', 'Blues'],
    availability: 'Weekends',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    online: true,
    hasAccount: true
  },
  {
    id: '2',
    name: 'Sarah Williams',
    instrument: 'Vocals',
    location: 'Los Angeles, CA',
    distance: '15 miles',
    rating: 4.9,
    reviews: 36,
    experience: '8 years',
    genres: ['Pop', 'R&B', 'Soul'],
    availability: 'Evenings',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: false,
    hasAccount: true
  }
];

const FindMusicians = () => {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const {
    searchTerm,
    setSearchTerm,
    distanceFilter,
    setDistanceFilter,
    showAvailable,
    setShowAvailable,
    showOnlineOnly,
    setShowOnlineOnly,
    selectedGenres,
    selectedInstruments,
    toggleGenre,
    toggleInstrument,
    filteredMusicians
  } = useMusiciansFilter(musicians);

  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        // In a real implementation, we would fetch from a table that exists
        // For now, we'll use our sample data
        setMusicians(sampleMusicians);

        // When you have a proper table in Supabase, uncomment and modify this:
        /*
        const { data, error } = await supabase
          .from('musicians')  // Use the correct table name
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          setMusicians(data as Musician[]);
        }
        */
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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Musicians</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
        
        <div className="lg:col-span-3 space-y-6">
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          <MusicianList musicians={filteredMusicians} />
        </div>
      </div>
    </div>
  );
};

export default FindMusicians;
