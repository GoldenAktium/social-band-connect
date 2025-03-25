
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomeButton = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-music-600 transition-colors"
    >
      <Home className="h-4 w-4" />
      <span>Home</span>
    </Link>
  );
};

export default HomeButton;
