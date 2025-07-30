"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [role, setRole] = useState("attendee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login attempt with email, password and role
    console.log("Logging in with:", { email, password, role });
    // Navigate or handle login response here
    window.location.href = "/dashboard"; // Or your login processing route
  };

  const handleSignUpClick = () => {
    // Navigate to your sign up page
    window.location.href = "/signup"; // Change to your actual signup route
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (email, password) => {
    try {
      const responce = await axios.post(
        "http://localhost:8000/api/auth/signin",
        { email, password }
      );
      router.push("/");
    } catch (e) {
      setMessage(e.response.data.detail);
      console.error("Login Failed", e.response.data.detail);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          maxWidth: 600, // wider card
          width: "100%",
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Welcome to DRISTHI
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, whiteSpace: 'pre-line' }}
>
          {`Your smart proctoring and exam management solution.
            Log in to access your dashboard and manage exams.`}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>


        <form onSubmit={handleSubmit} noValidate>
          <FormControl component="fieldset" sx={{ mb: 3, textAlign: "left" }}>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: "600" }}>
              Login as:
            </FormLabel>
            <RadioGroup
              row
              aria-label="login role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="proctor"
                control={<Radio color="primary" />}
                label="Proctor"
              />
              <FormControlLabel
                value="attendee"
                control={<Radio color="primary" />}
                label="Attendee"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.8,
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 4px 20px rgba(102,126,234,0.5)",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#556cd6",
                boxShadow: "0 6px 30px rgba(102,126,234,0.7)",
              },
              "&:focus-visible": {
                outline: "3px solid #3f51b5",
                outlineOffset: 2,
              },
            }}
          >
            Login
          </Button>
        </form>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            mt: 3,
            py: 1.6,
            fontWeight: "bold",
            fontSize: "1.1rem",
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
              backgroundColor: "rgba(118,75,162,0.1)",
            },
          }}
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
          {message && (
            <Typography color="error" align="center" mt={2}>
              {message}
            </Typography>
          )}
          <Typography color="secondary" mt={1}>
            <Link href="/reset-password">Forgot Password? </Link>
          </Typography>
          <Typography color="secondary" align="center" mt={2}>
            Don't have an account ? <Link href="/signup">Sign UP</Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
