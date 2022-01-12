import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import type { Request } from "express";
import { createClient, dedupExchange, ssrExchange } from "urql";

import { accessTokenStorage } from "./storage";

export function fetchOptions(request?: Request): () => RequestInit {
  return () => {
    let headers: HeadersInit = {};

    const token = accessTokenStorage.get();
    if (token) headers = { ...headers, Authorization: `Bearer ${token}` };

    if (request) {
      const cookies = request.header("Cookie");
      if (cookies) headers = { ...headers, Cookie: cookies };
    }

    return { headers, credentials: "include", mode: "cors" };
  };
}

export async function saveToken(input: RequestInfo, init?: RequestInit) {
  return fetch(input, init).then((response) => {
    const { headers } = response;

    if (headers.has("AccessToken")) accessTokenStorage.set(headers.get("AccessToken"));

    return response;
  });
}

export function createURQLClient(ssrMode: boolean, request?: Request) {
  const cache = cacheExchange({});

  const ssr = ssrExchange({
    isClient: !ssrMode,
  });

  if (!ssrMode) {
    const state = document.querySelector("#__URQL_STATE__")?.innerHTML;
    if (state) ssr.restoreData(JSON.parse(state));
  }

  const exchanges = [dedupExchange, cache, ssr, multipartFetchExchange];

  if (process.env.NODE_ENV === "development") {
    exchanges.unshift(devtoolsExchange);
  }

  const client = createClient({
    suspense: ssrMode,
    url: process.env.CEOP_BACKEND_URL as string,
    exchanges,
    fetchOptions: fetchOptions(request),
    fetch: saveToken,
  });

  return { client, ssr };
}
