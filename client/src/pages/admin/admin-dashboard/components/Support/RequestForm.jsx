/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, TextField, MenuItem, Typography, Box } from "@mui/material";
import { submitSupportRequest } from "./supportApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("user"),
    name: "",
    email: "",
    type: "query",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitSupportRequest(formData);
      toast.success("Request submitted successfully!");
      setFormData({ name: "", email: "", type: "query", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting request.");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: "auto", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Submit Support Request
      </Typography>
      <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
      <TextField select fullWidth label="Type" name="type" value={formData.type} onChange={handleChange} margin="normal">
        <MenuItem value="refund" selected>Refund</MenuItem>
        <MenuItem value="cancel" selected>Cancel</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        multiline
        rows={3}
        margin="normal"
        placeholder="Provide correct Booking details with amount and reason for cancelling booking"
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Submit
      </Button>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <p className="text-yellow-600 mt-2">Note: Please allow 24-48 hours for a response.</p>
    </Box>
  );
};

export default RequestForm;
