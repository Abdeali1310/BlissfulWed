const express = require("express");
const { createPayment,getPaymentDetails, verifyPayment, getPaymentByUserId, getAllPaymentDetails } = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/userAuth");

const paymentRouter = express.Router();

paymentRouter.get("/", getAllPaymentDetails);
paymentRouter.post("/create",isLoggedIn, createPayment);
paymentRouter.get("/verify",isLoggedIn, verifyPayment);
paymentRouter.get("/details",isLoggedIn, getPaymentDetails);
paymentRouter.get("/user/:userId", getPaymentByUserId);

module.exports = paymentRouter;
