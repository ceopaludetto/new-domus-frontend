import { ArgsType, Field, ID, Int, registerEnumType } from "@nestjs/graphql";
import { IsString, IsObject, IsInt, IsNumber, IsOptional } from "class-validator";
import { Request, Response } from "express";
import type { IncludeOptions, Order as SequelizeOrder, FindAttributeOptions } from "sequelize";
import type { Model } from "sequelize-typescript";

import { IsShortID } from "./validations";

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
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

export type Sort<T, U extends keyof T> = Pick<{ [P in keyof T]?: Order }, U>;

export type ShowAllWithSort = ShowAll & { sort?: SequelizeOrder };

export class ContextType {
  @IsObject()
  public req!: Request;

  @IsObject()
  public res!: Response;
}

export type ExcludeSequelize<T> = Omit<T, keyof Model<T>>;

export type Mapped = {
  attributes: FindAttributeOptions;
  include: IncludeOptions[];
};

export type KeepOptions<T, U = ExcludeSequelize<T>> = {
  [P in keyof U]?: U[P] extends Record<string, unknown> ? KeepOptions<U[P]> : boolean;
};
