import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PrimaryKey, CreatedAt, UpdatedAt, DeletedAt, Column, Model, Default } from "sequelize-typescript";
import { generate } from "shortid";

@ObjectType()
export abstract class BaseModel<T> extends Model<T> {
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

  @Field()
  @DeletedAt
  public deletedAt!: Date;
}
