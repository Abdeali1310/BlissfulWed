const express = require("express");
const { createPayment,getPaymentDetails, verifyPayment, getPaymentByUserId, getAllPaymentDetails, handleRefund } = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/userAuth");
const Payment = require("../models/Payment");

const paymentRouter = express.Router();

paymentRouter.get("/", getAllPaymentDetails);
paymentRouter.post("/create",isLoggedIn, createPayment);
paymentRouter.get("/verify",isLoggedIn, verifyPayment);
paymentRouter.get("/details",isLoggedIn, getPaymentDetails);
<<<<<<< HEAD
paymentRouter.get("/history/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Find all payments where userId matches
      const payments = await Payment.find({ userId }).sort({ date: -1 });
  
      res.status(200).json({ success: true, payments });
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ success: false, message: "Failed to fetch payment history" });
    }
  });
=======
paymentRouter.get("/user/:userId", getPaymentByUserId);
paymentRouter.put("/refund/:paymentId", handleRefund);
>>>>>>> 6a9208b6752d8b6ef49cb37ff519ffa72e41c719

module.exports = paymentRouter;
