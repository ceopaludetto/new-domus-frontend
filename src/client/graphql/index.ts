import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

import type * as Types from "./types";

const defaultOptions = {};
export type RulesValuesFragment = { __typename?: "Rule"; id: string; description: string };

export type CondominiumValuesFragment = {
  __typename?: "Condominium";
  id: string;
  companyName: string;
  cnpj: string;
  character: string;
  rules: Array<{ __typename?: "Rule" } & RulesValuesFragment>;
};

export type PersonValuesFragment = {
  __typename?: "Person";
  id: string;
  name: string;
  lastName: string;
  email: string;
  birthdate: any;
  phones: Array<string>;
  cpf: string;
  condominiums: Array<{ __typename?: "Condominium" } & CondominiumValuesFragment>;
};

export type UserValuesFragment = {
  __typename?: "User";
  id: string;
  login: string;
  person: { __typename?: "Person" } & PersonValuesFragment;
};

export type ImageValuesFragment = {
  __typename?: "Image";
  id: string;
  url: string;
  aspectRatio: number;
  height: number;
};

export type BlockValuesFragment = {
  __typename?: "Block";
  id: string;
  name: string;
  number: number;
  images?: Types.Maybe<Array<{ __typename?: "Image" } & ImageValuesFragment>>;
};

export type LoginMutationVariables = Types.Exact<{
  input: Types.AuthenticationInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "User";
    id: string;
    login: string;
    person: { __typename?: "Person"; id: string; name: string };
  };
};

export type ForgotMutationVariables = Types.Exact<{
  input: Types.ForgotInput;
}>;

export type ForgotMutation = { __typename?: "Mutation"; forgot: string };

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query"; profile: { __typename?: "User" } & UserValuesFragment };

export type EvictCookieMutationVariables = Types.Exact<{ [key: string]: never }>;

export type EvictCookieMutation = { __typename?: "Mutation"; evictRefreshCookie: boolean };

export type FindAllBlocksQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FindAllBlocksQuery = {
  __typename?: "Query";
  showBlocks: {
    __typename?: "BlockConnection";
    totalCount: number;
    pageInfo?: Types.Maybe<{
      __typename?: "BlockPageInfo";
      startCursor?: Types.Maybe<string>;
      endCursor?: Types.Maybe<string>;
    }>;
    edges?: Types.Maybe<
      Array<{ __typename?: "BlockEdge"; node?: Types.Maybe<{ __typename?: "Block" } & BlockValuesFragment> }>
    >;
  };
};

export type ChangePasswordMutationVariables = Types.Exact<{
  input: Types.ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: { __typename?: "User"; id: string; login: string };
};

export type UpdateCondominiumMutationVariables = Types.Exact<{
  input: Types.CondominiumUpdateInput;
}>;

export type UpdateCondominiumMutation = {
  __typename?: "Mutation";
  updateCondominium: { __typename?: "Condominium" } & CondominiumValuesFragment;
};

export type UpdateProfileMutationVariables = Types.Exact<{
  input: Types.UserUpdateInput;
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateUser: { __typename?: "User" } & UserValuesFragment;
};

export type CreateBlockMutationVariables = Types.Exact<{
  input: Types.BlockInsertInput;
}>;

export type CreateBlockMutation = {
  __typename?: "Mutation";
  createBlock: { __typename?: "Block" } & BlockValuesFragment;
};

export const RulesValuesFragmentDoc = /* #__PURE__ */ gql`
  fragment RulesValues on Rule {
    id
    description
  }
`;
export const CondominiumValuesFragmentDoc = /* #__PURE__ */ gql`
  fragment CondominiumValues on Condominium {
    id
    companyName
    cnpj
    character
    rules {
      ...RulesValues
    }
  }
  ${RulesValuesFragmentDoc}
`;
export const PersonValuesFragmentDoc = /* #__PURE__ */ gql`
  fragment PersonValues on Person {
    id
    name
    lastName
    email
    birthdate
    phones
    cpf
    condominiums {
      ...CondominiumValues
    }
  }
  ${CondominiumValuesFragmentDoc}
`;
export const UserValuesFragmentDoc = /* #__PURE__ */ gql`
  fragment UserValues on User {
    id
    login
    person {
      ...PersonValues
    }
  }
  ${PersonValuesFragmentDoc}
`;
export const ImageValuesFragmentDoc = /* #__PURE__ */ gql`
  fragment ImageValues on Image {
    id
    url
    aspectRatio
    height
  }
`;
export const BlockValuesFragmentDoc = /* #__PURE__ */ gql`
  fragment BlockValues on Block {
    id
    name
    number
    images {
      ...ImageValues
    }
  }
  ${ImageValuesFragmentDoc}
`;
export const LoginDocument = /* #__PURE__ */ gql`
  mutation Login($input: AuthenticationInput!) {
    login(input: $input) {
      id
      login
      person {
        id
        name
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ForgotDocument = /* #__PURE__ */ gql`
  mutation Forgot($input: ForgotInput!) {
    forgot(input: $input)
  }
