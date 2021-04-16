import { useContext } from "react";

import { ThemeContext } from "@/client/providers/theme";

export function useColorMode() {
  return useContext(ThemeContext);
}
