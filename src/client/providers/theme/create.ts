import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

import type { ColorMode, ColorModeMap } from "@/client/utils/types";

import { darkVariant, lightVariant, blueVariant, props, overrides } from "./defs";

export const variants: ColorModeMap = {
  dark: { name: "Escuro", color: darkVariant.background?.default as string, theme: darkVariant },
  light: { name: "Claro", color: lightVariant.background?.default as string, theme: lightVariant },
  blue: { name: "Azul", color: blueVariant.background?.default as string, theme: blueVariant },
};

export const createTheme = (mode: ColorMode = "dark") => {
  const variant = variants[mode];

  return responsiveFontSizes(
    createMuiTheme({
      palette: variant.theme,
      shape: {
        borderRadius: 6,
      },
      typography: {
        fontFamily: "Poppins",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        htmlFontSize: 16,
      },
      props: props as any,
      overrides: overrides(variant.theme) as any,
    })
  );
};
