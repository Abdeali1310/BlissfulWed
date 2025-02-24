/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import weddingImg4 from "../assets/weddingImg4.jpg";
import weddingImg2 from "../assets/carousel.avif";
import weddingImg3 from "../assets/weddingImg3.avif";
import weddingImg1 from "../assets/carousel2.avif";
import weddingImg5 from "../assets/carousel3.avif";

const weddingImages = [weddingImg1, weddingImg2, weddingImg3, weddingImg4, weddingImg5];

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    // Preload images
    weddingImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => prev + 1);
      };
    });
  }, []);

  useEffect(() => {
    if (loadedImages === weddingImages.length) {
      setLoading(false);
    }
  }, [loadedImages]);

  return (
    <Box sx={{ width: "100vw", textAlign: "center", position: "relative" }}>
      {loading ? (
        <Box
          sx={{
            width: "100vw",
            height: "95vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
          }}
        >
          <CircularProgress size={60} sx={{ color: "pink" }} />
        </Box>
      ) : (
        <>
          {/* Image Carousel */}
          <Carousel autoPlay infiniteLoop showThumbs={false} interval={2500} transitionTime={1000}>
            {weddingImages.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`Wedding ${index + 1}`}
                sx={{
                  width: "100%",
                  height: { xs: "70vh", md: "95vh" },
                  objectFit: "cover",
                }}
              />
            ))}
          </Carousel>

          {/* Vignette Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 85%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Tagline */}
          <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500 font-bold text-2xl lg:text-5xl font-cursive font-black bg-black/40 px-4 py-2 rounded-lg z-20 shadow-md shadow-black w-[90%] md:w-[50%]">
            Welcome to BlissfulWed - Where Every Detail Tells a Love Story.
          </div>
        </>
      )}
    </Box>
  );
};

export default Header;
