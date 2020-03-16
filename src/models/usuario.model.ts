import { ObjectType, Field } from "@nestjs/graphql";
import { hash, compare } from "bcryptjs";
import { Table, Column, BeforeSave } from "sequelize-typescript";

import { USUARIO } from "~/utils/constants";

import { BaseModel } from "./base.model";

@ObjectType()
@Table({ tableName: USUARIO, modelName: USUARIO })
export class Usuario extends BaseModel<Usuario> {
  @Field()
  @Column
  public nome!: string;

  @Field()
  @Column({ unique: true })
  public email!: string;

  @Field()
  @Column
  public password!: string;

  public async comparePasswords(password: string) {
    return compare(password, this.password);
  }

  @BeforeSave
  public static async hashPassword(instance: Usuario) {
    if (instance.changed("password")) {
      instance.password = await hash(instance.password, 10);
    }
  }
}
