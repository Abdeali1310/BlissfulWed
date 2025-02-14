/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Card, CardContent, Typography, Chip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ServiceDetails = () => {
  const { serviceType } = useParams();
  const [services, setServices] = useState([]);

  async function fetchService() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/service/${serviceType}`
      );
      setServices(res.data.services);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  }

  useEffect(() => {
    fetchService();
  }, [serviceType]);

  return (
    <div className="min-h-full overflow-y-scroll w-full bg-pink-100 flex flex-col">
      <Navbar />

      {/* Back Button and Title Container */}
      <div className="w-full flex items-center mt-10 justify-between px-6">
        <Button component={Link} to="/" className="p-0">
          <ArrowBack className="text-[#e73895] text-5xl" />
        </Button>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:text-4xl text-3xl font-bold text-[#e73895] text-center capitalize ml-3 mt-16 lg:mt-10 mb-5 w-full mx-auto"
        >
          {serviceType} Services
        </motion.h1>
        <div className="w-24"></div> {/* Placeholder to balance spacing */}
      </div>

      {/* Service Grid */}
      <div className="w-full flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mt-16 mb-24">
        {services.map((service) => (
          <Link
            to={`/service/${serviceType}/${service._id}`}
            key={service._id}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative shadow-lg rounded-xl overflow-hidden bg-white transition-transform duration-300 flex flex-col items-center text-center w-[300px]" // Fixed width for alignment
            >
              {/* Bestseller Tag */}
              {service.isBestseller && (
                <Chip
                  label="Bestseller"
                  className="absolute top-2 left-2 px-3 py-1 font-semibold"
                  style={{
                    backgroundColor: "#FFD1DC",
                    color: "#B00050",
                    fontFamily: "cursive",
                  }} // Baby pink background with darker pink text
                />
              )}

              {/* Service Image */}
              <img
                src={service.cardImage}
                alt={serviceType}
                className="w-full h-56 object-cover"
              />

              {/* Service Info */}
              <CardContent className="p-4 flex flex-col items-center">
                <Typography variant="body1">
                  <p className="text-pink-700 font-cursive font-bold text-xl mb-2">
                    {service.description}
                  </p>
                </Typography>

                {/* Pricing */}
                <div className="flex items-center space-x-3 mt-2">
                  <Typography
                    variant="h6"
                    className="text-gray-500 line-through"
                  >
                    ₹{service.price}
                  </Typography>
                  <Typography variant="h5" className="text-pink-700 font-bold">
                    ₹{service.price - (service.price * service.discount) / 100}
                  </Typography>
                </div>

                {/* Reviews */}
                <Typography variant="body2" className="text-gray-600 mt-1">
                  ⭐ {service.rating} ({service.reviewsCount} reviews)
                </Typography>
              </CardContent>

              {/* Tags Section */}
              {service.tags?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 pb-2 w-full ">
                  {service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-semibold px-6 py-2 bg-pink-200 text-pink-700 rounded-full"
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
    </div>
  );
};

export default ServiceDetails;
