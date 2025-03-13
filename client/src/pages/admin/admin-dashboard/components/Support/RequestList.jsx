/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { fetchRequests, resolveRequest } from "./supportApi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        // Show only pending requests
        setRequests(data.filter((req) => req.status === "pending"));
      } catch (error) {
        toast.error("Failed to fetch requests");
      }
    };
    loadRequests();
  }, []);

  const handleResolve = async (id) => {
    setLoadingId(id); // Show loader for this request
    try {
      await resolveRequest(id);
      setRequests((prev) => prev.filter((req) => req._id !== id)); // Remove resolved request
      toast.success("Request marked as resolved!");
    } catch (error) {
      toast.error("Error resolving request.");
    } finally {
      setLoadingId(null); // Remove loader
    }
  };

  return (
    <Container maxWidth="md">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 4,
          borderRadius: 3,
          backgroundColor: "#f9f5f0",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "serif",
              fontWeight: "bold",
              ml: 1,
              color: "#5d4037",
            }}
          >
            Support Requests
          </Typography>
        </Box>

        {requests.length === 0 ? (
          <Typography textAlign="center" color="textSecondary">
            No pending support requests.
          </Typography>
        ) : (
          requests.map((req) => (
            <Card
              key={req._id}
              sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#fff8e1",
                borderLeft: "5px solid #ff9800",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#795548" }}
                >
                  {req.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <b>Email:</b> {req.email}
                </Typography>
                <Typography variant="body2">
                  <b>Type:</b> {req.type}
                </Typography>
                <Typography variant="body2">
                  <b>Message:</b> {req.message}
                </Typography>

                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    textTransform: "none",
                  }}
                  startIcon={
                    loadingId === req._id ? <CircularProgress size={20} /> : <CheckCircleIcon />
                  }
                  onClick={() => handleResolve(req._id)}
                  disabled={loadingId === req._id} // Disable button while resolving
                >
                  {loadingId === req._id ? "Resolving..." : "Mark as Resolved"}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Paper>
    </Container>
  );
};

export default RequestList;
