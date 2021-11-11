import { ReactNode, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useMedia } from "react-use";

import { ThemeProvider } from "@mui/material";

import type { ColorMode } from "../utils/types";
import { createApplicationTheme } from "./create";

interface ApplicationThemeProviderProps {
  initialMode: ColorMode;
  children: ReactNode;
}

const darkTheme = createApplicationTheme("dark");
const lightTheme = createApplicationTheme("light");

export function ApplicationThemeProvider({ initialMode, children }: ApplicationThemeProviderProps) {
  const [theme, setTheme] = useState(initialMode === "dark" ? darkTheme : lightTheme);
  const isDark = useMedia("(prefers-color-scheme: dark)", initialMode === "dark");

  useEffect(() => {
    if (isDark) setTheme(darkTheme);
    else setTheme(lightTheme);
  }, [isDark]);

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta name="color-scheme" content={theme.palette.mode} />
      </Helmet>
      {children}
    </ThemeProvider>
  );
}
