import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

import { Box, ButtonBase, Typography } from "@mui/material";

import { PreloadLink, PreloadLinkProps } from "../preload-link";

interface SettingsLinkProps extends PreloadLinkProps {
  icon: IconType;
  description: ReactNode;
}

export function SettingsLink({ children, description, icon: Icon, ...rest }: SettingsLinkProps) {
  return (
    <ButtonBase
      component={PreloadLink}
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        p: 2,
        borderRadius: 1,
        "& + &": { mt: 2 },
      }}
      {...rest}
    >
      <Box sx={{ mr: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            backgroundColor: "secondary.main",
            color: "secondary.contrastText",
            display: "flex",
          }}
        >
          <Icon size={22} />
        </Box>
      </Box>
      <Box sx={{ flex: 1, textAlign: "left" }}>
        <Typography variant="body1" sx={{ fontWeight: "fontWeightMedium" }}>
          {children}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {description}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <FiChevronRight size={22} />
      </Box>
    </ButtonBase>
  );
}
