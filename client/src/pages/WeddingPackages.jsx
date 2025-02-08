import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import bgImage from "../assets/bg.jpg";
import bg2 from "../assets/pinkwater.jpg";
import bg3 from "../assets/BG1.jpg";

const packages = [
  {
    name: "Basic",
    price: "$999",
    features: ["Venue Decoration", "Basic Catering", "Photography"],
    image: bgImage,
  },
  {
    name: "Standard",
    price: "$1999",
    features: ["Premium Decoration", "Buffet Catering", "Photography & Videography"],
    image: bg2,
  },
  {
    name: "Premium",
    price: "$2999",
    features: ["Luxury Decoration", "Gourmet Catering", "Full Wedding Coverage"],
    image: bg3,
  },
];

function WeddingPackage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "50px", background: "#f7f7f7", position: "relative" }}>
      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: "bold", color: "#e91e63" }}>
        Wedding Packages
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {packages.map((pkg, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                textAlign: "center",
                borderRadius: "15px",
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardMedia component="img" height="200" image={pkg.image} alt={`${pkg.name} package`} />
              <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold">
                  {pkg.name} Package
                </Typography>
                <Typography variant="h6" color="primary">
                  {pkg.price}
                </Typography>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {pkg.features.map((feature, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      <CheckCircleIcon color="secondary" /> {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: "20px", mt: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default WeddingPackage;