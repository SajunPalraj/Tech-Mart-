"use client";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { useCart } from "@/context/CartContext";

export default function FloatingControls() {
  const { cartCount } = useCart();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{
      position: 'fixed',
      bottom: { xs: 20, sm: 30 },
      right: { xs: 20, sm: 30 },
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      alignItems: 'center'
    }}>
      {/* Scroll to Top Arrow */}
      <IconButton
        onClick={scrollToTop}
        sx={{
          width: 44,
          height: 44,
          bgcolor: 'white',
          color: '#333',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? 'visible' : 'hidden',
          transform: showScrollTop ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            bgcolor: '#f5f5f5',
            color: '#2453d4',
            transform: 'translateY(-2px)'
          }
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>

      {/* Cart Button */}
      <Link href="/profile?tab=cart" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Badge 
          badgeContent={cartCount} 
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              right: 4,
              top: 4,
              border: '2px solid white',
              padding: '0 4px',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 800,
              fontSize: '0.65rem'
            }
          }}
        >
          <IconButton
            sx={{
              width: 50,
              height: 50,
              bgcolor: '#2453d4',
              color: 'white',
              boxShadow: '0 6px 20px rgba(36, 83, 212, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              '&:hover': {
                bgcolor: '#1c42a5',
                transform: 'scale(1.05) translateY(-2px)',
                boxShadow: '0 10px 25px rgba(36, 83, 212, 0.4)'
              }
            }}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Badge>
      </Link>

      {/* Chat Bot Button */}
      <IconButton
        sx={{
          width: 50,
          height: 50,
          bgcolor: '#e91e63',
          color: 'white',
          boxShadow: '0 6px 20px rgba(233, 30, 99, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            bgcolor: '#c2185b',
            transform: 'scale(1.05) translateY(-2px)',
            boxShadow: '0 10px 25px rgba(233, 30, 99, 0.4)'
          }
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </IconButton>
    </Box>
  );
}
