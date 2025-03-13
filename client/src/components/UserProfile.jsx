/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import {
  FaUser,
  FaClipboardList,
  FaMoneyBill,
  FaCog,
  FaPen,
} from "react-icons/fa";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [historyData, setHistoryData] = useState({ payments: [], events: [] });
  const [activeSubTab, setActiveSubTab] = useState("payments");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const curr_userId = localStorage.getItem("user");
      if (!curr_userId) return;

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user",
          { curr_userId },
          { withCredentials: true }
        );
        setUser(response.data.user);
        setEditedUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const curr_userId = localStorage.getItem("userId"); // ✅ Get userId from localStorage

        if (!curr_userId) return;

        const response = await axios.get(
          `http://localhost:3000/api/v1/user/history/${curr_userId}`,
          { withCredentials: true }
        );

        console.log("History response:", response.data);

        // ✅ Store payment and event data in state
        setHistoryData({
          payments: response.data.payments || [],
          events: response.data.events || [],
        });
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleBack = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", editedUser.username);
      formData.append("city", editedUser.city);
      formData.append("bio", editedUser.bio);

      // ✅ If a new file is selected, add it to the FormData
      if (editedUser.profilePicFile) {
        formData.append("profilePic", editedUser.profilePicFile);
      }

      const response = await axios.put(
        `http://localhost:3000/api/v1/user/profile/edit/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // ✅ Necessary for file upload
          },
          withCredentials: true,
        }
      );

      // ✅ Update the state with the new user data
      setUser(response.data.user);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic" && files.length > 0) {
      const file = files[0];

      setEditedUser((prev) => ({
        ...prev,
        profilePicFile: file, // ✅ Save file for upload
        profilePicUrl: URL.createObjectURL(file), // ✅ Preview file
      }));
    } else {
      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (!user) return <Typography>Loading...</Typography>;

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser size={20} /> },
    { id: "history", label: "History", icon: <FaClipboardList size={20} /> },
    { id: "settings", label: "Settings", icon: <FaCog size={20} /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        color: "#000",
      }}
    >
      {/* === Sidebar === */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#e91e63",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            User Profile
          </Typography>
        </Box>

        <List>
          {tabs.map((tab) => (
            <ListItem
              button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                backgroundColor:
                  activeTab === tab.id ? "#d81b60" : "transparent",
                "&:hover": {
                  backgroundColor: "#c2185b",
                },
                borderRadius: "8px",
                margin: "4px 8px",
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* === Main Content === */}
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          overflowY: "auto",
          backgroundColor: "#fff",
        }}
      >
        {/* === Profile Tab === */}
        {activeTab === "profile" && (
          <>
            {/* Avatar with Edit Icon */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                src={editedUser.profilePicUrl || user.profilePicUrl}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: "3px solid #e91e63",
                }}
              />
              {isEditing && (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    backgroundColor: "#e91e63",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#d81b60" },
                  }}
                  component="label"
                >
                  <input
                    type="file"
                    name="profilePic"
                    hidden
                    onChange={handleChange}
                  />
                  <FaPen size={14} />
                </IconButton>
              )}
            </Box>

            {/* User Info */}
            {!isEditing ? (
              <>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {user.username}
                </Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>
                  Contact: {user.contact || "Not Provided"}
                </Typography>
                <Typography>City: {user.city || "Not Provided"}</Typography>
                <Typography>
                  Gender: {user.gender || "Not Specified"}
                </Typography>

                <Button
                  onClick={handleEdit}
                  sx={{
                    mt: 3,
                    backgroundColor: "#e91e63",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#d81b60" },
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Edit Profile
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Username"
                  value={editedUser.username}
                  name="username"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={editedUser.email}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Gender"
                  value={editedUser.gender}
                  name="gender"
                  onChange={(e) =>
                    setEditedUser((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                  fullWidth
                  margin="normal"
                  select
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                <TextField
                  label="Contact"
                  value={editedUser.contact}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="City"
                  value={editedUser.city}
                  name="city"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Bio"
                  value={editedUser.bio}
                  name="bio"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                />

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    onClick={handleBack}
                    sx={{
                      backgroundColor: "#ccc",
                      color: "#000",
                      "&:hover": { backgroundColor: "#bbb" },
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSave}
                    sx={{
                      backgroundColor: "#e91e63",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#d81b60" },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </>
            )}
          </>
        )}

        {/* === History Tab === */}
        {activeTab === "history" && (
          <>
            {/* Sub-Tabs */}
            <Tabs
              value={activeSubTab}
              onChange={(e, newValue) => setActiveSubTab(newValue)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                mb: 2,
                "& .MuiTab-root": {
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#555",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "#fce4ec",
                    color: "#e91e63",
                    transition: "all 0.2s ease",
                  },
                },
                "& .Mui-selected": {
                  color: "#e91e63",
                  backgroundColor: "#f8bbd0",
                  fontWeight: "600",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#e91e63",
                  height: "4px",
                  borderRadius: "2px",
                },
              }}
            >
              <Tab
                label="Payments"
                value="payments"
                sx={{
                  textTransform: "none",
                  marginRight: "8px",
                }}
              />
              <Tab
                label="Events"
                value="events"
                sx={{
                  textTransform: "none",
                  marginLeft: "8px",
                }}
              />
            </Tabs>

            {activeSubTab === "payments" && (
              <>
                {historyData.payments.length > 0 ? (
                  historyData.payments.map((payment, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "#fafafa",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        transition: "0.3s",
                        "&:hover": {
                          backgroundColor: "#f1f1f1",
                        },
                      }}
                    >
                      <Typography fontWeight="bold" color="green">
                        ₹{payment.totalAmount}
                      </Typography>
                      <Typography>Status: {payment.paymentStatus}</Typography>
                      <Typography>Method: {payment.paymentMethod}</Typography>
                      <Typography>
                        Paid on: {new Date(payment.paidAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No payment history available</Typography>
                )}
              </>
            )}

            {activeSubTab === "events" && (
              <>
                {historyData.events.length > 0 ? (
                  historyData.events.map((event, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        transition: "0.3s ease",
                        "&:hover": {
                          backgroundColor: "#f1f1f1",
                        },
                      }}
                    >
                      <Typography fontWeight="bold" color="#e91e63">
                        {event.type === "Service"
                          ? event.service.serviceType
                          : event.package.packageName}
                      </Typography>
                      <Typography>Status: {event.status}</Typography>
                      <Typography>
                        Date: {new Date(event.date).toLocaleDateString()}
                      </Typography>
                      <Typography>Guests: {event.noOfGuests}</Typography>
                      <Typography>
                        Total Amount: ₹{event.totalAmount}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No event history available</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
