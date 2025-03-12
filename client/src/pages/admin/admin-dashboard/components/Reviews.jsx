/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
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

const Review = () => {
  const reviews = useSelector((state) => state.reviews.reviews); // Fetch reviews from Redux store

  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtering and searching logic
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.userId?.username?.toLowerCase().includes(search.toLowerCase()) ||
        review.comment.toLowerCase().includes(search.toLowerCase());

      const matchesRating = filterRating
        ? review.rating === filterRating
        : true;
      const matchesType = filterType ? review.reviewType === filterType : true;

      return matchesSearch && matchesRating && matchesType;
    });
  }, [reviews, search, filterRating, filterType]);

  // 📊 Rating Distribution (Pie Chart)
  const ratingCounts = useMemo(() => {
    return reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});
  }, [reviews]);

  const ratingChartData = {
    labels: Object.keys(ratingCounts).map((r) => `${r} ⭐`),
    datasets: [
      {
        data: Object.values(ratingCounts),
        backgroundColor: [
          "#F8C8DC",
          "#A1C1D1",
          "#FFDAB9",
          "#E6E6FA",
          "#98FB98",
        ],
      },
    ],
  };

  // 📊 Review Type Distribution (Bar Chart)
  const typeCounts = useMemo(() => {
    return reviews.reduce((acc, review) => {
      acc[review.reviewType] = (acc[review.reviewType] || 0) + 1;
      return acc;
    }, {});
  }, [reviews]);

  const typeChartData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: "Number of Reviews",
        data: Object.values(typeCounts),
        backgroundColor: ["#E6A8D7", "#B2D8D8"],
      },
    ],
  };
  const { totalReviews, averageRating, positiveReviews, negativeReviews } =
    useMemo(() => {
      const total = reviews.length;
      if (total === 0) {
        return {
          totalReviews: 0,
          averageRating: 0,
          positiveReviews: 0,
          negativeReviews: 0,
        };
      }

      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const avgRating = totalRating / total;
      const positive = reviews.filter((review) => review.rating >= 4).length;
      const negative = reviews.filter((review) => review.rating <= 2).length;

      return {
        totalReviews: total,
        averageRating: avgRating,
        positiveReviews: positive,
        negativeReviews: negative,
      };
    }, [reviews]);
  return (
    <>
      {/* Summary Section */}
      <Grid
        container
        spacing={3}
        sx={{ marginTop: "1rem", maxWidth: { xs: "100%", lg: "80%" } }}
      >
        {/* Total Reviews */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: "12px",
              backgroundColor: "#E8F8F5", // Light teal
              textAlign: "center",
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#117A65" }}
            >
              Total Reviews
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#1ABC9C" }}
            >
              {totalReviews}
            </Typography>
          </Paper>
        </Grid>

        {/* Average Rating */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: "12px",
              backgroundColor: "#FDEDEC", // Light red
              textAlign: "center",
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#C0392B" }}
            >
              Average Rating
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#E74C3C" }}
            >
              {averageRating.toFixed(1)} ⭐
            </Typography>
          </Paper>
        </Grid>

        {/* Positive Reviews */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: "12px",
              backgroundColor: "#EBF5FB", // Light blue
              textAlign: "center",
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#2E86C1" }}
            >
              Positive Reviews
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#3498DB" }}
            >
              {positiveReviews}
            </Typography>
          </Paper>
        </Grid>

        {/* Negative Reviews */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: "12px",
              backgroundColor: "#F9EBEA", // Light pink
              textAlign: "center",
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#922B21" }}
            >
              Negative Reviews
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#C0392B" }}
            >
              {negativeReviews}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "1rem",
          marginBottom: "2rem",
          maxWidth: { xs: "100%", lg: "80%" },
        }}
      >
        {/* Heading for Charts */}
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "start",
              fontWeight: "bold",
              color: "#D16BA5",
              marginBottom: ".75rem",
            }}
          >
            Review Analysis
          </Typography>
        </Grid>

        {/* Pie Chart - Rating Distribution */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              borderRadius: "12px",
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FAF3E0",
              p:5 // Soft pastel background
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "1.25rem",
                color: "#8E44AD",
              }}
            >
              Rating Distribution
            </Typography>
            <Pie data={ratingChartData} />
          </Paper>
        </Grid>

        {/* Bar Chart - Review Type Distribution */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: "12px",
              height: "50vh", // Reduced height
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FDEBD0",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for a sleek look
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "0.8rem",
                color: "#8E44AD",
              }}
            >
              Review Type Distribution
            </Typography>
            <Box sx={{ width: "90%", height: "80%" }}>
              {" "}
              {/* Ensuring the chart is well-fitted */}
              <Bar
                data={{
                  ...typeChartData,
                  datasets: [
                    {
                      ...typeChartData.datasets[0],
                      backgroundColor: "#6EA8FE",
                      barPercentage: 0.6, // Adjusts the thickness of bars (smaller value = thinner bars)
                      categoryPercentage: 0.6, // Controls spacing between bars (smaller value = more space)
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Paper
        sx={{
          padding: 2,
          borderRadius: "12px",
          boxShadow: 3,
          maxWidth: { xs: "100%", lg: "78%" },
          marginTop: "2rem",
        }}
      >
        {/* Heading */}
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Customer Reviews
        </Typography>

        {/* Search & Filters */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <TextField
            label="Search Reviews"
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {[1, 2, 3, 4, 5].map((r) => (
                <MenuItem key={r} value={r}>
                  {r} ⭐
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Review Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Package">Package</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "8px", boxShadow: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e73895" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  User
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Review Type
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Rating
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Comment
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReviews
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((review) => (
                  <TableRow key={review._id}>
                    <TableCell>
                      {review.userId?.username || "Anonymous"}
                    </TableCell>
                    <TableCell>{review.reviewType}</TableCell>
                    <TableCell>{review.rating} ⭐</TableCell>
                    <TableCell
                      sx={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        maxWidth: "250px",
                      }}
                    >
                      {review.comment}
                    </TableCell>
                    <TableCell>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredReviews.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </>
  );
};

export default Review;
