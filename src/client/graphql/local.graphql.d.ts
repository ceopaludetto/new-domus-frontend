import { DocumentNode } from "graphql";

import * as Types from "./operations";

declare module "./local.graphql" {
  const defaultDocument: DocumentNode;
  export const Logged: DocumentNode;

  export default defaultDocument;
}
