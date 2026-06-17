"use client";

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import slider2 from '@/assets/slider2.png';
import slider3 from '@/assets/slider3.png';
import slider4 from '@/assets/slider4.png';

import Link from 'next/link';

export default function ImageSlider() {
  const slides = [
    {
      id: 1,
      img: slider2.src,
      title: 'Which Smartphone is Right For You?',
      subtitle: 'Mei doctus principes interes',
      priceLabel: 'STARTING AT',
      price: '₹79,999',
    },
    {
      id: 2,
      img: slider3.src,
      title: 'Discover Powerful Laptops',
      subtitle: 'Performance and design combined',
      priceLabel: 'STARTING AT',
      price: '₹91,217',
    },
    {
      id: 3,
      img: slider4.src,
      title: 'Top Accessories for Your Devices',
      subtitle: 'Quality you can rely on',
      priceLabel: 'STARTING AT',
      price: '₹999',
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
    }, 6000); // Slower interval
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => i - 1);
  const next = () => setIndex((i) => i + 1);

  const activeIndex = ((index % slides.length) + slides.length) % slides.length;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 350, sm: 400, md: 500, lg: 600 }, mt: 1, overflow: 'hidden' }}>
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
            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: 'transform 1200ms ease', transform: isActive ? 'scale(1)' : 'scale(1.05)', zIndex: 0 }}>
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)', opacity: isActive ? 1 : 0, transition: 'opacity 1200ms ease' }} />
            </Box>

            <Box sx={{ width: '100%', maxWidth: 1400, display: 'flex', gap: 2, px: { xs: 6, sm: 10, md: 12 }, boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
              <Box sx={{ flex: 1, color: '#fff', pr: 2 }}>
                {/* Title: Upward Fade */}
                <Typography sx={{ fontFamily: 'var(--font-montserrat)', textTransform: 'uppercase', letterSpacing: 2, fontSize: { xs: 20, sm: 40, md: 56 }, fontWeight: 800, lineHeight: 1.1, mb: { xs: 1, sm: 2 }, color: '#fff', opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 1000ms ease 200ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 200ms' }}>
                  {s.title}
                </Typography>

                {/* Subtitle: Left Fade */}
                <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontStyle: 'italic', letterSpacing: 1, fontSize: { xs: 12, sm: 14, md: 18 }, color: 'rgba(255,255,255,0.8)', mb: { xs: 1.5, sm: 3 }, opacity: isActive ? 1 : 0, transform: isActive ? 'translateX(0)' : 'translateX(-40px)', transition: 'opacity 1000ms ease 400ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 400ms' }}>
                  {s.subtitle}
                </Typography>

                {/* Price Label: Upward Fade */}
                <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontSize: { xs: 10, sm: 12, md: 14 }, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, textTransform: 'uppercase', mb: { xs: 0.5, sm: 1 }, opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 1000ms ease 600ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 600ms' }}>
                  {s.priceLabel}
                </Typography>

                {/* Price: Left Fade */}
                <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontSize: { xs: 24, sm: 32, md: 48 }, fontWeight: 800, color: '#fff', opacity: isActive ? 1 : 0, transform: isActive ? 'translateX(0)' : 'translateX(-40px)', transition: 'opacity 1000ms ease 800ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 800ms' }}>
                  {s.price}
                </Typography>

                {/* Buy Now Button */}
                <Box sx={{ mt: { xs: 1.5, sm: 3 }, opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 1000ms ease 1000ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 1000ms' }}>
                  <Link href="/products" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" disableElevation sx={{ fontFamily: 'var(--font-montserrat)', textTransform: 'uppercase', letterSpacing: 1, bgcolor: '#2453d4', color: '#fff', '&:hover': { bgcolor: '#1c42a5' }, px: 4, py: 1.5, borderRadius: '999px', fontWeight: 800 }}>
                      Explore Now 
                    </Button>
                  </Link>
                </Box>

                {/* Hollow Dots */}
                <Box sx={{ mt: { xs: 2.5, sm: 5 }, display: 'flex', gap: 1.5, alignItems: 'center', opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 1000ms ease 1200ms, transform 1000ms cubic-bezier(0.25, 1, 0.5, 1) 1200ms' }}>
                  {slides.map((dot, di) => (
                    <Box
                      key={di}
                      onClick={() => {
                        let diff = di - activeIndex;
                        if (diff > slides.length / 2) diff -= slides.length;
                        if (diff < -slides.length / 2) diff += slides.length;
                        setIndex(index + diff);
                      }}
                      sx={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #fff', bgcolor: di === activeIndex ? '#fff' : 'transparent', cursor: 'pointer', transition: 'all 300ms ease' }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}

      <IconButton
        onClick={prev}
        sx={{
          position: 'absolute', left: { xs: 4, md: 32 }, top: '50%', transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '50%', width: { xs: 32, md: 56 }, height: { xs: 32, md: 56 },
          transition: 'all 300ms ease',
          backdropFilter: 'blur(4px)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
          '& .single-arrow': { display: 'block' },
          '& .double-arrow': { display: 'none' },
          '&:hover .single-arrow, &:active .single-arrow': { display: 'none' },
          '&:hover .double-arrow, &:active .double-arrow': { display: 'block' },
        }}
      >
        <ArrowBackIosNewIcon className="single-arrow" fontSize="small" />
        <KeyboardDoubleArrowLeftIcon className="double-arrow" fontSize="medium" />
      </IconButton>

      <IconButton
        onClick={next}
        sx={{
          position: 'absolute', right: { xs: 4, md: 32 }, top: '50%', transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '50%', width: { xs: 32, md: 56 }, height: { xs: 32, md: 56 },
          transition: 'all 300ms ease',
          backdropFilter: 'blur(4px)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
          '& .single-arrow': { display: 'block' },
          '& .double-arrow': { display: 'none' },
          '&:hover .single-arrow, &:active .single-arrow': { display: 'none' },
          '&:hover .double-arrow, &:active .double-arrow': { display: 'block' },
        }}
      >
        <ArrowForwardIosIcon className="single-arrow" fontSize="small" />
        <KeyboardDoubleArrowRightIcon className="double-arrow" fontSize="medium" />
      </IconButton>

    </Box>
  );
}
