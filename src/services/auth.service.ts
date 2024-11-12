import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { UserProfile } from './user.service';

const handleAuthError = (error: any) => {
  let message = 'An error occurred during authentication';
  
  switch (error.code) {
    case 'auth/network-request-failed':
      message = 'Network error. Please check your internet connection.';
      break;
    case 'auth/email-already-in-use':
      message = 'This email is already registered.';
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address.';
      break;
    case 'auth/operation-not-allowed':
      message = 'Email/password accounts are not enabled.';
      break;
    case 'auth/weak-password':
      message = 'Password should be at least 6 characters.';
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled.';
      break;
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      message = 'Invalid email or password.';
      break;
    default:
      message = error.message || 'Authentication failed.';
  }

  const enhancedError = new Error(message);
  enhancedError.name = 'AuthError';
  throw enhancedError;
};

export async function signUp(name: string, email: string, password: string): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    const now = new Date();
    const userProfile: Omit<UserProfile, 'uid'> = {
      name,
      email,
      preferences: {
        emailNotifications: true,
        pushNotifications: true
      },
      notificationSettings: {
        email: {
          courseUpdates: true,
          progressReports: true,
          newFeatures: true
        },
        push: {
          lessonReminders: true,
          assessmentResults: true,
          achievements: true
        }
      },
      createdAt: now,
      updatedAt: now,
      lastLogin: now
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
  } catch (error) {
    handleAuthError(error);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      lastLogin: new Date(),
      updatedAt: new Date()
    }, { merge: true });

    return userCredential;
  } catch (error) {
    handleAuthError(error);
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    handleAuthError(error);
  }
}