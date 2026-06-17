"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Rating from '@mui/material/Rating';

// Import Contexts
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

// Import CPU images
import cpu1 from '@/assets/Products/CPU/cpu1.webp';
import cpu2 from '@/assets/Products/CPU/cpu2.webp';
import cpu3 from '@/assets/Products/CPU/cpu3.webp';
import cpu4 from '@/assets/Products/CPU/cpu4.webp';
import cpu5 from '@/assets/Products/CPU/cpu5.webp';
import cpu6 from '@/assets/Products/CPU/cpu6.webp';
import cpu7 from '@/assets/Products/CPU/cpu7.webp';
import gpu1 from '@/assets/Products/CPU/gpu1.webp';

// Import GPU images
import gpu2 from '@/assets/Products/GPU/gpu2.webp';
import gpu3 from '@/assets/Products/GPU/gpu3.webp';
import gpu4 from '@/assets/Products/GPU/gpu4.jpg';
import gpu5 from '@/assets/Products/GPU/gpu5.webp';
import gpu6 from '@/assets/Products/GPU/gpu6.webp';
import gpu7 from '@/assets/Products/GPU/gpu7.webp';

// Import Monitor images
import mon1 from '@/assets/Products/Monitors/monitor-1.webp';
import mon2 from '@/assets/Products/Monitors/monitor-2.webp';
import mon3 from '@/assets/Products/Monitors/monitor-3.webp';
import mon4 from '@/assets/Products/Monitors/monitor-4.webp';
import mon5 from '@/assets/Products/Monitors/monitor-5.webp';
import mon6 from '@/assets/Products/Monitors/monitor-6.webp';

// Import Laptop images
import laptop1 from '@/assets/Products/Laptops/Gaming Laptops1.webp';
import laptop2 from '@/assets/Products/Laptops/Gaming Laptops2.webp';
import laptop3 from '@/assets/Products/Laptops/Gaming Laptops3.jpeg';
import laptop4 from '@/assets/Products/Laptops/Gaming Laptops4.webp';
import laptop5 from '@/assets/Products/Laptops/Gaming Laptops5.webp';
import laptop6 from '@/assets/Products/Laptops/Gaming Laptops6.webp';
import laptop7 from '@/assets/Products/Laptops/Gaming Laptops7webp.webp';

// Import RAM images
import ram1 from '@/assets/Products/RAM/RAM1.webp';
import ram2 from '@/assets/Products/RAM/RAM2.webp';
import ram3 from '@/assets/Products/RAM/RAM3.webp';
import ram4 from '@/assets/Products/RAM/RAM4.jpeg';
import ram5 from '@/assets/Products/RAM/RAM5.webp';
import ram6 from '@/assets/Products/RAM/RAM6.webp';
import ram7 from '@/assets/Products/RAM/RAM7.webp';

