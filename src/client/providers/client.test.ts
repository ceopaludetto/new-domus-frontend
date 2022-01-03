import { ApolloClient, InMemoryCache } from "@apollo/client";

import { createClient } from "./client";
import "cross-fetch/polyfill";

describe("createClient", () => {
  it("should return a instance of apollo client", () => {
    const [client] = createClient(false);

    expect(client).toBeInstanceOf(ApolloClient);
    expect(client.cache).toBeInstanceOf(InMemoryCache);
  });

  it("should add cookies if is ssr mode", () => {
    const fn = jest.fn();
    createClient(true, { header: fn } as any);

    expect(fn).toBeCalled();
  });

  it("should restore from apollo state", () => {
    const script = document.createElement("script");
    script.id = "__APOLLO_STATE__";
    script.type = "application/json";
    script.innerHTML = JSON.stringify({ test: "" });
    document.body.appendChild(script);

    const [client] = createClient(false);
    expect(client).toBeTruthy();
  });
});
