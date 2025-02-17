const express = require("express");
const Package = require("../models/packageModel");

const router = express.Router();

// Get all packages
router.get("/", async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
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
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// Add a package (admin only)
router.post("/", async (req, res) => {
    try {
        const { name, price, description, features } = req.body;

        // Validate request body
        if (!name || !price || !description || !features) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure `features` follows the expected structure
        const requiredFeatureCategories = ["Decorations", "Photography", "Catering", "Entertainment", "AdditionalServices"];
        const hasValidFeatures = requiredFeatureCategories.every(category => Array.isArray(features[category]));

        if (!hasValidFeatures) {
            return res.status(400).json({ message: "Features must include all categories with array values" });
        }

        // Normalize package name (e.g., always store in lowercase)
        const newPackage = new Package({
            name: name.trim(),
            price,
            description,
            features
        });

        const savedPackage = await newPackage.save();
        res.status(201).json(savedPackage);
    } catch (error) {
        res.status(400).json({ message: "Failed to create package", error: error.message });
    }
});

module.exports = router;