
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui-custom/Card';

interface AgeStepProps {
  age: number | null;
  onAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AgeStep = ({ age, onAgeChange }: AgeStepProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <CardHeader>
        <CardTitle>Tell us about yourself</CardTitle>
        <CardDescription>This helps us personalize your experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            What's your age?
          </label>
          <input
            type="number"
            value={age || ''}
            onChange={onAgeChange}
            placeholder="Enter your age"
            className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-music-400"
          />
          {age !== null && age < 14 && (
            <p className="text-sm text-destructive mt-1">
              You must be at least 14 years old to create or join a band
            </p>
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default AgeStep;
