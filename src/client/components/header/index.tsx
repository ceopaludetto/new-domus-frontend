import { forwardRef } from "react";
import { FiBell, FiSearch } from "react-icons/fi";

import { Box, IconButton, Stack, Typography } from "@mui/material";

import { Tooltip } from "../tooltip";

interface HeaderProps {
  title: string;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(({ title }, ref) => (
  <Box ref={ref} sx={{ alignItems: "center", display: "flex", px: 3, pt: 2, pb: 2 }}>
    <Box>
      <Typography sx={{ fontWeight: "fontWeightMedium" }} variant="h4">
        {title}
      </Typography>
    </Box>
    <Box sx={{ flex: 1 }} />
    <Box>
      <Stack direction="row" spacing={1.5}>
        <Tooltip title="Pesquisar" aria-label="Pesquisar">
          <IconButton color="secondary">
            <FiSearch />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notificações" aria-label="Notificações">
          <IconButton color="secondary">
            <FiBell />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  </Box>
));
