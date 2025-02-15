import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, CircularProgress, CardMedia } from "@mui/material";
import { motion } from "framer-motion";

// Import images
import basicImg from "../assets/basic.png";
import premiumImg from "../assets/premium.jpg";
import luxuryImg from "../assets/luxury.jpg";
import defaultImg from "../assets/pinkwater.jpg"; // Fallback image

// Map package names to images
const packageImages = {
  basic: basicImg,
  premium: premiumImg,
  luxury: luxuryImg,
};

const PackageDetails = () => {
  const { packageName } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/packages/${packageName}`)
      .then((res) => res.json())
      .then((data) => {
        setPackageDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
        setLoading(false);
      });
  }, [packageName]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!packageDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          Package not found!
        </Typography>
      </Box>
    );
  }

  // Extract package name and remove "package" for better matching
  const formattedName = packageDetails.name.toLowerCase().replace(" package", "").trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          paddingX: 3,
          paddingY: 5, // Prevents content from sticking too high
          overflowY: "auto", // Allows scrolling if content overflows in landscape mode
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 800,
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(to bottom, #fff8e1, #ffecb3)",
            textAlign: "center",
            flexShrink: 0, // Prevents stretching issues
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontFamily: "cursive",
              color: "#e10098",
              marginBottom: 3,
            }}
          >
            {packageDetails.name}
          </Typography>

          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              padding: 3,
              background: "#fff",
            }}
          >
            <CardMedia
              component="img"
              image={packageImages[formattedName] || defaultImg}
              alt={packageDetails.name}
              sx={{
                objectFit: "cover",
                borderRadius: 2,
                width: "100%",
                maxHeight: "50vh", // Ensures the image does not take up too much space in landscape mode
                marginBottom: 2,
              }}
            />

            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "600", color: "#5A3825" }}>
                Price: ${packageDetails.price}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 2, color: "#7D5A4F" }}>
                {packageDetails.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </motion.div>
  );
};

export default PackageDetails;