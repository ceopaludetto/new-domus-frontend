import { Container, Typography, Box, Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles<Theme>((theme) => ({
  tabs: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

interface PageProps extends React.ComponentPropsWithoutRef<typeof Container> {
  title: string;
  subtitle: string;
  contained?: boolean;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
}

export function Page({ title, subtitle, actions, tabs, contained = false, children, ...rest }: PageProps) {
  const classes = useStyles();

  return (
    <Box mt={2}>
      <Container maxWidth={!contained ? "xl" : undefined} {...rest}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography variant="h6" color="primary">
              {subtitle}
            </Typography>
            <Typography variant="h3" color="secondary" component="h1">
              {title}
            </Typography>
          </Grid>
          <Grid item>{actions}</Grid>
        </Grid>
        {tabs && (
          <Box mt={2} className={classes.tabs}>
            {tabs}
          </Box>
        )}
        <Box mt={tabs ? 5 : 3}>{children}</Box>
      </Container>
    </Box>
  );
}
