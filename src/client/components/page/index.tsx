import type { ReactNode } from "react";

import { Box, Container, Theme, useMediaQuery } from "@mui/material";

import { Header } from "../header";

interface PageProps {
  title: ReactNode;
  children: ReactNode;
  tabs?: ReactNode;
  actions?: ReactNode;
  inner?: boolean;
}

export function Page({ title, children, tabs, actions, inner }: PageProps) {
  const show = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));

  return (
    <>
      {(!inner || show) && (
        <Box
          sx={{
            mb: 2,
            top: 0,
            backdropFilter: "blur(12px) saturate(120%)",
            position: "sticky",
            zIndex: (theme) => theme.zIndex.appBar,
            transition: (theme) =>
              theme.transitions.create(["top"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.short,
              }),
          }}
        >
          <Header title={title} haveTabs={!!tabs} actions={actions} hideSidebar={inner} />
          {tabs && <Box sx={{ px: 3, pt: 1, mx: -1 }}>{tabs}</Box>}
        </Box>
      )}
      <Container sx={{ px: (theme) => `${theme.spacing(4)}!important` }} maxWidth={false}>
        {children}
      </Container>
    </>
  );
}
