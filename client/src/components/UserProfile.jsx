import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Avatar,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
} from '@mui/material';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    contact: "",
    bio: "",
    profilePicUrl: "",
    gender: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ✅ Updated fetchUserProfile to log the user object and _id
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/v1/user/current", {
        withCredentials: true,
      });
  
      console.log("Raw Response:", res); // ✅ Log the full response
      console.log("Response Data:", res.data);
  
      // Check the correct path to user data
      if (res.data?.user) {
        setUser(res.data.user);
        console.log("Fetched User Data:", res.data.user);
      } else {
        console.error("User data is missing in response");
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      setLoading(false);
    }
  };
  
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleUpdate = async () => {
    console.log("User ID before update:", user._id);
    if (!user._id) {
      alert("User ID is missing!");
      return;
    }

    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append('username', user.username || "");
      formData.append('bio', user.bio || "");
      formData.append('gender', user.gender || "");
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }

      await axios.put(`/api/v1/user/edit/${user._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Profile updated successfully');
      fetchUserProfile(); // ✅ Refresh user data after update
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (!user._id) return <div>No user data found</div>;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" mb={2}>User Profile</Typography>

      {/* ✅ Profile Picture */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar
          src={user.profilePicUrl}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
      </Box>
      <input type="file" onChange={handleFileChange} />

      {/* ✅ Username */}
      <TextField
        fullWidth
        label="Name"
        name="username"
        value={user.username}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      {/* ✅ Email */}
      <TextField
        fullWidth
        label="Email"
        value={user.email}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      {/* ✅ Phone */}
      <TextField
        fullWidth
        label="Phone"
        value={user.contact}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      {/* ✅ Bio */}
      <TextField
        fullWidth
        label="Bio"
        name="bio"
        value={user.bio}
        onChange={handleChange}
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      {/* ✅ Gender */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={user.gender}
          onChange={handleChange}
          name="gender"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      {/* ✅ Update Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpdate}
        disabled={updating}
      >
        {updating ? 'Updating...' : 'Save Changes'}
      </Button>
    </Box>
  );
};

export default UserProfile;
