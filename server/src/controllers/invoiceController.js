const Invoice = require("../models/Invoice");
const Booking = require("../models/Booking");

const createInvoice = async (req, res) => {
    try {
        const { userId, bookingId, dueDate,transactionId, totalAmount, advanceAmount, paymentMethod } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        const remainingAmount = totalAmount - advanceAmount;

        const newInvoice = new Invoice({
            userId,
            bookingId,
            transactionId,
            totalAmount,
            advanceAmount,
            remainingAmount,
            paymentMethod,
            paymentStatus: advanceAmount > 0 ? "Paid" : "Pending",
            paidAt: advanceAmount > 0 ? new Date() : null,
            dueDate: dueDate,
            bookingDate: booking.createdAt,
        });

        await newInvoice.save();

        res.status(201).json({ message: "Invoice created successfully", invoice: newInvoice });

    } catch (error) {
        console.error("Error creating invoice:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getInvoice = async (req, res) => {
    try {
        const { invoiceId, bookingId, userId } = req.query;

        let filter = {};
        if (invoiceId) filter._id = invoiceId;
        if (bookingId) filter.bookingId = bookingId;
        if (userId) filter.userId = userId;

        const invoice = await Invoice.findOne(filter)
            .populate({
                path: "userId",
                select: "username email contact", // Get only these fields from User
            })
            .populate({
                path: "bookingId",
                select: "address", // Get only the address from Booking
            });

        if (!invoice) return res.status(404).json({ message: "Invoice not found" });

        res.status(200).json({ invoice });
    } catch (error) {
        console.error("Error fetching invoice:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = { createInvoice, getInvoice };