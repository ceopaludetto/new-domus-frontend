import { InMemoryCache, ApolloClient, HttpLink, ApolloLink, concat } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";

function getCookie(name: string) {
  const cookieName = `${name}=`;
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(";");
  const cookie = cookies.find((c) => c.includes(cookieName));

  return cookie?.replace(cookieName, "") ?? "";
}

const csurfLink = new ApolloLink((operation, forward) => {
  const csurfToken = getCookie("X-XSRF-TOKEN");

  if (csurfToken) {
    operation.setContext({
      headers: {
        "X-XSRF-TOKEN": csurfToken,
      },
    });
  }

  return forward(operation);
});

export function createClient(isSsr = false, link: HttpLink | SchemaLink) {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link: typeof document !== "undefined" ? concat(csurfLink, link) : link,
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
