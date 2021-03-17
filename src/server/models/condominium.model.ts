import { Entity, Property, ManyToMany, Collection, OneToMany, OneToOne } from "@mikro-orm/core";
import { ObjectType, Field } from "@nestjs/graphql";

import { CONDOMINIUM, PERSON_CONDOMINIUM } from "../utils/constants";
import { ModelRef } from "../utils/model-ref";
import type Address from "./address.model";
import BaseModel from "./base.model";
import type Block from "./block.model";
import type Local from "./local.model";
import type Person from "./person.model";

@ObjectType(CONDOMINIUM)
@Entity({ tableName: CONDOMINIUM })
export default class Condominium extends BaseModel {
  @Field()
  @Property()
  public companyName!: string;

  @Field()
  @Property({ unique: true })
  public cnpj!: string;

  @Field({ defaultValue: "#" })
  @Property({ default: "#" })
  public character!: string;

  @Field(() => [ModelRef("block.model")])
  @OneToMany({ entity: () => ModelRef("block.model"), mappedBy: (block: Block) => block.condominium })
  public blocks: Collection<Block> = new Collection<Block>(this);

  @Field(() => [ModelRef("local.model")])
  @OneToMany({ entity: () => ModelRef("local.model"), mappedBy: (local: Local) => local.condominium })
  public locals: Collection<Local> = new Collection<Local>(this);

  @Field(() => ModelRef("address.model"))
  @OneToOne({ entity: () => ModelRef("address.model"), mappedBy: (address: Address) => address.condominium })
  public address!: Address;

  @Field(() => [ModelRef("person.model")])
  @ManyToMany({
    entity: () => ModelRef("person.model"),
    pivotTable: PERSON_CONDOMINIUM,
    joinColumn: "condominium",
    inverseJoinColumn: "person",
    inversedBy: "condominiums",
  })
  public people: Collection<Person> = new Collection<Person>(this);
}
