/* eslint-disable react/no-danger */
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";

import { ApolloProvider, HttpLink } from "@apollo/client";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { ChunkExtractor } from "@loadable/server";
import { ServerStyleSheets } from "@material-ui/core";
import type { FastifyReply, FastifyRequest } from "fastify";
import fetch from "node-fetch";
import qs from "qs";

import { App } from "@/client/App";
import {
  LoggedDocument,
  LoggedQuery,
  MeDocument,
  MeQuery,
  SelectedCondominiumDocument,
  SelectedCondominiumQuery,
} from "@/client/graphql/index.graphql";
import { createClient, tokenStore } from "@/client/providers/apollo";
import type { ReactStaticContext } from "@/client/utils/types";

export async function render(request: FastifyRequest, response: FastifyReply) {
  const sheets = new ServerStyleSheets();

  const extractor = new ChunkExtractor({
    statsFile: process.env.RAZZLE_LOADABLE_MANIFEST as string,
    entrypoints: ["client"],
  });

  const context: ReactStaticContext = {};
  const helmetContext: FilledContext | Record<string, any> = {};

  const client = createClient(
    true,
    new HttpLink({
      uri: `${process.env.RAZZLE_BACKEND_URL}/graphql`,
      fetch: async (uri, options) => {
        let headers = options?.headers as Record<string, string>;

        if (!headers.cookie) {
          headers = { ...headers, cookie: "" };
        }

        if (request.cookies["X-Refresh-Token"]) {
          headers.cookie += `X-Refresh-Token=${request.cookies["X-Refresh-Token"]};`;
        }

        if (request.cookies["@Domus"]) {
          headers.cookie += `@Domus=${request.cookies["@Domus"]};`;
        }

        return fetch(uri.toString(), { ...options, headers } as any) as any;
      },
    })
  );

  let data!: MeQuery;

  try {
    const res = await client.query<MeQuery>({ query: MeDocument });

    data = res.data;

    client.cache.writeQuery<LoggedQuery>({
      query: LoggedDocument,
      data: {
        logged: !!data.profile,
      },
    });

    if (data.profile?.person.condominiums) {
      const [, query] = request.url.split("?");

      const params = qs.parse(query);

      let { id } = data.profile.person.condominiums[0];

      if (params.condominium) {
        const found = data.profile.person.condominiums.find((c) => c.id === params.condominium);

        if (found) {
          id = found.id;
        }
      }

      if (id) {
        client.cache.writeQuery<SelectedCondominiumQuery>({
          query: SelectedCondominiumDocument,
          data: {
            selectedCondominium: id,
          },
        });
      }
    }
  } catch (error) {} // eslint-disable-line no-empty

  const markup = await getMarkupFromTree({
    tree: (
      <ApolloProvider client={client}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter context={context} location={request.url}>
            <App cookies={request.headers.cookie ?? ""} logged={!!data?.profile} />
          </StaticRouter>
        </HelmetProvider>
      </ApolloProvider>
    ),
    renderFunction: (el) => renderToString(extractor.collectChunks(sheets.collect(el))),
  });

  tokenStore.clear();

  if (context.url) {
    return response.status(context?.statusCode ?? 307).redirect(context.url);
  }

  const initialState = client.extract();

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
