import { DocumentNode } from "graphql";

import * as Types from "../operations";

declare module "./person-values.graphql" {
  const defaultDocument: DocumentNode;
  export const PersonValues: DocumentNode;

  export default defaultDocument;
}
