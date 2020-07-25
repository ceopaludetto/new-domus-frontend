import { DocumentNode } from "graphql";

import * as Types from "./operations";

declare module "./state.graphql" {
  const defaultDocument: DocumentNode;
  export const ShowStates: DocumentNode;

  export default defaultDocument;
}
