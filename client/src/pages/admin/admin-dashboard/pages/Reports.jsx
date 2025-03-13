/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReviewsIcon from "@mui/icons-material/Reviews";
import CelebrationIcon from "@mui/icons-material/Celebration";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// Recharts for charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import ReportsTable from "./ReportsTable";

// Helper function to get the most popular event name
const getMostPopularEvent = (bookings) => {
  if (!bookings || bookings.length === 0) return "N/A";

  const eventCount = bookings.reduce((acc, booking) => {
    const eventName = booking.service ? booking.service.serviceType : "Unknown";
    acc[eventName] = (acc[eventName] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(eventCount).reduce(
    (max, [event, count]) => (count > max.count ? { event, count } : max),
    { event: "N/A", count: 0 }
  ).event;
};

const Reports = () => {
  // Fetching data from Redux store
  const users = useSelector((state) => state.user.users);
  const bookings = useSelector((state) => state.bookings.bookings);
  const reviews = useSelector((state) => state.reviews.reviews);

  // Calculate key metrics
  const totalUsers = users.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter((b) => b.status === "Booked")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const mostPopularEvent = useMemo(
    () => getMostPopularEvent(bookings),
    [bookings]
  );
  const avgRating = useMemo(() => {
    if (reviews.length === 0) return "N/A";
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }, [reviews]);

  const totalReviews = reviews.length;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  const formattedRevenue = formatCurrency(totalRevenue);

  // Metrics data array
  const metrics = [
    {
      label: "Total Users",
      value: totalUsers,
      bgColor: "#FDEBD0",
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      label: "Total Bookings",
      value: totalBookings,
      bgColor: "#D1F2EB",
      icon: <EventIcon fontSize="large" />,
    },
    {
      label: "Total Revenue",
      value: formattedRevenue,
      bgColor: "#FAD7A0",
      icon: <MonetizationOnIcon fontSize="large" />,
    },
    {
      label: "Most Popular Event",
      value: mostPopularEvent,
      bgColor: "#A9DFBF",
      icon: <CelebrationIcon fontSize="large" />,
    },
    {
      label: "Avg. User Rating",
      value: avgRating,
      bgColor: "#E8DAEF",
      icon: <span className="text-2xl">⭐</span>,
    },
    {
      label: "Total Reviews",
      value: totalReviews,
      bgColor: "#F5CBA7",
      icon: <ReviewsIcon fontSize="large" />,
    },
  ];

  // Bar Chart Data (Bookings per Event)
  const bookingsData = bookings.reduce((acc, booking) => {
    const eventName = booking.service ? booking.service.serviceType : "Unknown";
    acc[eventName] = (acc[eventName] || 0) + 1;
    return acc;
  }, {});

  const bookingsChartData = Object.keys(bookingsData).map((event) => ({
    name: event,
    bookings: bookingsData[event],
  }));

  // Pie Chart Data (Revenue per Event)
  const revenueChartData = bookings
    .filter((b) => b.status === "Booked")
    .reduce((acc, booking) => {
      const eventName = booking.service
        ? booking.service.serviceType
        : "Unknown";
      acc[eventName] = (acc[eventName] || 0) + booking.totalAmount;
      return acc;
    }, {});

  const pieChartData = Object.keys(revenueChartData).map((event) => ({
    name: event,
    value: revenueChartData[event],
  }));

  const colors = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042"];
  const generateTrendsData = (bookings) => {
    const monthOrder = [
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

    const monthlyBookings = bookings.reduce((acc, booking) => {
      const month = dayjs(booking.date).format("MMM"); // Extract month
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // Ensure all months are displayed, but bookings only for existing data
    return monthOrder.map((month) => ({
      month,
      bookings: monthlyBookings[month] || 0, // Keep 0 instead of generating fake trends
    }));
  };

  const downloadFullPagePDF = () => {
    const input = document.getElementById("reportPage"); // Capture only the report

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("report.pdf");
    });
  };
  

  const trendsData = generateTrendsData(bookings);
  return (
    <>
      <div id="reportPage">
        <Box sx={{ marginTop: "1rem", maxWidth: { xs: "100%", lg: "78%" } }}>
          {/* Key Metrics */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 3,
              textAlign: "start",
              color: "#2C3E50",
            }}
          >
            Key Metrics
          </Typography>

          <Grid
            container
            spacing={5}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    padding: 3,
                    borderRadius: "12px",
                    textAlign: "center",
                    backgroundColor: metric.bgColor,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {metric.icon}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#6C3483", mt: 1 }}
                  >
                    {metric.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mt: 1, color: "#1F618D" }}
                  >
                    {metric.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Charts Section */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mt: 5,
              mb: 3,
              textAlign: "start",
              color: "#2C3E50",
            }}
          >
            Analytics & Charts
          </Typography>

          <Grid container spacing={5}>
            {/* Bar Chart: Bookings per Event */}
            <Grid item xs={12} md={12} lg={10}>
              <Paper
                sx={{
                  padding: 3,
                  textAlign: "center",
                  bgcolor: "#f7d8dc",
                  minHeight: "50vh",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: "#e73885",
                    fontStyle: "-moz-initial",
                    fontWeight: "bold",
                  }}
                >
                  Bookings per Event
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={bookingsChartData}>
                    <XAxis
                      dataKey="name"
                      interval={0} // Ensures all labels are displayed
                      angle={0} // Rotates labels for better visibility
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#e73895" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Pie Chart: Revenue Distribution */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ minWidth: { xs: "100%", lg: "90%" } }}
            >
              {" "}
              {/* Full width for more space */}
              <Paper
                sx={{
                  padding: 5,
                  textAlign: "center",
                  backgroundColor: "#E3F2FD", // Soft pastel blue background
                  borderRadius: "12px", // Soft rounded corners
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: "#1565C0", // Deep blue title
                  }}
                >
                  Revenue Distribution
                </Typography>

                <ResponsiveContainer width="100%" height={500}>
                  {" "}
                  {/* Increased height */}
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={180} // Further increased radius for a much bigger chart
                      fill="#8884d8"
                      label
                    >
                      {pieChartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* line for trends */}

            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              sx={{ minHeight: "50vh", minWidth: { xs: "100%", lg: "90%" } }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  textAlign: "center",
                  color: "#1565C0",
                  backgroundColor: "#d1c4e9",
                  Width: "100%",
                  minHeight: "50vh",
                }}
              >
                <Typography variant="h6">Booking Trends</Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendsData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#38a1e7"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>


          {/* table */}
          <ReportsTable />
        </Box>
      </div>

      <Button
        sx={{ marginBlock: "2rem" }}
        variant="outlined"
        color="success"
        onClick={downloadFullPagePDF}
      >
        Download Report as PDF
      </Button>

      
    </>
  );
};

export default Reports;
