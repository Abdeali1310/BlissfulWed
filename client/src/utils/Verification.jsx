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
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerification = () => {
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
            "http://localhost:3000/api/v1/user/forgotPassword/otpVerification",
            {
              email: localStorage.getItem('email'),
              otp:data.otp
            },
            { withCredentials: true }
          );
          if(response.data.success){

              toast.success("OTP Verified!");
              setTimeout(() => {
                navigate("/user/reset-password");
              }, 1000);
              console.log("Entered OTP:", data.otp);
          } else {
            toast.error("Oops! OTP didn't match. Please try again.");
          }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
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
        backgroundColor: "#fec5ea", // Soft romantic pink
        padding: 0,
      }}
    >
      <ToastContainer />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={5}>
          <Paper
            elevation={8}
            sx={{
              padding: 4,
              borderRadius: "16px",
              textAlign: "center",
              backgroundColor: "#FFF5F8", // Elegant wedding color
              border: "2px solid #E73895", // Wedding-themed accent
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
              "A Match Made in Security! Enter Your OTP"
            </Typography>
            <Typography variant="body1" sx={{ color: "#000", mb: 3 }}>
              We’ve sent a **One-Time Password (OTP)** to your email. Please
              enter it below to verify your identity and continue your journey
              with **BlissfulWed**.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Enter OTP"
                type="text"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: 6,
                  maxLength: 6,
                })}
                error={!!errors.otp}
                helperText={errors.otp?.message}
                margin="normal"
                inputProps={{
                  maxLength: 6,
                  style: { textAlign: "center", fontSize: "1.5rem" },
                }}
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
                  "Verify OTP"
                )}
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, color: "#E73895" }}>
              Didn’t receive the OTP? <Link style={{textDecoration:"underline"}} to={"/user/forgot-password"}>Resend</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OTPVerification;
