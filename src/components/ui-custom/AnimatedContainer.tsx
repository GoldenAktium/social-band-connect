
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimationVariant = 
  'fade-in' | 
  'slide-up' | 
  'scale-in' | 
  'none';

interface AnimatedContainerProps {
  children: ReactNode;
  animation?: AnimationVariant;
  delay?: string;
  className?: string;
  once?: boolean;
}

export const AnimatedContainer = ({ 
  children, 
  animation = 'fade-in', 
  delay = '0s',
  className,
  once = true
}: AnimatedContainerProps) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'scale-in':
        return 'animate-scale-in';
      case 'none':
        return '';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div 
      className={cn(
        getAnimationClass(),
        className
      )} 
      style={{ 
        animationDelay: delay,
        animationFillMode: once ? 'forwards' : 'both',
        opacity: animation !== 'none' ? 0 : 1 // Start with opacity 0 for animations
      }}
    >
      {children}
    </div>
  );
};
