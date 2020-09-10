import * as React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { Paper, Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { Footer } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/common.dto";

const useStyles = makeStyles(() => ({
  container: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },
  register: {
    "@media (max-width: 900px)": {
      placeItems: "start",
      height: "auto",
    },
  },
  notRegister: {
    "@media (max-width: 550px)": {
      placeItems: "start",
      height: "auto",
    },
  },
}));

export default function Auth({ routes }: RouteComponentProps) {
  const location = useLocation();
  const isRegister = React.useMemo(() => location.pathname.includes("/auth/signup"), [location]);
  const classes = useStyles();

  return (
    <>
      <Container className={clsx(classes.container, isRegister ? classes.register : classes.notRegister)}>
        <Box width="100%" maxWidth={isRegister ? "900px" : "550px"}>
          <Paper variant="outlined">
            <Box p={4}>
              <Switch>
                {routes?.map(({ name, component: Component, children, ...rest }) => (
                  <Route key={name} render={(props) => <Component {...props} routes={children} />} {...rest} />
                ))}
              </Switch>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
