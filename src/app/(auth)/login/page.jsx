"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { keyframes } from "@mui/system";
import Image from "next/image";

import loginBg from "@/assets/Dashboard/loginbg.jpg";
import loginavatar from "@/assets/Dashboard/Login-Avatar.png";
import Button from '@mui/material/Button';
import Link from "next/link";
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSignIn, useClerk, useUser } from "@clerk/nextjs";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// Define smooth zoom animation
const backgroundZoom = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
`;

const LoginPage = () => {
  const { signIn } = useSignIn();
  const { setActive } = useClerk();
  const { isSignedIn } = useUser();
  const isLoaded = signIn !== null;

  useEffect(() => {
    if (isSignedIn) {
      window.location.href = "/";
    }
  }, [isSignedIn]);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Field Error States
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Snackbar States
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showAlert = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleLogin = async () => {
    console.log("handleGoogleLogin clicked. isLoaded:", isLoaded);
    if (!isLoaded) {
      console.warn("Clerk is not fully loaded yet.");
      return;
    }
    try {
      const { error } = await signIn.sso({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectCallbackUrl: "/sso-callback",
        oidcPrompt: "select_account",
      });
      if (error) {
        console.error("Clerk Google Login Error:", error);
        showAlert(error.longMessage || "Failed to initialize Google login.", "error");
      }
    } catch (err) {
      console.error("Clerk Google Login Error:", err);
      showAlert("Failed to initialize Google login.", "error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isLoaded || loading) return;

    setEmailError(false);
    setPasswordError(false);

    if (!email) {
      setEmailError(true);
      showAlert("Enter your email address.", "error");
      return;
    }

    // Google-like email verification format condition
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      showAlert("Enter a valid email address.", "error");
      return;
    }

    if (!password) {
      setPasswordError(true);
      showAlert("Enter a password", "error");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn.password({
        identifier: email.trim(),
        password: password,
      });

      if (error) {
        showAlert(error.longMessage || error.message || "Invalid email or password.", "error");
        return;
      }

      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        showAlert(finalizeError.longMessage || "Secondary verification factor required.", "warning");
        return;
      }

      showAlert("Login successful! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.error("Login unexpected error:", err);
      showAlert("An unexpected error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      {/* Back to Home Button */}
      <IconButton
        component={Link}
        href="/"
        sx={{
          position: "absolute",
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          zIndex: 10,
          color: "white",
          bgcolor: "rgba(36, 83, 212, 0.85)",
          backdropFilter: "blur(4px)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "#1a3eb3",
            transform: "translateX(-3px)",
            boxShadow: "0px 6px 15px rgba(36, 83, 212, 0.4)"
          }
        }}
        aria-label="back to home"
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <Image
          src={loginBg}
          alt="Login Background"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            animation: `${backgroundZoom} 25s ease-in-out infinite`,
            transformOrigin: "center center",
          }}
        />
      </Box>

      {/* Glow Overlay */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at center, rgba(25, 118, 210, 0.08), transparent 70%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Login Card */}
      <Box
        sx={{
          ml: { xs: 0, md: "8%", lg: "10%" },
          width: { xs: "90%", sm: "60%", md: "45%", lg: "35%" },
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(36, 83, 212, 0.05)",
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          p: { xs: 3, sm: 4, md: 4.5 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: 800,
            mb: 0.5,
            fontSize: { xs: "2.1rem", sm: "2.4rem", md: "2.8rem" },
            background: "linear-gradient(135deg, #2453d4 0%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          Login
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#666",
            fontWeight: 500,
            mb: 2.5,
            fontFamily: "var(--font-montserrat)",
          }}
        >
          Welcome back, Tech Explorer!
        </Typography>

        <Avatar
          src={loginavatar.src}
          alt="Login Avatar"
          sx={{
            width: { xs: 60, sm: 70 },
            height: { xs: 60, sm: 70 },
            mb: 3,
            border: "3px solid #2453d4ff",
            bgcolor: 'white',
            boxShadow: "0px 8px 16px rgba(36, 83, 212, 0.15)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.08) rotate(3deg)",
            }
          }}
        />

        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", px: { xs: 1, sm: 2 } }}>
          {/* Email Field */}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            size="medium"
            type="email"
            value={email}
            error={emailError}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(false);
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailRoundedIcon sx={{ color: "rgba(36, 83, 212, 0.5)", mr: 0.5 }} />
                  </InputAdornment>
                ),
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(36, 83, 212, 0.02)",
                transition: "all 0.3s ease",
                "& fieldset": { borderColor: "rgba(36, 83, 212, 0.15)" },
                "&:hover fieldset": { borderColor: "rgba(36, 83, 212, 0.4)" },
                "&.Mui-focused": {
                  backgroundColor: "#fff",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(36, 83, 212, 0.06)",
                },
                "&.Mui-focused fieldset": { borderColor: "#2453d4ff", borderWidth: "2px" },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                fontFamily: "var(--font-montserrat)",
                "&.Mui-focused": { color: "#2453d4ff" }
              }
            }}
          />

          {/* Password Field */}
          <TextField
            id="password"
            label="Enter your password"
            variant="outlined"
            fullWidth
            size="medium"
            type={showPassword ? "text" : "password"}
            value={password}
            error={passwordError}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(false);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(36, 83, 212, 0.02)",
                transition: "all 0.3s ease",
                "& fieldset": { borderColor: "rgba(36, 83, 212, 0.15)" },
                "&:hover fieldset": { borderColor: "rgba(36, 83, 212, 0.4)" },
                "&.Mui-focused": {
                  backgroundColor: "#fff",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(36, 83, 212, 0.06)",
                },
                "&.Mui-focused fieldset": { borderColor: "#2453d4ff", borderWidth: "2px" },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                fontFamily: "var(--font-montserrat)",
                "&.Mui-focused": { color: "#2453d4ff" }
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon sx={{ color: "rgba(36, 83, 212, 0.5)", mr: 0.5 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Forgot Password Link */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 0.25 }}>
            <Box
              component={'a'}
              sx={{
                textDecoration: 'none',
                color: '#2453d4ff',
                fontWeight: 600,
                fontSize: "0.85rem",
                transition: "color 0.2s ease",
                ":hover": { color: '#1a3eb3', cursor: 'pointer' }
              }}
              href="/forgot-password"
            >
              Forgot Password?
            </Box>
          </Box>

          {/* Buttons & Links */}
          <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            
            {/* CAPTCHA placed on top of Login button */}
            <Box 
              id="clerk-captcha" 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                width: '100%', 
                '&:empty': { display: 'none' }, 
                '& > iframe': { margin: '0 auto' },
                mb: 2 
              }} 
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading || !isLoaded}
              sx={{
                background: "linear-gradient(135deg, #2453d4 0%, #4f46e5 100%)",
                color: 'white',
                borderRadius: '25px',
                py: 1.25,
                width: '100%',
                fontWeight: 600,
                fontSize: "0.95rem",
                textTransform: "none",
                boxShadow: "0px 6px 16px rgba(36, 83, 212, 0.25)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                ":hover": {
                  background: "linear-gradient(135deg, #1a3eb3 0%, #3b37c7 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 10px 22px rgba(36, 83, 212, 0.45)",
                },
                ":active": {
                  transform: "translateY(0px)",
                }
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Divider sx={{ my: 2, width: '100%', color: '#666', fontSize: '0.8rem' }}>or</Divider>

            <Button
              variant="outlined"
              onClick={handleGoogleLogin}
              disabled={loading || !isLoaded}
              startIcon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>}
              sx={{
                borderRadius: '25px',
                py: 1.1,
                width: '100%',
                fontWeight: 600,
                textTransform: 'none',
                color: '#333',
                borderColor: '#ccc',
                fontSize: "0.9rem",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.04)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderColor: '#2453d4ff',
                  bgcolor: 'rgba(36, 83, 212, 0.04)',
                  transform: "translateY(-1px)",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
                },
                "&:active": {
                  transform: "translateY(0px)",
                }
              }}
            >
              Continue with Google
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2.5, color: '#555', fontSize: '0.85rem' }}>
              New here? <Link href="/register" style={{ color: '#2453d4ff', fontWeight: 600, textDecoration: 'none' }}>Register</Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Snackbar Alert in bottom-center */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%", borderRadius: 2, fontWeight: 600 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;