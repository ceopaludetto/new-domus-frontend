import { createContext } from "react";

import type { ColorMode } from "@/client/utils/types";

import type { createTheme } from "./create";

interface ThemeContextProps {
  theme: ReturnType<typeof createTheme>;
  colorMode: ColorMode;
  changeColorMode: (colorMode?: ColorMode) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: {} as any,
  colorMode: "dark",
  changeColorMode: (colorMode?: ColorMode) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars,
});
