const nodemailer = require("nodemailer");
require('dotenv').config();
// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP - BlissfulWed",
    text: `Hello Dear, 
      
      Your OTP for resetting your password is: "${otp}"
      
      This OTP is valid for 10 minutes. 
      
      If you didn’t request this, please ignore this email.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}

module.exports = { sendOtpEmail };
