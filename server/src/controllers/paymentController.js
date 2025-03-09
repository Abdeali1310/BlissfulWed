const Payment = require("../models/Payment");
const Booking = require("../models/Booking");
const { Cashfree } = require("../config/cashfreeConfig.js"); // Correct import
const axios = require("axios");
const User = require("../models/User");
require("dotenv").config();

// 🔹 Create a new payment order
async function createPayment(req, res) {
  try {
    const { userId, bookingId, totalAmount, advanceAmount, remainingAmount, paymentMethod, dueDate } = req.body;

    // Fetch Booking Details
    const bookingData = await Booking.findById(bookingId);
    if (!bookingData) return res.status(404).json({ message: "Booking not found" });

    // Fetch User Details
    const userData = await User.findById(userId);
    if (!userData) return res.status(404).json({ message: "User not found" });

    if (!userData.contact) return res.status(400).json({ message: "User contact information is required" });

    // Validate advanceAmount
    if (isNaN(advanceAmount) || advanceAmount <= 0) {
      return res.status(400).json({ message: "Invalid advance amount" });
    }


    // Ensure API keys are available
    if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET) {
      return res.status(500).json({ message: "Cashfree API credentials are missing" });
    }

    // Generate unique order ID
    const orderId = `ORDER_${Date.now()}`;

    // Create Cashfree Order Data
    const orderData = {
      order_id: orderId,
      order_amount: Number(advanceAmount), // Ensure it's a number
      order_currency: "INR",
      customer_details: {
        customer_id: userId,
        customer_name: userData.username,
        customer_email: userData.email,
        customer_phone: userData.contact.toString(),
      },
      order_meta: {
        return_url: `http://localhost:5173/payment-status?order_id=${orderId}`,
        notify_url: `http://localhost:3000/api/v1/payment/verify`,
      },
      order_note: "Booking Payment for BlissfulWed",
    };

    // Send request to Cashfree API
    const response = await axios.post("https://sandbox.cashfree.com/pg/orders", orderData, {
      headers: {
        "Content-Type": "application/json",
        "X-Client-Id": process.env.CASHFREE_APP_ID,
        "X-Client-Secret": process.env.CASHFREE_SECRET,
        "X-Api-Version": "2025-01-01",
      },
    });


    if (response.data.payment_session_id) {
      const headers = {
        "Content-Type": "application/json",
        "X-Client-Id": process.env.CASHFREE_APP_ID,
        "X-Client-Secret": process.env.CASHFREE_SECRET,
        "X-Api-Version": "2025-01-01",
      }
      const paymentLinkData = {
        "link_id": orderId, // Replace with your unique orderId
        "link_currency": "INR",
        "link_amount": advanceAmount,  // Replace with the calculated order amount
        "link_amount_paid": 0,
        "link_partial_payments": false,
        "link_minimum_partial_amount": 20,  // You can adjust this value
        "link_purpose": `Payment for ${bookingData.type} Booking`,  // Dynamic event booking description
        "link_created_at": new Date().toISOString(),  // Timestamp when the link was created
        "customer_details": {
          "customer_name": userData.username, // Assuming you have the name in the user object
          "customer_phone": userData.contact.toString() || "9876543210", // Replace with actual user phone
          "customer_email": userData.email || "test@example.com"  // Replace with actual user email
        },
        "link_meta": {
          "notify_url": `http://localhost:3000/api/v1/payment/verify`,
          "return_url": `http://localhost:5173/payment-status?order_id=${orderId}`,
        },
        "link_url": "",  // This will be generated after calling Cashfree API
        "link_expiry_time": new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // Link expiry time (24 hours later)
        "link_notes": {
          "event_details": bookingData.type,
          "event_location": bookingData.address  // You can replace with actual location
        },
        "link_auto_reminders": true,
        "link_qrcode": "",  // QR code will be generated after successful link creation
        "link_notify": {
          "send_sms": false,
          "send_email": true
        },

      };
      const paymentLinkResponse = await axios.post(
        'https://sandbox.cashfree.com/pg/links',  // Use the correct endpoint
        paymentLinkData,
        { headers }
      );
      const paymentLink = paymentLinkResponse.data.link_url;

      // Save Payment in DB
      const newPayment = new Payment({
        userId,
        bookingId,
        totalAmount,
        advanceAmount,
        remainingAmount,
        dueDate,
        paymentMethod,
        transactionId: orderId,
        paymentStatus: "Pending",
      });

      bookingData.status = "Booked";
      await newPayment.save();
      await bookingData.save();
      res.json({ success: true, paymentUrl: paymentLink });
    } else {
      throw new Error("Failed to generate payment session ID from Cashfree");
    }
  } catch (error) {
    console.error("Payment Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.response?.data || error.message
    });
  }
}




// 🔹 Handle Webhook for Payment Verification
async function verifyPayment(req, res) {
  try {
    if (req.method === "POST") {
      // 🔹 Webhook Verification (Cashfree sends a POST request)
      const { order_id, paidAt, tx_status, tx_msg, tx_time, payment_link_id } = req.body;

      // Find the payment by transactionId (stored as payment_link_id)
      const payment = await Payment.findOne({ transactionId: payment_link_id });
      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }

      // Update Payment Status
      payment.paymentStatus = tx_status === "SUCCESS" ? "Paid" : "Failed";
      payment.paidAt = new Date(tx_time);
      await payment.save();

      return res.json({ success: true, message: "Webhook received, payment updated." });

    } else if (req.method === "GET") {
      // 🔹 Frontend Verification (React calls GET request)
      const { order_id } = req.query;
      if (!order_id) {
        return res.status(400).json({ success: false, message: "Order ID is required" });
      }

      // Find payment by order_id (assumed to be transactionId)
      const payment = await Payment.findOne({ transactionId: order_id });
      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }
      payment.paymentStatus = "Paid";
      await payment.save()
      return res.json({
        success: true,
        paymentStatus: payment.paymentStatus,
        paidAt: payment.paidAt,
      });

    } else {
      return res.status(405).json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
}

async function getPaymentDetails(req, res) {
  try {
    const { order_id } = req.query;

    if (!order_id) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    const payment = await Payment.findOne({ transactionId: order_id }).populate("userId bookingId");

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
}

const getPaymentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Fetch all payments associated with the user
    const payments = await Payment.find({ userId: userId })
      .populate("bookingId", "date status totalAmount")
      .sort({ createdAt: -1 });

    if (!payments.length) {
      return res.status(404).json({ message: "No payments found for this user." });
    }

    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { getPaymentByUserId, createPayment, verifyPayment, getPaymentDetails }