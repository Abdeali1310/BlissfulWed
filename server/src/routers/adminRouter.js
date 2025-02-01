const express = require("express");
const { adminSignin, adminSignup, currentAdmin } = require("../controllers/adminController");
const { isLoggedIn } = require("../middlewares/adminAuth");
const adminRouter = express.Router();

adminRouter.get("/",isLoggedIn,currentAdmin);
adminRouter.post("/signup",adminSignup);
adminRouter.post("/signin",adminSignin);
module.exports = adminRouter;
