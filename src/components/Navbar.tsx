import React from 'react';
import { Brain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onGetStarted: () => void;
}

const Navbar = ({ onGetStarted }: NavbarProps) => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              LearnSmart AI
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Testimonials</a>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.name}!</span>
                <button 
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-800"
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
}

export default Navbar;