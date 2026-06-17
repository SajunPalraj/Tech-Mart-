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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  const prodImageInputRef = useRef(null);

  // Check if the current user is the admin
  const isAdmin = user?.email === "sajunpalraj2004@gmail.com";

  // Read URL query parameter for initial tab
  const tabParam = searchParams.get("tab");
  let initialTabVal = 0;
  if (isAdmin) {
    initialTabVal = tabParam === "add-product" ? 1 : tabParam === "members" ? 2 : 0;
  } else {
    initialTabVal = tabParam === "cart" ? 1 : tabParam === "shipping" ? 2 : 0;
  }

  const [tabValue, setTabValue] = useState(initialTabVal);

  // User details states
  const [dbUser, setDbUser] = useState(null);
  const [loadingDb, setLoadingDb] = useState(false);
  
  // Edit mode toggles for user details
  const [editInfo, setEditInfo] = useState(false);
  const [editShipping, setEditShipping] = useState(false);

  // Personal/Shipping Form states
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

  // Admin specific form states for Adding Products
  const [prodTitle, setProdTitle] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodRating, setProdRating] = useState("5.0");
  const [prodCategory, setProdCategory] = useState("GPU");
  const [prodImage, setProdImage] = useState("");
  const [submittingProduct, setSubmittingProduct] = useState(false);

  // Admin specific members list states
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  // Notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  
  // Checkout Success Dialog
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Redirect if logged out (after auth finishes loading)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Synchronize Tab selection when search param changes
  useEffect(() => {
    const p = searchParams.get("tab");
    if (isAdmin) {
      if (p === "add-product") setTabValue(1);
      else if (p === "members") setTabValue(2);
      else setTabValue(0);
    } else {
      if (p === "cart") setTabValue(1);
      else if (p === "shipping") setTabValue(2);
      else setTabValue(0);
    }
  }, [searchParams, isAdmin]);

  // Fetch complete user profile on mount / login
  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user?.id]);

  // Load site members if admin switches to the members tab
  useEffect(() => {
    if (isAdmin && tabValue === 2) {
      fetchMembers();
    }
  }, [isAdmin, tabValue]);

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

  const fetchMembers = async () => {
    setLoadingMembers(true);
    try {
      const res = await axios.get(`/API/members?adminEmail=${user.email}`);
      setMembers(res.data.members || []);
    } catch (err) {
      console.error(err);
      showNotification("Failed to load site members", "error");
    } finally {
      setLoadingMembers(false);
    }
  };

  const showNotification = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Sync tabs back to URL without resetting the scroll position
    const tabNames = isAdmin ? ["profile", "add-product", "members"] : ["profile", "cart", "shipping"];
    router.replace(`/profile?tab=${tabNames[newValue]}`, { scroll: false });
  };

  // Profile Avatar Upload uploader code
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

  // Submit handler for Admin Adding Products
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!prodTitle || !prodPrice || !prodCategory || !prodImage) {
      showNotification("Please fill in all required fields: Title, Price, Category, and Image.", "warning");
      return;
    }

    setSubmittingProduct(true);
    try {
      const res = await axios.post("/API/products", {
        title: prodTitle,
        description: prodDescription,
        price: prodPrice,
        rating: prodRating,
        category: prodCategory,
        image: prodImage,
        adminEmail: user.email,
      });

      showNotification("Product successfully added to " + prodCategory + "!", "success");
      
      // Clear form inputs
      setProdTitle("");
      setProdDescription("");
      setProdPrice("");
      setProdRating("5.0");
      setProdCategory("GPU");
      setProdImage("");
    } catch (err) {
      console.error(err);
      showNotification(err.response?.data?.error || "Failed to add product.", "error");
    } finally {
      setSubmittingProduct(false);
    }
  };

  // Admin Product Image uploader file reader
  const handleProductImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotification("Please select a valid image file", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 512; // Moderate dimension for standard product thumbnails
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

        // Convert to base64
        const base64Str = canvas.toDataURL("image/jpeg", 0.8);
        setProdImage(base64Str);
        showNotification("Product image uploaded and processed!", "success");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
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
  const shippingCost = cartTotal > 41500 ? 0 : cartTotal > 0 ? 1245 : 0;
  const taxCost = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + taxCost;

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #eff6ff 100%)", py: { xs: 4, md: 8 }, px: { xs: 2, sm: 4, md: 8, lg: 12 } }}>
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" }, 
        flexWrap: "wrap", 
        gap: 4, 
        alignItems: "flex-start",
        width: "100%"
      }}>
        
        {/* Left column - User profile Summary overview */}
        <Box sx={{ 
          width: { xs: "100%", md: "calc(33.333% - 24px)" }, 
          flexShrink: 0 
        }}>
          <Card sx={{ 
            borderRadius: 6, 
            boxShadow: "0 20px 50px rgba(36, 83, 212, 0.05), 0 1px 3px rgba(0,0,0,0.01)", 
            overflow: "visible", 
            border: "1px solid rgba(255, 255, 255, 0.7)",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            position: "relative" 
          }}>
            <Box sx={{ 
              height: 140, 
              background: isAdmin 
                ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" // special slate/navy gradient for admin
                : "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)", // royal blue standard theme gradient
              borderTopLeftRadius: 24, 
              borderTopRightRadius: 24 
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
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    bgcolor: "#f1f5f9",
                    color: "#475569",
                    fontSize: "4rem",
                    fontWeight: 700,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      borderColor: isAdmin ? "#0f172a" : "#2453d4",
                    }
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
                      bgcolor: isAdmin ? "#0f172a" : "#2453d4", 
                      color: "white", 
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      "&:hover": { bgcolor: isAdmin ? "#1e293b" : "#1a3eb3" },
                      width: 40,
                      height: 40
                     }}
                  >
                    {uploadingImage ? <CircularProgress size={20} color="inherit" /> : <PhotoCameraIcon size="small" />}
                  </IconButton>
                </Tooltip>
              </Box>
 
              {/* Special Admin/User Badges */}
              {isAdmin ? (
                <Box sx={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: 0.5, 
                  bgcolor: "rgba(15, 23, 42, 0.08)", 
                  color: "#0f172a", 
                  px: 2.5, 
                  py: 0.75, 
                  borderRadius: "20px", 
                  mb: 1.5,
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  border: "1px solid rgba(15, 23, 42, 0.15)"
                }}>
                  <AdminPanelSettingsIcon fontSize="small" sx={{ color: "#0f172a" }} /> Site Administrator
                </Box>
              ) : (
                <Box sx={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: 0.5, 
                  bgcolor: "rgba(37, 99, 235, 0.08)", 
                  color: "#2563eb", 
                  px: 2.5, 
                  py: 0.75, 
                  borderRadius: "20px", 
                  mb: 1.5,
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  border: "1px solid rgba(37, 99, 235, 0.15)"
                }}>
                  <PersonIcon fontSize="small" /> Tech Mart Member
                </Box>
              )}
 
              <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)", color: "#111" }}>
                {dbUser?.fullName || dbUser?.username || "Guest User"}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary", mt: 0.5, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                <EmailIcon fontSize="inherit" sx={{ color: isAdmin ? "#0f172a" : "#2453d4" }} /> {dbUser?.email}
              </Typography>
              
              {dbUser?.bio && (
                <Typography variant="body2" sx={{ fontStyle: "italic", mt: 2, px: 2, color: "text.secondary", lineHeight: 1.6 }}>
                  "{dbUser.bio}"
                </Typography>
              )}
              
              <Divider sx={{ my: 3 }} />
 
              {!isAdmin ? (
                <>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, bgcolor: "rgba(36, 83, 212, 0.03)", borderRadius: 4, border: "1px solid rgba(36, 83, 212, 0.05)" }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, color: "#2453d4", fontFamily: "var(--font-montserrat)" }}>
                          {cartCount}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                          Cart Items
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ p: 2, bgcolor: "rgba(36, 83, 212, 0.03)", borderRadius: 4, border: "1px solid rgba(36, 83, 212, 0.05)" }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, color: "#2453d4", fontFamily: "var(--font-montserrat)" }}>
                          ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                          Cart Total
                        </Typography>
                      </Box>
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
                        py: 1.25, 
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
                        py: 1.25, 
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
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary", mb: 2, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: 0.5 }}>
                    Administrator Controls
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Button 
                      variant="contained" 
                      onClick={() => handleTabChange(null, 1)}
                      startIcon={<AddIcon />}
                      sx={{ 
                        borderRadius: 3, 
                        py: 1.25, 
                        textTransform: "none", 
                        fontWeight: 700, 
                        bgcolor: "#0f172a",
                        boxShadow: "0px 4px 12px rgba(15, 23, 42, 0.2)",
                        "&:hover": { bgcolor: "#1e293b" }
                      }}
                    >
                      Add New Product
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={() => handleTabChange(null, 2)}
                      startIcon={<PeopleIcon />}
                      sx={{ 
                        borderRadius: 3, 
                        py: 1.25, 
                        textTransform: "none", 
                        fontWeight: 600, 
                        color: "#0f172a", 
                        borderColor: "rgba(15, 23, 42, 0.4)",
                        "&:hover": { borderColor: "#0f172a", bgcolor: "rgba(15, 23, 42, 0.05)" }
                      }}
                    >
                      View Site Members
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
 
        {/* Right column - Dynamic Tabs container */}
        <Box sx={{ 
          width: { xs: "100%", md: "calc(66.667% - 24px)" }, 
          flexGrow: 1 
        }}>
          <Paper sx={{ 
            borderRadius: 6, 
            boxShadow: "0 20px 50px rgba(36, 83, 212, 0.05), 0 1px 3px rgba(0,0,0,0.01)", 
            overflow: "hidden", 
            border: "1px solid rgba(255, 255, 255, 0.7)",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)"
          }}>
            <Box sx={{ borderBottom: 1, borderColor: "rgba(0, 0, 0, 0.05)", bgcolor: "rgba(255, 255, 255, 0.5)" }}>
               <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="profile features tabs"
                variant="fullWidth"
                sx={{
                  "& .MuiTabs-indicator": {
                    height: 0,
                  },
                  "& .MuiTab-root": {
                    py: 2.2,
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    fontSize: { xs: "0.75rem", sm: "0.85rem" },
                    color: "#64748b",
                    textTransform: "uppercase",
                    margin: "6px",
                    borderRadius: "12px",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "rgba(36, 83, 212, 0.04)",
                      color: "#2453d4"
                    },
                    "&.Mui-selected": {
                      bgcolor: isAdmin ? "#0f172a" : "#2453d4",
                      color: "#ffffff !important",
                      boxShadow: isAdmin 
                        ? "0 4px 12px rgba(15, 23, 42, 0.2)" 
                        : "0 4px 12px rgba(36, 83, 212, 0.2)",
                    }
                  }
                }}
              >
                <Tab icon={<PersonIcon fontSize="small" />} iconPosition="start" label="Information" />
                {!isAdmin ? (
                  [
                    <Tab key="cart" icon={<ShoppingCartIcon fontSize="small" />} iconPosition="start" label={`My Cart (${cartCount})`} />,
                    <Tab key="shipping" icon={<LocalShippingIcon fontSize="small" />} iconPosition="start" label="Shipping" />
                  ]
                ) : (
                  [
                    <Tab key="add" icon={<AddIcon fontSize="small" />} iconPosition="start" label="Add Products" />,
                    <Tab key="members" icon={<PeopleIcon fontSize="small" />} iconPosition="start" label="Members List" />
                  ]
                )}
              </Tabs>
            </Box>
 
            <Box sx={{ p: { xs: 3, sm: 4 }, bgcolor: "transparent" }}>
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
                          <InfoIcon sx={{ color: isAdmin ? "#0f172a" : "#2453d4" }} /> Personal Information
                        </Typography>
                        
                        {!editInfo ? (
                          <Button 
                            variant="contained" 
                            size="small"
                            onClick={() => setEditInfo(true)}
                            startIcon={<EditIcon />}
                            sx={{ 
                              bgcolor: isAdmin ? "#e65100" : "#2453d4", 
                              borderRadius: 2, 
                              textTransform: "none", 
                              py: 0.8, 
                              px: 2, 
                              fontWeight: 600, 
                              "&:hover": { bgcolor: isAdmin ? "#b53d00" : "#1a3eb3" } 
                            }}
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
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Username"
                            value={dbUser?.username || ""}
                            fullWidth
                            disabled
                            variant="outlined"
                            slotProps={{ input: { sx: { bgcolor: "#fcfcfc", borderRadius: 2 } } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Email Address"
                            value={dbUser?.email || ""}
                            fullWidth
                            disabled
                            variant="outlined"
                            slotProps={{ input: { sx: { bgcolor: "#fcfcfc", borderRadius: 2 } } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12}>
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

                  {/* USER TAB 2: SHOPPING CART */}
                  {!isAdmin && tabValue === 1 && (
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
                            href="/products" 
                            variant="contained" 
                            sx={{ bgcolor: "#2453d4", color: "white", borderRadius: "25px", px: 4, py: 1.25, fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: "#1a3eb3" } }}
                          >
                            Browse Products
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={4}>
                          {/* Cart items list */}
                          <Grid item xs={12} lg={7}>
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
                                        ₹{item.price?.toLocaleString("en-IN")}
                                      </Typography>
                                      
                                      {/* Quantity Adjuster */}
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
                                        <Typography variant="caption" sx={{ color: "text.secondary", mr: 1, fontWeight: 600 }}>
                                          QTY:
                                        </Typography>
                                        <IconButton 
                                          size="small" 
                                          onClick={() => updateQuantity(item.title || item.id, item.quantity - 1)}
                                          sx={{ border: "1px solid #e0e0e0", p: 0.25 }}
                                        >
                                          <RemoveIcon fontSize="inherit" />
                                        </IconButton>
                                        <Typography variant="body2" sx={{ width: 24, textAlign: "center", fontWeight: 700 }}>
                                          {item.quantity}
                                        </Typography>
                                        <IconButton 
                                          size="small" 
                                          onClick={() => updateQuantity(item.title || item.id, item.quantity + 1)}
                                          sx={{ border: "1px solid #e0e0e0", p: 0.25 }}
                                        >
                                          <AddIcon fontSize="inherit" />
                                        </IconButton>
                                      </Box>
                                    </Box>

                                    {/* Delete icon */}
                                    <IconButton 
                                      onClick={() => removeFromCart(item.title || item.id)}
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
                          <Grid item xs={12} lg={5}>
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
                                    ₹{cartTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                    Shipping Fee
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "var(--font-montserrat)", color: shippingCost === 0 ? "#4caf50" : "inherit" }}>
                                    {shippingCost === 0 ? "FREE" : `₹${shippingCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
                                  </Typography>
                                </Box>
                                {shippingCost > 0 && (
                                  <Typography variant="caption" sx={{ color: "#2453d4", mt: -1, fontWeight: 500 }}>
                                    Free shipping on orders over ₹41,500!
                                  </Typography>
                                )}

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                    Estimated Tax (8%)
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "var(--font-montserrat)" }}>
                                    ₹{taxCost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                  </Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#111" }}>
                                    Grand Total
                                  </Typography>
                                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#2453d4", fontFamily: "var(--font-montserrat)" }}>
                                    ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
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

                  {/* USER TAB 3: SHIPPING DETAILS */}
                  {!isAdmin && tabValue === 2 && (
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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

                  {/* ADMIN TAB 2: ADD PRODUCT PANEL (Requirement 2.1, 5) */}
                  {isAdmin && tabValue === 1 && (
                    <Box component="form" onSubmit={handleAddProduct}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#111", display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                        <AddIcon sx={{ color: "#0f172a" }} /> Add Product to Catalog
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={8}>
                          <TextField
                            label="Product Title"
                            value={prodTitle}
                            onChange={(e) => setProdTitle(e.target.value)}
                            required
                            fullWidth
                            placeholder="e.g. NVIDIA GeForce RTX 5090 32GB"
                            variant="outlined"
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <FormControl fullWidth required>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                              labelId="category-label"
                              value={prodCategory}
                              label="Category"
                              onChange={(e) => setProdCategory(e.target.value)}
                              sx={{ borderRadius: 2 }}
                            >
                              {["GPU", "CPU", "RAM", "Laptops", "Monitors", "ACCESSORIES"].map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Price (₹)"
                            type="number"
                            value={prodPrice}
                            onChange={(e) => setProdPrice(e.target.value)}
                            required
                            fullWidth
                            placeholder="e.g. 15000"
                            variant="outlined"
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel id="rating-label">Rating (1.0 to 5.0)</InputLabel>
                            <Select
                              labelId="rating-label"
                              value={prodRating}
                              label="Rating (1.0 to 5.0)"
                              onChange={(e) => setProdRating(e.target.value)}
                              sx={{ borderRadius: 2 }}
                            >
                              {["5.0", "4.9", "4.8", "4.7", "4.6", "4.5", "4.4", "4.3", "4.2", "4.1", "4.0", "3.5", "3.0"].map((r) => (
                                <MenuItem key={r} value={r}>{r} Stars</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            label="Product Description"
                            value={prodDescription}
                            onChange={(e) => setProdDescription(e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                            placeholder="Describe product details, key specifications, warranty..."
                            variant="outlined"
                            slotProps={{ input: { sx: { borderRadius: 2 } } }}
                          />
                        </Grid>

                        {/* Image selection and upload */}
                        <Grid item xs={12}>
                          <Card variant="outlined" sx={{ p: 2.5, borderRadius: 3, border: "1px dashed rgba(15, 23, 42, 0.4)", bgcolor: "#f8fafc" }}>
                            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                              <Grid item xs={12} md={7}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                                  Product Image
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 2 }}>
                                  Choose to upload a local image file (which will be converted to Base64) OR paste a remote direct image URL.
                                </Typography>

                                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
                                  <input 
                                    type="file" 
                                    ref={prodImageInputRef} 
                                    onChange={handleProductImageFile} 
                                    accept="image/*" 
                                    style={{ display: "none" }} 
                                  />
                                  <Button
                                    variant="outlined"
                                    onClick={() => prodImageInputRef.current?.click()}
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ 
                                      borderRadius: 2, 
                                      textTransform: "none", 
                                      color: "#0f172a", 
                                      borderColor: "#0f172a",
                                      "&:hover": { borderColor: "#1e293b", bgcolor: "rgba(15, 23, 42, 0.05)" }
                                    }}
                                  >
                                    Upload Image
                                  </Button>
                                </Box>

                                <TextField
                                  label="Or Enter Image URL"
                                  value={prodImage.startsWith("data:image") ? "Uploaded base64 file (" + prodImage.substring(0, 30) + "...)" : prodImage}
                                  onChange={(e) => setProdImage(e.target.value)}
                                  fullWidth
                                  placeholder="e.g. https://images.com/product.png"
                                  variant="outlined"
                                  slotProps={{ input: { sx: { borderRadius: 2 } } }}
                                />
                              </Grid>

                              <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
                                {prodImage ? (
                                  <Box sx={{ textAlign: "center" }}>
                                    <Box 
                                      component="img" 
                                      src={prodImage} 
                                      alt="Product preview"
                                      sx={{ 
                                        maxHeight: 120, 
                                        maxWidth: "100%", 
                                        borderRadius: 2, 
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)", 
                                        objectFit: "contain",
                                        bgcolor: "#f9f9f9",
                                        p: 1
                                      }}
                                    />
                                    <Button 
                                      size="small" 
                                      color="error" 
                                      onClick={() => setProdImage("")}
                                      sx={{ display: "block", mt: 1, mx: "auto", textTransform: "none", fontWeight: 700 }}
                                    >
                                      Remove
                                    </Button>
                                  </Box>
                                ) : (
                                  <Box sx={{ 
                                    width: 120, 
                                    height: 120, 
                                    borderRadius: 2, 
                                    bgcolor: "#f2f2f2", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center",
                                    border: "1px dashed #ccc"
                                  }}>
                                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                                      No Image
                                    </Typography>
                                  </Box>
                                )}
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 4 }} />
                      
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={submittingProduct}
                          startIcon={submittingProduct ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                          sx={{ 
                            bgcolor: "#0f172a", 
                            color: "white", 
                            borderRadius: "25px", 
                            px: 5, 
                            py: 1.5, 
                            fontWeight: 700, 
                            textTransform: "none",
                            boxShadow: "0 6px 16px rgba(15, 23, 42, 0.25)",
                            "&:hover": { bgcolor: "#1e293b" } 
                          }}
                        >
                          {submittingProduct ? "Creating Product..." : "Create Product"}
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* ADMIN TAB 3: SITE MEMBERS (Requirement 2.2) */}
                  {isAdmin && tabValue === 2 && (
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#111", display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                        <PeopleIcon sx={{ color: "#0f172a" }} /> Site Members Directory
                      </Typography>

                      {loadingMembers ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                          <CircularProgress sx={{ color: "#e65100" }} />
                        </Box>
                      ) : members.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 6 }}>
                          <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            No registered users found in the system.
                          </Typography>
                        </Box>
                      ) : (
                        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #e0e0e0", overflow: "hidden" }}>
                          <Table aria-label="site members directory table">
                            <TableHead sx={{ bgcolor: "#fafafa" }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)" }}>Avatar</TableCell>
                                <TableCell sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)" }}>Username</TableCell>
                                <TableCell sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)" }}>Full Name</TableCell>
                                <TableCell sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)" }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 800, fontFamily: "var(--font-montserrat)" }}>Joined</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {members.map((member) => (
                                <TableRow key={member.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                  <TableCell>
                                    <Avatar src={member.avatar || ""} sx={{ width: 36, height: 36, bgcolor: "#0f172a", color: "white", fontSize: "0.95rem", fontWeight: 700 }}>
                                      {!member.avatar && member.username ? member.username.charAt(0).toUpperCase() : ""}
                                    </Avatar>
                                  </TableCell>
                                  <TableCell sx={{ fontWeight: 700, color: member.email === "sajunpalraj2004@gmail.com" ? "#0f172a" : "inherit" }}>
                                    {member.username} {member.email === "sajunpalraj2004@gmail.com" && "(Admin)"}
                                  </TableCell>
                                  <TableCell>{member.email}</TableCell>
                                  <TableCell>{member.fullName || "—"}</TableCell>
                                  <TableCell>{member.phone || "—"}</TableCell>
                                  <TableCell>{member.createdAt ? new Date(member.createdAt).toLocaleDateString() : "—"}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>

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
            The total cost is <strong>₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>.<br /><br />
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
