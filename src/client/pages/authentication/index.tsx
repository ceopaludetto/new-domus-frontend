import { FiZap } from "react-icons/fi";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

export default function Authentication() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box sx={{ width: "100%", maxWidth: 550 }}>
        <Box color="primary.main" textAlign="center">
          <FiZap size={48} />
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
}
