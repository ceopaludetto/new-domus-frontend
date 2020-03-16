import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { Request, Response } from "express";

import { IsShortID } from "./validations";

@ArgsType()
export class FindByID {
  @IsString()
  @IsShortID()
  @Field(() => ID)
  public id!: string;
}

export interface ContextType {
  req: Request;
  res: Response;
}
