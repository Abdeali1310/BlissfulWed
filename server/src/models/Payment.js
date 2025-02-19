const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    advanceAmount: {
        type: Number,
        required: true,
    },
    remainingAmount: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paidAt: {
        type: Date,
        default:new Date(),
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true, // Some failed transactions may not have this
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Partially Paid", "Paid", "Failed"],
        default: "Pending",
    },
    refundStatus: {
        type: String,
        enum: ["Not Requested", "Requested", "Approved", "Declined", "Refunded"],
        default: "Not Requested",
    },
    refundAmount: {
        type: Number,
        default: 0,
    },
    refundProcessedAt: {
        type: Date,
    },
    cancellationStatus: {
        type: String,
        enum: ["Not Cancelled", "Cancellation Requested", "Cancelled"],
        default: "Not Cancelled",
    },
    cancellationReason: {
        type: String,
        default: null,
    },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
