const express = require("express");
const { userSignup, userSignin, userProfile, currentUser, editProfile, changePassword, forgotPassword, otpVerification, resetPassword, contactUs, updateSpin, getUserPaymentHistory } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/userAuth");
const userRouter = express.Router();
const multer  = require('multer');
const { storage } = require("../config/cloudinary");
const upload = multer({storage });
const { uploadUser } = require("../config/cloudConfigUser");

userRouter.post("/",isLoggedIn,currentUser)
// userRouter.get("/",getAllUsers)
// userRouter.get("/:userId",getUserById)
// userRouter.delete("/:userId",deleteUserById)
userRouter.post("/signup",userSignup)
userRouter.post("/signin",userSignin)
userRouter.post("/contact-email",contactUs)
userRouter.get("/profile",isLoggedIn,userProfile)
userRouter.put("/profile/edit/:userId",isLoggedIn,uploadUser.single('profilePic'),editProfile)
userRouter.put("/changePassword/:userId",isLoggedIn,changePassword)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/forgotPassword/otpVerification",otpVerification)
userRouter.post("/resetPassword",resetPassword)
userRouter.put("/update-spin",isLoggedIn,updateSpin)
// userRouter.get("/profile/data/:userId", getUserHistory);
userRouter.get("/payment-history/:userId",isLoggedIn, getUserPaymentHistory);
userRouter.post("/logout", (req, res) => {
    res.clearCookie("auth_token", {
      httpOnly: true,
      signed: true,
      path: "/",
      domain: "localhost",
    });
    res.status(200).json({ message: "Logged out successfully" });
  });
  
// userRouter.get("/user/:userid",isLoggedIn,getUserBookings);

module.exports = userRouter;