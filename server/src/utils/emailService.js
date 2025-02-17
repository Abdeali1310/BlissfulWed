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

async function sendContactEmail({ name, email, subject, message }) {
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: subject || "New Contact Form Submission",
    text: `Hello,

You have received a new message from your website's contact form:

Name: ${name}
Email: ${email}

Message:
${message}

Please respond at your earliest convenience.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact email sent from ${email}`);
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw new Error("Failed to send contact email");
  }
}


module.exports = { sendOtpEmail, sendContactEmail };
