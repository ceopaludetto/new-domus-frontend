import { ReactNode, useRef } from "react";

import { Box, Container, useScrollTrigger } from "@mui/material";

import { Header } from "../header";

interface PageProps {
  title: string;
  children: ReactNode;
  tabs?: ReactNode;
}

export function Page({ title, children, tabs }: PageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const slide = useScrollTrigger({ disableHysteresis: true });

  return (
    <>
      <Box
        sx={{
          backdropFilter: "blur(12px) saturate(120%)",
          position: "sticky",
          mb: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          top: slide ? -(ref?.current?.offsetHeight ?? 0) : 0,
          zIndex: (theme) => theme.zIndex.appBar,
          transition: (theme) =>
            theme.transitions.create(["top"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.short,
            }),
        }}
      >
        <Header ref={ref} title={title} haveTabs={!!tabs} />
        {tabs && <Box sx={{ px: 3, pt: 1, mx: -2 }}>{tabs}</Box>}
      </Box>
      <Container maxWidth={false}>{children}</Container>
    </>
  );
}
