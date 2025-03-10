/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTimes } from "react-icons/fa"; // ✅ Import icons

const SearchBox = ({ placeholder = "Search services..." }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/search?q=${query}`);
        console.log("Search API response:", data);
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching search results", error);
        setResults([]);
      }
    };

    const debounceTimer = setTimeout(fetchServices, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (serviceId, serviceType) => {
    navigate(`/service/${serviceType}/${serviceId}`);
    setShowResults(false);
  };

  return (
    <div className="m-4 text-black hidden md:block relative w-full max-w-md">
      <div className="relative w-[50vh] lg:w-[70vh]">
        {/* Search Icon */}
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

        {/* Input Field */}
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full bg-pink-200 pl-10 pr-10 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-300 outline-none"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {showResults && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 shadow-md rounded-md w-[50vh] lg:w-[70vh] max-h-80 overflow-y-auto z-50">
          {results.map((service) => (
            <div
              key={service._id}
              onMouseDown={() => handleSelect(service._id, service.serviceType)}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <img
                  src={service.cardImage}
                  alt={service.serviceType}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium font-cursive text-[#E73895]">{service.serviceType.toUpperCase()}</p>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
