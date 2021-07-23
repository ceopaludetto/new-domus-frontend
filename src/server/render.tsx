/* eslint-disable react/no-danger */
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { ChunkExtractor } from "@loadable/server";
import { ServerStyleSheets } from "@material-ui/core";
import type { FastifyReply, FastifyRequest } from "fastify";
import fetch from "node-fetch";
import qs from "qs";

import { App } from "@/client/App";
import { createGraphQLClient } from "@/client/providers/client";
import type { ReactStaticContext } from "@/client/utils/types";

export async function render(request: FastifyRequest, response: FastifyReply) {
  const sheets = new ServerStyleSheets();

  const extractor = new ChunkExtractor({
    statsFile: process.env.RAZZLE_LOADABLE_MANIFEST as string,
    entrypoints: ["client"],
  });

  const context: ReactStaticContext = {};
  const helmetContext: FilledContext | Record<string, any> = {};

  const { client, condominiumStorage } = createGraphQLClient(true, fetch as any, request);

  const [, query] = request.url.split("?");

  if (query) {
    const { c } = qs.parse(query);

    if (c) {
      condominiumStorage(c as string);
    }
  }

  const markup = await getMarkupFromTree({
    tree: (
      <StaticRouter context={context} location={request.url}>
        <HelmetProvider context={helmetContext}>
          <ApolloProvider client={client}>
            <App cookies={request.headers.cookie ?? ""} />
          </ApolloProvider>
        </HelmetProvider>
      </StaticRouter>
    ),
    renderFunction: (children) => renderToString(extractor.collectChunks(sheets.collect(children))),
  });

  const initialState = client.extract();

  if (context.url) {
    const logged = !!initialState?.ROOT_QUERY?.profile;

    if ((!context.url.includes("/auth/signin") && logged) || (!context.url.includes("/app") && !logged)) {
      return response.status(context?.statusCode ?? 307).redirect(context.url);
    }
  }

  const { helmet } = helmetContext as FilledContext;

  const { htmlAttributes, bodyAttributes } = helmet;

  const linkEls = extractor.getLinkElements();
  const styleEls = extractor.getStyleElements();
  const scriptEls = extractor.getScriptElements();

  const html = renderToStaticMarkup(
    <html lang="pt-BR" {...htmlAttributes.toComponent()}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {linkEls}
        {helmet.link.toComponent()}
        {styleEls}
        {sheets.getStyleElement()}
      </head>
      <body {...bodyAttributes.toComponent()}>
        <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
        <script
          id="__APOLLO_STATE__"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(initialState).replace(/</g, "\\u003c"),
          }}
        />
        {scriptEls}
      </body>
    </html>
  );

  return response.type("text/html").send(`<!DOCTYPE html>${html}`);
}
