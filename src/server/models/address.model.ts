import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";

import { ADDRESS } from "@/server/utils/constants";

import { BaseModel } from "./base.model";
import { City } from "./city.model";
import { Condominium } from "./condominium.model";

@ObjectType(ADDRESS)
@Table({ tableName: ADDRESS, modelName: ADDRESS })
export class Address extends BaseModel<Address> {
  @Field()
  @Column({ allowNull: false })
  public zip!: string;

  @Field()
  @Column({ allowNull: false })
  public address!: string;

  @Field()
  @Column({ allowNull: false })
  public number!: string;

  @Field(() => ID)
  @ForeignKey(() => City)
  @Column({ allowNull: false })
  public cityID!: string;

  @Field(() => ID)
  @ForeignKey(() => Condominium)
  @Column({ allowNull: false })
  public condominiumID!: string;

  @Field(() => Condominium)
  @BelongsTo(() => Condominium, {
    foreignKey: "condominiumID",
  })
  public condominium!: Condominium;

  @Field(() => City)
  @BelongsTo(() => City, {
    foreignKey: "cityID",
  })
  public city!: City;
}
