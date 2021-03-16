import { Entity, Property, OneToOne } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { ADDRESS } from "../utils/constants";
import BaseModel from "./base.model";
import type City from "./city.model";
import type Condominium from "./condominium.model";

import { ModelRef } from "@/server/utils/model-ref";

@Entity({ tableName: ADDRESS })
@ObjectType(ADDRESS)
export default class Address extends BaseModel {
  @Field()
  @Property()
  public zip!: string;

  @Field()
  @Property()
  public address!: string;

  @Field()
  @Property()
  public number!: string;

  @Field(() => ModelRef("condominium.model"))
  @OneToOne({
    entity: () => ModelRef("condominium.model"),
    inversedBy: (condominium: Condominium) => condominium.address,
    owner: true,
  })
  public condominium!: Condominium;

  @Field(() => ModelRef("city.model"))
  @OneToOne({
    entity: () => ModelRef("city.model"),
    inversedBy: (city: City) => city.addresses,
    owner: true,
  })
  public city!: City;
}
