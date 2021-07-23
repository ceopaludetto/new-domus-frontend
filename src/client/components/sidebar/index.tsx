import React, { useCallback, cloneElement, useState, useMemo } from "react";
import { CgArrowsExchangeAlt } from "react-icons/cg";

import { useReactiveVar } from "@apollo/client";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
  Popover,
  IconButton,
  Typography,
  Hidden,
  SwipeableDrawer,
} from "@material-ui/core";

import { Logo } from "@/client/assets/logo";
import { useMeQuery } from "@/client/graphql";
import { useSelectedCondominium } from "@/client/helpers/hooks/use-selected-condominium";
import { sidebar } from "@/client/providers/sidebar";
import { sidebarStorage } from "@/client/providers/storages";
import { findRouteByName } from "@/client/utils/routes";
import { retrieveTo } from "@/client/utils/string";
import type { Sidebar } from "@/client/utils/types";

import { Divider } from "../divider";
import { PreloadNavLink } from "../preload-navlink";
import { Tooltip } from "../tooltip";
import { useStyles } from "./styles";

export function AppSidebar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [condominium, changeCondominium, { hasMultiple }] = useSelectedCondominium();
  const open = useReactiveVar(sidebarStorage);

  const { data } = useMeQuery();
  const isIOS = useMemo(() => (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent), []);

  const renderItems = useCallback(
    (items: Sidebar[] = sidebar) =>
      items.map((item) => {
        if (item.type === "route") {
          const route = findRouteByName(item.routeName);
          const to = retrieveTo(route?.path);

          return (
            <ListItem
              component={PreloadNavLink}
              to={to}
              classes={{ root: classes.listItem }}
              activeClassName={classes.active}
              key={route?.name}
              exact={route?.exact}
              strict={route?.strict}
              button
            >
              <ListItemIcon classes={{ root: classes.listItemIcon }}>
                {cloneElement(route?.meta?.icon as any, { size: 22 })}
              </ListItemIcon>
              <ListItemText
                classes={{ root: classes.listItemText }}
                primaryTypographyProps={{ classes: { root: classes.listItemTextPrimary } }}
                primary={route?.meta?.title}
              />
            </ListItem>
          );
        }

        return <div>submenu</div>;
      }),
    [classes]
  );

  const handleOpen = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const changeAndClose = useCallback(
    (id: string) => {
      changeCondominium(id);
      handleClose();
    },
    [handleClose, changeCondominium]
  );

  const handleContent = (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box flex="1" px={1.5}>
        <Box py={3} textAlign="center">
          <Logo height={45} isLogoType />
        </Box>
        <List component="nav">{renderItems()}</List>
      </Box>
      <Divider spacing={0} />
      <Box>
        <Box display="flex" py={hasMultiple ? 2 : 3} px={2} alignItems="center">
          <Box flex="1">
            <Typography color="primary" variant="subtitle2">
              Condomínio Selecionado
            </Typography>
            <Typography>{condominium?.companyName}</Typography>
          </Box>
          {hasMultiple && (
            <Box>
              <Tooltip title="Alterar condomínio">
                <IconButton onClick={handleOpen}>
                  <CgArrowsExchangeAlt />
                </IconButton>
              </Tooltip>
              <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <List>
                  {data?.profile.person.condominiums.map((item) => (
                    <ListItem onClick={() => changeAndClose(item.id)} button key={item.id}>
                      <ListItemText primary={item.companyName} />
                    </ListItem>
                  ))}
                </List>
              </Popover>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden smDown implementation="css">
        <Drawer classes={{ paper: classes.drawer }} variant="permanent" anchor="left">
          {handleContent}
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          open={open}
          onOpen={() => sidebarStorage(true)}
          onClose={() => sidebarStorage(false)}
          classes={{ paper: classes.drawer }}
          disableBackdropTransition={!isIOS}
          disableDiscovery={isIOS}
          anchor="left"
        >
          {handleContent}
        </SwipeableDrawer>
      </Hidden>
    </>
  );
}
