const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["Service", "Package"],
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: function () {
      return this.type === "Service";
    },
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: function () {
      return this.type === "Package";
    },
  },
  timeSlot: {
    type: String, // Example: "10:00 AM - 12:00 PM"
    
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Booked", "Rescheduled", "Cancelled"],
    default: "Pending",
  },
  noOfGuests:{
    type:Number,
    default:0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  rescheduledAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
