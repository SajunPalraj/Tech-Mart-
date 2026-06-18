"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function SSOCallback() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80vh", gap: 2 }}>
      <CircularProgress size={50} sx={{ color: "#2453d4" }} />
      <AuthenticateWithRedirectCallback
        signInUrl="/login"
        signUpUrl="/register"
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
      />
    </Box>
  );
}
