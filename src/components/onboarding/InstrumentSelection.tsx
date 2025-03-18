
import { Guitar, Mic, Users, Music } from 'lucide-react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui-custom/Card';
import { cn } from '@/lib/utils';

export const instruments = [
  { id: 'guitar', name: 'Guitar', icon: Guitar },
  { id: 'vocals', name: 'Vocals', icon: Mic },
  { id: 'drums', name: 'Drums', icon: Users },
  { id: 'bass', name: 'Bass', icon: Music },
  { id: 'keyboard', name: 'Keyboard', icon: Music },
  { id: 'other', name: 'Other', icon: Music },
];

interface InstrumentSelectionProps {
  selectedInstruments: string[];
  onInstrumentSelect: (instrumentId: string) => void;
}

export const InstrumentSelection = ({ selectedInstruments, onInstrumentSelect }: InstrumentSelectionProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <CardHeader>
        <CardTitle>What instruments do you play?</CardTitle>
        <CardDescription>Select all that apply</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {instruments.map((instrument) => {
            const Icon = instrument.icon;
            const isSelected = selectedInstruments.includes(instrument.id);
            
            return (
              <button
                key={instrument.id}
                onClick={() => onInstrumentSelect(instrument.id)}
                className={cn(
                  "flex items-center p-3 rounded-lg border-2 transition-all",
                  isSelected 
                    ? "border-music-600 bg-music-50/50" 
                    : "border-border hover:border-music-300"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full mr-3",
                  isSelected ? "bg-music-100 text-music-700" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium">{instrument.name}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </div>
  );
};

export default InstrumentSelection;
