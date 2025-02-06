import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
// import hp1 from "../../assets/haldi1.jpg";
import hp3 from "../../assets/haldi3.jpg";
import mp3 from "../../assets/mehndi3.jpg";
import rp from "../../assets/ringImg.jpg";
import wp from "../../assets/wedImg.jpg";
import wp4 from "../../assets/weddingImg4.jpg";

const services = [
  { title: 'Silver Package', price: '$1,500', image: wp },
  { title: 'Gold Package', price: '$3,000', image: hp3 },
  { title: 'Platinum Package', price: '$5,000', image: mp3 },
  { title: 'Diamond Package', price: '$7,500', image: wp },
  { title: 'Royal Package', price: '$10,000', image: rp },
  { title: 'Luxury Package', price: '$15,000', image: wp4 },
  { title: 'Royal Package', price: '$10,000', image: rp },
  { title: 'Luxury Package', price: '$15,000', image: wp4 },
];

const Services = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Our Services
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {services.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card sx={{ height: 350, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="200" // Fixed height for images
                image={service.image}
                alt={service.title}
                sx={{ objectFit: 'cover', width: '100%' }} // Ensure the image covers the entire area
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" textAlign="center">
                  {service.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
