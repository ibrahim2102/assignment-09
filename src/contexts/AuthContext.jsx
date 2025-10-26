import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Auth Provider
  const googleProvider = new GoogleAuthProvider();

  // Sign up function
  async function signup(email, password, firstName, lastName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
      
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Sign in function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Google Sign-In function
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Sign out function
  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
