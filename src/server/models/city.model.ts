import { ObjectType, Field } from "@nestjs/graphql";
import { Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";

import { CITY } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { State } from "./state.model";

@ObjectType(CITY)
@Table({ tableName: CITY, modelName: CITY })
export class City extends BaseModel<City> {
  @Field()
  @Column({ allowNull: false })
  public name!: string;

  @Field()
  @Column({ allowNull: false })
  public slug!: string;

  @Field()
  @ForeignKey(() => State)
  @Column({ allowNull: false })
  public stateID!: string;

  @Field(() => State)
  @BelongsTo(() => State, {
    foreignKey: "stateID",
  })
  public state!: State;
}
