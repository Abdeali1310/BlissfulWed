const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    features: {
      Decorations: { type: [String], required: true },
      Photography: { type: [String], required: true },
      Catering: { type: [String], required: true },
      Entertainment: { type: [String], required: true },
      AdditionalServices: { type: [String], required: true }
    }
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;