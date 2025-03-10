const express = require("express");
const bookingRouter = express.Router();
const { isLoggedIn } = require("../middlewares/userAuth");
const { createBooking, getBookingById, getAllBookings, updateBookingStatus, cancelBooking, getBookedDates, getBookingByUserId } = require("../controllers/bookingController");

bookingRouter.post("/",isLoggedIn,createBooking);
bookingRouter.get("/",isLoggedIn,getAllBookings);
bookingRouter.get("/:bookingId",isLoggedIn,getBookingById);
bookingRouter.get("/booked-dates/:serviceId",isLoggedIn,getBookedDates);
bookingRouter.put("/:bookingId",isLoggedIn,updateBookingStatus)
bookingRouter.delete("/:bookingId",isLoggedIn,cancelBooking)
bookingRouter.get("/user/:userId",getBookingByUserId)
bookingRouter.get("/admin/booking",getAllBookings);


module.exports = bookingRouter;
