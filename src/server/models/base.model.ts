import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, Column, Model, Default } from "sequelize-typescript";
import { generate } from "shortid";

import { ExcludeSequelize } from "@/server/utils/common.dto";

interface BaseModelAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

@ObjectType()
export abstract class BaseModel<T, U = ExcludeSequelize<{ [P in keyof T]: T[P] }>> extends Model<
  T,
  U & BaseModelAttributes
> {
  @Default(generate)
  @PrimaryKey
  @Column
  @Field(() => ID)
  public id!: string;

  @Field()
  @CreatedAt
  public createdAt!: Date;

  @Field()
  @UpdatedAt
  public updatedAt!: Date;

  @Field({ nullable: true })
  @DeletedAt
  public deletedAt?: Date;
}
