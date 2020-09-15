import type { FindOptions, QueryOrderMap, QueryOrderKeys } from "@mikro-orm/core";
import { ArgsType, Field, ID, Int, registerEnumType } from "@nestjs/graphql";
import { IsString, IsObject, IsInt, IsNumber, IsOptional } from "class-validator";
import type { Request, Response } from "express";

import { IsShortID } from "./validations";

export enum Order {
  ASC = "ASC",
  ASC_NULLS_LAST = "ASC NULLS LAST",
  ASC_NULLS_FIRST = "ASC NULLS FIRST",
  DESC = "DESC",
  DESC_NULLS_LAST = "DESC NULLS LAST",
  DESC_NULLS_FIRST = "DESC NULLS FIRST",
}

registerEnumType(Order, {
  name: "Order",
});

@ArgsType()
export class FindByID {
  @IsString()
  @IsShortID()
  @Field(() => ID)
  public id!: string;
}

@ArgsType()
export class ShowAll {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Field(() => Int, { nullable: true })
  public take?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  public skip?: number;
}

export type Sort<T, U extends keyof T = keyof T> = { [P in U]: QueryOrderKeys };

export type ShowAllWithSort = ShowAll & { sort?: QueryOrderMap };

export class ContextType {
  @IsObject()
  public req!: Request;

  @IsObject()
  public res!: Response;
}

export type Mapped<T> = FindOptions<T>["populate"];

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): NodeJS.ReadStream;
}
