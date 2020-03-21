import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class AuthenticationInput {
  @IsString()
  @Field()
  public login!: string;

  @IsString()
  @Field()
  public password!: string;
}
