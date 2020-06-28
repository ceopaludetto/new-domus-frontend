import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";
import { Table, Column, DataType, HasOne, BelongsToMany, HasMany } from "sequelize-typescript";

import { PERSON } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { Condominium } from "./condominium.model";
import { PersonCondominium } from "./person.condominium.model";
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
@Table({ tableName: PERSON, modelName: PERSON })
export class Person extends BaseModel<Person> {
  @Field()
  @Column({ allowNull: false })
  public name!: string;

  @Field()
  @Column({ unique: true, allowNull: false })
  public email!: string;

  @Field(() => Gender)
  @Column({ type: DataType.ENUM(Gender.N, Gender.M, Gender.F), allowNull: false })
  public gender!: Gender;

  @Field()
  @Column({ allowNull: false })
  public cpf!: string;

  @Field()
  @Column({ allowNull: false })
  public birthdate!: Date;

  @Field(() => [Phone])
  @HasMany(() => Phone)
  public phones!: Phone[];

  @Field(() => User)
  @HasOne(() => User)
  public user!: User;

  @Field(() => [Condominium])
  @BelongsToMany(() => Condominium, () => PersonCondominium)
  public condominiums!: Condominium[];
}
