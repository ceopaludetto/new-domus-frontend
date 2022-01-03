import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiChevronRight } from "react-icons/fi";
import { useMatch, useResolvedPath } from "react-router-dom";

import { Box, ButtonBase, Typography } from "@mui/material";

import { PreloadLink, PreloadLinkProps } from "../preload-link";

interface SettingsLinkProps extends PreloadLinkProps {
  icon: IconType;
  description: ReactNode;
}

export function SettingsLink({ children, description, icon: Icon, to, ...rest }: SettingsLinkProps) {
  const { pathname } = useResolvedPath(to);
  const match = useMatch({ path: pathname, end: true });

  return (
    <ButtonBase
      component={PreloadLink}
      to={to}
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        p: 1.75,
        borderRadius: 1,
        "& + &": { mt: 1 },
      }}
      {...rest}
    >
      <Box sx={{ mr: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            backgroundColor: match ? "primary.main" : "secondary.main",
            color: match ? "primary.contrastText" : "secondary.contrastText",
            display: "flex",
            transition: (theme) =>
              theme.transitions.create(["background-color", "color"], {
                duration: theme.transitions.duration.short,
                easing: theme.transitions.easing.easeInOut,
              }),
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
