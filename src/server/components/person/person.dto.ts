import { InputType, Field, PartialType, OmitType } from "@nestjs/graphql";
import { Transform, Type } from "class-transformer";
import { IsString, IsEmail, IsEnum, IsDate, ValidateNested } from "class-validator";

import { CondominiumInsertInput } from "@/server/components/condominium";
import { PhoneInsertInput } from "@/server/components/phone";
import { Gender } from "@/server/models/person.model";
import { removeMask, trim, mail } from "@/server/utils/transforms";
import { IsCPF } from "@/server/utils/validations/is.cpf";
import * as Messages from "@/server/utils/validations/messages";

@InputType()
export class PersonInsertInput {
  @Field()
  @IsString({ message: Messages.STRING })
  @Transform(trim)
  public name!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  @Transform(trim)
  public lastName!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  @IsEmail({ message: Messages.EMAIL })
  @Transform(mail)
  public email!: string;

  @Field()
  @IsString({ message: Messages.STRING })
  @IsCPF()
  @Transform(removeMask)
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

export class PersonInsertInputWithoutRelation extends OmitType(PersonInsertInput, ["phones", "condominiums"]) {}

@InputType()
export class PersonUpdateInput extends PartialType(PersonInsertInput) {}
