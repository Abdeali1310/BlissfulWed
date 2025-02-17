import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardMedia, Typography, Grid, Container, Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import rp from "../../assets/ringImg.jpg";
import wedImg1 from "../../assets/weddingImg2.jpg";
import preWed from "../../assets/pre-wedding.jpg";
import receptionPic from "../../assets/reception1.jpg";

const categories = [
  { name: "Wedding", image: wedImg1 },
  { name: "Pre-Wedding", image: preWed },
  { name: "Reception", image: receptionPic },
  { name: "Engagement", image: rp },
];

// Framer Motion Variants for Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom right, #e6e6ff, #f9f9ff)",
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 3, md: 5 },
        position: "relative",
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#5a4b94",
          backgroundColor: "#e6e6ff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#d4d4f5",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#5a4b94",
              mb: 4,
              textShadow: "1px 1px 5px rgba(0,0,0,0.2)",
            }}
          >
            Choose Your Album
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.name}>
                <motion.div variants={cardVariants}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                      overflow: "hidden",
                      transition: "transform 0.3s",
                      "&:hover": {
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/gallery/album/${category.name.toLowerCase()}`}
                    >
                      <CardMedia
                        component="img"
                        image={category.image}
                        alt={category.name}
                        sx={{
                          height: "280px",  // Uniform Height for all images
                          objectFit: "cover", // Maintains image aspect ratio
                        }}
                      />
                      <Box
                        sx={{
                          p: 2,
                          textAlign: "center",
                          background: "#f3efff",
                          borderTop: "1px solid #e0dfff",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#6a0dad",
                            fontWeight: "bold",
                          }}
                        >
                          {category.name}
                        </Typography>
                      </Box>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Gallery;
