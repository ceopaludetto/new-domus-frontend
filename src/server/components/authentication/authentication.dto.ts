import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class AuthenticationInput {
  @IsString({ message: Messages.STRING })
  @Field()
  public login!: string;

  @IsString({ message: Messages.STRING })
  @Field()
  public password!: string;
}
