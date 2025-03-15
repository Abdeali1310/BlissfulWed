const express = require("express");
const { createPayment,getPaymentDetails, verifyPayment, getPaymentByUserId, getAllPaymentDetails, handleRefund, sendInvoiceEmail } = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/userAuth");
const Payment = require("../models/Payment");

const paymentRouter = express.Router();

paymentRouter.get("/", getAllPaymentDetails);
paymentRouter.post("/create",isLoggedIn, createPayment);
paymentRouter.get("/verify",isLoggedIn, verifyPayment);
paymentRouter.get("/details",isLoggedIn, getPaymentDetails);
paymentRouter.get("/user/:userId", getPaymentByUserId);
paymentRouter.put("/refund/:paymentId", handleRefund);
paymentRouter.post("/send-invoice-email",sendInvoiceEmail)
module.exports = paymentRouter;
