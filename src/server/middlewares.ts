import compression from "compression";
import express, { Application } from "express";
import helmet from "helmet";
import path from "path";

export function applyMiddlewares(app: Application) {
  if (process.env.NODE_ENV === "production") {
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(compression());
    app.use("/static", express.static(path.resolve("dist", "public", "static")));
  }

  app.use((request, response, next) => {
    response.header("Vary", "Sec-CH-Prefers-Color-Scheme");
    response.header("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
    response.header("Critical-CH", "Sec-CH-Prefers-Color-Scheme");

    return next();
  });

  app.use((request, response, next) => {
    if (request.url.includes("favicon.ico")) return response.send(undefined);
    return next();
  });
}
