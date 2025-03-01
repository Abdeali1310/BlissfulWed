const express = require("express");
const { userSignup, userSignin, userProfile, currentUser, editProfile, changePassword, forgotPassword, otpVerification, resetPassword, contactUs, updateSpin } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/userAuth");
const userRouter = express.Router();
const multer  = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: "./uploads/", // Folder where images will be stored
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});


userRouter.post("/",isLoggedIn,currentUser)
userRouter.post("/signup",userSignup)
userRouter.post("/signin",userSignin)
userRouter.post("/contact-email",contactUs)
userRouter.get("/user/profile",isLoggedIn,userProfile)
userRouter.put("/user/profile/edit/:userId", isLoggedIn, upload.single("profilePic"), editProfile);
userRouter.put("/changePassword/:userId",isLoggedIn,changePassword)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/forgotPassword/otpVerification",otpVerification)
userRouter.post("/resetPassword",resetPassword)
userRouter.put("/update-spin",isLoggedIn,updateSpin)
// userRouter.put("/profile/edit/:userId",upload.single('profilePic'),editProfile)
module.exports = userRouter;