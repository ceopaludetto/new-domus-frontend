/* eslint-disable react/no-danger */
import * as React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { ChunkExtractor } from "@loadable/server";
import { ServerStyleSheets } from "@material-ui/core";
import { Injectable } from "@nestjs/common";
import type { Request, Response } from "express";

import { App } from "@/client/App";
import { LoggedDocument, LoggedQuery, SelectedCondominiumDocument, SelectedCondominiumQuery } from "@/client/graphql";
import { createClient } from "@/client/providers/apollo";
import type { ReactStaticContext } from "@/client/utils/types";
import { AuthenticationService } from "@/server/components/authentication";
import { SchemaService } from "@/server/components/schema";
import type { User } from "@/server/models";
import { REFRESH_TOKEN } from "@/server/utils/constants";

@Injectable()
export class ReactService {
  public constructor(
    private readonly schemaService: SchemaService,
    private readonly authenticationService: AuthenticationService
  ) {}

  private getCurrentCondominium(user: User, query: { condominium?: string }) {
    const condominiums = user.person.condominiums.toArray();

    const urlCondominium = query.condominium;

    const userHaveUrlCondominium = condominiums.some((condominium) => condominium.id === urlCondominium);

    let condominiumID: string = condominiums[0].id;

    if (urlCondominium && userHaveUrlCondominium) {
      condominiumID = urlCondominium;
    }

    return condominiumID;
  }

  private async getCurrentUser(request: Request) {
    const refreshCookie = request.cookies[REFRESH_TOKEN];

    if (refreshCookie) {
      const [, token] = refreshCookie.split(" ");

      const decoded = await this.authenticationService.verifyToken(token);
      const user = await this.authenticationService.getByRefreshToken(decoded, ["person.condominiums"]);

      return user;
    }

    return undefined;
  }

  public async render(req: Request, res: Response, query: { condominium?: string }) {
    const sheets = new ServerStyleSheets();

    const extractor = new ChunkExtractor({
      statsFile: process.env.RAZZLE_LOADABLE_MANIFEST as string,
      entrypoints: ["client"],
    });

    const context: ReactStaticContext = {};
    const helmetContext: FilledContext | Record<string, any> = {};

    const user = await this.getCurrentUser(req);

    const client = createClient(
      true,
      new SchemaLink({
        schema: this.schemaService.schema,
        context: () => ({ req, res }),
      })
    );

    client.cache.writeQuery<LoggedQuery>({
      query: LoggedDocument,
      data: {
        __typename: "Query",
        logged: !!user,
      },
    });

    if (user?.person.condominiums) {
      const condominiumID = this.getCurrentCondominium(user, query);

      if (condominiumID) {
        client.cache.writeQuery<SelectedCondominiumQuery>({
          query: SelectedCondominiumDocument,
          data: {
            __typename: "Query",
            selectedCondominium: condominiumID,
          },
        });
      }
    }

    const markup = await getMarkupFromTree({
      tree: (
        <ApolloProvider client={client}>
          <HelmetProvider context={helmetContext}>
            <StaticRouter context={context} location={req.url}>
              <App cookies={req.headers.cookie ?? ""} logged={!!user} />
            </StaticRouter>
          </HelmetProvider>
        </ApolloProvider>
      ),
      renderFunction: (el) => renderToString(extractor.collectChunks(sheets.collect(el))),
    });

    if (context.url) {
      return res.status(context?.statusCode ?? 307).redirect(context.url);
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

    return res.send(`<!DOCTYPE html>${html}`);
  }
}
