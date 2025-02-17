/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="bg-pink-50 min-h-screen w-screen overflow-y-scroll py-12 px-6 md:px-16 lg:px-24 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-2xl border border-gray-200">
        <h1 className="text-5xl font-bold text-pink-600 font-cursive mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-lg text-center mb-8 italic">
          "Your trust is our biggest commitment."
        </p>

        {/* Introduction */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to BlissfulWed! We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">2. Information We Collect</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Personal details such as name, email, and contact information.</li>
            <li>Booking and event preferences to enhance your experience.</li>
            <li>Payment information for secure transactions.</li>
            <li>Usage data, including cookies and analytics, for website improvement.</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">3. How We Use Your Information</h2>
          <p className="text-gray-700">
            Your data is used to personalize your experience, process transactions, and improve our services. We do not sell your data to third parties.
          </p>
        </section>

        {/* Data Protection & Security */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">4. Data Protection</h2>
          <p className="text-gray-700">
            We implement industry-standard security measures to protect your data. However, no online service is 100% secure, and we encourage users to take necessary precautions.
          </p>
        </section>

        {/* Cookies & Tracking */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">5. Cookies & Tracking</h2>
          <p className="text-gray-700">
            We use cookies to improve user experience. You can manage your cookie preferences in your browser settings.
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">6. Data security</h2>
          <p className="text-gray-700">
            We store you passwords in encrypted form thus maintaining data security in case of data breach.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">7. Changes to Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Users will be notified of significant changes.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at {" "}
            <Link to={"/contact-us"} style={{ color:"magenta", textDecoration:"underline"}}>Contact Us</Link>
          </p>
        </section>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} BlissfulWed. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;