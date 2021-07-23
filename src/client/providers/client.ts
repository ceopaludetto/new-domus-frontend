import { ApolloClient, InMemoryCache, ApolloLink, from } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import type { FastifyRequest } from "fastify";

import { condominiumStorage, tokenStorage } from "./storages";

export function createGraphQLClient(isSSR: boolean, fetch: typeof window.fetch, request?: FastifyRequest) {
  tokenStorage("");
  condominiumStorage("");

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          showBlocks: relayStylePagination(),
        },
      },
      Condominium: {
        fields: {
          rules: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  if (!isSSR) {
    const script = document.querySelector<HTMLScriptElement>("#__APOLLO_STATE__");
    if (script) {
      const initialState = JSON.parse(script.innerHTML);

      cache.restore(initialState);

      if (process.env.NODE_ENV === "production") {
        script.parentElement?.removeChild(script);
      }
    }
  }

  const sendTokenLink = new ApolloLink((operation, forward) => {
    const token = tokenStorage();
    const condominium = condominiumStorage();

    operation.setContext(({ headers = {} }) => {
      let header = { ...headers };

      if (token) {
        header = { ...header, "X-Access-Token": token };
      }

      if (condominium) {
        header = { ...header, "X-Condominium": condominium };
      }

      return {
        headers: header,
      };
    });

    return forward(operation);
  });

  const saveTokenLink = new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
      const context = operation.getContext();

      if (context.response.headers.has("x-access-token")) {
        tokenStorage(context.response.headers.get("x-access-token"));
      }

      return response;
    })
  );

  const httpLink = createUploadLink({
    uri: `${process.env.RAZZLE_BACKEND_URL}/graphql`,
    credentials: "include",
    fetchOptions: {
      mode: "cors",
    },
    async fetch(resource, options) {
      const { headers = {}, ...rest } = options ?? {};

      if (isSSR && request) {
        if (!("cookie" in headers)) {
          (headers as any).cookie = "";
        }

        if (request.cookies["X-Refresh-Token"]) {
          (headers as any).cookie += `X-Refresh-Token=${request.cookies["X-Refresh-Token"]};`;
        }

        if (request.cookies["@Domus"]) {
          (headers as any).cookie += `@Domus=${request.cookies["@Domus"]};`;
        }
      }

      return fetch(resource, { headers, ...rest });
    },
  });

  const client = new ApolloClient({
    cache,
    ssrMode: isSSR,
    credentials: "include",
    assumeImmutableResults: true,
    link: from([sendTokenLink, saveTokenLink, httpLink]),
  });

  return { client, tokenStorage, condominiumStorage } as const;
}
