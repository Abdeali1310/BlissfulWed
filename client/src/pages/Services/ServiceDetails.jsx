/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Card, CardContent, Typography, Chip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";

const ServiceDetails = () => {
  const { serviceType } = useParams();
  const [services, setServices] = useState([]);

  async function fetchService() {
    await axios
      .get(`http://localhost:3000/api/v1/service/${serviceType}`)
      .then((res) => setServices(res.data.services))
      .catch((err) => console.error("Error fetching services:", err));
  }
  useEffect(() => {
    fetchService();
  }, [serviceType]);

  return (
    <div className="min-h-screen min-w-screen bg-pink-100 p-6 m-auto">
      {/* Back Button */}
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBack />}
        className="mb-6 text-pink-700"
      >
        Back
      </Button>

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-pink-800 italic"
      >
        {serviceType} Services
      </motion.h1>

      {/* Service Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        {services.map((service) => (
          <Link
            to={`/services/${serviceType}/${service._id}`}
            key={service._id}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative shadow-lg rounded-lg overflow-hidden bg-white"
            >
              {/* Bestseller Tag */}
              {service.isBestseller && (
                <Chip
                  label="Bestseller"
                  className="absolute top-2 left-2 bg-red-500 text-white"
                />
              )}

              {/* Service Image */}
              <img
                src={service.cardImage}
                alt={service.serviceType}
                className="w-full h-64 object-cover"
              />

              {/* Service Info */}
              <CardContent className="p-4">
                <Typography
                  variant="h5"
                  className="font-semibold text-pink-700 italic"
                >
                  {service.serviceType}
                </Typography>
                <Typography variant="body2" className="text-gray-700 mt-2">
                  {service.description}
                </Typography>

                {/* Pricing */}
                <div className="mt-4 flex items-center space-x-2">
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
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default ServiceDetails;
