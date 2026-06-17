"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Error parsing stored wishlist", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save wishlist to localStorage whenever it changes, but only after it's initialized
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isInitialized]);

  const addToWishlist = (item) => {
    if (!user) {
      alert("Only logged-in users can add items to their wishlist. Redirecting to login...");
      window.location.href = "/login";
      return;
    }
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((i) => i.title === item.title);
      if (exists) return prevItems;
      return [...prevItems, item];
    });
  };

  const removeFromWishlist = (itemIdentifier) => {
    setWishlistItems((prevItems) => 
      prevItems.filter((item) => item.title !== itemIdentifier && item.id !== itemIdentifier)
    );
  };

  const toggleWishlist = (item) => {
    if (!user) {
      alert("Only logged-in users can use the wishlist. Redirecting to login...");
      window.location.href = "/login";
      return;
    }
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((i) => i.title === item.title);
      if (exists) {
        return prevItems.filter((i) => i.title !== item.title);
      }
      return [...prevItems, item];
    });
  };

  const isInWishlist = (itemTitle) => {
    return wishlistItems.some((i) => i.title === itemTitle);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
