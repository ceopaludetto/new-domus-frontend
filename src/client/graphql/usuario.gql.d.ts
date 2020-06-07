import { DocumentNode } from "graphql";

import * as Types from "../typescript/operations";

declare module "./usuario.gql" {
  const defaultDocument: DocumentNode;
  export const UserValues: DocumentNode;
  export const ShowAllUsers: DocumentNode;

  export default defaultDocument;
}
