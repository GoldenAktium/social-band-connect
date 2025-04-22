
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
        const { data: users, error } = await supabase
          .from('users_profiles')
          .select('*')
          .eq('type', 'musician');

        if (error) {
          throw error;
        }

        if (users) {
          const formattedMusicians: Musician[] = users.map(user => ({
            id: user.id,
            name: user.name,
            instrument: user.instrument || '',
            location: user.location || 'Location not specified',
            distance: user.distance || 'Distance not available',
            rating: user.rating || 4.5,
            reviews: user.reviews || 0,
            experience: user.experience || '0 years',
            genres: user.genres || [],
            availability: user.availability || 'Not specified',
            image: user.avatar_url || 'https://randomuser.me/api/portraits/lego/1.jpg',
            online: user.online || false,
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
