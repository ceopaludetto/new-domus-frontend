import fastify from "fastify";
import compression from "fastify-compress";
import cookie from "fastify-cookie";
import helmet from "fastify-helmet";
import serve from "fastify-static";
import path from "path";

import { render } from "./render";

export class App {
  private readonly fastify = fastify({
    logger: {
      prettyPrint:
        process.env.NODE_ENV !== "production"
          ? {
              translateTime: "dd/mm/yyyy, hh:MM:ss:l",
              ignore: "context,pid,reqId,responseTime",
              levelFirst: true,
            }
          : undefined,
    },
  });

  public constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.fastify.register(helmet, { contentSecurityPolicy: false });
    this.fastify.register(compression);
    this.fastify.register(cookie);
    this.fastify.register(serve, { root: path.resolve(process.env.RAZZLE_PUBLIC_DIR as string), wildcard: false });
  }

  private routes() {
    this.fastify.get("*", render);
  }

  public async listen(port: number) {
    return this.fastify.listen(port);
  }

  public async close() {
    return this.fastify.close();
  }
}
