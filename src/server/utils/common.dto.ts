import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsString, IsObject } from "class-validator";
import { Request, Response } from "express";

import { IsShortID } from "./validations";

@ArgsType()
export class FindByID {
  @IsString()
  @IsShortID()
  @Field(() => ID)
  public id!: string;
}

export class ContextType {
  @IsObject()
  public req!: Request;

  @IsObject()
  public res!: Response;
}

export class PayloadType {
  @IsString()
  @IsShortID()
  public id!: string;
}
