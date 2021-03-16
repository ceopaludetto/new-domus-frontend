import { Entity, Property, Enum, OneToOne, OneToMany, Collection, ManyToMany } from "@mikro-orm/core";
import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";

import { PERSON } from "../utils/constants";
import { Gender } from "../utils/enums";
import { ModelRef } from "../utils/model-ref";
import BaseModel from "./base.model";
import type Condominium from "./condominium.model";
import type Phone from "./phone.model";
import type User from "./user.model";

function generateHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

registerEnumType(Gender, {
  name: "Gender",
});

@ObjectType(PERSON)
@Entity({ tableName: PERSON })
export default class Person extends BaseModel {
  @Field()
  @Property()
  public name!: string;

  @Field()
  @Property()
  public lastName!: string;

  @Field()
  @Property({ unique: true })
  public email!: string;

  @Field(() => Gender)
  @Enum(() => Gender)
  public gender!: Gender;

  @Field()
  @Property()
  public cpf!: string;

  @Field()
  @Property()
  public color: string = generateHexColor();

  @Field()
  @Property()
  public birthdate!: Date;

  @Field(() => [ModelRef("phone.model")])
  @OneToMany({ entity: () => ModelRef("phone.model"), mappedBy: (phone: Phone) => phone.person, orphanRemoval: true })
  public phones: Collection<Phone> = new Collection<Phone>(this);

  @Field(() => ModelRef("user.model"))
  @OneToOne({ entity: () => ModelRef("user.model"), mappedBy: (user: User) => user.person })
  public user!: User;

  @Field(() => [ModelRef("condominium.model")])
  @ManyToMany({
    entity: () => ModelRef("condominium.model"),
    mappedBy: (condominium: Condominium) => condominium.people,
  })
  public condominiums: Collection<Condominium> = new Collection<Condominium>(this);
}
