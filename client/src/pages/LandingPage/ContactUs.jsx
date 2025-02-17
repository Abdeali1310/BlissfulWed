import React from 'react';
import { Box, Grid, Typography, TextField, Button, Paper } from '@mui/material';

const ContactUs = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', p: 4 }}>
      <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Contact Us
        </Typography>

        <Typography variant="body1" color="textSecondary" textAlign="center" mb={3}>
          We'd love to hear from you! Please fill out the form below.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name" variant="outlined" fullWidth required />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Email" variant="outlined" type="email" fullWidth required />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Subject" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button variant="contained" color="primary" size="large">
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ContactUs;
