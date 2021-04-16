import { useState, useRef, ReactNode, ComponentProps } from "react";
import { HelmetProps, Helmet } from "react-helmet-async";
import { useIsomorphicLayoutEffect, useWindowScroll } from "react-use";

import { Typography, Container, Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface PageProps extends ComponentProps<typeof Container> {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  helmetProps?: HelmetProps;
  helmet?: ReactNode;
  footer?: ReactNode;
  tabs?: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    zIndex: theme.zIndex.appBar + 1,
  },
}));

export function Page({ title, subtitle, children, actions, helmet, helmetProps, footer, tabs, ...rest }: PageProps) {
  const classes = useStyles();
  const [headerSize, setHeaderSize] = useState<number>();
  const { y } = useWindowScroll();
  const frame = useRef<number>(0);

  const observer = useRef(
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
      </Container>
      {!!tabs && (
        <Box position="sticky" bgcolor="background.default" className={classes.tabs} top={headerSize} clone>
          <Container
            {...rest}
            style={{
              maxWidth: y > (headerSize ?? 0) + 22 ? "none" : undefined,
            }}
          >
            <Box mt={2} mb={4} mx={{ xs: 0, md: -3 }} px={{ xs: 0, md: 3 }}>
              {tabs}
            </Box>
          </Container>
        </Box>
      )}
      <Container {...rest}>{children}</Container>
    </>
  );
}
