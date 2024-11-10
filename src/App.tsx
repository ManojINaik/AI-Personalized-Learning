import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleGetStarted = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        <Navbar onGetStarted={handleGetStarted} />
        <main>
          <Hero onGetStarted={handleGetStarted} />
          <Features onGetStarted={handleGetStarted} />
        </main>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
          onSwitchMode={() => setAuthMode(mode => mode === 'signin' ? 'signup' : 'signin')}
        />
      </div>
    </AuthProvider>
  );
}

export default App;