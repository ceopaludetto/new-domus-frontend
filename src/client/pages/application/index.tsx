import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import { Sidebar } from "@/client/components";
import { SidebarProvider } from "@/client/utils/hooks";

export default function Application() {
  return (
    <SidebarProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box sx={{ ml: { lg: "350px" }, flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </SidebarProvider>
  );
}
