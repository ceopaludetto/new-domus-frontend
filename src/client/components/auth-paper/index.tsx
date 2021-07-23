import type { ComponentPropsWithoutRef } from "react";

import { Box, Paper } from "@material-ui/core";

export function AuthPaper({ children, ...rest }: ComponentPropsWithoutRef<typeof Paper>) {
  return (
    <Box px={5} py={6} width="100%" maxWidth="550px" clone>
      <Paper {...rest}>{children}</Paper>
    </Box>
  );
}
