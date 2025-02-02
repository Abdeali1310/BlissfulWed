/* eslint-disable react/no-unescaped-entities */
import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    CircularProgress,
  } from "@mui/material";
  import axios from "axios";
  import { useForm } from "react-hook-form";
  import { useState } from "react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
  
  const ForgotPassword = () => {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const [loading, setLoading] = useState(false); 
  
    const onSubmit = async (data) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/forgotPassword",
          {
            email: data.email,
          },
          { withCredentials: true }
        );
  
        if (response.data.success) {
          toast.success("OTP sent successfully! Check your email.");
          localStorage.setItem('email',data.email);
          setTimeout(() => {
            navigate("/user/forgot-password/otp-verification");
          }, 1000);
          console.log("OTP sent to:", data.email);
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        toast.error("Error sending OTP. Please check your email and try again.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fec5ea",
          padding: 0,
        }}
      >
        <ToastContainer />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={5}>
            <Paper
              elevation={6}
              sx={{
                padding: 4,
                borderRadius: "12px",
                textAlign: "center",
                backgroundColor: "#FFF5F8",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#E73895", fontWeight: 600, mb: 2 }}
              >
                "Lost in Love? Let's Get You Back!"
              </Typography>
              <Typography variant="body1" sx={{ color: "#000", mb: 3 }}>
                Enter your registered email, and we'll send you an OTP to reset
                your password.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
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
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default ForgotPassword;
  