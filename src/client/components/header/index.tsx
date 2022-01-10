import { forwardRef, ReactNode } from "react";
import { FiBell, FiSearch, FiSidebar } from "react-icons/fi";

import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";

import { useSidebarContext } from "@/client/utils/hooks";

import { Tooltip } from "../tooltip";

interface HeaderProps {
  title: string;
  haveTabs?: boolean;
  leadingActions?: ReactNode;
  trailingActions?: ReactNode;
  removeActions?: boolean;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ title, haveTabs, leadingActions, trailingActions, removeActions }, ref) => {
    const { toggleOpen } = useSidebarContext();

    return (
      <Box ref={ref} sx={{ alignItems: "center", display: "flex", px: 4, pt: 3, pb: haveTabs ? 1 : 3 }}>
        {!removeActions && (
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
        <Box>
          <Stack direction="row" spacing={1.5}>
            {leadingActions}
            {!removeActions && (
              <>
                <Tooltip title="Pesquisar">
                  <IconButton color="secondary" aria-label="Pesquisar">
                    <FiSearch />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notificações">
                  <IconButton color="secondary" aria-label="Notificações">
                    <FiBell />
                  </IconButton>
                </Tooltip>
              </>
            )}
            {trailingActions && (
              <>
                <Box>
                  <Divider orientation="vertical" />
                </Box>
                {trailingActions}
              </>
            )}
          </Stack>
        </Box>
      </Box>
    );
  }
);
