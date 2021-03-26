import fastify from "fastify";
import compression from "fastify-compress";
import cookie from "fastify-cookie";
import helmet from "fastify-helmet";
import serve from "fastify-static";
import path from "path";

import { render } from "./render";

export class App {
  private readonly fastify = fastify({ logger: false });

  public constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.fastify.register(helmet, { contentSecurityPolicy: false });
    this.fastify.register(compression);
    this.fastify.register(cookie);
    this.fastify.register(serve, {
      root: path.resolve(process.env.RAZZLE_PUBLIC_DIR as string),
      wildcard: false,
      allowedPath: (file) => {
        if (file.includes("loadable-stats.json")) return false;

        return true;
      },
    });
  }

  private routes() {
    this.fastify.get("*", render);
  }

  public async listen(port: number) {
    await this.fastify.listen(port);

    console.log("Server opened in port", port);
  }

  public async close() {
    return this.fastify.close();
  }
}
