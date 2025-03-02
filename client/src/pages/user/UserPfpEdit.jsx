import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const UserPfpEdit = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    contact: "",
    city: "",
    dateOfEvent: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data.user);
      } catch (error) {
        setError("Failed to fetch profile.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:3000/api/user/profile/edit/${formData._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      setError("Error updating profile.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        backgroundColor: "#f7f8fc",
        padding: 2,
      }}
    >
      <Card sx={{ width: 380, boxShadow: 3, borderRadius: 2 }}>
        <CardContent sx={{ padding: 3 }}>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
          >
            Edit Profile
          </Typography>

          {error && (
            <Typography sx={{ color: "red", textAlign: "center", mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              fullWidth
              margin="dense"
              disabled={true} // 🔒 Prevents editing
              sx={{ backgroundColor: "#f0f0f0", borderRadius: 1 }}
            />

            <TextField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Date of Event"
              name="dateOfEvent"
              type="date"
              value={formData.dateOfEvent}
              onChange={handleChange}
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "48%" }}
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ width: "48%" }}
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserPfpEdit;
