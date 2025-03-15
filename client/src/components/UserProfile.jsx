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
  Grid,
  IconButton,
  Stack,
  Modal,
} from "@mui/material";
import {
  FaUser,
  FaClipboardList,
  FaMoneyBill,
  FaCog,
  FaPen,
  FaLock,
  FaArrowLeft,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestForm from "../pages/admin/admin-dashboard/components/Support/RequestForm";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [historyData, setHistoryData] = useState({
    previouslyBookedEvents: [],
    upcomingEvents: [],
    remainingAmount: [],
    totalPayments: 0,
    payments: [], // ✅ Ensure payments array is initialized
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [bookings, setBookings] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => setOpenDrawer(!openDrawer);
  const navigate = useNavigate();
  const [openRefundModal, setOpenRefundModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleOpenRefundModal = (transactionId) => {
    setSelectedTransaction(transactionId);
    setOpenRefundModal(true);
  };

  const handleCloseRefundModal = () => {
    setOpenRefundModal(false);
    setSelectedTransaction(null);
  };

  const handleLogout = () => {
    try {
      // ✅ Remove userId from localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("user");

      // ✅ Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const curr_userId = localStorage.getItem("user");
        if (!curr_userId) return;

        const response = await axios.post(
          "http://localhost:3000/api/v1/user",
          { curr_userId },
          { withCredentials: true }
        );

        setUser(response.data.user);
        setEditedUser(response.data.user);

        // ✅ Store userId for fetching history
        localStorage.setItem("userId", response.data.user._id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    setTimeout(() => setActiveTab("profile"), 0);

    fetchUserDetails(); // ✅ Correctly define and call the function
  }, []);

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/user/changePassword/${user._id}`,
        {
          oldPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true }
      );

      toast.success(response.data.msg || "Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  const fetchUserBookings = async () => {
    try {
      const curr_userId = localStorage.getItem("user");
      if (!curr_userId) return;

      const response = await axios.get(
        `http://localhost:3000/api/v1/booking/user/${curr_userId}`, // ✅ Pass userId in URL
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "events") {
      fetchUserBookings(); // ✅ Fetch bookings when "events" tab is active
    }
  }, [activeTab]);

  const tableCellStyle = {
    padding: "12px",
    textAlign: "center",
    border: "1px solid #ddd",
    fontSize: "14px",
    color: "#333", // Ensure text is visible
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const curr_userId = localStorage.getItem("userId");
        if (!curr_userId) return;

        const response = await axios.get(
          `http://localhost:3000/api/v1/payment/user/${curr_userId}`,
          { withCredentials: true }
        );

        // ✅ If `response.data` is an object, extract the `payments` array
        const formattedData = Array.isArray(response.data)
          ? response.data
          : response.data?.payments || [];

        const formattedPayments = formattedData.map((payment) => ({
          ...payment,
          _id: payment?._id?.toString() || "",
          userId: payment?.userId?.toString() || "",
          bookingId: payment?.bookingId || {},
        }));

        setHistoryData((prev) => ({
          ...prev,
          payments: formattedPayments,
        }));
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {}, [historyData]);

  const handleEdit = () => setIsEditing(true);

  const handleBack = () => {
    setIsEditing(false);
    setEditedUser(user);
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
      setEditedUser((prev) => {
        const updatedUser = { ...prev, [name]: value }; // ✅ Ensure gender is updated
        return updatedUser;
      });
    }
  };

  useEffect(() => {}, [editedUser]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", editedUser.username);
      formData.append("city", editedUser.city);
      formData.append("bio", editedUser.bio);
      formData.append("gender", editedUser.gender);

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
      setUpdateTrigger((prev) => prev + 1);
      setIsEditing(false);

      // ✅ Show success toast
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      // ✅ Show error toast
      toast.error("Failed to update profile");
    }
  };

  if (!user) return <Typography>Loading...</Typography>;

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser size={20} /> },
    {
      id: "transaction",
      label: "Transaction",
      icon: <FaMoneyBill size={20} />,
    },
    { id: "events", label: "Events", icon: <FaClipboardList size={20} /> },
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
      <ToastContainer />

      {/* === Sidebar === */}

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          overflowx: "hidden",
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#e91e63",
            color: "#fff",
            overflowX: "hidden",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              borderRadius: "12px",
              backgroundColor: "#fff8f8",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
              margin: "auto",
              minWidth: "120vh",
              minHeight: "80vh",
            }}
          >
            {/* Avatar with Edit Icon */}
            <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
              <Avatar
                src={editedUser.profilePicUrl || user.profilePicUrl}
                sx={{
                  width: 140,
                  height: 140,
                  mb: 2,
                  border: "4px solid #f8b6d2",
                  boxShadow: "0px 8px 24px rgba(248, 182, 210, 0.4)",
                }}
              />
              {isEditing && (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    backgroundColor: "#d04a78",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#a9144b" }, // Slightly darker pink hover
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
              <div className=" min-w-[70vh]">
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: "#2a2a2a", // Dark color for text contrast
                    fontFamily: '"Merriweather", serif',
                    fontSize: "2rem",
                  }}
                >
                  {user.username}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    px: 2,
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                    padding: "16px",
                  }}
                >
                  {[
                    { label: "Email", value: user.email },
                    { label: "Contact", value: user.contact || "Not Provided" },
                    { label: "City", value: user.city || "Not Provided" },
                    { label: "Gender", value: user.gender || "Not Specified" },
                    { label: "Bio", value: user.bio || "Not Provided" },
                  ].map((item, index) => (
                    <Typography
                      key={index}
                      sx={{
                        color: "#5f5f5f",
                        fontFamily: '"Lora", serif',
                        fontSize: "1.3rem",
                        fontWeight: "500",
                        mb: 1,
                      }}
                    >
                      <strong>{item.label}:</strong> {item.value}
                    </Typography>
                  ))}
                </Box>

                <Stack
                  direction="row"
                  spacing={3} // Adjust space between buttons
                  mt={3}
                  width="100%"
                  justifyContent="center"
                >
                  <Button
                    onClick={handleEdit}
                    startIcon={<FaPen />}
                    sx={{
                      backgroundColor: "#c2185b",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#a9144b",
                        transform: "scale(1.05)",
                      },
                      padding: "12px 24px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      borderRadius: "30px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Edit Profile
                  </Button>

                  <Button
                    onClick={() => navigate("/")}
                    startIcon={<FaArrowLeft />}
                    sx={{
                      backgroundColor: "#d6d6d6",
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "#bdbdbd",
                        transform: "scale(1.05)",
                      },
                      padding: "12px 24px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      borderRadius: "30px",
                    }}
                  >
                    Back
                  </Button>
                </Stack>
              </div>
            ) : (
              <Box sx={{ width: "100%", maxWidth: "800px", mx: "auto", p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Username"
                      value={editedUser.username}
                      name="username"
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      sx={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      value={editedUser.email}
                      fullWidth
                      margin="normal"
                      disabled
                      sx={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Gender"
                      name="gender"
                      value={editedUser.gender || ""}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      select
                      sx={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Contact"
                      value={editedUser.contact}
                      fullWidth
                      margin="normal"
                      disabled
                      sx={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="City"
                      value={editedUser.city}
                      name="city"
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      sx={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Bio"
                      value={editedUser.bio}
                      name="bio"
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      multiline
                      rows={3}
                      sx={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                </Grid>

                <Stack
                  direction="row"
                  spacing={2}
                  mt={3}
                  justifyContent="center"
                >
                  <Button
                    onClick={handleBack}
                    sx={{
                      backgroundColor: "#d6d6d6",
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "#bdbdbd",
                        transform: "scale(1.05)",
                      },
                      padding: "12px 20px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      borderRadius: "30px", // Rounded corners
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSave}
                    sx={{
                      backgroundColor: "#c2185b", // Soft pink
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#a9144b",
                        transform: "scale(1.05)",
                      },
                      padding: "12px 20px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      borderRadius: "30px", // Rounded corners
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
                    }}
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        )}
        {activeTab === "transaction" && (
          <>
            {/* === Back Button === */}

            <Typography variant="h5" fontWeight="bold" mb={2}>
              Your Transactions:
            </Typography>

            {historyData?.payments?.length > 0 ? (
              <Box sx={{ overflowX: "auto", maxWidth: "90%" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "10px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  {/* === Table Head === */}
                  <thead>
                    <tr style={{ backgroundColor: "#e73895", color: "#fff" }}>
                      <th style={tableCellStyle}>Service Name</th>
                      <th style={tableCellStyle}>Advance Amount</th>
                      <th style={tableCellStyle}>Remaining Amount</th>
                      <th style={tableCellStyle}>Total Amount</th>
                      <th style={tableCellStyle}>Payment Method</th>
                      <th style={tableCellStyle}>Payment Status</th>
                      <th style={tableCellStyle}>Refund Status</th>
                      <th style={tableCellStyle}>Refund Amount</th>
                      <th style={tableCellStyle}>Paid At</th>
                      <th style={tableCellStyle}>Due Date</th>
                      <th style={tableCellStyle}>Refund</th>
                    </tr>
                  </thead>
                  {/* === Table Body === */}
                  <tbody>
                    {historyData.payments.map((payment, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#fafafa" : "#f1f1f1",
                          transition: "background-color 0.3s",
                        }}
                      >
                        <td style={tableCellStyle}>
                          {payment?.bookingId?.service?.serviceType ?? "N/A"}
                        </td>
                        <td style={tableCellStyle}>
                          ₹{payment?.advanceAmount ?? "0"}
                        </td>
                        <td style={tableCellStyle}>
                          ₹{payment?.remainingAmount ?? "0"}
                        </td>
                        <td style={tableCellStyle}>
                          ₹{payment?.totalAmount ?? "0"}
                        </td>
                        <td style={tableCellStyle}>
                          {payment?.paymentMethod ?? "Not Specified"}
                        </td>
                        <td style={tableCellStyle}>
                          {payment?.paymentStatus ?? "Unknown"}
                        </td>
                        <td style={tableCellStyle}>
                          {payment?.refundStatus ?? "Not Requested"}
                        </td>
                        <td style={tableCellStyle}>
                          ₹{payment?.refundAmount ?? "0"}
                        </td>

                        <td style={tableCellStyle}>
                          {payment?.paidAt
                            ? new Date(payment.paidAt).toLocaleDateString()
                            : "Not Available"}
                        </td>
                        <td style={tableCellStyle}>
                          {payment?.dueDate
                            ? new Date(payment.dueDate).toLocaleDateString()
                            : "Not Available"}
                        </td>
                        {/* ✅ Add Request for Refund Button */}
                        {payment?.remainingAmount === 0 &&
                          payment?.refundStatus != "Refunded" && (
                            <td style={tableCellStyle}>
                              <Button
                                onClick={() =>
                                  handleOpenRefundModal(payment.transactionId)
                                }
                                sx={{
                                  backgroundColor: "#d81b60",
                                  color: "#fff",
                                  "&:hover": { backgroundColor: "#d81b60" },
                                  padding: "5px 10px",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  borderRadius: "6px",
                                  textTransform: "none",
                                  minWidth: "20vh",
                                }}
                              >
                                Refund Request
                              </Button>
                            </td>
                          )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            ) : (
              <Typography>No payment history available</Typography>
            )}
            <Box
              sx={{
                mt: 4, // ✅ Added more top margin for spacing
                pt: 2, // ✅ Added internal padding from top
                display: "flex", // ✅ Use flex for alignment
                justifyContent: "flex-start", // ✅ Align to the left side
              }}
            >
              <Button
                onClick={() => setActiveTab("profile")}
                sx={{
                  backgroundColor: "#ccc",
                  color: "#000",
                  "&:hover": { backgroundColor: "#bbb" },
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                Back
              </Button>
            </Box>
          </>
        )}
        <Modal open={openRefundModal} onClose={handleCloseRefundModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 3,
              borderRadius: 2,
              minWidth: 400,
            }}
          >
            <RequestForm />
          </Box>
        </Modal>
        {activeTab === "events" && (
          <>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Your Bookings:
            </Typography>

            {bookings.length > 0 ? (
              <Box sx={{ overflowX: "auto", minWidth: "120vh" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "10px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  {/* Table Head */}
                  <thead>
                    <tr style={{ backgroundColor: "#e91e63", color: "#fff" }}>
                      <th style={tableCellStyle}>Service</th>

                      <th style={tableCellStyle}>Date</th>
                      <th style={tableCellStyle}>Time Slot</th>
                      <th style={tableCellStyle}>Guests</th>
                      <th style={tableCellStyle}>Total Amount</th>
                      <th style={tableCellStyle}>Status</th>
                      <th style={tableCellStyle}>Address</th>
                      <th style={tableCellStyle}>Cancel Booking</th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#fafafa" : "#f1f1f1",
                          transition: "background-color 0.3s",
                        }}
                      >
                        <td style={tableCellStyle}>
                          {booking?.service?.serviceType}
                        </td>

                        <td style={tableCellStyle}>
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                        <td style={tableCellStyle}>
                          {booking.timeSlot || "N/A"}
                        </td>
                        <td style={tableCellStyle}>
                          {booking.noOfGuests || 0}
                        </td>
                        <td style={tableCellStyle}>
                          ₹{booking.totalAmount || 0}
                        </td>
                        <td style={tableCellStyle}>{booking.status}</td>
                        <td style={tableCellStyle}>{booking.address}</td>
                        <td style={tableCellStyle}>
                          {new Date(booking.date) > new Date() &&
                          booking.status !== "Cancelled" ? (
                            <Button
                              onClick={() => handleOpenRefundModal(booking._id)}
                              sx={{
                                backgroundColor: "#ff3d00",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#d32f2f" },
                                padding: "5px 10px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                borderRadius: "6px",
                                textTransform: "none",
                                minWidth: "20vh",
                              }}
                            >
                              Cancel Booking
                            </Button>
                          ) : (
                            <Typography
                              sx={{ color: "#d32f2f", fontWeight: "bold" }}
                            >
                              {booking.status}
                            </Typography>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            ) : (
              <Typography>No bookings available</Typography>
            )}

            {/* Back Button */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                onClick={() => setActiveTab("profile")}
                sx={{
                  backgroundColor: "#ccc",
                  color: "#000",
                  "&:hover": { backgroundColor: "#bbb" },
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                Back
              </Button>
            </Box>
          </>
        )}

        {activeTab === "settings" && (
          <>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Settings
            </Typography>

            {/* Change Password */}
            <TextField
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />

            {/* ✅ Stack for better alignment */}
            <Stack spacing={2} mt={2} alignItems="center">
              {/* Change Password Button */}
              <Button
                onClick={handleChangePassword}
                fullWidth
                startIcon={<FaLock />}
                sx={{
                  backgroundColor: "#e91e63",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#d81b60" },
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Change Password
              </Button>

              {/* Back Button */}
              <Button
                onClick={() => setActiveTab("profile")}
                fullWidth
                startIcon={<FaArrowLeft />}
                sx={{
                  backgroundColor: "#ccc",
                  color: "#000",
                  "&:hover": { backgroundColor: "#bbb" },
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Back
              </Button>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                fullWidth
                startIcon={<FaSignOutAlt />}
                sx={{
                  backgroundColor: "#ff3d00",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#d32f2f" },
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
