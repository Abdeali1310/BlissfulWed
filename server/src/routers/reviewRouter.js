const express = require("express");
const { createReview, getAllReviews, updateReview, deleteReview } = require("../controllers/reviewController");
const { isLoggedIn } = require("../middlewares/userAuth");

const reviewRouter = express.Router();

reviewRouter.post("/", isLoggedIn, createReview);  // Create Review (Logged-in users only)
reviewRouter.get("/", getAllReviews);  // Get All Reviews
reviewRouter.put("/:id", isLoggedIn, updateReview);  // Update Review (Only owner)
reviewRouter.delete("/:id", isLoggedIn, deleteReview);  // Delete Review (Only owner)

module.exports = reviewRouter;
