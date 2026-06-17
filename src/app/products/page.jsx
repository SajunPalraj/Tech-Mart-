"use client";

import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton";

// Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";

// Context & Navigation
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const categories = ["All", "GPU", "CPU", "RAM", "Laptops", "Monitors", "ACCESSORIES"];

function ProductsContent() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load URL query parameters as initial state
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "price-asc";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);

  // Synchronize component state if URL query params change
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
    setSearchQuery(searchParams.get("search") || "");
    setSortBy(searchParams.get("sort") || "price-asc");
  }, [searchParams]);

  // Fetch products from database
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        let sortParam = "price";
        let orderParam = "asc";

        if (sortBy === "price-desc") {
          sortParam = "price";
          orderParam = "desc";
        } else if (sortBy === "rating-desc") {
          sortParam = "rating";
          orderParam = "desc";
        }

        const res = await axios.get(
          `/API/products?category=${selectedCategory === "All" ? "" : encodeURIComponent(selectedCategory)}&search=${encodeURIComponent(searchQuery)}&sortBy=${sortParam}&sortOrder=${orderParam}`
        );
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }

    // Debounce network request slightly if searching to avoid hitting database on every keystroke
    const handler = setTimeout(() => {
      getProducts();
    }, 200);

    return () => clearTimeout(handler);
  }, [selectedCategory, searchQuery, sortBy]);

  // Sync state variables back to URL
  const updateUrlParams = (cat, search, sort) => {
    const params = new URLSearchParams();
    if (cat && cat !== "All") params.set("category", cat);
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    updateUrlParams(cat, searchQuery, sortBy);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateUrlParams(selectedCategory, val, sortBy);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    updateUrlParams(selectedCategory, searchQuery, val);
  };

  // Group products by category so we can display them section by section if displaying "All" categories
  const groupedProducts = {};
  if (selectedCategory === "All") {
    products.forEach((p) => {
      if (!groupedProducts[p.category]) {
        groupedProducts[p.category] = [];
      }
      groupedProducts[p.category].push(p);
    });
  } else {
    groupedProducts[selectedCategory] = products;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f3f6fb", py: 6, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
      
      {/* Header Banner */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontFamily: "var(--font-montserrat)", 
            fontWeight: 900, 
            letterSpacing: 2, 
            mb: 2,
            background: "linear-gradient(135deg, #2453d4 0%, #173898 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Explore Tech Catalog
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
          Browse our ultimate tech gear. From top-tier graphic processing units and overclockable memory modules to extreme gaming laptops.
        </Typography>
      </Box>

      {/* Filter and Sort Toolbar */}
      <Paper sx={{ p: 3, borderRadius: 4, boxShadow: "0 8px 30px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.01)", mb: 6 }}>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          {/* Search Input */}
          <Grid xs={12} md={5}>
            <TextField
              label="Search Products"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Search by product title..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#2453d4" }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 3 }
                }
              }}
            />
          </Grid>

          {/* Category Dropdown (Mobile fallback filter) */}
          <Grid xs={12} sm={6} md={3.5}>
            <FormControl fullWidth>
              <InputLabel id="category-filter-label" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FilterListIcon fontSize="small" /> Category
              </InputLabel>
              <Select
                labelId="category-filter-label"
                value={selectedCategory}
                label="Category"
                onChange={(e) => handleCategoryChange(e.target.value)}
                sx={{ borderRadius: 3 }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sort By Dropdown */}
          <Grid xs={12} sm={6} md={3.5}>
            <FormControl fullWidth>
              <InputLabel id="sort-select-label" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <SortIcon fontSize="small" /> Sort By
              </InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortBy}
                label="Sort By"
                onChange={(e) => handleSortChange(e.target.value)}
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Category Pill Filters (Desktop horizontal list) */}
        <Box sx={{ 
          display: { xs: "none", md: "flex" }, 
          flexWrap: "wrap", 
          gap: 1.5, 
          mt: 3, 
          pt: 3, 
          borderTop: "1px solid #f0f0f0" 
        }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 800,
                  bgcolor: isActive ? "#2453d4" : "rgba(36,83,212,0.03)",
                  color: isActive ? "white" : "#666",
                  border: isActive ? "1px solid #2453d4" : "1px solid rgba(0,0,0,0.04)",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: isActive ? "#1c42a5" : "rgba(36,83,212,0.08)",
                    borderColor: isActive ? "#1c42a5" : "#2453d4",
                    color: isActive ? "white" : "#2453d4"
                  }
                }}
              >
                {cat}
              </Button>
            );
          })}
        </Box>
      </Paper>

      {/* Loading Overlay - skeleton loading cards */}
      {loading ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start" }}>
          {Array.from(new Array(6)).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
                display: "flex",
                flexDirection: "column",
                height: "440px",
                bgcolor: "#ffffff",
                borderRadius: 4,
                border: "1px solid #eef2f6",
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                p: 2
              }}
            >
              {/* Image Skeleton */}
              <Skeleton variant="rectangular" height="200px" animation="wave" sx={{ borderRadius: 3, mb: 2 }} />
              {/* Rating Stars Skeleton */}
              <Skeleton variant="text" width="40%" height={20} animation="wave" sx={{ mb: 1 }} />
              {/* Title Skeleton */}
              <Skeleton variant="text" width="90%" height={28} animation="wave" sx={{ mb: 1 }} />
              {/* Description Skeleton */}
              <Skeleton variant="text" width="80%" height={20} animation="wave" sx={{ mb: 2 }} />
              {/* Price Skeleton */}
              <Skeleton variant="text" width="35%" height={32} animation="wave" sx={{ mt: "auto", mb: 1 }} />
            </Box>
          ))}
        </Box>
      ) : products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 12, bgcolor: "white", borderRadius: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", mb: 1 }}>
            No products found
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            We couldn't find any products matching your search criteria. Try removing filters or modifying your search term.
          </Typography>
        </Box>
      ) : (
        /* Render Grouped Products Category by Category (Requirement 4) */
        Object.keys(groupedProducts).map((catName) => {
          const catProducts = groupedProducts[catName] || [];
          if (catProducts.length === 0) return null;

          return (
            <Box key={catName} sx={{ mb: 8 }}>
              {/* Category Title */}
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 1, sm: 1.5 }, mb: 4 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontFamily: "var(--font-montserrat)", 
                    fontWeight: 900, 
                    textTransform: "uppercase", 
                    letterSpacing: "1.5px", 
                    color: "#6a9cff",
                    fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" }
                  }}
                >
                  CATEGORY:
                </Typography>
                <Box sx={{ bgcolor: "#2453d4", color: "white", px: { xs: 1.5, sm: 2.5 }, py: { xs: 0.5, sm: 0.8 }, borderRadius: 1 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: "var(--font-montserrat)", 
                      fontWeight: 900, 
                      textTransform: "uppercase", 
                      letterSpacing: "1.5px",
                      fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" }
                    }}
                  >
                    {catName}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "text.secondary", ml: { xs: 0, sm: 1 }, fontWeight: 600, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  ({catProducts.length} items)
                </Typography>
              </Box>

              {/* Product Grid */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start" }}>
                {catProducts.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
                      display: "flex",
                      flexDirection: "column",
                      height: "440px",
                      bgcolor: "#ffffff",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 4,
                      border: "1px solid #eef2f6",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 16px 32px rgba(36,83,212,0.1)",
                        borderColor: "rgba(36,83,212,0.15)"
                      },
                      "&:hover .add-to-cart": {
                        transform: "translateY(0)",
                        opacity: 1
                      },
                      "&:hover .product-image": {
                        transform: "scale(1.08)"
                      }
                    }}
                  >
                    {/* Icons overlays */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, p: 2 }}>
                      <Typography variant="caption" sx={{ fontFamily: "var(--font-montserrat)", fontWeight: 800, color: "text.secondary", letterSpacing: 1, textTransform: "uppercase" }}>
                        {product.category}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleWishlist(product)}
                          sx={{ 
                            bgcolor: isInWishlist(product.title) ? "rgba(240,244,248,0.95)" : "rgba(240,244,248,0.9)", 
                            color: isInWishlist(product.title) ? "#e91e63" : "inherit",
                            "&:hover": { bgcolor: "white", color: "#e91e63" } 
                          }}
                        >
                          {isInWishlist(product.title) ? (
                            <FavoriteIcon fontSize="small" />
                          ) : (
                            <FavoriteBorderIcon fontSize="small" />
                          )}
                        </IconButton>
                        <IconButton size="small" sx={{ bgcolor: "rgba(240,244,248,0.9)", "&:hover": { bgcolor: "white", color: "#2453d4" } }}>
                          <CompareArrowsIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Link 
                      href={`/products/${product.id}`}
                      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", flexGrow: 1, height: "100%" }}
                    >
                      {/* Product Image Panel */}
                      <Box sx={{ position: "relative", height: "200px", width: "100%", bgcolor: "transparent", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", p: 2, mt: 3 }}>
                        <Box
                          className="product-image"
                          component="img"
                          src={product.image}
                          alt={product.title}
                          sx={{ 
                            maxHeight: "100%", 
                            maxWidth: "100%", 
                            objectFit: "contain", 
                            objectPosition: "center", 
                            mixBlendMode: "multiply", 
                            transition: "transform 0.4s ease" 
                          }}
                        />
                      </Box>

                      {/* Info Panel */}
                      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ mb: 0.5 }} />
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontFamily: "var(--font-montserrat)", 
                            fontWeight: 800, 
                            mb: 0.5, 
                            lineHeight: 1.4, 
                            display: "-webkit-box", 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: "vertical", 
                            overflow: "hidden",
                            color: "#222"
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: "text.secondary", 
                            fontSize: "0.75rem", 
                            display: "-webkit-box", 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: "vertical", 
                            overflow: "hidden", 
                            mb: 1.5,
                            lineHeight: 1.4
                          }}
                        >
                          {product.description || "Premium high performance catalog item from Tech Mart."}
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: "var(--font-montserrat)", fontWeight: 900, color: "#2453d4", mt: "auto", mb: 2 }}>
                          ₹{product.price?.toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                    </Link>

                    {/* Add to Cart Shutter Drawer Button */}
                    <Box
                      className="add-to-cart"
                      onClick={() => addToCart(product)}
                      sx={{
                        fontFamily: "var(--font-montserrat)",
                        bgcolor: "#2453d4",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "60px",
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
                        letterSpacing: 1.5,
                        gap: 1,
                        "&:hover": {
                          bgcolor: "#1c42a5"
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
        })
      )}
    </Box>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", flex: 1 }}>
        <CircularProgress size={50} thickness={4} sx={{ color: "#2453d4" }} />
      </Box>
    }>
      <ProductsContent />
    </Suspense>
  );
}
