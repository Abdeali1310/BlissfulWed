/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e73895", // Updated color for better theme match
        color: "white",
        py: 6,
        textAlign: "center",
      }}
    >
      {/* Social Media Icons */}
      <Grid container justifyContent="center" spacing={4} mb={3}>
        <Grid item>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            sx={{ color: "white", "&:hover": { color: "#1877F2" } }}
          >
            <FacebookIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            href="https://www.instagram.com"
            target="_blank"
            sx={{ color: "white", "&:hover": { color: "#E4405F" } }}
          >
            <InstagramIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            href="https://www.twitter.com"
            target="_blank"
            sx={{ color: "white", "&:hover": { color: "#1DA1F2" } }}
          >
            <TwitterIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            href="https://www.linkedin.com"
            target="_blank"
            sx={{ color: "white", "&:hover": { color: "#0077B5" } }}
          >
            <LinkedInIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Box mb={3}>
        <Link href="/about" underline="none" sx={{ fontSize:"18px" ,color: "white", mx: 2, "&:hover": { textDecoration: "underline" } }}>
          About Us
        </Link>
        
        <Link href="/privacy-policy" underline="none" sx={{ fontSize:"18px" ,color: "white", mx: 2, "&:hover": { textDecoration: "underline" } }}>
          Privacy Policy
        </Link>
        <Link href="/terms" underline="none" sx={{ fontSize:"18px", color: "white", mx: 2, "&:hover": { textDecoration: "underline" } }}>
          Terms of Service
        </Link>
      </Box>

      <Typography variant="body2" sx={{fontSize:"18px",mt:"2rem"}}>
        © {new Date().getFullYear()} BlissfulWed. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
