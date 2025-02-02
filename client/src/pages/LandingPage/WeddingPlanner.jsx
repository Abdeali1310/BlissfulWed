import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent, TextField, CardMedia } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dummy data
const images = [
  "https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_wedding_Delhi.jpg",
  "https://i.pinimg.com/originals/de/77/2d/de772d8e09c146ba6167242d17b9f37d.jpg",
  "https://symphonyevents.com.au/wp-content/uploads/2023/06/30-scaled.jpg",
  "https://www.alfaazphotography.com/wp-content/uploads/2019/10/How-to-find-right-Indian-Wedding-Photographer-0028.jpg"
];

const services = [
  { title: "Photography", description: "Capture every moment beautifully.", image: "https://source.unsplash.com/400x300/?photography" },
  { title: "Decoration", description: "Elegant wedding themes & designs.", image: "https://source.unsplash.com/400x300/?wedding-decoration" },
  { title: "Music & DJ", description: "Make your wedding lively with the best DJs.", image: "https://source.unsplash.com/400x300/?dj" },
  { title: "Catering", description: "Delicious food for your special day.", image: "https://source.unsplash.com/400x300/?catering" }
];

const testimonials = [
  { name: "John Doe", review: "Amazing experience! The decorations and photography were top-notch." },
  { name: "Sarah Smith", review: "Our wedding was magical. The music was perfect!" }
];

// Slick slider settings for sliding services
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    { breakpoint: 960, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } }
  ]
};

const WeddingPlanner = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      
      {/* Navbar */}
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ cursor: "pointer" }}>
            Wedding Planner
          </Typography>
          <SearchIcon sx={{ cursor: "pointer" }} />
          <Button color="inherit">Sign In / Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* Carousel */}
      <Box sx={{ width: "100%", height: "400px", overflow: "hidden", mt: 2 }}>
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          {images.map((src, index) => (
            <img key={index} src={src} alt="Wedding" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
          ))}
        </Carousel>
      </Box>

      {/* Sliding Services Section */}
      <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>Our Services</Typography>
      <Box sx={{ maxWidth: "90%", mx: "auto", mt: 2 }}>
        <Slider {...sliderSettings}>
          {services.map((service, index) => (
            <Card key={index} sx={{ mx: 2 }}>
              <CardMedia component="img" height="200" image={service.image} alt={service.title} />
              <CardContent>
                <Typography variant="h6">{service.title}</Typography>
                <Typography variant="body2">{service.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </Box>

      {/* Gallery */}
      <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>Gallery</Typography>
      <Grid container spacing={3} sx={{ mt: 2, px: 2 }}>
        {images.map((img, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card>
              <CardMedia component="img" height="200" image={img} alt="Wedding Gallery" />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Testimonials */}
      <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>Testimonials</Typography>
      <Grid container spacing={3} sx={{ mt: 2, px: 2 }}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6">{testimonial.name}</Typography>
              <Typography variant="body2">{testimonial.review}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Form */}
      <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>Contact Us</Typography>
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 2, px: 2 }}>
        <TextField label="Name" variant="outlined" fullWidth sx={{ mb: 2 }} />
        <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 2 }} />
        <Button variant="contained" color="primary" fullWidth>Submit</Button>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: "center", mt: 4, py: 2, bgcolor: "primary.main", color: "white" }}>
        <Typography variant="body2">&copy; 2025 Wedding Planner. All rights reserved.</Typography>
      </Box>

    </Box>
  );
};

export default WeddingPlanner;