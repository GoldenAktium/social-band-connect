
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedContainer } from './AnimatedContainer';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outline' | 'minimal';
  animateIn?: boolean;
  animationDelay?: string;
}

export const Card = ({ 
  children, 
  className, 
  variant = 'default',
  animateIn = false,
  animationDelay = '0s'
}: CardProps) => {
  const getCardClass = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/90 dark:bg-black/30 backdrop-blur-md backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-glass';
      case 'outline':
        return 'bg-transparent border border-border shadow-none';
      case 'minimal':
        return 'bg-transparent border-none shadow-none';
      default:
        return 'bg-card text-card-foreground border border-border shadow-soft';
    }
  };

  const content = (
    <div className={cn(
      'rounded-xl p-6 transition-all duration-200',
      getCardClass(),
      className
    )}>
      {children}
    </div>
  );

  if (animateIn) {
    return (
      <AnimatedContainer animation="scale-in" delay={animationDelay}>
        {content}
      </AnimatedContainer>
    );
  }

  return content;
};

export const CardHeader = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <div className={cn('space-y-1.5 mb-4', className)}>
    {children}
  </div>
);

export const CardTitle = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <h3 className={cn('font-display text-xl font-semibold tracking-tight', className)}>
    {children}
  </h3>
);

export const CardDescription = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <p className={cn('text-sm text-muted-foreground', className)}>
    {children}
  </p>
);

export const CardContent = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

export const CardFooter = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) => (
  <div className={cn('flex items-center mt-4 pt-4 border-t', className)}>
    {children}
  </div>
);
