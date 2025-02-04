import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { InputBase, TextField, CircularProgress } from "@mui/material";

import hp1 from "../../assets/haldi1.jpg"
// import hp2 from "../../assets/haldi2.jpg"
import hp3 from "../../assets/haldi3.jpg"
// import hp4 from "../../assets/haldi4.jpg"
import mp1 from "../../assets/mehndi1.jpg"
import mp2 from "../../assets/mehndi2.jpg"
import mp3 from "../../assets/mehndi3.jpg"
import rp from "../../assets/ringImg.jpg"
import wp1 from "../../assets/weddingImg1.jpg"
import wp2 from "../../assets/weddingImg2.jpg"
import wp3 from "../../assets/weddingImg3.jpg"
import wp4 from "../../assets/weddingImg4.jpg"
// import wp5 from "../../assets/weddingImg5.jpg"
import wp from "../../assets/wedImg.jpg"

const weddingImages = [wp1, wp2, wp3, wp4];

const initialServices = [
  { title: "Haldi", image: hp3 },
  { title: "Mehndi", image: mp3 },
  { title: "Catering", image: rp },
  { title: "Decoration", image: wp2 },
  { title: "Music & DJ", image: hp1 },
  { title: "Bridal Makeup", image: mp1 },
  { title: "Event Planning", image: mp2 },
  { title: "Transportation", image: wp },
];



const packages = [
  { title: "Basic Package", price: "$5000" },
  { title: "Premium Package", price: "$10000" },
  { title: "Luxury Package", price: "$20000" },
];

function WeddingPlanner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Filter services based on the search query
    const filteredResults = services.filter((service) =>
      service.title.toLowerCase().includes(query.toLowerCase())
    );    
    setResults(filteredResults);
  };

  const loadMoreServices = () => {
    setLoading(true);
    setTimeout(() => {
      const newServices = services.map((service) => ({
        ...service,
        title: service.title + " (New)",
      }));
      setServices((prev) => [...prev, ...newServices]);
      setLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 5 && !loading) {
      loadMoreServices();
    }
  };

  return (
    <Box sx={{ width: "100vw", maxWidth: "100%", overflowX: "hidden" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{ background: "#fff", color: "#000", width: "100vw" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            WeddingPlanner
          </Typography>

          {/* Search Icon */}
          <Box display="flex" alignItems="center">
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              style={{
                border: "1px solid #ccc",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Auth Buttons */}
          <Box>
            {isLoggedIn ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => setIsLoggedIn(false)}
              >
                <LogoutIcon /> Logout
              </Button>
            ) : (
              <>
                <Button variant="outlined" sx={{ marginRight: 1 }}>
                  Sign In
                </Button>
                <Button variant="contained">Sign Up</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Wedding Carousel */}
      <Box sx={{ width: "100vw", textAlign: "center", marginY: 4 }}>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          {weddingImages.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Wedding ${index + 1}`}
              sx={{ width: "100%", height: "600px", objectFit: "cover" }}
            />
          ))}
        </Carousel>
      </Box>

      {/* Services Section with Marquee */}
      <Box sx={{ marginTop: 10 }}>
        <Typography variant="h5" sx={{ textAlign: "center", marginY: 2 }}>
          Our Services
        </Typography>
        <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            scrollSnapType: "x mandatory",
            p: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                key={index}
                sx={{
                  minWidth: 200,
                  maxWidth: 200,
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  image={service.image}
                  sx={{ height: 150, objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1">{service.title}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {loading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 200,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>

      {/* Packages Section with Hover Animation */}
      <Typography variant="h5" sx={{ textAlign: "center", marginY: 2 }}>
        Wedding Packages
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {packages.map((pkg, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                boxShadow: 3,
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease-in-out",
                height: 300,
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  textAlign: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                  padding: 2,
                  "&:hover": { opacity: 1 },
                }}
              >
                <Typography variant="h5">{pkg.title}</Typography>
                <Typography variant="h6">{pkg.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Features Section */}
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          marginY: 3,
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Popular Features
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto", // For horizontal scrolling
          paddingBottom: 3, // Space at the bottom to make it look cleaner
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: 3,
              textAlign: "center",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "600", color: "#555" }}>
              Best Sold Package
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#777" }}>
              Luxury Package
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: 3,
              textAlign: "center",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "600", color: "#555" }}>
              Most Popular Venue
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#777" }}>
              Grand Palace
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: 3,
              textAlign: "center",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "600", color: "#555" }}>
              Exclusive Theme
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#777" }}>
              Royal Theme
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: 3,
              textAlign: "center",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "600", color: "#555" }}>
              Best Catering Service
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#777" }}>
              Gourmet Delights
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: 3,
              textAlign: "center",
              boxShadow: 3,
              borderRadius: 2,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "600", color: "#555" }}>
              Top Photographer
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#777" }}>
              Moments Captured
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Contact Us Section */}
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          padding: 3,
          mt: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
            mx: "auto",
          }}
        >
          <TextField label="First Name" variant="outlined" fullWidth />
          <TextField label="Email" type="email" variant="outlined" fullWidth />
          <TextField
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "#222",
          color: "#fff",
          padding: 2,
          marginTop: 4,
        }}
      >
        <Typography variant="body2">
          &copy; 2025 WeddingPlanner | Connect with us:
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://www.instagram.com"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            href="https://www.twitter.com"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com"
            target="_blank"
            sx={{ color: "#fff" }}
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default WeddingPlanner;
