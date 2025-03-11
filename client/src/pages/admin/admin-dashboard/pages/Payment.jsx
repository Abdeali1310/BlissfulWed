/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Table,
  TableContainer,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Payments as PaymentsIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  CreditCard as CreditCardIcon,
  PendingActions as PendingActionsIcon,
  Error as ErrorIcon,
  Redeem as RedeemIcon,
  CurrencyRupee as CurrencyRupeeIcon,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Pie, Bar, Line } from "react-chartjs-2";
import { fetchPayments } from "../../../../redux/slices/paymentSlice";
import axios from "axios";

// Registering Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const Payment = () => {
  const payments = useSelector((state) => state.payments?.payments || []);

  // Aggregating Payment Data
  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.paymentStatus === "Paid" ? p.totalAmount : 0),
    0
  );
  const upiCount = payments.filter((p) => p.paymentMethod === "UPI").length;
  const cardCount = payments.filter((p) =>
    p.paymentMethod.includes("CARD")
  ).length;
  const netBankingCount = payments.filter((p) =>
    p.paymentMethod.includes("NETBANKING")
  ).length;
  const totalTransactions = payments.length;
  const pendingCount = payments.filter(
    (p) => p.paymentStatus === "Pending"
  ).length;
  const failedCount = payments.filter(
    (p) => p.paymentStatus === "Failed"
  ).length;
  const refundedAmount = payments.reduce(
    (sum, p) => sum + (p.refundAmount || 0),
    0
  );

  const summaryData = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <PaymentsIcon />,
      bg: "#e73895",
    },
    {
      label: "UPI Payments",
      value: upiCount,
      icon: <AccountBalanceWalletIcon />,
      bg: "#A2D5C6",
    },
    {
      label: "Card Payments",
      value: cardCount,
      icon: <CreditCardIcon />,
      bg: "#F76C6C",
    },
    {
      label: "Net Banking Payments",
      value: netBankingCount,
      icon: <AccountBalanceWalletIcon />,
      bg: "#F76C6C",
    },
    {
      label: "Total Transactions",
      value: totalTransactions,
      icon: <CurrencyRupeeIcon />,
      bg: "#748CAB",
    },
    {
      label: "Pending Payments",
      value: pendingCount,
      icon: <PendingActionsIcon />,
      bg: "#FFA500",
    },
    {
      label: "Failed Payments",
      value: failedCount,
      icon: <ErrorIcon />,
      bg: "#D72638",
    },
    {
      label: "Refunded Amount",
      value: `₹${refundedAmount.toLocaleString()}`,
      icon: <RedeemIcon />,
      bg: "#6A0572",
    },
  ];

  // **Chart Data Preparation**
  const paymentOverview = useMemo(
    () => ({
      labels: ["Paid", "Pending", "Failed"],
      datasets: [
        {
          data: [
            totalTransactions - pendingCount - failedCount,
            pendingCount,
            failedCount,
          ],
          backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        },
      ],
    }),
    [totalTransactions, pendingCount, failedCount]
  );

  const paymentMethods = useMemo(
    () => ({
      labels: ["UPI", "Card", "Net Banking"],
      datasets: [
        {
          data: [upiCount, cardCount, netBankingCount],
          backgroundColor: ["#2196F3", "#FF5722", "#673AB7"],
        },
      ],
    }),
    [upiCount, cardCount, netBankingCount]
  );

  const monthlyRevenue = useMemo(() => {
    const revenueByMonth = {};
    payments.forEach((p) => {
      if (p.paymentStatus === "Paid") {
        const month = new Date(p.paidAt).toLocaleString("default", {
          month: "short",
        });
        revenueByMonth[month] = (revenueByMonth[month] || 0) + p.totalAmount;
      }
    });

    return {
      labels: Object.keys(revenueByMonth),
      datasets: [
        {
          label: "Revenue (₹)",
          data: Object.values(revenueByMonth),
          backgroundColor: "#4CAF50",
          borderColor: "#388E3C",
          borderWidth: 1,
        },
      ],
    };
  }, [payments]);

  const refundTrends = useMemo(() => {
    const refundByMonth = {};

    payments.forEach((p) => {
      if (p.refundAmount > 0) {
        const date = new Date(p.paidAt); // Ensure correct field usage
        if (isNaN(date.getTime())) {
          console.warn("Skipping invalid date:", p.paidAt);
          return;
        }
        const month = date.toLocaleString("default", { month: "short" });
        refundByMonth[month] = (refundByMonth[month] || 0) + p.refundAmount;
      }
    });

    return {
      labels: Object.keys(refundByMonth),
      datasets: [
        {
          label: "Refunds (₹)",
          data: Object.values(refundByMonth),
          borderColor: "#D72638",
          backgroundColor: "rgba(215, 38, 56, 0.5)",
          fill: true,
        },
      ],
    };
  }, [payments]);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  // Open modal and set selected payment ID
  const handleOpenModal = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedPaymentId(null);
  };

  // Process refund
  const handleRefund = async () => {
    if (!selectedPaymentId) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/payment/refund/${selectedPaymentId}`
      );

      if (response.data.success) {
        toast.success("Refund processed successfully!");
        dispatch(fetchPayments()); // Refresh payment data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error processing refund:", error);
      toast.error("Failed to process refund. Try again later.");
    }

    handleCloseModal();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12; // Change as needed

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filtering payments based on search and status filter
  const filteredPayments = payments.filter((p) => {
    return (
      (searchQuery === "" ||
        p.userId?.username
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (statusFilter === "" || p.paymentStatus === statusFilter)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Box sx={{ p: 4 }}>
      <ToastContainer />

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 3, color: "#e73985" }}
      >
        Payment Summary
      </Typography>

      {/* Summary Cards */}
      <Grid container sx={{ maxWidth: { xs: "100%", lg: "80%" } }} spacing={3}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: item.bg,
                color: "white",
                p: 2,
              }}
            >
              <Box sx={{ mr: 2 }}>{item.icon}</Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {item.label}
                </Typography>
                <Typography variant="h5">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Box sx={{ mt: 5, maxWidth: { xs: "100%", lg: "78%" } }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3, color: "#e73895" }}
        >
          Payment Analytics
        </Typography>

        <Grid container spacing={3}>
          {/* overview */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                height: "50vh", // Set to 40% of viewport height
                minHeight: "350px", // Ensures proper rendering on smaller screens
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(231, 56, 149, 0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "linear-gradient(135deg, #FFE6E6, #FFF5D1)",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#000"
                sx={{ mb: 2 }}
              >
                💰 Payment Overview
              </Typography>
              <Box sx={{ flexGrow: 1, height: "80%" }}>
                <Pie
                  data={paymentOverview}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "#000",
                          font: { size: 16, weight: "bold" },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Monthly Revenue (Bar Chart) */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                height: "50vh",
                minHeight: "350px",
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(231, 56, 149, 0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "linear-gradient(135deg, #FFE6E6, #FFF5D1)", // Soft pink & gold
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#6B4226"
                sx={{ mb: 2 }}
              >
                💸 Monthly Revenue
              </Typography>
              <Box sx={{ flexGrow: 1, height: "80%" }}>
                <Bar
                  barSize={80}
                  data={{
                    ...monthlyRevenue,
                    datasets: [
                      {
                        ...monthlyRevenue.datasets[0],
                        backgroundColor: (ctx) =>
                          ctx.chart.isDatasetVisible(0) &&
                          ctx.dataIndex ===
                            ctx.chart.tooltip?.dataPoints?.[0]?.dataIndex
                            ? "#e73895" // Highlight bar on hover
                            : "#e73895", // Default color
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) =>
                            `₹${tooltipItem.raw} (${tooltipItem.label})`, // Show date & amount
                        },
                      },
                      legend: {
                        labels: {
                          color: "#6B4226",
                          font: { size: 14, weight: "bold" },
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: "#6B4226", font: { weight: "bold" } },
                        barPercentage: 0.2, // Makes bars thinner (0.1-0.2 is good)
                        categoryPercentage: 0.4, // Reduces bar spacing (lower = more gaps)
                      },
                      y: {
                        ticks: { color: "#6B4226", font: { weight: "bold" } },
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Payment Method Distribution (Doughnut Chart) */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                height: "50vh",
                minHeight: "350px",
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(231, 56, 149, 0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "linear-gradient(135deg, #FFE6E6, #FFF5D1)", // Soft pink & gold
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#6B4226"
                sx={{ mb: 2 }}
              >
                💳 Payment Methods
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Doughnut
                  data={paymentMethods}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => {
                            const value = tooltipItem.raw;
                            const label = tooltipItem.label;
                            return `${label}: ₹${value}`;
                          },
                        },
                      },
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "#6B4226",
                          font: { size: 14, weight: "bold" },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Refund Trends (Line Chart) */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%", // Ensures it takes full width of the grid
                maxWidth: "600px", // Limits the max width
                margin: "auto", // Centers the Paper
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Refund & Cancellation Trends
              </Typography>
              <Box
                sx={{
                  height: "300px",
                  minWidth: "100%",
                  maxWidth: "500px",
                  mx: "auto",
                }}
              >
                {/* Set the height & width for the chart */}
                <Line height={300} width={500} data={refundTrends} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* table */}
      <Box sx={{ mt: 5, maxWidth: { xs: "100%", lg: "78%" } }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3, color: "#e73895" }}
        >
          Transaction Details
        </Typography>

        <Paper sx={{ borderRadius: "12px", padding: 2 }}>
          {/* Search & Filter */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <TextField
              label="Search by Username"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <FormControl
              sx={{ minWidth: "10vh" }}
              size="small"
              variant="outlined"
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Table */}
          <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#e73895" }}>
                  {[
                    "Payment ID",
                    "Username",
                    "Method",
                    "Status",
                    "Total Amount (₹)",
                    "Paid Amount (₹)",
                    "Remaining Amount (₹)",
                    "Due Date",
                    "Date",
                    "Action",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPayments.map((p, index) => (
                  <TableRow key={index}>
                    <TableCell>{p._id}</TableCell>
                    <TableCell>{p.userId?.username || "N/A"}</TableCell>
                    <TableCell>{p.paymentMethod}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          p.paymentStatus === "Paid"
                            ? "#4CAF50"
                            : p.paymentStatus === "Pending"
                            ? "#FFC107"
                            : p.paymentStatus === "Failed"
                            ? "#F44336"
                            : "#2196F3",
                      }}
                    >
                      {p.paymentStatus}
                    </TableCell>
                    <TableCell>₹{p.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>₹{p.advanceAmount.toLocaleString()}</TableCell>
                    <TableCell>₹{p.remainingAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      {p.dueDate
                        ? new Date(p.dueDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(p.paidAt).toLocaleDateString()}
                    </TableCell>

                    {/* Action Column */}
                    <TableCell>
                      {p.refundStatus === "Refunded" ? (
                        <p className="text-green-500 text-md">Refunded</p>
                      ) : p.paymentStatus === "Paid" &&
                        p.remainingAmount === 0 ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleOpenModal(p._id)}
                        >
                          Refund
                        </Button>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              variant="outlined"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span style={{ margin: "0 10px", fontWeight: "bold" }}>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outlined"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>

          {/* Modal for Refund Confirmation */}
          {open && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3>Confirm Refund</h3>
                <p>Are you sure you want to process this refund?</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRefund}
                  >
                    Yes, Refund
                  </Button>
                  <Button variant="outlined" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Paper>

        {/* Refund Confirmation Modal */}
        <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle>Confirm Refund</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to process the refund for this payment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="error">
              Cancel
            </Button>
            <Button onClick={handleRefund} color="primary" variant="outlined">
              Confirm Refund
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Payment;
