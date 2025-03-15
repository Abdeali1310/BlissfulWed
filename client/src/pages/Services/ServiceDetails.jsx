/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Button,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import haldi from "../../assets/haldi.mp4";
import mehndi from "../../assets/mehndi.mp4";
import catering from "../../assets/catering.mp4";
import decoration from "../../assets/decoration.mp4";
import music from "../../assets/music-&-dj.mp4";
import bride from "../../assets/bridal-makeup.mp4";
import groom from "../../assets/groom-wear.mp4";
import photography from "../../assets/photography.mp4";

// Mapping serviceType to video files
const videoMap = {
  haldi: haldi,
  mehndi: mehndi,
  catering: catering,
  decoration: decoration,
  "music-&-dj": music,
  "bridal-makeup": bride,
  "groom-wear": groom,
  photography: photography,
};

const ServiceDetails = () => {
  const { serviceType } = useParams();
  console.log("Service Type:", serviceType);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the correct video source
  const videoSrc = videoMap[serviceType] || null;
  if (!videoSrc) {
    console.warn(`No video found for: ${serviceType}`);
  }
  console.log("Video Source:", videoSrc);

  async function fetchService() {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/v1/service/${serviceType}`
      );
      setServices(res.data.services);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchService();
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, [serviceType]);

  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="relative min-h-screen w-full flex flex-col"
    >
      <Navbar />
      {/* Background Video */}
      {videoSrc && (
        <div className="absolute top-20 left-0 w-screen overflow-hidden min-h-full h-[363vh] md:h-[200vh] lg:h-[142vh] xl:h-[129vh] z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Overlay for cool dark effect */}
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
      )}
      {/* Back Button and Title */}
      <div className="w-full flex items-center mt-10 justify-between px-6 relative z-10">
        <Button component={Link} to="/" className="p-0">
          <ArrowBack className="text-white text-5xl" />
        </Button>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:text-4xl text-3xl font-bold text-[#e73895] text-center capitalize ml-3 mt-16 lg:mt-10 mb-5 w-full mx-auto"
        >
          {serviceType} Services
        </motion.h1>
        <div className="w-24"></div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[300px]">
          <CircularProgress color="secondary" size={50} />
        </div>
      ) : (
        <>
          <div className="w-full flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mt-16 mb-24 relative z-10">
            {services.map((service) => (
              <Link
                to={`/service/${serviceType}/${service._id}`}
                key={service._id}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative shadow-lg rounded-xl overflow-hidden bg-white transition-transform duration-300 flex flex-col items-center text-center w-[300px]"
                >
                  {service.isBestseller && (
                    <Chip
                      label="Bestseller"
                      className="absolute top-2 left-2 px-3 py-1 font-semibold"
                      style={{
                        backgroundColor: "#FFD1DC",
                        color: "#B00050",
                        fontFamily: "cursive",
                      }}
                    />
                  )}

                  <img
                    src={service.cardImage}
                    alt={serviceType}
                    className="w-full h-56 object-cover"
                  />

                  <CardContent className="p-4 flex flex-col items-center">
                    <Typography variant="body1">
                      <p className="text-pink-700 font-cursive font-bold text-xl mb-2">
                        {service.description}
                      </p>
                    </Typography>

                    <div className="flex items-center space-x-3 mt-2">
                      <Typography
                        variant="h6"
                        className="text-gray-500 line-through"
                      >
                        ₹{service.price}
                      </Typography>
                      <Typography
                        variant="h5"
                        className="text-pink-700 font-bold"
                      >
                        ₹
                        {service.price - (service.price * service.discount) / 100}
                      </Typography>
                    </div>

                    
                  </CardContent>

                  {/* Tags Section */}
                  {service.tags?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 pb-2 w-full">
                      {service.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-6 py-2 bg-pink-200 font-bold text-pink-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}

            {/* Dummy elements for even row alignment */}
            {services.length % 3 === 2 && <div className="w-[300px]"></div>}
            {services.length % 3 === 1 && (
              <>
                <div className="w-[300px]"></div>
                <div className="w-[300px]"></div>
              </>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ServiceDetails;
