/* eslint-disable react/no-danger */
import { StrictMode } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { matchPath, generatePath } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

import { ApolloProvider } from "@apollo/client";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { ChunkExtractor } from "@loadable/server";
import express from "express";

import { App } from "@/client/app";
import { ProfileDocument, ProfileQuery } from "@/client/graphql";
import { createClient } from "@/client/providers/client";
import { accessTokenStorage, condominiumStorage } from "@/client/providers/storage";
import { ApplicationThemeProvider } from "@/client/theme";
import { createApplicationCache } from "@/client/theme/create";
import type { ColorMode } from "@/client/utils/types";

import { applyMiddlewares } from "./middlewares";

const app = express();

applyMiddlewares(app);

app.get("*", async (request, response) => {
  const cache = createApplicationCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const colorMode = (request.header("sec-ch-prefers-color-scheme") ?? "light") as ColorMode;
  const helmetContext: FilledContext = {} as any;

  const [client] = createClient(true, request);

  try {
    const { data } = await client.query<ProfileQuery>({ query: ProfileDocument });

    if (data) {
      const match = matchPath("/application/:condominium/*", request.url);

      const condominium = match?.params.condominium;
      const hasCondominium = data.profile.person.condominiums.some((c) => c.id === condominium);

      if (condominium && hasCondominium) condominiumStorage(condominium);

      if (!hasCondominium) {
        const condominiumID = data.profile.person.condominiums[0].id;

        condominiumStorage(condominiumID);

        const path = generatePath("/application/:condominium", {
          condominium: condominiumID,
        });

        if (match) return response.redirect(path);
      }
    }
  } catch (error) {} // eslint-disable-line no-empty

  const extractor = new ChunkExtractor({ statsFile: process.env.CEOP_LOADABLE as string });
  const markup = await getMarkupFromTree({
    tree: (
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <CacheProvider value={cache}>
            <ApplicationThemeProvider initialMode={colorMode}>
              <ApolloProvider client={client}>
                <StaticRouter location={request.url}>
                  <App />
                </StaticRouter>
              </ApolloProvider>
            </ApplicationThemeProvider>
          </CacheProvider>
        </HelmetProvider>
      </StrictMode>
    ),
    renderFunction: (tree) => renderToString(extractor.collectChunks(tree)),
  });

  const initialState = client.extract();

  const script = extractor.getScriptElements();
  const link = extractor.getLinkTags();
  const style = extractor.getStyleTags();

  const { helmet } = helmetContext;

  const emotionChunks = extractCriticalToChunks(markup);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  const head = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}${link}${style}${emotionCss}`;

  const initialCondominium = condominiumStorage();

  accessTokenStorage(null);
  condominiumStorage(null);

  return response.send(
    "<!DOCTYPE html>".concat(
      renderToStaticMarkup(
        <html lang="en-US" {...helmet.htmlAttributes.toComponent()}>
          <head dangerouslySetInnerHTML={{ __html: head }} />
          <body {...helmet.bodyAttributes.toComponent()}>
            <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
            {script}
            <script
              id="__APOLLO_STATE__"
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(initialState).replace(/</g, "\\u003c"),
              }}
            />
            <script
              id="__CONDOMINIUM__"
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(initialCondominium).replace(/</g, "\\u003c"),
              }}
            />
          </body>
        </html>
      )
    )
  );
});

export { app };
