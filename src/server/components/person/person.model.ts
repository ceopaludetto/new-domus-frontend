import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";
import { Table, Column, DataType, HasOne } from "sequelize-typescript";

import { User } from "@/server/components/user";
import { BaseModel } from "@/server/utils/base.model";
import { PERSON } from "@/server/utils/constants";

export enum Gender {
  M = "Male",
  F = "Female",
  N = "None",
}

registerEnumType(Gender, {
  name: "Gender",
});

@ObjectType(PERSON)
@Table({ tableName: PERSON, modelName: PERSON })
export class Person extends BaseModel<Person> {
  @Field()
  @Column({ allowNull: false })
  public name!: string;

  @Field()
  @Column({ unique: true, allowNull: false })
  public email!: string;

  @Field(() => Gender)
  @Column({ type: DataType.ENUM(Gender.N, Gender.M, Gender.F), allowNull: false })
  public gender!: Gender;

  @Field(() => User)
  @HasOne(() => User)
  public user!: User;
}
