import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";

// Import images from the assets folder
import BasicImage from "../assets/bg.jpg";
import PremiumImage from "../assets/pinkwater.jpg";
import LuxuryImage from "../assets/BG1.jpg";

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/packages")
            .then(response => setPackages(response.data))
            .catch(error => console.error(error));
    }, []);

    // Map package names to images
    const packageImages = {
        "Basic Package": BasicImage,
        "Premium Package": PremiumImage,
        "Luxury Package": LuxuryImage
    };

    return (
        <Container sx={{ py: 6 }}>
            <Typography 
                variant="h4" 
                textAlign="center" 
                fontWeight="bold" 
                mb={4}
                sx={{ color: "#ff4081" }}
            >
                Our Exclusive Wedding Packages
            </Typography>

            {/* Centering Grid Items */}
            <Grid 
                container 
                spacing={4} 
                justifyContent="center" // Center the grid items
            >
                {packages.map((pkg) => (
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        key={pkg._id} 
                        sx={{ display: "flex", justifyContent: "center" }} // Center each item
                    >
                        <Card 
                            sx={{ 
                                position: "relative", 
                                borderRadius: 3, 
                                boxShadow: 4,
                                overflow: "hidden",
                                height: "300px",
                                width: "100%", // Ensures consistent size
                                maxWidth: "350px", // Limits max width for better alignment
                                transition: "0.3s",
                                "&:hover": { boxShadow: 8, transform: "scale(1.03)" }
                            }}
                        >
                            {/* Background Image */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundImage: `url(${packageImages[pkg.name] || BasicImage})`, 
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    filter: "brightness(0.7)",
                                }}
                            />

                            {/* Overlay Content */}
                            <CardContent sx={{ 
                                position: "relative", 
                                zIndex: 2, 
                                color: "#fff", 
                                textAlign: "center",
                                mt: "30%", // Moves content down
                            }}>
                                <Typography variant="h5" fontWeight="bold">
                                    {pkg.name}
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    fontWeight="bold" 
                                    sx={{ fontSize: "1.5rem", color: "#ffeb3b" }}
                                >
                                    ${pkg.price}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ fontStyle: "italic", color: "#f8bbd0" }}
                                >
                                    {pkg.features ? pkg.features.join(", ") : "No features listed"}
                                </Typography>

                                <Button 
                                    variant="contained" 
                                    sx={{
                                        mt: 2, 
                                        background: "linear-gradient(45deg, #ff4081, #ff79b0)",
                                        color: "#fff",
                                        "&:hover": { background: "linear-gradient(45deg, #ff79b0, #ff4081)" }
                                    }}
                                >
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Packages;