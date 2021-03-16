import { InputType, Field, PartialType, OmitType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsString, IsEmail, IsEnum, IsDate, IsOptional, ValidateNested } from "class-validator";

import { CondominiumInsertInput } from "@/server/components/condominium";
import { PhoneInsertInput, PhoneUpdateInput } from "@/server/components/phone";
import { Gender } from "@/server/utils/enums";
import { RemoveMask, Trim, Mail } from "@/server/utils/transforms";
import { IsCPF } from "@/server/utils/validations/is.cpf";
import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class PersonInsertInput {
  @Field()
  @IsString({ message: Messages.STRING })
  @Trim()
  public name!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  @Trim()
  public lastName!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  @IsEmail(undefined, { message: Messages.EMAIL })
  @Mail()
  public email!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  @IsCPF()
  @RemoveMask()
  public cpf!: string;

  @Field()
  @IsDate({ message: Messages.DATE })
  public birthdate!: Date;

  @Field(() => Gender)
  @IsString({ message: Messages.GENDER })
  @IsEnum(Gender)
  public gender!: Gender;

  @Field(() => [PhoneInsertInput])
  @ValidateNested()
  @Type(() => PhoneInsertInput)
  public phones!: PhoneInsertInput[];

  @Field(() => [CondominiumInsertInput])
  @ValidateNested()
  @Type(() => CondominiumInsertInput)
  public condominiums!: CondominiumInsertInput[];
}

@InputType()
export class PersonUpdateInput extends PartialType(OmitType(PersonInsertInput, ["condominiums", "phones"])) {
  @Field(() => [PhoneUpdateInput], { nullable: true })
  @Type(() => PhoneUpdateInput)
  @ValidateNested()
  @IsOptional()
  public phones?: PhoneUpdateInput[];
}
