
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button as ShadcnButton } from '@/components/ui/button';

interface ButtonProps {
  children: ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'music';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
}

export const Button = ({
  children,
  variant = 'default',
  size = 'default',
  className,
  onClick,
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  href,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  // Extend with custom variants
  const customVariants = {
    'music': 'bg-music-600 text-white hover:bg-music-700 transition-all duration-300 transform hover:translate-y-[-2px]',
  };

  const buttonClassName = cn(
    variant === 'music' ? customVariants.music : '',
    fullWidth ? 'w-full' : '',
    className
  );

  if (href) {
    return (
      <ShadcnButton
        asChild
        variant={variant === 'music' ? 'default' : variant}
        size={size}
        className={buttonClassName}
        disabled={disabled}
        {...props}
      >
        <a href={href}>{buttonContent}</a>
      </ShadcnButton>
    );
  }

  return (
    <ShadcnButton
      variant={variant === 'music' ? 'default' : variant}
      size={size}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {buttonContent}
    </ShadcnButton>
  );
};

export default Button;
