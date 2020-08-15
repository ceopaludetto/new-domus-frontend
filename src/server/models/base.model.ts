import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { generate } from "shortid";

@Entity()
@ObjectType()
export abstract class BaseModel {
  @Field(() => ID)
  @PrimaryKey()
  public id: string = generate();

  @Field()
  @Property()
  public createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();
}
