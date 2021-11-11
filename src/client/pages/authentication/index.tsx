import { FiZap } from "react-icons/fi";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

import { Box } from "@mui/material";

export default function Authentication({ route }: RouteConfigComponentProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box sx={{ width: "100%", maxWidth: 550 }}>
        <Box color="primary.main" textAlign="center">
          <FiZap size={48} />
        </Box>
        {renderRoutes(route?.routes)}
      </Box>
    </Box>
  );
}
