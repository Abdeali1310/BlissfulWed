/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MdNotifications,
  MdOutlineDarkMode,
  MdLightMode,
  MdAdd,
  MdHelpOutline,
  MdSettings,
} from "react-icons/md";
import { useLocation } from "react-router-dom";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const adminId = localStorage.getItem("admin"); // Retrieve admin ID from localStorage

      if (!adminId) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/admin/${adminId}`,
          {
            withCredentials: true,
          }
        );

        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmin();
  }, []);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const breadcrumb = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "admin")
    .map((crumb) => crumb.charAt(0).toUpperCase() + crumb.slice(1));

  return (
    <nav className="flex xl:w-[84%] xl:pr-24 items-center justify-between w-full lg:w-3/4 xl:w-4/5 bg-white shadow-md px-6 py-1 border-b">
      {/* Site Name */}
      <h1 className="text-xl ml-12 lg:ml-5 hidden md:block font-bold text-[#e73895]">
        Admin Dashboard
      </h1>
      <p className="text-xl ml-12 md:hidden font-bold text-[#e73895]">Admin</p>

      {/* Right Section (Icons & Profile) */}
      <div className="flex md:ml-0 items-center gap-8">
        {/* Date & Time */}
        <div className=" hidden lg:block text-gray-700 font-semibold">
          {dateTime.toLocaleDateString()} | {dateTime.toLocaleTimeString()}
        </div>

        <div className="flex items-center gap-2">
  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
  <span className="text-sm text-gray-600">Online</span>
</div>


        {/* Admin Profile */}
        <div className="relative mr-2 flex flex-col items-center group">
          <img
            src={admin?.profilePic || "https://via.placeholder.com/40"}
            alt="Admin"
            className="w-10 h-10 rounded-full border-2 border-[#e73895] object-cover"
          />
          <span className="text-gray-700 font-semibold">
            {admin?.name
              ? admin.name.charAt(0).toUpperCase() + admin.name.slice(1)
              : "Admin"}
          </span>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Navbar;
