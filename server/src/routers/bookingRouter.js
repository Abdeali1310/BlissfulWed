const express = require("express");
const bookingRouter = express.Router();
const { isLoggedIn } = require("../middlewares/userAuth");
const { createBooking, getBookingById, getAllBookings, updateBookingStatus, cancelBooking } = require("../controllers/bookingController");

bookingRouter.post("/",isLoggedIn,createBooking);
bookingRouter.get("/",isLoggedIn,getAllBookings);
bookingRouter.get("/:bookingId",isLoggedIn,getBookingById);
bookingRouter.put("/:bookingId",isLoggedIn,updateBookingStatus)
bookingRouter.delete("/:bookingId",isLoggedIn,cancelBooking)

module.exports = bookingRouter;
