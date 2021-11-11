import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

import { CssBaseline } from "@mui/material";

interface FontsProps {
  children: ReactNode;
}

export function Fonts({ children }: FontsProps) {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <CssBaseline />
      {children}
    </>
  );
}
