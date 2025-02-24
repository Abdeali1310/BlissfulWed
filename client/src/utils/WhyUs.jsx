import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useInView } from "react-intersection-observer";

const WhyUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once when it first enters view
    threshold: 0.2, // Trigger when 20% of the element is in view
  });

  return (
    <Box
      sx={{
        padding: 6,
        backgroundColor: "#f8f8f8",
        opacity: inView ? 1 : 0,
        transition: "opacity 1s ease-in-out", // Fade-in effect
        marginTop:12,
      }}
      ref={ref}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          marginBottom: 6,
          fontWeight: "bold",
          color: "#EC4899", // Changed to pinkish tone as per theme
          fontFamily: "cursive", 
          textTransform: "uppercase",
          letterSpacing: 2,
          opacity: inView ? 1 : 0,
          transition: "opacity 1s ease-in-out, transform 1s",
          transform: inView ? "translateY(0)" : "translateY(-30px)",
        }}
      >
        Why Choose Us?
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Each Box Item */}
        {[
          {
            title: "Comprehensive Services",
            description:
              "We provide a full range of services to cover every aspect of your wedding day, from planning to execution.",
            icon: "📅",
          },
          {
            title: "Experienced Planners",
            description:
              "Our team of experienced planners ensures every detail is meticulously taken care of, so you don’t have to worry about anything.",
            icon: "💼",
          },
          {
            title: "Budget-Friendly Options",
            description:
              "We understand that every couple has a budget. We provide flexible and budget-friendly packages that suit your needs without compromising on quality.",
            icon: "💰",
          },
          {
            title: "Personalized Attention",
            description:
              "We treat every couple like family. Your wedding will be personalized to reflect your unique style and preferences.",
            icon: "🎨",
          },
          {
            title: "Stress-Free Planning",
            description:
              "Leave the logistics to us! Our team handles everything, so you can relax and focus on enjoying the journey to your big day.",
            icon: "🌸",
          },
        ].map(({ title, description, icon }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: 4,
                borderRadius: 4,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s, rotate 0.3s",
                "&:hover": {
                  transform: "scale(1.05) rotate(5deg)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 3, // Fixed the marginBottom duplication here
                  color: "#EC4899", // Changed to pinkish tone for consistency
                  fontSize: "1.25rem",
                  display: "inline-block",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-30px)",
                  transition: "opacity 1s ease-in-out, transform 1s",
                }}
              >
                <span style={{ fontSize: "2rem", marginRight: "8px" }}>{icon}</span>
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  color: "#4A4A4A", // Lighter gray color
                  lineHeight: 1.6,
                  paddingBottom: 2,
                  paddingTop: 2,
                  fontFamily: "Georgia, serif", // Font changed to Georgia for consistency
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 1s ease-in-out, transform 1s",
                }}
              >
                {description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyUs;
