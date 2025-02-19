const express = require("express");
const { createPayment, verifyPayment } = require("../controllers/paymentController");
const { isLoggedIn } = require("../middlewares/userAuth");

const paymentRouter = express.Router();

paymentRouter.post("/create",isLoggedIn, createPayment);
paymentRouter.get("/verify",isLoggedIn, verifyPayment);

module.exports = paymentRouter;
