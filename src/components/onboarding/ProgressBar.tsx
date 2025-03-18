
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div 
            key={step}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
              step === currentStep 
                ? "bg-music-600 text-white" 
                : step < currentStep 
                  ? "bg-music-200 text-music-800" 
                  : "bg-gray-200 text-gray-400"
            )}
          >
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
        ))}
      </div>
      <div className="relative w-full h-1 bg-gray-200 rounded">
        <div 
          className="absolute h-1 bg-music-600 rounded transition-all"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
