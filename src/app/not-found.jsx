"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { motion } from 'framer-motion';

export default function NotFound() {
  const [spinCount, setSpinCount] = useState(0);
  const [isSlinging, setIsSlinging] = useState(false);

  // Trigger a fun zero-gravity spin/slingshot animation
  const handleSlingshot = () => {
    if (isSlinging) return;
    setIsSlinging(true);
    setSpinCount((prev) => prev + 1);
    setTimeout(() => {
      setIsSlinging(false);
    }, 1200);
  };

  // Generate random twinkling stars for background
  const stars = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <Box 
      sx={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        px: 3, 
        py: 8,
        bgcolor: '#07090e',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Starfield Background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      ))}

      {/* Floating Nebula clouds */}
      <Box 
        sx={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(36, 83, 212, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <Box 
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 30, 99, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <Box sx={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 600, textAlign: 'center' }}>
        
        {/* DRAGGABLE / SLINGSHOT ASTRONAUT CHARACTER */}
        <Box sx={{ position: 'relative', height: 220, width: 220, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Gravitational Field Orbit Ring */}
          <Box 
            sx={{
              position: 'absolute',
              width: 190,
              height: 190,
              border: '1px dashed rgba(255,255,255,0.08)',
              borderRadius: '50%',
              animation: 'spin 20s linear infinite',
              pointerEvents: 'none',
              '@keyframes spin': {
                '100%': { transform: 'rotate(360deg)' }
              }
            }}
          />

          <motion.div
            drag
            dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
            dragElastic={0.15}
            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
            animate={
              isSlinging 
                ? { 
                    rotate: spinCount * 360 * 2,
                    x: [0, -180, 180, 0],
                    y: [0, 80, -80, 0],
                    scale: [1, 0.4, 1.3, 1]
                  } 
                : { 
                    y: [0, -12, 0],
                    rotate: [0, 3, -3, 0]
                  }
            }
            transition={
              isSlinging 
                ? { duration: 1.2, ease: "easeInOut" } 
                : { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }
            style={{
              cursor: 'grab',
              zIndex: 10,
              position: 'relative'
            }}
          >
            {/* Astronaut SVG Graphic */}
            <svg width="130" height="150" viewBox="0 0 130 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Backpack */}
              <rect x="35" y="45" width="60" height="60" rx="10" fill="#2d3748" stroke="#4a5568" strokeWidth="4"/>
              
              {/* Helmet Glass Glow */}
              <circle cx="65" cy="40" r="30" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="4"/>
              <path d="M45 35C45 23.9543 53.9543 15 65 15C76.0457 15 85 23.9543 85 35" stroke="#cbd5e1" strokeWidth="2"/>
              {/* Visor */}
              <rect x="43" y="25" width="44" height="24" rx="12" fill="#0f172a" stroke="#2453d4" strokeWidth="3"/>
              {/* Visor Glare */}
              <path d="M50 30H65" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              
              {/* Body Suit */}
              <rect x="40" y="68" width="50" height="50" rx="15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4"/>
              
              {/* Flag Patch */}
              <rect x="61" y="76" width="8" height="6" fill="#2453d4"/>
              <rect x="61" y="82" width="8" height="2" fill="#e91e63"/>
              
              {/* Arms */}
              {/* Left Arm */}
              <path d="M40 78C30 78 22 86 22 96" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round"/>
              <circle cx="22" cy="96" r="6" fill="#2d3748"/>
              {/* Right Arm */}
              <path d="M90 78C100 78 108 86 108 96" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round"/>
              <circle cx="108" cy="96" r="6" fill="#2d3748"/>

              {/* Legs */}
              {/* Left Leg */}
              <path d="M48 116V138" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round"/>
              <rect x="42" y="132" width="12" height="8" rx="2" fill="#2d3748"/>
              {/* Right Leg */}
              <path d="M82 116V138" stroke="#f8fafc" strokeWidth="12" strokeLinecap="round"/>
              <rect x="76" y="132" width="12" height="8" rx="2" fill="#2d3748"/>

              {/* Tether wire floating */}
              <path d="M65 118C65 130 50 135 45 145" stroke="#2453d4" strokeWidth="2" strokeDasharray="4 4"/>
            </svg>
            
            {/* Draggable indicator tooltip */}
            <Box 
              sx={{
                position: 'absolute',
                top: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(36, 83, 212, 0.8)',
                color: 'white',
                fontSize: '0.65rem',
                py: 0.3,
                px: 1,
                borderRadius: 2,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                opacity: 0.7,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              DRAG ME
            </Box>
          </motion.div>
        </Box>

        <Typography variant="h1" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: { xs: '6rem', sm: '8.5rem' }, lineHeight: 1, letterSpacing: -2, mb: 1, background: 'linear-gradient(45deg, #2453d4 0%, #e91e63 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          404
        </Typography>
        
        <Typography variant="h4" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
          Lost in Deep Space
        </Typography>
        
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, fontFamily: 'var(--font-geist-sans)' }}>
          The coordinates you requested are out of range. The page has drifted away from our network orbit, or perhaps it never existed at all.
        </Typography>

        {/* INTERACTIVE ACTIONS */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2.5, width: '100%', justifyContent: 'center' }}>
          
          <Button
            variant="contained"
            onClick={handleSlingshot}
            disabled={isSlinging}
            startIcon={<AutoAwesomeIcon />}
            sx={{
              bgcolor: '#e91e63',
              color: '#ffffff',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 800,
              px: 4,
              py: 1.5,
              borderRadius: '999px',
              letterSpacing: 1,
              textTransform: 'uppercase',
              boxShadow: '0 8px 25px rgba(233, 30, 99, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#d81b60',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 30px rgba(233, 30, 99, 0.5)',
              },
              '&:disabled': {
                bgcolor: 'rgba(233, 30, 99, 0.4)',
                color: 'rgba(255,255,255,0.6)'
              }
            }}
          >
            Discharge Gravity (Spin)
          </Button>

          <Button
            variant="outlined"
            href="/"
            startIcon={<HomeIcon />}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 800,
              px: 4,
              py: 1.5,
              borderRadius: '999px',
              letterSpacing: 1,
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#ffffff',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            Back to Home
          </Button>
        </Box>

        <Typography 
          variant="caption" 
          sx={{ 
            mt: 5, 
            color: 'rgba(255,255,255,0.25)', 
            fontFamily: 'var(--font-geist-sans)' 
          }}
        >
          Tip: Grab the astronaut with your cursor and fling him across space!
        </Typography>
      </Box>
    </Box>
  );
}
