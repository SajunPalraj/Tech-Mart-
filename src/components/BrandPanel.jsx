"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import keyboard from "@/assets/keyboard.png";

export default function BrandPanel() {
  return (
    <Box sx={{ bgcolor: '#ffffff', py: 8, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
      {/* Logos Row */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: { xs: 3, md: 5 }, 
        mb: 8,
      }}>
        {/* Logo 1 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 100, height: 40 }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M10 26L22 6M6 26L18 6M14 26L26 6" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </Box>
        <Box sx={{ width: '1px', height: '24px', bgcolor: '#e2e8f0', display: { xs: 'none', lg: 'block' } }} />

        {/* Logo 2 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 100, height: 45 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: '1.4rem', color: '#111', lineHeight: 1 }}>D</Typography>
            <Box sx={{ width: 6, height: 6, bgcolor: '#111', borderRadius: '50%' }} />
          </Box>
          <Typography sx={{ fontSize: '8px', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: '#666', mt: 0.5 }}>logodesign</Typography>
        </Box>
        <Box sx={{ width: '1px', height: '24px', bgcolor: '#e2e8f0', display: { xs: 'none', lg: 'block' } }} />

        {/* Logo 3 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 100, height: 40 }}>
          <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.3rem', color: '#111', letterSpacing: -0.5 }}>nulla</Typography>
        </Box>
        <Box sx={{ width: '1px', height: '24px', bgcolor: '#e2e8f0', display: { xs: 'none', lg: 'block' } }} />

        {/* Logo 4 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 100, height: 40 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18V8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8V18" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M12 18V8C12 5.79086 13.7909 4 16 4C18.2091 4 20 5.79086 20 8V18" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </Box>
        <Box sx={{ width: '1px', height: '24px', bgcolor: '#e2e8f0', display: { xs: 'none', lg: 'block' } }} />

        {/* Logo 5 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 100, height: 40 }}>
          <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.1rem', color: '#111', letterSpacing: 1.5 }}>
            IN<span style={{ fontSize: '1.3rem', verticalAlign: 'middle', lineHeight: 0 }}>∞</span>INTY
          </Typography>
        </Box>
        <Box sx={{ width: '1px', height: '24px', bgcolor: '#e2e8f0', display: { xs: 'none', lg: 'block' } }} />

        {/* Logo 6 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 100, height: 45 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <rect x="8" y="8" width="8" height="8" />
          </svg>
          <Typography sx={{ fontSize: '8px', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: '#111', mt: 0.5 }}>SQUARE</Typography>
        </Box>
      </Box>

      {/* Keyboard Banner */}
      <Box sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        borderRadius: 4,
        bgcolor: '#141414',
        background: 'radial-gradient(circle at 80% 50%, #252525 0%, #0c0c0c 100%)',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        height: { xs: 'auto', md: 240 },
      }}>
        {/* Left Side: Content */}
        <Box sx={{
          flex: 1.2,
          color: '#fff',
          p: { xs: 4, sm: 5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontSize: { xs: 12, sm: 14 }, fontWeight: 700, color: 'rgba(255,255,255,0.7)', mb: 1 }}>
            It's finally here!
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontSize: { xs: 22, sm: 28, md: 32 }, fontWeight: 900, mb: 3, lineHeight: 1.2 }}>
            Tech Mart keyboard F-17
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontSize: { xs: 9, sm: 10 }, fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', mb: 0.5 }}>
            WEEKEND SALE
          </Typography>
          <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontSize: { xs: 22, sm: 28 }, fontWeight: 900, color: '#fff' }}>
            20% OFF
          </Typography>
        </Box>

        {/* Right Side: Image */}
        <Box sx={{
          flex: 1.8,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: { xs: 180, md: 'auto' },
        }}>
          <Box
            component="img"
            src={keyboard.src}
            alt="Tech Mart keyboard F-17"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
