/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import RequestForm from "./RequestForm";
import RequestList from "./RequestList";

const CustomerSupport = () => {
  return (
    <Box sx={{maxWidth:{xs:"100%",lg:"78%"}}}>
      <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>
        Customer Support
      </Typography>
      <RequestForm />
      <Divider sx={{ my: 4 }} />
      <RequestList />
    </Box>
  );
};

export default CustomerSupport;
