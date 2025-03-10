/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TablePagination from "@mui/material/TablePagination";
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
  Button,
  Chip,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { format } from "date-fns";
import { fetchBookings } from "../../../../redux/slices/bookingSlice";

const getStatusColor = (status) => {
  switch (status) {
    case "Booked":
      return "success";
    case "Pending":
      return "warning";
    case "Rescheduled":
      return "info";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const Bookings = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const [search, setSearch] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [open, setOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const bookings = useSelector((state) => state.bookings.bookings);
  const payments = useSelector((state) => state.payments.payments); // Assuming payments exist in store
  

  // Get unique service types & statuses for filtering dropdowns
  const uniqueServiceTypes = [
    ...new Set(bookings.map((b) => b.service.serviceType)),
  ];
  const uniqueStatuses = [...new Set(bookings.map((b) => b.status))];

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    return (
      (booking.user?.username.toLowerCase().includes(search.toLowerCase()) ||
        search === "") &&
      (booking.service.serviceType === filterServiceType ||
        filterServiceType === "") &&
      (booking.status === filterStatus || filterStatus === "")
    );
  });
  const paginatedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const getPaymentDetails = (bookingId) => {
    if (!Array.isArray(payments) || payments.length === 0) {
      console.log("No payments found!");
      return 0;
    }

    const payment = payments.find(
      (p) => String(p.bookingId._id) === String(bookingId)
    );

    return payment ? payment.advanceAmount : 0;
  };

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const completedBookings = bookings.filter(
    (b) => b.status === "Booked"
  ).length;
  const totalRevenue = bookings
    .filter((b) => b.status === "Booked") // Only include completed bookings
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const dispatch = useDispatch();
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/booking/cancel/${bookingId}`
      );

      // Check if the deletion was successful
      if (response.data.success === true) {
        toast.success("Booking cancelled successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setOpen(false); // Close the modal if you have one
        dispatch(fetchBookings());
        // Optionally: Refresh bookings list or update UI
      } else {
        toast.error("Failed to cancel booking. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Server error, please try again later.";
      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{
        marginBottom: "1rem",
        padding: 3,
        maxWidth: { xs: "100%", lg: "83%" },
      }}
    >
      {/* Total Bookings */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            textAlign: "center",
            backgroundColor: "#1976D2",
            color: "#fff",
            borderRadius: 2,
            width: "100%",
            minWidth: "250px",
          }}
        >
          <Typography variant="h6">Total Bookings</Typography>
          <Typography variant="h4">{totalBookings || 0}</Typography>
        </Paper>
      </Grid>

      {/* Pending Bookings */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            textAlign: "center",
            backgroundColor: "#FFA726",
            color: "#fff",
            borderRadius: 2,
            width: "100%",
            minWidth: "250px",
          }}
        >
          <Typography variant="h6">Pending Bookings</Typography>
          <Typography variant="h4">{pendingBookings || 0}</Typography>
        </Paper>
      </Grid>

      {/* Completed Bookings */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            textAlign: "center",
            backgroundColor: "#43A047",
            color: "#fff",
            borderRadius: 2,
            width: "100%",
            minWidth: "250px",
          }}
        >
          <Typography variant="h6">Completed Bookings</Typography>
          <Typography variant="h4">{completedBookings || 0}</Typography>
        </Paper>
      </Grid>

      {/* Total Revenue */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            textAlign: "center",
            backgroundColor: "#8E24AA",
            color: "#fff",
            borderRadius: 2,
            width: "100%",
            minWidth: "250px",
          }}
        >
          <Typography variant="h6">Total Revenue</Typography>
          <Typography variant="h4">
            ₹
            {new Intl.NumberFormat("en-IN", { notation: "compact" }).format(
              totalRevenue || 0
            )}
          </Typography>
        </Paper>
      </Grid>

      {/* Bookings Table */}
      <Grid item xs={12} sx={{ padding: 3, marginBottom: "1rem", minWidth:{xs:"50vh" ,lg:"100%"} }}>
        {/* Title */}
        <Typography
          variant="h5"
          sx={{ p: 2, fontWeight: "bold", color: "#1e1e1e" }}
        >
          All Bookings
        </Typography>

        {/* Search & Filter Controls */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Search by Username */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search by User Name"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          {/* Filter by Service Type */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Service Type</InputLabel>
              <Select
                value={filterServiceType}
                onChange={(e) => setFilterServiceType(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueServiceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Filter by Status */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#1e1e1e" }}>User Name</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Type</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Service Type</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Address</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Time Slot</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Date</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Status</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Total Amount</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Amount Paid</TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>
                  Amount Remaining
                </TableCell>
                <TableCell sx={{ color: "#1e1e1e" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBookings.map((booking) => {
                const paidAmount = getPaymentDetails(booking._id);
                const remainingAmount = booking.totalAmount - paidAmount;

                return (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.user?.username || "N/A"}</TableCell>
                    <TableCell>{booking.type}</TableCell>
                    <TableCell>
                      {booking.service.serviceType || "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip title={booking.address || "N/A"} arrow>
                        <span>{booking.address || "N/A"}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{booking.timeSlot || "N/A"}</TableCell>
                    <TableCell>
                      {format(new Date(booking.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        sx={{
                          backgroundColor:
                            booking.status === "Pending"
                              ? "#FFA726"
                              : booking.status === "Booked"
                              ? "#43A047"
                              : booking.status === "Rescheduled"
                              ? "#1E88E5"
                              : "#D32F2F",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell>₹{booking.totalAmount}</TableCell>
                    <TableCell>₹{paidAmount}</TableCell>
                    <TableCell>₹{remainingAmount}</TableCell>
                    <TableCell>
                      {booking.status === "Cancelled" ? (
                        "N/A"
                      ) : (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setSelectedBooking(booking._id);
                            setOpen(true);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

          </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredBookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              handleCancelBooking(selectedBooking);
              setOpen(false);
            }}
            color="error"
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Bookings;
