import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { PHONE } from "../utils/constants";
import { ModelRef } from "../utils/model-ref";
import BaseModel from "./base.model";
import type Person from "./person.model";

@ObjectType(PHONE)
@Entity({ tableName: PHONE })
export default class Phone extends BaseModel {
  @Field()
  @Property()
  public ddd!: string;

  @Field()
  @Property()
  public number!: string;

  @Field(() => ModelRef("person.model"))
  @ManyToOne({ entity: () => ModelRef("person.model") })
  public person!: Person;
}
