/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, TextField, MenuItem, Typography, Box } from "@mui/material";
import { submitSupportRequest } from "./supportApi";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    userId:localStorage.getItem("user"),
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
      alert("Request submitted successfully!");
      setFormData({ name: "", email: "", type: "query", message: "" });
    } catch (error) {
      alert("Error submitting request.");
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
        <MenuItem value="query">Query</MenuItem>
        <MenuItem value="refund">Refund</MenuItem>
      </TextField>
      <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleChange} multiline rows={3} margin="normal" />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default RequestForm;
