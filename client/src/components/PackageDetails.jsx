import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

const PackageDetails = () => {
  const { packageName } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const formattedPackageName = packageName.replace(/-/g, " "); // Convert hyphens to spaces

    fetch(`http://localhost:3000/api/packages/${formattedPackageName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Package not found");
        }
        return res.json();
      })
      .then((data) => {
        setPackageDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [packageName]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!packageDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">Package not found!</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vh" p={3}>
      <Paper elevation={6} sx={{ padding: 4, maxWidth: 600, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#e91e63", fontFamily: "cursive" }}>
          {packageDetails.name}
        </Typography>
        
        <Typography variant="h4" sx={{ color: "#5A3825", mt: 2 }}>
          Price: ₹{packageDetails.price}
        </Typography>
        
        <Typography variant="body1" sx={{ mt: 2, color: "#7D5A4F", fontSize: "1.2rem" }}>
          {packageDetails.description}
        </Typography>

        <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold", color: "#d81b60" }}>
          Features:
        </Typography>
        
        <Box component="ul" sx={{ textAlign: "left", mt: 1, paddingLeft: 3 }}>
          {Object.entries(packageDetails.features || {}).map(([category, items]) => (
            <Typography component="li" key={category} sx={{ color: "#555", fontSize: "1.1rem", mb: 1 }}>
              <strong style={{ color: "#880e4f" }}>{category}:</strong> {Array.isArray(items) ? items.join(", ") : items}
            </Typography>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default PackageDetails;