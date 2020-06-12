/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";

import { useProgress } from "@/client/hooks";

export const ProgressContext = React.createContext<ReturnType<typeof useProgress>>({
  start() {},
  add() {},
  stop() {},
  done() {},
  changeStep() {},
  progress: 0,
  freezed: true,
  wait: false,
  step: 0,
});
