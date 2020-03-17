declare module "*/auth.gql" {
  import { DocumentNode, DocumentNode } from "graphql";

  const defaultDocument: DocumentNode;
  export const UsuarioValues: DocumentNode;
  export const Login: DocumentNode;

  export default defaultDocument;
}

declare module "*/usuario.gql" {
  const defaultDocument: DocumentNode;
  export const UsuarioValues: DocumentNode;
  export const FindAllUsuarios: DocumentNode;

  export default defaultDocument;
}
