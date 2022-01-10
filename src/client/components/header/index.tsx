import { forwardRef, ReactNode } from "react";
import { FiSidebar } from "react-icons/fi";

import { Box, BoxProps, IconButton, Stack, Typography } from "@mui/material";

import { useSidebarContext } from "@/client/utils/hooks";

import { Tooltip } from "../tooltip";

interface HeaderProps extends BoxProps {
  title: ReactNode;
  haveTabs?: boolean;
  actions?: ReactNode;
  hideSidebar?: boolean;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ title, haveTabs, actions, hideSidebar, sx, ...rest }, ref) => {
    const { toggleOpen } = useSidebarContext();

    return (
      <Box
        ref={ref}
        sx={{ alignItems: "center", display: "flex", px: 4, pt: 3, pb: haveTabs ? 1 : 3, ...sx }}
        {...rest}
      >
        {!hideSidebar && (
          <Box sx={{ display: { xs: "block", lg: "none" }, mr: 1.5 }}>
            <Tooltip title="Abrir Sidebar">
              <IconButton aria-label="Abrir Sidebar" onClick={toggleOpen}>
                <FiSidebar />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box>
          <Typography sx={{ fontWeight: "fontWeightMedium" }} variant="h4">
            {title}
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        {!!actions && (
          <Box>
            <Stack direction="row" spacing={1.5}>
              {actions}
            </Stack>
          </Box>
        )}
      </Box>
    );
  }
);
