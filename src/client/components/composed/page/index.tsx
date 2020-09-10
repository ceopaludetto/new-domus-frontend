import * as React from "react";
import { HelmetProps, Helmet } from "react-helmet-async";

import { Typography, Container, Box } from "@material-ui/core";

interface PageProps extends React.ComponentProps<typeof Container> {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  helmet?: HelmetProps;
}

export function Page({ title, subtitle, children, actions, helmet, ...rest }: PageProps) {
  return (
    <Container {...rest}>
      {helmet && <Helmet {...helmet} />}
      <Box display="flex" mb={4} mt={3} alignItems="center">
        <Box flex={{ xs: "1" }}>
          <Typography variant="subtitle1" component="span" color="primary">
            {subtitle}
          </Typography>
          <Typography variant="h4" component="h1" color="textPrimary">
            {title}
          </Typography>
        </Box>
        {actions && <Box>{actions}</Box>}
      </Box>
      {children}
    </Container>
  );
}
