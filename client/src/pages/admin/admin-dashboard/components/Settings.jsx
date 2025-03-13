/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

const Settings = () => {
  const translations = {
    en: {
      settings: "Settings",
      fontSize: "Font Size",
      profileVisibility: "Profile Visibility",
      notifications: "Enable Notifications",
      timezone: "Timezone",
    },
  };

  // Load saved preferences from localStorage
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("fontSize") || 16;
  });

  const [profileVisibility, setProfileVisibility] = useState(() => {
    return localStorage.getItem("profileVisibility") || "public";
  });

  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("notifications") === "true";
  });

  const [timezone, setTimezone] = useState(() => {
    return localStorage.getItem("timezone") || "UTC";
  });

  // Apply font size on mount
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  // Update localStorage when settings change
  useEffect(() => {
    localStorage.setItem("profileVisibility", profileVisibility);
  }, [profileVisibility]);

  useEffect(() => {
    localStorage.setItem("notifications", notifications);
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("timezone", timezone);
  }, [timezone]);

  return (
    <div className="settings h-[80vh] w-[45vh] lg:h-100vh lg:w-full dark:bg-gray-900 dark:text-white p-6 rounded-md w-[75%] shadow-md">
      <h1 className="text-2xl font-bold">{translations.en.settings}</h1>

      {/* Font Size Adjustment */}
      <div className="my-4 flex items-center gap-4">
        <label>{translations.en.fontSize}:</label>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="slider"
        />
        <span>{fontSize}px</span>
      </div>

      {/* Profile Visibility */}
      <div className="my-4">
        <label>{translations.en.profileVisibility}:</label>
        <select
          value={profileVisibility}
          onChange={(e) => setProfileVisibility(e.target.value)}
          className="border dark:bg-gray-800 p-2 rounded w-full"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friends">Friends Only</option>
        </select>
      </div>

      {/* Notifications Toggle */}
      <div className="my-4 flex items-center gap-4">
        <label>{translations.en.notifications}:</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="w-5 h-5"
        />
      </div>

      {/* Timezone Selection */}
      <div className="my-4">
        <label>{translations.en.timezone}:</label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="border dark:bg-gray-800 p-2 rounded w-full"
        >
          <option value="UTC">UTC</option>
          <option value="IST">IST (Indian Standard Time)</option>
          <option value="EST">EST (Eastern Standard Time)</option>
          <option value="PST">PST (Pacific Standard Time)</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
