/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  TablePagination,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";

const ReportsTable = () => {
  const users = useSelector((state) => state.user.users);
  const bookings = useSelector((state) => state.bookings.bookings);
  const payments = useSelector((state) => state.payments.payments);
  const services = useSelector((state) => state.services.services);

  // State for search, filters & pagination
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Format & Combine data for the table
  const combinedData = bookings.map((booking) => {
    const user = users?.find((u) => u._id === booking.user?._id);
    const service = services?.find((s) => s._id === booking.service?._id);
    const payment = payments?.find(
      (p) => String(p.bookingId._id) == String(booking._id)
    );

    return {
      id: booking._id,
      username: user?.username || "N/A",
      email: user?.email || "N/A",
      serviceType: service?.serviceType || "N/A",
      address: booking.address || "N/A",
      date: booking.date ? new Date(booking.date).toLocaleDateString() : "N/A",
      status: booking.status || "N/A",
      totalAmount: booking.totalAmount || "N/A",
      paymentStatus: payment?.paymentStatus || "N/A",
    };
  });

  // Apply search & filters
  const filteredData = combinedData
    .filter(
      (item) =>
        item.username.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.serviceType.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase()) ||
        item.paymentStatus.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => (statusFilter ? item.status === statusFilter : true));

  // Pagination handlers
  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Download CSV Function
  const handleDownloadCSV = () => {
    const csvData = [
      [
        "ID",
        "Username",
        "Email",
        "Service Type",
        "Address",
        "Date",
        "Status",
        "Total Amount",
        "Payment Status",
      ],
      ...filteredData.map((item) => [
        item.id,
        `"${item.username}"`, // Enclosed in quotes for safety
        `"${item.email}"`,
        `"${item.serviceType}"`,
        `"${item.address}"`,
        `"${new Date(item.date).toLocaleDateString()}"`, // Format date
        `"${item.status}"`,
        `"${item.totalAmount}"`,
        `"${item.paymentStatus}"`,
      ]),
    ]
      .map((row) => row.join(",")) // Convert array to CSV row
      .join("\n"); // Join rows with new lines

    const blob = new Blob(["\uFEFF" + csvData], {
      type: "text/csv;charset=utf-8;",
    }); 
    saveAs(blob, "reports.csv");
  };

  return (
    <Paper
      sx={{ width: "100%", marginTop: "2rem", overflow: "hidden", padding: 2 }}
    >
      {/* Search & Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Booked">Booked</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
        <Button
          variant="outlined"
          color="primary"
          sx={{ fontSize: "0.75rem" }}
          onClick={handleDownloadCSV}
        >
          <FaDownload fontSize={20} /> <span className="ml-2">CSV</span>
        </Button>
      </div>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e73895" }}>
              <TableCell sx={{ color: "white" }}>Username</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Service Type</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
              <TableCell sx={{ color: "white" }}>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.serviceType}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.totalAmount}</TableCell>
                  <TableCell>{row.paymentStatus}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default ReportsTable;
