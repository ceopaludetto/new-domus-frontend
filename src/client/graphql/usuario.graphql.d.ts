import { DocumentNode } from "graphql";

import * as Types from "./operations";

declare module "./usuario.graphql" {
  const defaultDocument: DocumentNode;
  export const ShowAllUsers: DocumentNode;

  export default defaultDocument;
}
