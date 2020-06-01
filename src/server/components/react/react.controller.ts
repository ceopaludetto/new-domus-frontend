import { Controller, Get, Req, Res, Next } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

import { ReactService } from "./react.service";

@Controller("*")
export class ReactController {
  public constructor(private readonly reactService: ReactService) {}

  @Get()
  public async render(@Req() request: Request, @Res() response: Response, @Next() next: NextFunction) {
    if (["/graphql", "/robots.txt"].some((x) => request.url === x)) return next();
    return this.reactService.render(request, response);
  }
}
