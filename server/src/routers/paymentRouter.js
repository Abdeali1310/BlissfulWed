const express = require("express");
const { createPayment,getPaymentDetails, verifyPayment } = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/userAuth");

const paymentRouter = express.Router();

paymentRouter.post("/create",isLoggedIn, createPayment);
paymentRouter.get("/verify",isLoggedIn, verifyPayment);
paymentRouter.get("/details",isLoggedIn, getPaymentDetails);

module.exports = paymentRouter;
