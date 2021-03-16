import * as React from "react";

import { RouteHandler } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/types";

export default function Block({ routes }: RouteComponentProps) {
  return <RouteHandler routes={routes} />;
}
