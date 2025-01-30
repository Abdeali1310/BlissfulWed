const express = require("express");
const { userSignup, userSignin, userProfile, currentUser, editProfile, changePassword } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/userAuth");
const userRouter = express.Router();
// const multer  = require('multer')
// const { storage } = require("../../cloudConfig");
// const upload = multer({storage })

userRouter.post("/signup",userSignup)
userRouter.post("/signin",userSignin)
userRouter.get("/profile",isLoggedIn,userProfile)
userRouter.get("/",isLoggedIn,currentUser)
userRouter.put("/profile/edit/:userId",isLoggedIn,editProfile)
userRouter.put("/changePassword/:userId",isLoggedIn,changePassword)
// userRouter.put("/profile/edit/:userId",upload.single('profilePic'),editProfile)
module.exports = userRouter;