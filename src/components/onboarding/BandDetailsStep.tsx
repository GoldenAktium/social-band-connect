
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui-custom/Card';
import { cn } from '@/lib/utils';

export const genres = [
  { id: 'rock', name: 'Rock' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'pop', name: 'Pop' },
  { id: 'blues', name: 'Blues' },
  { id: 'classical', name: 'Classical' },
  { id: 'electronic', name: 'Electronic' },
  { id: 'folk', name: 'Folk' },
  { id: 'metal', name: 'Metal' },
  { id: 'r&b', name: 'R&B' },
  { id: 'hip-hop', name: 'Hip Hop' },
  { id: 'country', name: 'Country' },
  { id: 'indie', name: 'Indie' },
];

interface BandDetailsStepProps {
  userType: 'musician' | 'band-creator' | null;
  bandName: string;
  onBandNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedGenres: string[];
  onGenreSelect: (genreId: string) => void;
}

export const BandDetailsStep = ({ 
  userType, 
  bandName, 
  onBandNameChange, 
  selectedGenres, 
  onGenreSelect 
}: BandDetailsStepProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <CardHeader>
        <CardTitle>
          {userType === 'band-creator' ? 'About your band' : 'Your music style'}
        </CardTitle>
        <CardDescription>
          {userType === 'band-creator' 
            ? 'Tell us about the band you want to form' 
            : 'What genres do you play or are interested in?'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {userType === 'band-creator' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Band Name</label>
            <input
              type="text"
              value={bandName}
              onChange={onBandNameChange}
              placeholder="Enter your band name"
              className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-music-400"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {userType === 'band-creator' 
              ? 'What style of music will your band play?' 
              : 'What genres do you play or are interested in?'}
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const isSelected = selectedGenres.includes(genre.id);
              
              return (
                <button
                  key={genre.id}
                  onClick={() => onGenreSelect(genre.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    isSelected 
                      ? "bg-music-600 text-white" 
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  )}
                >
                  {genre.name}
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default BandDetailsStep;
