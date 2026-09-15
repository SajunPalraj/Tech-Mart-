"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import InfoIcon from "@mui/icons-material/Info";

export default function ReturnsAndExchangesPage() {
  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: { xs: 6, md: 10 }, fontFamily: "var(--font-montserrat)" }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 5, border: "1px solid #e2e8f0" }}>
          
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box sx={{ width: 50, height: 50, borderRadius: "50%", bgcolor: "rgba(36, 83, 212, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AssignmentReturnIcon sx={{ color: "#2453d4", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>
                Returns & Exchanges
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                Last updated: June 16, 2026
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Policy Clauses */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#2453d4", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <AssignmentReturnIcon fontSize="small" /> 1. Return Window & Eligibility
              </Typography>
              <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8 }}>
                We support returns on standard product orders within 30 days of the delivery date. Items must be returned in their original packaging, unused, and showing no visible wear or physical damage. Custom builds or software items are non-refundable.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#2453d4", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <LocalShippingIcon fontSize="small" /> 2. Return Shipments
              </Typography>
              <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8 }}>
                To file a return, please open a ticket with Support. Once approved, you will receive a shipping label. Return shipping costs are free for order defects or shipping errors; otherwise, return shipping costs are deducted from the refunded balance.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#2453d4", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <InfoIcon fontSize="small" /> 3. Processing Refunds & Exchanges
              </Typography>
              <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8 }}>
                Once our warehouse receives and inspects the return package, refunds are processed within 5 to 7 business days directly to your original payment method. If you prefer a direct exchange (e.g., swapping a product version or color), we will dispatch the exchange immediately upon package receipt.
              </Typography>
            </Box>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}
