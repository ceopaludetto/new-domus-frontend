import { Entity, Property, Enum, OneToOne, OneToMany, Collection, ManyToMany, LoadStrategy } from "@mikro-orm/core";
import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";

import { PERSON, PERSON_CONDOMINIUM } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { Condominium } from "./condominium.model";
import { Phone } from "./phone.model";
import { User } from "./user.model";

export enum Gender {
  M = "Male",
  F = "Female",
  N = "None",
}

registerEnumType(Gender, {
  name: "Gender",
});

@ObjectType(PERSON)
@Entity({ tableName: PERSON })
export class Person extends BaseModel {
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
  public birthdate!: Date;

  @Field(() => [Phone])
  @OneToMany({ entity: () => Phone, mappedBy: (phone) => phone.person, strategy: LoadStrategy.JOINED })
  public phones: Collection<Phone> = new Collection<Phone>(this);

  @Field(() => User)
  @OneToOne({ entity: () => User, mappedBy: (user) => user.person, strategy: LoadStrategy.JOINED })
  public user!: User;

  @Field(() => [Condominium])
  @ManyToMany({ entity: () => Condominium, pivotTable: PERSON_CONDOMINIUM, strategy: LoadStrategy.JOINED })
  public condominiums: Collection<Condominium> = new Collection<Condominium>(this);
}
