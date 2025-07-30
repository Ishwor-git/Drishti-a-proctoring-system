"use client";
import { React, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Link,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{ padding: 4, marginTop: 8, borderRadius: 8 }}>
        <Avatar sx={{ mx: "auto", mb: 2, bgcolor: "secondary.main" }} />
        <Typography
          component={"h1"}
          variant="h5"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Sign In
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

          <Box mb={2}>
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Log In
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
    </Container>
  );
};

export default Login;
