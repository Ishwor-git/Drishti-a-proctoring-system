"use client";
import React from "react";
import {
  Typography,
  Button,
  Box,
  Paper,
  AppBar,
  Toolbar,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const Dashboard = () => {
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  // Example dashboard data — replace with your actual data source or props
  const dashboardStats = [
    { title: "Scheduled Exams", value: 5 },
    { title: "Exams Taken Today", value: 12 },
    { title: "Pending Approvals", value: 3 },
    { title: "Active Proctors", value: 7 },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
      }}
    >
      {/* Fixed Header */}
      <AppBar position="static" elevation={6} sx={{ bgcolor: "#564aa3" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            DRISTHI Proctoring Dashboard
          </Typography>
          {/* You could add navigation buttons or user menu here */}
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 6,
        }}
      >
        {/* Welcome card */}
        <Paper
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: 900,
            mb: 6,
            p: { xs: 3, sm: 5 },
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.95)",
            color: "text.primary",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 800, letterSpacing: 1.1, color: "primary.main" }}
          >
            Welcome to DRISTHI
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Your smart proctoring and exam management dashboard
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: { xs: 3, sm: 5 },
                py: { xs: 1.5, sm: 2 },
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                },
                "&:focus-visible": {
                  outline: "3px solid #3f51b5",
                  outlineOffset: "2px",
                },
              }}
              onClick={() => handleNavigate("/manage-exam")}
            >
              🗂 Manage Exams
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                px: { xs: 3, sm: 5 },
                py: { xs: 1.5, sm: 2 },
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                borderRadius: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                },
                "&:focus-visible": {
                  outline: "3px solid #f50057",
                  outlineOffset: "2px",
                },
              }}
              onClick={() => handleNavigate("/exam")}
            >
              📝 Take Exam
            </Button>
          </Box>
        </Paper>

        {/* Stats Grid */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {dashboardStats.map(({ title, value }) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: "text.primary",
                  textAlign: "center",
                  py: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
                  >
                    {value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional Info Section */}
        <Paper
          elevation={8}
          sx={{
            maxWidth: 900,
            width: "100%",
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.9)",
            color: "text.primary",
            boxShadow: "0 4px 32px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            News & Updates
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - DRISTHI Version 2.1 launched! New reporting features and improved
            exam analytics.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - Upcoming maintenance scheduled on August 15th, 2025, 10 PM - 2 AM.
            Please plan accordingly.
          </Typography>
          <Typography variant="body1">
            - New proctoring guidelines released. Make sure to review the updated
            policies.
          </Typography>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          backgroundColor: "rgba(86, 74, 163, 0.85)",
          color: "rgba(255,255,255,0.8)",
        }}
      >
        <Typography variant="body2">
          © 2025 DRISTHI. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
