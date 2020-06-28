import { ObjectType, Field } from "@nestjs/graphql";
import { Table, Column, Default, BelongsToMany, HasMany, HasOne } from "sequelize-typescript";

import { CONDOMINIUM } from "@/server/utils/constants";

import { Address } from "./address.model";
import { BaseModel } from "./base.model";
import { Block } from "./block.model";
import { Local } from "./local.model";
import { PersonCondominium } from "./person.condominium.model";
import { Person } from "./person.model";

@ObjectType(CONDOMINIUM)
@Table({ tableName: CONDOMINIUM, modelName: CONDOMINIUM })
export class Condominium extends BaseModel<Condominium> {
  @Field()
  @Column({ allowNull: false })
  public companyName!: string;

  @Field()
  @Column({ allowNull: false })
  public cnpj!: string;

  @Field()
  @Default("#")
  @Column({ allowNull: false })
  public character!: string;

  @Field(() => [Person])
  @BelongsToMany(() => Person, () => PersonCondominium)
  public people!: Person[];

  @Field(() => [Block])
  @HasMany(() => Block)
  public blocks!: Block[];

  @Field(() => [Local])
  @HasMany(() => Local)
  public locals!: Local[];

  @Field(() => Address)
  @HasOne(() => Address)
  public address!: Address;
}
