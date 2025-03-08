/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const EventGallery = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/gallery/${category}?filter=${filter}`
        );
        setImages(res.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [category, filter]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right,rgb(230, 91, 237),rgb(255, 180, 249))",
        py: { xs: 2, sm: 4, md: 5 },
        px: { xs: 1, sm: 2, md: 3 },
        position: "relative",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: { xs: 10, sm: 20 },
          left: { xs: 10, sm: 20 },
          color: "#5a4b94",
          backgroundColor: "#e6e6ff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#d4d4f5",
          },
          zIndex: 1,
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container
        maxWidth={false}
        disableGutters
        sx={{ textAlign: "center", width: "100%" }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#5a4b94",
            mb: 4,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} Album
        </Typography>

        {/* Filter Buttons */}
        {category !== "pre-wedding" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {["All", "couple", "guests", "ceremony", "family"].map(
              (option) => (
                <Typography
                  key={option}
                  onClick={() => setFilter(option === "All" ? "" : option)}
                  sx={{
                    cursor: "pointer",
                    color: filter === option ? "#6a0dad" : "#5a4b94",
                    fontWeight: filter === option ? "bold" : "normal",
                    "&:hover": { color: "#6a0dad" },
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  }}
                >
                  {option}
                </Typography>
              )
            )}
          </Box>
        )}

        {/* Check if images array is empty */}
        {images.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              color: "#a0a0a0",
              mt: 4,
              fontStyle: "italic",
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            No images available for this filter.
          </Typography>
        ) : (
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={2}
            sx={{ width: "100%", mx: "auto" }}
          >
            {images.map((img, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Zoom>
                  <CardMedia
                    component="img"
                    image={img.filePath}
                    alt="Album Image"
                    sx={{
                      width: "100%",
                      display: "block",
                      cursor: "zoom-in",
                    }}
                  />
                </Zoom>
              </Card>
            ))}
          </Masonry>
        )}
      </Container>
    </Box>
  );
};

export default EventGallery;
