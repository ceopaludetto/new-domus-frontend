import { ApolloClient, ApolloLink, from, InMemoryCache, HttpLink } from "@apollo/client";
import type { Request } from "express";

import { accessTokenStorage } from "./storage";

const addTokenLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    let newHeaders = headers;

    const token = accessTokenStorage();
    if (token) newHeaders = { ...newHeaders, Authorization: `Bearer ${token}` };

    return { headers: newHeaders };
  });

  return forward(operation);
});

const saveTokenLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const token = context.response.headers.get("AccessToken");

    if (token) accessTokenStorage(token);

    return response;
  })
);

export function createClient(ssrMode: boolean, request?: Request) {
  const httpLink = new HttpLink({
    credentials: "include",
    uri: process.env.CEOP_BACKEND_URL as string,
    headers:
      ssrMode && request
        ? {
            cookie: request.header("Cookie"),
          }
        : undefined,
  });

  const link = from([addTokenLink, saveTokenLink, httpLink]);
  let cache = new InMemoryCache();

  if (!ssrMode) {
    const state = document.querySelector("#__APOLLO_STATE__")?.innerHTML;
    if (state) cache = cache.restore(JSON.parse(state));
  }

  const client = new ApolloClient({ cache, ssrMode, link, assumeImmutableResults: true });

  return [client, { cache }] as const;
}
