import { DocumentNode } from "graphql";

import * as Types from "./operations";

declare module "./auth.graphql" {
  const defaultDocument: DocumentNode;
  export const Login: DocumentNode;
  export const Register: DocumentNode;

  export default defaultDocument;
}
