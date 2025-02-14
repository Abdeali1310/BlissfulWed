import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, Typography, Grid, Container, Box } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const Gallery = () => {
  // State for Images
  const [weddingEvents, setWeddingEvents] = useState([]);

  // Fetch Images from Backend
  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/gallery");
      setWeddingEvents(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Call fetchImages when component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        background: "linear-gradient(to bottom right, #ffe1e8, #ffbedb, #ff99cc)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg" sx={{ py: 3, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#9e3d64",
            mb: 4,
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          Wedding Gallery
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {weddingEvents.map((event, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={event.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                style={{ width: "100%" }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 4,
                    overflow: "hidden",
                    width: "100%",
                    height: { xs: 300, sm: 350, md: 400 },
                  }}
                >
                  <CardActionArea component={Link} to={`/gallery/album/${event.id}`}>
                    <Box sx={{ position: "relative", height: "100%" }}>
                      <CardMedia
                        component="img"
                        image={event.image}
                        alt={event.title}
                        sx={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          width: "100%",
                          color: "#fff",
                          background: "rgba(0,0,0,0.3)",
                          textAlign: "center",
                          py: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        >
                          {event.title}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Gallery;