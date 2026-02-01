"use client";

import { Avatar, Box, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import RowActions from "../../components/dashboard/RowActions";

const rows = Array.from({ length: 25 }, (_, index) => ({
  name: "Chisom Kunle",
  code: "#1234BF",
  behaviour: "Good",
  id: index + 1,
}));

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const pageRows = rows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <DashboardHeader search={search} onSearchChange={setSearch} />

      <Box
        sx={{
          background: "#ffffff",
          borderRadius: 2,
          padding: { xs: 2, md: 3.5 },
          paddingBottom: { xs: 3, md: 4 },
          marginTop: { xs: 2, md: 3 },
          minHeight: "calc(100vh - 220px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack sx={{ marginTop: "auto" }} spacing={2}>
          <Box
            sx={{
              borderRadius: 3,
              padding: 2,
              backgroundColor: "#f3f3f3",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack
              spacing={2}
              sx={{ marginBottom: 2, paddingTop: 2, paddingLeft: 2 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, marginTop: { xs: 1, md: 2 } }}
              >
                USERS
              </Typography>
              <Stack direction="row" spacing={3}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#0b7b4c",
                    fontWeight: 600,
                    position: "relative",
                    paddingBottom: 0.5,
                  }}
                >
                  All profiles
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 2,
                      backgroundColor: "#0b7b4c",
                      borderRadius: 999,
                    }}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suspended
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                fontSize: 12,
                color: "text.secondary",
                marginBottom: 2,
                backgroundColor: "#fff",
                borderRadius: 999,
                paddingY: 1.2,
                paddingX: 3,
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 80px",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>Name</Box>
              <Box>Offline code</Box>
              <Box>Behaviour</Box>
              <Box />
            </Box>
            <Box
              sx={{
                marginTop: 1,
                maxHeight: { xs: 420, sm: "none" },
                overflowY: { xs: "auto", sm: "visible" },
              }}
            >
              <Stack spacing={0}>
                {pageRows.map((row, index) => {
                  const absoluteIndex = startIndex + index;
                  return (
                    <Box
                      key={`${row.id}`}
                      onClick={() => setSelectedIndex(absoluteIndex)}
                      sx={{
                        paddingY: 2,
                        paddingX: 3,
                        borderBottom:
                          index === pageRows.length - 1
                            ? "none"
                            : "1px solid #fff",
                        backgroundColor:
                          selectedIndex === absoluteIndex
                            ? "#ffffff"
                            : "transparent",
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 80px",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                        borderRadius: 1,
                        outline:
                          selectedIndex === absoluteIndex
                            ? "1px solid #32b25c"
                            : "1px solid transparent",
                        outlineOffset: "-1px",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          outline: "1px solid #32b25c",
                        },
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2">{row.name}</Typography>
                      </Stack>
                      <Typography variant="body2">{row.code}</Typography>
                      {selectedIndex === absoluteIndex ? (
                        <RowActions isVisible />
                      ) : (
                        <Typography variant="body2">{row.behaviour}</Typography>
                      )}
                      <Box />
                    </Box>
                  );
                })}
              </Stack>
            </Box>
            <Stack alignItems="center" sx={{ marginTop: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => {
                  setPage(value);
                  setSelectedIndex((value - 1) * rowsPerPage);
                }}
                color="primary"
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
