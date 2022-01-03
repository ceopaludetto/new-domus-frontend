import type { ReactNode } from "react";

import { Box, Container } from "@mui/material";

import { Header } from "../header";

interface PageProps {
  title: string;
  children: ReactNode;
  tabs?: ReactNode;
}

export function Page({ title, children, tabs }: PageProps) {
  return (
    <>
      <Box
        sx={{
          backdropFilter: "saturate(180%) blur(5px)",
          position: "sticky",
          mb: 3,
          top: 0,
        }}
      >
        <Header title={title} />
        {tabs && <Box sx={{ px: 3 }}>{tabs}</Box>}
      </Box>
      <Container maxWidth={false}>{children}</Container>
    </>
  );
}
