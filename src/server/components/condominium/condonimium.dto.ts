import { InputType, Field, PartialType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsString, MaxLength, ValidateNested } from "class-validator";

import { AddressInsertInput } from "@/server/components/address";
import { RemoveMask } from "@/server/utils/transforms";
import { IsCNPJ } from "@/server/utils/validations/is.cnpj";
import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class CondominiumInsertInput {
  @Field()
  @IsString({ message: Messages.STRING })
  public companyName!: string;

  @Field()
  @IsCNPJ()
  @IsString({ message: Messages.STRING })
  @MaxLength(14, { message: Messages.MAX_LENGTH })
  @RemoveMask()
  public cnpj!: string;

  @Field({ defaultValue: "#" })
  @IsString({ message: Messages.STRING })
  @MaxLength(1, { message: Messages.MAX_LENGTH })
  public character?: string;

  @Field(() => AddressInsertInput)
  @ValidateNested()
  @Type(() => AddressInsertInput)
  public address!: AddressInsertInput;
}

@InputType()
export class CondominiumUpdateInput extends PartialType(CondominiumInsertInput) {}