`;
export type ForgotMutationFn = Apollo.MutationFunction<ForgotMutation, ForgotMutationVariables>;

/**
 * __useForgotMutation__
 *
 * To run a mutation, you first call `useForgotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotMutation, { data, loading, error }] = useForgotMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useForgotMutation(baseOptions?: Apollo.MutationHookOptions<ForgotMutation, ForgotMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ForgotMutation, ForgotMutationVariables>(ForgotDocument, options);
}
export type ForgotMutationHookResult = ReturnType<typeof useForgotMutation>;
export type ForgotMutationResult = Apollo.MutationResult<ForgotMutation>;
export type ForgotMutationOptions = Apollo.BaseMutationOptions<ForgotMutation, ForgotMutationVariables>;
export const MeDocument = /* #__PURE__ */ gql`
  query Me {
    profile {
      ...UserValues
    }
  }
  ${UserValuesFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const EvictCookieDocument = /* #__PURE__ */ gql`
  mutation EvictCookie {
    evictRefreshCookie
  }
`;
export type EvictCookieMutationFn = Apollo.MutationFunction<EvictCookieMutation, EvictCookieMutationVariables>;

/**
 * __useEvictCookieMutation__
 *
 * To run a mutation, you first call `useEvictCookieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvictCookieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evictCookieMutation, { data, loading, error }] = useEvictCookieMutation({
 *   variables: {
 *   },
 * });
 */
export function useEvictCookieMutation(
  baseOptions?: Apollo.MutationHookOptions<EvictCookieMutation, EvictCookieMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EvictCookieMutation, EvictCookieMutationVariables>(EvictCookieDocument, options);
}
export type EvictCookieMutationHookResult = ReturnType<typeof useEvictCookieMutation>;
export type EvictCookieMutationResult = Apollo.MutationResult<EvictCookieMutation>;
export type EvictCookieMutationOptions = Apollo.BaseMutationOptions<EvictCookieMutation, EvictCookieMutationVariables>;
export const FindAllBlocksDocument = /* #__PURE__ */ gql`
  query FindAllBlocks {
    showBlocks {
      totalCount
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          ...BlockValues
        }
      }
    }
  }
  ${BlockValuesFragmentDoc}
`;

/**
 * __useFindAllBlocksQuery__
 *
 * To run a query within a React component, call `useFindAllBlocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllBlocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllBlocksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllBlocksQuery(
  baseOptions?: Apollo.QueryHookOptions<FindAllBlocksQuery, FindAllBlocksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllBlocksQuery, FindAllBlocksQueryVariables>(FindAllBlocksDocument, options);
}
export function useFindAllBlocksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindAllBlocksQuery, FindAllBlocksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAllBlocksQuery, FindAllBlocksQueryVariables>(FindAllBlocksDocument, options);
}
export type FindAllBlocksQueryHookResult = ReturnType<typeof useFindAllBlocksQuery>;
export type FindAllBlocksLazyQueryHookResult = ReturnType<typeof useFindAllBlocksLazyQuery>;
export type FindAllBlocksQueryResult = Apollo.QueryResult<FindAllBlocksQuery, FindAllBlocksQueryVariables>;
export const ChangePasswordDocument = /* #__PURE__ */ gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      id
      login
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const UpdateCondominiumDocument = /* #__PURE__ */ gql`
  mutation UpdateCondominium($input: CondominiumUpdateInput!) {
    updateCondominium(input: $input) {
      ...CondominiumValues
    }
  }
  ${CondominiumValuesFragmentDoc}
`;
export type UpdateCondominiumMutationFn = Apollo.MutationFunction<
  UpdateCondominiumMutation,
  UpdateCondominiumMutationVariables
>;

/**
 * __useUpdateCondominiumMutation__
 *
 * To run a mutation, you first call `useUpdateCondominiumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCondominiumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCondominiumMutation, { data, loading, error }] = useUpdateCondominiumMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCondominiumMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCondominiumMutation, UpdateCondominiumMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCondominiumMutation, UpdateCondominiumMutationVariables>(
    UpdateCondominiumDocument,
    options
  );
}
export type UpdateCondominiumMutationHookResult = ReturnType<typeof useUpdateCondominiumMutation>;
export type UpdateCondominiumMutationResult = Apollo.MutationResult<UpdateCondominiumMutation>;
export type UpdateCondominiumMutationOptions = Apollo.BaseMutationOptions<
  UpdateCondominiumMutation,
  UpdateCondominiumMutationVariables
>;
export const UpdateProfileDocument = /* #__PURE__ */ gql`
  mutation UpdateProfile($input: UserUpdateInput!) {
    updateUser(input: $input) {
      ...UserValues
    }
  }
  ${UserValuesFragmentDoc}
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const CreateBlockDocument = /* #__PURE__ */ gql`
  mutation CreateBlock($input: BlockInsertInput!) {
    createBlock(input: $input) {
      ...BlockValues
    }
  }
  ${BlockValuesFragmentDoc}
`;
export type CreateBlockMutationFn = Apollo.MutationFunction<CreateBlockMutation, CreateBlockMutationVariables>;

/**
 * __useCreateBlockMutation__
 *
 * To run a mutation, you first call `useCreateBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlockMutation, { data, loading, error }] = useCreateBlockMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBlockMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateBlockMutation, CreateBlockMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBlockMutation, CreateBlockMutationVariables>(CreateBlockDocument, options);
}
export type CreateBlockMutationHookResult = ReturnType<typeof useCreateBlockMutation>;
export type CreateBlockMutationResult = Apollo.MutationResult<CreateBlockMutation>;
export type CreateBlockMutationOptions = Apollo.BaseMutationOptions<CreateBlockMutation, CreateBlockMutationVariables>;
