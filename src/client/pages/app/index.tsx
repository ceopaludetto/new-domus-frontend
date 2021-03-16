import * as React from "react";

import { Box } from "@material-ui/core";

import { Sidebar, AppHeader, RouteHandler } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/types";

export default function App({ routes }: RouteComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box display="flex">
      <Box width={{ xs: "auto", md: "300px" }}>
        <Sidebar isOpen={isOpen} onOpen={() => setIsOpen(!isOpen)} />
      </Box>
      <Box flex="1">
        <AppHeader isOpen={isOpen} onOpen={() => setIsOpen(!isOpen)} />
        <RouteHandler routes={routes} />
      </Box>
    </Box>
  );
}
