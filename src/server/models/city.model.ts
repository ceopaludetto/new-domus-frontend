import { Entity, Property, ManyToOne, OneToMany, Collection } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { CITY } from "../utils/constants";
import { ModelRef } from "../utils/model-ref";
import type Address from "./address.model";
import BaseModel from "./base.model";
import type State from "./state.model";

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
