import { Entity, Property, ManyToOne, OneToMany, Collection } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { BLOCK } from "../utils/constants";
import { ModelRef } from "../utils/model-ref";
import BaseModel from "./base.model";
import type Condominium from "./condominium.model";
import type Local from "./local.model";

@ObjectType(BLOCK)
@Entity({ tableName: BLOCK })
export default class Block extends BaseModel {
  @Field()
  @Property()
  public name!: string;

  @Field()
  @Property()
  public number!: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public image?: string;

  @Field(() => ModelRef("condominium.model"))
  @ManyToOne({ entity: () => ModelRef("condominium.model") })
  public condominium!: Condominium;

  @Field(() => [ModelRef("local.model")], { nullable: true })
  @OneToMany({ entity: () => ModelRef("local.model"), mappedBy: (local: Local) => local.block })
  public locals: Collection<Local> = new Collection<Local>(this);
}
