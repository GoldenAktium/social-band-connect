
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type DateSelectorProps = {
  onChange: (date: Date | null) => void;
  defaultValue?: Date;
  className?: string;
};

const DateSelector: React.FC<DateSelectorProps> = ({ onChange, defaultValue, className }) => {
  const [day, setDay] = useState<number>(defaultValue?.getDate() || 1);
  const [month, setMonth] = useState<number>(defaultValue?.getMonth() || 0);
  const [year, setYear] = useState<number>(defaultValue?.getFullYear() || new Date().getFullYear() - 20);

  useEffect(() => {
    const date = new Date(year, month, day);
    onChange(date);
  }, [day, month, year, onChange]);

  // Generate arrays for days, months, and years
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Ensure day is valid for the selected month/year (e.g., handle February 29th in non-leap years)
  useEffect(() => {
    const maxDays = new Date(year, month + 1, 0).getDate();
    if (day > maxDays) {
      setDay(maxDays);
    }
  }, [month, year, day]);

  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      <div className="relative">
        <label className="block text-xs text-muted-foreground mb-2">Day</label>
        <div className="relative">
          <select
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
            className="w-full appearance-none rounded-md border border-input bg-background p-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-8"
          >
            {days.map((d) => (
              <option key={`day-${d}`} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>
      
      <div className="relative">
        <label className="block text-xs text-muted-foreground mb-2">Month</label>
        <div className="relative">
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="w-full appearance-none rounded-md border border-input bg-background p-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-8"
          >
            {months.map((m, i) => (
              <option key={`month-${i}`} value={i}>
                {m}
              </option>
            ))}
          </select>
          <ChevronDown className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>
      
      <div className="relative">
        <label className="block text-xs text-muted-foreground mb-2">Year</label>
        <div className="relative">
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full appearance-none rounded-md border border-input bg-background p-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pr-8"
          >
            {years.map((y) => (
              <option key={`year-${y}`} value={y}>
                {y}
              </option>
            ))}
          </select>
          <ChevronDown className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
