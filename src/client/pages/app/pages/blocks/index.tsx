import { RouteHandler } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/types";

export default function AppBlocks({ routes }: RouteComponentProps) {
  return <RouteHandler routes={routes} />;
}
