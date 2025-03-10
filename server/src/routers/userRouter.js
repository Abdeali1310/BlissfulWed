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
    getUserEvents, 
    getUserPayments, 
    deleteUserAccount 
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/userAuth");
const userRouter = express.Router();

userRouter.post("/", isLoggedIn, currentUser);
userRouter.post("/signup", userSignup);
userRouter.post("/signin", userSignin);
userRouter.post("/contact-email", contactUs);
userRouter.get("/profile", isLoggedIn, userProfile);
userRouter.put("/profile/edit/:userId", isLoggedIn, editProfile);
userRouter.put("/changePassword/:userId", isLoggedIn, changePassword);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/forgotPassword/otpVerification", otpVerification);
userRouter.post("/resetPassword", resetPassword);
userRouter.put("/update-spin", isLoggedIn, updateSpin);
userRouter.get("/profile/events", isLoggedIn, getUserEvents);
userRouter.get("/profile/payments", isLoggedIn, getUserPayments);
userRouter.delete("/profile/delete/:userId", isLoggedIn, deleteUserAccount);

module.exports = userRouter; 
