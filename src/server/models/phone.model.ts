import { Entity, Property, ManyToOne, LoadStrategy } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { PHONE } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { Person } from "./person.model";

@ObjectType()
@Entity({ tableName: PHONE })
export class Phone extends BaseModel {
  @Field()
  @Property()
  public ddd!: string;

  @Field()
  @Property()
  public number!: string;

  @Field(() => Person)
  @ManyToOne({ entity: () => Person, strategy: LoadStrategy.JOINED })
  public person!: Person;
}
