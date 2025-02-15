const express = require("express");
const Package = require("../models/packageModel");

const router = express.Router();

// Get all packages
router.get("/", async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific package by name
router.get("/:packageName", async (req, res) => {
    try {
        const packageName = req.params.packageName.replace(/-/g, ' '); // Convert hyphens to spaces

        // Case-insensitive search in MongoDB
        const packageData = await Package.findOne({ name: { $regex: `^${packageName}$`, $options: "i" } });

        if (!packageData) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json(packageData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a package (admin only)
router.post("/", async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        const savedPackage = await newPackage.save();
        res.status(201).json(savedPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; // ✅ Correct for CommonJS