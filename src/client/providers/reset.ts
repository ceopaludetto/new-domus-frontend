import { createContext, useContext } from "react";

export const ResetContext = createContext({
  reset: () => {},
});

export function useResetContext() {
  return useContext(ResetContext);
}
