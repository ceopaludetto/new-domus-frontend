import { useContext } from "react";

import { ThemeContext } from "@/client/providers/theme/context";

export function useColorMode() {
  return useContext(ThemeContext);
}
