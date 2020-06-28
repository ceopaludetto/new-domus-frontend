import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";

import { PHONE } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { Person } from "./person.model";

@ObjectType()
@Table({ tableName: PHONE, modelName: PHONE })
export class Phone extends BaseModel<Phone> {
  @Field()
  @Column({ allowNull: false })
  public ddd!: string;

  @Field()
  @Column({ allowNull: false })
  public number!: string;

  @Field(() => ID)
  @ForeignKey(() => Person)
  @Column({ allowNull: false })
  public personID!: string;

  @Field(() => Person)
  @BelongsTo(() => Person, {
    foreignKey: "personID",
  })
  public person!: Person;
}
