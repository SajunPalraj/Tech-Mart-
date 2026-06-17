"use client";

import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

// Icons
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Context
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

function WishlistContent() {
  const { wishlistItems, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Convert USD to INR if the price format is a string starting with "$"
  const formatPrice = (price) => {
    if (typeof price === "string") {
      if (price.startsWith("₹")) return price;
      if (price.startsWith("$")) {
        const val = parseFloat(price.replace(/[$,]/g, ""));
        if (!isNaN(val)) {
          return `₹${Math.round(val * 83).toLocaleString("en-IN")}`;
        }
      }
      return price;
    }
    if (typeof price === "number") {
      // If it's already a converted INR number
      return `₹${price.toLocaleString("en-IN")}`;
    }
    return price;
  };

  if (wishlistCount === 0) {
    return (
      <Box 
        sx={{ 
          minHeight: "80vh", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          px: 3,
          textAlign: "center"
        }}
      >
        <Paper 
          sx={{ 
            p: { xs: 4, sm: 6 }, 
            borderRadius: 6, 
            boxShadow: "0 20px 50px rgba(36, 83, 212, 0.05)",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: "50%", 
              bgcolor: "rgba(233, 30, 99, 0.08)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              mb: 3,
              color: "#e91e63"
            }}
          >
            <FavoriteIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", color: "#111", mb: 1.5 }}>
            Wishlist is Empty
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, lineHeight: 1.6, fontWeight: 500 }}>
            Save your favorite tech gadgets, GPUs, and peripherals here to keep track of them and add them to your cart later!
          </Typography>
          <Button
            component={Link}
            href="/products"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: "linear-gradient(135deg, #2453d4 0%, #4f46e5 100%)",
              color: "white",
              fontWeight: 700,
              px: 4,
              py: 1.75,
              borderRadius: "25px",
              textTransform: "none",
              fontSize: "0.95rem",
              boxShadow: "0 6px 20px rgba(36, 83, 212, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #1a3eb3 0%, #3b37c7 100%)",
                boxShadow: "0 10px 25px rgba(36, 83, 212, 0.45)"
              }
            }}
          >
            Explore Tech Products
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 4, md: 8, lg: 12 }, minHeight: "100vh" }}>
      {/* Header section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900, 
              fontFamily: "var(--font-montserrat)", 
              color: "#111",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              display: "flex",
              alignItems: "center",
              gap: 2
            }}
          >
            My Wishlist <Typography component="span" variant="h4" sx={{ fontWeight: 800, color: "#e91e63", bgcolor: "rgba(233, 30, 99, 0.08)", px: 2, py: 0.5, borderRadius: 3, fontSize: { xs: "1.2rem", sm: "1.6rem" } }}>{wishlistCount}</Typography>
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mt: 1, fontWeight: 500 }}>
            Manage items you've saved to buy later.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          onClick={clearWishlist}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.25,
            textTransform: "none",
            fontWeight: 700,
            borderColor: "rgba(211, 47, 47, 0.3)",
            "&:hover": {
              borderColor: "error.main",
              bgcolor: "rgba(211, 47, 47, 0.04)"
            }
          }}
        >
          Clear All Items
        </Button>
      </Box>

      <Divider sx={{ mb: 5, borderColor: "rgba(0, 0, 0, 0.06)" }} />

      {/* Grid of Wishlist items */}
      <Grid container spacing={4}>
        {wishlistItems.map((product, idx) => (
          <Grid item xs={12} sm={6} md={4} key={product.title || idx}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 6,
                boxShadow: "0 10px 30px rgba(36, 83, 212, 0.03), 0 1px 3px rgba(0,0,0,0.01)",
                border: "1px solid rgba(255, 255, 255, 0.7)",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px)",
                position: "relative",
                transition: "transform 0.3s ease, boxShadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 20px 40px rgba(36, 83, 212, 0.08)",
                }
              }}
            >
              {/* Delete Icon Button (Top-Right overlay) */}
              <IconButton
                onClick={() => removeFromWishlist(product.title)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  bgcolor: "rgba(240, 244, 248, 0.9)",
                  color: "#666",
                  "&:hover": {
                    bgcolor: "rgba(255, 23, 100, 0.1)",
                    color: "#e91e63"
                  }
                }}
                aria-label="Remove from wishlist"
              >
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>

              {/* Product Category Label */}
              <Typography 
                variant="caption" 
                sx={{ 
                  fontFamily: "var(--font-montserrat)", 
                  fontWeight: 750, 
                  color: "text.secondary", 
                  letterSpacing: 1.5, 
                  textTransform: "uppercase",
                  position: "absolute",
                  top: 24,
                  left: 24,
                  zIndex: 10
                }}
              >
                {product.category || "TECH"}
              </Typography>

              {/* Image Container */}
              <Box 
                sx={{ 
                  height: 200, 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  p: 3, 
                  mt: 4,
                  bgcolor: "transparent"
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>

              {/* Product Info */}
              <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Rating value={product.rating || 5} precision={0.1} size="small" readOnly sx={{ mb: 1 }} />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: "var(--font-montserrat)", 
                    fontWeight: 800, 
                    lineHeight: 1.4, 
                    mb: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    color: "#111"
                  }}
                >
                  {product.title}
                </Typography>
                {product.description && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "text.secondary", 
                      fontSize: "0.75rem", 
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {product.description}
                  </Typography>
                )}
                
                <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", pt: 2 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontFamily: "var(--font-montserrat)", 
                      fontWeight: 900, 
                      color: "#2453d4" 
                    }}
                  >
                    {formatPrice(product.price)}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      bgcolor: "#2453d4",
                      color: "white",
                      fontWeight: 700,
                      borderRadius: "15px",
                      px: 2.5,
                      py: 1,
                      textTransform: "none",
                      fontSize: "0.8rem",
                      boxShadow: "0 4px 10px rgba(36, 83, 212, 0.15)",
                      "&:hover": {
                        bgcolor: "#1a3eb3",
                        boxShadow: "0 6px 15px rgba(36, 83, 212, 0.25)"
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function WishlistPage() {
  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #eff6ff 100%)" }}>
      <Suspense fallback={
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
          <CircularProgress size={60} thickness={4} sx={{ color: "#2453d4" }} />
        </Box>
      }>
        <WishlistContent />
      </Suspense>
    </Box>
  );
}
