import { useEffect, useState } from "react";

import { Box, Drawer, SwipeableDrawer, Hidden, useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { Sidebar, AppHeader, RouteHandler } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/types";

const useStyles = makeStyles(() => ({
  drawer: {
    maxWidth: "300px",
    width: "80%",
  },
  paper: {
    border: 0,
  },
}));

export default function App({ routes }: RouteComponentProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (matches && isOpen) {
      setIsOpen(false);
    }
  }, [matches, isOpen]);

  return (
    <Box display="flex">
      <Box width={{ xs: "auto", md: "300px" }}>
        <Hidden mdUp implementation="css">
          <SwipeableDrawer
            variant="temporary"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            elevation={0}
            ModalProps={{
              keepMounted: true,
            }}
            classes={{ paper: classes.drawer }}
          >
            <Sidebar onSelect={() => setIsOpen(false)} />
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer classes={{ paper: clsx(classes.paper, classes.drawer) }} variant="permanent" open>
            <Sidebar />
          </Drawer>
        </Hidden>
      </Box>
      <Box flex="1" width="calc(100% - 300px)">
        <AppHeader isOpen={isOpen} onOpen={() => setIsOpen(!isOpen)} />
        <RouteHandler routes={routes} />
      </Box>
    </Box>
  );
}
