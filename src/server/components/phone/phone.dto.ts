import { InputType, Field, PartialType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsString, MaxLength } from "class-validator";

import { removeMask } from "@/server/utils/transforms";
import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class PhoneInsertInput {
  @Field()
  @IsString({ message: Messages.STRING })
  @MaxLength(2, { message: Messages.MAX_LENGTH })
  public ddd!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  @MaxLength(9, { message: Messages.MAX_LENGTH })
  @Transform(removeMask)
  public number!: string;
}

@InputType()
export class PhoneUpdateInput extends PartialType(PhoneInsertInput) {}
