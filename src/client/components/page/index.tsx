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
          backdropFilter: "blur(12px) saturate(120%)",
          position: "sticky",
          mb: 3,
          top: 0,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Header title={title} />
        {tabs && <Box sx={{ px: 3, mx: -2 }}>{tabs}</Box>}
      </Box>
      <Container maxWidth={false}>{children}</Container>
    </>
  );
}
