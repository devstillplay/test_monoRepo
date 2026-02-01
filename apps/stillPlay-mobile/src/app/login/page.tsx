"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import MobileFrame from "@/components/MobileFrame";
import useAuthStore from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    login();
    router.push("/dashboard");
  };

  return (
    <MobileFrame>
      <Box className="screen-content" sx={{ p: 3 }}>
        <Stack spacing={3} sx={{ height: "100%" }}>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              Welcome back
            </Typography>
            <Typography color="text.secondary">
              Your football space is waiting for you.
            </Typography>
          </Stack>

          <Box flex={1} />

          <Button variant="contained" size="large" fullWidth onClick={handleLogin}>
            Log in to Still Play
          </Button>
        </Stack>
      </Box>
    </MobileFrame>
  );
}
