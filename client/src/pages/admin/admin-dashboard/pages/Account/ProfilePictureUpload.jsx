/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const ProfilePictureUpload = ({ open, onClose, adminId }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleUpload = async () => {
    if (!image) {
      console.error("No image selected.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePic", image);
    formData.append("adminId", adminId);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/upload-profile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload successful:", response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ inert: isUploading }}>
      <DialogTitle>Upload Profile Picture</DialogTitle>
      <DialogContent>
        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Profile Preview"
            style={{ width: "100%",borderRadius:"90%", maxHeight: "400px", objectFit: "cover", marginBottom: "10px",}}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        <Button
          onClick={handleUpload}
          disabled={!image || isUploading}
          variant="contained"
          sx={{ mt: 2 }}
        >
          {isUploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureUpload;
