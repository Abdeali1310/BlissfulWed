const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true }, // Unique invoice ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    totalAmount: { type: Number, required: true },
    advanceAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Partially Paid", "Paid", "Failed"],
        default: "Pending",
    },
    paidAt: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    bookingDate: { type: Date, required: true },
    cancellationStatus: {
        type: String,
        enum: ["Not Cancelled", "Cancellation Requested", "Cancelled"],
        default: "Not Cancelled",
    },
    cancellationReason: { type: String, default: "" },
    refundStatus: { type: String, enum: ["Not Requested", "Processing", "Completed"], default: "Not Requested" },
    refundAmount: { type: Number, default: 0 },
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;