import { ObjectType, Field } from "@nestjs/graphql";
import { Table, Column } from "sequelize-typescript";

import { LOCAL } from "@/server/utils/constants";

import { BaseModel } from "./base.model";

@ObjectType(LOCAL)
@Table({ tableName: LOCAL, modelName: LOCAL })
export class Local extends BaseModel<Local> {
  @Field()
  @Column({ allowNull: false })
  public name!: string;

  @Field()
  @Column({ allowNull: false })
  public description!: string;

  @Field()
  @Column({ allowNull: false })
  public capacity!: number;

  @Field({ nullable: true })
  @Column({ allowNull: true })
  public image?: string;
}
