import * as React from "react";
import { FiSettings, FiChevronRight } from "react-icons/fi";

import { IconButton, Breadcrumbs, Link, Typography, Grid, Container, Box } from "@material-ui/core";

import { PreloadLink } from "@/client/components/typography";
import { useBreadcrumbs } from "@/client/hooks";
import { retrieveTo } from "@/client/utils/string";

export function AppHeader() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Container maxWidth="xl">
      <Box py={1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Breadcrumbs separator={<FiChevronRight size={18} />}>
              {breadcrumbs.map((b, i) =>
                breadcrumbs.length - 1 === i ? (
                  <Typography key={b.name} color="textPrimary">
                    {b.meta?.displayName}
                  </Typography>
                ) : (
                  <Link component={PreloadLink} key={b.name} color="inherit" to={retrieveTo(b.path)}>
                    {b.meta?.displayName}
                  </Link>
                )
              )}
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <IconButton component={PreloadLink} to="/app/:condominium/settings">
              <FiSettings />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
