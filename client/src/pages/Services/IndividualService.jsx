/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Typography,
  Rating,
  CircularProgress,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const IndividualService = () => {
  const { serviceType, serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState(5);
  const [open, setOpen] = useState(false);
  const [lastFocusedElement, setLastFocusedElement] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user") || null;
    setLoggedInUserId(userId);

    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/service/${serviceType}/${serviceId}`
        );
        setService(response.data.service);

        // ✅ Remove setting reviews here to avoid overwriting
        // setReviews(response.data.reviews || []);

        // ✅ Fetch reviews *after* service data is set
        await fetchReviews();
      } catch (err) {
        setError("Failed to fetch service details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/review/?reviewType=Service&reviewRef=${serviceId}`
        );
        setReviews(response.data.reviews || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching reviews:", error.response?.data || error);
        toast.error("Failed to load reviews.");
      }
    };

    fetchService();
  }, [serviceType, serviceId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/review",
        {
          reviewType: "Service",
          reviewRef: serviceId, // ID of the service being reviewed
          rating,
          comment: review,
        },
        { withCredentials: true }
      );
      
      // Clear the form after successful submission
      setReview("");
      setRating(5);

      toast.success("Review submitted successfully!", {
        position: "top-right",
      });
      // Show success toast
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error);
      toast.error("Failed to submit review. Please try again.", {
        position: "top-right",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen w-full ">
        <CircularProgress color="secondary" />
      </div>
    );

  if (error)
    return (
      <Typography variant="h5" className="text-center text-red-500 mt-10">
        {error}
      </Typography>
    );

  if (!service)
    return (
      <Typography variant="h5" className="text-center text-gray-600 mt-10">
        Service not found.
      </Typography>
    );
  const handleEditClick = (review) => {
    setSelectedReview(review);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
    setEditOpen(true);
  };

  // Close Edit Dialog
  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedReview(null);
    if (lastFocusedElement) {
      lastFocusedElement.focus(); // Restore focus to the button that triggered the dialog
    }
  };

  // Submit Updated Review
  const handleUpdateReview = () => {
    HandleUpdateReview(selectedReview._id, updatedComment, updatedRating);
    handleCloseEdit();
  };

  const HandleUpdateReview = async (
    reviewId,
    updatedComment,
    updatedRating
  ) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/review/${reviewId}`,
        {
          rating: updatedRating,
          comment: updatedComment,
        },
        { withCredentials: true }
      );

      setReviews((prevReviews) =>
        prevReviews.map((rev) =>
          rev._id === reviewId
            ? { ...rev, comment: updatedComment, rating: updatedRating }
            : rev
        )
      );

      toast.success("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review.");
    }
  };

  const HandleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/review/${reviewId}`, {
        withCredentials: true,
      });

      setReviews((prevReviews) =>
        prevReviews.filter((rev) => rev._id !== reviewId)
      );

      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review.");
    }
  };
  const handleOpenDialog = (reviewId, event) => {
    console.log("Opening dialog for review:", reviewId);
    setSelectedReview(reviewId);
    setLastFocusedElement(event.currentTarget);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  const handleConfirmDelete = () => {
    if (selectedReview) {
      HandleDeleteReview(selectedReview);
    }
    handleCloseDialog();
  };
  return (
    <div className="w-full overflow-y-scroll overflow-x-hidden bg-pink-100 ">
      <Navbar />
      <div className="max-w-7xl mx-auto p-10 bg-white mb-28 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 h-full lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div className="flex flex-col items-center">
            {/* Big Main Image */}
            <motion.img
              src={service.cardImage}
              alt={service.name}
              className="w-full  object-cover rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />

            {/* Three Big Images Below */}
            <div className="flex gap-6 mt-10 overflow-x-scroll scrollbar-hide">
              {service.images.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Service ${index + 1}`}
                  className="w-[300px] h-[300px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-all"
                />
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col">
            <Typography
              variant="h3"
              className="text-pink-700 capitalize font-bold mb-3"
              style={{ fontFamily: "serif" }}
            >
              {service.serviceType}
            </Typography>

            <div className="flex relative items-center gap-3 mb-3">
              {service.isBestseller && (
                <Chip
                  label="Bestseller"
                  className="absolute top-2 right-2 px-3 py-1 font-semibold"
                  style={{
                    backgroundColor: "#FFD1DC",
                    color: "#B00050",
                    fontFamily: "cursive",
                  }} // Baby pink background with darker pink text
                />
              )}
              <Rating value={Math.floor(service.rating)} readOnly />
              <Typography className="text-gray-600">
                ({reviews.length} reviews)
              </Typography>
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
              {service.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  className="bg-pink-100 text-pink-700 px-2 py-1"
                />
              ))}
            </div>

            <Typography
              variant="h6"
              className="text-pink-900 italic text-lg leading-relaxed mb-4"
              style={{ marginBottom: "1rem" }}
            >
              {service.description}
            </Typography>

            <Typography
              variant="h5"
              className="text-gray-800 font-cursive text-pink-700 text-lg leading-relaxed mb-4"
              style={{ fontFamily: "cursive" }}
            >
              {service.fullInfo}
            </Typography>
            <div className="relative mt-3 mb-5">
              <Chip
                label={service.duration}
                className="absolute top-2 p-5 font-bold"
                style={{
                  backgroundColor: "fff",
                  color: "gray",
                  fontFamily: "cursive",
                  padding: "1rem",
                }} // Baby pink background with darker pink text
              />
            </div>

            <div className="flex items-center mt-12 gap-5 mb-6">
              <Typography variant="h5" className="text-gray-500 line-through">
                ₹{service.price}
              </Typography>
              <Typography variant="h4" className="text-pink-700 font-bold">
                ₹{service.price - (service.price * service.discount) / 100}
              </Typography>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className="bg-pink-700 text-white absolute py-3 text-lg"
              style={{ backgroundColor: "#E73895" }}
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Review Section with More Spacing */}

        <div className="mt-36">
          {loggedInUserId && (
            <>
              <ToastContainer />
              {/* Review Form */}
              <div className="bg-gray-100 p-10 rounded-lg shadow-md">
                <Typography
                  variant="h4"
                  className="mb-4 text-gray-700"
                  style={{ fontFamily: "cursive", color: "#e73895" }}
                >
                  Write a Review
                </Typography>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4 mt-5">
                    <div className="flex gap-3">
                      <span className="text-xl">Rating : </span>
                      <Rating
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                      />
                    </div>
                  </div>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Review"
                    variant="outlined"
                    className="mb-4"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    style={{ marginBottom: "1rem" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="bg-pink-700 text-white"
                    style={{ backgroundColor: "#e73895" }}
                  >
                    Submit Review
                  </Button>
                </form>
              </div>
            </>
          )}

          {/* Display Reviews */}
          <div className="mt-16 mb-16">
            <h2 className="text-pink-700 text-3xl lg:text-4xl font-cursive font-bold mb-12">
              Customer Reviews
            </h2>
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reviews.map((r) => (
                  <div
                    key={r._id}
                    className="bg-white p-6 rounded-lg shadow-md border"
                  >
                    {/* User Profile */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={r.userId.profilePicUrl}
                        alt={r.userId.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <Typography variant="h6" className="font-semibold">
                        {r.userId.username}
                      </Typography>
                    </div>

                    {/* Rating Stars */}
                    <div className="mt-2">
                      <Rating value={r.rating} readOnly />
                    </div>

                    {/* Comment */}
                    <Typography variant="body1" className="text-gray-700 mt-3">
                      {r.comment}
                    </Typography>

                    {/* Edit & Delete Buttons (Only for Logged-in User) */}
                    {loggedInUserId === r.userId._id && (
                      <div className="mt-4 flex space-x-2">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleEditClick(r)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={(event) => handleOpenDialog(r._id, event)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Typography variant="body1" className="text-gray-500">
                No reviews yet.
              </Typography>
            )}

            {/* Edit Review Dialog */}
            <Dialog open={editOpen} onClose={handleCloseEdit}>
              <DialogTitle>Edit Review</DialogTitle>
              <DialogContent>
                <Rating
                  value={updatedRating}
                  onChange={(e, newValue) => setUpdatedRating(newValue)}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Edit your comment"
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                  className="mt-3"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleUpdateReview} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog
              open={open}
              onClose={handleCloseDialog}
              disableEnforceFocus // Prevents focus trap issues
              aria-labelledby="delete-dialog-title"
            >
              <DialogTitle id="delete-dialog-title">
                Confirm Deletion
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this review?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary" autoFocus>
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IndividualService;
