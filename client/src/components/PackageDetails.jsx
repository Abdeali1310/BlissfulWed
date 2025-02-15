import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

// Import images
import BasicImage from "../assets/bg.jpg";
import PremiumImage from "../assets/pinkwater.jpg";
import LuxuryImage from "../assets/BG1.jpg";

const packageImages = {
  basic: BasicImage,
  premium: PremiumImage,
  luxury: LuxuryImage,
};

const PackageDetails = () => {
  const { packageType } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/packages/${packageType}`)
      .then(response => setPackageData(response.data))
      .catch(error => console.error(error));
  }, [packageType]);

  if (!packageData) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ py: 6 }}>
      <Card sx={{ boxShadow: 5, borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            height: "300px",
            backgroundImage: `url(${packageImages[packageType] || BasicImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#ff4081" }}>
            {packageData.name}
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#ffeb3b" }}>
            Price: ${packageData.price}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {packageData.description || "No additional details available."}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PackageDetails;
