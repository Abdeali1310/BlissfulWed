const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true }
}, { timestamps: true });

const Package = mongoose.model("Package", packageSchema);

module.exports = Package; // ✅ Correct export