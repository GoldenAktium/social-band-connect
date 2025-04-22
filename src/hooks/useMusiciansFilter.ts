
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
    return musicians.filter((musician) => {
      // Search term filter
      const musicianName = musician.name?.toLowerCase() || '';
      const musicianInstrument = musician.instrument?.toLowerCase() || '';
      
      const matchesSearch = searchTerm === '' || 
        musicianName.includes(searchTerm.toLowerCase()) ||
        musicianInstrument.includes(searchTerm.toLowerCase()) ||
        (musician.genres && musician.genres.some(genre => 
          genre.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      // Distance filter
      const distanceValue = musician.distance ? parseInt(musician.distance) : undefined;
      const matchesDistance = distanceValue === undefined || distanceValue <= distanceFilter[0];
      
      // Genre filter
      const matchesGenre = selectedGenres.length === 0 || 
        (musician.genres && musician.genres.some(genre => selectedGenres.includes(genre)));
      
      // Instrument filter
      const matchesInstrument = selectedInstruments.length === 0 || 
        (musician.instrument && selectedInstruments.includes(musician.instrument));
      
      // Online filter
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
