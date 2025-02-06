import React from 'react';
import { Box, Grid, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8', p: 3, mt: 4 }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        {/* Social Media Links */}
        <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
          <IconButton href="https://www.facebook.com" target="_blank" sx={{ '&:hover svg': { color: '#1877F2' } }}>
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://www.instagram.com" target="_blank" sx={{ '&:hover svg': { color: '#E4405F' } }}>
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://www.twitter.com" target="_blank" sx={{ '&:hover svg': { color: '#1DA1F2' } }}>
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://www.linkedin.com" target="_blank" sx={{ '&:hover svg': { color: '#0077B5' } }}>
            <LinkedInIcon />
          </IconButton>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4} textAlign="center">
          <Link href="#" underline="hover" sx={{ mx: 1 }}>
            About Us
          </Link>
          <Link href="#" underline="hover" sx={{ mx: 1 }}>
            Contact
          </Link>
          <Link href="#" underline="hover" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link href="#" underline="hover" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
        </Grid>

        {/* Copyright Info */}
        <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'right' }}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} YourCompany. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;


