"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import axios from 'axios';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function syncUser() {
      if (!isLoaded) return;

      if (isSignedIn && clerkUser) {
        try {
          const email = clerkUser.primaryEmailAddress?.emailAddress;
          if (email) {
            const username = clerkUser.username || clerkUser.firstName || email.split('@')[0];
            const avatarUrl = clerkUser.imageUrl || "";
            
            const res = await axios.get(
              `/API/profile?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}&avatarUrl=${encodeURIComponent(avatarUrl)}`
            );
            
            setUser(res.data.user);
          }
        } catch (err) {
          console.error("Error syncing Clerk user to MongoDB:", err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    syncUser();
  }, [isLoaded, isSignedIn, clerkUser]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      console.error("Error signing out with Clerk:", err);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading: loading || !isLoaded, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
