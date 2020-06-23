import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Table, Column, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

import { BLOCK } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { Condominium } from "./condominium.model";
import { Local } from "./local.model";

@ObjectType()
@Table({ tableName: BLOCK, modelName: BLOCK })
export class Block extends BaseModel<Block> {
  @Field({ nullable: true })
  @Column
  public name?: string;

  @Field()
  @AutoIncrement
  @Column({ allowNull: false })
  public number!: number;

  @Field(() => ID)
  @ForeignKey(() => Condominium)
  @Column({ allowNull: false })
  public condominiumID!: string;

  @Field(() => Condominium)
  @BelongsTo(() => Condominium, {
    foreignKey: "condominiumID",
  })
  public condominium!: Condominium;

  @Field(() => [Local], { nullable: true })
  @HasMany(() => Local)
  public locals?: Local[];
}
