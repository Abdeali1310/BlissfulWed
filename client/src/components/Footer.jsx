/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#E73895",
        color: "white",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: "1200px" }}>
        {/* About Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
            About Us
          </Typography>
          <Typography variant="body2">
            BlissfulWed is your go-to wedding event planner, offering a wide range of services to make your special day perfect.
          </Typography>
        </Grid>

        {/* Services Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
            Services
          </Typography>
          <Box>
            <Link
              href="/service/haldi"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none", // Remove underline by default
                "&:hover": {
                  textDecoration: "underline", // Show underline on hover
                },
              }}
            >
              Haldi
            </Link>
            <Link
              href="/service/mehndi"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Mehndi
            </Link>
            <Link
              href="/service/catering"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Catering
            </Link>
            <Link
              href="/service/music-&-dj"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Music & DJ
            </Link>
            <Link
              href="/service/photography"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Photography
            </Link>
            <Link
              href="/service/bridal-makeup"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Bridal makeup
            </Link>
            <Link
              href="/service/groom-wear"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Groom wear
            </Link>
          
            
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
            Quick Links
          </Typography>
          <Box>
            <Link
              href="/"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Home
            </Link>
            <Link
              href="/gallery/album"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Gallery
            </Link>
            
            <Link
              href="/contact-us"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Contact
            </Link>
            <Link
              href="/about"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              About Us
            </Link>
            <Link
              href="/privacy-policy"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              color="inherit"
              sx={{
                display: "block",
                marginBottom: "10px",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#3b5998" } }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#e4405f" } }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://www.twitter.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#1da1f2" } }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#0077b5" } }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom Section */}
      <Box sx={{ textAlign: "center", marginTop: "30px", fontSize: "14px" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} BlissfulWed. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
