/* eslint-disable react/no-danger */
import { StrictMode } from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { matchPath, generatePath } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import prepass from "react-ssr-prepass";

import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { ChunkExtractor } from "@loadable/server";
import express from "express";
import { Provider } from "urql";

import { App } from "@/client/app";
import { ProfileDocument, ProfileQuery } from "@/client/graphql";
import { createURQLClient } from "@/client/providers/client";
import { accessTokenStorage } from "@/client/providers/storage";
import { ApplicationThemeProvider } from "@/client/theme";
import { createApplicationCache } from "@/client/theme/create";
import { CondominiumProvider } from "@/client/utils/hooks";
import type { ColorMode } from "@/client/utils/types";

import { applyMiddlewares } from "./middlewares";

const app = express();

applyMiddlewares(app);

app.get("*", async (request, response) => {
  const cache = createApplicationCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const colorMode = (request.header("sec-ch-prefers-color-scheme") ?? "light") as ColorMode;
  const helmetContext: FilledContext = {} as any;

  const { client, ssr } = createURQLClient(true, request);
  let initialCondominium: string = "";

  try {
    const { data } = await client.query<ProfileQuery>(ProfileDocument).toPromise();

    if (data) {
      const match = matchPath("/application/:condominium/*", request.url);

      const condominium = match?.params.condominium;
      const hasCondominium = data.profile.person.condominiums.some((c) => c.id === condominium);

      if (condominium && hasCondominium) initialCondominium = condominium;

      if (!hasCondominium) {
        const condominiumID = data.profile.person.condominiums[0].id;

        initialCondominium = condominiumID;

        const path = generatePath("/application/:condominium", {
          condominium: condominiumID,
        });

        if (match) return response.redirect(path);
      }
    }
  } catch (error) {} // eslint-disable-line no-empty

  const extractor = new ChunkExtractor({ statsFile: process.env.CEOP_LOADABLE as string });
  const element = extractor.collectChunks(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <CacheProvider value={cache}>
          <ApplicationThemeProvider initialMode={colorMode}>
            <Provider value={client}>
              <CondominiumProvider initialValue={initialCondominium}>
                <StaticRouter location={request.url}>
                  <App />
                </StaticRouter>
              </CondominiumProvider>
            </Provider>
          </ApplicationThemeProvider>
        </CacheProvider>
      </HelmetProvider>
    </StrictMode>
  );

  await prepass(element);
  const markup = renderToString(element);

  const initialState = ssr.extractData();

  const script = extractor.getScriptElements();
  const link = extractor.getLinkTags();
  const style = extractor.getStyleTags();

  const { helmet } = helmetContext;

  const emotionChunks = extractCriticalToChunks(markup);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  const head = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}${link}${style}${emotionCss}`;

  accessTokenStorage.del();

  return response.send(
    "<!DOCTYPE html>".concat(
      renderToStaticMarkup(
        <html lang="en-US" {...helmet.htmlAttributes.toComponent()}>
          <head dangerouslySetInnerHTML={{ __html: head }} />
          <body {...helmet.bodyAttributes.toComponent()}>
            <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
            {script}
            <script
              id="__URQL_STATE__"
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
