"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

import aboutusImg1 from "@/assets/Pages/aboutus.webp";
import aboutusImg2 from "@/assets/Pages/aboutus2.webp";
import aboutusImg3 from "@/assets/Pages/aboutus3.webp";
import Image from "next/image";

function AboutUsPage() {
  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", fontFamily: "var(--font-montserrat)" }}>
      {/* Premium Hero Banner */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "30vh", md: "45vh" },
          minHeight: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          textAlign: "center",
          overflow: "hidden",
          mb: { xs: 4, md: 8 },
        }}
      >
        {/* Subtle Decorative Glows */}
        <Box
          sx={{
            position: "absolute",
            top: "-50%",
            left: "-20%",
            width: "60%",
            height: "100%",
            background: "radial-gradient(circle, rgba(36, 83, 212, 0.15) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-50%",
            right: "-20%",
            width: "60%",
            height: "100%",
            background: "radial-gradient(circle, rgba(36, 83, 212, 0.15) 0%, transparent 60%)",
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
            About Us
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
            Discover the passion, people, and purpose behind our mission to redefine technology.
          </Typography>
        </Box>
      </Box>

      {/* Content Sections */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
        {/* Section 1: Image Left, Content Right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            py: { xs: 4, md: 6 },
          }}
        >
          {/* Image */}
          <Box
            sx={{
              flex: 1,
              width: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Image
              src={aboutusImg1}
              alt="Our Mission"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#2453d4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5 }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.8rem" },
                color: "#0f172a",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Empowering Connection Through Innovation
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 3, fontSize: "1.05rem" }}>
              At Tech Mart, we believe technology should be an extension of human potential, not a barrier. Our journey began with a simple question: How can we make state-of-the-art tech accessories accessible, durable, and beautiful?
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 4, fontSize: "1.05rem" }}>
              Today, we curate and design devices that seamlessly fit into your life, enhancing productivity, creativity, and connection. We are committed to leading the charge in sustainable design and uncompromising quality.
            </Typography>
            <Button
              component={Link}
              href="/"
              variant="contained"
              sx={{
                bgcolor: "#2453d4",
                color: "white",
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                ":hover": { bgcolor: "#1a3eb3" },
              }}
            >
              Explore Products
            </Button>
          </Box>
        </Box>

        {/* Section 2: Content Left, Image Right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            py: { xs: 8, md: 12 },
          }}
        >
          {/* Image */}
          <Box
            sx={{
              flex: 1,
              width: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Image
              src={aboutusImg2}
              alt="Our Story"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#2453d4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5 }}
            >
              Our Journey
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.8rem" },
                color: "#0f172a",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Crafting Excellence Since Day One
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 3, fontSize: "1.05rem" }}>
              What started as a small team of three tech enthusiasts has evolved into a global brand. Our process is rooted in continuous experimentation, listening to user feedback, and refining even the smallest details of our products.
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 4, fontSize: "1.05rem" }}>
              From initial prototype to the final package, we prioritize materials that stand the test of time, reducing waste and ensuring your investments last. Every Tech Mart is engineered to elevate your daily routine.
            </Typography>
            <Button
              component={Link}
              href="/contact-us"
              variant="outlined"
              sx={{
                color: "#2453d4",
                borderColor: "#2453d4",
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                ":hover": { borderColor: "#1a3eb3", color: "#1a3eb3", bgcolor: "rgba(36, 83, 212, 0.04)" },
              }}
            >
              Get In Touch
            </Button>
          </Box>
        </Box>

        {/* Section 3: Image Left, Content Right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            py: { xs: 4, md: 6 },
          }}
        >
          {/* Image */}
          <Box
            sx={{
              flex: 1,
              width: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Image
              src={aboutusImg3}
              alt="Our Values"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#2453d4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5 }}
            >
              Our Core Values
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.8rem" },
                color: "#0f172a",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Designed for People, Built for Life
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 4, fontSize: "1.05rem" }}>
              We live by three simple tenets that guide every design, communication, and decision we make as a brand:
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#2453d4",
                    mt: 1,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
                    Quality First
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.6 }}>
                    No shortcuts. We use high-grade components and rigorous quality assurance.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#2453d4",
                    mt: 1,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
                    Human Centric Design
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.6 }}>
                    We research how real people interact with devices to create truly intuitive accessories.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#2453d4",
                    mt: 1,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", mb: 0.5 }}>
                    Environmental Responsibility
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.6 }}>
                    We aim to minimize our footprint through packaging design and carbon-neutral goals.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutUsPage;
