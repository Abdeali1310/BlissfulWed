/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="bg-pink-100 overflow-y-scroll w-screen py-12 px-6 md:px-16 lg:px-24 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-2xl border border-gray-200">
        <h1 className="text-5xl font-bold text-pink-600 font-cursive mb-6 text-center">
          Terms of Service
        </h1>
        <p className="text-gray-600 text-lg text-center mb-8 italic">
          "Creating memories, one wedding at a time."
        </p>

        {/* Introduction */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">
            1. Introduction
          </h2>
          <p className="text-gray-700">
            Welcome to BlissfulWed! These terms govern your use of our platform, ensuring a smooth and joyful experience for all users.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">
            2. User Responsibilities
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Users must provide accurate details when booking services.</li>
            <li>Respectful communication with planners is expected.</li>
            <li>Unauthorized use of content is strictly prohibited.</li>
          </ul>
        </section>

        {/* Booking & Payments */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">
            3. Booking & Payments
          </h2>
          <p className="text-gray-700">
            All bookings must be confirmed with a deposit. Cancellation policies may vary based on individual event plans.
          </p>
        </section>

        {/* Refund Policy */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">
            4. Refund & Cancellation Policy
          </h2>
          <p className="text-gray-700">
            Refunds are subject to specific booking policies. Please check cancellation terms before confirming bookings.
          </p>
        </section>

        {/* Liability */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            BlissfulWed provides a platform for users to plan and manage events. We are not responsible for any service failures or damages.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">
            6. Changes to Terms
          </h2>
          <p className="text-gray-700">
            We may update these terms occasionally. Users will be notified of significant changes.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-6">
          <h2 className="text-3xl font-cursive text-pink-500 mb-3">
            7. Contact Us
          </h2>
          <p className="text-gray-700">
            For any questions about these terms, please contact us at{" "}
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

export default TermsOfService;
