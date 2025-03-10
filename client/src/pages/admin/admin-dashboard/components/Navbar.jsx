/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  MdNotifications,
  MdOutlineDarkMode,
  MdLightMode,
  MdAdd,
} from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);

  const breadcrumb = location.pathname
    .split('/')
    .filter((crumb) => crumb !== 'admin')
    .map((crumb) => crumb.charAt(0).toUpperCase() + crumb.slice(1));

  return (
    <nav className="flex xl:w-[84%] xl:pr-24 items-center justify-between w-full lg:w-3/4 xl:w-4/5 bg-white shadow-md px-6 py-1 border-b">
      {/* Site Name */}
      <h1 className="text-xl ml-12 lg:ml-5 hidden md:block font-bold text-[#e73895]">
        Admin Dashboard
      </h1>
      <p className="text-xl ml-12 md:hidden font-bold text-[#e73895]">
        Admin
      </p>
      

      {/* Right Section (Icons & Profile) Always Visible */}
      <div className="flex  md:ml-0 items-center gap-8">
        {/* Quick Action Button */}
        <button
          className="bg-[#e73895] text-white px-3 py-2 rounded-lg flex items-center shadow-md hover:bg-pink-500"
          aria-label="Add"
        >
          <MdAdd size={20} className="mr-1" /> Add
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <MdNotifications
            size={26}
            className="text-gray-600 cursor-pointer"
            aria-label="Notifications"
          />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {notifications}
            </span>
          )}
        </div>

        
        {/* Admin Profile */}
        <div className="relative flex flex-col items-center group">
          <img
            src="https://via.placeholder.com/40"
            alt="Admin"
            className="w-10 h-10 rounded-full border-2 border-[#e73895]"
          />
          <span className="text-gray-700 font-semibold">Admin</span>
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