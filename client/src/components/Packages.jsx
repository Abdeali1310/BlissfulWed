/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion for animations

// Import images
import basicImg from "../assets/basic.png";
import premiumImg from "../assets/premium.jpg";
import luxuryImg from "../assets/luxury.jpg";

const packages = [
  { title: "Basic Package", price: "3,50,000", image: basicImg, type: "basic" },
  { title: "Premium Package", price: "6,00,000", image: premiumImg, type: "premium" },
  { title: "Luxury Package", price: "10,50,000", image: luxuryImg, type: "luxury" },
];

const WeddingPackages = () => {
  return (
    <Box sx={{ marginTop: 10, padding: "2rem" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#e10098",
          fontFamily: "cursive",
          fontWeight: "bold",
          textAlign: "center",
          marginY: 2,
          marginX: 2,
          paddingTop: 3,
          marginBottom: "2.5rem",
        }}
      >
        Wedding Packages
      </Typography>

      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {packages.map((pkg, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Link to={`/package/${pkg.type}`} style={{ textDecoration: "none" }}>
              {/* Use motion.div for animation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move it from bottom
                whileInView={{ opacity: 1, y: 0 }} // Fade in and move up when it comes into view
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
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
                  <CardMedia
                    component="img"
                    alt={pkg.title}
                    image={pkg.image}
                    sx={{
                      height: "full",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                      textAlign: "center",
                      opacity: 0, // Initially hide the price
                      transition: "opacity 0.3s ease-in-out",
                      padding: 2,
                      "&:hover": { opacity: 1 }, // Show price on hover anywhere on the card
                    }}
                  >
                    <Typography variant="h5">{pkg.title}</Typography>
                    <Typography variant="h6">&#8377;{pkg.price}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeddingPackages;
