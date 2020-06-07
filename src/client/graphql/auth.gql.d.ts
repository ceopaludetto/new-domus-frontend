import { DocumentNode } from "graphql";

import * as Types from "../typescript/operations";

declare module "./auth.gql" {
  const defaultDocument: DocumentNode;
  export const UserValues: DocumentNode;
  export const Login: DocumentNode;

  export default defaultDocument;
}
