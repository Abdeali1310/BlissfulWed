/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/admin/signin",
        data,
        { withCredentials: true }
      );
      console.log(res);

      if (res.data.token) {
        toast.success("Successfully Signed In!");
        localStorage.setItem("admin", res.data.admin);
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      }
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fec5ea",
        padding: 0,
      }}
    >
      <Container>
        <ToastContainer />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={5}>
            <Paper
              elevation={8}
              sx={{
                padding: 4,
                borderRadius: "16px",
                textAlign: "center",
                backgroundColor: "#FFF5F8",
                border: "2px solid #E73895",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#E73895",
                  fontWeight: 700,
                  mb: 2,
                  fontFamily: "'Dancing Script', cursive",
                }}
              >
                "Welcome Back to BlissfulWed"
              </Typography>
              <Typography variant="body1" sx={{ color: "#000", mb: 3 }}>
                Please log in below to manage the weddings and events.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                  autoComplete="off"

                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  margin="normal"
                  
                />
                <TextField
                  fullWidth
                  label="Admin Key"
                  type="text"
                  {...register("key", { required: "Admin Key is required" })}
                  error={!!errors.key}
                  helperText={errors.key?.message}
                  margin="normal"
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: "1rem",
                    backgroundColor: "#E73895",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#D81B60" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminSignIn;
