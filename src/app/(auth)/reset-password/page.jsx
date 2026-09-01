"use client";

import React, { useState, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PasswordIcon from "@mui/icons-material/Password";

import { keyframes } from "@mui/system";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import loginBg from "@/assets/Dashboard/loginbg.jpg";
import loginavatar from "@/assets/Dashboard/Login-Avatar.png";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSignIn } from "@clerk/nextjs";

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

function ResetPasswordContent() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Field Error States
  const [codeError, setCodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  // Snackbar States
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showAlert = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // If no email is provided in the URL, send the user back to the forgot password page
  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleResendCode = async () => {
    if (!signIn || resending) return;
    setResending(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      showAlert("A new verification code has been sent to your email.", "success");
      setCodeVerified(false);
    } catch (err) {
      console.error("Resend code error:", err);
      showAlert("Failed to resend code. Please try again.", "error");
    } finally {
      setResending(false);
    }
  };

  const handleCheckCode = () => {
    if (!code || code.length < 6) {
      setCodeError(true);
      showAlert("Please enter a valid verification code.", "error");
      return;
    }
    setCodeError(false);
    setCodeVerified(true);
  };

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };
  const passwordStrength = getPasswordStrength(newPassword);

  const getStrengthColor = () => {
    if (passwordStrength === 1) return "#ff4d4f";
    if (passwordStrength === 2) return "#faad14";
    if (passwordStrength === 3) return "#52c41a";
    return "#e0e0e0";
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!signIn || loading) return;

    setCodeError(false);
    setPasswordError(false);
    setConfirmError(false);

    if (!code) {
      setCodeError(true);
      showAlert("Enter the verification code sent to your email.", "error");
      return;
    }

    if (!newPassword) {
      setPasswordError(true);
      showAlert("Enter a new password.", "error");
      return;
    }

    if (passwordStrength < 3) {
      setPasswordError(true);
      showAlert("Password does not meet all requirements.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmError(true);
      showAlert("Passwords do not match.", "error");
      return;
    }

    setLoading(true);
    try {
      // Verify the email code and set the new password in a single step
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code.trim(),
        password: newPassword,
      });

      if (result.status === "complete") {
        setSuccess(true);
        showAlert("Password reset successfully! Redirecting to login...", "success");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        showAlert(
          "Additional verification is required. Please try logging in with your new password.",
          "warning"
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Reset password error:", err);
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        err?.message ||
        "Invalid or expired code. Please try again.";
      showAlert(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
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
      {/* Back to Forgot Password Button */}
      <IconButton
        component={Link}
        href="/forgot-password"
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
        aria-label="back to forgot password"
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

      {/* Reset Password Card */}
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
        {success ? (
          <>
            {/* Success State */}
            <CheckCircleOutlinedIcon sx={{ fontSize: 72, color: "#2e7d32", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: 800,
                mb: 1,
                background: "linear-gradient(135deg, #2453d4 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "var(--font-montserrat)",
              }}
            >
              Password Updated!
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", color: "#666", fontWeight: 500, mb: 3 }}>
              Your password has been reset successfully. Redirecting you to the login page...
            </Typography>
            <CircularProgress size={28} sx={{ color: "#2453d4" }} />
          </>
        ) : (
          <>
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
              Reset Password
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
              Enter the code sent to <Box component="span" sx={{ color: "#2453d4ff", fontWeight: 700 }}>{email}</Box> and choose a new password.
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

            <Box component="form" onSubmit={handleResetPassword} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", px: { xs: 1, sm: 2 } }}>
              {/* Verification Code Field */}
              <TextField
                id="code"
                label="Verification Code"
                variant="outlined"
                fullWidth
                size="medium"
                value={code}
                error={codeError}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (codeError) setCodeError(false);
                }}
                disabled={codeVerified}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon sx={{ color: "rgba(36, 83, 212, 0.5)", mr: 0.5 }} />
                      </InputAdornment>
                    ),
                    endAdornment: !codeVerified ? (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleCheckCode}
                          sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            bgcolor: "#2453d4",
                            "&:hover": { bgcolor: "#1a3eb3" },
                            boxShadow: "none"
                          }}
                        >
                          Check
                        </Button>
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <CheckCircleOutlinedIcon color="success" />
                      </InputAdornment>
                    ),
                  }
                }}
                sx={inputSx}
              />

              {codeVerified && (
                <>
                  {/* New Password Field */}
              <TextField
                id="newPassword"
                label="New Password"
                variant="outlined"
                fullWidth
                size="medium"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                error={passwordError}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (passwordError) setPasswordError(false);
                }}
                sx={inputSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockResetIcon sx={{ color: "rgba(36, 83, 212, 0.5)", mr: 0.5 }} />
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
                  }
                }}
              />

              <Box sx={{ width: "100%", mt: -1, mb: 1 }}>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5 }}>
                  {[1, 2, 3].map((index) => (
                    <Box key={index} sx={{ height: 4, flex: 1, borderRadius: 1, bgcolor: passwordStrength >= index ? getStrengthColor() : '#e0e0e0', transition: 'all 0.3s' }} />
                  ))}
                </Box>
                <Typography variant="caption" sx={{ color: "#666", display: "block", fontFamily: "var(--font-montserrat)" }}>
                  Must contain: 8+ chars, 1 uppercase, 1 special character (@$!%*?&)
                </Typography>
              </Box>

              {/* Confirm Password Field */}
              <TextField
                id="confirmPassword"
                label="Confirm New Password"
                variant="outlined"
                fullWidth
                size="medium"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                error={confirmError || (confirmPassword.length > 0 && newPassword !== confirmPassword)}
                helperText={confirmPassword.length > 0 && newPassword !== confirmPassword ? "Passwords do not match" : ""}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmError) setConfirmError(false);
                }}
                sx={inputSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockResetIcon sx={{ color: "rgba(36, 83, 212, 0.5)", mr: 0.5 }} />
                      </InputAdornment>
                    ),
                  }
                }}
              />
              </>
              )}

              {/* Reset Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !signIn || !codeVerified || passwordStrength < 3 || newPassword !== confirmPassword}
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
                  },
                  "&.Mui-disabled": {
                    background: "#e0e0e0",
                    color: "#9e9e9e",
                    boxShadow: "none",
                    transform: "none",
                  }
                }}
              >
                {loading ? "Updating password..." : "Update Password"}
              </Button>

              {/* Resend Code */}
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                <Typography variant="body2" sx={{ color: "#555", fontSize: "0.85rem" }}>
                  Didn't receive the code?
                </Typography>
                <Box
                  component="button"
                  type="button"
                  onClick={handleResendCode}
                  disabled={resending}
                  sx={{
                    background: "none",
                    border: "none",
                    p: 0,
                    textDecoration: "none",
                    color: "#2453d4ff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: resending ? "wait" : "pointer",
                    transition: "color 0.2s ease",
                    ":hover": { color: "#1a3eb3" }
                  }}
                >
                  {resending ? "Resending..." : "Resend Code"}
                </Box>
              </Box>

              <Typography variant="body2" sx={{ textAlign: "center", mt: 1, color: "#555", fontSize: "0.85rem" }}>
                Wrong email? <Link href="/forgot-password" style={{ color: "#2453d4ff", fontWeight: 600, textDecoration: "none" }}>Start over</Link>
              </Typography>
            </Box>
          </>
        )}
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
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <CircularProgress size={50} thickness={4} sx={{ color: "#2453d4" }} />
        </Box>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
