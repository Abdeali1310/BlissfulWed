/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-[350px] md:w-[500px] lg:w-[600px] flex items-center">
      <button
        onClick={handlePrev}
        className="absolute left-0 z-10 bg-white p-2 shadow-md rounded-full hover:bg-gray-200 transition"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-4"
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * 340 }} // Adjust slide movement
          transition={{ type: "spring", stiffness: 100 }}
        >
          {images.map((img, index) => (
            <Zoom key={index}>
              <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] flex justify-center items-center">
                <motion.img
                  src={img}
                  alt={`Service ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                  style={{
                    opacity: index === currentIndex ? 1 : 0.6,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                />
              </div>
            </Zoom>
          ))}
        </motion.div>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-0 z-10 bg-white p-2 shadow-md rounded-full hover:bg-gray-200 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageCarousel;
