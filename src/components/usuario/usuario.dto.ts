import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsEmail } from "class-validator";

@InputType()
export class UsuarioInput {
  @IsString()
  @Field()
  public nome!: string;

  @IsString()
  @IsEmail()
  @Field()
  public email!: string;

  @IsString()
  @Field()
  public password!: string;
}
