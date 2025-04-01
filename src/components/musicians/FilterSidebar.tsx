import React from 'react';
import { Filter, MapPin, Music, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterSidebarProps {
  distanceFilter: number[];
  setDistanceFilter: (value: number[]) => void;
  showAvailable: boolean;
  setShowAvailable: (value: boolean) => void;
  showOnlineOnly: boolean;
  setShowOnlineOnly: (value: boolean) => void;
  selectedGenres: string[];
  toggleGenre: (genre: string) => void;
  selectedInstruments: string[];
  toggleInstrument: (instrument: string) => void;
  allGenres: string[];
  allInstruments: string[];
}

const FilterSidebar = ({
  distanceFilter,
  setDistanceFilter,
  showAvailable,
  setShowAvailable,
  showOnlineOnly,
  setShowOnlineOnly,
  selectedGenres,
  toggleGenre,
  selectedInstruments,
  toggleInstrument,
  allGenres,
  allInstruments,
}: FilterSidebarProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Distance Filter */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Distance
          </h3>
          <div className="space-y-2">
            <Slider
              value={distanceFilter}
              min={1}
              max={50}
              step={1}
              onValueChange={setDistanceFilter}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1 mile</span>
              <span>{distanceFilter[0]} miles</span>
              <span>50 miles</span>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Instrument Filter */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center">
            <Music className="mr-2 h-4 w-4" />
            Instrument
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedInstruments.length === 0 
                  ? "Select instruments" 
                  : `${selectedInstruments.length} selected`}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Instruments</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {allInstruments.map((instrument) => (
                  <DropdownMenuItem 
                    key={instrument}
                    onClick={() => toggleInstrument(instrument)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border rounded-sm flex items-center justify-center">
                      {selectedInstruments.includes(instrument) && (
                        <div className="w-2 h-2 bg-primary rounded-sm" />
                      )}
                    </div>
                    {instrument}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedInstruments.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedInstruments.map(instrument => (
                <Badge 
                  key={instrument} 
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleInstrument(instrument)}
                >
                  {instrument} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Genre Filter */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center">
            <Music className="mr-2 h-4 w-4" />
            Genre
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedGenres.length === 0 
                  ? "Select genres" 
                  : `${selectedGenres.length} selected`}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Genres</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {allGenres.map((genre) => (
                  <DropdownMenuItem 
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border rounded-sm flex items-center justify-center">
                      {selectedGenres.includes(genre) && (
                        <div className="w-2 h-2 bg-primary rounded-sm" />
                      )}
                    </div>
                    {genre}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedGenres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedGenres.map(genre => (
                <Badge 
                  key={genre} 
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Availability Filter */}
        <div className="flex items-center space-x-2">
          <Switch
            id="available-only"
            checked={showAvailable}
            onCheckedChange={setShowAvailable}
          />
          <Label htmlFor="available-only">Available now</Label>
        </div>
        
        {/* Online Filter */}
        <div className="flex items-center space-x-2">
          <Switch
            id="online-only"
            checked={showOnlineOnly}
            onCheckedChange={setShowOnlineOnly}
          />
          <Label htmlFor="online-only">Online users only</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
