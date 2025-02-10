const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceType: { type: String, required: true },
    price: { type: Number, required: true },
    isBestseller: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    cardImage: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    fullInfo: { type: String, required: true },
    availability: { type: Boolean, default: true },
    category: { type: String },
    duration: { type: String },
    tags: [{ type: String }],
    availableEverywhere: { type: Boolean, default: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], 
  },
  { timestamps: true } 
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
