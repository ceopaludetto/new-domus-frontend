import { Controller, Get, Req, Res, Next } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import path from "path";

import { ReactService } from "./react.service";

@Controller("")
export class ReactController {
  public constructor(private readonly reactService: ReactService) {}

  @Get("/robots.txt")
  public async robots(@Res() response: Response) {
    return response.sendFile(path.resolve(process.env.STATIC_FOLDER as string, "public", "robots.txt"));
  }

  @Get("*")
  public async render(@Req() request: Request, @Res() response: Response, @Next() next: NextFunction) {
    if (["/graphql", "/robots.txt", "/favicon.ico"].some((x) => request.url === x)) return next();
    return this.reactService.render(request, response);
  }
}
