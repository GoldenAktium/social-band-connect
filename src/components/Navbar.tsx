
import { useState, useEffect } from 'react';
import { Menu, X, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Button from './ui-custom/Button';

interface NavbarProps {
  transparent?: boolean;
  className?: string;
}

export const Navbar = ({ transparent = false, className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Find Musicians', href: '/find-musicians' },
    { name: 'Form a Band', href: '/form-band' },
    { name: 'How It Works', href: '/how-it-works' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        scrolled || !transparent
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-display font-bold text-foreground"
        >
          <Music className="h-6 w-6 text-music-600" />
          <span>SocialBand</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground/80 hover:text-foreground font-medium text-sm transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button href="/login" variant="outline" size="sm">
              Log In
            </Button>
            <Button href="/signup" variant="music" size="sm">
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-border shadow-lg animate-slide-up">
          <div className="flex flex-col space-y-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-border">
              <Button href="/login" variant="outline" fullWidth>
                Log In
              </Button>
              <Button href="/signup" variant="music" fullWidth>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
