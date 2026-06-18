"use client";

import React, { useState, useEffect, use } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

// Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

// Context & Navigation
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function ProductDetailPage({ params }) {
  // Unwrapping params promise according to Next.js 16 requirements
  const { id } = use(params);
  const router = useRouter();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // State variables
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delivery check simulation
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(null); // { status: 'success' | 'error', message: string }
  const [checkingDelivery, setCheckingDelivery] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    async function loadProductDetails() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/API/products/${id}`);
        if (res.data && res.data.product) {
          setProduct(res.data.product);
          // Load related products of the same category
          loadRelated(res.data.product.category, res.data.product.id);
        } else {
          setError("Product details could not be found.");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.response?.data?.error || "Unable to fetch product details.");
      } finally {
        setLoading(false);
      }
    }

    async function loadRelated(category, currentId) {
      try {
        const res = await axios.get(`/API/products?category=${encodeURIComponent(category)}`);
        const list = res.data.products || [];
        // Filter out current product
        setRelatedProducts(list.filter((p) => p.id !== currentId).slice(0, 4));
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    }

    loadProductDetails();
  }, [id]);

  // Simulate delivery checking
  const handleCheckDelivery = () => {
    if (!pincode.trim()) {
      setDeliveryStatus({ status: "error", message: "Please enter a valid pincode." });
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setDeliveryStatus({
        status: "error",
        message: "Invalid pincode format. Please enter a 6-digit Indian pincode.",
      });
      return;
    }

    setCheckingDelivery(true);
    setTimeout(() => {
      setCheckingDelivery(false);
      // Mock different dates based on pincode numbers
      const lastDigit = parseInt(pincode.slice(-1)) || 0;
      const today = new Date();
      let deliveryDays = 3;
      if (lastDigit % 3 === 0) deliveryDays = 1; // Super fast!
      else if (lastDigit % 2 === 0) deliveryDays = 2;

      const delDate = new Date(today);
      delDate.setDate(today.getDate() + deliveryDays);
      const formattedDate = delDate.toLocaleDateString("en-IN", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });

      setDeliveryStatus({
        status: "success",
        message: `Delivery guaranteed by ${formattedDate} | FREE Delivery`,
      });
    }, 800);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      router.push("/profile?tab=cart&checkout=true");
    }
  };

  // Render Skeleton Loaders
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Skeleton variant="rectangular" height={420} sx={{ borderRadius: 6, mb: 3 }} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Skeleton variant="rectangular" height={54} width="50%" sx={{ borderRadius: 3 }} />
              <Skeleton variant="rectangular" height={54} width="50%" sx={{ borderRadius: 3 }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="90%" height={50} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="40%" height={32} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 4, mb: 3 }} />
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 4, mb: 3 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  // Render Error / Not Found Screen
  if (error || !product) {
    return (
      <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", bgcolor: "#f8fafc", px: 3 }}>
        <Paper sx={{ p: 5, borderRadius: 6, textAlign: "center", maxWidth: 500, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <ErrorOutlinedIcon sx={{ fontSize: "5rem", color: "error.main", mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", mb: 2 }}>
            Oops! Product Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            {error || "The product you are looking for does not exist or has been removed from our catalog."}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/products")}
            sx={{
              bgcolor: "#2453d4",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontWeight: 800,
              textTransform: "uppercase",
              boxShadow: "0 4px 12px rgba(36, 83, 212, 0.2)",
              "&:hover": { bgcolor: "#1a3eb3" },
            }}
          >
            Back to Catalog
          </Button>
        </Paper>
      </Box>
    );
  }

  // Calculate pricing logic
  const originalPrice = Math.round(product.price * 1.15); // mock 15% discount
  const savings = originalPrice - product.price;

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 6, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
      
      {/* Back Button / Breadcrumb */}
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/products")}
          sx={{
            color: "#475569",
            fontWeight: 800,
            textTransform: "none",
            fontFamily: "var(--font-montserrat)",
            "&:hover": { color: "#2453d4", bgcolor: "rgba(36, 83, 212, 0.05)" }
          }}
        >
          Back to all products
        </Button>
      </Box>

      {/* Main Grid Layout */}
      <Grid container spacing={6}>
        
        {/* Left Column: Image Panel & Action Buttons */}
        <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ position: "sticky", top: 180, width: "100%", maxWidth: "460px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Image Viewer Container */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 6, 
                bgcolor: "white", 
                border: "1px solid #e2e8f0", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: { xs: "300px", sm: "400px", md: "460px" },
                width: "100%",
                position: "relative",
                overflow: "hidden",
                "&:hover .product-detail-image": {
                  transform: "scale(1.08)"
                }
              }}
            >
              {/* Product Wishlist toggle overlay */}
              <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
                <Tooltip title={isInWishlist(product.title) ? "Remove from Wishlist" : "Add to Wishlist"}>
                  <IconButton 
                    onClick={() => toggleWishlist(product)}
                    sx={{ 
                      bgcolor: "rgba(241,245,249,0.9)",
                      color: isInWishlist(product.title) ? "#e91e63" : "#64748b",
                      border: "1px solid #cbd5e1",
                      "&:hover": { bgcolor: "white", color: "#e91e63" } 
                    }}
                  >
                    {isInWishlist(product.title) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Tag Category overlay */}
              <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 10, bgcolor: "rgba(36,83,212,0.08)", color: "#2453d4", px: 2, py: 0.5, borderRadius: "20px" }}>
                <Typography variant="caption" sx={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, textTransform: "uppercase" }}>
                  {product.category}
                </Typography>
              </Box>

              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 600px) 100vw, 460px"
                style={{ 
                  objectFit: "contain",
                  transition: "transform 0.5s ease",
                }}
                className="product-detail-image"
              />
            </Paper>

            {/* Quick Actions Panel */}
            <Grid container spacing={2} sx={{ mt: 3, width: "100%" }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => addToCart(product)}
                  sx={{
                    borderColor: "#2453d4",
                    color: "#2453d4",
                    borderWidth: "2px",
                    py: 1.8,
                    borderRadius: "14px",
                    fontWeight: 900,
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderWidth: "2px",
                      borderColor: "#1a3eb3",
                      bgcolor: "rgba(36, 83, 212, 0.05)"
                    }
                  }}
                >
                  Add To Cart
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingBagIcon />}
                  onClick={handleBuyNow}
                  sx={{
                    bgcolor: "#ff6f00",
                    color: "white",
                    py: 1.8,
                    borderRadius: "14px",
                    fontWeight: 900,
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "0.95rem",
                    boxShadow: "0 4px 14px rgba(255,111,0,0.25)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "#e65100",
                      boxShadow: "0 6px 20px rgba(255,111,0,0.4)"
                    }
                  }}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right Column: Title, Ratings, Pricing, Offers & Details */}
        <Grid item xs={12} md={7}>
          <Box>
            
            {/* Title Block */}
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 900, 
                fontFamily: "var(--font-montserrat)", 
                color: "#0f172a", 
                mb: 1.5,
                lineHeight: 1.3
              }}
            >
              {product.title}
            </Typography>

            {/* Ratings & Brand Row */}
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#22c55e", color: "white", px: 1.25, py: 0.5, borderRadius: "6px" }}>
                <Typography variant="body2" sx={{ fontWeight: 800, mr: 0.5 }}>
                  {product.rating}
                </Typography>
                <Rating value={1} max={1} readOnly size="small" sx={{ color: "white" }} />
              </Box>
              <Rating value={product.rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                (1,250 Verified Ratings & 180 Reviews)
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Pricing Section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, flexWrap: "wrap" }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 900, 
                    fontFamily: "var(--font-montserrat)", 
                    color: "#2453d4" 
                  }}
                >
                  ₹{product.price.toLocaleString("en-IN")}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: "#94a3b8", 
                    textDecoration: "line-through", 
                    fontWeight: 500 
                  }}
                >
                  ₹{originalPrice.toLocaleString("en-IN")}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: "#22c55e", 
                    fontWeight: 800,
                    fontFamily: "var(--font-montserrat)"
                  }}
                >
                  15% OFF
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, display: "block", mt: 0.5 }}>
                Inclusive of all taxes | You save ₹{savings.toLocaleString("en-IN")}
              </Typography>
              
              {/* stock availability */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#22c55e" }} />
                <Typography variant="body2" sx={{ color: "#16a34a", fontWeight: 700 }}>
                  In Stock (Ready to Ship)
                </Typography>
              </Box>
            </Box>

            {/* Promotions / Offers Box */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 5, 
                bgcolor: "white", 
                border: "1px solid #e2e8f0", 
                mb: 4 
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: 1, mb: 2, fontFamily: "var(--font-montserrat)" }}>
                <LocalOfferOutlinedIcon sx={{ color: "#2453d4" }} /> Active Catalog Offers
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ border: "1px dashed #cbd5e1", p: 1.5, borderRadius: 3, height: "100%", bgcolor: "#f8fafc" }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5 }}>
                      Bank Offer
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                      Get 10% instant discount on SBI credit cards up to ₹1,500.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ border: "1px dashed #cbd5e1", p: 1.5, borderRadius: 3, height: "100%", bgcolor: "#f8fafc" }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5 }}>
                      No Cost EMI
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                      EMI option starting from ₹{Math.round(product.price / 12).toLocaleString("en-IN")}/month.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ border: "1px dashed #cbd5e1", p: 1.5, borderRadius: 3, height: "100%", bgcolor: "#f8fafc" }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5 }}>
                      Business GST
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", display: "block" }}>
                      Claim GST invoice credit and save up to 28% on corporate tax.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Delivery Pincode Checker */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 5, 
                bgcolor: "white", 
                border: "1px solid #e2e8f0", 
                mb: 4 
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: 1, mb: 2, fontFamily: "var(--font-montserrat)" }}>
                <PinDropOutlinedIcon sx={{ color: "#2453d4" }} /> Check Delivery Coverage
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  placeholder="Enter 6-digit Pincode"
                  variant="outlined"
                  size="small"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  sx={{
                    maxWidth: 240,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px"
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleCheckDelivery}
                  disabled={checkingDelivery}
                  sx={{
                    bgcolor: "#2453d4",
                    borderRadius: "10px",
                    fontWeight: 800,
                    px: 3,
                    textTransform: "uppercase",
                    "&:hover": { bgcolor: "#1a3eb3" }
                  }}
                >
                  {checkingDelivery ? <CircularProgress size={20} color="inherit" /> : "Check"}
                </Button>
              </Box>

              {deliveryStatus && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.5, borderRadius: 2, bgcolor: deliveryStatus.status === "success" ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)", border: deliveryStatus.status === "success" ? "1px solid rgba(34,197,94,0.15)" : "1px solid rgba(239,68,68,0.15)" }}>
                  {deliveryStatus.status === "success" ? (
                    <CheckCircleOutlinedIcon sx={{ color: "#22c55e" }} />
                  ) : (
                    <ErrorOutlinedIcon sx={{ color: "#ef4545" }} />
                  )}
                  <Typography variant="body2" sx={{ color: deliveryStatus.status === "success" ? "#15803d" : "#b91c1c", fontWeight: 600 }}>
                    {deliveryStatus.message}
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Service & Guarantee Highlights */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {[
                { icon: <ReplayOutlinedIcon sx={{ color: "#2453d4" }} />, text: "7 Days Returns" },
                { icon: <LocalShippingOutlinedIcon sx={{ color: "#2453d4" }} />, text: "Free Fast Shipping" },
                { icon: <GppGoodOutlinedIcon sx={{ color: "#2453d4" }} />, text: "1 Year Tech Warranty" },
                { icon: <LockOutlinedIcon sx={{ color: "#2453d4" }} />, text: "Secured Checkout" }
              ].map((service, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ border: "1px solid #e2e8f0", borderRadius: 4, p: 1.5, textAlign: "center", bgcolor: "white" }}>
                    <Box sx={{ mb: 0.5 }}>{service.icon}</Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "#334155" }}>
                      {service.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Specifications Box */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 5, 
                bgcolor: "white", 
                border: "1px solid #e2e8f0" 
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0f172a", mb: 2, fontFamily: "var(--font-montserrat)" }}>
                Key Specifications
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {[
                  { label: "Category", val: product.category },
                  { label: "Brand", val: product.title.split(" ")[0] || "Premium" },
                  { label: "Availability", val: "In Stock" },
                  { label: "Warranty Support", val: "1 Year Brand Service Center Warranty" }
                ].map((spec, idx) => (
                  <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", py: 1.25, borderBottom: idx === 3 ? "none" : "1px solid #f1f5f9" }}>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      {spec.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#0f172a", fontWeight: 800 }}>
                      {spec.val}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

          </Box>
        </Grid>
      </Grid>

      {/* Expandable/Scrollable Product Description Section */}
      <Box sx={{ mt: 8 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: "white", border: "1px solid #e2e8f0" }}>
          <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: "var(--font-montserrat)", color: "#0f172a", mb: 3 }}>
            Product Overview & Description
          </Typography>
          <Typography variant="body1" sx={{ color: "#334155", lineHeight: 1.8, fontSize: "1.05rem" }}>
            {product.description || "Take your computing to extreme heights with this performance gear. Designed for tech enthusiasts and heavy usage requirements. Built with premium materials to ensure safety, reliability, and long life operations."}
          </Typography>
          <Box sx={{ mt: 3, pl: 2, borderLeft: "3px solid #2453d4" }}>
            <Typography variant="body2" sx={{ color: "#64748b", fontStyle: "italic" }}>
              Standard Safety Warnings: Ensure proper physical grounding during hardware components installation. Please check technical specifications compliance with your existing cabinet motherboard power unit setup before purchasing.
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Related / Similar Products Section */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 10 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 900, 
              fontFamily: "var(--font-montserrat)", 
              color: "#0f172a", 
              mb: 4,
              textTransform: "uppercase",
              letterSpacing: 1.5
            }}
          >
            Similar Products You May Like
          </Typography>
          
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start" }}>
            {relatedProducts.map((p) => (
              <Box
                key={p.id}
                sx={{
                  width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(25% - 18px)" },
                  display: "flex",
                  flexDirection: "column",
                  height: "380px",
                  bgcolor: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 4,
                  border: "1px solid #eef2f6",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 16px 32px rgba(36,83,212,0.08)",
                    borderColor: "rgba(36,83,212,0.15)"
                  },
                  "&:hover .add-to-cart": {
                    transform: "translateY(0)",
                    opacity: 1
                  },
                  "&:hover .product-image": {
                    transform: "scale(1.06)"
                  }
                }}
              >
                {/* Product details link wrapper */}
                <Link
                  href={`/products/${p.id}`}
                  style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}
                >
                  {/* Category Tag overlay */}
                  <Box sx={{ position: "absolute", top: 12, left: 12, zIndex: 1 }}>
                    <Typography variant="caption" sx={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, color: "text.secondary", letterSpacing: 0.5, textTransform: "uppercase", fontSize: "0.65rem" }}>
                      {p.category}
                    </Typography>
                  </Box>

                  {/* Image container */}
                  <Box sx={{ position: "relative", height: "180px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", p: 2, mt: 2 }}>
                    <Image
                      className="product-image"
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 220px"
                      style={{ objectFit: "contain", mixBlendMode: "multiply", transition: "transform 0.4s ease" }}
                    />
                  </Box>

                  {/* Details block */}
                  <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Rating value={p.rating} precision={0.1} size="small" readOnly sx={{ mb: 0.5 }} />
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontFamily: "var(--font-montserrat)", 
                        fontWeight: 800, 
                        mb: 0.5, 
                        lineHeight: 1.3, 
                        display: "-webkit-box", 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: "vertical", 
                        overflow: "hidden",
                        color: "#222"
                      }}
                    >
                      {p.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontFamily: "var(--font-montserrat)", fontWeight: 900, color: "#2453d4", mt: "auto" }}>
                      ₹{p.price.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                </Link>

                {/* Add to Cart shutter drawer */}
                <Box
                  className="add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                  sx={{
                    fontFamily: "var(--font-montserrat)",
                    bgcolor: "#2453d4",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "50px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    cursor: "pointer",
                    transform: "translateY(100%)",
                    opacity: 0,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    textTransform: "uppercase",
                    fontWeight: 800,
                    letterSpacing: 1,
                    fontSize: "0.8rem",
                    gap: 0.5,
                    "&:hover": { bgcolor: "#1c42a5" }
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: "1rem" }} /> Add
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

    </Box>
  );
}
