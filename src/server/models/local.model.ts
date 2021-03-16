import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { LOCAL } from "../utils/constants";
import { ModelRef } from "../utils/model-ref";
import BaseModel from "./base.model";
import type Block from "./block.model";
import type Condominium from "./condominium.model";

@ObjectType(LOCAL)
@Entity({ tableName: LOCAL })
export default class Local extends BaseModel {
  @Field()
  @Property()
  public name!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public description?: string;

  @Field()
  @Property()
  public capacity!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public image?: string;

  @Field(() => ModelRef("block.model"), { nullable: true })
  @ManyToOne({ entity: () => ModelRef("block.model"), nullable: true })
  public block?: Block;

  @Field(() => ModelRef("condominium.model"))
  @ManyToOne({ entity: () => ModelRef("condominium.model") })
  public condominium!: Condominium;
}
