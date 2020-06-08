import { InputType, Field, PartialType } from "@nestjs/graphql";
import { IsString, IsEmail, IsEnum } from "class-validator";

import { Gender } from "@/server/models/person.model";
import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class PersonInsertInput {
  @Field()
  @IsString({ message: Messages.STRING })
  public name!: string;

  @Field()
  @IsEmail({ message: Messages.EMAIL })
  public email!: string;

  @Field(() => Gender)
  @IsString({ message: Messages.GENDER })
  @IsEnum(Gender)
  public gender!: Gender;
}

@InputType()
export class PersonUpdateInput extends PartialType(PersonInsertInput) {}