export default function Categories() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('GPU');

  const products = {
    GPU: [
      { id: 1, title: 'NVIDIA GeForce RTX 4090 24GB', price: '₹1,32,717', rating: 5.0, image: gpu1.src },
      { id: 2, title: 'NVIDIA GeForce RTX 4080 Super 16GB', price: '₹82,917', rating: 4.8, image: gpu2.src },
      { id: 3, title: 'AMD Radeon RX 7900 XTX 24GB', price: '₹77,107', rating: 4.7, image: gpu3.src },
      { id: 4, title: 'NVIDIA GeForce RTX 4070 Ti Super 16GB', price: '₹66,317', rating: 4.6, image: gpu4.src },
      { id: 5, title: 'AMD Radeon RX 7800 XT 16GB', price: '₹41,417', rating: 4.5, image: gpu5.src },
      { id: 6, title: 'NVIDIA GeForce RTX 4060 Ti 8GB', price: '₹32,287', rating: 4.3, image: gpu6.src },
      { id: 7, title: 'Intel Arc A770 16GB', price: '₹24,817', rating: 4.1, image: gpu7.src },
    ],
    CPU: [
      { id: 8, title: 'Intel Core i9-14900K Desktop Processor', price: '₹43,907', rating: 4.8, image: cpu1.src },
      { id: 9, title: 'AMD Ryzen 9 7950X3D 16-Core Processor', price: '₹47,227', rating: 4.9, image: cpu2.src },
      { id: 10, title: 'Intel Core i7-14700K Desktop Processor', price: '₹32,287', rating: 4.7, image: cpu3.src },
      { id: 11, title: 'AMD Ryzen 7 7800X3D 8-Core Processor', price: '₹28,967', rating: 4.9, image: cpu4.src },
      { id: 12, title: 'Intel Core i5-14600K Desktop Processor', price: '₹24,817', rating: 4.5, image: cpu5.src },
      { id: 13, title: 'AMD Ryzen 5 7600X 6-Core Processor', price: '₹16,517', rating: 4.4, image: cpu6.src },
      { id: 14, title: 'AMD Ryzen 9 5900X 12-Core Processor', price: '₹23,987', rating: 4.6, image: cpu7.src },
    ],
    RAM: [
      { id: 30, title: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz', price: '₹9,877', rating: 4.8, image: ram1.src },
      { id: 31, title: 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6400MHz', price: '₹10,292', rating: 4.9, image: ram2.src },
      { id: 32, title: 'Kingston Fury Beast RGB 16GB (2x8GB) DDR5 5200MHz', price: '₹5,727', rating: 4.5, image: ram3.src },
      { id: 33, title: 'Crucial Pro 64GB (2x32GB) DDR5 5600MHz', price: '₹15,687', rating: 4.7, image: ram4.src },
      { id: 34, title: 'Teamgroup T-Force Delta RGB 32GB (2x16GB) DDR5 6000MHz', price: '₹9,047', rating: 4.6, image: ram5.src },
      { id: 35, title: 'Patriot Viper Venom 32GB (2x16GB) DDR5 5600MHz', price: '₹7,802', rating: 4.4, image: ram6.src },
      { id: 36, title: 'Corsair Dominator Titanium 32GB (2x16GB) DDR5 7200MHz', price: '₹14,857', rating: 4.8, image: ram7.src },
    ],
    Laptops: [
      { id: 40, title: 'ASUS ROG Zephyrus G14 Gaming Laptop', price: '₹1,24,417', rating: 4.8, image: laptop1.src },
      { id: 41, title: 'MSI Raider GE78 HX Gaming Laptop', price: '₹1,82,517', rating: 4.9, image: laptop2.src },
      { id: 42, title: 'Lenovo Legion Pro 5 Gaming Laptop', price: '₹1,03,667', rating: 4.6, image: laptop3.src },
      { id: 43, title: 'Acer Predator Helios 16 Gaming Laptop', price: '₹1,16,117', rating: 4.5, image: laptop4.src },
      { id: 44, title: 'HP Omen 16 Gaming Laptop', price: '₹95,367', rating: 4.4, image: laptop5.src },
      { id: 45, title: 'GIGABYTE AORUS 15 Gaming Laptop', price: '₹91,217', rating: 4.3, image: laptop6.src },
      { id: 46, title: 'Razer Blade 16 Gaming Laptop', price: '₹2,40,617', rating: 4.9, image: laptop7.src },
    ],
    Monitors: [
      { id: 15, title: 'ASUS ROG Swift 32" OLED 4K Gaming Monitor', price: '₹1,07,817', rating: 4.9, image: mon1.src },
      { id: 16, title: 'Samsung Odyssey G9 49" Curved Gaming Monitor', price: '₹99,517', rating: 4.8, image: mon2.src },
      { id: 17, title: 'LG UltraGear 27" QHD Nano IPS Monitor', price: '₹28,967', rating: 4.7, image: mon3.src },
      { id: 18, title: 'Dell UltraSharp 34" Curved USB-C Monitor', price: '₹62,167', rating: 4.6, image: mon4.src },
      { id: 20, title: 'MSI Optix 32" Curved Gaming Monitor', price: '₹23,157', rating: 4.4, image: mon5.src },
      { id: 21, title: 'Gigabyte M27Q 27" 170Hz KVM Monitor', price: '₹24,817', rating: 4.7, image: mon6.src },
    ]
  };

  return (
    <Box sx={{ py: 8, bgcolor: '#f3f6fb', overflow: 'hidden' }}>
      {/* Title */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: { xs: 1, sm: 1.5 }, 
        flexWrap: 'wrap',
        mb: 4 
      }}>
        <Typography 
          variant="h3" 
          component="h2"
          sx={{ 
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: { xs: '1.5px', sm: '3px' },
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            color: '#6a9cff',           // Light blue like in the image
          }}
        >
          SHOP BY
        </Typography>

        <Box
          sx={{
            backgroundColor: '#2453d4',   // Strong blue background
            px: { xs: 2, sm: 3 },
            py: { xs: 0.8, sm: 1.2 },
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Typography 
            variant="h3" 
            component="h2"
            sx={{ 
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: { xs: '1.5px', sm: '3px' },
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              color: '#ffffff',           // White text
              borderRadius:"4px",
            }}
          >
            CATEGORY
          </Typography>
        </Box>
      </Box>
      {/* Tabs */}
      <Box sx={{
        display: 'flex',
        justifyContent: { xs: 'flex-start', sm: 'center' },
        alignItems: 'center',
        flexWrap: { xs: 'nowrap', sm: 'wrap' },
        overflowX: { xs: 'auto', sm: 'visible' },
        gap: { xs: 1, sm: 1 },
        mb: 6,
        px: { xs: 2.5, sm: 1.5 },
        py: 0.8,
        width: { xs: '100%', sm: 'fit-content' },
        maxWidth: '100%',
        mx: 'auto',
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderRadius: { xs: '16px', sm: '999px' },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(224, 224, 224, 0.6)',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}>
        {['GPU', 'CPU', 'RAM', 'Laptops', 'Monitors'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              disableRipple
              sx={{
                px: { xs: 2.5, sm: 4.5 },
                py: 1.2,
                borderRadius: '999px',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 800,
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                letterSpacing: '1px',
                textTransform: 'uppercase',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                bgcolor: isActive ? '#2453d4' : 'transparent',
                color: isActive ? 'white' : '#666',
                boxShadow: isActive ? '0 8px 24px rgba(36, 83, 212, 0.3)' : 'none',
                transform: isActive ? 'scale(1.03)' : 'none',
                flexShrink: 0,
                '&:hover': {
                  bgcolor: isActive ? '#1c42a5' : 'rgba(36, 83, 212, 0.06)',
                  color: isActive ? 'white' : '#2453d4',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              {tab}
            </Button>
          );
        })}
      </Box>

      {/* Horizontal Scrollable Slider */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          pb: 3,
          pt: 1,
          px: { xs: 3, sm: 6, md: 8, lg: 12 },
          width: '100%',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'rgba(0,0,0,0.03)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: '#2453d4',
            borderRadius: '10px',
            '&:hover': {
              bgcolor: '#1c42a5',
            }
          },
          scrollbarWidth: 'thin',
          scrollbarColor: '#2453d4 rgba(0,0,0,0.03)',
        }}
      >
        {products[activeTab].map((product) => (
          <Box
            key={product.id}
            sx={{
              flex: '0 0 auto',
              height: '380px',
              width: { xs: '260px', sm: '280px', md: '300px' },
              bgcolor: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4,
              border: '1px solid #f0f0f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
              },
              '&:hover .add-to-cart': {
                transform: 'translateY(0)',
                opacity: 1,
              },
              '&:hover .product-image': {
                transform: 'scale(1.1)',
              }
            }}
          >
            {/* Category Tag & Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, p: 2 }}>
              <Typography variant="caption" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, color: 'text.secondary', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {activeTab}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton 
                  size="small" 
                  onClick={() => toggleWishlist(product)}
                  sx={{ 
                    bgcolor: isInWishlist(product.title) ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)', 
                    color: isInWishlist(product.title) ? '#e91e63' : 'inherit',
                    '&:hover': { bgcolor: 'white', color: '#e91e63' } 
                  }}
                >
                  {isInWishlist(product.title) ? (
                    <FavoriteIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </IconButton>
                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white', color: '#2453d4' } }}>
                  <CompareArrowsIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Product Image */}
            <Box sx={{ position: 'relative', height: '60%', width: '100%', bgcolor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', p: 2 }}>
              <Box
                className="product-image"
                component="img"
                src={product.image}
                alt={product.title}
                sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center', mixBlendMode: 'multiply', transition: 'transform 0.4s ease' }}
              />
            </Box>

            {/* Info */}
            <Box sx={{ p: 2, height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ mb: 0.5 }} />
              <Typography variant="subtitle2" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, mb: 1, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {product.title}
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, color: '#2453d4', mt: 'auto', mb: 1 }}>
                {product.price}
              </Typography>
            </Box>

            {/* Add to Cart Shutter Button */}
            <Box
              className="add-to-cart"
              onClick={() => addToCart(product)}
              sx={{
                fontFamily: 'var(--font-montserrat)',
                bgcolor: '#2453d4',
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '60px',
                width: "100%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transform: 'translateY(100%)',
                opacity: 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: "uppercase",
                fontWeight: 800,
                letterSpacing: 1.5,
                gap: 1,
                '&:hover': {
                  bgcolor: '#1c42a5'
                }
              }}
            >
              <ShoppingCartOutlinedIcon fontSize="small" />
              Add to cart
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
