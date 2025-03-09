const express = require("express");
const { createPayment,getPaymentDetails, verifyPayment, getPaymentByUserId } = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/userAuth");

const paymentRouter = express.Router();

paymentRouter.post("/create",isLoggedIn, createPayment);
paymentRouter.get("/verify",isLoggedIn, verifyPayment);
paymentRouter.get("/details",isLoggedIn, getPaymentDetails);
paymentRouter.get("/user/:userId", getPaymentByUserId);

module.exports = paymentRouter;
