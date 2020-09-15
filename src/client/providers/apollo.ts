import { InMemoryCache, ApolloClient, ApolloLink } from "@apollo/client";

import { SelectedCondominium } from "@/client/graphql";

import { AccessToken } from "./token";

export const tokenStore = new AccessToken();

const contextLink = new ApolloLink((operation, forward) => {
  try {
    const context = operation.getContext();

    const selected = context.cache.readQuery({
      query: SelectedCondominium,
    });

    operation.setContext(({ headers }: any) => ({
      headers: {
        "X-Condominium": selected.selectedCondominium,
        ...headers,
      },
    }));
  } catch (error) {} // eslint-disable-line no-empty

  return forward(operation);
});

const setTokenLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();

    const token = context.response.headers.get("X-Access-Token");
    if (token) {
      tokenStore.token = token;
    }

    return response;
  });
});

const getTokenLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => ({
    headers: {
      "X-Access-Token": tokenStore.token,
      ...headers,
    },
  }));

  return forward(operation);
});

export function createClient(isSsr = false, link: ApolloLink) {
  let cache = new InMemoryCache();

  if (!isSsr) {
    const apolloState = document.querySelector("#__APOLLO_STATE__");
    if (apolloState) {
      cache = cache.restore(JSON.parse(apolloState.innerHTML));

      if (process.env.NODE_ENV === "production") {
        apolloState.parentElement?.removeChild(apolloState);
      }
    }
  }

  const client = new ApolloClient({
    cache,
    link: isSsr ? link : contextLink.concat(setTokenLink.concat(getTokenLink.concat(link))),
    ssrMode: isSsr,
    connectToDevTools: process.env.NODE_ENV === "development",
    assumeImmutableResults: true,
  });

  return client;
}
