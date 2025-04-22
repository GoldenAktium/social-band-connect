
import { useState, useEffect } from 'react';
import { useMusiciansFilter } from '@/hooks/useMusiciansFilter';
import SearchBar from '@/components/musicians/SearchBar';
import FilterSidebar from '@/components/musicians/FilterSidebar';
import MusicianList from '@/components/musicians/MusicianList';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import type { Musician } from '@/types/musician';
import { Loader2 } from 'lucide-react';

const allGenres = ['Rock', 'Pop', 'Jazz', 'Blues', 'Classical', 'Electronic', 'Hip Hop', 'R&B', 'Folk', 'Country', 'Metal', 'Punk', 'Soul', 'Funk', 'Latin'];
const allInstruments = ['Guitar', 'Vocals', 'Drums', 'Piano', 'Bass', 'Violin', 'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Keyboard', 'DJ'];

const FindMusicians = () => {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'musician');

        if (error) {
          throw error;
        }

        if (data) {
          console.log('Fetched musicians:', data);
          setMusicians(data as Musician[]);
        } else {
          console.log('No musicians found');
          setMusicians([]);
        }
      } catch (error) {
        console.error('Error fetching musicians:', error);
        toast({
          title: "Error",
          description: "Failed to load musicians",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
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
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading musicians...</span>
            </div>
          ) : (
            <MusicianList musicians={filteredMusicians} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FindMusicians;
