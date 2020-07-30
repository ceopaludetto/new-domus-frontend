import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";

import { LOCAL } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { Block } from "./block.model";
import { Condominium } from "./condominium.model";

@ObjectType(LOCAL)
@Table({ tableName: LOCAL, modelName: LOCAL })
export class Local extends BaseModel<Local> {
  @Field()
  @Column({ allowNull: false })
  public name!: string;

  @Field({ nullable: true })
  @Column({ allowNull: true })
  public description?: string;

  @Field()
  @Column({ allowNull: false })
  public capacity!: number;

  @Field({ nullable: true })
  @Column({ allowNull: true })
  public image?: string;

  @Field(() => ID, { nullable: true })
  @ForeignKey(() => Block)
  @Column({ allowNull: true })
  public blockID?: string;

  @Field(() => ID)
  @ForeignKey(() => Condominium)
  @Column({ allowNull: false })
  public condominiumID!: string;

  @Field(() => Block, { nullable: true })
  @BelongsTo(() => Block, { foreignKey: "blockID" })
  public block?: Block;

  @Field(() => Condominium)
  @BelongsTo(() => Condominium, { foreignKey: "condominiumID" })
  public condominium!: Condominium;
}
