import createCache from "@emotion/cache";
import { createTheme, Palette } from "@mui/material";

import type { ColorMode } from "../utils/types";
import { darkPalette, lightPalette } from "./palette";

export function createApplicationCache() {
  return createCache({ key: "css" });
}

export function createApplicationTheme(colorMode: ColorMode) {
  const radius = 6;

  return createTheme({
    palette: (colorMode === "dark" ? darkPalette : lightPalette) as Palette,
    shape: { borderRadius: radius },
    typography: {
      fontFamily: "Poppins",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: "filled",
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: radius,
            overflow: "hidden",
          },
          underline: {
            "&::before": { display: "none" },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "0.95rem",
          },
        },
      },
    },
  });
}
