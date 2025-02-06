/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button, Paper, Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactUs = () => {
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted:", data);
      setToast({ open: true, message: "Message sent successfully!", severity: "success" });
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Submission Error:", error);
      setToast({ open: true, message: "Something went wrong. Please try again.", severity: "error" });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "80vh", p: 4 }}>
      <Paper elevation={3} sx={{ maxWidth: 600, margin: "auto", p: 4, borderRadius: 2 }}>
        <Typography
          sx={{ color: "#e10098", fontFamily: "cursive", fontWeight: "bold" }}
          variant="h4"
          gutterBottom
          textAlign="center"
        >
          Contact Us
        </Typography>

        <Typography variant="body1" color="textSecondary" textAlign="center" mb={3}>
          We'd love to hear from you! Please fill out the form below.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Subject" variant="outlined" fullWidth {...register("subject")} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar (Toast Notification) */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;
