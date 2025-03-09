/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const UserProfile = ({ userId, goBack }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  const fetchUserData = async () => {
    try {
      const [userRes, bookingRes, paymentRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/v1/user/${userId}`),
        axios.get(`http://localhost:3000/api/v1/booking/user/${userId}`),
        axios.get(`http://localhost:3000/api/v1/payment/user/${userId}`),
      ]);

      setUser(userRes.data);
      setBookings(bookingRes.data.bookings || []);
      setPayments(paymentRes.data.payments || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  if (!user)
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;

  const pieData = {
    labels: ["Advance Paid", "Remaining Amount"],
    datasets: [
      {
        data: [
          payments.reduce((sum, p) => sum + p.advanceAmount, 0),
          payments.reduce((sum, p) => sum + p.remainingAmount, 0),
        ],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#388e3c", "#d32f2f"],
      },
    ],
  };

  const bookingTypes = {};
  bookings.forEach((booking) => {
    bookingTypes[booking.type] = (bookingTypes[booking.type] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(bookingTypes),
    datasets: [
      {
        label: "Number of Bookings",
        data: Object.values(bookingTypes),
        backgroundColor: "#3f51b5",
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "96%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: { sm: "100%", lg: "80%" },
          p: 3,
          mt: "2rem",
          boxShadow: 3,
        }}
      >
        <Grid container spacing={4}>
          {/* User Info - Always Full Width on Small Screens */}
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Avatar
                src={user.profilePicture}
                sx={{ width: 120, height: 120, margin: "auto" }}
              />
              <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
                {user.username}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
                {user.bio || "No bio available"}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                📍 {user.city || "Unknown City"}
              </Typography>
              <Typography sx={{ mt: 1 }}>✉ Email: {user.email}</Typography>
              <Typography sx={{ mt: 1 }}>📞 Contact: {user.contact}</Typography>
              <Typography sx={{ mt: 1 }}>
                ⚧ Gender:{" "}
                {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              </Typography>
            </Box>
          </Grid>

          {/* Booking & Payment Tables - Now Full Width on Smaller Screens */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              📅 Bookings
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time Slot</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Guests</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>
                          {new Date(booking.date).toDateString()}
                        </TableCell>
                        <TableCell>{booking.timeSlot || "N/A"}</TableCell>
                        <TableCell>{booking.type}</TableCell>
                        <TableCell>{booking.noOfGuests || "N/A"}</TableCell>
                        <TableCell>{booking.contact || "N/A"}</TableCell>
                        <TableCell>{booking.address}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>₹{booking.totalAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              💰 Payments
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Advance Paid</TableCell>
                      <TableCell>Remaining</TableCell>
                      <TableCell>Total Amount</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Payment Method</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Refund Status</TableCell>
                      <TableCell>Cancellation</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment._id}>
                        <TableCell>₹{payment.advanceAmount}</TableCell>
                        <TableCell>₹{payment.remainingAmount}</TableCell>
                        <TableCell>₹{payment.totalAmount}</TableCell>
                        <TableCell>
                          {payment.dueDate
                            ? new Date(payment.dueDate).toDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>{payment.paymentMethod}</TableCell>
                        <TableCell
                          sx={{
                            color:
                              payment.paymentStatus === "Paid"
                                ? "green"
                                : payment.paymentStatus === "Pending"
                                ? "red"
                                : "orange",
                          }}
                        >
                          {payment.paymentStatus}
                        </TableCell>
                        <TableCell>{payment.refundStatus}</TableCell>
                        <TableCell>
                          {payment.cancellationStatus !== "Not Cancelled"
                            ? payment.cancellationStatus
                            : "No Cancellation"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          {/* Charts - Now Full Width on Small Screens */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
              💰 Payment Breakdown
            </Typography>
            <Box sx={{ width: "100%", maxWidth: 400, margin: "auto" }}>
              <Pie data={pieData} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
              📊 Booking Trends
            </Typography>
            <Box sx={{ width: "100%", maxWidth: 400, margin: "auto" }}>
              <Bar data={barData} />
            </Box>
          </Grid>

          {/* Back Button */}
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              sx={{
                fontSize: "0.75rem",
                padding: "10px 20px",
                bgcolor: "#e73985",
              }}
              onClick={goBack}
            >
              Back to User Management
            </Button>
          </Grid>
        </Grid>
        ;
      </Card>
    </Box>
  );
};

export default UserProfile;
