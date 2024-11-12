import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import VerticalNav from './components/VerticalNav';
import Hero from './components/Hero';
import Features from './components/Features';
import Profile from './components/Profile';
import ProfileSetup from './components/onboarding/ProfileSetup';
import AuthModal from './components/AuthModal';
import { useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Import pages
import AssessmentPage from './pages/AssessmentPage';
import LearningPathsPage from './pages/LearningPathsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LibraryPage from './pages/LibraryPage';
import MentoringPage from './pages/MentoringPage';
import AchievementsPage from './pages/AchievementsPage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleGetStarted = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onGetStarted={handleGetStarted} />
      <VerticalNav />
      <div className="pl-64 pt-16">
        {children}
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(mode => mode === 'signin' ? 'signup' : 'signin')}
      />
    </div>
  );
};

const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleGetStarted = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
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
  );
};

function App() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
      }
    >
      <Routes>
        <Route 
          path="/" 
          element={
            user ? (
              <Navigate to={(location.state as any)?.from?.pathname || '/assessment'} replace />
            ) : (
              <HomePage />
            )
          } 
        />
        
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        
        <Route
          path="/setup"
          element={
            <PrivateRoute>
              <ProfileSetup />
            </PrivateRoute>
          }
        />

        <Route
          path="/assessment"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <AssessmentPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/learning-paths"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <LearningPathsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <AnalyticsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/library"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <LibraryPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/mentoring"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <MentoringPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/achievements"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <AchievementsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;