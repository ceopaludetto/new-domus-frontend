import type { ComponentProps } from "react";

import { Divider as MuiDivider, Grid, Typography } from "@material-ui/core";

interface DividerProps extends ComponentProps<typeof MuiDivider> {
  children?: React.ReactNode;
}

export function Divider({ children, orientation = "horizontal", ...rest }: DividerProps) {
  if (orientation === "vertical") {
    return <MuiDivider orientation={orientation} {...rest} />;
  }

  if (children) {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <MuiDivider orientation={orientation} {...rest} />
        </Grid>
        <Grid item>
          <Typography component="span" display="block" variant="overline">
            {children}
          </Typography>
        </Grid>
        <Grid item xs>
          <MuiDivider orientation={orientation} {...rest} />
        </Grid>
      </Grid>
    );
  }

  return <MuiDivider orientation={orientation} {...rest} />;
}
