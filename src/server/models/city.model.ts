import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";

import { CITY } from "@/server/utils/constants";
import * as Messages from "@/server/utils/validations/messages";

import { BaseModel } from "./base.model";
import { State } from "./state.model";

@ObjectType(CITY)
@Table({ tableName: CITY, modelName: CITY })
export class City extends BaseModel<City> {
  @Field()
  @Column({ allowNull: false })
  public name!: string;

  @Field()
  @Column({ allowNull: false, unique: { name: "code", msg: Messages.UNIQUE } })
  public code!: number;

  @Field()
  @Column({ allowNull: false })
  public slug!: string;

  @Field(() => ID)
  @ForeignKey(() => State)
  @Column({ allowNull: false })
  public stateID!: string;

  @Field(() => State)
  @BelongsTo(() => State, {
    foreignKey: "stateID",
  })
  public state!: State;
}
