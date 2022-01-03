import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import { Sidebar } from "@/client/components";

export default function Application() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ ml: "350px", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
