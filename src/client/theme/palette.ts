import type { Palette } from "@mui/material";
import type { DeepPartial } from "utility-types";

export const darkPalette: DeepPartial<Palette> = {
  mode: "dark",
  primary: {
    main: "#90caf9",
  },
  secondary: {
    main: "#FFF",
  },
  background: {
    default: "#000",
    paper: "#121212",
  },
};

export const lightPalette: DeepPartial<Palette> = {
  mode: "light",
  primary: {
    main: "#407ef8",
  },
  secondary: {
    main: "#000",
  },
  background: {
    default: "#f2f5fe",
    paper: "#FFF",
  },
};
