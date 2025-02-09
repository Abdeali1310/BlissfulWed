/* eslint-disable no-unused-vars */
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import hp1 from "../assets/music.avif";
import hp3 from "../assets/haldi.avif";
import mp1 from "../assets/makeup.avif";
import mp3 from "../assets/mehndi.jpeg";
import rp from "../assets/catering.avif";
import wp2 from "../assets/weddingImg2.jpg";
import p1 from "../assets/photo.jpg";
import g1 from "../assets/groom.avif";

const services = [
  { title: "Haldi", image: hp3 },
  { title: "Mehndi", image: mp3 },
  { title: "Catering", image: rp },
  { title: "Decoration", image: wp2 },
  { title: "Music-&-DJ", image: hp1 },
  { title: "Bridal-Makeup", image: mp1 },
  { title: "Photography", image: p1 },
  { title: "Grooms-Wear", image: g1 },
];

const Services = () => {
  const loading = false;

  return (
    <Box sx={{ marginTop: 15, marginBottom: 5, overflow: "hidden", paddingInline:2.5 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#e10098",
          fontFamily: "cursive",
          fontWeight: "bold",
          textAlign: "center",
          marginY: 5,
          marginX: 2,
        }}
      >
        Our Services
      </Typography>

      <Box sx={{ position: "relative", width: "100%", overflow: "hidden", height:"28vh",paddingBlock:2}}>
        <motion.div
          style={{
            display: "flex",
            gap: "30px",
            width: "max-content", // Ensure it stretches far enough for the loop
          }}
          animate={{ x: ["0%", "-50%"] }} // Moves left infinitely, but using a smaller increment
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {[...services, ...services].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % services.length) * 0.2 }}
            >
              <Link
                to={`/services/${service.title.toLowerCase()}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    minWidth: 200,
                    minHeight: 200,
                    maxWidth: 200,
                    flexShrink: 0,
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
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Box>

      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
            minWidth: 200,
            height: 150,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Services;
