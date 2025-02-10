import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Gallery = () => {
  const navigate = useNavigate();

  // Sample couples data (replace with actual API data when backend is ready)
  const [couples] = useState([
    {
      _id: "1",
      name: "John & Emily",
      image:
        "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg",
    },
    {
      _id: "2",
      name: "Mike & Sarah",
      image:
        "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg",
    },
    {
      _id: "3",
      name: "David & Anna",
      image:
        "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
    },
    {
      _id: "4",
      name: "James & Olivia",
      image:
        "https://images.pexels.com/photos/1779418/pexels-photo-1779418.jpeg",
    },
    {
      _id: "5",
      name: "William & Sophia",
      image:
        "https://plus.unsplash.com/premium_photo-1682090789715-a1acbfe72404?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwd2VkZGluZyUyMGNvdXBsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      _id: "6",
      name: "Ethan & Isabella",
      image:
        "https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg",
    },
    {
      _id: "7",
      name: "Liam & Mia",
      image:
        "https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwd2VkZGluZyUyMGNvdXBsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      _id: "8",
      name: "Benjamin & Ava",
      image:
        "https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwd2VkZGluZyUyMGNvdXBsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      _id: "9",
      name: "Henry & Evelyn",
      image:
        "https://images.pexels.com/photos/2959200/pexels-photo-2959200.jpeg",
    },
    {
      _id: "10",
      name: "Samuel & Harper",
      image:
        "https://images.unsplash.com/photo-1610173826608-bd1f53a52db1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluZGlhbiUyMHdlZGRpbmclMjBjb3VwbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      _id: "11",
      name: "Daniel & Lily",
      image:
        "https://images.unsplash.com/photo-1481841580057-e2b9927a05c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMHdlZGRpbmclMjBjb3VwbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      _id: "12",
      name: "Joseph & Scarlett",
      image: "https://images.unsplash.com/photo-1505428215601-90f0007b9e83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGluZGlhbiUyMHdlZGRpbmclMjBjb3VwbGV8ZW58MHx8MHx8fDA%3D",
    },
    {
      _id: "13",
      name: "Andrew & Chloe",
      image: "https://images.pexels.com/photos/231064/pexels-photo-231064.jpeg",
    },
    {
      _id: "14",
      name: "Nathan & Victoria",
      image:
        "https://images.pexels.com/photos/1779419/pexels-photo-1779419.jpeg",
    },
    {
      _id: "15",
      name: "Elijah & Madison",
      image:
        "https://images.pexels.com/photos/2959195/pexels-photo-2959195.jpeg",
    },
  ]);

  return (
    <div className="p-6 min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-pink-200 to-pink-50 bg-cover bg-center">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {/* Gallery Grid */}
      <div className="mt-16 w-full max-w-screen-xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {couples.length > 0 ? (
            couples.map((couple) => (
              <motion.div
                key={couple._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer border rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 w-full"
                onClick={() => navigate(`/gallery/${couple._id}`)}
              >
                <img
                  src={couple.image}
                  alt={couple.name}
                  className="w-full h-72 object-cover rounded-t-xl"
                />
                <div className="text-center p-4 font-semibold text-lg text-gray-700">
                  {couple.name}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-lg text-gray-600 text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
