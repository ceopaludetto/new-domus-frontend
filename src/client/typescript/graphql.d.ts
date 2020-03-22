
declare module '*/auth.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UserValues: DocumentNode;
export const Login: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/local.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Logged: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/usuario.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const UserValues: DocumentNode;
export const ShowAllUsers: DocumentNode;

  export default defaultDocument;
}
    