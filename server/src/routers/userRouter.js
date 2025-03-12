const express = require("express");
const {
  userSignup,
  userSignin,
  userProfile,
  currentUser,
  editProfile,
  changePassword,
  forgotPassword,
  otpVerification,
  resetPassword,
  contactUs,
  updateSpin,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/userAuth");

const multer = require("multer");
const upload = multer({ dest: 'uploads/' }); // For profile pic upload

const userRouter = express.Router();

// ✅ Get current user profile (GET instead of POST)
userRouter.get("/current", isLoggedIn, currentUser);

// ✅ User signup and signin
userRouter.post("/signup", userSignup);
userRouter.post("/signin", userSignin);

// ✅ Contact form
userRouter.post("/contact-email", contactUs);

// ✅ Get user profile (GET)
userRouter.get("/user/profile", isLoggedIn, userProfile);

// ✅ Edit user profile (using multer for profile picture)
userRouter.put(
  "/profile/edit/:userId",
  isLoggedIn,
  upload.single("profilePic"), // Handles file upload
  editProfile
);

// ✅ Change password
userRouter.put("/changePassword/:userId", isLoggedIn, changePassword);

// ✅ Forgot password and reset
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/forgotPassword/otpVerification", otpVerification);
userRouter.post("/resetPassword", resetPassword);

// ✅ Update spin
userRouter.put("/update-spin", isLoggedIn, updateSpin);

module.exports = userRouter;
