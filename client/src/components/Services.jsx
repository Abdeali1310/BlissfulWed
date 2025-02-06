/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

import hp1 from "../assets/music.avif"
import hp3 from "../assets/haldi.avif";
import mp1 from "../assets/makeup.avif";
import mp3 from "../assets/mehndi.jpeg";
import rp from "../assets/catering.avif"
import wp2 from "../assets/weddingImg2.jpg";
import p1 from "../assets/photo.jpg"

const initialServices = [
  { title: "Haldi", image: hp3 },
  { title: "Mehndi", image: mp3 },
  { title: "Catering", image: rp },
  { title: "Decoration", image: wp2 },
  { title: "Music & DJ", image: hp1 },
  { title: "Bridal Makeup", image: mp1 },
  { title: "Photography", image: p1 },
];

const Services = () => {
  const loading = false;  

  return (
    <Box sx={{ marginTop: 15, marginBottom:5 }}>
      <Typography variant="h4" sx={{color: "#e10098" , fontFamily:"cursive", fontWeight:"bold"
        
        , textAlign: "center", marginY: 2,marginX:2, }}>
        Our Services
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          padding: 5,
        }}
      >
        {initialServices.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Link to={`/services/${service.title.toLowerCase()}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  minWidth: 200,
                  minHeight:200,
                  maxWidth: 200,
                  flexShrink: 0,
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                  marginBottom: 3, 
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
            </Link>
          </motion.div>
        ))}

        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 200,
              height: 150,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Services;
