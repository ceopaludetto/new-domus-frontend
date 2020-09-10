import * as React from "react";
import { Route } from "react-router-dom";

import { Box } from "@material-ui/core";

import { Sidebar, AppHeader } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/common.dto";

export default function App({ routes }: RouteComponentProps) {
  return (
    <Box display="flex">
      <Box position="relative" flex="1" maxWidth="300px">
        <Sidebar routes={routes} />
      </Box>
      <Box flex="1">
        <AppHeader />
        {routes?.map(({ name, component: Component, children, ...rest }) => (
          <Route key={name} render={(props) => <Component routes={children} {...props} />} {...rest} />
        ))}
      </Box>
    </Box>
  );
}
