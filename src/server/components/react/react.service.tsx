/* eslint-disable react/no-danger */
import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { FilledContext, HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";

import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { ServerStyleSheets } from "@material-ui/styles";
import { Injectable } from "@nestjs/common";
import type { Request, Response } from "express";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";
import { generate } from "shortid";

import { App } from "@/client/App";
import { Logged, LoggedQuery, SelectedCondominium, SelectedCondominiumQuery } from "@/client/graphql";
import { createClient } from "@/client/providers/apollo";
import type { ReactStaticContext } from "@/client/utils/common.dto";
import { AuthenticationService } from "@/server/components/authentication";
import { ConfigurationService } from "@/server/components/configuration";
import { REFRESH_TOKEN } from "@/server/utils/constants";

@Injectable()
export class ReactService {
  public constructor(
    private readonly configService: ConfigurationService,
    private readonly authenticationService: AuthenticationService,
    @InjectPinoLogger(ReactService.name) private readonly logger: PinoLogger
  ) {}

  public async getCurrentUser(request: Request) {
    const refreshCookie = request.cookies[REFRESH_TOKEN];

    if (refreshCookie) {
      const [, token] = refreshCookie.split(" ");

      const decoded = await this.authenticationService.verifyToken(token);
      const user = await this.authenticationService.getByRefreshToken(decoded, ["person.condominiums"]);

      return user;
    }

    return undefined;
  }

  public async render(req: Request, res: Response) {
    try {
      const sheets = new ServerStyleSheets();
      const nonce = Buffer.from(generate()).toString("base64");
      const extractor = new ChunkExtractor({
        statsFile: process.env.RAZZLE_LOADABLE_MANIFEST as string,
        entrypoints: ["client"],
      });
      const context: ReactStaticContext = {};
      const helmetContext: FilledContext | Record<string, any> = {};
      const client = createClient(true, new SchemaLink({ schema: this.configService.schema, context: { req, res } }));

      const user = await this.getCurrentUser(req);

      client.cache.writeQuery<LoggedQuery>({
        query: Logged,
        data: {
          __typename: "Query",
          logged: !!user,
        },
      });

      if (user?.person.condominiums) {
        client.cache.writeQuery<SelectedCondominiumQuery>({
          query: SelectedCondominium,
          data: {
            __typename: "Query",
            selectedCondominium: user.person.condominiums[0].id,
          },
        });
      }

      if (process.env.NODE_ENV === "production") {
        res.set(
          "Content-Security-Policy",
          `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; font-src 'self';`
        );
      }

      const markup = await getMarkupFromTree({
        tree: (
          <ChunkExtractorManager extractor={extractor}>
            <HelmetProvider context={helmetContext}>
              <ApolloProvider client={client}>
                <StaticRouter context={context} location={req.url}>
                  <App logged={!!user} />
                </StaticRouter>
              </ApolloProvider>
            </HelmetProvider>
          </ChunkExtractorManager>
        ),
        renderFunction: (el) => renderToString(sheets.collect(el)),
      });

      const initialState = client.extract();

      if (context.url) {
        return res.status(context?.statusCode ?? 307).redirect(context.url);
      }

      const fullHTML = this.markup(
        markup,
        initialState,
        extractor,
        (helmetContext as FilledContext).helmet,
        nonce,
        sheets
      );

      return res.send(`<!DOCTYPE html>${fullHTML}`);
    } catch (error) {
      this.logger.error(error?.message ?? error ?? "Falha ao renderizar React");
      return res.send({ error: true, message: "Falha ao renderizar React" });
    }
  }

  public markup = (
    markup: string,
    initialState: NormalizedCacheObject,
    extractor: ChunkExtractor,
    helmet: FilledContext["helmet"],
    nonce: string,
    sheet: ServerStyleSheets
  ) => {
    const { htmlAttributes, bodyAttributes } = helmet;

    const linkEls = extractor.getLinkElements();
    const styleEls = extractor.getStyleElements({ nonce });
    const scriptEls = extractor.getScriptElements({ nonce });

    return renderToStaticMarkup(
      <html lang="pt-BR" {...htmlAttributes.toComponent()}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          <meta property="csp-nonce" content={nonce} />
          {linkEls}
          {helmet.link.toComponent()}
          {styleEls}
          {sheet.getStyleElement({ nonce })}
        </head>
        <body {...bodyAttributes.toComponent()}>
          <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          <script
            nonce={nonce}
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
  };
}
