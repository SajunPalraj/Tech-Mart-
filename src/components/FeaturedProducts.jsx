"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Rating from '@mui/material/Rating';

// Import Cart Context
import { useCart } from "@/context/CartContext";

// Import Accessories images
import acc1 from '@/assets/Products/Accessories/product-1.jpg';
import acc2 from '@/assets/Products/Accessories/product-2.jpg';
import acc3 from '@/assets/Products/Accessories/product-3.jpg';
import acc4 from '@/assets/Products/Accessories/product-4.jpg';
import acc5 from '@/assets/Products/Accessories/product-5.jpg';
import acc6 from '@/assets/Products/Accessories/product-0.jpg';
import acc7 from '@/assets/Products/Accessories/Cooler.webp';
import acc8 from '@/assets/Products/Accessories/RAM.webp';

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const item = [
    {
      title: 'Fixed-Wing Hybrid Surveillance Drone VW',
      category: '3D PRINTERS',
      image: acc1.src,
      price: '$1,450',
      rating: 4.5,
    },
    {
      title: 'Over-Ear Headphones FX-9901 Orange',
      category: '3D PRINTERS',
      image: acc2.src,
      price: '$890',
      rating: 4.0,
    },
    {
      title: 'Smartphone LS-589662 Midnight Black',
      category: '3D PRINTERS',
      image: acc3.src,
      price: '$770',
      rating: 5.0,
    },
    {
      title: 'Smart Robotic Vacuum Cleaner FZP-550',
      category: '3D PRINTERS',
      image: acc4.src,
      price: '$440',
      rating: 3.5,
    },
    {
      title: 'High-Airflow Tempered Glass Computer Case',
      category: '3D PRINTERS',
      image: acc5.src,
      price: '$3,850',
      rating: 4.8,
    },
    {
      title: 'Wireless Gaming Mouse X-Pro 2',
      category: 'ACCESSORIES',
      image: acc6.src,
      price: '$120',
      rating: 4.2,
    },
    {
      title: '4K Ultra HD Action Camera Z-Cam',
      category: 'CAMERAS',
      image: acc7.src,
      price: '$299',
      rating: 4.6,
    },
    {
      title: 'Noise-Canceling Bluetooth Earbuds Pro',
      category: 'AUDIO',
      image: acc8.src,
      price: '$199',
      rating: 4.9,
    },
  ];

  return (
    <Box sx={{ py: 8, px: { xs: 2, sm: 4, md: 8, lg: 12 }, bgcolor: '#ffffff' }}>
      <Typography variant="h3" component="h2" sx={{ 
        fontFamily: 'var(--font-montserrat)', 
        fontWeight: 900, 
        textTransform: 'uppercase', 
        letterSpacing: 3, 
        textAlign: 'center', 
        mb: 6,
        background: 'linear-gradient(45deg, #2453d4ff 0%, #ffffff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Featured Products
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {item.map((product, index) => (
          <Box 
            key={index}
            sx={{ 
              height: '380px', 
              bgcolor: '#f3f6fb', 
              width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)', lg: 'calc(20% - 16px)' },
              minWidth: 220,
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, p: 2 }}>
              <Typography variant="caption" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, color: 'text.secondary', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {product.category}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white', color: '#e91e63' } }}>
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white', color: '#2453d4' } }}>
                  <CompareArrowsIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ position: 'relative', height: '60%', width: '100%', bgcolor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', p: 2 }}>
              <Box 
                className="product-image"
                component="img" 
                src={product.image} 
                alt={product.title}
                sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', objectPosition: 'center', mixBlendMode: 'multiply', transition: 'transform 0.4s ease' }} 
              />
            </Box>

            <Box sx={{ p: 2, height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Rating value={product.rating} precision={0.5} size="small" readOnly sx={{ mb: 0.5 }} />
              <Typography variant="subtitle2" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, mb: 1, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {product.title}
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, color: '#2453d4', mt: 'auto', mb: 1 }}>
                {product.price}
              </Typography>
            </Box>

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
