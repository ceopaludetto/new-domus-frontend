import type { ReactNode } from "react";

import { Box, BoxProps, Typography } from "@mui/material";

interface SectionProps extends Omit<BoxProps, "title"> {
  title: ReactNode;
  description: ReactNode;
}

export function Section({ title, description, children, ...rest }: SectionProps) {
  return (
    <Box component="section" sx={{ "& + &": { mt: 2 } }} {...rest}>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: (theme) => theme.typography.pxToRem(18) }} color="secondary">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {description}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
