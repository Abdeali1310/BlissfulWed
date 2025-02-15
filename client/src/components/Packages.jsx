import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Import images
import basicImg from "../assets/basic.png";
import premiumImg from "../assets/premium.jpg";
import luxuryImg from "../assets/luxury.jpg";

// Map package names to images
const packageImages = {
  "basic package": basicImg,
  "premium package": premiumImg,
  "luxury package": luxuryImg,
};

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  return (
    <Box
      sx={{
        marginY: 5,
        paddingY: 5,
        paddingX: 5,
        marginTop: "8rem",
        paddingBottom: "8rem",
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
          fontFamily: "cursive",
          color: "#e10098",
        }}
      >
        Our Wedding Packages
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {packages.map((pkg, index) => {
          const formattedName = pkg.name.toLowerCase(); // Convert to lowercase
          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Link
                  to={`/packages/${formattedName.replace(/\s+/g, "-")}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      overflow: "hidden",
                      background: "#fff",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    {/* Display package image */}
                    <CardMedia
                      component="img"
                      height="180"
                      image={packageImages[formattedName] || basicImg} // Default if not found
                      alt={pkg.name}
                      sx={{ objectFit: "cover" }}
                    />

                    <CardContent sx={{ padding: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                          color: "#5A3825",
                        }}
                      >
                        {pkg.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Packages;