"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

// Icons
import CodeIcon from "@mui/icons-material/Code";
import LayersIcon from "@mui/icons-material/Layers";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import BuildIcon from "@mui/icons-material/Build";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GavelIcon from "@mui/icons-material/Gavel";

export default function DisclaimerPage() {
  const resources = [
    {
      icon: <CodeIcon sx={{ color: "#2453d4", fontSize: "2rem" }} />,
      title: "Core Languages",
      items: [
        "JavaScript (ES6+) - Dynamic site routing, custom hooks, context modules & event controls.",
        "HTML5 - Semantic page layout architectures.",
        "CSS3 - Custom property animations and root color tokens."
      ]
    },
    {
      icon: <LayersIcon sx={{ color: "#2453d4", fontSize: "2rem" }} />,
      title: "Frameworks & Libraries",
      items: [
        "Next.js 16 (App Router) - Server-side rendering, dynamic API route parameters & optimized builds.",
        "React 19 - Declarative UI context engines, state hooks, and virtual DOM rendering.",
        "Material UI (MUI v9) - Premium components styling library, customized grids & rating controls.",
        "Emotion styled - Seamless CSS-in-JS utility integration.",
        "Framer Motion - Interactive micro-animations and transition controls."
      ]
    },
    {
      icon: <StorageIcon sx={{ color: "#2453d4", fontSize: "2rem" }} />,
      title: "Database & ORM",
      items: [
        "MongoDB - Distributed document database collections.",
        "Prisma ORM (v6.8.0) - High-efficiency MongoDB driver client generator."
      ]
    },
    {
      icon: <SecurityIcon sx={{ color: "#2453d4", fontSize: "2rem" }} />,
      title: "Auth & State Managers",
      items: [
        "Clerk Auth - Secured multi-factor login checks & session hooks.",
        "React Context API - State providers for cart shopping, user profiles, and catalog wishlists."
      ]
    },
    {
      icon: <PsychologyIcon sx={{ color: "#2453d4", fontSize: "2rem" }} />,
      title: "AI & External Integrations",
      items: [
        "Google Generative AI SDK (v0.24.1) - Gemini engine powering the interactive AI chatbot.",
        "Nodemailer (v8.0.11) - Backend dispatch services handling notifications & message receipts.",
        "Axios (v1.17.0) - Client-side promise-based HTTP network request handlers."
      ]
    },
    {
      icon: <InsertPhotoIcon sx={{ color: "#2453d4", fontSize: "2rem" }} />,
      title: "Image & Icon Assets",
      items: [
        "Material Icons - Standard vector icons used in menus, buttons, and navigation.",
        "Static Tech Product Images - High-resolution hardware assets representing Nvidia, Intel, AMD, Corsair, ASUS ROG, and Samsung items."
      ]
    },
    {
      icon: <BuildIcon sx={{ color: "#2453d4", fontSize: "2rem" }} />,
      title: "Development & Build Tools",
      items: [
        "npm Package Manager - Workspace dependencies compiler.",
        "ESLint - Standard linting patterns.",
        "Vercel Deployment - Server hosting.",
        "Git - Distributed version control."
      ]
    }
  ];

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", fontFamily: "var(--font-montserrat)", pb: { xs: 8, md: 12 } }}>
      
      {/* Page Hero Header */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "35vh", md: "40vh" },
          minHeight: "260px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          textAlign: "center",
          overflow: "hidden",
          mb: { xs: 6, md: 8 }
        }}
      >
        {/* Decorative Radial Gradients */}
        <Box
          sx={{
            position: "absolute",
            top: "-40%",
            right: "-10%",
            width: "50%",
            height: "100%",
            background: "radial-gradient(circle, rgba(36, 83, 212, 0.18) 0%, transparent 60%)",
            pointerEvents: "none"
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
            pointerEvents: "none"
          }}
        />

        <Box sx={{ zIndex: 2, px: 3 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.3rem", sm: "3.2rem", md: "4rem" },
              letterSpacing: "-0.02em",
              mb: 2,
              fontFamily: "var(--font-montserrat)"
            }}
          >
            Resource Disclaimer
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: { xs: "0.95rem", sm: "1.15rem" },
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.5
            }}
          >
            A comprehensive list of core languages, npm libraries, developer tools, database services, and media assets utilized in the development of the Tech Mart platform.
          </Typography>
        </Box>
      </Box>

      {/* Main Container */}
      <Container maxWidth="lg">
        
        {/* Core Resource Listing Cards Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {resources.map((res, index) => (
            <Grid item xs={12} md={res.title === "Frameworks & Libraries" ? 12 : 6} key={index}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "white",
                  borderRadius: "20px",
                  p: 4,
                  height: "100%",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px -5px rgba(36, 83, 212, 0.08)",
                    borderColor: "rgba(36, 83, 212, 0.2)"
                  }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "14px",
                      bgcolor: "rgba(36, 83, 212, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    {res.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", fontSize: "1.25rem", fontFamily: "var(--font-montserrat)" }}>
                    {res.title}
                  </Typography>
                </Box>
                
                <Box component="ul" sx={{ m: 0, pl: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {res.items.map((item, itemIdx) => (
                    <Box component="li" key={itemIdx} sx={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6 }}>
                      {item}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Legal Disclaimer / Trademark Info */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: "white",
            borderRadius: "24px",
            p: { xs: 4, md: 5 },
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.01)"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <GavelIcon sx={{ color: "#ff6f00", fontSize: "2rem" }} />
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", fontFamily: "var(--font-montserrat)", fontSize: { xs: "1.5rem", md: "1.8rem" } }}>
              Usage Disclaimer & Trademark Policies
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 3 }}>
            <strong>Tech Mart</strong> is a mock/sample e-commerce platform built as an educational demonstration of full-stack web development. All product data, names, pricing structures, specifications, descriptions, and user reviews listed in the catalog are simulated.
          </Typography>
          <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 3 }}>
            All corporate brand names, system logos, and hardware product trademarks featured in the listings (including but not limited to <strong>Intel Corporation, Advanced Micro Devices (AMD), NVIDIA Corporation, Samsung Electronics, ASUS ROG, Razer Inc., Corsair Components, Lenovo, Acer Inc., HP Omen, and MSI</strong>) are the exclusive property of their respective trademark holders. Their inclusion on this website is intended solely for illustrative and demonstration purposes and does not imply any brand affiliation, product sponsorship, commercial endorsement, or official recommendation by the trademark owners.
          </Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8", fontStyle: "italic", lineHeight: 1.6 }}>
            For queries relating to code copyrights, API endpoints, or database structures, please contact the administrator at Sajunpalraj2004@gmail.com.
          </Typography>
        </Paper>

      </Container>
    </Box>
  );
}
