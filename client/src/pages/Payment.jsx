/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Payment = () => {
  let url = window.location.href;
  const queryParams = new URL(url).searchParams;

  const finalPrice = parseFloat(queryParams.get("finalPrice"));
  const bookingId = queryParams.get("bookingId");
  const advancePayment = Math.floor((finalPrice * 0.35).toFixed(2));

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentType, setPaymentType] = useState("advance");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/booking/${bookingId}`,
          { withCredentials: true }
        );
        console.log(response.data);

        setBooking(response.data);
      } catch (err) {
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!booking)
    return <p className="text-center text-gray-500">No booking found.</p>;

  const payableAmount = paymentType === "advance" ? advancePayment : finalPrice;

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/payment/create",
        {
          userId: booking.user._id,
          bookingId: booking._id,
          totalAmount: finalPrice,
          advanceAmount: paymentType === "advance" ? advancePayment : finalPrice,
          remainingAmount: paymentType === "advance" ? finalPrice - advancePayment : 0,
          dueDate: paymentType === "advance" ? moment().add(3, "days").format("YYYY-MM-DD") : null,
          paymentMethod: paymentMethod.toUpperCase(),
        },
        { withCredentials: true }
      );
      console.log(response);
      
      const { paymentUrl } = response.data;
      window.location.href = paymentUrl; // Redirect to payment gateway
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="lg:flex justify-center items-center w-full min-h-screen bg-pink-50 p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl rounded-lg bg-white p-6">
        {/* Booking Details */}
        <div className="p-6 bg-pink-100 rounded-lg shadow-md">
          <p className="text-pink-600 text-3xl font-cursive font-semibold text-center mb-4">
            Booking Details
          </p>

          <div className="space-y-3">
            <p className="text-gray-700 text-lg">
              <strong>Booking ID:</strong> {booking._id}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Service ID:</strong> {booking.service?._id || "N/A"}
            </p>
            {booking.service?.serviceType && (
              <p className="text-gray-700 text-lg">
                <strong>Service Type:</strong> {booking.service.serviceType}
              </p>
            )}
            {booking.package && (
              <p className="text-gray-700 text-lg">
                <strong>Package:</strong> {booking.package}
              </p>
            )}
            <p className="text-gray-700 text-lg">
              <strong>Date:</strong>{" "}
              {moment(booking.date).format("MMMM Do YYYY")}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Address:</strong> {booking.address}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Contact:</strong> {booking.contact}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>No. of Guests:</strong> {booking.noOfGuests ? booking.noOfGuests : "100"}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Booking Status:</strong> {booking.status}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="p-6 bg-pink-100 rounded-lg shadow-md">
          <p className="text-pink-600 text-3xl font-cursive font-semibold text-center mb-4">
            Payment Details
          </p>

          <Box className="p-5 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                className="text-lg font-semibold mb-3"
              >
                Select Payment Type
              </FormLabel>
              <RadioGroup value={paymentType} onChange={handlePaymentTypeChange}>
                <FormControlLabel
                  value="advance"
                  control={<Radio />}
                  label="Pay Advance (35%)"
                />
                <FormControlLabel
                  value="full"
                  control={<Radio />}
                  label="Pay Full Amount"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <div className="space-y-3 mt-5">
            <p className="text-gray-700 text-lg">
              <strong>Final Price:</strong> ₹{finalPrice} (* including taxes)
            </p>
            {paymentType === "advance" && (
              <>
                <p className="text-gray-700 text-lg font-bold">
                  <strong>Advance Payment (35%):</strong>{" "}
                  <span className="text-[#e73895] text-2xl">
                    ₹{advancePayment}
                  </span>
                </p>
                <p className="text-gray-700 text-lg font-bold">
                  <strong>Remaining Payment:</strong>{" "}
                  <span className="text-[#e73895] text-2xl">
                    ₹{finalPrice - advancePayment}
                  </span>
                </p>
              </>
            )}
          </div>

          <Box className="p-5 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-5">
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                className="text-lg font-semibold mb-3"
              >
                Select Payment Method
              </FormLabel>
              <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <PhoneIphoneIcon className="text-green-600 mr-2" /> UPI
                      (Google Pay, PhonePe, Paytm)
                    </Box>
                  }
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <CreditCardIcon className="text-blue-600 mr-2" />{" "}
                      Credit/Debit Card
                    </Box>
                  }
                />
                <FormControlLabel
                  value="netbanking"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <AccountBalanceIcon className="text-indigo-600 mr-2" />{" "}
                      Net Banking
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            className="w-full py-3 mt-6 text-lg font-semibold bg-pink-600 hover:bg-red-900"
            style={{ backgroundColor: "#e73895" }}
            onClick={handlePayment}
          >
            Proceed to Pay ₹{payableAmount}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
