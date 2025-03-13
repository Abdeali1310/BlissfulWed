/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { 
  Dialog, TextField, Button, DialogActions, 
  DialogContent, DialogTitle, MenuItem 
} from "@mui/material";
import axios from "axios";

const ProfileEditDialog = ({ open, onClose, admin }) => {
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    contact: admin?.contact || "",
    gender: admin?.gender || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/admin/${admin._id}`, formData, { withCredentials: true });
      onClose();
      window.location.reload(); // Refresh data
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", color: "#2c3e50" }}>
        Edit Profile
      </DialogTitle>
      
      <DialogContent sx={{ px: 3, py: 2 }}>
        <TextField 
          name="name" 
          label="Name" 
          fullWidth 
          margin="dense" 
          value={formData.name} 
          onChange={handleChange}
          sx={{ my: 1 }} 
        />

        <TextField 
          name="email" 
          label="Email" 
          fullWidth 
          margin="dense" 
          value={formData.email} 
          onChange={handleChange} 
          disabled
          sx={{ my: 1, bgcolor: "#f5f5f5" }}
        />

        <TextField 
          name="contact" 
          label="Contact" 
          fullWidth 
          margin="dense" 
          value={formData.contact} 
          onChange={handleChange} 
          sx={{ my: 1 }}
        />

        <TextField
          select
          name="gender"
          label="Gender"
          fullWidth
          margin="dense"
          value={formData.gender}
          onChange={handleChange}
          sx={{ my: 1 }}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "center" }}>
        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ px: 3 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ px: 3 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditDialog;
