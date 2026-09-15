"use client";

import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import GavelIcon from "@mui/icons-material/Gavel";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SecurityIcon from "@mui/icons-material/Security";
import ShieldIcon from "@mui/icons-material/Shield";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { motion, AnimatePresence } from "framer-motion";

export default function TermsAndConditionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState(null); // 'yes' | 'no' | null

  const sections = useMemo(() => [
    {
      id: "intro",
      icon: <InfoIcon sx={{ color: "#2453d4" }} />,
      title: "1. Acceptance of Terms",
      content: "Welcome to Tech Mart. By accessing, browsing, or placing an order on our e-commerce platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree, please discontinue use of this site immediately. These terms apply to all visitors, users, and customers of Tech Mart."
    },
    {
      id: "account",
      icon: <SecurityIcon sx={{ color: "#2453d4" }} />,
      title: "2. User Accounts & Registration",
      content: "To unlock certain purchasing options, you may be required to register a user account. You are solely responsible for maintaining the confidentiality of your credentials (username and password) and for restricting unauthorized access to your computer or device. All activities that occur under your account are your sole responsibility. Tech Mart reserves the right to terminate accounts or cancel orders at our sole discretion."
    },
    {
      id: "pricing",
      icon: <GavelIcon sx={{ color: "#2453d4" }} />,
      title: "3. Product Pricing & Availability",
      content: "We make every effort to display accurate product details, specifications, prices, and stock availability on our website. However, technical errors or pricing glitches may occur. In the event a product is listed at an incorrect price due to a typographical or system error, Tech Mart reserves the right to cancel or refuse any orders placed for that item. Prices are subject to change without prior notice."
    },
    {
      id: "shipping",
      icon: <LocalShippingIcon sx={{ color: "#2453d4" }} />,
      title: "4. Shipping & Delivery Policies",
      content: "All orders placed are subject to product availability and will be shipped according to our shipping schedules. Shipping estimates provided during checkout are guidelines and are not guaranteed delivery dates. Tech Mart is not liable for delayed deliveries caused by custom checks, logistics carriers, bad weather conditions, or force majeure events. Risk of loss passes to you upon delivery to the carrier."
    },
    {
      id: "returns",
      icon: <AssignmentTurnedInIcon sx={{ color: "#2453d4" }} />,
      title: "5. Returns, Refunds & Cancellations",
      content: "We offer a 30-day return window on most electronics and hardware accessories. Returned items must be in their original packaging, unused, and accompanied by proof of purchase. Refunds will be issued to the original payment method after receiving and inspecting the returned product. Custom computer configurations or items marked 'final sale' are not eligible for returns or refunds."
    },
    {
      id: "intellectual",
      icon: <ShieldIcon sx={{ color: "#2453d4" }} />,
      title: "6. Intellectual Property Rights",
      content: "All graphics, logos, product descriptions, layouts, headers, buttons, audio clips, and software on this website are the exclusive property of Tech Mart or its brand partners. They are protected by international trademark, copyright, and patent laws. You may not copy, replicate, modify, or commercially exploit any content from Tech Mart without our explicit written permission."
    },
    {
      id: "liability",
      icon: <SecurityIcon sx={{ color: "#2453d4" }} />,
      title: "7. Limitation of Liability",
      content: "To the maximum extent permitted by law, Tech Mart and its affiliates shall not be liable for any indirect, incidental, punitive, or consequential damages arising from the use or inability to use our platform, or from hardware purchases made through our website. Our total liability for any claim shall not exceed the amount paid by you for the specific product in question."
    },
    {
      id: "changes",
      icon: <UpdateIcon sx={{ color: "#2453d4" }} />,
      title: "8. Amendments to Agreement",
      content: "Tech Mart reserves the right to update, modify, or replace these Terms and Conditions at any time. We will post the revised version with an updated 'Last modified' date. Your continued use of the website following any changes constitutes acceptance of the new terms. We recommend checking this page regularly to stay informed."
    }
  ], []);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    return sections.filter(sec => 
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sec.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sections]);

  // Handle smooth scroll to section anchors
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", fontFamily: "var(--font-montserrat)", pb: { xs: 8, md: 12 } }}>
      {/* Premium Hero Banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "35vh", md: "45vh" },
          minHeight: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          textAlign: "center",
          overflow: "hidden",
          mb: { xs: 6, md: 8 },
        }}
      >
        {/* Glow Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-40%",
            right: "-10%",
            width: "50%",
            height: "100%",
            background: "radial-gradient(circle, rgba(36, 83, 212, 0.18) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-40%",
            left: "-10%",
            width: "50%",
            height: "100%",
            background: "radial-gradient(circle, rgba(36, 83, 212, 0.18) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <Box sx={{ zIndex: 2, px: 3 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              letterSpacing: "-0.02em",
              mb: 2,
            }}
          >
            Terms of Service
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.2rem" },
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Last updated: June 09, 2026. Please read our guidelines and store regulations carefully.
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Interactive Search Bar */}
        <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
          <TextField
            fullWidth
            placeholder="Search clauses (e.g. shipping, refund, security...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              maxWidth: 700,
              bgcolor: "white",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                transition: "all 0.2s ease",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#cbd5e1" },
                "&.Mui-focused fieldset": { borderColor: "#2453d4", borderWidth: "2px" },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#2453d4" }} />
                  </InputAdornment>
                ),
              }
            }}
          />
        </Box>

        <Grid container spacing={5}>
          {/* Left Navigation Menu (Desktop Only) */}
          <Grid xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ position: "sticky", top: 180, display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle2" sx={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2, pl: 1.5 }}>
                Documents Outline
              </Typography>
              {sections.map((sec) => (
                <Box
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    color: "#475569",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    "&:hover": {
                      bgcolor: "rgba(36, 83, 212, 0.06)",
                      color: "#2453d4",
                      transform: "translateX(4px)"
                    }
                  }}
                >
                  {sec.icon}
                  {sec.title.split(". ")[1]}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Contents Area */}
          <Grid xs={12} md={9}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {filteredSections.length > 0 ? (
                filteredSections.map((sec) => (
                  <Paper
                    key={sec.id}
                    id={sec.id}
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: "20px",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 20px rgba(0,0,0,0.03)",
                        borderColor: "rgba(36, 83, 212, 0.15)"
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: "rgba(36, 83, 212, 0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {sec.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", fontSize: "1.25rem" }}>
                        {sec.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, fontSize: "1rem" }}>
                      {sec.content}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Paper sx={{ p: 5, textAlign: "center", borderRadius: "20px", border: "1px solid #e2e8f0" }}>
                  <Typography variant="h6" sx={{ color: "#64748b", fontWeight: 700 }}>
                    No matching clauses found.
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8", mt: 1 }}>
                    Try searching for alternative terms like "account", "pricing", "delivery" or "amendments".
                  </Typography>
                </Paper>
              )}
            </Box>

            {/* FEEDBACK SECTION */}
            <Box 
              sx={{ 
                mt: 8, 
                p: 4, 
                borderRadius: "24px", 
                bgcolor: "#0f172a", 
                color: "white", 
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Glow Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, rgba(36, 83, 212, 0.12), transparent 70%)",
                  pointerEvents: "none"
                }}
              />
              
              <AnimatePresence mode="wait">
                {feedback === null ? (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontFamily: "var(--font-montserrat)" }}>
                      Was this Terms of Service document helpful?
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 3 }}>
                      We update our policies regularly to give you a transparent and secure shopping experience.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        onClick={() => setFeedback('yes')}
                        sx={{
                          bgcolor: "#2453d4",
                          px: 4,
                          py: 1,
                          fontWeight: 700,
                          borderRadius: "10px",
                          textTransform: "none",
                          "&:hover": { bgcolor: "#1a3eb3" }
                        }}
                      >
                        Yes, Helpful
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setFeedback('no')}
                        sx={{
                          color: "white",
                          borderColor: "rgba(255,255,255,0.2)",
                          px: 4,
                          py: 1,
                          fontWeight: 700,
                          borderRadius: "10px",
                          textTransform: "none",
                          "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.05)" }
                        }}
                      >
                        No
                      </Button>
                    </Box>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}
                  >
                    {feedback === 'yes' ? (
                      <CheckCircleIcon sx={{ color: "#4adb8a", fontSize: "3.5rem", mb: 1 }} />
                    ) : (
                      <HighlightOffIcon sx={{ color: "#ff4d4d", fontSize: "3.5rem", mb: 1 }} />
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {feedback === 'yes' ? "Thank you for your feedback!" : "We apologize for the inconvenience."}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                      {feedback === 'yes' 
                        ? "We are glad these terms are clear and helpful for your reference."
                        : "Our team will review these clauses to clarify complex details."}
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
