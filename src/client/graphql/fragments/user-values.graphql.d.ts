import { DocumentNode } from "graphql";

import * as Types from "../operations";

declare module "./user-values.graphql" {
  const defaultDocument: DocumentNode;
  export const UserValues: DocumentNode;

  export default defaultDocument;
}
