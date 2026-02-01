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
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import AuthShell from "../../components/AuthShell";
import { verifyOtp } from "../../lib/api";
import { useAuthStore } from "../../store/auth";

export default function OtpPage() {
  const router = useRouter();
  const { email, otpExpiresAt, status, setAuthenticated, reset } = useAuthStore(
    (state) => ({
      email: state.email,
      otpExpiresAt: state.otpExpiresAt,
      status: state.status,
      setAuthenticated: state.setAuthenticated,
      reset: state.reset,
    })
  );

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
      return;
    }

    if (status !== "otp_required") {
      router.replace("/");
      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, (otpExpiresAt ?? 0) - Date.now());
      setTimeLeft(remaining);
      if (remaining === 0) {
        reset();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [otpExpiresAt, reset, router, status]);

  const formattedTime = useMemo(() => {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  const mutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      setAuthenticated();
      router.push("/dashboard");
    },
  });

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    mutation.mutate({ email, code: otp.join("") });
  };

  return (
    <AuthShell>
      <Stack spacing={3} sx={{ width: "100%", alignItems: "center" }}>
        <Box>
          <Typography variant="h4">OTP</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            We&apos;ve sent you a code to your mail.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              {otp.map((digit, index) => (
                <TextField
                  key={`otp-${index}`}
                  value={digit}
                  onChange={(event) => handleChange(index, event.target.value)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: 20 },
                  }}
                  sx={{
                    width: 64,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f2f2f2",
                      borderRadius: 2,
                      "& fieldset": { border: "none" },
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "none" },
                    },
                  }}
                />
              ))}
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Code expires in {formattedTime}
              </Typography>
              <Button variant="text" color="secondary" size="small">
                Send Again
              </Button>
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
              disabled={mutation.isPending || otp.join("").length !== 4}
              sx={{ backgroundColor: "#0b7b4c" }}
            >
              {mutation.isPending ? "Verifying..." : "Confirm"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </AuthShell>
  );
}
