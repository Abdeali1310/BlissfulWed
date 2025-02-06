/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

import bestSoldImg from "../assets/luxury.jpg";
import planningImg from "../assets/planning.avif";
import themeImg from "../assets/theme.jpg";
import cateringImg from "../assets/catering2.jpg";
import photographyImg from "../assets/photography.jpg";

const features = [
  { title: "Best Sold Package", subtitle: "Luxury Package", image: bestSoldImg },
  { title: "Wedding Planning Service", subtitle: "Seamless & Stress-Free", image: planningImg },
  { title: "Exclusive Theme", subtitle: "Royal Theme", image: themeImg },
  { title: "Best Catering Service", subtitle: "Gourmet Delights", image: cateringImg },
  { title: "Top Photographer", subtitle: "Moments Captured", image: photographyImg },
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularFeatures;
