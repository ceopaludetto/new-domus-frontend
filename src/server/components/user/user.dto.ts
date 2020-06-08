import { InputType, Field, PartialType } from "@nestjs/graphql";
import { IsString, ValidateNested } from "class-validator";

import { PersonInsertInput } from "@/server/components/person";
import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class UserInsertInput {
  @Field()
  @IsString({ message: Messages.STRING })
  public login!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  public password!: string;

  @Field(() => PersonInsertInput)
  @ValidateNested()
  public person!: PersonInsertInput;
}

@InputType()
export class UserUpdateInput extends PartialType(UserInsertInput) {}
