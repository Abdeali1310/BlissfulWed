/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import weddingImg4 from '../assets/weddingImg4.jpg';
import weddingImg2 from '../assets/carousel.avif';
import weddingImg3 from '../assets/weddingImg3.jpg';
import weddingImg1 from '../assets/carousel2.avif';
import weddingImg5 from '../assets/carousel3.avif';

const weddingImages = [
  weddingImg1,
  weddingImg2,
  weddingImg3,
  weddingImg4,
  weddingImg5
];

const Header = () => {
  return (
    <Box sx={{ width: "100vw", textAlign: "center", marginY: 0 }}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        interval={2500}  
        transitionTime={1000}  
      >
        {weddingImages.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Wedding ${index + 1}`}
            sx={{
              width: "100%",
              height: "95vh",
              objectFit: "cover",
              
            }}
          />
        ))}
      </Carousel>

      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          fontFamily:"cursive",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "pink",
          fontWeight: "bold",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",  
        }}
      >
      </Typography>
    </Box>
  );
};

export default Header;
