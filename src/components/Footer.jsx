"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from "@/assets/logo.png";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import IconButton from '@mui/material/IconButton';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import LinkIcon from '@mui/icons-material/Link';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setSnackbar({ open: true, message: 'Please enter your email address.', severity: 'warning' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbar({ open: true, message: 'Please enter a valid email address.', severity: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/API/subscribe', { email });
      setSnackbar({
        open: true,
        message: response.data.message || 'Thank you for subscribing!',
        severity: 'success'
      });
      setEmail('');
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Something went wrong. Please try again.';
      setSnackbar({
        open: true,
        message: errMsg,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', width: "100%", bgcolor: 'black', gap: 5, pt: 5, px: { xs: 2, md: 0 },borderTop: { xs: 'none', md: '1.5px solid #2453d4ff' } }}>
        
        <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, justifyContent: "space-evenly", alignItems: 'center', width: "100%", gap: { xs: 4, md: 0 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', width: { xs: "90%", md: "40%" }, height: { xs: 'auto', sm: "80px" }, gap: { xs: 2, sm: 0 } }}>
            <Typography variant="h5" sx={{ color: 'white', width: '100%', textAlign: { xs: 'center', sm: 'left' }, mb: { xs: 1, sm: 0 } }}>
              Sign up to Newsletter
            </Typography>
            
            <Box component="form" onSubmit={handleSubscribe} sx={{ width: '100%' }}>
              <TextField
                id="outlined-basic"
                placeholder='Email Address'
                variant="outlined"
                fullWidth={true}
                margin="none"
                size="medium"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          disabled={loading}
                          sx={{ color: 'white', '&:hover': { color: '#2453d4ff' } }}
                          aria-label="subscribe"
                        >
                          {loading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                          ) : (
                            <MailOutlinedIcon fontSize='large' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: 'white',
                    '&.Mui-focused': {
                      color: '#2453d4ff',
                    },
                  },
                  
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: '#2453d4ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2453d4ff',
                    },
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: 'white' }}>Follow Us On:</Typography>
            
            <ButtonGroup variant="text" color="primary" aria-label="Button-Group" >
              <Button><FacebookIcon sx={{ color: 'white', "&:hover": { color: '#2453d4ff' } }} /></Button>
              <Button><InstagramIcon sx={{ color: 'white', "&:hover": { color: '#2453d4ff' } }} /></Button>
              <Button><XIcon sx={{ color: 'white', "&:hover": { color: '#2453d4ff' } }} /></Button>
              <Button><LinkedInIcon sx={{ color: 'white', "&:hover": { color: '#2453d4ff' } }} /></Button>
            </ButtonGroup>
          </Box>
        </Box>
        
        <hr style={{ width: '95%', height: '0.006px', backgroundColor: 'gray' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: "space-evenly", alignItems: { xs: 'center', md: 'flex-start' }, width: '100%', gap: { xs: 4, md: 0 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' } }}>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, color: "white" }}>
              <PrivacyTipIcon fontSize='large'/> Policies
            </Typography>
            
            <br/>
            
            <Link href="/page/returns-and-exchanges" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer', textAlign: { xs: 'center', md: 'right' } }}>
                Returns & Exchanges
              </Typography>
            </Link>
            <Link href="/page/terms-and-condition" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer', textAlign: { xs: 'center', md: 'right' } }}>
                Terms Of Use
              </Typography>
            </Link>
            <Link href="/page/privacy-policy" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer', textAlign: { xs: 'center', md: 'right' } }}>
                Privacy Policy
              </Typography>
            </Link>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, color: "white", ":hover": { color: "white" } }}>
              <DeveloperModeIcon color='white'/> Get Involved
            </Typography>
            
            <br />
            
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>Home</Typography>
            </Link>
            <Link href="/page/about" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>About Us</Typography>
            </Link>
            <Link href="/page/contact-us" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>Contact Us</Typography>
            </Link>
          </Box>
          
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, color: "white", ":hover": { color: "white" } }}>
                  <LinkIcon/> Quick Links
                </Typography>
                
                <br/>
                
                <Link href="/products" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>Products</Typography>
                </Link>
                <Link href="/products?category=Laptops" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>Laptops</Typography>
                </Link>
                <Link href="/products?category=RAM" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>RAM</Typography>
                </Link>
                <Link href="/products?category=CPU" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>CPU</Typography>
                </Link>
                <Link href="/products?category=GPU" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>GPU</Typography>
                </Link>
                <Link href="/products?category=Monitors" style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" sx={{ color: "GrayText", "&:hover": { color: "white" }, cursor: 'pointer' }}>Monitors</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <hr style={{ width: '75%', height: '0.01px', backgroundColor: 'white' }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: "center", justifyContent: "space-between", width: { xs: '90%', md: '75%' }, gap: { xs: 3, md: 0 }, pb: 5 }}>
          <Link href="/">
            <Box component={'img'} src={logo.src} height="100px" width="auto" sx={{ borderRadius: 10, cursor: 'pointer' }} />
          </Link>
          <Typography sx={{ color: 'white', fontSize: { xs: '15px', md: '18px' }, textAlign: 'center' }}>
            © {new Date().getFullYear()} SajunPalraj, All Rights Reserved
          </Typography>

          <Box>
            <Box sx={{ mb: 3, display: { xs: 'none', sm: 'block' }, alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                  <SupportAgentIcon sx={{ fontSize: "50px", color: 'white' }} />
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
                    <Link href="tel:+0080123456789" style={{ textDecoration: 'none' }}>
                      <Typography variant="h6" component="div" sx={{ color: "white", '&:hover': { color: '#2453d4' } }}>
                        + 0080 1234 56 789
                      </Typography>
                    </Link>
                    <Link href="mailto:Sajunpalraj2004@gmail.com" style={{ textDecoration: 'none' }}>
                      <Typography variant="h6" component="div" sx={{ fontSize: '12px', color: "white", '&:hover': { color: '#2453d4' } }}>
                        Sajunpalraj2004@gmail.com
                      </Typography>
                    </Link>
                  </Box>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%', borderRadius: 2, fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
