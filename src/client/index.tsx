import { StrictMode } from "react";
import { hydrate } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@emotion/react";
import { loadableReady } from "@loadable/component";

import { App } from "./app";
import { createClient } from "./providers/client";
import { ApplicationThemeProvider } from "./theme";
import { createApplicationCache } from "./theme/create";

const root = document.querySelector("#root");
const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const cache = createApplicationCache();

const [client] = createClient(false);

loadableReady(() => {
  hydrate(
    <StrictMode>
      <HelmetProvider>
        <CacheProvider value={cache}>
          <ApplicationThemeProvider initialMode={colorMode}>
            <ApolloProvider client={client}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ApolloProvider>
          </ApplicationThemeProvider>
        </CacheProvider>
      </HelmetProvider>
    </StrictMode>,
    root
  );
});

if (module.hot) {
  module.hot.accept();
}
