import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { ReactService } from "./react.service";

@Controller("*")
export class ReactController {
  public constructor(private readonly reactService: ReactService) {}

  @Get()
  public async render(@Req() request: Request, @Res() response: Response) {
    return this.reactService.render(request, response);
  }
}
