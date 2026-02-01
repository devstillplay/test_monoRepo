"use client";

import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import { useAuthStore } from "../../store/auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
      }}
    >
      <DashboardSidebar />
      <Box sx={{ padding: { xs: 2, md: 3 } }}>{children}</Box>
    </Box>
  );
}
