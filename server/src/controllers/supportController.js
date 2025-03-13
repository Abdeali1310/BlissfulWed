const nodemailer = require("nodemailer");
const supportRequest = require("../models/supportRequest");
require("dotenv").config();

// 📌 Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📌 Submit a new query or refund request
exports.submitRequest = async (req, res) => {
  try {
    const { userId, name, email, type, message } = req.body;

    const newRequest = new supportRequest({ userId, name, email, type, message });
    await newRequest.save();

    // Send acknowledgment email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Request Received - BlissfulWed",
      text: `Hello ${name},\n\nYour ${type} request has been received.\nWe will update you once it's resolved.\n\n- BlissfulWed Team`,
    });

    res.status(201).json({ success: true, message: "Request submitted successfully." });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ success: false, error: error.message });
  }
};

// 📌 Get all requests (For Admin)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await supportRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 📌 Get requests by User ID
exports.getUserRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await supportRequest.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 📌 Mark a request as resolved
exports.resolveRequest = async (req, res) => {
  try {
    const request = await supportRequest.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );

    // Notify user via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: request.email,
      subject: "Your Request is Resolved - BlissfulWed",
      text: `Hello ${request.name},\n\nYour ${request.type} request has been resolved. Thank you for reaching out!\n\n- BlissfulWed Team`,
    });

    res.status(200).json({ success: true, message: "Request marked as resolved." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
