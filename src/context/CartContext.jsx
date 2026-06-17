"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const { user, loading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error parsing stored cart", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes, but only after it's initialized
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Clear cart when user logs out (after auth has finished loading)
  useEffect(() => {
    if (isInitialized && !loading && !user) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  }, [user, loading, isInitialized]);

  const addToCart = (item) => {
    if (!user) {
      alert("Only logged-in users can add items to the cart. Redirecting to login...");
      window.location.href = "/login";
      return;
    }
    // Standardize price as a number, removing '$', '₹' and commas
    const itemPriceString = typeof item.price === 'string' ? item.price.replace(/[$,₹]/g, '') : item.price;
    const priceNum = parseFloat(itemPriceString) || 0;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.title === item.title);
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
        return newItems;
      }
      return [...prevItems, { ...item, price: priceNum, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item, idx) => idx !== itemId && item.title !== itemId));
  };

  const updateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) => {
      return prevItems.map((item, idx) => {
        if (item.title === itemId || idx === itemId) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const displayCartItems = user ? cartItems : [];
  const cartCount = user ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const cartTotal = user ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;

  return (
    <CartContext.Provider value={{ cartItems: displayCartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
