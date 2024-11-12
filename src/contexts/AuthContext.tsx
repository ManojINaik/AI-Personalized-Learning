import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut } from '../services/auth.service';
import { getUserProfile, updateUserProfile } from '../services/user.service';
import type { UserProfile } from '../services/user.service';

interface User {
  id: string;
  name: string;
  email: string | null;
  bio?: string;
  age?: string;
  grade?: string;
  interests?: string[];
  strengths?: string[];
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic';
  preferences?: {
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  notificationSettings?: {
    email: {
      courseUpdates: boolean;
      progressReports: boolean;
      newFeatures: boolean;
    };
    push: {
      lessonReminders: boolean;
      assessmentResults: boolean;
      achievements: boolean;
    };
  };
  setupCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const formatUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  try {
    await firebaseUser.getIdToken(true);
    const profile = await getUserProfile(firebaseUser.uid);
    
    return {
      id: firebaseUser.uid,
      name: profile?.name || firebaseUser.displayName || 'User',
      email: firebaseUser.email,
      bio: profile?.bio,
      age: profile?.age,
      grade: profile?.grade,
      interests: profile?.interests,
      strengths: profile?.strengths,
      learningStyle: profile?.learningStyle,
      preferences: profile?.preferences,
      notificationSettings: profile?.notificationSettings,
      setupCompleted: profile?.setupCompleted
    };
  } catch (error) {
    console.error('Error formatting user:', error);
    throw error;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const formattedUser = await formatUser(firebaseUser);
          setUser(formattedUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error formatting user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUser = async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      setLoading(true);
      setError(null);
      
      const { id, email, ...updateData } = data;
      await updateUserProfile(user.id, updateData as Partial<UserProfile>);
      
      if (auth.currentUser) {
        const updatedUser = await formatUser(auth.currentUser);
        setUser(updatedUser);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await authSignIn(email, password);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await authSignUp(name, email, password);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create account';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      await authSignOut();
      setUser(null);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign out';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}