import { Entity, Property, OneToOne, ManyToOne } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { ADDRESS } from "../utils/constants";
import { ModelRef } from "../utils/model-ref";
import BaseModel from "./base.model";
import type City from "./city.model";
import type Condominium from "./condominium.model";

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
  @ManyToOne({
    entity: () => ModelRef("city.model"),
    inversedBy: (city: City) => city.addresses,
  })
  public city!: City;
}
