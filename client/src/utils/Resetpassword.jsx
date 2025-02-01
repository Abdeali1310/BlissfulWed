/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/resetPassword",
        {
          email: localStorage.getItem('email'),
          newPassword: data.password,
        },
        { withCredentials: true }
      );
      if(response.data.success) {
        toast.success("Password Reset Successful!");
        setTimeout(() => {
          navigate("/user/signin");
        }, 1000);
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fec5ea', // Soft romantic pink
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
              borderRadius: '16px',
              textAlign: 'center',
              backgroundColor: '#FFF5F8', // Elegant wedding color
              border: '2px solid #E73895', // Wedding-themed accent
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#E73895',
                fontWeight: 700,
                mb: 2,
                fontFamily: "'Dancing Script', cursive",
              }}
            >
              "Let’s Begin Your Journey, Reset Your Password!"
            </Typography>
            <Typography variant="body1" sx={{ color: '#000', mb: 3 }}>
              Please enter your new password to continue enjoying your wedding planning experience with us.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
                  fontSize: '1rem',
                  backgroundColor: '#E73895',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#D81B60' },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, color: '#E73895' }}>
              Remembered your password? <Link style={{ textDecoration: 'underline' }} to="/user/signin">Login</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPasswordPage;
