import { RouteHandler } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/types";

export default function AppLocals({ routes }: RouteComponentProps) {
  return <RouteHandler routes={routes} />;
}
