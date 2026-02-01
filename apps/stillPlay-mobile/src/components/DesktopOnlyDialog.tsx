"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

export default function DesktopOnlyDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setOpen(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Mobile only experience</DialogTitle>
      <DialogContent>
        Still Play is designed for mobile screens. Switch to a phone-sized window
        for the best experience.
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Continue anyway
        </Button>
      </DialogActions>
    </Dialog>
  );
}
