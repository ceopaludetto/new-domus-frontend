import * as React from "react";
import { HelmetProps, Helmet } from "react-helmet-async";
import { useIsomorphicLayoutEffect } from "react-use";

import { Typography, Container, Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface PageProps extends React.ComponentProps<typeof Container> {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  helmetProps?: HelmetProps;
  helmet?: React.ReactNode;
  footer?: React.ReactNode;
  tabs?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    zIndex: theme.zIndex.appBar + 1,
  },
}));

export function Page({ title, subtitle, children, actions, helmet, helmetProps, footer, tabs, ...rest }: PageProps) {
  const classes = useStyles();
  const [headerSize, setHeaderSize] = React.useState<number>();
  const frame = React.useRef<number>(0);

  const observer = React.useRef(
    typeof window !== "undefined"
      ? new ResizeObserver((entries) => {
          const entry = entries[0];

          if (entry) {
            window.cancelAnimationFrame(frame.current);

            frame.current = window.requestAnimationFrame(() => {
              setHeaderSize(entry.contentRect.height);
            });
          }
        })
      : undefined
  ).current;

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const header = document.querySelector("#app-header");

      if (header && observer) observer.observe(header);

      return () => {
        if (observer) {
          if (header) observer.unobserve(header);
          observer.disconnect();
        }
      };
    }
    return () => {};
  }, [observer]);

  return (
    <>
      {helmet || (helmetProps && <Helmet {...helmetProps}>{helmet}</Helmet>)}
      <Container {...rest}>
        <Box display="flex" mb={tabs ? 2 : 4} mt={3} alignItems="center" flexWrap="wrap">
          <Box flex={{ xs: "1" }}>
            <Typography variant="subtitle1" component="span" color="primary">
              {subtitle}
            </Typography>
            <Typography variant="h4" component="h1" color="textPrimary">
              {title}
            </Typography>
          </Box>
          {actions && <Box>{actions}</Box>}
          {footer && (
            <Box mt={2} flex="0 0 100%">
              {footer}
            </Box>
          )}
        </Box>
        {!!tabs && (
          <Box
            position="sticky"
            bgcolor="background.default"
            className={classes.tabs}
            mt={2}
            mb={4}
            mx={-3}
            px={3}
            top={headerSize}
          >
            {tabs}
          </Box>
        )}
        {children}
      </Container>
    </>
  );
}
