"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Box, Button, Divider, Stack, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "../../store/auth";

const navItems = [
  { label: "Users", href: "/dashboard", icon: <PeopleAltOutlinedIcon /> },
  { label: "Loan Request", href: "/dashboard/loan-request" },
  { label: "Loan Repayment", href: "/dashboard/loan-repayment" },
  { label: "Support", href: "/dashboard/support", icon: <SupportAgentOutlinedIcon /> },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { fullName, reset } = useAuthStore((state) => ({
    fullName: state.fullName,
    reset: state.reset,
  }));

  const handleLogout = () => {
    reset();
    router.push("/");
  };

  return (
    <Stack
      component={motion.aside}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      sx={{
        padding: { xs: 2, md: 3 },
        height: "100%",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={3}>
        <Box
          component="img"
          src="/assets/svg/STILL PLAYLOGOBL.svg"
          alt="Still Play"
          sx={{ width: 140, height: "auto", marginX: "auto" }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              width: 76,
              height: 76,
              margin: "0 auto 8px",
              border: "2px solid #0b7b4c",
            }}
          />
          <Typography variant="subtitle2">
            {(fullName ?? "Samuel Ajayi").toUpperCase()}
          </Typography>
          <Typography variant="caption" color="primary">
            ADMIN
          </Typography>
        </Box>
        <Divider sx={{ opacity: 0.5 }} />
        <Stack spacing={1}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                variant="text"
                startIcon={item.icon}
                sx={{
                  justifyContent: "flex-start",
                  color: isActive ? "#f59e0b" : "text.primary",
                  backgroundColor: isActive ? "#f3f3f3" : "transparent",
                  borderRadius: 999,
                  paddingY: 1,
                  paddingX: 2,
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>
        <Button variant="contained" size="small">
          Create Admin Account
        </Button>
      </Stack>

      <Stack spacing={2}>
        <Divider sx={{ opacity: 0.5 }} />
        <Button
          variant="text"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ justifyContent: "flex-start" }}
        >
          Log out
        </Button>
      </Stack>
    </Stack>
  );
}
