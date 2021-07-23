import { Box, Divider as MuiDivider, Grid, Typography } from "@material-ui/core";

interface DividerProps extends React.ComponentPropsWithoutRef<typeof MuiDivider> {
  children?: React.ReactNode;
  spacing?: number;
}

export function Divider({ children, spacing = 2, ...rest }: DividerProps) {
  if (children) {
    return (
      <Box my={spacing}>
        <Grid container spacing={1} alignItems="center">
          <Grid item style={{ flex: "0 0 20px" }}>
            <MuiDivider {...rest} />
          </Grid>
          <Grid item>
            <Typography variant="button">{children}</Typography>
          </Grid>
          <Grid item xs>
            <MuiDivider {...rest} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box my={spacing}>
      <MuiDivider {...rest} />
    </Box>
  );
}
