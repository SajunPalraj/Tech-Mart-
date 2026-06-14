"use client";

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import sliderdown1 from '@/assets/sliderdown1.jpg';
import sliderdown from '@/assets/sliderdown.jpg';
import sliderdown2 from "@/assets/sliderdown2.jpg";

export default function DownSlider() {
  const slides = [
    {
      id: 1,
      img: sliderdown1.src,
      title: 'Cameras & Lenses',
      subtitle: 'MEDIA PRO CX70 2QF-621',
      priceLabel: 'STARTING AT',
      price: '$1.950',
    },
    {
      id: 2,
      img: sliderdown.src,
      title: 'Memory & Storage',
      subtitle: 'HIGH PERFORMANCE RGB RAM',
      priceLabel: 'STARTING AT',
      price: '$189',
    },
    {
      id: 3,
      img: sliderdown2.src,
      title: 'Gaming Accessories',
      subtitle: 'PRO MECHANICAL KEYBOARD',
      priceLabel: 'STARTING AT',
      price: '$99',
    },
  ];

  const [index, setIndex] = useState(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    prevIndexRef.current = index;
  }, [index]);

  const direction = index - prevIndexRef.current;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => i + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => i - 1);
  const next = () => setIndex((i) => i + 1);

  const activeIndex = ((index % slides.length) + slides.length) % slides.length;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 260, sm: 320, md: 380, lg: 420 }, mt: 4, mb: 4, overflow: 'hidden' }}>
      {slides.map((s, i) => {
        const k = Math.round((index - i) / slides.length);
        const virtualIndex = i + k * slides.length;
        const offset = (virtualIndex - index) * 100;

        let isJumping = false;
        if (direction > 0 && offset >= 100) isJumping = true;
        if (direction < 0 && offset <= -100) isJumping = true;

        const isActive = activeIndex === i;

        return (
          <Box
            key={s.id}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transform: `translateX(${offset}%)`,
              transition: isJumping
                ? 'none'
                : 'transform 2400ms cubic-bezier(0.25, 1, 0.5, 1), opacity 1200ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Background Image Layer with Zoom Animation */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${s.img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                transition: 'transform 2400ms cubic-bezier(0.25, 1, 0.5, 1)',
                transform: isActive ? 'scale(1)' : 'scale(1.05)',
                zIndex: 0,
              }}
            >
              {/* Premium dark gradient overlay for text readability */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 1200ms ease',
                }}
              />
            </Box>

            {/* Content container */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: 1400,
                mx: 'auto',
                height: '100%',
                px: { xs: 4, sm: 8, md: 12 },
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              {/* Text Area */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: '#fff',
                  maxWidth: { xs: '80%', sm: '65%', md: '50%' },
                }}
              >
                {/* Title */}
                <Typography
                  sx={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: { xs: 26, sm: 36, md: 46, lg: 54 },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mb: 0.5,
                    color: '#fff',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(25px)',
                    transition: 'opacity 1000ms ease 200ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 200ms',
                  }}
                >
                  {s.title}
                </Typography>

                {/* Subtitle */}
                <Typography
                  sx={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: { xs: 11, sm: 12, md: 14 },
                    fontWeight: 500,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    mb: 4,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 1000ms ease 350ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 350ms',
                  }}
                >
                  {s.subtitle}
                </Typography>

                {/* Price Label */}
                <Typography
                  sx={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: { xs: 9, sm: 10, md: 11 },
                    fontWeight: 750,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    mb: 0.5,
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                    transition: 'opacity 1000ms ease 500ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 500ms',
                  }}
                >
                  {s.priceLabel}
                </Typography>

                {/* Price */}
                <Typography
                  sx={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: { xs: 26, sm: 36, md: 46, lg: 52 },
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1,
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                    transition: 'opacity 1000ms ease 600ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 600ms',
                  }}
                >
                  {s.price}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}

      {/* Navigation Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 24, sm: 32, md: 40 },
          left: { xs: 32, sm: 64, md: 96 },
          display: 'flex',
          gap: 1.5,
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {slides.map((dot, di) => (
          <Box
            key={di}
            onClick={() => {
              let diff = di - activeIndex;
              if (diff > slides.length / 2) diff -= slides.length;
              if (diff < -slides.length / 2) diff += slides.length;
              setIndex(index + diff);
            }}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              border: '1.5px solid #fff',
              bgcolor: di === activeIndex ? '#fff' : 'transparent',
              cursor: 'pointer',
              transition: 'all 300ms ease',
            }}
          />
        ))}
      </Box>

      {/* Prev Chevron */}
      <IconButton
        onClick={prev}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 32 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(255,255,255,0.6)',
          transition: 'all 300ms ease',
          zIndex: 10,
          '&:hover': { color: '#fff', transform: 'translateY(-50%) scale(1.15)', bgcolor: 'transparent' },
        }}
      >
        <ArrowBackIosNewIcon fontSize="medium" />
      </IconButton>

      {/* Next Chevron */}
      <IconButton
        onClick={next}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 32 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(255,255,255,0.6)',
          transition: 'all 300ms ease',
          zIndex: 10,
          '&:hover': { color: '#fff', transform: 'translateY(-50%) scale(1.15)', bgcolor: 'transparent' },
        }}
      >
        <ArrowForwardIosIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
}
