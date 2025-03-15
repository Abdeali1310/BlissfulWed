const Payment = require("../models/Payment");
const Booking = require("../models/Booking");
const { Cashfree } = require("../config/cashfreeConfig.js"); // Correct import
const axios = require("axios");
const User = require("../models/User");
const Invoice = require("../models/Invoice.js");
const { sendEmail } = require("../utils/emailService.js");
const generateInvoicePdf = require("../utils/generateInvoice.js");
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
    const cf_order_id = response.data.cf_order_id;

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
        cashfreeOrderId:cf_order_id,
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
      .populate({
        path: "bookingId",
        select: "date status totalAmount service",
        populate:{
          path: "service",
          select: "serviceType",
        }
      })
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

const getAllPaymentDetails = async (req, res) => {
  try {
    const userId = req.userId;

    let payments;
    if (userId) {
      payments = await Payment.find({ userId })
        .populate({
          path: "bookingId",
          populate: { path: "service", select: "serviceType" } // Double populate service inside booking
        })
        .populate("userId", "username");
    } else {
      payments = await Payment.find()
        .populate({
          path: "bookingId",
          populate: { path: "service", select: "serviceType" } // Double populate
        })
        .populate("userId", "username");
    }

    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const handleRefund = async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Fetch the payment details from the database
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    if (payment.paymentStatus !== "Paid" || payment.remainingAmount !== 0) {
      return res.status(400).json({ success: false, message: "Refund not allowed for this payment" });
    }

    // 1️⃣ Fetch the correct PAID order ID using the extended API
    // const paidOrderId = await getPaidOrderId(payment.transactionId);
    // if (!paidOrderId) {
    //   return res.status(400).json({ success: false, message: "No paid order found for this user" });
    // }

    const refundAmount = (payment.totalAmount * 70) / 100;
    // console.log(`Processing refund for order: ${paidOrderId} - Amount: ${refundAmount}`);

    // const options = {
    //   method: "POST",
    //   headers: {
    //     "x-api-version": "2025-01-01",
    //     "x-client-id": process.env.CASHFREE_APP_ID,
    //     "x-client-secret": process.env.CASHFREE_SECRET,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     refund_amount: refundAmount,
    //     refund_id: `refund_${paymentId}`,
    //     refund_note: "Refund processed",
    //     refund_speed: "STANDARD",
    //   }),
    // };
    
    // // 2️⃣ Call Cashfree refund API using the correct PAID order ID
    // const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${paidOrderId}/refunds`, options);
    // const data = await response.json();
    // console.log("Refund API Response:", data);

    // if (!response.ok) {
    //   return res.status(400).json({ success: false, message: "Refund failed", error: data });
    // }

    // 3️⃣ Update payment record in the database
    payment.refundStatus = "Refunded";
    payment.refundAmount = refundAmount;
    payment.refundProcessedAt = new Date();
    await payment.save();

    res.status(200).json({ success: true, message: "Refund processed successfully" });
  } catch (error) {
    console.error("Error processing refund:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Function to get the correct "PAID" order ID using the extended API
const getPaidOrderId = async (orderId) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "x-api-version": "2025-01-01",
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET,
      },
    };

   

    const extendedResponse = await fetch(`https://sandbox.cashfree.com/pg/orders/${orderId}/extended`, options);
    const extendedData = await extendedResponse.json();
    console.log("Extended Order Details:", JSON.stringify(extendedData));

    if (extendedData && extendedData.order_id) {
      console.log("✅ Correct Paid Order ID for Refund:", extendedData.order_id);
      return extendedData.order_id;
    } else {
      console.warn("⚠️ Order ID not found in extended API response.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching paid order ID:", error);
    return null;
  }
};

async function sendInvoiceEmail(req, res) {
  try {
    const { transactionId } = req.body;
    console.log(transactionId);
    
    if (!transactionId) {
      return res.status(400).json({ success: false, message: "Transaction ID is required" });
    }

    // Fetch Invoice Details
    const invoice = await Invoice.findOne({ transactionId })
      .populate("userId")
      .populate({
        path: "bookingId",
        populate: { path: "service" }, // Populating service details inside booking
      });

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    // Generate Invoice PDF
    const pdfBuffer = await generateInvoicePdf(invoice);

    // Send Email with Invoice
    await sendEmail({
      to: invoice.userId.email,
      subject: "🎉 Booking Confirmed! Your Invoice from BlissfulWed 📄",
      text: `Dear ${invoice.userId.username},\n\n
      ✅ Your booking is confirmed! Our team will reach out to you shortly.\n\n
      📄 *Invoice Details:*\n
      - 🆔 *Booking ID:* ${invoice.bookingId._id}  
      - 💳 *Transaction ID:* ${invoice.transactionId}  
      📎 *Attached:* Your invoice for the booking.\n\n
      🙏 *Thank you for choosing BlissfulWed!* We look forward to making your event special.\n\n
      Best Regards,\n
      ♥ *BlissfulWed Team*`,
      attachments: [
        {
          filename: `Invoice_${invoice._id}.pdf`,
          content: Buffer.from(pdfBuffer).toString("base64"),
          encoding: "base64",
        },
      ],
    });
    

    return res.json({ success: true, message: "Invoice email sent successfully." });
  } catch (error) {
    console.error("❌ Error sending invoice email:", error);
    res.status(500).json({ success: false, message: "Failed to send invoice email." });
  }
}


module.exports = { sendInvoiceEmail,handleRefund,getAllPaymentDetails, getPaymentByUserId, createPayment, verifyPayment, getPaymentDetails }