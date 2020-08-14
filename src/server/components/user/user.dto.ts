import { InputType, ArgsType, Field, PartialType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";

import { PersonInsertInput } from "@/server/components/person";
import { User } from "@/server/models";
import { Sortable } from "@/server/utils/plugins";
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
  @Type(() => PersonInsertInput)
  @ValidateNested()
  public person!: PersonInsertInput;
}

@InputType()
export class UserUpdateInput extends PartialType(UserInsertInput) {}

@ArgsType()
export class FindUserByLogin {
  @Field()
  @IsString({ message: Messages.STRING })
  public login!: string;
}

@InputType()
export class UserSortInput extends Sortable(User, ["login"]) {}
