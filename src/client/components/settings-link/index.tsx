import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiChevronRight } from "react-icons/fi";
import { To, useMatch, useResolvedPath } from "react-router-dom";

import { Box, ButtonBase, ButtonBaseProps, Grid, Typography } from "@mui/material";

import { PreloadNavLink } from "../preload-nav-link";

interface SettingsLinkProps extends Omit<ButtonBaseProps, "children" | "title"> {
  to: To;
  title: ReactNode;
  description: ReactNode;
  icon: IconType;
}

export function SettingsLink({ title, to, description, icon: Icon, ...rest }: SettingsLinkProps) {
  const { pathname } = useResolvedPath(to);
  const match = useMatch({ path: pathname });

  return (
    <ButtonBase sx={{ py: 1, px: 2, borderRadius: 1 }} component={PreloadNavLink as any} to={to} {...rest}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Box
            sx={{
              borderRadius: 1,
              p: 0.9,
              backgroundColor: match ? "primary.main" : "secondary.main",
              color: match ? "primary.contrastText" : "secondary.contrastText",
              display: "flex",
            }}
          >
            <Icon size={20} />
          </Box>
        </Grid>
        <Grid item xs>
          <Typography sx={{ fontSize: (theme) => theme.typography.pxToRem(18) }} color="secondary">
            {title}
          </Typography>
          <Typography color="textSecondary">{description}</Typography>
        </Grid>
        <Grid item sx={{ display: "inline-flex" }}>
          <Typography sx={{ display: "inline-flex" }} color="textSecondary">
            <FiChevronRight size={22} />
          </Typography>
        </Grid>
      </Grid>
    </ButtonBase>
  );
}
