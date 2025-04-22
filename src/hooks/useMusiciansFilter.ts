
import { useState, useMemo } from 'react';
import { Musician } from '@/types/musician';

export const useMusiciansFilter = (musicians: Musician[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState([10]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

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

  const filteredMusicians = useMemo(() => {
    // If there are no musicians, return empty array
    if (!musicians || musicians.length === 0) {
      return [];
    }

    return musicians.filter((musician) => {
      // Default to true if search is empty
      let matchesSearch = true;
      
      if (searchTerm !== '') {
        const musicianName = musician.name?.toLowerCase() || '';
        const musicianInstrument = musician.instrument?.toLowerCase() || '';
        
        matchesSearch = musicianName.includes(searchTerm.toLowerCase()) ||
          musicianInstrument.includes(searchTerm.toLowerCase()) ||
          (musician.genres && musician.genres.some(genre => 
            genre.toLowerCase().includes(searchTerm.toLowerCase())
          ));
      }
      
      // Distance filter - default to true if no distance info
      let matchesDistance = true;
      if (musician.distance) {
        const distanceValue = parseInt(musician.distance);
        matchesDistance = isNaN(distanceValue) || distanceValue <= distanceFilter[0];
      }
      
      // Genre filter - default to true if no selected genres
      let matchesGenre = true;
      if (selectedGenres.length > 0) {
        matchesGenre = musician.genres && musician.genres.some(genre => 
          selectedGenres.includes(genre)
        );
      }
      
      // Instrument filter - default to true if no selected instruments
      let matchesInstrument = true;
      if (selectedInstruments.length > 0) {
        matchesInstrument = musician.instrument && selectedInstruments.includes(musician.instrument);
      }
      
      // Online filter - only apply if showOnlineOnly is true
      const matchesOnline = !showOnlineOnly || musician.online === true;
      
      return matchesSearch && matchesDistance && matchesGenre && matchesInstrument && matchesOnline;
    });
  }, [musicians, searchTerm, distanceFilter, selectedGenres, selectedInstruments, showOnlineOnly]);

  return {
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
  };
};
