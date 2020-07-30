import { ObjectType, Field } from "@nestjs/graphql";
import { Table, Column, HasMany } from "sequelize-typescript";

import { STATE } from "@/server/utils/constants";
import * as Messages from "@/server/utils/validations/messages";

import { BaseModel } from "./base.model";
import { City } from "./city.model";

@ObjectType(STATE)
@Table({ tableName: STATE, modelName: STATE })
export class State extends BaseModel<State> {
  @Field()
  @Column({ allowNull: false })
  public name!: string;

  @Field()
  @Column({ unique: { name: "initials", msg: Messages.UNIQUE }, allowNull: false })
  public initials!: string;

  @Field()
  @Column({ unique: { name: "code", msg: Messages.UNIQUE }, allowNull: false })
  public code!: number;

  @Field(() => [City])
  @HasMany(() => City)
  public cities!: City[];
}
