type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

type AuthenticationInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

type Mutation = {
  __typename?: "Mutation";
  login: Usuario;
  register: Usuario;
};

type MutationLoginArgs = {
  input: AuthenticationInput;
};

type MutationRegisterArgs = {
  input: UsuarioInput;
};

type Query = {
  __typename?: "Query";
  findAllUsuarios: Array<Usuario>;
  findUsuario: Usuario;
};

type QueryFindUsuarioArgs = {
  id: Scalars["ID"];
};

type Usuario = {
  __typename?: "Usuario";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  deletedAt: Scalars["DateTime"];
  nome: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

type UsuarioInput = {
  nome: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

type UsuarioValuesFragment = { __typename?: "Usuario"; id: string; email: string; nome: string };

type LoginMutationVariables = {
  input: AuthenticationInput;
};

type LoginMutation = { __typename?: "Mutation"; login: { __typename?: "Usuario" } & UsuarioValuesFragment };

type UsuarioValuesFragment = { __typename?: "Usuario"; id: string; email: string; nome: string };

type FindAllUsuariosQueryVariables = {};

type FindAllUsuariosQuery = {
  __typename?: "Query";
  findAllUsuarios: Array<{ __typename?: "Usuario" } & UsuarioValuesFragment>;
};
