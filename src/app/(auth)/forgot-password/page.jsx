"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import LockResetIcon from "@mui/icons-material/LockReset";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { keyframes } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import loginBg from "@/assets/Dashboard/loginbg.jpg";
import loginavatar from "@/assets/Dashboard/Login-Avatar.png";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSignIn, useUser } from "@clerk/nextjs";

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

const ForgotPasswordPage = () => {
  const { signIn } = useSignIn();
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      window.location.href = "/";
    }
  }, [isSignedIn]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Snackbar States
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showAlert = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!signIn || loading) return;

    setEmailError(false);

    if (!email) {
      setEmailError(true);
      showAlert("Enter your email address.", "error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      showAlert("Enter a valid email address.", "error");
      return;
    }

    setLoading(true);
    try {
      // Initiate the Clerk password reset via email code strategy
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email.trim(),
      });

      showAlert("Verification code sent to your email!", "success");

      // Move to the reset area page where the user enters the code & new password
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email.trim())}`);
      }, 800);
    } catch (err) {
      console.error("Forgot password error:", err);
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Failed to send reset code. Please try again.";
      showAlert(msg, "error");
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
      {/* Back to Login Button */}
      <IconButton
        component={Link}
        href="/login"
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
        aria-label="back to login"
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Animated Background */}
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
          alt="Background"
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

      {/* Forgot Password Card */}
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
            fontSize: { xs: "2rem", sm: "2.2rem", md: "2.5rem" },
            background: "linear-gradient(135deg, #2453d4 0%, #6366f1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          Forgot Password?
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
          No worries, we'll send you a reset code!
        </Typography>

        <Avatar
          src={loginavatar.src}
          alt="Account Avatar"
          sx={{
            width: { xs: 60, sm: 70 },
            height: { xs: 60, sm: 70 },
            mb: 3,
            border: "3px solid #2453d4ff",
            bgcolor: "white",
            boxShadow: "0px 8px 16px rgba(36, 83, 212, 0.15)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.08) rotate(3deg)",
            }
          }}
        >
          <LockResetIcon sx={{ fontSize: 34, color: "#2453d4" }} />
        </Avatar>

        <Box component="form" onSubmit={handleContinue} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", px: { xs: 1, sm: 2 } }}>
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

          {/* Continue Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !signIn}
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: "linear-gradient(135deg, #2453d4 0%, #4f46e5 100%)",
              color: "white",
              borderRadius: "25px",
              py: 1.25,
              width: "100%",
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
            {loading ? "Sending code..." : "Send Reset Code"}
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5, color: "#555", fontSize: "0.85rem" }}>
            Remembered it? <Link href="/login" style={{ color: "#2453d4ff", fontWeight: 600, textDecoration: "none" }}>Back to Login</Link>
          </Typography>
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

export default ForgotPasswordPage;
