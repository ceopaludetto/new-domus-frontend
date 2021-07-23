import * as ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { loadableReady } from "@loadable/component";

import { createGraphQLClient } from "@/client/providers/client";
import "./polyfills";

import { App } from "./App";

const { client } = createGraphQLClient(false, window.fetch);

loadableReady().then(() => {
  const root = document.querySelector("#app");
  const method: "render" | "hydrate" = root?.hasChildNodes() ? "hydrate" : "render";

  return ReactDOM[method](
    <BrowserRouter>
      <HelmetProvider>
        <ApolloProvider client={client}>
          <App cookies={document.cookie} />
        </ApolloProvider>
      </HelmetProvider>
    </BrowserRouter>,
    root,
    () => {
      const jssStyles = document.querySelector("#jss-server-side");
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  );
});

if (module.hot) {
  module.hot.accept();
}
