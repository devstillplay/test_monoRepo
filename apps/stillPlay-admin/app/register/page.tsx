"use client";

import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthShell from "../../components/AuthShell";
import { requestOtp } from "../../lib/api";
import { useAuthStore } from "../../store/auth";

export default function RegisterPage() {
  const router = useRouter();
  const setPendingAuth = useAuthStore((state) => state.setPendingAuth);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: requestOtp,
    onSuccess: (data) => {
      setPendingAuth(fullName, email, data.otpExpiresAt);
      router.push("/otp");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ fullName, email, password });
  };

  return (
    <AuthShell>
      <Stack spacing={3} sx={{ width: "100%", alignItems: "center" }}>
        <Typography variant="h4" sx={{ color: "#4a4a4a" }}>
          Create New Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Full Name
              </Typography>
              <TextField
                placeholder="#34ASHWQA"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                fullWidth
                sx={{
                  "& input": {
                    textAlign: "left",
                  },
                  "& input::placeholder": {
                    textAlign: "left",
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                    borderRadius: 999,
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "none" },
                  },
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Email Address
              </Typography>
              <TextField
                placeholder="#34ASHWQA"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                fullWidth
                sx={{
                  "& input": {
                    textAlign: "left",
                  },
                  "& input::placeholder": {
                    textAlign: "left",
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                    borderRadius: 999,
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "none" },
                  },
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Password
              </Typography>
              <TextField
                placeholder="#34ASHWQA"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                fullWidth
                sx={{
                  "& input": {
                    textAlign: "left",
                  },
                  "& input::placeholder": {
                    textAlign: "left",
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f2f2f2",
                    borderRadius: 999,
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "none" },
                  },
                }}
              />
            </Stack>
            {mutation.isError ? (
              <Alert severity="error">
                {(mutation.error as Error).message}
              </Alert>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={mutation.isPending}
              sx={{ backgroundColor: "#0b7b4c" }}
            >
              {mutation.isPending ? "Sending..." : "Sign up"}
            </Button>
          </Stack>
        </Box>

        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Already have an account? <Link href="/">Log in</Link>
        </Typography>
      </Stack>
    </AuthShell>
  );
}
