const Review = require("../models/Review");
const User = require("../models/User");

// ✅ Create a new review
async function createReview(req, res) {
  try {
    const { reviewType, reviewRef, rating, comment } = req.body;

    // Ensure logged-in user
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Create and save review
    const review = new Review({
      reviewType,
      reviewRef,
      userId: req.userId, // Assign the logged-in user
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ success: true, message: "Review created", review });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all reviews (optional filter by service/package)
async function getAllReviews(req, res) {
  try {
    const { reviewType, reviewRef } = req.query;

    let query = {};
    if (reviewType) query.reviewType = reviewType;
    if (reviewRef) query.reviewRef = reviewRef;

    const reviews = await Review.find(query).populate("userId", "username email profilePicUrl");
    res.status(200).json({ success: true, reviews });
  } catch (error) {

    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update review (Only by the logged-in user)
async function updateReview(req, res) {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Check if the logged-in user is the owner
    if (review.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this review" });
    }

    // Update fields
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    res.status(200).json({ success: true, message: "Review updated", review });
  } catch (error) {

    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete review (Only by the logged-in user)
async function deleteReview(req, res) {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Check if the logged-in user is the owner
    if (review.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this review" });
    }

    await review.deleteOne();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllReviewsForAdmin = async (req, res) => {
  try {
    // Fetch reviews without population
    const reviews = await Review.find();

    // Extract user IDs from reviews
    const userIds = reviews.map((review) => review.userId).filter((id) => id); // Remove null IDs

    // Fetch users separately
    const users = await User.find({ _id: { $in: userIds } }).select("username email");


    // Create a user mapping for easy lookup
    const userMap = {};
    users.forEach((user) => {
      userMap[user._id.toString()] = user;
    });

    // Merge reviews with corresponding user data
    const mergedReviews = reviews.map((review) => ({
      ...review.toObject(),
      userId: userMap[review.userId?.toString()] || null, // Attach user data correctly
    }));
    
    res.status(200).json({
      success: true,
      reviews: mergedReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }


};
module.exports = { getAllReviewsForAdmin, createReview, getAllReviews, updateReview, deleteReview }