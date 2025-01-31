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
} from "@mui/material";

// Working Unsplash wedding image link
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.token) {
        toast.success("Successfully Registered!");
        localStorage.setItem("user", res.data.user);
        // setTimeout(() => {
        //     navigate("/")
        // }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Email/User or contact number is already Registered");
    }
  };

  return (
    <div className=" h-full w-screen bg-[#fec5ea] overflow-y-scroll">
      <Container
      
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <ToastContainer />
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Wrapper for Image and Form */}
        <Grid item xs={12} md={10} lg={10}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: "10px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              backgroundColor: "#fda2c6",
            }}
          >
            {/* Wedding Image */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: "none", sm: "block" },
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <img
                src={weddingImage}
                alt="Wedding Theme"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </Grid>

            {/* Signup Form */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "10px",
                  textAlign: "center",
                  bgcolor: "#fff5f8",
                }}
              >
                <Typography variant="h4" color="primary" fontWeight={600}>
                  Join BlissfulWed 💍
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={2}>
                  Find your perfect wedding planner!
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    label="Username"
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Contact Number"
                    {...register("contact")}
                    error={!!errors.contact}
                    helperText={errors.contact?.message}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    {...register("gender")}
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                    margin="normal"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                  <TextField
                    fullWidth
                    label="City"
                    {...register("city")}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontSize: "1rem",
                      backgroundColor: "#E73895", // Baby Pink
                      color: "#fff", // White text
                      "&:hover": {
                        backgroundColor: "#E75999", // Lighter pink on hover
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                  <Typography sx={{marginTop:"2rem",lg:{marginBottom:"4rem"}}}>Already have an account? <Link to={"/user/signin"} style={{textDecoration:"underline"}}>Sign in </Link> </Typography>
                </form>
              </Paper>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}
