"use client";

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import HomeIcon from '@mui/icons-material/Home';
import BugReportIcon from '@mui/icons-material/BugReport';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion, AnimatePresence } from 'framer-motion';

export default function Error({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isShocked, setIsShocked] = useState(false);
  const [particles, setParticles] = useState([]);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Pupil cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || isShocked) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate absolute center of the robot face
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 8; // Limit movement radius of pupils
      
      const angle = Math.atan2(deltaY, deltaX);
      const x = Math.min(distance, 150) / 150 * maxDistance * Math.cos(angle);
      const y = Math.min(distance, 150) / 150 * maxDistance * Math.sin(angle);
      
      setPupilOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isShocked]);

  // Handle sparking particles on click
  const triggerShock = (e) => {
    if (isShocked) return;
    setIsShocked(true);
    
    // Generate particles
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      angle: (i / 12) * 2 * Math.PI + (Math.random() - 0.5) * 0.5,
      speed: Math.random() * 80 + 40,
      size: Math.random() * 6 + 3,
    }));
    
    setParticles(newParticles);
    
    setTimeout(() => {
      setIsShocked(false);
      setParticles([]);
    }, 850);
  };

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
        bgcolor: '#0a0d14',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Matrix/Grid Overlay */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(36, 83, 212, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <Box sx={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 600, textAlign: 'center' }}>
        
        {/* MALFUNCTIONING ROBOT CHARACTER */}
        <Box 
          ref={containerRef}
          onClick={triggerShock}
          sx={{ 
            position: 'relative', 
            cursor: 'pointer',
            mb: 4,
            width: 160,
            height: 160,
          }}
        >
          <motion.div
            animate={isShocked ? {
              x: [0, -8, 8, -6, 6, -4, 4, 0],
              y: [0, 8, -8, 6, -6, 4, -4, 0],
              rotate: [0, -5, 5, -3, 3, -1, 1, 0],
            } : {
              y: [0, -6, 0]
            }}
            transition={isShocked ? { duration: 0.6, ease: "easeInOut" } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            {/* Robot Head Body */}
            <Box 
              sx={{ 
                width: '100%', 
                height: '85%', 
                bgcolor: '#1f2430', 
                border: `4px solid ${isShocked ? '#ff3e3e' : '#2453d4'}`,
                borderRadius: '24px',
                boxShadow: isShocked 
                  ? '0 0 35px rgba(255, 62, 62, 0.6), inset 0 0 15px rgba(255, 62, 62, 0.3)' 
                  : '0 0 25px rgba(36, 83, 212, 0.4), inset 0 0 10px rgba(36, 83, 212, 0.2)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Scanline CRT Overlay */}
              <Box 
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
                  backgroundSize: '100% 4px',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              />

              {/* Eyes Container */}
              <Box sx={{ display: 'flex', gap: 4, zIndex: 1 }}>
                {/* Left Eye */}
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: isShocked ? '#581010' : '#0e1118', 
                    borderRadius: '50%', 
                    position: 'relative',
                    border: `2px solid ${isShocked ? '#ff3e3e' : '#2453d4'}`
                  }}
                >
                  {isShocked ? (
                    <Typography sx={{ color: '#ff3e3e', fontSize: 20, fontWeight: 900, textAlign: 'center', lineHeight: 1.3 }}>X</Typography>
                  ) : (
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        bgcolor: '#2453d4', 
                        borderRadius: '50%', 
                        position: 'absolute', 
                        top: '30%', 
                        left: '30%',
                        transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                        boxShadow: '0 0 8px #2453d4',
                        transition: 'transform 0.1s ease-out'
                      }} 
                    />
                  )}
                </Box>

                {/* Right Eye */}
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: isShocked ? '#581010' : '#0e1118', 
                    borderRadius: '50%', 
                    position: 'relative',
                    border: `2px solid ${isShocked ? '#ff3e3e' : '#2453d4'}`
                  }}
                >
                  {isShocked ? (
                    <Typography sx={{ color: '#ff3e3e', fontSize: 20, fontWeight: 900, textAlign: 'center', lineHeight: 1.3 }}>X</Typography>
                  ) : (
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        bgcolor: '#2453d4', 
                        borderRadius: '50%', 
                        position: 'absolute', 
                        top: '30%', 
                        left: '30%',
                        transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                        boxShadow: '0 0 8px #2453d4',
                        transition: 'transform 0.1s ease-out'
                      }} 
                    />
                  )}
                </Box>
              </Box>

              {/* Malfunction Screen Glitch Line */}
              <Box 
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: 2,
                  bgcolor: isShocked ? 'rgba(255, 62, 62, 0.4)' : 'rgba(36, 83, 212, 0.2)',
                  animation: 'glitch-line 2.5s infinite linear',
                  zIndex: 2,
                  '@keyframes glitch-line': {
                    '0%': { top: '0%' },
                    '100%': { top: '100%' }
                  }
                }}
              />
            </Box>

            {/* Robot Neck */}
            <Box 
              sx={{ 
                width: 30, 
                height: 15, 
                bgcolor: '#171a24', 
                border: '2px solid #333',
                margin: '0 auto',
                borderRadius: '0 0 4px 4px'
              }}
            />

            {/* Robot Base/Shoulders */}
            <Box 
              sx={{ 
                width: 80, 
                height: 10, 
                bgcolor: '#282f42', 
                margin: '0 auto',
                borderRadius: '4px 4px 0 0'
              }}
            />
          </motion.div>

          {/* Sparks/Particles on click */}
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: -20, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(p.angle) * p.speed,
                  y: Math.sin(p.angle) * p.speed - 20,
                  opacity: 0,
                  scale: 0.2
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  backgroundColor: Math.random() > 0.5 ? '#ffd43b' : '#ff4a4a',
                  boxShadow: '0 0 10px rgba(255, 212, 59, 0.8)',
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              />
            ))}
          </AnimatePresence>
        </Box>

        <Typography variant="h3" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, letterSpacing: 2, mb: 1, textTransform: 'uppercase' }}>
          System Crash!
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontFamily: 'var(--font-geist-sans)' }}>
          Whoops! The robot tripped on a wire. We hit an unexpected error.
        </Typography>

        {/* INTERACTIVE ACTIONS */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2.5, mb: 6, width: '100%', justifyContent: 'center' }}>
          
          <Button
            variant="contained"
            onClick={() => reset()}
            startIcon={<ReplayIcon />}
            sx={{
              bgcolor: '#2453d4',
              color: '#ffffff',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 800,
              px: 4,
              py: 1.5,
              borderRadius: '999px',
              letterSpacing: 1,
              textTransform: 'uppercase',
              boxShadow: '0 8px 25px rgba(36, 83, 212, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#1c42a5',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 30px rgba(36, 83, 212, 0.5)',
              }
            }}
          >
            Reboot System (Reload)
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

        {/* TECHNICAL DETAILS ACCORDION */}
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            bgcolor: '#0e121b',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            overflow: 'hidden',
            textAlign: 'left'
          }}
        >
          <Box
            onClick={() => setShowDetails(!showDetails)}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.02)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <BugReportIcon sx={{ color: '#ff3e3e' }} />
              <Typography variant="subtitle2" sx={{ fontFamily: 'var(--font-geist-mono)', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
                Technical Details
              </Typography>
            </Box>
            {showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Box>

          <Collapse in={showDetails}>
            <Box 
              sx={{ 
                p: 3, 
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                bgcolor: '#07090e',
                maxHeight: 180,
                overflowY: 'auto'
              }}
            >
              <Typography 
                variant="body2" 
                component="pre" 
                sx={{ 
                  fontFamily: 'var(--font-geist-mono)', 
                  color: '#ffa3a3', 
                  whiteSpace: 'pre-wrap', 
                  wordBreak: 'break-all',
                  m: 0,
                  fontSize: '0.8rem',
                  lineHeight: 1.5
                }}
              >
                {error?.message || 'Unknown system compilation or runtime exception.'}
                {error?.digest && `\nDigest ID: ${error.digest}`}
              </Typography>
            </Box>
          </Collapse>
        </Paper>
        
        <Typography 
          variant="caption" 
          sx={{ 
            mt: 4, 
            color: 'rgba(255,255,255,0.3)', 
            fontFamily: 'var(--font-geist-sans)' 
          }}
        >
          Tip: Hover over and click the robot to release high-voltage electric shocks!
        </Typography>
      </Box>
    </Box>
  );
}
