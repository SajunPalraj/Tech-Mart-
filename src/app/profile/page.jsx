"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Context
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function ProfileContent() {
  const { user, loading: authLoading, updateUser } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Read URL query parameter for initial tab
  const initialTabVal = searchParams.get("tab") === "cart" ? 1 : searchParams.get("tab") === "shipping" ? 2 : 0;
  const [tabValue, setTabValue] = useState(initialTabVal);

  // State management
  const [dbUser, setDbUser] = useState(null);
  const [loadingDb, setLoadingDb] = useState(false);
  
  // Edit mode toggles
  const [editInfo, setEditInfo] = useState(false);
  const [editShipping, setEditShipping] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  // Upload/Save loading spinners
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingShipping, setSavingShipping] = useState(false);

  // Notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  
  // Checkout Success Dialog
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Redirect if logged out (after auth finish loading)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Synchronize Tab selection when search param changes
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "cart") setTabValue(1);
    else if (tabParam === "shipping") setTabValue(2);
    else setTabValue(0);
  }, [searchParams]);

  // Fetch complete user profile on mount / login
  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user?.id]);

  const fetchUserProfile = async () => {
    setLoadingDb(true);
    try {
      const res = await axios.get(`/API/profile?userId=${user.id}`);
      const profile = res.data.user;
      setDbUser(profile);
      
      // Seed personal info
      setFullName(profile.fullName || "");
      setPhone(profile.phone || "");
      setBio(profile.bio || "");
      
      // Seed shipping details
      setAddress(profile.address || "");
      setCity(profile.city || "");
      setState(profile.state || "");
      setZip(profile.zip || "");
      setCountry(profile.country || "");
    } catch (err) {
      console.error(err);
      showNotification("Failed to load profile details", "error");
    } finally {
      setLoadingDb(false);
    }
  };

  const showNotification = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Sync tabs back to URL
    const tabNames = ["profile", "cart", "shipping"];
    router.replace(`/profile?tab=${tabNames[newValue]}`);
  };

  // Image upload and client-side compression (resizing to 256x256 max dimensions)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotification("Please select an image file", "error");
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Draw to canvas for compression
        const canvas = document.createElement("canvas");
        const maxDim = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image using low quality JPEG
        const base64Str = canvas.toDataURL("image/jpeg", 0.7);
        saveAvatar(base64Str);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const saveAvatar = async (base64Str) => {
    try {
      const res = await axios.put("/API/profile", {
        userId: user.id,
        avatar: base64Str,
      });
      const updated = res.data.user;
      setDbUser(updated);
      
      // Update global context so Navbar avatar changes immediately
      updateUser({ ...user, avatar: updated.avatar });
      showNotification("Profile image uploaded successfully!", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to upload profile image", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save personal details
  const handleSaveInfo = async () => {
    setSavingInfo(true);
    try {
      const res = await axios.put("/API/profile", {
        userId: user.id,
        fullName,
        phone,
        bio,
      });
      const updated = res.data.user;
      setDbUser(updated);
      updateUser({ ...user, fullName: updated.fullName });
      setEditInfo(false);
      showNotification("Personal information updated!", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to update personal details", "error");
    } finally {
      setSavingInfo(false);
    }
  };

  // Save shipping details
  const handleSaveShipping = async () => {
    setSavingShipping(true);
    try {
      const res = await axios.put("/API/profile", {
        userId: user.id,
        address,
        city,
        state,
        zip,
        country,
      });
      setDbUser(res.data.user);
      setEditShipping(false);
      showNotification("Shipping details updated!", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to update shipping details", "error");
    } finally {
      setSavingShipping(false);
    }
  };

  const handleCheckoutSubmit = () => {
    if (!address || !city || !zip || !country) {
      showNotification("Please complete your Shipping Details first!", "warning");
      setTabValue(2); // Redirect to shipping tab
      router.replace("/profile?tab=shipping");
      return;
    }
    setCheckoutOpen(true);
  };

  const confirmCheckout = () => {
    clearCart();
    setCheckoutOpen(false);
    showNotification("Order placed successfully! Thank you for purchasing.", "success");
  };

  // Display spinners while authentication state is resolving
  if (authLoading || (!user && !authLoading)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", flex: 1 }}>
        <CircularProgress size={60} thickness={4} sx={{ color: "#2453d4" }} />
      </Box>
    );
  }

  // Calculate pricing calculations
  const shippingCost = cartTotal > 500 ? 0 : cartTotal > 0 ? 15 : 0;
  const taxCost = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + taxCost;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f7f6", py: { xs: 4, md: 8 }, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
      <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
        
        {/* Left column - User profile Summary overview */}
        <Grid xs={12} lg={4}>
          <Card sx={{ 
            borderRadius: 4, 
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)", 
            overflow: "visible", 
            border: "1px solid rgba(0,0,0,0.02)",
            background: "linear-gradient(145deg, #ffffff 0%, #fafcff 100%)",
            position: "relative" 
          }}>
            <Box sx={{ 
              height: 120, 
              background: "linear-gradient(135deg, #2453d4 0%, #173898 100%)", 
              borderTopLeftRadius: 16, 
              borderTopRightRadius: 16 
            }} />
            
            <CardContent sx={{ pt: 0, textAlign: "center", pb: 4 }}>
              {/* Profile Avatar Upload Group */}
              <Box sx={{ position: "relative", display: "inline-block", mt: -9, mb: 2 }}>
                <Avatar 
                  src={dbUser?.avatar || ""} 
                  sx={{ 
                    width: 140, 
                    height: 140, 
                    border: "5px solid #ffffff", 
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    bgcolor: "#e0e0e0",
                    color: "#666",
                    fontSize: "4rem",
                    fontWeight: 700
                  }}
                >
                  {!dbUser?.avatar && dbUser?.username ? dbUser.username.charAt(0).toUpperCase() : <PersonIcon fontSize="inherit" />}
                </Avatar>
                
                {/* Upload Trigger Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  style={{ display: "none" }} 
                />
                
                <Tooltip title="Upload profile picture" arrow>
                  <IconButton 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    sx={{ 
                      position: "absolute", 
                      bottom: 4, 
                      right: 4, 
                      bgcolor: "#2453d4", 
                      color: "white", 
                      boxShadow: "0 4px 10px rgba(36,83,212,0.4)",
                      "&:hover": { bgcolor: "#1a3eb3" },
                      width: 40,
                      height: 40
                    }}
                  >
                    {uploadingImage ? <CircularProgress size={20} color="inherit" /> : <PhotoCameraIcon size="small" />}
                  </IconButton>
                </Tooltip>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", color: "#111" }}>
                {dbUser?.fullName || dbUser?.username || "Guest User"}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary", mt: 0.5, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                <EmailIcon fontSize="inherit" sx={{ color: "#2453d4" }} /> {dbUser?.email}
              </Typography>
              
              {dbUser?.bio && (
                <Typography variant="body2" sx={{ fontStyle: "italic", mt: 2, px: 2, color: "text.secondary", lineHeight: 1.6 }}>
                  "{dbUser.bio}"
                </Typography>
              )}
              
              <Divider sx={{ my: 3 }} />

              {/* Shopping summary list */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid xs={6} sx={{ borderRight: "1px solid #f0f0f0" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#2453d4", fontFamily: "var(--font-montserrat)" }}>
                    {cartCount}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, textTransform: "uppercase" }}>
                    Cart Items
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#2453d4", fontFamily: "var(--font-montserrat)" }}>
                    ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, textTransform: "uppercase" }}>
                    Cart Total
                  </Typography>
                </Grid>
              </Grid>

              {/* Direct links to tabs */}
              <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => handleTabChange(null, 1)}
                  startIcon={<ShoppingCartIcon />}
                  sx={{ 
                    borderRadius: 3, 
                    py: 1, 
                    textTransform: "none", 
                    fontWeight: 600, 
                    color: "#2453d4", 
                    borderColor: "rgba(36,83,212,0.25)",
                    "&:hover": { borderColor: "#2453d4", bgcolor: "rgba(36,83,212,0.03)" }
                  }}
                >
                  View My Cart
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => handleTabChange(null, 2)}
                  startIcon={<LocalShippingIcon />}
                  sx={{ 
                    borderRadius: 3, 
                    py: 1, 
                    textTransform: "none", 
                    fontWeight: 600, 
                    color: "#666", 
                    borderColor: "rgba(0,0,0,0.12)",
                    "&:hover": { borderColor: "#111", bgcolor: "rgba(0,0,0,0.02)" }
                  }}
                >
                  Shipping Address
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right column - Dynamic Tabs container */}
        <Grid xs={12} lg={8}>
          <Paper sx={{ 
            borderRadius: 4, 
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)", 
            overflow: "hidden", 
            border: "1px solid rgba(0,0,0,0.02)" 
          }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="profile features tabs"
                variant="fullWidth"
                sx={{
                  "& .MuiTabs-indicator": {
                    height: 3,
                    bgcolor: "#2453d4",
                    borderRadius: "3px 3px 0 0"
                  },
                  "& .MuiTab-root": {
                    py: 2.2,
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    color: "text.secondary",
                    "&.Mui-selected": {
                      color: "#2453d4"
                    }
                  }
                }}
              >
                <Tab icon={<PersonIcon fontSize="small" />} iconPosition="start" label="Information" />
                <Tab icon={<ShoppingCartIcon fontSize="small" />} iconPosition="start" label={`My Cart (${cartCount})`} />
                <Tab icon={<LocalShippingIcon fontSize="small" />} iconPosition="start" label="Shipping" />
              </Tabs>
            </Box>

            <Box sx={{ p: { xs: 3, sm: 4 }, bgcolor: "white" }}>
              {loadingDb ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
                  <CircularProgress color="primary" />
                </Box>
              ) : (
                <>
                  {/* TAB 1: PERSONAL INFORMATION */}
                  {tabValue === 0 && (
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#111", display: "flex", alignItems: "center", gap: 1 }}>
                          <InfoIcon sx={{ color: "#2453d4" }} /> Personal Information
                        </Typography>
                        
                        {!editInfo ? (
                          <Button 
                            variant="contained" 
                            size="small"
                            onClick={() => setEditInfo(true)}
                            startIcon={<EditIcon />}
                            sx={{ bgcolor: "#2453d4", borderRadius: 2, textTransform: "none", py: 0.8, px: 2, fontWeight: 600, "&:hover": { bgcolor: "#1a3eb3" } }}
                          >
                            Edit Profile
                          </Button>
                        ) : (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button 
                              variant="outlined" 
                              size="small"
                              onClick={() => { setEditInfo(false); fetchUserProfile(); }}
                              startIcon={<CancelIcon />}
                              sx={{ borderRadius: 2, textTransform: "none", borderColor: "rgba(0,0,0,0.12)", color: "#666", "&:hover": { bgcolor: "rgba(0,0,0,0.02)", borderColor: "#999" } }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={handleSaveInfo}
                              disabled={savingInfo}
                              startIcon={savingInfo ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                              sx={{ bgcolor: "#4caf50", borderRadius: 2, textTransform: "none", color: "white", "&:hover": { bgcolor: "#388e3c" } }}
                            >
                              Save
                            </Button>
                          </Box>
                        )}
                      </Box>
                      
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={6}>
                          <TextField
                            label="Username"
                            value={dbUser?.username || ""}
                            fullWidth
                            disabled
                            variant="outlined"
                            slotProps={{ input: { sx: { bgcolor: "#fcfcfc", borderRadius: 2 } } }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            label="Email Address"
                            value={dbUser?.email || ""}
                            fullWidth
                            disabled
                            variant="outlined"
                            slotProps={{ input: { sx: { bgcolor: "#fcfcfc", borderRadius: 2 } } }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            label="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            fullWidth
                            disabled={!editInfo}
                            variant="outlined"
                            placeholder="Enter your full name"
                            slotProps={{
                              input: {
                                sx: { borderRadius: 2 },
                                startAdornment: <PersonIcon sx={{ color: "action.active", mr: 1, fontSize: 20 }} />
                              }
                            }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            label="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth
                            disabled={!editInfo}
                            variant="outlined"
                            placeholder="e.g. +1 (555) 019-2834"
                            slotProps={{
                              input: {
                                sx: { borderRadius: 2 },
                                startAdornment: <PhoneIcon sx={{ color: "action.active", mr: 1, fontSize: 20 }} />
                              }
                            }}
                          />
                        </Grid>
                        <Grid xs={12}>
                          <TextField
                            label="Biography / Short Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            fullWidth
                            disabled={!editInfo}
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Tell us a little bit about yourself..."
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Divider sx={{ my: 4 }} />
                      <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 18 }} /> Account created on {dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString() : ""}
                      </Typography>
                    </Box>
                  )}

                  {/* TAB 2: SHOPPING CART */}
                  {tabValue === 1 && (
                    <Box>
                      {cartItems.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 8 }}>
                          <ShoppingBagIcon sx={{ fontSize: 80, color: "rgba(0,0,0,0.1)", mb: 2 }} />
                          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", color: "#333", mb: 1 }}>
                            Your cart is empty
                          </Typography>
                          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 400, mx: "auto" }}>
                            You haven't added any products to your shopping cart yet. Check out our tech collection!
                          </Typography>
                          <Button 
                            component={Link} 
                            href="/" 
                            variant="contained" 
                            sx={{ bgcolor: "#2453d4", color: "white", borderRadius: "25px", px: 4, py: 1.25, fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: "#1a3eb3" } }}
                          >
                            Browse Products
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={4}>
                          {/* Cart items list */}
                          <Grid xs={12} lg={7}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: "#111", fontFamily: "var(--font-montserrat)" }}>
                              Items In Cart ({cartCount})
                            </Typography>
                            
                            <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              {cartItems.map((item, index) => (
                                <Card key={index} variant="outlined" sx={{ borderRadius: 3, border: "1px solid #f0f0f0", transition: "all 0.2s", "&:hover": { borderColor: "#ccc", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" } }}>
                                  <Box sx={{ display: "flex", p: 2, position: "relative" }}>
                                    
                                    <Avatar 
                                      src={item.image} 
                                      variant="rounded" 
                                      sx={{ 
                                        width: { xs: 65, sm: 80 }, 
                                        height: { xs: 65, sm: 80 }, 
                                        bgcolor: "#f9f9f9", 
                                        border: "1px solid #f0f0f0",
                                        "& img": { objectFit: "contain", mixBlendMode: "multiply", p: 0.5 }
                                      }} 
                                    />
                                    
                                    <Box sx={{ ml: 2, flex: 1, pr: 4 }}>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                        {item.title}
                                      </Typography>
                                      
                                      <Typography variant="body1" sx={{ color: "#2453d4", fontWeight: 800, mt: 1, fontFamily: "var(--font-montserrat)" }}>
                                        ${item.price}
                                      </Typography>
                                      
                                      {/* Quantity Adjuster */}
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
                                        <Typography variant="caption" sx={{ color: "text.secondary", mr: 1, fontWeight: 600 }}>
                                          QTY:
                                        </Typography>
                                        <IconButton 
                                          size="small" 
                                          onClick={() => updateQuantity(item.title, item.quantity - 1)}
                                          sx={{ border: "1px solid #e0e0e0", p: 0.25 }}
                                        >
                                          <RemoveIcon fontSize="inherit" />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ width: 24, textAlign: "center", fontWeight: 700 }}>
                                          {item.quantity}
                                        </Typography>
                                        <IconButton 
                                          size="small" 
                                          onClick={() => updateQuantity(item.title, item.quantity + 1)}
                                          sx={{ border: "1px solid #e0e0e0", p: 0.25 }}
                                        >
                                          <AddIcon fontSize="inherit" />
                                        </IconButton>
                                      </Box>
                                    </Box>

                                    {/* Delete icon */}
                                    <IconButton 
                                      onClick={() => removeFromCart(item.title)}
                                      sx={{ 
                                        position: "absolute", 
                                        top: 10, 
                                        right: 10, 
                                        color: "text.secondary",
                                        "&:hover": { color: "error.main" } 
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Box>
                                </Card>
                              ))}
                            </List>
                          </Grid>
                          
                          {/* Cart Summary */}
                          <Grid xs={12} lg={5}>
                            <Card sx={{ borderRadius: 3, border: "1px solid #e0e0e0", bgcolor: "#fcfcff", p: 3 }}>
                              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: "#111", fontFamily: "var(--font-montserrat)" }}>
                                Order Summary
                              </Typography>
                              
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                    Subtotal ({cartCount} items)
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "var(--font-montserrat)" }}>
                                    ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                    Shipping Fee
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "var(--font-montserrat)", color: shippingCost === 0 ? "#4caf50" : "inherit" }}>
                                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                                  </Typography>
                                </Box>
                                {shippingCost > 0 && (
                                  <Typography variant="caption" sx={{ color: "#2453d4", mt: -1, fontWeight: 500 }}>
                                    Free shipping on orders over $500!
                                  </Typography>
                                )}

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                    Estimated Tax (8%)
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "var(--font-montserrat)" }}>
                                    ${taxCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                  </Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111" }}>
                                    Grand Total
                                  </Typography>
                                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#2453d4", fontFamily: "var(--font-montserrat)" }}>
                                    ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                  </Typography>
                                </Box>
                                
                                <Button 
                                  variant="contained" 
                                  fullWidth
                                  onClick={handleCheckoutSubmit}
                                  endIcon={<ArrowForwardIcon />}
                                  sx={{ 
                                    bgcolor: "#2453d4", 
                                    color: "white", 
                                    borderRadius: 3, 
                                    py: 1.75, 
                                    mt: 2,
                                    fontWeight: 700, 
                                    fontSize: "0.95rem",
                                    textTransform: "none",
                                    boxShadow: "0 8px 20px rgba(36,83,212,0.25)",
                                    "&:hover": { bgcolor: "#1a3eb3", boxShadow: "0 10px 24px rgba(36,83,212,0.35)" }
                                  }}
                                >
                                  Proceed to Checkout
                                </Button>
                              </Box>
                            </Card>
                          </Grid>
                        </Grid>
                      )}
                    </Box>
                  )}

                  {/* TAB 3: SHIPPING DETAILS */}
                  {tabValue === 2 && (
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#111", display: "flex", alignItems: "center", gap: 1 }}>
                          <LocalShippingIcon sx={{ color: "#2453d4" }} /> Shipping Details
                        </Typography>
                        
                        {!editShipping ? (
                          <Button 
                            variant="contained" 
                            size="small"
                            onClick={() => setEditShipping(true)}
                            startIcon={<EditIcon />}
                            sx={{ bgcolor: "#2453d4", borderRadius: 2, textTransform: "none", py: 0.8, px: 2, fontWeight: 600, "&:hover": { bgcolor: "#1a3eb3" } }}
                          >
                            Edit Address
                          </Button>
                        ) : (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button 
                              variant="outlined" 
                              size="small"
                              onClick={() => { setEditShipping(false); fetchUserProfile(); }}
                              startIcon={<CancelIcon />}
                              sx={{ borderRadius: 2, textTransform: "none", borderColor: "rgba(0,0,0,0.12)", color: "#666", "&:hover": { bgcolor: "rgba(0,0,0,0.02)", borderColor: "#999" } }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={handleSaveShipping}
                              disabled={savingShipping}
                              startIcon={savingShipping ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                              sx={{ bgcolor: "#4caf50", borderRadius: 2, textTransform: "none", color: "white", "&:hover": { bgcolor: "#388e3c" } }}
                            >
                              Save Address
                            </Button>
                          </Box>
                        )}
                      </Box>

                      <Grid container spacing={3}>
                        <Grid xs={12}>
                          <TextField
                            label="Street Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            fullWidth
                            disabled={!editShipping}
                            variant="outlined"
                            placeholder="Apartment, suite, unit, building, street address"
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            fullWidth
                            disabled={!editShipping}
                            variant="outlined"
                            placeholder="Enter city"
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            label="State / Province / Region"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            fullWidth
                            disabled={!editShipping}
                            variant="outlined"
                            placeholder="Enter state"
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            label="ZIP / Postal Code"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            fullWidth
                            disabled={!editShipping}
                            variant="outlined"
                            placeholder="Enter postal code"
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            fullWidth
                            disabled={!editShipping}
                            variant="outlined"
                            placeholder="Enter country"
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 4 }} />
                      <Box sx={{ p: 2, bgcolor: "#fafcff", border: "1px dashed rgba(36,83,212,0.2)", borderRadius: 3, display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                        <InfoIcon sx={{ color: "#2453d4", mt: 0.25 }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                            Delivery Notice
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", lineHeight: 1.4 }}>
                            Please verify that your shipping address is accurate. We will use these details to calculate accurate taxes, customs clearances, and delivery windows during checkout processing.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Checkout dialog confirmation */}
      <Dialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        aria-labelledby="checkout-dialog-title"
        aria-describedby="checkout-dialog-description"
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <DialogTitle id="checkout-dialog-title" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 28 }} /> Confirm Order Placement
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="checkout-dialog-description" sx={{ lineHeight: 1.6 }}>
            You are about to place an order for <strong>{cartCount} item(s)</strong>. 
            The total cost is <strong>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>.<br /><br />
            Items will be shipped to:<br />
            <strong>{fullName || dbUser?.fullName || user.username}</strong><br />
            {address}, {city}, {state} {zip}, {country}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setCheckoutOpen(false)} 
            sx={{ textTransform: "none", color: "#666", fontWeight: 600 }}
          >
            Go Back
          </Button>
          <Button 
            onClick={confirmCheckout} 
            variant="contained"
            sx={{ bgcolor: "#4caf50", color: "white", textTransform: "none", fontWeight: 600, borderRadius: 2, "&:hover": { bgcolor: "#388e3c" } }} 
            autoFocus
          >
            Confirm & Pay
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          sx={{ width: "100%", borderRadius: 2, fontWeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", flex: 1 }}>
        <CircularProgress size={60} thickness={4} sx={{ color: "#2453d4" }} />
      </Box>
    }>
      <ProfileContent />
    </Suspense>
  );
}
