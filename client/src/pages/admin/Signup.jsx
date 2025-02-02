/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// Zod Schema for validation
const adminSignupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  contact: z
    .string()
    .length(10, { message: "Contact number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Contact number must contain only digits" }),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  key: z.string().length(4, { message: "Key must be exactly 4 characters" }),
});

const AdminSignup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(adminSignupSchema) });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      navigate(-1);
    }
  }, []);

  const onSubmit = async (data) => {
    if (data.key !== "9999") {
      toast.error(
        "Invalid Admin Key! Please contact other admin to get correct key."
      );
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/admin/signup",
        data,
        { withCredentials: true }
      );

      if (res.data.token) {
        toast.success("Successfully Registered!");
        localStorage.setItem("admin", res.data.admin);
        setTimeout(() => navigate("/admin-dashboard"), 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Email/User or contact number is already registered.");
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
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper
            elevation={8}
            sx={{
              padding: 4,
              borderRadius: "16px",
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
                textAlign: "center",
              }}
            >
              "Become the Heart of BlissfulWed – Sign Up"
            </Typography>
            <Typography variant="body1" sx={{ color: "#000", mb: 3, textAlign: "center" }}>
              Welcome to the admin panel of <b>BlissfulWed</b>. Please create
              your account below to manage weddings with elegance.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
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
                    label="Contact"
                    {...register("contact")}
                    error={!!errors.contact}
                    helperText={errors.contact?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select {...field}>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <Typography color="error">{errors.gender.message}</Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
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
                    label="Admin Key"
                    type="text"
                    {...register("key")}
                    error={!!errors.key}
                    helperText={errors.key?.message}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  backgroundColor: "#E73895",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#D81B60" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminSignup; 
