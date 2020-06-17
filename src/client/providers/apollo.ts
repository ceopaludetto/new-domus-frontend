import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { SchemaLink } from "apollo-link-schema";

function getCookie(name: string) {
  const cookieName = `${name}=`;
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(";");
  const cookie = cookies.find((c) => c.includes(cookieName));

  return cookie?.replace(cookieName, "") ?? "";
}

const csurfLink = setContext((_, { headers }) => {
  const csurfToken = getCookie("X-XSRF-TOKEN");

  return {
    headers: {
      ...headers,
      "X-XSRF-TOKEN": csurfToken,
    },
  };
});

export function createClient(isSsr = false, link: HttpLink | SchemaLink) {
  const cache = new InMemoryCache({ freezeResults: true });

  const client = new ApolloClient({
    cache,
    link: typeof document !== "undefined" ? csurfLink.concat(link) : link,
    ssrMode: isSsr,
    connectToDevTools: process.env.NODE_ENV === "development",
    assumeImmutableResults: true,
    resolvers: {},
  });

  if (!isSsr) {
    const apolloState = document.querySelector("#__APOLLO_STATE__");
    if (apolloState && apolloState.innerHTML) {
      cache.restore(JSON.parse(apolloState.innerHTML));
      if (!module.hot) {
        const cacheRoot = apolloState?.parentElement?.removeChild?.(apolloState);
        if (!cacheRoot) throw Error("Fail to remove cache");
      }
    }
  }

  return client;
}
