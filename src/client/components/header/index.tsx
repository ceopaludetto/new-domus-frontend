import { useCallback, useEffect } from "react";
import { FiSettings, FiLogOut, FiMenu } from "react-icons/fi";

import { Box, Button, Grid, Hidden, IconButton, useMediaQuery, useTheme } from "@material-ui/core";

import { useEvictCookieMutation } from "@/client/graphql";
import { usePreload } from "@/client/helpers/hooks";
import { useSelectedCondominium } from "@/client/helpers/hooks/use-selected-condominium";
import { sidebarStorage, tokenStorage } from "@/client/providers/storages";

import { Blurred } from "../blurred";
import { BreadCrumbs } from "../breadcrumbs";
import { PreloadLink } from "../preload-link";
import { Spacer } from "../spacer";
import { Tooltip } from "../tooltip";
import { useStyles } from "./styles";

export function AppHeader() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [evict, { client }] = useEvictCookieMutation();
  const [, , { reset }] = useSelectedCondominium();
  const { preload } = usePreload();

  const handleLogout = useCallback(async () => {
    await evict();

    reset();
    tokenStorage("");

    await preload("/auth/signin");
    await client.resetStore();
  }, [evict, reset, client, preload]);

  useEffect(() => {
    if (!isMobile && sidebarStorage()) {
      sidebarStorage(false);
    }
  }, [isMobile]);

  return (
    <Box position="sticky" top={0} className={classes.header}>
      <Blurred border>
        <Box py={2} px={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <Hidden mdUp implementation="css">
                <Tooltip title="Abrir menu">
                  <IconButton onClick={() => sidebarStorage(true)} aria-label="Abrir menu">
                    <FiMenu />
                  </IconButton>
                </Tooltip>
              </Hidden>
              <Hidden smDown implementation="css">
                <BreadCrumbs />
              </Hidden>
            </Grid>
            <Grid item>
              <Spacer>
                <Tooltip title="Configurações">
                  <IconButton component={PreloadLink} to="/app/settings" aria-label="Configurações">
                    <FiSettings />
                  </IconButton>
                </Tooltip>
                <Button startIcon={<FiLogOut />} color="secondary" variant="contained" onClick={handleLogout}>
                  Sair
                </Button>
              </Spacer>
            </Grid>
          </Grid>
        </Box>
      </Blurred>
    </Box>
  );
}
