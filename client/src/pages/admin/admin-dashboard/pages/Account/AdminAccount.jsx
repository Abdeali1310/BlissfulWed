/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import ProfileEditDialog from "./ProfileEditDialog";
import ProfilePictureUpload from "./ProfilePictureUpload";
import axios from "axios";

const AdminAccount = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirmLogout = () => {
    handleLogout();
    setOpen(false);
  };
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminId = localStorage.getItem("admin"); // Get from local storage
        const res = await axios.get(
          `http://localhost:3000/api/v1/admin/${adminId}`
        );
        setAdmin(res.data);
      } catch (error) {
        console.error("Error fetching admin data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin/signin"; // Redirect
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: { xs: "100%", lg: "78%" },
        backgroundColor: { xs: "", lg: "#fff5e4" },
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 400,
          minWidth: { xs: "10%", lg: "50%" },
          p: 4,
          height: 600,
          borderRadius: 3,
          boxShadow: 5,
          backgroundColor: "#fff",
          color: "#333",
        }}
      >
        <Avatar
          src={admin?.profilePic || "/default-avatar.png"}
          sx={{
            width: 140,
            height: 140,
            mx: "auto",
            mb: 2,
            border: "4px solid #e73895",
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e73895",
            color: "#fff",
            mb: 2,
            "&:hover": { backgroundColor: "#d02785" },
          }}
          onClick={() => setUploadOpen(true)}
        >
          Change Profile Picture
        </Button>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#4A235A", mb: 3, letterSpacing: 1 }}
        >
          {admin?.name?.charAt(0).toUpperCase() + admin?.name?.slice(1)}
        </Typography>

        <Typography
          variant="h5"
          sx={{ color: "#1B2631", fontSize: 22, my: 2, letterSpacing: 0.5 }}
        >
          {admin?.email}
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "#154360", fontSize: 20, my: 2, letterSpacing: 0.5 }}
        >
          Contact : +91 {admin?.contact}
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "#0E6251", fontSize: 20, my: 2, letterSpacing: 0.5 }}
        >
          Gender: {admin?.gender}
        </Typography>

        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            mt: 2,
            mr: 3,
            backgroundColor: "primary",
            "&:hover": { backgroundColor: "#d02785" },
          }}
          onClick={() => setEditOpen(true)}
        >
          Edit Profile
        </Button>

        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{
            mt: 2,
            backgroundColor: "#ff3d00",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
          onClick={() => setOpen(true)}
        >
          Logout
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>Are you sure you want to log out?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmLogout}
              color="error"
              variant="contained"
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <ProfileEditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        admin={admin}
      />
      <ProfilePictureUpload
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        adminId={admin?._id}
      />
    </Box>
  );
};

export default AdminAccount;
