const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewType: { 
    type: String, 
    enum: ["Service", "Package"], 
    required: true 
  },
  reviewRef: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    refPath: "reviewType" // Dynamically refers to "Service" or "Package" models
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "User" 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: true, 
    maxlength: 500 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
