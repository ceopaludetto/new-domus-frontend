import { Entity, Property, ManyToOne, OneToMany, Collection, LoadStrategy } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { BLOCK } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { Condominium } from "./condominium.model";
import { Local } from "./local.model";

@ObjectType()
@Entity({ tableName: BLOCK })
export class Block extends BaseModel {
  @Field({ nullable: true })
  @Property({ nullable: true })
  public name?: string;

  @Field()
  @Property()
  public number!: number;

  @Field(() => Condominium)
  @ManyToOne({ entity: () => Condominium })
  public condominium!: Condominium;

  @Field(() => [Local], { nullable: true })
  @OneToMany({ entity: () => Local, mappedBy: (local) => local.block, strategy: LoadStrategy.JOINED })
  public locals: Collection<Local> = new Collection<Local>(this);
}
