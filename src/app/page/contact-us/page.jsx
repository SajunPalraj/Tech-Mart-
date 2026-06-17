"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

// Icons
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// Assets
import contactusImg1 from "@/assets/Pages/contactus.webp";

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "customer-support",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setFormErrors({});

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        department: "customer-support",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ color: "#2453d4", fontSize: "1.8rem" }} />,
      title: "Call Us Anytime",
      detail1: "+0080 1234 56 789",
      detail2: "+0080 9876 54 321",
    },
    {
      icon: <MailOutlinedIcon sx={{ color: "#2453d4", fontSize: "1.8rem" }} />,
      title: "Email Support",
      detail1: "support@techmart.com",
      detail2: "partnerships@techmart.com",
    },
    {
      icon: <LocationOnIcon sx={{ color: "#2453d4", fontSize: "1.8rem" }} />,
      title: "Main Office",
      detail1: "123 Tech Avenue, Suite 500",
      detail2: "Silicon Valley, CA 94025",
    },
    {
      icon: <AccessTimeIcon sx={{ color: "#2453d4", fontSize: "1.8rem" }} />,
      title: "Working Hours",
      detail1: "Mon - Fri: 9:00 AM - 6:00 PM",
      detail2: "Sat - Sun: Closed",
    },
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping time varies based on the destination and customs clearance.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, you can return it in its original packaging within 30 days for a full refund or exchange.",
    },
    {
      question: "Do you offer warranty on products?",
      answer: "Yes, all our electronics and accessories come with a minimum 1-year manufacturer warranty covering defectives. Extended protection plans are available at checkout.",
    },
    {
      question: "Can I cancel or modify my order after placing it?",
      answer: "We process orders quickly, but if you contact us within 1 hour of placing your order, we will do our best to modify or cancel it. Please reach out via support email or our hotline.",
    },
    {
      question: "Do you supply bulk orders or corporate orders?",
      answer: "Yes, Tech Mart features a wholesale division. You can select 'Sales & Partnerships' in our contact form or email partnerships@techmart.com to get custom quote grids and bulk discount pricing.",
    }
  ];

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
          mb: { xs: 6, md: 10 },
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
            Get In Touch
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
            Have questions about a product, warranty, or order status? We are here to support you 24/7.
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Contact Info Cards */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {contactInfo.map((info, idx) => (
            <Grid xs={12} key={idx}>
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "20px",
                  p: 3,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  textAlign: { xs: "center", sm: "left" },
                  gap: 3,
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 20px -5px rgba(36, 83, 212, 0.08)",
                    borderColor: "rgba(36, 83, 212, 0.25)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "rgba(36, 83, 212, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {info.icon}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", mb: 0.5, fontSize: "1.1rem" }}>
                    {info.title}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 0.5, sm: 2 } }}>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                      {info.detail1}
                    </Typography>
                    {info.detail2 && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          fontWeight: 500,
                          borderLeft: { xs: "none", sm: "1px solid #cbd5e1" },
                          pl: { xs: 0, sm: 2 }
                        }}
                      >
                        {info.detail2}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Replaced Layout: About Us Style Content (Left) + Form (Right) */}
        <Grid container spacing={6} sx={{ mb: 12 }}>
          {/* Left Side: Premium Image & Text Content Showcase */}
          <Grid xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: { xs: 4, md: 6 },
                mb: 2,
              }}
            >
              
              {/* Simple Single Image */}
              <Box
                sx={{
                  width: { xs: "100%", md: "35%" },
                  maxWidth: { md: "380px" },
                  height: { xs: "260px", sm: "340px", md: "380px" },
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.01)" },
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={contactusImg1.src}
                  alt="Contact Customer Support"
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </Box>

              {/* Rich Text Content Block (About Us structure) */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#2453d4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5 }}
                >
                  Customer Care
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.8rem", sm: "2rem", md: "2.4rem" },
                    color: "#0f172a",
                    mb: 3,
                    lineHeight: 1.25,
                  }}
                >
                  Smarter Solutions for Your Tech Journey
                </Typography>
                <Typography variant="body1" sx={{ color: "#475569", lineHeight: 1.8, mb: 3, fontSize: "1.02rem" }}>
                  At Tech Mart, our relationship with you doesn't end at checkout. Our dedicated hardware specialists, builders, and customer care executives are committed to assisting you at every stage.
                </Typography>
                
                {/* Visual Bullet Points with Icons */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 4 }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "rgba(36, 83, 212, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <HeadsetMicIcon sx={{ color: "#2453d4", fontSize: "1.2rem" }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0f172a" }}>
                        Expert Diagnostics & Advice
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.5 }}>
                        Consult with custom PC builders on hardware compatibility and configurations.
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "rgba(36, 83, 212, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <ShieldIcon sx={{ color: "#2453d4", fontSize: "1.2rem" }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0f172a" }}>
                        Hassle-Free Warranty Claims
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.5 }}>
                        Rest easy with our seamless, transparent 30-day returns and 1-year product protections.
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "rgba(36, 83, 212, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <LocalShippingIcon sx={{ color: "#2453d4", fontSize: "1.2rem" }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0f172a" }}>
                        Express Order Logistics
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.5 }}>
                        Need tracking adjustments or express redirect? Our team will contact dispatch carriers directly.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

            </Box>
          </Grid>

          {/* Right Side: Message Form */}
          <Grid xs={12}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "24px",
                p: { xs: 4, md: 5 },
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", mb: 1, letterSpacing: "-0.01em" }}>
                Send Us a Message
              </Typography>
              <Typography variant="body1" sx={{ color: "#64748b", mb: 4 }}>
                Fill out the form below and our team will direct your inquiry to the correct division.
              </Typography>

              {submitStatus === "success" && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: "12px" }}>
                  Your message has been sent successfully! We will get back to you soon.
                </Alert>
              )}

              {submitStatus === "error" && !Object.keys(formErrors).length && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                  Please fill out all the required fields correctly.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.2s ease",
                          "& fieldset": { borderColor: "#e2e8f0" },
                          "&:hover fieldset": { borderColor: "#cbd5e1" },
                          "&.Mui-focused fieldset": { borderColor: "#2453d4", borderWidth: "2px" },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.2s ease",
                          "& fieldset": { borderColor: "#e2e8f0" },
                          "&:hover fieldset": { borderColor: "#cbd5e1" },
                          "&.Mui-focused fieldset": { borderColor: "#2453d4", borderWidth: "2px" },
                        },
                      }}
                    />
                  </Grid>

                  {/* Dropdown Support Department Selector */}
                  <Grid xs={12}>
                    <FormControl fullWidth required error={!!formErrors.department}>
                      <InputLabel id="department-label" sx={{ "&.Mui-focused": { color: "#2453d4" } }}>Target Department</InputLabel>
                      <Select
                        labelId="department-label"
                        id="department"
                        name="department"
                        value={formData.department}
                        label="Target Department"
                        onChange={handleInputChange}
                        sx={{
                          borderRadius: "12px",
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2453d4", borderWidth: "2px" },
                        }}
                      >
                        <MenuItem value="customer-support">Customer Support & Inquiries</MenuItem>
                        <MenuItem value="sales-partnerships">Sales & Wholesale Partnerships</MenuItem>
                        <MenuItem value="returns-refunds">Order Cancellations & Refunds</MenuItem>
                        <MenuItem value="careers">Careers & Hiring</MenuItem>
                      </Select>
                      {formErrors.department && <FormHelperText>{formErrors.department}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="subject"
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={!!formErrors.subject}
                      helperText={formErrors.subject}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.2s ease",
                          "& fieldset": { borderColor: "#e2e8f0" },
                          "&:hover fieldset": { borderColor: "#cbd5e1" },
                          "&.Mui-focused fieldset": { borderColor: "#2453d4", borderWidth: "2px" },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={5}
                      id="message"
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!formErrors.message}
                      helperText={formErrors.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          transition: "all 0.2s ease",
                          "& fieldset": { borderColor: "#e2e8f0" },
                          "&:hover fieldset": { borderColor: "#cbd5e1" },
                          "&.Mui-focused fieldset": { borderColor: "#2453d4", borderWidth: "2px" },
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      endIcon={isSubmitting ? null : <SendIcon />}
                      sx={{
                        bgcolor: "#2453d4",
                        color: "white",
                        borderRadius: "12px",
                        px: 4,
                        py: 1.8,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        fontSize: "0.95rem",
                        width: "100%",
                        boxShadow: "0 4px 12px rgba(36, 83, 212, 0.2)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "#1a3eb3",
                          boxShadow: "0 6px 20px rgba(36, 83, 212, 0.35)",
                          transform: "translateY(-1px)",
                        },
                        "&:disabled": {
                          bgcolor: "rgba(36, 83, 212, 0.4)",
                        },
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 10 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#2453d4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5 }}
            >
              Support Center
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#0f172a", mb: 2, fontSize: { xs: "2rem", md: "2.8rem" } }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748b", maxWidth: "600px", mx: "auto" }}>
              Can't find what you're looking for? Reach out using the contact form and we'll reply shortly.
            </Typography>
          </Box>

          <Box sx={{ maxWidth: "800px", mx: "auto" }}>
            {faqs.map((faq, idx) => (
              <Accordion
                key={idx}
                elevation={0}
                sx={{
                  mb: 2,
                  bgcolor: "white",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  borderRadius: "16px !important",
                  overflow: "hidden",
                  "&:before": { display: "none" },
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease",
                  "&.Mui-expanded": {
                    boxShadow: "0 10px 20px rgba(0,0,0,0.04)",
                    borderColor: "rgba(36, 83, 212, 0.2)",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#2453d4" }} />}
                  sx={{
                    px: 3,
                    py: 1,
                    "& .MuiAccordionSummary-content": {
                      margin: "12px 0",
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 800, color: "#0f172a", fontSize: "1.05rem" }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Typography sx={{ color: "#475569", lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactUsPage;
