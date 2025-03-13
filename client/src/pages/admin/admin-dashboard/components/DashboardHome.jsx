/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const themeColor = "#e73895"; // Wedding Theme Color

const DashboardHome = () => {
  const users = useSelector((state) => state.user.users);
  const bookings = useSelector((state) => state.bookings.bookings);
  const payments = useSelector((state) => state.payments.payments);
  const reviews = useSelector((state) => state.reviews.reviews);
  const services = useSelector((state) => state.services.services);

  const revenue = bookings
  .filter((b) => b.status === "Booked")
  .reduce((sum, b) => sum + b.totalAmount, 0);
  // Dynamic Monthly Bookings Data
  const bookingsData = bookings
    .reduce((acc, booking) => {
      const month = new Date(booking.date).toLocaleString("default", {
        month: "short",
      });
      const found = acc.find((item) => item.month === month);
      if (found) {
        found.count += 1;
      } else {
        acc.push({ month, count: 1 });
      }
      return acc;
    }, [])
    .sort(
      (a, b) => new Date(`01 ${a.month} 2024`) - new Date(`01 ${b.month} 2024`)
    );

    const formatRevenue = (revenue) => {
        if (revenue >= 10000000) {
          return `₹${(revenue / 10000000).toFixed(2)} Cr`; // Crores
        } else if (revenue >= 100000) {
          return `₹${(revenue / 100000).toFixed(2)} L`; // Lakhs
        } else {
          return `₹${new Intl.NumberFormat("en-IN").format(revenue)}`;
        }
      };
      
  const BOOKINGCOLORS = {
    Booked: "#28a745", // Green
    Pending: "#ffc107", // Yellow
    Cancelled: "#dc3545", // Red
  };
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize revenue with all months set to 0
  const revenueData = monthNames.map((month) => ({
    month,
    revenue: 0,
  }));

  // Populate revenueData with actual payments
  payments
    .filter((payment) => payment.paymentStatus === "Paid")
    .forEach((payment) => {
      if (!payment.paidAt) return;

      const month = new Date(payment.paidAt).toLocaleString("default", {
        month: "short",
      });

      const index = revenueData.findIndex((item) => item.month === month);
      if (index !== -1) {
        revenueData[index].revenue += payment.totalAmount;
      }
    });

  // Booking Status Pie Chart Data
  const bookingStatusData = [
    {
      name: "Booked",
      value: Array.isArray(bookings)
        ? bookings.filter((b) => b.status === "Booked").length
        : 0,
    },
    {
      name: "Pending",
      value: Array.isArray(bookings)
        ? bookings.filter((b) => b.status === "Pending").length
        : 0,
    },
    {
      name: "Cancelled",
      value: Array.isArray(bookings)
        ? bookings.filter((b) => b.status === "Cancelled").length
        : 0,
    },
  ];

  // Ensure at least one non-zero value to avoid empty chart
  const hasData = bookingStatusData.some((item) => item.value > 0);

  const COLORS = ["#e73895", "#38a1e7", "#28a745", "#ff5733", "#6a0dad"]; // Removed yellow

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 3 },
          justifyContent: { xs: "center", lg: "start" },
          width: "100%",
          marginTop: "1rem",
          marginLeft: "0.75rem",
        }}
      >
        {/* Total Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={4}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#e73895",
              color: "#fff",
              borderRadius: 2,
              width: "100%",
              minWidth: "250px",
            }}
          >
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{users?.length || 0}</Typography>
          </Paper>
        </Grid>

        {/* Total Bookings */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={4}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#38a1e7",
              color: "#fff",
              borderRadius: 2,
              width: "100%",
              minWidth: "250px",
            }}
          >
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{bookings?.length || 0}</Typography>
          </Paper>
        </Grid>

        {/* Total Revenue */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3} // Softer shadow
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#d63384", // Lighter, elegant pink
              color: "#fff",
              borderRadius: 2,
              width: "100%",
              minWidth: "250px",
            }}
          >
            <Typography variant="h6" fontWeight={500}>
              Total Revenue
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              {formatRevenue(revenue)}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Reviews */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={4}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#38a1e7",
              color: "#fff",
              borderRadius: 2,
              width: "100%",
              minWidth: "250px",
            }}
          >
            <Typography variant="h6">Total Reviews</Typography>
            <Typography variant="h4">{reviews?.length || 0}</Typography>
          </Paper>
        </Grid>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{
          padding: 3,
          justifyContent: { sm: "center", lg: "start" },
          alignItems: { sm: "center", lg: "start" },
          maxWidth: { sm: "100%", lg: "80%" },
        }}
      >
        {/* Bar Chart - Monthly Bookings */}
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              color: "#e73895",
            }}
          >
            <Typography variant="h6">Monthly Bookings</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#e73895"
                  barSize={80}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Line Chart - Revenue Trend */}
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{ padding: 3, textAlign: "center", color: "#38a1e7" }}
          >
            <Typography variant="h6">Revenue Trend</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#38a1e7"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart - Booking Status */}
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={5}
            sx={{
              padding: 4,
              textAlign: "center",
              color: "#e73895",
              backgroundColor: "#fff",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{ marginBottom: 2, fontWeight: "bold" }}
            >
              Booking Status
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60} // Adds a modern donut effect
                  label
                >
                  {bookingStatusData.map((entry) => (
                    <Cell key={entry.name} fill={BOOKINGCOLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconSize={12}
                  wrapperStyle={{ color: "#fff", fontSize: "14px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Reviews */}
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#f5f5f5", // Ensure visibility
              color: "#1e1e1e",
            }}
          >
            <Typography variant="h6">Recent Reviews</Typography>

            {reviews && reviews.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", color: "#1e1e1e" }}>
                        User
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#1e1e1e" }}>
                        Review
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reviews.slice(0, 5).map((review, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "#1e1e1e" }}>
                          {review.userId?.username || "Anonymous"}{" "}
                          {/* Ensure user name is shown */}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#1e1e1e",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px",
                          }}
                          title={review.comment} // Shows full text on hover
                        >
                          {review.comment}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                No reviews available.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardHome;

