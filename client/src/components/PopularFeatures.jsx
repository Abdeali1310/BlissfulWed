/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { motion } from "framer-motion"; // Import framer-motion for animation

import bestSoldImg from "../assets/luxury.jpg";
import planningImg from "../assets/planning.avif";
import themeImg from "../assets/theme.jpg";
import cateringImg from "../assets/catering2.jpg";
import photographyImg from "../assets/photography.jpg";
import { Link } from "react-router-dom";

const features = [
  { title: "Best Sold Package", redirect:"/packages/luxury-package", subtitle: "Luxury Package", image: bestSoldImg },
  { title: "Haldi Service",redirect:"/service/haldi", subtitle: "Seamless & Stress-Free", image: planningImg },
  { title: "Exclusive Theme",redirect:"/service/decoration/67ab5aefa8ef6ca75f626dfd", subtitle: "Royal Theme", image: themeImg },
  { title: "Best Catering Service",redirect:"/service/catering", subtitle: "Gourmet Delights", image: cateringImg },
  { title: "Top Photographer", redirect:"/service/photography", subtitle: "Moments Captured", image: photographyImg },
];

const PopularFeatures = () => {
  return (
    <Box
      sx={{
        marginY: 5,
        paddingY: 5,
        paddingX: 5,
        marginTop:"8rem",
        paddingBottom:"8rem",
        background: "linear-gradient(to bottom, #fff8e1, #ffecb3)",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 6,
          fontWeight: "bold",
          fontFamily:"cursive",
          color: "#e10098", 
        }}
      >
        Popular Features
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            {/* Use motion.div for animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move it from bottom
              whileInView={{ opacity: 1, y: 0 }} // Fade in and move up when it comes into view
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Link to={feature.redirect}>
              <Card
                sx={{
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  component="img"
                  src={feature.image}
                  alt={feature.title}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ padding: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "600", color: "#5A3825" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#7D5A4F", fontSize: "1rem" }}>
                    {feature.subtitle}
                  </Typography>
                </CardContent>
              </Card>
              </Link>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularFeatures;
