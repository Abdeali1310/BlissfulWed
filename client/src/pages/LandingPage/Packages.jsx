import React, { useEffect, useRef } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import hp1 from "../../assets/haldi1.jpg";
import hp3 from "../../assets/haldi3.jpg";
import mp3 from "../../assets/mehndi3.jpg";
import rp from "../../assets/ringImg.jpg";
import wp from "../../assets/wedImg.jpg";
import wp4 from "../../assets/weddingImg4.jpg";

const packages = [
  { title: 'Silver Package', price: '$1,500', image: wp },
  { title: 'Gold Package', price: '$3,000', image: hp3 },
  { title: 'Platinum Package', price: '$5,000', image: mp3 },
  { title: 'Diamond Package', price: '$7,500', image: wp },
  { title: 'Royal Package', price: '$10,000', image: rp },
  { title: 'Luxury Package', price: '$15,000', image: wp4 },
];

const Packages = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollAmount += 1;
        if (scrollAmount >= scrollContainer.scrollWidth) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    const interval = setInterval(autoScroll, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f4f4f4', p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Wedding Packages
      </Typography>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          gap: 2,
          p: 2,
          '@media (max-width:600px)': {
            gap: 1, // Less gap on mobile
            overflowX: 'scroll',
          },
        }}
      >
        {[...packages, ...packages].map((pkg, index) => (
          <Card
            key={index}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              minWidth: 250,
              maxWidth: 300,
              flex: '0 0 auto',
              borderRadius: 3,
              boxShadow: 3,
              transition: 'transform 0.3s ease-in-out',
              '@media (max-width:600px)': {
                minWidth: 200, // Smaller cards on mobile
                maxWidth: 250,
              },
              '@media (min-width:600px) and (max-width:1024px)': {
                minWidth: 230, // Adjust size for tablets
                maxWidth: 280,
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={pkg.image}
              alt={pkg.title}
              sx={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
              }}
            />
            <CardContent>
              <Typography variant="h6" textAlign="center">
                {pkg.title}
              </Typography>
              <Typography variant="body1" textAlign="center" color="text.secondary">
                {pkg.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Packages;
