/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";

export const ProgressContext = React.createContext<{ isAnimating: boolean; toggle: () => void }>({
  isAnimating: false,
  toggle: () => {},
});
