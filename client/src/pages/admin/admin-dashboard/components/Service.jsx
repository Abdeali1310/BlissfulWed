/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fetchServices } from "../../../../redux/slices/serviceSlice";

const Service = () => {
  const services = useSelector((state) => state.services.services);

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const handleChange = (_, value) => setPage(value);
  const paginatedServices = services?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // State for analytics data
  const [topServices, setTopServices] = useState([]);
  const [mostBookedCategory, setMostBookedCategory] = useState("");
  const [averageRatings, setAverageRatings] = useState([]);
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState({
    serviceType: "",
    price: 0,
    category: "",
    description: "",
    duration: "",
    tags: [],
    discount: 0,
    fullInfo: "",
    cardImage: "",
    images: [],
    availability: true,
    isBestseller: false,
    availableEverywhere: true,
  });

  const handleServiceChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewService((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "tags" || name === "images"
          ? value.split(",").map((item) => item.trim())
          : name === "price" || name === "discount"
          ? Number(value) || 0
          : value,
    }));
  };
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/service/new", newService);
  
      if (res.status === 201) {
        toast.success("Service added successfully!"); // Success notification
        dispatch(fetchServices());
        
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service. Please try again."); // Error notification
    }
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const topServicesRes = await axios.get(
          "http://localhost:3000/api/v1/service/admin/get/top-booked-services"
        );
        const categoryRes = await axios.get(
          "http://localhost:3000/api/v1/service/admin/get/most-booked-category"
        );
        const avgRatingRes = await axios.get(
          "http://localhost:3000/api/v1/service/admin/get/average-rating"
        );

        setTopServices(topServicesRes.data);
        setMostBookedCategory(categoryRes.data?._id || "N/A");
        setAverageRatings(avgRatingRes.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  return (
    <Box p={4} sx={{ borderRadius: "12px", maxWidth:{xs:"100%",lg:"80%"} }}>
      <ToastContainer />
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        sx={{ fontFamily: "'Playfair Display', serif", color: "#D63384" }}
      >
        Wedding Services
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} maxWidth="90%">
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#EEC4C4", color: "#5A3D3D", p: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Services</Typography>
              <Typography variant="h4" fontWeight="bold">
                {services?.length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#C4EEDB", color: "#356859", p: 2 }}>
            <CardContent>
              <Typography variant="h6">Available Services</Typography>
              <Typography variant="h4" fontWeight="bold">
                {services?.filter((service) => service.availability).length ||
                  0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: "#ff5c5c", color: "#6A4C93", p: 2 }}>
            <CardContent>
              <Typography variant="h6">Unavailable Services</Typography>
              <Typography variant="h4" fontWeight="bold">
                {services?.filter((service) => !service.availability).length ||
                  0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Analysis Section */}
      <Typography
        variant="h5"
        fontWeight="bold"
        mt={4}
        sx={{ fontFamily: "'Playfair Display', serif", color: "#D63384" }}
      >
        Performance Analysis
      </Typography>

      <Grid container spacing={3} mt={2}>
        {/* Bar Chart - Top 5 Most Booked Services */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "#D1C4E9", p: 2 }}>
            <CardContent>
              <Typography variant="h6" color="#5A3D3D">
                Top 5 Most Booked Services
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topServices}>
                  <XAxis dataKey="serviceType" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalBookings" fill="#e73895" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart - Average Ratings per Service Type */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "#B2DFDB", p: 2 }}>
            <CardContent>
              <Typography variant="h6" color="#356859">
                Average Ratings
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={averageRatings.map((item) => ({
                      ...item,
                      avgRating: parseFloat(item.avgRating.toFixed(2)), // Formatting to 2 decimal places
                    }))}
                    dataKey="avgRating"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#82ca9d"
                  >
                    {averageRatings.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Services List */}
      <Typography
        variant="h5"
        fontWeight="bold"
        mt={4}
        sx={{ fontFamily: "'Playfair Display', serif", color: "#D63384" }}
      >
        Services List
      </Typography>

      <Grid container spacing={3} mt={2} justifyContent="center">
        {paginatedServices?.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service._id}>
            <Card
              sx={{
                backgroundColor: "#f3fdfe",
                p: 2,
                borderRadius: "10px",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#6A4C93",
                  }}
                >
                  {service.serviceType}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Price: ₹{service.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: service.availability ? "green" : "red",
                  }}
                >
                  {service.availability ? "Available" : "Unavailable"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(services?.length / rowsPerPage)}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </Box>

      {/* Add Service Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        + Add New Service
      </Button>

      {/* Add Service Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            margin: "50px auto",
            width: "600px", // Increased width for two columns
            borderRadius: "8px",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" sx={{  mb: 2 }}>
            Add New Service
          </Typography>

          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={6}>
              <TextField
                label="Service Type"
                name="serviceType"
                fullWidth
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <TextField
                label="Category"
                name="category"
                fullWidth
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <TextField
                label="Duration"
                name="duration"
                fullWidth
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <TextField
                label="Tags (comma-separated)"
                name="tags"
                fullWidth
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <TextField
                label="Discount"
                name="discount"
                type="number"
                fullWidth
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={6}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={2}
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <TextField
                label="Full Info"
                name="fullInfo"
                fullWidth
                multiline
                rows={3}
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <TextField
                label="Card Image URL"
                name="cardImage"
                fullWidth
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <TextField
                label="Additional Images (comma-separated URLs)"
                name="images"
                fullWidth
                onChange={handleServiceChange}
                sx={{ my: 1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isBestseller"
                    checked={newService.isBestseller}
                    onChange={handleServiceChange}
                  />
                }
                label="Bestseller"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="availability"
                    checked={newService.availability}
                    onChange={handleServiceChange}
                  />
                }
                label="Available"
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2, display: "block", mx: "auto" }}
            onClick={handleSubmit}
          >
            Add Service
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Service;

