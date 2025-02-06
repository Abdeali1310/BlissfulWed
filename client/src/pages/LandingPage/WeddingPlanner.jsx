import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { InputBase, TextField, CircularProgress } from "@mui/material";

import hp1 from "../../assets/haldi1.jpg"
// import hp2 from "../../assets/haldi2.jpg"
import hp3 from "../../assets/haldi3.jpg"
// import hp4 from "../../assets/haldi4.jpg"
import mp1 from "../../assets/mehndi1.jpg"
import mp2 from "../../assets/mehndi2.jpg"
import mp3 from "../../assets/mehndi3.jpg"
import rp from "../../assets/ringImg.jpg"
import wp1 from "../../assets/weddingImg1.jpg"
import wp2 from "../../assets/weddingImg2.jpg"
import wp3 from "../../assets/weddingImg3.jpg"
import wp4 from "../../assets/weddingImg4.jpg"
// import wp5 from "../../assets/weddingImg5.jpg"
import wp from "../../assets/wedImg.jpg"
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import Services from "./Services";
import Packages from "./Packages";
import Navbar from "./Navbar";

const weddingImages = [wp1, wp2, wp3, wp4];

const initialServices = [
  { title: "Haldi", image: hp3 },
  { title: "Mehndi", image: mp3 },
  { title: "Catering", image: rp },
  { title: "Decoration", image: wp2 },
  { title: "Music & DJ", image: hp1 },
  { title: "Bridal Makeup", image: mp1 },
  { title: "Event Planning", image: mp2 },
  { title: "Transportation", image: wp },
];



const packages = [
  { title: "Basic Package", price: "$5000" },
  { title: "Premium Package", price: "$10000" },
  { title: "Luxury Package", price: "$20000" },
];

function WeddingPlanner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Filter services based on the search query
    const filteredResults = services.filter((service) =>
      service.title.toLowerCase().includes(query.toLowerCase())
    );    
    setResults(filteredResults);
  };

  const loadMoreServices = () => {
    setLoading(true);
    setTimeout(() => {
      const newServices = services.map((service) => ({
        ...service,
        title: service.title + " (New)",
      }));
      setServices((prev) => [...prev, ...newServices]);
      setLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 5 && !loading) {
      loadMoreServices();
    }
  };

  return (
    <Box sx={{ width: "100vw", maxWidth: "100%", overflowX: "hidden" }}>
    <Navbar/>

      {/* Wedding Carousel */}
      <Box sx={{ width: "100vw", textAlign: "center", marginY: 4 }}>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          {weddingImages.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Wedding ${index + 1}`}
              sx={{ width: "100%", height: "600px", objectFit: "cover" }}
            />
          ))}
        </Carousel>
      </Box>
      <Services/> 
      <Packages/>
      <ContactUs/>
      <Footer />
    </Box>
  );
}

export default WeddingPlanner;
