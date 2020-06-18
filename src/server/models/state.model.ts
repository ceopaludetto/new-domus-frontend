import { ObjectType, Field } from "@nestjs/graphql";
import { Table, Column, HasMany } from "sequelize-typescript";

import { STATE } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { City } from "./city.model";

@ObjectType(STATE)
@Table({ tableName: STATE, modelName: STATE })
export class State extends BaseModel<State> {
  @Field()
  @Column({ allowNull: false })
  public name!: string;

  @Field()
  @Column({ unique: true, allowNull: false })
  public initials!: string;

  @Field(() => [City])
  @HasMany(() => City)
  public cities!: City[];
}
