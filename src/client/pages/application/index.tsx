import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

import { Box } from "@mui/material";

import { Sidebar } from "@/client/components";

export default function Application({ route }: RouteConfigComponentProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ ml: "350px", flex: 1 }}>{renderRoutes(route?.routes)}</Box>
    </Box>
  );
}
