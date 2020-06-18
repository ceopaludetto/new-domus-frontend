import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Table, Column, ForeignKey } from "sequelize-typescript";

import { PERSON_CONDOMINIUM } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { Condominium } from "./condominium.model";
import { Person } from "./person.model";

@ObjectType(PERSON_CONDOMINIUM)
@Table({ tableName: PERSON_CONDOMINIUM, modelName: PERSON_CONDOMINIUM })
export class PersonCondominium extends BaseModel<PersonCondominium> {
  @Field(() => ID)
  @ForeignKey(() => Person)
  @Column({ allowNull: false })
  public personID!: string;

  @Field(() => ID)
  @ForeignKey(() => Condominium)
  @Column({ allowNull: false })
  public condominiumID!: string;
}
