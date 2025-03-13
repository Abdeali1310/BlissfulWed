const express = require("express");
const { userSignup, userSignin, userProfile, currentUser, editProfile, changePassword, forgotPassword, otpVerification, resetPassword, contactUs, updateSpin } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/userAuth");
const userRouter = express.Router();
const multer  = require('multer');
const { storage } = require("../../cloudConfig");
const upload = multer({storage });

userRouter.post("/",isLoggedIn,currentUser)
userRouter.get("/",getAllUsers)
userRouter.get("/:userId",getUserById)
userRouter.delete("/:userId",deleteUserById)
userRouter.post("/signup",userSignup)
userRouter.post("/signin",userSignin)
userRouter.post("/contact-email",contactUs)
userRouter.get("/profile",isLoggedIn,userProfile)
userRouter.put("/profile/edit/:userId",upload.single('profilePic'),editProfile)
userRouter.put("/changePassword/:userId",isLoggedIn,changePassword)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/forgotPassword/otpVerification",otpVerification)
userRouter.post("/resetPassword",resetPassword)
userRouter.put("/update-spin",isLoggedIn,updateSpin)
userRouter.get("/history/:userId", isLoggedIn, getUserHistory);
module.exports = userRouter;