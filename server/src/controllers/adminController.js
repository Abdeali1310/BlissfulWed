const Admin = require("../models/Admin");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const z = require('zod');


const { adminSignupSchema, adminSigninSchema } = require("../utils/validation");

const adminSignup = async (req, res) => {
    try {
        const { name, email, contact, gender, password, key } = adminSignupSchema.parse(req.body);

        const existingAdmin = await Admin.findOne({ $or: [{ email }, { contact }] });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email or contact" });
        }

        const admin = await Admin.create({ name, email, contact, gender, password, key });

        res.clearCookie("admin_auth", {
            httpOnly: true,
            domain: "localhost",
            signed: true,
        });

        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.ADMIN_JWT_SECRET, {
            expiresIn: "7d",
        });

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("admin_auth", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            secure: true,
        });

        return res.status(201).json({
            admin: admin._id,
            name: admin.name,
            email: admin.email,
            token: token,
        });
    } catch (error) {
        console.error("Admin Signup Error:", error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

const adminSignin = async (req, res) => {
    try {
        const { email, password, key } = adminSigninSchema.parse(req.body);

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isKeyValid = await admin.compareKey(key);
        if (!isKeyValid) {
            return res.status(400).json({ message: "Invalid admin key" });
        }

        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.ADMIN_JWT_SECRET, {
            expiresIn: "7d",
        });

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("admin_auth", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            secure: true,
        });

        return res.status(200).json({
            admin: admin._id,
            name: admin.name,
            email: admin.email,
            token: token,
        });
    } catch (error) {
        console.error("Admin Signin Error:", error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

async function currentAdmin(req, res) {
    if (req.adminId) {
        const id = req.adminId;
        const admin = await Admin.findById(id);
        return res.send({ admin: admin })
    } else {
        return res.status(411).json({ msg: "Sign in required" })
    }
}

module.exports = { adminSignup, adminSignin, currentAdmin }