import React from 'react';
import { Brain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onGetStarted: () => void;
}

const Navbar = ({ onGetStarted }: NavbarProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(user ? '/assessment' : '/', { replace: true });
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            to={user ? '/assessment' : '/'} 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              LearnSmart AI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {!user && location.pathname === '/' && (
              <>
                <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors">How it Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition-colors">Testimonials</a>
              </>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className={`text-gray-700 hover:text-indigo-600 transition-colors ${
                    location.pathname === '/profile' ? 'text-indigo-600' : ''
                  }`}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={onGetStarted}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;