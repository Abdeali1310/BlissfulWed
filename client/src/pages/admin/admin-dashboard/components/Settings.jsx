/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

const Settings = () => {
  const translations = {
    en: {
      settings: "Settings",
      theme: "Dark Mode",
      fontSize: "Font Size",
      requestDeletion: "Request Account Deletion",
      securityLogs: "Security Logs and Alerts",
      noLogs: "No security logs available at this time.",
      language: "Language",
    },
    es: {
      settings: "Configuraciones",
      theme: "Modo Oscuro",
      fontSize: "Tamaño de Fuente",
      requestDeletion: "Solicitar Eliminación de Cuenta",
      securityLogs: "Registros de Seguridad y Alertas",
      noLogs: "No hay registros de seguridad disponibles en este momento.",
      language: "Idioma",
    },
    fr: {
      settings: "Paramètres",
      theme: "Mode Sombre",
      fontSize: "Taille de la Police",
      requestDeletion: "Demander la Suppression du Compte",
      securityLogs: "Journaux de Sécurité et Alertes",
      noLogs: "Aucun journal de sécurité disponible pour le moment.",
      language: "Langue",
    },
    hi: {
      settings: "सेटिंग्स",
      theme: "डार्क मोड",
      fontSize: "फ़ॉन्ट आकार",
      requestDeletion: "खाता हटाने का अनुरोध करें",
      securityLogs: "सुरक्षा लॉग और अलर्ट",
      noLogs: "इस समय कोई सुरक्षा लॉग उपलब्ध नहीं है।",
      language: "भाषा",
    },
  };

  // Load preferences from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("fontSize") || 16;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  // Apply dark mode & font size on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const requestAccountDeletion = () => {
    if (window.confirm("Are you sure you want to request account deletion?")) {
      alert("Account deletion requested.");
    }
  };

  return (
    <div className="settings h-[80vh] w-[45vh] lg:h-100vh lg:w-full dark:bg-gray-900 dark:text-white p-6 rounded-md w-[75%] shadow-md">
      <h1 className="text-2xl font-bold">{translations[language].settings}</h1>

      {/* Dark Mode Toggle */}
      <div className="my-4 flex items-center gap-4">
        <label>{translations[language].theme}:</label>
        <button
          onClick={toggleTheme}
          className={`px-4 py-1 rounded ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"}`}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>
      </div>

      {/* Language Selection */}
      <div className="my-4 flex items-center gap-4">
        <label>{translations[language].language}:</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border dark:bg-gray-800 p-2 rounded"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>

      {/* Font Size Adjustment */}
      <div className="my-4 flex items-center gap-4">
        <label>{translations[language].fontSize}:</label>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="slider"
        />
        <span>{fontSize}px</span>
      </div>

      {/* Request Account Deletion */}
      <div className="my-4">
        <button
          onClick={requestAccountDeletion}
          className="bg-red-500 dark:bg-red-700 text-white px-3 py-1 rounded"
        >
          {translations[language].requestDeletion}
        </button>
      </div>

      {/* Security Logs and Alerts */}
      <div className="my-4">
        <h2 className="text-xl">{translations[language].securityLogs}</h2>
        <p>{translations[language].noLogs}</p>
      </div>
    </div>
  );
};

export default Settings;
