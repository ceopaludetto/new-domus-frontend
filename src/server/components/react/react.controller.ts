import { Controller, Get, Req, Res, Next, Query } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";
import path from "path";

import { ReactService } from "./react.service";

@Controller("")
export class ReactController {
  public constructor(private readonly reactService: ReactService) {}

  @Get("/robots.txt")
  public async robots(@Res() response: Response) {
    return response.sendFile(path.resolve(process.env.RAZZLE_PUBLIC_DIR as string, "robots.txt"));
  }

  @Get("*")
  public async render(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
    @Query() query: { condominium?: string }
  ) {
    if (["/graphql", "/robots.txt", "/favicon.ico"].some((x) => request.url === x)) return next();

    if (!process.env.NO_SERVE && request.url.includes("/static")) {
      return next();
    }

    return this.reactService.render(request, response, query);
  }
}
