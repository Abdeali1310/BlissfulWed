/* eslint-disable no-unused-vars */
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
} from "@mui/material";
import weddingImage from "../../assets/weddign2.jpeg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const signinSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        data,
        { withCredentials: true }
      );
      console.log(res);
      
      if (res.data.token) {
        toast.success("Successfully Signed In!");
        localStorage.setItem("user", res.data.user);
        setTimeout(() => {
            navigate("/")
        }, 1000);
      }
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="h-screen w-screen bg-[#f5f5f5] flex justify-center items-center">
      <Container maxWidth="xl">
        <ToastContainer />
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper
              elevation={6}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                backgroundColor: "#fda2c6",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Wedding Image - Visible on Medium+ Screens */}
              <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
                <img
                  src={weddingImage}
                  alt="Wedding Theme"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Grid>

              {/* Signin Form */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{ p: 4, bgcolor: "#fff", textAlign: "center", width: "100%" }}
              >
                <Typography variant="h4" fontWeight={600} color="#2a9d7f">
                  Welcome Back 
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Sign in to continue
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
                    label="Password"
                    type="password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    margin="normal"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, bgcolor: "#2a9d7f", color: "#fff",
                        "&:hover":{
                        backgroundColor: "#2a9d8f",
                    },}}
                  >
                    Sign In
                  </Button>
                  <Typography sx={{marginTop:"2rem",lg:{marginBottom:"4rem"}}}>Do not have an account? <Link to={"/user/signup"} style={{textDecoration:"underline"}}>Sign up </Link> </Typography>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
