/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from "@mui/icons-material";
import { motion } from "framer-motion"; // For smooth animations

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const handleToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index); // Toggle open/close for the clicked FAQ card
  };

  const faqData = [
    {
      question: "What services do you offer?",
      answer:
        "We offer full wedding planning services, catering, decor, Music-&-DJ, Photography and more.",
    },
    {
      question: "How far in advance should we book?",
      answer:
        "It's best to book at least 4 to 8 months before your wedding date to ensure availability and secure your preferred service.",
    },
    {
      question: "Can you assist with destination weddings?",
      answer:
        "Absolutely! We have a network of trusted vendors who can ensure a smooth and unforgettable experience.",
    },
    {
      question: "Do you handle wedding rehearsals?",
      answer:
        "Yes, we help coordinate your wedding rehearsal to ensure that everything runs smoothly on the big day.(You need to contact admin)",
    },
    {
      question: "What is the booking process?",
      answer:
        "You can book a service with us, and once you decide to move forward, we’ll sign a contract and start planning immediately.",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "600px" }, // Full width on mobile, 600px max width on larger screens
        margin: "auto",
        padding: { xs: 3, sm: 4 }, // Responsive padding
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: 16,
        marginBottom: 16,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
          color: "#EC4899",
          fontFamily: "cursive",
          letterSpacing: 2,
          textTransform: "capitalize",
          transition: "opacity 1s ease-in-out, transform 1s",
        }}
      >
        FAQs
      </Typography>

      {/* Render FAQ questions with simple animations */}
      {faqData.map((faq, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Box
              sx={{
                backgroundColor: "#f7f7f7",
                padding: { xs: 1.5, sm: 2 }, // Adjust padding for smaller screens
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#e2e2e2",
                },
              }}
              onClick={() => handleToggle(index)}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust font size for smaller screens
                }}
              >
                {faq.question}
              </Typography>
              <IconButton sx={{ padding: 0 }}>
                {openFaq === index ? (
                  <ExpandLessIcon sx={{ fontSize: 20, color: "#333" }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: 20, color: "#333" }} />
                )}
              </IconButton>
            </Box>

            {/* Answer Section with fade-in and fade-out animations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: openFaq === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {openFaq === index && (
                <Box
                  sx={{
                    padding: { xs: 2, sm: 3 }, // Adjust padding for smaller screens
                    backgroundColor: "#f0f0f0",
                    borderRadius: 4,
                    marginTop: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#555",
                      fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust font size for smaller screens
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </Box>
              )}
            </motion.div>
          </motion.div>
        </Box>
      ))}
    </Box>
  );
};

export default Faq;
