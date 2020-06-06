import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class AuthenticationInput {
  @Field()
  @IsString({ message: Messages.STRING })
  public login!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  public password!: string;
}
