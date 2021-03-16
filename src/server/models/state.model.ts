import { Entity, Property, OneToMany, Collection } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { STATE } from "../utils/constants";
import { ModelRef } from "../utils/model-ref";
import BaseModel from "./base.model";
import type City from "./city.model";

@ObjectType(STATE)
@Entity({ tableName: STATE })
export default class State extends BaseModel {
  @Field()
  @Property()
  public name!: string;

  @Field()
  @Property({ unique: true })
  public initials!: string;

  @Field()
  @Property({ unique: true })
  public code!: number;

  @Field(() => [ModelRef("city.model")])
  @OneToMany({ entity: () => ModelRef("city.model"), mappedBy: (city: City) => city.state })
  public cities: Collection<City> = new Collection<City>(this);
}
