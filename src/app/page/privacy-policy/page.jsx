"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import ShieldIcon from "@mui/icons-material/Shield";
import LockIcon from "@mui/icons-material/Lock";
import EyeIcon from "@mui/icons-material/Visibility";

export default function PrivacyPolicyPage() {
  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: { xs: 6, md: 10 }, fontFamily: "var(--font-montserrat)" }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 5, border: "1px solid #e2e8f0" }}>
          
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box sx={{ width: 50, height: 50, borderRadius: "50%", bgcolor: "rgba(36, 83, 212, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShieldIcon sx={{ color: "#2453d4", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>
                Privacy Policy
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                Last updated: June 16, 2026
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Clauses */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#2453d4", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <LockIcon fontSize="small" /> 1. Data Collection & Security
              </Typography>
              <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8 }}>
                We collect personal information such as name, email address, shipping details, and phone number when you register an account or purchase products. All credentials and payment details are securely processed via standard OAuth providers (Clerk and Google) and stored in encrypted databases.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#2453d4", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <EyeIcon fontSize="small" /> 2. Data Usage & Cookies
              </Typography>
              <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8 }}>
                We use cookies and localStorage to personalize your browsing experience and store local states, such as active shopping carts. We will never sell, lease, or distribute your email or personal information to third-party advertisers.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#2453d4", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <ShieldIcon fontSize="small" /> 3. Your Privacy Controls
              </Typography>
              <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8 }}>
                You have the full right to access, update, or delete your account records directly from your user dashboard at any time. For questions regarding security protocols or deletion requests, please contact us.
              </Typography>
            </Box>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}
