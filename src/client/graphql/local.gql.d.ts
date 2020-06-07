import { DocumentNode } from "graphql";

import * as Types from "../typescript/operations";

declare module "./local.gql" {
  const defaultDocument: DocumentNode;
  export const Logged: DocumentNode;

  export default defaultDocument;
}
