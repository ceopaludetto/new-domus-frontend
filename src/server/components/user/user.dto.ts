import { InputType, Field, PartialType } from "@nestjs/graphql";
import { IsString, ValidateNested } from "class-validator";

import { PersonInsertInput } from "@/server/components/person";

@InputType()
export class UserInsertInput {
  @IsString()
  @Field()
  public login!: string;

  @IsString()
  @Field()
  public password!: string;

  @ValidateNested()
  @Field(() => PersonInsertInput)
  public person!: PersonInsertInput;
}

@InputType()
export class UserUpdateInput extends PartialType(UserInsertInput) {}
