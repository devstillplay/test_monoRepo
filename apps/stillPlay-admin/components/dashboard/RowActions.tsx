"use client";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton, Stack } from "@mui/material";

type RowActionsProps = {
  isVisible: boolean;
};

export default function RowActions({ isVisible }: RowActionsProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.2s ease",
      }}
    >
      <IconButton size="small">
        <ChatBubbleOutlineIcon fontSize="small" />
      </IconButton>
      <IconButton size="small">
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton size="small">
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
