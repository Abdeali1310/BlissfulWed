import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import weddingImage from "../../assets/wedding.webp";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contact: z.string().min(10, "Invalid contact number").max(10),
  gender: z.enum(["male", "female", "other"]),
  city: z.string().min(2, "City name is too short"),
});

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ⏳ State for loader

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    setLoading(true); // Start loader ⏳

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        data,
        { withCredentials: true }
      );
      console.log(res);

      if (res.data.token) {
        toast.success("Successfully Registered!");
        localStorage.setItem("user", res.data.user);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Email/User or contact number is already Registered");
    } finally {
      setLoading(false); // Stop loader ⏳
    }
  };

  return (
    <div className="h-screen w-screen bg-[#fec5ea] flex justify-center items-center">
      <Container maxWidth="xl">
        <ToastContainer />
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper
              elevation={6}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                backgroundColor: "#2a9d8f",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
                <img
                  src={weddingImage}
                  alt="Wedding Theme"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>

              <Grid item xs={12} md={6} sx={{ p: 4, bgcolor: "#fff" }}>
                <Typography
                  variant="h4"
                  color="#e73895"
                  fontWeight={600}
                  textAlign="center"
                >
                  Join BlissfulWed
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  mb={3}
                  textAlign="center"
                >
                  Find your perfect wedding planner!
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        sx={{ width: "104%" }}
                        label="Username"
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        sx={{ width: "104%" }}
                        label="Email"
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        sx={{ width: "104%" }}
                        label="Password"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        sx={{ width: "104%" }}
                        label="Contact Number"
                        {...register("contact")}
                        error={!!errors.contact}
                        helperText={errors.contact?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        sx={{ width: "104%" }}
                        select
                        label="Gender"
                        {...register("gender")}
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        sx={{ width: "104%" }}
                        label="City"
                        {...register("city")}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading} // Disable button when loading
                    sx={{
                      mt: 3,
                      py: 1.5,
                      backgroundColor: "#e73895",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#e74895" },
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                  </Button>
                </form>

                <Typography
                  sx={{
                    marginTop: "2rem",
                    lg: { marginBottom: "4rem" },
                    textAlign: "center",
                  }}
                >
                  Already have an account?{' '}
                  <Link to="/user/signin" style={{ textDecoration: "underline" }}>
                    Sign In
                  </Link>
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
