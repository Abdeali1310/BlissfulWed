const express = require("express");
const { 
    userSignup, 
    userSignin, 
    getUserProfile,
    userProfile, 
    currentUser, 
    updateUserProfile, 
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
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { isLoggedIn } = require("../middlewares/userAuth");
const userRouter = express.Router();

userRouter.get("/", isLoggedIn, currentUser);
userRouter.post("/signup", userSignup);
userRouter.post("/signin", userSignin);
userRouter.post("/contact-email", contactUs);
userRouter.get("/profile", isLoggedIn, getUserProfile);
userRouter.get('/profile', protect, getUserProfile);
userRouter.put('/profile', protect, upload.single('profilePicture'), updateUserProfile);
userRouter.delete('/profile', protect, deleteUserAccount);
userRouter.delete('/profile', isLoggedIn, deleteUserAccount);
userRouter.put("/profile/edit/:userId", isLoggedIn, updateUserProfile);
userRouter.put("/changePassword/:userId", isLoggedIn, changePassword);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/forgotPassword/otpVerification", otpVerification);
userRouter.post("/resetPassword", resetPassword);
userRouter.put("/update-spin", isLoggedIn, updateSpin);
userRouter.get("/profile/events", isLoggedIn, getUserEvents);
userRouter.get("/profile/payments", isLoggedIn, getUserPayments);
userRouter.delete("/profile/delete/:userId", isLoggedIn, deleteUserAccount);

module.exports = userRouter; 
