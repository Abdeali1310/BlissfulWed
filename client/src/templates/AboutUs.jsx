/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <div className="bg-pink-100 min-h-screen  py-12 px-6 md:px-16 lg:px-32 text-gray-800">
      <motion.h1
        className="text-5xl font-cursive font-extrabold text-center text-pink-600 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About BlissfulWed
      </motion.h1>
      
      <motion.p
        className="text-lg text-center  max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        "Your Dream Wedding, Just a Click Away!" 💍 At BlissfulWed, we believe every love story deserves a grand celebration. We're here to turn your wedding dreams into a seamless, stress-free reality.
      </motion.p>
      
      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <motion.div
          className="p-6 bg-white shadow-lg rounded-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-cursive text-pink-500 mb-4">Who We Are</h2>
          <p>
            We are a team of passionate designers, developers, and wedding enthusiasts dedicated to making wedding planning easy and magical. Whether it's a grand affair or an intimate celebration, we bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white shadow-lg rounded-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-cursive text-pink-500 mb-4">Why We Do It</h2>
          <p>
            Weddings are once-in-a-lifetime events, and we believe every couple deserves a smooth, joyful, and personalized planning experience. Our mission? To make weddings as stress-free as love should be. ❤️
          </p>
        </motion.div>
      </div>
      
      <motion.div
        className="mt-12 p-6 bg-pink-200 text-center rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-cursive text-pink-600 mb-4">"More Love, Less Hassle!"</h2>
        <p>
          From finding inspiration to finalizing your dream day, BlissfulWed is with you at every step. So relax, breathe, and let’s create magic together!
        </p>
      </motion.div>
    </div>
  );
}