import { Entity, Property, ManyToOne, OneToMany, Collection } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { CITY } from "../utils/constants";
import BaseModel from "./base.model";
import type State from "./state.model";
import type Address from "./address.model";
import { ModelRef } from "../utils/model-ref";

@ObjectType(CITY)
@Entity({ tableName: CITY })
export default class City extends BaseModel {
  @Field()
  @Property()
  public name!: string;

  @Field()
  @Property({ unique: true })
  public code!: number;

  @Field()
  @Property()
  public slug!: string;

  @Field(() => ModelRef("state.model"))
  @ManyToOne({ entity: () => ModelRef("state.model") })
  public state!: State;

  @Field(() => [ModelRef("address.model")])
  @OneToMany({ entity: () => ModelRef("address.model"), mappedBy: (address: Address) => address.city })
  public addresses: Collection<Address> = new Collection<Address>(this);
}
