import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Brain, Target, BarChart3, BookOpen, UserCircle, Star } from 'lucide-react';

const navItems = [
  {
    path: '/assessment',
    icon: Brain,
    label: 'Smart Assessment',
    description: 'AI-powered evaluations that adapt to your knowledge level'
  },
  {
    path: '/learning-paths',
    icon: Target,
    label: 'Custom Learning Paths',
    description: 'Personalized curriculum for your goals'
  },
  {
    path: '/analytics',
    icon: BarChart3,
    label: 'Progress Analytics',
    description: 'Track your learning journey'
  },
  {
    path: '/library',
    icon: BookOpen,
    label: 'Content Library',
    description: 'Access diverse learning materials'
  },
  {
    path: '/mentoring',
    icon: UserCircle,
    label: '1-on-1 Mentoring',
    description: 'Connect with expert mentors'
  },
  {
    path: '/achievements',
    icon: Star,
    label: 'Gamified Learning',
    description: 'Earn rewards and achievements'
  }
];

const VerticalNav = () => {
  const location = useLocation();

  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-16 p-4 overflow-y-auto">
      <div className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center p-3 rounded-lg transition-colors
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-700 hover:bg-gray-50'}
            `}
          >
            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default VerticalNav;