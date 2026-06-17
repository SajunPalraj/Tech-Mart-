"use client";

import Box from '@mui/material/Box';
import React, { useState } from 'react'
import logo from '@/assets/logo.png'
import Typography from '@mui/material/Typography';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";

// Material UI new imports
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

// Context imports
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navItems = [
  'Home',
  'Products',
  'About',
  'Contact Us',
  'Terms and Condition'
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileItem, setActiveMobileItem] = useState('Home');

  // Search input state
  const [navbarSearch, setNavbarSearch] = useState("");

  // Context hook calls
  const { user, logout } = useAuth();
  const { cartCount, cartTotal } = useCart();
  const { wishlistCount } = useWishlist();

  const isAdmin = user?.email === "sajunpalraj2004@gmail.com";

  // Desktop user menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    await logout();
    handleUserMenuClose();
    window.location.href = "/";
  };

  const pathname = usePathname();
  const router = useRouter();

  if (
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuSelect = (item) => {
    setActiveMobileItem(item);
    setMobileMenuOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen((prev) => !prev);
  };

  const handleMobileSearchClose = () => {
    setMobileSearchOpen(false);
  };

  // Search form submit handler
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (navbarSearch.trim() !== "") {
      router.push(`/products?search=${encodeURIComponent(navbarSearch)}`);
      setNavbarSearch(""); // reset navbar input after search
      setMobileSearchOpen(false);
    }
  };

  return (
    <>
    <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 1300, bgcolor: 'white', display: { xs: "none", sm: 'block' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', px: { xs: 2, sm: 4, md: 6 } }}>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 3, justifyContent: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box component="img" src={logo.src} alt="logo" sx={{height:{lg:150,md:150,sm:75}, cursor: 'pointer'}} />
          </Link>
          {navItems.map((item, index) => {
            const targetHref = item === "Home" 
              ? "/" 
              : item === "Products" 
                ? "/products" 
                : `/page/${item.toLowerCase().replace(/\s+/g, '-')}`;
            const isActive = pathname === targetHref;
            return (
              <Link 
                key={index} 
                href={targetHref}
                style={{ textDecoration: 'none' }}
              >
                <Button 
                  sx={{ 
                    color: isActive ? '#2453d4' : 'black', 
                    textTransform: 'none',
                    "&:hover": { backgroundColor: "transparent" }
                  }}
                  disableRipple
                >
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontWeight: 'bold', 
                      fontSize: { lg: 15, md: 14, sm: 12 },
                      color: isActive ? '#2453d4' : 'inherit',
                      "&:hover": { color: '#2453d4', cursor: 'pointer' }
                    }}
                  >
                    {item}
                  </Typography>
                </Button>
              </Link>
            );
          })}
        </Box>

        <Box sx={{mb:3, display: { xs: 'none', sm: 'block' }, alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%',display: 'flex', alignItems: 'center',justifyContent:"space-evenly", gap: 2 }}>
            <IconButton  sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
              <SupportAgentIcon sx={{ fontSize: "50px" }} />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
            <Typography variant="h6" component="div">
              + 0080 1234 56 789 
            </Typography>
            <Typography variant="h6" component="div" sx={{fontSize: '12px'}}>
               Sajunpalraj2004@gmail.com
            </Typography>
          </Box>
          </IconButton>
          </Box>
        </Box>
      </Box>

  
          <Box sx={{ width: '100%', maxWidth: '100%', position: 'relative', boxSizing: 'border-box', bgcolor: '#2453d4ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1.5, px: 2, flexWrap: 'wrap' }}>
              <ClickAwayListener onClickAway={handleMenuClose}>
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'white', gap: 1.25, minWidth: 180 }}>
                <IconButton onClick={handleMenuToggle} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' }, color: 'white', p: 1.1, borderRadius: 2 }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{display:{ xs: 'none', sm: 'block' }, fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleMenuToggle}>
                  Shop by Category
                </Typography>
                <Box sx={{ 
                  display: menuOpen ? 'block' : 'none', 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  mt: 1.5, 
                  width: 240, 
                  bgcolor: 'white', 
                  borderRadius: 3, 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  zIndex: 20 
                }}>
                  {[
                    {name:'Monitors', icon: <MonitorOutlinedIcon fontSize="small" />, query: "Monitors"}, 
                    {name:'Laptops', icon: <LaptopMacOutlinedIcon fontSize="small" />, query: "Laptops"}, 
                    {name:'CPU', icon: <MemoryOutlinedIcon fontSize="small" />, query: "CPU"}, 
                    {name:'Graphics Card', icon: <MemoryOutlinedIcon fontSize="small" />, query: "GPU"}, 
                    {name:'Other Accessories', icon: <AccountTreeOutlinedIcon fontSize="small" />, query: "ACCESSORIES"}
                  ].map((item, index) => (
                    <Link 
                      key={index} 
                      href={`/products?category=${encodeURIComponent(item.query)}`}
                      style={{ textDecoration: 'none' }}
                      onClick={handleMenuClose}
                    >
                      <Box sx={{ 
                        px: 2.5, 
                        py: 1.75, 
                        fontSize: 14,
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 700, 
                        color: '#334155',
                        bgcolor: 'white',
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: index === 4 ? "none" : "1px solid #f1f5f9",
                        transition: "all 0.2s ease",
                        "& svg": { color: "#64748b", transition: "color 0.2s ease" },
                        '&:hover': { 
                          bgcolor: 'rgba(36, 83, 212, 0.05)',
                          color: '#2453d4',
                          "& svg": { color: "#2453d4" }
                        }, 
                        cursor: 'pointer'
                      }}>
                        {item.name}
                        {item.icon}
                      </Box>
                    </Link>
                  ))}
                </Box>
              </Box>
            </ClickAwayListener>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 280 }}>
              <Box 
                component="form" 
                onSubmit={handleSearchSubmit}
                sx={{ display: {xs: 'none', sm: 'flex'}, alignItems: 'center', width: '100%', maxWidth: 620, bgcolor: 'white', borderRadius: '999px', px: 2, py: 0.9, boxShadow: '0 10px 24px rgba(0,0,0,0.08)' }}
              >
                <InputBase 
                  fullWidth 
                  value={navbarSearch}
                  onChange={(e) => setNavbarSearch(e.target.value)}
                  placeholder="Type to search tech products..." 
                  sx={{ fontSize: 14, color: '#333' }} 
                />
                <IconButton type="submit" sx={{ color: '#2453d4', p: 1.25 }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.25, color: 'white', minWidth: 180, justifyContent: 'space-around' }}>
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
                <IconButton onClick={handleMobileSearchToggle} sx={{ color: 'white', p: 1.1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' } }}>
                  <SearchIcon />
                </IconButton>
              </Box>
              {user ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', transition: 'transform 120ms ease', '&:active': { transform: 'scale(0.92)' } }}>
                    <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                      <Avatar src={user.avatar || ""} sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.16)', border: '2px solid white', color: 'white', fontWeight: 'bold', fontFamily: 'var(--font-montserrat)' }}>
                        {!user.avatar && user.username ? user.username.charAt(0).toUpperCase() : <PersonIcon />}
                      </Avatar>
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    slotProps={{
                      paper: {
                        sx: {
                          mt: 1.5,
                          boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                          borderRadius: '12px',
                          minWidth: 180,
                          overflow: 'visible',
                          '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        }
                      }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, fontFamily: 'var(--font-montserrat)' }}>
                        {user.fullName || user.username}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'var(--font-montserrat)' }}>
                        {user.email}
                      </Typography>
                    </Box>
                    <MenuItem component={Link} href="/profile" onClick={handleUserMenuClose} sx={{ py: 1.25, px: 2, fontSize: '14px', fontFamily: 'var(--font-montserrat)', fontWeight: 600, '&:hover': { bgcolor: 'rgba(36, 83, 212, 0.08)' } }}>
                      {isAdmin ? "Admin Dashboard" : "My Profile"}
                    </MenuItem>
                    {!isAdmin ? (
                      <MenuItem component={Link} href="/profile?tab=cart" onClick={handleUserMenuClose} sx={{ py: 1.25, px: 2, fontSize: '14px', fontFamily: 'var(--font-montserrat)', fontWeight: 600, '&:hover': { bgcolor: 'rgba(36, 83, 212, 0.08)' } }}>
                        My Cart
                      </MenuItem>
                    ) : (
                      <MenuItem component={Link} href="/profile?tab=add-product" onClick={handleUserMenuClose} sx={{ py: 1.25, px: 2, fontSize: '14px', fontFamily: 'var(--font-montserrat)', fontWeight: 600, '&:hover': { bgcolor: 'rgba(36, 83, 212, 0.08)' } }}>
                        Add Product
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout} sx={{ py: 1.25, px: 2, fontSize: '14px', color: 'error.main', fontFamily: 'var(--font-montserrat)', fontWeight: 600, '&:hover': { bgcolor: 'error.light', color: 'error.contrastText' } }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link style={{color:"white"}} href="/login">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.16)', cursor: 'pointer', transition: 'transform 120ms ease, background-color 120ms ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.24)' }, '&:active': { transform: 'scale(0.92)' } }}>
                    <PersonIcon />
                  </Box>
                </Link>
              )}
              <Link style={{color:"white", textDecoration:"none"}} href="/wishlist">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.16)', position: 'relative', cursor: 'pointer', transition: 'transform 120ms ease, background-color 120ms ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.24)' }, '&:active': { transform: 'scale(0.92)' } }}>
                  <FavoriteBorderIcon />
                  {wishlistCount > 0 && (
                    <Box sx={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', bgcolor: '#e91e63', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}>
                      {wishlistCount}
                    </Box>
                  )}
                </Box>
              </Link>
              {!isAdmin && (
                <>
                  <Link style={{color:"white", textDecoration:"none"}} href="/profile?tab=cart">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.16)', position: 'relative', cursor: 'pointer', transition: 'transform 120ms ease, background-color 120ms ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.24)' }, '&:active': { transform: 'scale(0.92)' } }}>
                      <ShoppingCartCheckoutIcon />
                      {cartCount > 0 && (
                        <Box sx={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', bgcolor: '#ff3d00', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'var(--font-montserrat)', fontWeight: 800 }}>
                          {cartCount}
                        </Box>
                      )}
                    </Box>
                  </Link>
                  <Typography variant="h6" component="div" sx={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'var(--font-montserrat)' }}>
                    ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                  </Typography>
                </>
              )}
            </Box>
          </Box>


      </Box>


      {/* mobile nav  */}
      <Box sx={{ display: { xs: 'block', sm: 'none' }, position: 'sticky', top: 0, zIndex: 1300, bgcolor: 'white' }}>
          <AppBar position="static" elevation={0} color='transparent' sx={{ backgroundColor: 'transparent' }}>
            <Toolbar sx={{ px: 2 }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Box component="img" src={logo.src} alt="logo" height="75" sx={{ cursor: 'pointer' }} />
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, ml: 'auto' }}>
                <IconButton onClick={handleMobileSearchToggle} sx={{ color: 'black', borderRadius: 2, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                  <SearchIcon />
                </IconButton>
                {!isAdmin && (
                  <IconButton component={Link} href="/profile?tab=cart" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', color: 'black' }}>
                    <Badge badgeContent={cartCount} color="error">
                      <ShoppingCartCheckoutIcon />
                    </Badge>
                  </IconButton>
                )}
                <IconButton onClick={handleMobileMenuToggle} sx={{ color: 'black', borderRadius: 2, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </Box>
            </Toolbar>
            <Box 
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{ display: { xs: mobileSearchOpen ? 'flex' : 'none', sm: 'none' }, width: '100%', bgcolor: '#000', color: 'white', alignItems: 'center', px: 2, py: 1.5, gap: 2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', bgcolor: '#111', borderRadius: '999px', px: 2, py: 1 }}>
                <SearchIcon sx={{ color: 'white', mr: 1 }} />
                <InputBase 
                  fullWidth 
                  value={navbarSearch}
                  onChange={(e) => setNavbarSearch(e.target.value)}
                  placeholder="Type your search here..." 
                  sx={{ fontSize: 14, color: 'white' }} 
                />
              </Box>
              <IconButton onClick={handleMobileSearchClose} sx={{ color: 'white', p: 1.25 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </AppBar>
          <Box sx={{
            position: 'absolute',
            top: 72,
            left: 0,
            right: 0,
            height: '100vh',
            bgcolor: 'rgba(255,255,255,0.98)',
            display: mobileMenuOpen ? 'block' : 'none',
            zIndex: 1200,
            overflowY: 'auto',
            pt: 2,
            px: 2,
            transition: 'opacity 240ms ease, transform 240ms ease',
            opacity: mobileMenuOpen ? 1 : 0,
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
          }}>
            {navItems.map((item, index) => {
              const targetHref = item === "Home" 
                ? "/" 
                : item === "Products" 
                  ? "/products" 
                  : `/page/${item.toLowerCase().replace(/\s+/g, '-')}`;
              const isActive = pathname === targetHref;
              return (
                <Link
                  key={index}
                  href={targetHref}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    onClick={() => handleMobileMenuSelect(item)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textDecoration: 'none',
                      color: isActive ? '#2453d4' : '#111',
                      fontWeight: isActive ? 'bold' : 500,
                      px: 2,
                      py: 2,
                      borderRadius: 2,
                      mb: 1,
                      transition: 'background-color 180ms ease, color 180ms ease, transform 180ms easein easeout',
                      '&:hover': {
                        backgroundColor: 'rgba(36, 83, 212, 0.08)',
                        color: '#2453d4',
                        fontWeight: 'bold',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: 16 }}>
                      {item}
                    </Typography>
                    <Box sx={{ color: 'inherit', fontSize: 18 }}>&rsaquo;</Box>
                  </Box>
                </Link>
              );
            })}

            {/* Mobile Auth options */}
            {user ? (
              <>
                <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.08)', my: 2, pt: 2 }} />
                
                <Link href="/profile" style={{ textDecoration: 'none' }}>
                  <Box
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: pathname === '/profile' ? '#2453d4' : '#111',
                      fontWeight: pathname === '/profile' ? 'bold' : 500,
                      px: 2, py: 2, borderRadius: 2, mb: 1,
                      '&:hover': { backgroundColor: 'rgba(36, 83, 212, 0.08)', color: '#2453d4' },
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: 16 }}>
                      {isAdmin ? "Admin Dashboard" : `My Profile (${user.fullName || user.username})`}
                    </Typography>
                    <Box sx={{ color: 'inherit', fontSize: 18 }}>&rsaquo;</Box>
                  </Box>
                </Link>

                {!isAdmin ? (
                  <Link href="/profile?tab=cart" style={{ textDecoration: 'none' }}>
                    <Box
                      onClick={() => setMobileMenuOpen(false)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#111',
                        fontWeight: 500,
                        px: 2, py: 2, borderRadius: 2, mb: 1,
                        '&:hover': { backgroundColor: 'rgba(36, 83, 212, 0.08)', color: '#2453d4' },
                      }}
                    >
                      <Typography variant="body1" sx={{ fontSize: 16 }}>
                        My Cart ({cartCount} items)
                      </Typography>
                      <Box sx={{ color: 'inherit', fontSize: 18 }}>&rsaquo;</Box>
                    </Box>
                  </Link>
                ) : (
                  <Link href="/profile?tab=add-product" style={{ textDecoration: 'none' }}>
                    <Box
                      onClick={() => setMobileMenuOpen(false)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#111',
                        fontWeight: 500,
                        px: 2, py: 2, borderRadius: 2, mb: 1,
                        '&:hover': { backgroundColor: 'rgba(36, 83, 212, 0.08)', color: '#2453d4' },
                      }}
                    >
                      <Typography variant="body1" sx={{ fontSize: 16 }}>
                        Add Product
                      </Typography>
                      <Box sx={{ color: 'inherit', fontSize: 18 }}>&rsaquo;</Box>
                    </Box>
                  </Link>
                )}

                <Box
                  onClick={handleLogout}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'error.main',
                    fontWeight: 'bold',
                    px: 2, py: 2, borderRadius: 2, cursor: 'pointer',
                    '&:hover': { backgroundColor: 'error.light', color: 'error.contrastText' },
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: 16 }}>
                    Logout
                  </Typography>
                  <Box sx={{ color: 'inherit', fontSize: 18 }}>&rsaquo;</Box>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.08)', my: 2, pt: 2 }} />
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Box
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: '#2453d4',
                      fontWeight: 'bold',
                      px: 2, py: 2, borderRadius: 2,
                      backgroundColor: 'rgba(36, 83, 212, 0.08)',
                      '&:hover': { backgroundColor: '#2453d4', color: 'white' },
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: 16 }}>
                      Login / Sign In
                    </Typography>
                    <Box sx={{ color: 'inherit', fontSize: 18 }}>&rsaquo;</Box>
                  </Box>
                </Link>
              </>
            )}
          </Box>
        </Box>
    </>
  )
}

export default Navbar;
