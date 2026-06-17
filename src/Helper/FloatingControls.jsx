"use client";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { useCart } from "@/context/CartContext";
import { useAuth } from '@/context/AuthContext';
import ChatbotWindow from '@/components/ChatbotWindow';
import { keyframes } from '@mui/system';

const float = keyframes`
  0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  25% { transform: translateY(-14px) translateX(5px) rotate(1.5deg); }
  50% { transform: translateY(-6px) translateX(-4px) rotate(-1.5deg); }
  75% { transform: translateY(-16px) translateX(2px) rotate(1deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
`;

const blink = keyframes`
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.15); opacity: 1; filter: drop-shadow(0 0 3px #ffd54f); }
`;

const shadowPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(0.65); opacity: 0.12; }
`;

const swayLeft = keyframes`
  0%, 100% { transform: rotate(8deg); }
  50% { transform: rotate(-10deg); }
`;

const swayRight = keyframes`
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(10deg); }
`;

const bubbleFloat = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-4px) scale(1.05); }
`;

const chestPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; filter: drop-shadow(0 0 4px #00e5ff); }
`;

export default function FloatingControls() {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isAdmin = user?.email === "sajunpalraj2004@gmail.com";

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
      {!isAdmin && (
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
      )}

      {/* 3D Round Chat Bot Robot Model */}
      <Box
        onClick={() => setIsChatOpen(prev => !prev)}
        sx={{
          width: 90,
          height: 125,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover .robo-body-group': {
            animationPlayState: 'paused',
            transform: 'scale(1.12) translateY(-4px)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
          },
          '&:hover .robot-shadow': {
            transform: 'scale(0.8)',
            opacity: 0.22,
            transition: 'all 0.3s ease'
          },
          '&:hover .normal-eyes': { opacity: 0 },
          '&:hover .happy-eyes': { opacity: 1 },
          '&:hover .normal-mouth': { opacity: 0 },
          '&:hover .happy-mouth': { opacity: 1 },
          '&:hover .robot-speech': {
            transform: 'scale(1.1) translateY(-3px)',
            bgcolor: '#e91e63',
            color: 'white',
            borderColor: '#e91e63',
          }
        }}
      >
        {/* Speech Bubble */}
        <Box
          className="robot-speech"
          sx={{
            position: 'absolute',
            top: '-20px',
            right: '-10px',
            bgcolor: 'white',
            color: '#2453d4',
            border: '2.5px solid #2453d4',
            borderRadius: '12px 12px 12px 0px',
            px: 1.5,
            py: 0.5,
            boxShadow: '0 4px 12px rgba(36,83,212,0.18)',
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            animation: `${bubbleFloat} 3s ease-in-out infinite`,
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            zIndex: 10
          }}
        >
          Hi! 💬
        </Box>

        <svg width="80" height="110" viewBox="0 0 120 170" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'transform 0.3s ease' }}>
          <defs>
            {/* Head Gradient for 3D sphere effect */}
            <radialGradient id="headGrad" cx="35%" cy="30%" r="70%" fx="35%" fy="30%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#e6faff" />
              <stop offset="100%" stopColor="#bceeff" />
            </radialGradient>
            
            {/* Faceplate Gradient with your brand color (royal blue) */}
            <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2453d4" />
              <stop offset="100%" stopColor="#143494" />
            </linearGradient>

            {/* Body Gradient */}
            <radialGradient id="bodyGrad" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#e6faff" />
              <stop offset="100%" stopColor="#8ce1ff" />
            </radialGradient>

            {/* Shoulder/Branding Gradients (Theme Royal Blue & Pink) */}
            <linearGradient id="shoulderGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2453d4" />
              <stop offset="100%" stopColor="#1c42a5" />
            </linearGradient>
            
            <linearGradient id="themePinkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#c2185b" />
            </linearGradient>

            {/* Glowing Eye Filter */}
            <filter id="eyeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.0" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ROBOT BODY GROUP (with floating animation) */}
          <g className="robo-body-group" style={{ animation: `${float} 5s ease-in-out infinite`, transformOrigin: 'center 85px' }}>
            
            {/* Left Arm */}
            <g className="left-arm" style={{ animation: `${swayLeft} 3s ease-in-out infinite`, transformOrigin: '35px 95px' }}>
              {/* Shoulder Cap (Theme Pink) */}
              <path d="M28 92 C28 85, 36 82, 38 92 C38 98, 32 105, 28 92 Z" fill="url(#themePinkGrad)" />
              {/* Arm Tip */}
              <path d="M28 96 C27 105, 30 120, 31 126 C33 126, 36 110, 37 98 Z" fill="#ffffff" stroke="#8ce1ff" strokeWidth="1.2" />
            </g>

            {/* Right Arm */}
            <g className="right-arm" style={{ animation: `${swayRight} 3s ease-in-out infinite`, transformOrigin: '85px 95px' }}>
              {/* Shoulder Cap (Theme Pink) */}
              <path d="M92 92 C92 85, 84 82, 82 92 C82 98, 88 105, 92 92 Z" fill="url(#themePinkGrad)" />
              {/* Arm Tip */}
              <path d="M92 96 C93 105, 90 120, 89 126 C87 126, 84 110, 83 98 Z" fill="#ffffff" stroke="#8ce1ff" strokeWidth="1.2" />
            </g>

            {/* Neck Connection */}
            <rect x="54" y="80" width="12" height="10" rx="3" fill="#cfd8dc" stroke="#90a4ae" strokeWidth="0.8" />

            {/* Torso (Body) */}
            <rect x="40" y="86" width="40" height="46" rx="20" fill="url(#bodyGrad)" stroke="#2453d4" strokeWidth="2" />
            
            {/* Chest Screen (Shield shape in Theme Royal Blue) */}
            <path d="M48 94 C48 94, 60 92, 72 94 C72 108, 68 122, 60 124 C52 122, 48 108, 48 94 Z" fill="url(#faceGrad)" stroke="#1c42a5" strokeWidth="1" />
            
            {/* AI Text on Chest */}
            <text x="60" y="112" fontFamily="var(--font-montserrat)" fontWeight="900" fontSize="11" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">AI</text>

            {/* Head Container */}
            <g className="head-group">
              {/* Head Base (Sphere) */}
              <circle cx="60" cy="50" r="36" fill="url(#headGrad)" stroke="#2453d4" strokeWidth="2" />

              {/* Faceplate Outline / Border */}
              <rect x="36" y="32" width="48" height="34" rx="14" fill="#2453d4" opacity="0.15" />

              {/* Faceplate Screen */}
              <rect x="38" y="34" width="44" height="30" rx="12" fill="url(#faceGrad)" stroke="#2453d4" strokeWidth="1" />

              {/* NORMAL EYES (Ovals that blink) */}
              <g className="normal-eyes" style={{ transition: 'opacity 0.2s ease' }}>
                <rect x="49" y="42" width="5" height="11" rx="2.5" fill="#00e5ff" filter="url(#eyeGlow)" className="robo-eye-left" style={{ animation: `${blink} 4s infinite`, transformOrigin: '51.5px 47.5px' }} />
                <rect x="66" y="42" width="5" height="11" rx="2.5" fill="#00e5ff" filter="url(#eyeGlow)" className="robo-eye-right" style={{ animation: `${blink} 4s infinite`, transformOrigin: '68.5px 47.5px' }} />
              </g>

              {/* HAPPY EYES (^ ^) - visible on hover */}
              <g className="happy-eyes" style={{ opacity: 0, transition: 'opacity 0.2s ease' }}>
                <path d="M46 48 Q51.5 41 57 48" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#eyeGlow)" />
                <path d="M63 48 Q68.5 41 74 48" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#eyeGlow)" />
              </g>

              {/* NORMAL MOUTH (Smile curve) */}
              <path className="normal-mouth" d="M54 57 Q60 62 66 57" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" fill="none" filter="url(#eyeGlow)" style={{ transition: 'opacity 0.2s ease' }} />

              {/* HAPPY MOUTH (Open Laughing D shape) - visible on hover */}
              <path className="happy-mouth" d="M54 56 Q60 65 66 56 Z" fill="#00e5ff" filter="url(#eyeGlow)" style={{ opacity: 0, transition: 'opacity 0.2s ease' }} />
              
              {/* Headset Headband (Theme Pink!) */}
              <path d="M30 45 C30 20, 90 20, 90 45" stroke="#e91e63" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              
              {/* Headset Earcups (Theme Pink!) */}
              <rect x="24" y="39" width="11" height="19" rx="5" fill="#e91e63" stroke="white" strokeWidth="1.2" transform="rotate(-10, 29.5, 48.5)" />
              <rect x="85" y="39" width="11" height="19" rx="5" fill="#e91e63" stroke="white" strokeWidth="1.2" transform="rotate(10, 90.5, 48.5)" />
              
              {/* Headset Mic (Theme Pink!) */}
              <path d="M33 55 C33 66, 54 70, 56 68" stroke="#e91e63" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="56" cy="68" r="3.5" fill="#e91e63" stroke="white" strokeWidth="0.8" />
            </g>

          </g>
        </svg>

        {/* Hover Shadow underneath */}
        <Box
          className="robot-shadow"
          sx={{
            width: '44px',
            height: '6px',
            bgcolor: 'black',
            borderRadius: '50%',
            position: 'absolute',
            bottom: '2px',
            filter: 'blur(3.5px)',
            animation: `${shadowPulse} 5s ease-in-out infinite`,
            transition: 'all 0.3s ease'
          }}
        />
      </Box>

      {/* Chat Bot Window Panel */}
      <ChatbotWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </Box>
  );
}
