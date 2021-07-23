import { useCallback, useEffect, useRef, useState, ReactNode } from "react";
import { Helmet } from "react-helmet-async";

import { Theme, ThemeProvider as MuiThemeProvider } from "@material-ui/core";

import type { ColorMode } from "@/client/utils/types";

import { ThemeContext } from "./context";
import { createTheme } from "./create";
import { cookieStorageManager } from "./manager";

interface ThemeProviderProps {
  cookies: string;
  children: ReactNode;
}

const themes: Record<ColorMode, Theme> = {
  dark: createTheme("dark"),
  light: createTheme("light"),
  blue: createTheme("blue"),
};

export function ThemeProvider({ children, cookies }: ThemeProviderProps) {
  const manager = useRef(cookieStorageManager(cookies, "@Domus:Theme"));

  const [colorMode, setColorMode] = useState(() => manager.current.get("dark"));
  const [theme, setTheme] = useState(() => themes[colorMode]);

  const changeColorMode = useCallback((newColorMode?: ColorMode) => {
    setColorMode((current) => {
      if (newColorMode) {
        return newColorMode;
      }

      return current === "dark" ? "light" : "dark";
    });
  }, []);

  useEffect(() => {
    manager.current.set(colorMode);
    setTheme(themes[colorMode]);
  }, [manager, colorMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme, colorMode, changeColorMode }}>
        <Helmet>
          <meta name="color-scheme" content={theme.palette.type} />
        </Helmet>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

export { variants } from "./create";
