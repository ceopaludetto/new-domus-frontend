import { forwardRef } from "react";
import { FiBell, FiMenu, FiSearch } from "react-icons/fi";

import { Box, IconButton, Stack, Typography } from "@mui/material";

import { useSidebarContext } from "@/client/utils/hooks";

import { Tooltip } from "../tooltip";

interface HeaderProps {
  title: string;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(({ title }, ref) => {
  const { toggleOpen } = useSidebarContext();

  return (
    <Box ref={ref} sx={{ alignItems: "center", display: "flex", px: 3, pt: 2, pb: 2 }}>
      <Box sx={{ display: { xs: "block", lg: "none" }, mr: 1.5 }}>
        <Tooltip title="Abrir Menu">
          <IconButton aria-label="Abrir Menu" onClick={toggleOpen}>
            <FiMenu />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "fontWeightMedium" }} variant="h4">
          {title}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Box>
        <Stack direction="row" spacing={1.5}>
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
        </Stack>
      </Box>
    </Box>
  );
});
