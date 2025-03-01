const express = require("express");
const { userSignup, userSignin, userProfile, currentUser, editProfile, changePassword, forgotPassword, otpVerification, resetPassword, contactUs, getPaymentHistory } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/userAuth");
const userRouter = express.Router();
// const multer  = require('multer')
// const { storage } = require("../../cloudConfig");
// const upload = multer({storage })

userRouter.post("/",isLoggedIn,currentUser)
userRouter.post("/signup",userSignup)
userRouter.post("/signin",userSignin)
userRouter.post("/contact-email",contactUs)
userRouter.get("/profile",isLoggedIn,userProfile)
userRouter.put("/user/profile/edit/:userId",isLoggedIn,editProfile)
userRouter.get("/profile/payment-history", isLoggedIn, getPaymentHistory)
userRouter.put("/changePassword/:userId",isLoggedIn,changePassword)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/forgotPassword/otpVerification",otpVerification)
userRouter.post("/resetPassword",resetPassword)

// userRouter.put("/profile/edit/:userId",upload.single('profilePic'),editProfile)
module.exports = userRouter;