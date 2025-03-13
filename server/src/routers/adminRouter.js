const express = require("express");
const {
    adminSignin,
    adminSignup,
    currentAdmin,
    getAdminDetails,
    updateAdminProfile,
    uploadProfilePic
} = require("../controllers/adminController");

const { isLoggedIn } = require("../middlewares/adminAuth");
const { upload } = require("../config/cloudinary"); // Multer + Cloudinary config

const adminRouter = express.Router();

// 🔹 Get Current Admin (Protected)
adminRouter.get("/", isLoggedIn, currentAdmin);

// 🔹 Signup & Signin
adminRouter.post("/signup", adminSignup);
adminRouter.post("/signin", adminSignin);

// 🔹 Admin Profile Routes
adminRouter.get("/:id", getAdminDetails);
adminRouter.put("/:id", isLoggedIn, updateAdminProfile);

// 🔹 Upload Profile Picture
adminRouter.post("/upload-profile", upload.single("profilePic"), uploadProfilePic);

module.exports = adminRouter;
