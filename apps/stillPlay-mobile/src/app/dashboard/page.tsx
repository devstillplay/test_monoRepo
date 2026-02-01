"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

import MobileFrame from "@/components/MobileFrame";
import useAuthStore from "@/store/useAuthStore";

export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const [tab, setTab] = useState(0);

  const { data } = useQuery({
    queryKey: ["dashboard-message"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return { message: "Ready to kick off your next match?" };
    }
  });

  return (
    <MobileFrame>
      <Box className="screen-content">
        <Stack spacing={3} sx={{ p: 3, flex: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            {data?.message ?? "Loading your match insights..."}
          </Typography>

          {!isAuthenticated ? (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Typography color="error.main">
                You're viewing this as a guest.
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box
                sx={{
                  border: "1px solid #EAECF0",
                  borderRadius: 2,
                  p: 2
                }}
              >
                <Typography fontWeight={600}>Team form</Typography>
                <Typography color="text.secondary" variant="body2">
                  4 wins in a row across your last fixtures.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Log out
              </Button>
            </Stack>
          )}
        </Stack>

        <Paper
          elevation={8}
          sx={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24
          }}
        >
          <BottomNavigation
            showLabels={false}
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            sx={{
              height: 72,
              "& .MuiBottomNavigationAction-root": {
                minWidth: 0,
                paddingY: 1.5
              },
              "& .MuiSvgIcon-root": {
                fontSize: 30
              }
            }}
          >
            <BottomNavigationAction icon={<HomeIcon />} label="Home" />
            <BottomNavigationAction icon={<SportsSoccerIcon />} label="Ball" />
            <BottomNavigationAction icon={<SendIcon />} label="Send" />
            <BottomNavigationAction icon={<PersonIcon />} label="Profile" />
          </BottomNavigation>
        </Paper>
      </Box>
    </MobileFrame>
  );
}
